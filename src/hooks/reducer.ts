import { Ref, computed, ref } from '@vue/composition-api'

interface Store<A, S> {
  dispatch: (action?: A) => void
  state: Ref<Readonly<S>>
}

type Middlewares<A, S> = ((
  store: Store<A, S>,
) => (next: (action?: A) => void) => (action?: A) => any)[]

interface UseReducer {
  <S>(reducer: (state: S) => S, initialState: S): [Ref<Readonly<S>>, () => void]
  <S, A>(reducer: (state: S, action: A) => S, initialState: S): [
    Ref<Readonly<S>>,
    (action: A) => void,
  ]
  <S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S,
    middlewares: Middlewares<A, S>,
  ): [Ref<Readonly<S>>, (action: A) => void]
}

export const useReducer: UseReducer = <S, A>(
  reducer: (state: S, action?: A) => S,
  initialState: S,
  middlewares: Middlewares<A, S> = [],
): [Ref<Readonly<S>>, (action?: A) => void] => {
  const state: Ref<S> = ref(initialState)
  const immutableState = computed(() => state.value)

  const store: Store<A, S> = {
    state: immutableState,
    dispatch(action?: A) {
      state.value = reducer(immutableState.value, action)
    },
  }

  store.dispatch = middlewares
    .slice()
    .reverse()
    .reduce((next, middleware) => middleware(store)(next), store.dispatch)

  return [immutableState, store.dispatch]
}

export const useComputedOrCallback = <T>(value: Ref<T> | (() => T)) => {
  return value instanceof Function ? computed(value) : value
}
