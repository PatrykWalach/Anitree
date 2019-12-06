import { State, useActions } from '../'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { ListCommand } from '../modules/commands'
import { computed } from '@vue/composition-api'

export const useCommands = () => {
  const dispatch = useDispatch()
  const actions = useActions()

  const history = useSelector((state: State) => state.commands.history)

  const undo = async () => {
    history.value[history.value.length - 1]
      .undo()
      .then(() => dispatch(actions.commands.POP_COMMAND()))
  }

  const add = async (command: ListCommand) => {
    dispatch(actions.commands.PUSH_COMMAND(command))
    await command.execute()
    return command
  }

  const getPending = computed(() => history.value.filter(({ done }) => !done))
  return { add, getPending, undo }
}
