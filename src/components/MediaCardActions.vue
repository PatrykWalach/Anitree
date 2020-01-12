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
import { MediaListStatus } from '__generated__/globalTypes'
import { useShare } from '@/hooks/share'
import { VBottomSheet } from 'vuetify/lib'
import { asyncComponent } from '@/router'
import { useSaveMediaListEntry } from '@/hooks/saveMediaListEntry'
import { useHandleError } from '@/hooks/changes'
import { useFavourites } from '@/hooks/toggleFavourite'
import { useViewer } from '@/hooks/viewer'
import { useResult } from '@vue/apollo-composable'
import { useDispatch } from 'vue-redux-hooks'
import { changesActions } from '@/store/reducers/changes'

const BaseShare = () =>
  import(/* webpackChunkName: "BaseShare" */ './BaseShare.vue')

const BaseActionDropdown = () =>
  import(
    /* webpackChunkName: "BaseActionDropdown" */ './BaseActionDropdown.vue'
  )

const MediaEdit = () =>
  asyncComponent(
    import(/* webpackChunkName: "MediaEdit" */ './MediaEdit.vue'),
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
    const save = useSaveMediaListEntry<{
      mediaId: number
      status: MediaListStatus
    }>()

    const dispatch = useDispatch()

    const saveEntry = useHandleError(save, variables => {
      dispatch(
        changesActions.UNSHIFT_PENDING({
          type: 'SAVE',
          variables,
          mediaId: variables.mediaId,
        }),
      )
    })

    const changeStatus = (status: MediaListStatus) => {
      saveEntry({
        mediaId: props.media.id,
        status,
      })
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
      editLoading: save.loading,
      isEdited,
      isShared,
      share,
      shareData,
    }
  },
})
</script>
