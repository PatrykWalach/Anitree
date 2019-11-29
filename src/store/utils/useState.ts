import { Ref, computed, onUnmounted, ref } from '@vue/composition-api'
import { State } from '..'
import { useStore } from './useStore'

type Option<R> = {
  get: (state: State) => R
  set: (value: R) => void
}

export const useState = <R>(get: Option<R>['get']) => {
  const { subscribe, getState } = useStore()

  const selector: Ref<R> = ref(get(getState()))

  let currentValue: R
  function handleChange() {
    const previousValue = currentValue
    currentValue = get(getState())

    if (previousValue !== currentValue) {
      selector.value = currentValue
    }
  }

  const unsubscribe = subscribe(handleChange)
  onUnmounted(unsubscribe)

  return computed(() => selector.value)
}
