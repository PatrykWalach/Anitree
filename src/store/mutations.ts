import CompositionApi, { Ref, ref, watch } from '@vue/composition-api'
import {
  DELETE_MEDIA_LIST_ENTRY,
  MEDIA,
  SAVE_MEDIA_LIST_ENTRY,
  VIEWER,
  apollo,
} from '@/graphql'
import { DeleteVariables, SaveVariables } from '@/graphql/schema/listEntry'

import {
  FuzzyDate,
  Media,
  Variables as MediaVariables,
} from '@/graphql/schema/media'

import { Form } from '@/types'
import { MediaList } from '@/graphql/schema/mediaListCollection'
import { User } from '@/graphql/schema/viewer'
import Vue from 'vue'

import { useSettings } from './settings'

Vue.use(CompositionApi)
const stored = localStorage.getItem('CHANGES')

watch(() => {
  if (useSettings().cacheChanges.value) {
    localStorage.setItem('CHANGES', JSON.stringify(history.value))
  }
})

export const areUndoable = (
  commands: Command[],
): commands is Required<Command>[] => commands.every(e => e.undo)

export class MacroCommand implements Command {
  public commands: Set<Command>

  constructor(commands: Command[]) {
    this.commands = new Set(commands)
  }

  public undo() {
    const commands = [...this.commands].reverse()
    if (areUndoable(commands)) {
      for (const command of commands) {
        command.undo()
      }
    }
  }

  public execute() {
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
  variables: SaveVariables | (DeleteVariables & Pick<SaveVariables, 'mediaId'>)
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
  public backup: Form | null
  public variables: SaveVariables
  public done: boolean
  public _class = 'SaveCommand' as const

  constructor({
    variables,

    backup = null,
    done = false,
  }: SaveCommandConstructor) {
    this.variables = variables
    this.backup = backup
    this.done = done
  }

  public saveState() {
    const { variables } = this

    return Promise.all([
      apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: variables.mediaId },
        })
        .then(({ data }) => data.Media),
      apollo
        .query<{ Viewer: User }>({ query: VIEWER })
        .then(({ data }) => data.Viewer),
    ] as [Promise<Media>, Promise<User>]).then(
      ([{ mediaListEntry, type }, { mediaListOptions }]) => {
        this.backup = Object.fromEntries(
          Object.entries(
            mediaListToForm(
              mediaListEntry,
              mediaListOptions[type === 'MANGA' ? 'mangaList' : 'animeList']
                .advancedScoring,
            ),
          ).filter(([key]) => variables.hasOwnProperty(key)),
        ) as Form
      },
    )
  }

  public async undo() {
    const {
      backup,
      variables: { mediaId },
    } = this

    if (this.done) {
      await apollo
        .mutate<MediaList, SaveVariables>({
          mutation: SAVE_MEDIA_LIST_ENTRY,
          variables: { mediaId, ...backup },
        })
        .then(() => {
          history.value.pop()
        })
    } else {
      history.value.pop()
    }
  }

  public async execute() {
    await this.saveState()

    const { variables } = this

    return apollo
      .mutate<MediaList, SaveVariables>({
        mutation: SAVE_MEDIA_LIST_ENTRY,
        variables,
      })
      .then(() => {
        this.done = true
      })
  }
}
export class DeleteCommand implements ListCommand {
  public backup: Form | null
  public variables: DeleteVariables & Pick<SaveVariables, 'mediaId'>
  public done: boolean
  public _class = 'DeleteCommand' as const

  constructor({
    variables,

    backup = null,
    done = false,
  }: DeleteCommandConstructor) {
    this.variables = variables
    this.backup = backup
    this.done = done
  }

  public saveState() {
    const {
      variables: { mediaId },
    } = this

    return Promise.all([
      apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: mediaId },
        })
        .then(({ data }) => data.Media),
      apollo
        .query<{ Viewer: User }>({ query: VIEWER })
        .then(({ data }) => data.Viewer),
    ] as [Promise<Media>, Promise<User>]).then(
      ([{ mediaListEntry, type }, { mediaListOptions }]) => {
        this.backup = mediaListToForm(
          mediaListEntry,
          mediaListOptions[type === 'MANGA' ? 'mangaList' : 'animeList']
            .advancedScoring,
        )
      },
    )
  }

  public async undo() {
    const {
      backup,
      variables: { mediaId },
    } = this

    if (this.done) {
      await apollo
        .mutate<MediaList, SaveVariables>({
          mutation: SAVE_MEDIA_LIST_ENTRY,
          variables: {
            mediaId,
            ...backup,
          },
        })
        .then(() => {
          history.value.pop()
        })
    } else {
      history.value.pop()
    }
  }

  public async execute() {
    await this.saveState()

    const {
      variables: { id },
    } = this

    return apollo
      .mutate<{ deleted: boolean }, DeleteVariables>({
        mutation: DELETE_MEDIA_LIST_ENTRY,
        variables: {
          id,
        },
      })
      .then(() => {
        this.done = true
      })
  }
}

const isSaveCommand = (
  e: (SaveCommandConstructor | DeleteCommandConstructor) &
    Pick<ListCommand, '_class'>,
): e is SaveCommandConstructor & Pick<SaveCommand, '_class'> =>
  e._class === 'SaveCommand'

const isDeleteCommand = (
  e: (SaveCommandConstructor | DeleteCommandConstructor) &
    Pick<ListCommand, '_class'>,
): e is DeleteCommandConstructor & Pick<DeleteCommand, '_class'> =>
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
    [],
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

export const useMutations = () => {
  return {
    dispatch,
    history,
  }
}

export const mediaListToForm = (
  mediaListEntry: MediaList | null,
  advancedScoring: string[],
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
      advancedScores,
    }
  }

  const advancedScores = advancedScoring.map(() => 0)
  return {
    advancedScores,
    completedAt: { day: null, month: null, year: null },
    notes: '',
    progress: 0,
    progressVolumes: 0,
    repeat: 0,
    score: 0,
    startedAt: { day: null, month: null, year: null },
    status: null,
  }
}

export const isDate = (e: any): e is FuzzyDate => e.__typename === 'FuzzyDate'
