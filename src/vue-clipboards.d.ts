declare module 'vue-clipboards' {
  import { DirectiveOptions, PluginFunction } from 'vue'
  const VueClipboards: PluginFunction<undefined>

  export const clipboard: DirectiveOptions
  export default VueClipboards
}
