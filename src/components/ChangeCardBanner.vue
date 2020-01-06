<template>
  <v-card>
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="primary">
          {{ icon }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <MediaItemTitle headline :media="media" />
        <MediaItemSubtitle body1 :media="media" />
      </v-list-item-content>
      <MediaItemAvatar :size="40" :media="media" />
    </v-list-item>

    <v-divider />
    <ChangeCardBannerActions :extension.sync="extension" :pending="pending" />

    <v-expand-transition v-if="!deleteType">
      <keep-alive>
        <ChangeCardBannerList v-if="extension" :pending="pending" />
      </keep-alive>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import { DeletePending, SavePending } from '../store/reducers/changes'
import { computed, createComponent, ref } from '@vue/composition-api'
import ChangeCardBannerActions from './ChangeCardBannerActions.vue'
import { ChangeCardBanner_media } from './__generated__/ChangeCardBanner_media'
import MediaItemAvatar from './MediaItemAvatar.vue'
import MediaItemSubtitle from './MediaItemSubtitle.vue'
import MediaItemTitle from './MediaItemTitle.vue'
import { useTitle } from '../hooks/results'

interface Props {
  media: ChangeCardBanner_media
  pending: SavePending | DeletePending
}

const ChangeCardBannerList = () =>
  import(
    /* webpackChunkName: "ChangeCardBannerList" */ /* webpackPrefetch: true */ './ChangeCardBannerList.vue'
  )

export default createComponent<Readonly<Props>>({
  components: {
    ChangeCardBannerActions,
    ChangeCardBannerList,
    MediaItemAvatar,
    MediaItemSubtitle,
    MediaItemTitle,
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
    const title = useTitle(() => props.media)

    const extension = ref(false)

    const deleteType = computed(() => props.pending.type === 'DELETE')

    const icon = computed(() => (deleteType.value ? 'delete' : 'edit'))

    return { deleteType, extension, icon, title }
  },
})
</script>
