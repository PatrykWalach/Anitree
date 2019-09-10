import CompositionApi, { Ref, ref, watch } from '@vue/composition-api'
import {
  DeleteCommand,
  DeleteCommandConstructor,
} from './commands/DeleteCommand'
import { DeleteVariables, SaveVariables } from '@/graphql/schema/listEntry'
import { SaveCommand, SaveCommandConstructor } from './commands/SaveCommand'
import { Form } from '@/types'
import { FuzzyDate } from '@/graphql/schema/media'
import { MediaList } from '@/graphql/schema/mediaListCollection'
import Vue from 'vue'
import { useSettings } from './settings'

Vue.use(CompositionApi)

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

export const isDeleteCommand = (
  e: (SaveCommandConstructor | DeleteCommandConstructor) &
    Pick<ListCommand, '_class'>,
): e is DeleteCommandConstructor & Pick<DeleteCommand, '_class'> =>
  e._class === 'DeleteCommand'

export const isSaveCommand = (
  e: (SaveCommandConstructor | DeleteCommandConstructor) &
    Pick<ListCommand, '_class'>,
): e is SaveCommandConstructor & Pick<SaveCommand, '_class'> =>
  e._class === 'SaveCommand'

const stored = localStorage.getItem('CHANGES')

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

watch(() => {
  if (useSettings().cacheChanges.value) {
    localStorage.setItem('CHANGES', JSON.stringify(history.value))
  }
})
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

export const useCommands = () => {
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
