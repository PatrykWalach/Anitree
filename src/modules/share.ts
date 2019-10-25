import { State, createModule } from 'vuex-composition-api'

import { ShareData } from '@/types'

export const useShare = () =>
  createModule({
    name: 'share',
    namespaced: true,
    setup({ state, mutation }) {
      const options: State<ShareData | null> = state(null)
      const isShared = state(false)

      const CHANGE_OPTIONS = mutation(
        'CHANGE_OPTIONS',
        { options },
        (state, _options: ShareData | null) => {
          state.options = _options
        },
      )
      const CHANGE_IS_SHARED = mutation(
        'CHANGE_IS_SHARED',
        { isShared },
        (state, _isShared: boolean) => {
          state.isShared = _isShared
        },
      )

      return {
        mutations: {
          CHANGE_IS_SHARED,
          CHANGE_OPTIONS,
        },
        state: {
          isShared,
          options,
        },
      }
    },
  })
