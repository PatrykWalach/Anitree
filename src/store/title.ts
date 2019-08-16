import { value as binding, Wrapper, computed, plugin } from 'vue-function-api'
import { MediaTitle } from '@/apollo/schema/media'
import Vue from 'vue'
Vue.use(plugin)

const stored: string | null = localStorage.getItem('TITLE')

const _prefered = binding((stored && parseInt(stored)) || 0)

const titles: Wrapper<['romaji', 'english', 'native']> = binding([
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

const preferedTitle = computed(
  () => titles.value[_prefered.value],
  CHANGE_PREFERED_TILE
)

const prefered = computed(() => _prefered.value, CHANGE_PREFERED)

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
