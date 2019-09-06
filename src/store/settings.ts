import CompositionApi, { ref, watch } from '@vue/composition-api'
import Vue from 'vue'

Vue.use(CompositionApi)

const stored = localStorage.getItem('SETTINGS')
const settings = stored && JSON.parse(stored)

const cacheApollo = ref((settings && settings.cacheApollo) || false)
const cacheChanges = ref((settings && settings.cacheChanges) || false)
const token = ref((settings && settings.token) || false)
const syncChanges = ref((settings && settings.syncChanges) || false)

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
