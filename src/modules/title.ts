import { MediaTitle } from '@/graphql/schema/media'
import { Module } from 'vuex-composition-api'

const stored: string | null = localStorage.getItem('TITLE')

export const useTitle = () =>
  new Module({
    name: 'title',
    namespaced: true,
    setup({ state, getter, mutation }) {
      const prefered = state((stored && parseInt(stored)) || 0)

      const titles = state(['romaji', 'english', 'native'] as const)

      const getPreferedTitle = getter(() => titles.value[prefered.value])

      const getTitle = getter(() => (title: MediaTitle | null) =>
        (title && (title[getPreferedTitle.value] || title.romaji)) || '',
      )

      const CHANGE_PREFERED = mutation(
        'CHANGE_PREFERED',
        { prefered },
        (state, payload: number) => {
          localStorage.setItem('TITLE', payload.toString())
          state.prefered = payload
        },
      )

      const changePreferedTitle = (
        payload: keyof Omit<MediaTitle, '__typename'>,
      ) => {
        CHANGE_PREFERED(titles.value.indexOf(payload))
      }

      return {
        actions: {
          changePreferedTitle,
        },
        getters: {
          getPreferedTitle,
          getTitle,
        },
        mutations: {
          CHANGE_PREFERED,
        },
        state: {
          prefered,
          titles,
        },
      }
    },
  })
