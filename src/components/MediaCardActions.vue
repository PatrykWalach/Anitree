<template>
  <v-card-actions>
    <v-btn
      color="accent"
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

    <BaseAction
      :disabled="queryLoading"
      :loading="mutationLoading"
      @click.stop="toggleFavourite"
      :icon="isFavourite ? 'favorite' : 'favorite_border'"
      iconColor="red"
      :title="favourites"
      :tooltip="isFavourite ? 'unfavourite' : 'favourite'"
    />

    <v-btn
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
    </v-btn>

    <BaseAction
      v-else
      icon="edit"
      iconColor="secondary"
      @click.stop="isEdited = !isEdited"
    />

    <base-action-dropdown
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
      <v-list-item @click.stop="changeStatus('CURRENT')">
        <v-list-item-content>
          <v-list-item-title>
            Set as
            {{ media.type === 'MANGA' ? 'Reading' : 'Watching' }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click.stop="changeStatus('PLANNING')">
        <v-list-item-content>
          <v-list-item-title>
            Set as Planning
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </base-action-dropdown>

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
      :is="compact ? 'v-bottom-sheet' : 'v-dialog'"
      v-model="isShared"
      scrollable
      max-width="440px"
    >
      <BaseShare :options="shareData" />
    </component>

    <v-dialog
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
    </v-dialog>
  </v-card-actions>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import BaseAction from './BaseAction.vue'
import { MediaCardActions_media } from './__generated__/MediaCardActions_media'
import MediaEditLoading from './MediaEditLoading.vue'
import { MediaListStatus } from '../../__generated__/globalTypes'
import { useShare } from '@/hooks/share'
import { VBottomSheet } from 'vuetify/lib'
import { asyncComponent } from '@/router'
import { useSaveWithChanges } from '@/hooks/changes'
import { useFavourites } from '@/hooks/toggleFavourite'
import { useViewer } from '@/hooks/viewer'
import { useResult } from '@vue/apollo-composable'

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
    const { mutate: saveEntry, loading: editLoading } = useSaveWithChanges()

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
      viewer,
      ...useFavourites(() => props.media),
      changeStatus,
      compact,
      editLoading,
      isEdited,
      isShared,
      share,
      shareData,
    }
  },
})
</script>
