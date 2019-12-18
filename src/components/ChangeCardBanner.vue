<template>
  <v-card>
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="primary">{{ icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <MediaCardItemTitle :media="media" />
        <MediaCardItemSubtitle :media="media" />
      </v-list-item-content>
      <MediaCardItemAvatar :size="40" :media="media" />
    </v-list-item>

    <v-divider></v-divider>
    <ChangeCardBannerActions :extension.sync="extension" :pending="pending" />

    <v-expand-transition v-if="!deleteType">
      <keep-alive>
        <ChangeCardBannerList :pending="pending" v-if="extension" />
      </keep-alive>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import { DeletePending, SavePending } from '../store/modules/changes'
import { computed, createComponent, ref } from '@vue/composition-api'
import { useChanges, useTitle } from '../store'
import ChangeCardBannerActions from './ChangeCardBannerActions.vue'
import { Media } from '../graphql/schema/media'
import MediaCardItemAvatar from './MediaCardItemAvatar.vue'
import MediaCardItemSubtitle from './MediaCardItemSubtitle.vue'
import MediaCardItemTitle from './MediaCardItemTitle.vue'

interface Props {
  media: Media
  pending: SavePending | DeletePending
}
const ChangeCardBannerList = () =>
  import(
    /*webpackChunkName: "ChangeCardBannerList" */ './ChangeCardBannerList.vue'
  )
export default createComponent<Readonly<Props>>({
  components: {
    ChangeCardBannerActions,
    ChangeCardBannerList,
    MediaCardItemAvatar,
    MediaCardItemSubtitle,
    MediaCardItemTitle,
  },
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
    pending: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const { getTitle } = useTitle()

    const title = computed(() => getTitle.value(props.media.title))

    const extension = ref(false)

    const deleteType = computed(() => props.pending.type === 'DELETE')

    const icon = computed(() => (deleteType.value ? 'delete' : 'edit'))

    return { icon, deleteType, extension, title }
  },
})
</script>
