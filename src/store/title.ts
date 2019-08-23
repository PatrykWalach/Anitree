import VueFunctionApi, { ref, Ref, computed } from 'vue-function-api'
import { MediaTitle } from '@/apollo/schema/media'
import Vue from 'vue'
Vue.use(VueFunctionApi)

const stored: string | null = localStorage.getItem('TITLE')

const _prefered = ref((stored && parseInt(stored)) || 0)

const titles: Ref<['romaji', 'english', 'native']> = ref([
  'romaji',
  'english',
  'native'
])

const title = computed(() => (title: MediaTitle | null) =>
  (title && (title[preferedTitle.value] || title.romaji)) || ''
)

const CHANGE_PREFERED = (payload: number) => {
  localStorage.setItem('TITLE', payload.toString())
  _prefered.value = payload
}

const CHANGE_PREFERED_TILE = (payload: keyof MediaTitle) => {
  CHANGE_PREFERED(titles.value.indexOf(payload))
}

const preferedTitle = computed({
  get: () => titles.value[_prefered.value],
  set: CHANGE_PREFERED_TILE
})

const prefered = computed({ get: () => _prefered.value, set: CHANGE_PREFERED })

export default function useTitle() {
  return {
    _prefered,
    prefered,
    titles,
    preferedTitle,
    title,
    CHANGE_PREFERED_TILE,
    CHANGE_PREFERED
  }
}
