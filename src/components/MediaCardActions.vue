<template>
  <v-card-actions>
    <v-btn
      color="primary"
      text
      exact
      :to="{
        name: 'media',
        params: {
          mediaId: media.id,
          mediaType: media.type.toLowerCase(),
        },
      }"
    >
      Explore
    </v-btn>

    <v-spacer></v-spacer>
    <v-tooltip top>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          @click="toggleFavorite"
          :disabled="queryLoading"
          :loading="mutationLoading"
          text
          color="red"
          v-on="on"
          v-bind="attrs"
        >
          <v-icon small left>{{
            isFavourite ? 'favorite' : 'favorite_border'
          }}</v-icon>
          {{ favourites }}
        </v-btn>
      </template>
      <span>{{ isFavourite ? 'Unfavourite' : 'Favourite' }}</span>
    </v-tooltip>
    <v-tooltip
      top
      :key="title"
      v-for="{ bind, icon, title, on: action } in actions"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn v-bind="{ ...bind, ...attrs }" icon v-on="{ ...action, ...on }">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ title }}</span>
    </v-tooltip>
  </v-card-actions>
</template>

<script lang="ts">
import {
  Favourites,
  Variables as ToggleFavouriteVariables,
} from '../graphql/schema/favourites'
import { MEDIA, TOGGLE_FAVOURITE, useViewer } from '@/graphql'
import { NavigationElement, ShareData } from '../types'
import { computed, createComponent } from '@vue/composition-api'
import { useActions, useEdit as useEditActions } from '@/store'
import {
  useMutation,
  useMutationLoading,
  useQueryLoading,
} from '@vue/apollo-composable'
import { DataProxy } from 'apollo-cache'
import { DocumentNode } from 'graphql'
import { Media } from '@/graphql/schema/media'
import { Variables } from '../graphql/schema/media'
import { useDispatch } from 'vue-redux-hooks'
import { useIntl } from '../utils/useIntl'
import { useTitle } from '../store'

export interface Props {
  media: Media
}

export const useMediaCardActions = () => {
  const { shareBtn, ...share } = useShare()
  const { anilistBtn, ...anilist } = useAnilist()
  const { editBtn, ...edit } = useEdit()

  const actions = (media: Media | null): NavigationElement[] => [
    editBtn(media && media.id),
    shareBtn(media),
    anilistBtn(media),
  ]

  return {
    ...edit,
    ...anilist,
    ...share,
    actions,
  }
}

export const useShare = () => {
  const dispatch = useDispatch()
  const {
    share: { CHANGE_IS_SHARED, CHANGE_OPTIONS },
  } = useActions()

  const desktopShare = (data: ShareData) => {
    dispatch(CHANGE_OPTIONS(data))
    dispatch(CHANGE_IS_SHARED(true))
  }

  const { getTitle } = useTitle()

  const share = ({ title, siteUrl }: Media) => {
    const share = navigator.share || desktopShare
    share.call(navigator, {
      title: getTitle.value(title),
      url: siteUrl,
    })
  }

  const shareBtn = (media: Media | null): NavigationElement => ({
    bind: {
      disabled: !media,
    },
    icon: 'share',
    on: {
      click: (e: Event) => {
        e.preventDefault()
        media && share(media)
      },
    },
    title: 'Share',
  })

  return { share, shareBtn }
}

export const useEdit = () => {
  const { open } = useEditActions()

  const editBtn = (id: number | null): NavigationElement => ({
    bind: {
      disabled: !id,
    },
    icon: 'edit',
    on: {
      click: (e: Event) => {
        e.preventDefault()
        id && open(id)
      },
    },
    title: 'Edit',
  })

  return { editBtn, open }
}

export const useAnilist = () => {
  const anilistBtn = (media: Media | null): NavigationElement => ({
    bind: {
      disabled: !media,
      href: media && media.siteUrl,
      rel: 'noopener',
      target: '_blank',
    },
    icon: 'open_in_new',
    title: 'Anilist',
  })

  return { anilistBtn }
}
const useFavourites = (props: Readonly<Props>) => {
  const { formatNumber } = useIntl()

  const favourites = computed(() => formatNumber(props.media.favourites))

  const isFavourite = computed(() => props.media.isFavourite)
  const id = computed(() => props.media.id)

  const { mutate } = useMutation<
    {
      ToggleFavourite: Favourites
    },
    ToggleFavouriteVariables
  >(TOGGLE_FAVOURITE)

  // onError(console.log)

  const variables = computed(() => {
    if (props.media.type === 'MANGA') {
      return {
        mangaId: id.value,
      }
    }
    return {
      animeId: id.value,
    }
  })

  const { Viewer } = useViewer()

  const toggleFavorite = () => {
    if (Viewer.value) {
      mutate(variables.value, {
        update: cache => updateToggleFavourite(cache, id.value),
      })
    }
  }

  const queryLoading = useQueryLoading()
  const mutationLoading = useMutationLoading()

  // const loading = computed(() => queryLoading.value || mutationLoading.value)

  return {
    favourites,
    isFavourite,
    mutationLoading,
    queryLoading,
    toggleFavorite,
  }
}
const updateToggleFavourite = (cache: DataProxy, mediaId: number) => {
  const query: {
    variables: Variables
    query: DocumentNode
  } = {
    query: MEDIA,
    variables: { id: mediaId },
  }

  const data: { Media: Media } | null = cache.readQuery(query)

  if (data) {
    data.Media.isFavourite = !data.Media.isFavourite
    if (data.Media.isFavourite) {
      data.Media.favourites++
    } else {
      data.Media.favourites--
    }

    cache.writeQuery({
      ...query,
      data,
    })
  }
}
export default createComponent<Readonly<Props>>({
  components: {},
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const { actions: _actions } = useMediaCardActions()

    const actions = computed(() => _actions(props.media))

    return {
      actions,
      ...useViewer(),
      ...useFavourites(props),
    }
  },
})
</script>
