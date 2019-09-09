import CompositionApi, { ref, Ref, watch } from '@vue/composition-api'

import Vue from 'vue'
import apollo, {
  SAVE_MEDIA_LIST_ENTRY,
  MEDIA,
  VIEWER,
  DELETE_MEDIA_LIST_ENTRY
} from '@/graphql'

import { SaveVariables, DeleteVariables } from '@/graphql/schema/listEntry'
Vue.use(CompositionApi)
import {
  Variables as MediaVariables,
  Media,
  FuzzyDate
} from '@/graphql/schema/media'
import { MediaList } from '@/graphql/schema/mediaListCollection'

import { User } from '@/graphql/schema/viewer'
import { Form } from '@/types'
import useSettings from './settings'

const stored = localStorage.getItem('CHANGES')

watch(() => {
  if (useSettings().cacheChanges.value) {
    localStorage.setItem('CHANGES', JSON.stringify(history.value))
  }
})

export const areUndoable = (
  commands: Command[]
): commands is Required<Command>[] => commands.every(e => e.undo)

export class MacroCommand implements Command {
  commands: Set<Command>

  constructor(commands: Command[]) {
    this.commands = new Set(commands)
  }

  undo() {
    const commands = [...this.commands].reverse()
    if (areUndoable(commands)) {
      for (const command of commands) {
        command.undo()
      }
    }
  }

  execute() {
    for (const command of this.commands) {
      command.execute()
    }
  }
}

export interface Command {
  saveState?(): void | Promise<void>
  undo?(): void | Promise<void>
  execute(): void | Promise<void>
}

export interface ListCommand extends Command {
  backup: Form | null
  variables: Object
  done: boolean
  _class: 'SaveCommand' | 'DeleteCommand'
}

export type SaveCommandConstructor = Partial<
  Pick<SaveCommand, 'backup' | 'done'>
> &
  Pick<SaveCommand, 'variables'>

export type DeleteCommandConstructor = Partial<
  Pick<DeleteCommand, 'backup' | 'done'>
> &
  Pick<DeleteCommand, 'variables'>

export class SaveCommand implements ListCommand {
  backup: Form | null
  variables: SaveVariables
  done: boolean
  _class = 'SaveCommand' as const

  constructor({
    variables,

    backup = null,
    done = false
  }: SaveCommandConstructor) {
    this.variables = variables
    this.backup = backup
    this.done = done
  }

  saveState() {
    const { variables } = this

    return Promise.all([
      apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: variables.mediaId }
        })
        .then(({ data }) => data.Media),
      apollo
        .query<{ Viewer: User }>({ query: VIEWER })
        .then(({ data }) => data.Viewer)
    ] as [Promise<Media>, Promise<User>]).then(
      ([{ mediaListEntry, type }, { mediaListOptions }]) => {
        this.backup = Object.fromEntries(
          Object.entries(
            mediaListToForm(
              mediaListEntry,
              mediaListOptions[type === 'MANGA' ? 'mangaList' : 'animeList']
                .advancedScoring
            )
          ).filter(([key]) => variables.hasOwnProperty(key))
        ) as Form
      }
    )
  }

  async undo() {
    const {
      backup,
      variables: { mediaId }
    } = this

    if (this.done) {
      await apollo
        .mutate<MediaList, SaveVariables>({
          mutation: SAVE_MEDIA_LIST_ENTRY,
          variables: { mediaId, ...backup }
        })
        .then(() => {
          history.value.pop()
        })
    } else {
      history.value.pop()
    }
  }

  async execute() {
    await this.saveState()

    const { variables } = this

    return apollo
      .mutate<MediaList, SaveVariables>({
        mutation: SAVE_MEDIA_LIST_ENTRY,
        variables
      })
      .then(() => {
        this.done = true
      })
  }
}
export class DeleteCommand implements ListCommand {
  backup: Form | null
  variables: DeleteVariables & Pick<SaveVariables, 'mediaId'>
  done: boolean
  _class = 'DeleteCommand' as const

  constructor({
    variables,

    backup = null,
    done = false
  }: DeleteCommandConstructor) {
    this.variables = variables
    this.backup = backup
    this.done = done
  }

  saveState() {
    const {
      variables: { mediaId }
    } = this

    return Promise.all([
      apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: mediaId }
        })
        .then(({ data }) => data.Media),
      apollo
        .query<{ Viewer: User }>({ query: VIEWER })
        .then(({ data }) => data.Viewer)
    ] as [Promise<Media>, Promise<User>]).then(
      ([{ mediaListEntry, type }, { mediaListOptions }]) => {
        this.backup = mediaListToForm(
          mediaListEntry,
          mediaListOptions[type === 'MANGA' ? 'mangaList' : 'animeList']
            .advancedScoring
        )
      }
    )
  }

  async undo() {
    const {
      backup,
      variables: { mediaId }
    } = this

    if (this.done) {
      await apollo
        .mutate<MediaList, SaveVariables>({
          mutation: SAVE_MEDIA_LIST_ENTRY,
          variables: {
            mediaId,
            ...backup
          }
        })
        .then(() => {
          history.value.pop()
        })
    } else {
      history.value.pop()
    }
  }

  async execute() {
    await this.saveState()

    const {
      variables: { id }
    } = this

    return apollo
      .mutate<{ deleted: boolean }, DeleteVariables>({
        mutation: DELETE_MEDIA_LIST_ENTRY,
        variables: {
          id
        }
      })
      .then(() => {
        this.done = true
      })
  }
}

const isSaveCommand = (e: any): e is SaveCommandConstructor =>
  e._class === 'SaveCommand'

const isDeleteCommand = (e: any): e is DeleteCommandConstructor =>
  e._class === 'DeleteCommand'

const history: Ref<ListCommand[]> = ref(
  (stored &&
    JSON.parse(stored, (key, value) => {
      if (value instanceof Object) {
        if (isSaveCommand(value)) {
          return new SaveCommand(value)
        }
        if (isDeleteCommand(value)) {
          return new DeleteCommand(value)
        }
      }
      return value
    })) ||
    []
)
;(async () => {
  for (const command of history.value.filter(({ done }) => !done)) {
    await command.execute()
  }
})()

const dispatch = async (command: ListCommand) => {
  history.value.push(command)
  await command.execute()
  return command
}

export default function useMutations() {
  return {
    history,
    dispatch
  }
}

export const mediaListToForm = (
  mediaListEntry: MediaList | null,
  advancedScoring: string[]
): Form => {
  if (mediaListEntry) {
    const advancedScores = advancedScoring
      .map(key => mediaListEntry.advancedScores[key])
      .map(value => value || 0)

    delete mediaListEntry.__typename
    delete mediaListEntry.startedAt.__typename
    delete mediaListEntry.completedAt.__typename
    delete mediaListEntry.private
    delete mediaListEntry.id
    delete mediaListEntry.mediaId

    return {
      ...mediaListEntry,
      advancedScores
    }
  }

  const advancedScores = advancedScoring.map(() => 0)
  return {
    status: null,
    notes: '',
    score: 0,
    progress: 0,
    progressVolumes: 0,
    repeat: 0,
    startedAt: { day: null, year: null, month: null },
    completedAt: { day: null, year: null, month: null },
    advancedScores
  }
}

export const isDate = (e: any): e is FuzzyDate => e.__typename === 'FuzzyDate'
