import { useCommands } from './commands'
import { useEdit } from './edit'
import { useNavigation } from './navigation'
import { useSettings } from './settings'
import { useShare } from './share'
import { useTitle } from './title'

export const title = useTitle()
export const settings = useSettings()
export const share = useShare()
export const navigation = useNavigation()
export const commands = useCommands(settings)
export const edit = useEdit(settings, commands)
