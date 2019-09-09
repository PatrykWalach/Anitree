import CompositionApi, { ref, watch } from '@vue/composition-api'
import Vue from 'vue'

Vue.use(CompositionApi)

const cache = localStorage.getItem('SETTINGS')
const stored = cache && JSON.parse(cache)

const cacheApollo = ref((stored && stored.cacheApollo) || false)
const cacheChanges = ref((stored && stored.cacheChanges) || false)
const token = ref((stored && stored.token) || false)
const syncChanges = ref((stored && stored.syncChanges) || false)

watch(() => {
  if (!cacheChanges.value) localStorage.removeItem('CHANGES')
})

watch(() =>
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
