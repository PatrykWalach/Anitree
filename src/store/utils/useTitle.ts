import { Ref, computed } from '@vue/composition-api'
import { State, useActions } from '../'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { MediaTitle } from '@/graphql/schema/media'

export const useTitle = () => {
  const titles = ['romaji', 'english', 'native'] as const

  const dispatch = useDispatch()
  const actions = useActions()

  const prefered = useSelector((state: State) => state.title.prefered)

  const getPreferedTitle = computed(() => titles[prefered.value])

  const getTitle = computed(() => (title: MediaTitle | null) =>
    (title && (title[getPreferedTitle.value] || title.romaji)) || '',
  ) as Ref<(title: MediaTitle | null) => string>

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
