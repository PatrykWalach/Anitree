declare module 'vue-clipboards' {
  import { DirectiveOptions, PluginFunction } from 'vue'
  //   import VueClipboards, { clipboard } from 'vue-clipboards'
  type VueClipboards = PluginFunction<undefined>

  export const clipboard: DirectiveOptions
  export default VueClipboards
}
