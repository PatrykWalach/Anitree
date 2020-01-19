<template>
  <VCard :loading="loading" color="primary darken-1" dark>
    <VCardText class="pa-0">
      <media-card-banner v-if="media.bannerImage" :media="media">
        <v-overlay absolute />
      </media-card-banner>

      <MediaItem :media="media" />
      <VDivider />
      <MediaEditTabs
        :tab.sync="tab"
        :style="{ position: 'sticky', top: 0, 'z-index': 2 }"
      />
      <MediaEditItems
        :change-form="changeForm"
        :tab.sync="tab"
        :media="media"
        :user="viewer"
        :form="form"
      />
    </VCardText>
    <VDivider />
    <MediaEditActions
      :submit="submit"
      :media="media"
      :form="form"
      @close="close"
    />
  </VCard>
</template>
<script lang="ts">
import MediaItem from './MediaItem.vue'
import MediaEditActions from './MediaEditActions.vue'
import MediaEditItems from './MediaEditItems.vue'
import { Ref, createComponent, ref } from '@vue/composition-api'
import { Form } from '../types'
import { useDispatch } from 'vue-redux-hooks'
import MediaCardLoadingBanner from './MediaCardLoadingBanner.vue'
import { changesActions } from '@/store/reducers/changes'
import MediaEditTabs from './MediaEditTabs.vue'
import { asyncComponent } from '@/router'
import { mergeDeep } from 'apollo-utilities'
import { useSaveMediaListEntry } from '@/hooks/saveMediaListEntry'

import { MediaEdit_media } from './__generated__/MediaEdit_media'
import { MediaEdit_viewer } from './__generated__/MediaEdit_viewer'

const MediaCardBanner = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardBanner" */ /* webpackPrefetch: true */ './MediaCardBanner.vue'
    ),
    MediaCardLoadingBanner,
  )

export interface Props {
  media: MediaEdit_media
  viewer: MediaEdit_viewer
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardBanner,
    MediaItem,
    MediaEditActions,
    MediaEditItems,
    MediaEditTabs,
  },
  props: {
    media: { default: null, required: true, type: Object },
    viewer: { default: null, required: true, type: Object },
  },
  setup(props, { emit }) {
    const form: Ref<Partial<Form>> = ref({})

    const {
      mutate: saveEntry,
      loading,
      onError,
      variables,
    } = useSaveMediaListEntry<
      Partial<Form> & {
        mediaId: number
      }
    >(() => ({
      mediaId: props.media.id,
      ...form.value,
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

    const submit = () => {
      saveEntry()
    }

    const changeForm = (payload: Partial<Form>) => {
      form.value = mergeDeep(form.value, payload)
    }

    const tab = ref('edit1')

    const close = () => {
      form.value = {}
      emit('close')
    }

    return {
      changeForm,
      close,
      form,
      loading,
      submit,
      tab,
    }
  },
})
</script>
