import VuexCompositionApi from 'vuex-composition-api'

import { watch } from '@vue/composition-api'

const cache = localStorage.getItem('SETTINGS')

const stored = cache && JSON.parse(cache)

export const settings = new VuexCompositionApi.Module({
  name: 'settings',
  namespaced: true,
  setup({ state, mutation }) {
    const cacheApollo = state((stored && stored.cacheApollo) || false)
    const cacheChanges = state((stored && stored.cacheChanges) || false)
    const token = state((stored && stored.token) || false)
    const syncChanges = state((stored && stored.syncChanges) || false)

    const CHANGE_CACHE_APOLLO = mutation(
      'CHANGE_CACHE_APOLLO',
      { cacheApollo },
      (state, _cacheApollo: boolean) => {
        state.cacheApollo = _cacheApollo
      },
    )

    const CHANGE_CACHE_CHANGES = mutation(
      'CHANGE_CACHE_CHANGES',
      { cacheChanges },
      (state, _cacheChanges: boolean) => {
        state.cacheChanges = _cacheChanges
      },
    )

    const CHANGE_TOKEN = mutation(
      'CHANGE_TOKEN',
      { token },
      (state, _token: string | null) => {
        state.token = _token
      },
    )

    const CHANGE_SYNC_CHANGES = mutation(
      'CHANGE_SYNC_CHANGES',
      { syncChanges },
      (state, _syncChanges: boolean) => {
        state.syncChanges = _syncChanges
      },
    )

    watch(() => {
      if (!cacheChanges.value) {
        localStorage.removeItem('CHANGES')
      } else {
        JSON.stringify({
          cacheApollo: cacheApollo.value,
          cacheChanges: cacheChanges.value,
          syncChanges: syncChanges.value,
          token: token.value,
        })
      }
    })

    return {
      mutations: {
        CHANGE_CACHE_APOLLO,
        CHANGE_CACHE_CHANGES,
        CHANGE_SYNC_CHANGES,
        CHANGE_TOKEN,
      },
      state: {
        cacheApollo,
        cacheChanges,
        syncChanges,
        token,
      },
    }
  },
})
