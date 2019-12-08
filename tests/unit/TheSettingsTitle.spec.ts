import TheSettingsTitle from '@/components/TheSettingsTitle.vue'
import { matchSnapshot } from './utils'
import { useMockedStore } from './mocks/store'

describe('TheSettingsTitle', () => {
  matchSnapshot(TheSettingsTitle, useMockedStore())
})
