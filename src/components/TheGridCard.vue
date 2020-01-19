<template>
  <VHover v-slot="{ hover }">
    <VCard
      exact
      :to="{
        name: 'media',
        params: {
          mediaId: media.id,
          mediaType: media.type.toLowerCase(),
        },
      }"
      flat
      outlined
    >
      <VSheet :style="{ overflow: 'hidden' }">
        <TheGridCardCover :hover="hover" :media="media" />
      </VSheet>

      <VListItem>
        <VListItemContent>
          <MediaItemTitle :media="media" />
          <MediaItemSubtitle :media="media" />
        </VListItemContent>
      </VListItem>
    </VCard>
  </VHover>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import TheGridCardCover from './TheGridCardCover.vue'
import MediaItemTitle from './MediaItemTitle.vue'
import MediaItemSubtitle from './MediaItemSubtitle.vue'

export default createComponent({
  props: { media: { default: null, required: true, type: Object } },
  components: {
    TheGridCardCover,
    MediaItemTitle,
    MediaItemSubtitle,
  },
})
</script>
