import { Module } from 'vuex-composition-api'

export const useFilter = () =>
  new Module({
    name: 'filter',
    namespaced: true,
    setup({ state, mutation }) {
      const isShown = state(false)

      const CHANGE_IS_SHOWN = mutation(
        'CHANGE_IS_SHOWN',
        { isShown },
        (state, payload: boolean) => {
          state.isShown = payload
        },
      )

      return {
        mutations: {
          CHANGE_IS_SHOWN,
        },
        state: {
          isShown,
        },
      }
    },
  })
