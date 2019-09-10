import CompositionApi, { computed, ref } from '@vue/composition-api'
import { MediaTitle } from '@/graphql/schema/media'
import Vue from 'vue'
Vue.use(CompositionApi)

const stored: string | null = localStorage.getItem('TITLE')

const _prefered = ref((stored && parseInt(stored)) || 0)

const titles = ref(['romaji', 'english', 'native'] as const)

const title = computed(() => (title: MediaTitle | null) =>
  (title && (title[preferedTitle.value] || title.romaji)) || ''
)

const CHANGE_PREFERED = (payload: number) => {
  localStorage.setItem('TITLE', payload.toString())
  _prefered.value = payload
}

const CHANGE_PREFERED_TILE = (
  payload: keyof Omit<MediaTitle, '__typename'>
) => {
  CHANGE_PREFERED(titles.value.indexOf(payload))
}

const preferedTitle = computed({
  get: () => titles.value[_prefered.value],
  set: CHANGE_PREFERED_TILE
})

const prefered = computed({ get: () => _prefered.value, set: CHANGE_PREFERED })

const useTitle = () => {
  return {
    CHANGE_PREFERED,
    CHANGE_PREFERED_TILE,
    _prefered,
    prefered,
    preferedTitle,
    title,
    titles
  }
}

export default useTitle
