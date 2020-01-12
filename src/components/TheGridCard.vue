<template>
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
    <v-hover v-slot="{ hover }">
      <v-sheet :style="{ overflow: 'hidden' }">
        <TheGridCardCover :hover="hover" :media="media" />
      </v-sheet>
    </v-hover>
    <VListItem>
      <VListItemContent>
        <MediaItemTitle :media="media" />
        <MediaItemSubtitle :media="media" />
      </VListItemContent>
    </VListItem>
  </VCard>
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
