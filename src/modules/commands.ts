import {
  DeleteCommand,
  DeleteCommandConstructor,
} from './commands/DeleteCommand'
import { Module, State } from 'vuex-composition-api'
import { SaveCommand, SaveCommandConstructor } from './commands/SaveCommand'
import { Form } from '@/types'
import { FuzzyDate } from '@/graphql/schema/media'
import { MediaList } from '@/graphql/schema/mediaListCollection'
import { useSettings } from './settings'
import { watch } from '@vue/composition-api'

export interface Command {
  saveState?(): void | Promise<void>
  undo?(): void | Promise<void>
  execute(): void | Promise<void>
}

export interface ListCommand extends Command {
  backup: any | null
  variables: any
  undo(): Promise<void>
  execute(): Promise<void>
  done: boolean
  _class: string
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

export const loadHistory = (stored: string | null) =>
  stored &&
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
  })

export const executeNotDoneCommands = async (commands: ListCommand[]) => {
  for (const command of commands.filter(({ done }) => !done)) {
    try {
      await command.execute()
    } catch {
      break
    }
  }
}

export const useCommands = (settings: ReturnType<typeof useSettings>) =>
  new Module({
    name: 'commands',
    namespaced: true,
    setup({ state, mutation }) {
      const history: State<ListCommand[]> = state(
        // loadHistory(stored) ||
        [],
      )

      // executeNotDoneCommands(history.value)

      // watch(() => {
      //   if (settings.state.cacheChanges.value) {
      //     localStorage.setItem('CHANGES', JSON.stringify(history.value))
      //   } else {
      //     localStorage.removeItem('CHANGES')
      //   }
      // })

      const PUSH_COMMAND = mutation(
        'PUSH_COMMAND',
        { history },
        (state, command: ListCommand) => state.history.push(command),
      )

      const POP_COMMAND = mutation('POP_COMMAND', { history }, state =>
        state.history.pop(),
      )

      const undo = async () => {
        history.value[history.value.length - 1].undo().then(POP_COMMAND)
      }

      const add = async (command: ListCommand) => {
        PUSH_COMMAND(command)
        await command.execute()
        return command
      }

      return {
        actions: {
          add,
          undo,
        },
        mutations: {
          POP_COMMAND,
          PUSH_COMMAND,
        },
        state: {
          history,
        },
      }
    },
  })

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
