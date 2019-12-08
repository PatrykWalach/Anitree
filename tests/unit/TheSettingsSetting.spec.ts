// action: { default: true, required: false, type: Boolean },
// subtitle: { default: '', required: false, type: String },
// title: { default: '', required: false, type: String },

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
