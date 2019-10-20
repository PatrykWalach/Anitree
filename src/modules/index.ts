import { useCommands } from './commands'
import { useEdit } from './edit'
import { useFilter } from './filter'
import { useNavigation } from './navigation'
import { useSettings } from './settings'
import { useShare } from './share'
import { useTimeline } from './timeline'
import { useTitle } from './title'

export const timeline = useTimeline()
export const title = useTitle()
export const settings = useSettings()
export const share = useShare()
export const navigation = useNavigation()
export const filter = useFilter()
export const commands = useCommands(settings)
export const edit = useEdit(settings, commands)
