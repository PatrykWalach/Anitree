import { createVariations, matchSnapshot } from './utils'
import TheSettingsSetting from '@/components/TheSettingsSetting.vue'

describe('TheSettingsSetting', () => {
  createVariations({
    propsData: {
      action: () => [true, false],
      subtitle: '',
      title: '',
    },
  }).forEach(settings => matchSnapshot(TheSettingsSetting, settings))
})
