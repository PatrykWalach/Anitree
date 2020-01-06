<template>
  <div>
    <v-btn
      v-if="!compact"
      text
      color="secondary"
      :loading="editLoading"
      :style="{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }"
      @click.stop="isEdited = !isEdited"
    >
      edit
    </v-btn>

    <BaseAction
      v-else
      icon="edit"
      icon-color="secondary"
      @click.stop="isEdited = !isEdited"
    />

    <v-menu offset-y v-if="!compact">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          color="secondary"
          v-on="on"
          v-bind="attrs"
          :style="{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            minWidth: '36px',
          }"
        >
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list :disabled="editLoading">
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
        </v-list>
      </v-card>
    </v-menu>

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
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import BaseAction from './BaseAction.vue'
import { MediaCardActions_media } from './__generated__/MediaCardActions_media'
import MediaEditLoading from './MediaEditLoading.vue'
import { MediaListStatus } from '__generated__/globalTypes'
import { VBottomSheet } from 'vuetify/lib'
import { asyncComponent } from '@/router'
import { useSaveMediaListEntry } from '@/hooks/saveMediaListEntry'
import { useHandleError } from '@/hooks/changes'
import { useViewer } from '@/hooks/viewer'
import { useResult } from '@vue/apollo-composable'
import { useDispatch } from 'vue-redux-hooks'
import { changesActions } from '@/store/reducers/changes'
import MediaCardActionsFavourite from './MediaCardActionsFavourite.vue'

const BaseShare = () =>
  import(
    /* webpackChunkName: "BaseShare" */ /* webpackPrefetch: true */ './BaseShare.vue'
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
  components: {
    BaseAction,
    MediaCardActionsFavourite,
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

    const viewerQuery = useViewer()

    const viewer = useResult(viewerQuery.result)

    return {
      viewer,
      changeStatus,
      compact,
      editLoading: save.loading,
      isEdited,
    }
  },
})
</script>
