<template>
  <component
    :is="listItem ? 'BaseActionItem' : 'BaseAction'"
    :disabled="queryLoading"
    :loading="mutationLoading"
    :icon="isFavourite ? 'favorite' : 'favorite_border'"
    icon-color="red"
    :title="favourites"
    :tooltip="isFavourite ? 'unfavourite' : 'favourite'"
    @click.stop="toggleFavourite"
  />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { MediaCardActions_media } from './__generated__/MediaCardActions_media'

import { asyncComponent } from '@/router'

import { useFavourites } from '@/hooks/toggleFavourite'
import TheDrawerLoadingViewer from './TheDrawerLoadingViewer.vue'

const BaseAction = () =>
  import(
    /* webpackChunkName: "BaseAction" */ /* webpackPrefetch: true */ './BaseAction.vue'
  )

const BaseActionItem = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "BaseActionItem" */ /* webpackPrefetch: true */ './BaseActionItem.vue'
    ),
    TheDrawerLoadingViewer,
  )

export interface Props {
  media: MediaCardActions_media
  listItem: boolean
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseAction,
    BaseActionItem,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const {
      queryLoading,
      mutationLoading,
      isFavourite,
      favourites,
      toggleFavourite,
    } = useFavourites(() => props.media)

    return {
      queryLoading,
      mutationLoading,
      isFavourite,
      favourites,
      toggleFavourite,
    }
  },
})
</script>
