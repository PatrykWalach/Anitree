import { Ref, SetupContext, computed } from '@vue/composition-api'

import { ApolloQueryProps } from '@/graphql/schema'

import MEDIA from '@/graphql/queries/Media.gql'
import { Media as MediaT } from '@/graphql/schema/media'
import { User } from './graphql/schema/viewer'
import VIEWER from '@/graphql/queries/Viewer.gql'
import { Variables } from '@/graphql/schema/media'

export { default as MEDIA } from '@/graphql/queries/Media.gql'

export {
  default as MEDIA_LIST_COLLECTION,
} from '@/graphql/queries/MediaListCollection.gql'
export { default as PAGE } from '@/graphql/queries/Page.gql'
export { default as VIEWER } from '@/graphql/queries/Viewer.gql'

export {
  default as SAVE_MEDIA_LIST_ENTRY,
} from '@/graphql/mutations/SaveMediaListEntry.gql'
export {
  default as DELETE_MEDIA_LIST_ENTRY,
} from '@/graphql/mutations/DeleteMediaListEntry.gql'

export const useMedia = (props: () => Variables) => {
  const variables = computed(props)

  const Media: Ref<ApolloQueryProps<{ Media: MediaT }, Variables>> = computed(
    () => ({
      query: MEDIA,
      skip: !variables.value.id || variables.value.id === 0,
      variables: variables.value,
    }),
  )

  return {
    Media,
    variables,
  }
}

export const useViewer = (root: SetupContext['root']) => {
  const { token } = root.$modules.settings

  const Viewer: Ref<ApolloQueryProps<{ Viewer: User }, never>> = computed(
    () => ({
      query: VIEWER,
      skip: !token.value,
      tag: null,
    }),
  )

  return {
    Viewer,
    token,
  }
}
