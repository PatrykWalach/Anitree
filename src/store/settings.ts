import CompositionApi, { ref, watch } from '@vue/composition-api'
import Vue from 'vue'

Vue.use(CompositionApi)

const stored = localStorage.getItem('SETTINGS')
const settings = stored && JSON.parse(stored)

const cacheApollo = ref(settings.cacheApollo || false)
const cacheChanges = ref(settings.cacheChanges || false)
const token = ref(settings.token || false)
const syncChanges = ref(settings.syncChanges || false)

watch(
  // [cacheApollo, token],
  () =>
    localStorage.setItem(
      'SETTINGS',
      JSON.stringify({
        cacheApollo: cacheApollo.value,
        cacheChanges: cacheChanges.value,
        syncChanges: syncChanges.value,
        token: token.value
      })
    )
)

export default function useSettings() {
  return {
    cacheApollo,
    cacheChanges,
    syncChanges,
    token
  }
}
