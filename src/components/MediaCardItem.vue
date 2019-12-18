<template>
  <v-list-item selectable :[lines]="true">
    <MediaCardItemAvatar :media="media" />
    <v-list-item-content>
      <MediaCardItemOverline :media="media" />
      <MediaCardItemTitle :media="media" />
      <MediaCardItemSubtitle :media="media" />
      <MediaCardItemDescription :media="media" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'
import MediaCardItemAvatar from './MediaCardItemAvatar.vue'
import MediaCardItemDescription from './MediaCardItemDescription.vue'
import MediaCardItemOverline from './MediaCardItemOverline.vue'
import MediaCardItemSubtitle from './MediaCardItemSubtitle.vue'
import MediaCardItemTitle from './MediaCardItemTitle.vue'

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemAvatar,
    MediaCardItemDescription,
    MediaCardItemOverline,
    MediaCardItemSubtitle,
    MediaCardItemTitle,
  },
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const lines = computed(() => {
      return props.media.description ? 'three-line' : 'two-line'
    })

    return { lines }
  },
})
</script>
