<template>
  <!-- <v-app-bar app elevate-on-scroll hide-on-scroll> -->
  <media-card-actions
    :media="media"
    :tag="VAppBar"
    app
    elevate-on-scroll
    hide-on-scroll
    bottom
  >
    <BaseAction
      bottom
      icon-color="secondary"
      icon="keyboard_arrow_left"
      tooltip="Back"
      @click.stop="$router.back()"
    />
  </media-card-actions>
  <!-- </v-app-bar> -->
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { useFavourites } from '@/hooks/toggleFavourite'
import { useShare } from '@/hooks/share'

import BaseAction from '@/components/BaseAction.vue'

import MediaEditLoading from '@/components/MediaEditLoading.vue'
import { TimelineAppBar_media } from './__generated__/TimelineAppBar_media'
import { VBottomSheet } from 'vuetify/lib'
import { asyncComponent } from '@/router'
import { useViewer } from '../hooks/viewer'
import MediaCardActions from '../components/MediaCardActions.vue'

const BaseShare = () =>
  import(
    /* webpackChunkName: "BaseShare" */ /* webpackPrefetch: true */ '@/components/BaseShare.vue'
  )
const BaseActionItem = () =>
  import(
    /* webpackChunkName: "BaseActionItem" */ /* webpackPrefetch: true */ '@/components/BaseActionItem.vue'
  )

const MediaEdit = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaEdit" */ /* webpackPrefetch: true */ '@/components/MediaEdit.vue'
    ),
    MediaEditLoading,
  )

export interface Props {
  media: TimelineAppBar_media
}
import { VAppBar } from 'vuetify/lib'
export default createComponent<Readonly<Props>>({
  components: {
    BaseAction,
    MediaCardActions,
    BaseActionItem,
    BaseShare,
    MediaEdit,
    MediaEditLoading,
    VBottomSheet,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const isEdited = ref(false)
    const { isShared, share, shareData } = useShare(() => props.media)
    const viewer = useViewer()

    return {
      ...useFavourites(() => props.media),
      viewer,
      isEdited,
      isShared,
      open,
      share,
      shareData,
      VAppBar,
    }
  },
})
</script>
