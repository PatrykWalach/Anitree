import { UseQueryOptions, useQuery, useResult } from '@vue/apollo-composable'

import MEDIA from '@/graphql/queries/Media.gql'
import { Media as MediaSchema } from '@/graphql/schema/media'
import { Ref } from '@vue/composition-api'
import { State } from '@/store'
import { User } from './graphql/schema/viewer'
import VIEWER from '@/graphql/queries/Viewer.gql'
import { Variables } from '@/graphql/schema/media'
import { useSelector } from 'vue-redux-hooks'
import { Form } from './types'
import { MediaList } from './graphql/schema/mediaListCollection'

export { default as MEDIA } from '@/graphql/queries/Media.gql'

export { default as MEDIA_LIST_COLLECTION } from '@/graphql/queries/MediaListCollection.gql'
export { default as PAGE } from '@/graphql/queries/Page.gql'
export { default as VIEWER } from '@/graphql/queries/Viewer.gql'

export { default as SAVE_MEDIA_LIST_ENTRY } from '@/graphql/mutations/SaveMediaListEntry.gql'
export { default as DELETE_MEDIA_LIST_ENTRY } from '@/graphql/mutations/DeleteMediaListEntry.gql'

export const useMedia = (
  variables: Ref<Variables>,
  options?: UseQueryOptions<Variables>,
) => {
  const { result } = useQuery<{ Media: MediaSchema }, Variables>(
    MEDIA,
    variables,
    () => ({
      enabled: !!variables.value.id && variables.value.id !== 0,
      ...options,
    }),
  )
  // watch(() => console.log(variables.value))
  // onError(error => {
  //   if (process.env.NODE_ENV !== 'production') {
  //     logErrorMessages(error)
  //   }
  // })

  const Media = useResult(result, null, data => data.Media)

  return {
    Media,
    result,
    variables,
  }
}

export const useViewer = () => {
  const token = useSelector((state: State) => state.settings.token)

  const {
    result,
    //  onError
  } = useQuery<{ Viewer: User }, null>(VIEWER, null, () => ({
    enabled: !!token,
  }))

  // onError(error => {
  //   if (process.env.NODE_ENV !== 'production') {
  //     logErrorMessages(error)
  //   }
  // })

  const Viewer = useResult(result, null, data => data.Viewer)

  return {
    Viewer,
    result,
    token,
  }
}

export const mediaListToForm = (
  mediaListEntry: MediaList | null,
  advancedScoring: string[],
): Form => {
  if (mediaListEntry) {
    const advancedScores = advancedScoring
      .map(key => mediaListEntry.advancedScores[key])
      .map(value => value || 0)

    delete mediaListEntry.__typename
    delete mediaListEntry.startedAt.__typename
    delete mediaListEntry.completedAt.__typename
    delete mediaListEntry.private
    delete mediaListEntry.id
    delete mediaListEntry.mediaId

    return {
      ...mediaListEntry,
      advancedScores,
    }
  }

  const advancedScores = advancedScoring.map(() => 0)
  return {
    advancedScores,
    completedAt: { day: null, month: null, year: null },
    notes: '',
    progress: 0,
    progressVolumes: 0,
    repeat: 0,
    score: 0,
    startedAt: { day: null, month: null, year: null },
    status: null,
  }
}
