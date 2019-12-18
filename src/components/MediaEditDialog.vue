<template>
  <v-card :loading="loading">
    <v-card-text class="pa-0">
      <media-card-banner :media="media">
        <v-overlay absolute></v-overlay>
      </media-card-banner>

      <MediaCardItem :media="media" />
      <v-divider></v-divider>
      <MediaEditDialogTabs
        :tab.sync="tab"
        :style="{ position: 'sticky', top: 0, 'z-index': 2 }"
      />
      <MediaEditDialogItems
        :change-form="changeForm"
        :tab.sync="tab"
        :media="media"
        :user="viewer"
      />
    </v-card-text>
    <v-divider></v-divider>
    <MediaEditDialogActions :submit="submit" :media="media" :user="viewer" />
  </v-card>
</template>
<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { Media } from '../graphql/schema/media'
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaEditDialogActions from './MediaEditDialogActions.vue'
import MediaEditDialogItems from './MediaEditDialogItems.vue'
import MediaEditDialogTabs from './MediaEditDialogTabs.vue'
import { User } from '../graphql/schema/viewer'
import { useEdit } from '@/store'

export interface Props {
  media: Media
  viewer: User
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardBanner,
    MediaCardItem,
    MediaEditDialogActions,
    MediaEditDialogItems,
    MediaEditDialogTabs,
  },
  props: {
    media: { default: null, required: true, type: Object },
    viewer: { default: null, required: true, type: Object },
  },
  setup() {
    const { loading, submit, changeForm } = useEdit()

    const tab = ref('edit1')

    return {
      changeForm,
      loading,
      submit,
      tab,
    }
  },
})
</script>
