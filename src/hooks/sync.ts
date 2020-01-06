import { computed, SetupContext } from '@vue/composition-api'

export const useSync = <O, K extends keyof O>(
  props: O,
  key: K,
  emit: SetupContext['emit'],
) =>
  computed({
    get: () => props[key],
    set: value => emit(`update:${key}`, value),
  })
