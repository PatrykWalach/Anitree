import { Ref, computed, ref } from '@vue/composition-api'

interface UseReducer {
  <S>(reducer: (state: S) => S, initialState: S): [Ref<Readonly<S>>, () => void]
  <S, A>(reducer: (state: S, action: A) => S, initialState: S): [
    Ref<Readonly<S>>,
    (action: A) => void,
  ]
  <S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S,
    middlewares: ((
      dispatch: (action?: A) => void,
      immutableState: Ref<Readonly<S>>,
    ) => (next: (action?: A) => void) => (action?: A) => any)[],
  ): [Ref<Readonly<S>>, (action: A) => void]
}

export const useReducer: UseReducer = <S, A>(
  reducer: (state: S, action?: A) => S,
  initialState: S,
  middlewares: ((
    dispatch: (action?: A) => void,
    immutableState: Ref<Readonly<S>>,
  ) => (next: (action?: A) => void) => (action?: A) => any)[] = [],
): [Ref<Readonly<S>>, (action?: A) => void] => {
  const state: Ref<S> = ref(initialState)
  const immutableState = computed(() => state.value)

  const wrapper = {
    dispatch(action?: A) {
      state.value = reducer(immutableState.value, action)
    },
  }

  wrapper.dispatch = middlewares
    .slice()
    .reverse()
    .reduce(
      (next, middleware) => middleware(wrapper.dispatch, immutableState)(next),
      wrapper.dispatch,
    )

  return [immutableState, wrapper.dispatch]
}

export const useComputedOrCallback = <T>(value: Ref<T> | (() => T)) => {
  return value instanceof Function ? computed(value) : value
}
