<template>
  <v-card :loading="loading" color="primary darken-1" dark>
    <v-card-text class="pa-0">
      <media-card-banner v-if="media.bannerImage" :media="media">
        <v-overlay absolute></v-overlay>
      </media-card-banner>

      <MediaCardItem :media="media" />
      <v-divider></v-divider>
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
    </v-card-text>
    <v-divider></v-divider>
    <MediaEditActions
      :submit="submit"
      :media="media"
      :form="form"
      @close="close"
    />
  </v-card>
</template>
<script lang="ts">
import MediaCardItem from './MediaCardItem.vue'
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
import { useHandleError } from '@/hooks/changes'
import { MediaEdit_media } from './__generated__/MediaEdit_media'
import { MediaEdit_viewer } from './__generated__/MediaEdit_viewer'

const MediaCardBanner = () =>
  asyncComponent(
    import(/* webpackChunkName: "MediaCardBanner" */ './MediaCardBanner.vue'),
    MediaCardLoadingBanner,
  )

export interface Props {
  media: MediaEdit_media
  viewer: MediaEdit_viewer
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardBanner,
    MediaCardItem,
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

    const mutation = useSaveMediaListEntry<
      Partial<Form> & {
        mediaId: number
      }
    >()
    const dispatch = useDispatch()

    const saveEntry = useHandleError(mutation, variables => {
      dispatch(
        changesActions.UNSHIFT_PENDING({
          type: 'SAVE',
          variables,
          mediaId: variables.mediaId,
        }),
      )
    })

    const submit = () => {
      saveEntry({
        mediaId: props.media.id,
        ...form.value,
      })
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
      loading: mutation.loading,
      submit,
      tab,
    }
  },
})
</script>
