import { MediaTitle } from '@/graphql/schema/media'
import { computed } from '@vue/composition-api'
import { useState } from './useState'
import { useStore } from './useStore'

export const useTitle = () => {
  const titles = ['romaji', 'english', 'native'] as const

  const { dispatch, actions } = useStore()

  const prefered = useState(state => state.title.prefered)

  const getPreferedTitle = computed(() => titles[prefered.value])

  const getTitle = (title: MediaTitle | null) =>
    (title && (title[getPreferedTitle.value] || title.romaji)) || ''

  const changePreferedTitle = (
    payload: keyof Omit<MediaTitle, '__typename'>,
  ) => {
    dispatch(actions.title.CHANGE_PREFERED(titles.indexOf(payload)))
  }
  return {
    changePreferedTitle,
    getPreferedTitle,
    getTitle,
    titles,
  }
}
