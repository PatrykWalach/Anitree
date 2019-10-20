import VuexCompositionApi, { Module, State } from 'vuex-composition-api'
import Vue from 'vue'

import { watch } from '@vue/composition-api'

Vue.use(VuexCompositionApi)

const cache = localStorage.getItem('SETTINGS')

const stored = cache && JSON.parse(cache)

export const useSettings = () =>
  new Module({
    name: 'settings',
    namespaced: true,
    setup({ state, mutation }) {
      const cacheApollo: State<boolean> = state(
        (stored && stored.cacheApollo) || false,
      )
      const cacheChanges: State<boolean> = state(
        (stored && stored.cacheChanges) || false,
      )
      const token: State<string | null> = state(
        (stored && stored.token) || false,
      )

      const syncChanges: State<boolean> = state(
        (stored && stored.syncChanges) || false,
      )

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

      watch(() =>
        localStorage.setItem(
          'SETTINGS',
          JSON.stringify({
            cacheApollo: cacheApollo.value,
            cacheChanges: cacheChanges.value,
            syncChanges: syncChanges.value,
            token: token.value,
          }),
        ),
      )

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
