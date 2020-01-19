<template>
  <VCardActions>
    <VSpacer />
    <BaseAction
      :disabled="queryLoading"
      :loading="mutationLoading"
      @click.stop="toggleFavourite"
      :icon="isFavourite ? 'favorite' : 'favorite_border'"
      iconColor="red"
      :title="favourites"
      :tooltip="isFavourite ? 'unfavourite' : 'favourite'"
    />

    <VBtn
      v-if="!compact"
      text
      color="secondary"
      @click.stop="isEdited = !isEdited"
      :loading="editLoading"
      :style="{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }"
    >
      edit
    </VBtn>

    <BaseAction
      v-else
      icon="edit"
      iconColor="secondary"
      @click.stop="isEdited = !isEdited"
    />

    <BaseActionDropdown
      v-if="!compact"
      :disabled="editLoading"
      icon="keyboard_arrow_down"
      color="secondary"
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
    </BaseActionDropdown>

    <BaseAction iconColor="secondary" icon="share" @click.stop="share" />

    <BaseAction
      :href="media.siteUrl"
      rel="noopener"
      iconColor="secondary"
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
  </VCardActions>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import BaseAction from './BaseAction.vue'
import { MediaCardActions_media } from './__generated__/MediaCardActions_media'
import MediaEditLoading from './MediaEditLoading.vue'
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

const BaseShare = () =>
  import(
    /* webpackChunkName: "BaseShare" */ /* webpackPrefetch: true */ './BaseShare.vue'
  )

const BaseActionDropdown = () =>
  import(
    /* webpackChunkName: "BaseActionDropdown" */ /* webpackPrefetch: true */ './BaseActionDropdown.vue'
  )

const MediaEdit = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaEdit" */ /* webpackPrefetch: true */ './MediaEdit.vue'
    ),
    MediaEditLoading,
  )

export interface Props {
  media: MediaCardActions_media
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
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props, { root }) {
    const isEdited = ref(false)

    const status = ref(MediaListStatus.PLANNING)

    const {
      onError,
      loading,
      variables,
      mutate: saveEntry,
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
