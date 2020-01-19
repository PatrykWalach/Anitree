<template>
  <div :style="{ display: 'contents' }">
    <BaseAction
      bottom
      :disabled="queryLoading"
      :loading="mutationLoading"
      @click.stop="toggleFavourite"
      :icon="isFavourite ? 'favorite' : 'favorite_border'"
      icon-color="red"
      :tooltip="isFavourite ? 'unfavourite' : 'favourite'"
    />

    <VBtn
      v-if="!compact"
      text
      @click.stop="isEdited = !isEdited"
      :loading="editLoading"
      :style="{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }"
    >
      edit
    </VBtn>

    <BaseAction bottom v-else icon="edit" @click.stop="isEdited = !isEdited" />

    <base-action-dropdown
      v-if="!compact"
      :disabled="editLoading"
      icon="keyboard_arrow_down"
      :style="{
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        minWidth: '36px',
      }"
    >
      <VListItem @click.stop="changeStatus('CURRENT')">
        <VListItemContent>
          <VListItemTitle>
            Set as
            {{ media.type === 'MANGA' ? 'Reading' : 'Watching' }}
          </VListItemTitle>
        </VListItemContent>
      </VListItem>
      <VListItem @click.stop="changeStatus('PLANNING')">
        <VListItemContent>
          <VListItemTitle>
            Set as Planning
          </VListItemTitle>
        </VListItemContent>
      </VListItem>
    </base-action-dropdown>

    <BaseAction bottom icon="share" @click.stop="share" />

    <BaseAction
      bottom
      :href="media.siteUrl"
      rel="noopener"
      target="_blank"
      icon="open_in_new"
      tooltip="Anilist"
    />

    <component
      :is="compact ? 'v-bottom-sheet' : 'VDialog'"
      v-model="isShared"
      scrollable
      max-width="440px"
    >
      <BaseShare :options="shareData" />
    </component>

    <VDialog
      v-model="isEdited"
      scrollable
      :fullscreen="compact"
      :transition="compact ? 'dialog-bottom-transition' : undefined"
      max-width="720px"
    >
      <MediaEditLoading v-if="queryLoading" @close="isEdited = false" />
      <MediaEdit
        v-else-if="media && viewer"
        :viewer="viewer"
        :media="media"
        @close="isEdited = false"
      />
    </VDialog>

    <VSpacer></VSpacer>

    <BaseAction
      bottom
      icon="search"
      tooltip="Back"
      @click.stop="$router.back()"
    />
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import BaseAction from '@/components/BaseAction.vue'
import { TimelineAppBar_media } from './__generated__/TimelineAppBar_media'
import MediaEditLoading from '@/components/MediaEditLoading.vue'
import { MediaListStatus } from '@/../__generated__/globalTypes'
import { useShare } from '@/hooks/share'
import { VBottomSheet } from 'vuetify/lib'
import { asyncComponent } from '@/router'
import { useSaveMediaListEntry } from '@/hooks/saveMediaListEntry'

import { useFavourites } from '@/hooks/toggleFavourite'
import { useViewer } from '@/hooks/viewer'
import { useResult } from '@vue/apollo-composable'
import { useDispatch } from 'vue-redux-hooks'
import { changesActions } from '@/store/reducers/changes'
import { VCardActions } from 'vuetify/lib'
const BaseShare = () =>
  import(
    /* webpackChunkName: "BaseShare" */ /* webpackPrefetch: true */ '@/components/BaseShare.vue'
  )

const BaseActionDropdown = () =>
  import(
    /* webpackChunkName: "BaseActionDropdown" */ /* webpackPrefetch: true */ '@/components/BaseActionDropdown.vue'
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

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  components: {
    BaseAction,
    BaseActionDropdown,
    BaseShare,
    MediaEdit,
    MediaEditLoading,
    VBottomSheet,
    VCardActions,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props, { root }) {
    const isEdited = ref(false)
    const status = ref(MediaListStatus.PLANNING)

    const {
      mutate: saveEntry,
      onError,
      variables,
      loading,
    } = useSaveMediaListEntry<{
      mediaId: number
      status: MediaListStatus
    }>(() => ({
      mediaId: props.media.id,
      status: status.value,
    }))

    const dispatch = useDispatch()

    onError(() => {
      dispatch(
        changesActions.UNSHIFT_PENDING({
          type: 'SAVE',
          variables: variables.value,
          mediaId: variables.value.mediaId,
        }),
      )
    })

    const changeStatus = (overrideStatus: MediaListStatus) => {
      status.value = overrideStatus
      saveEntry()
    }

    const compact = computed(() => root.$vuetify.breakpoint.mdAndDown)

    const { isShared, share, shareData } = useShare(() => props.media)

    const viewerQuery = useViewer()

    const viewer = useResult(viewerQuery.result)

    return {
      ...useFavourites(() => props.media),
      viewer,
      changeStatus,
      compact,
      editLoading: loading,
      isEdited,
      isShared,
      share,
      shareData,
    }
  },
})
</script>
