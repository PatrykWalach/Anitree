<template>
  <v-list-item three-line>
    <v-list-item-content>
      <MediaCardLoadingItemOverline />
      <MediaCardLoadingItemTitle />
      <MediaCardLoadingItemSubtitle />
      <MediaCardLoadingItemDescription />
    </v-list-item-content>
    <MediaCardLoadingItemAvatar />
  </v-list-item>
</template>
<script lang="ts">
import MediaCardLoadingItemAvatar from '@/components/MediaCardLoadingItemAvatar.vue'
import MediaCardLoadingItemDescription from '@/components/MediaCardLoadingItemDescription.vue'
import MediaCardLoadingItemOverline from '@/components/MediaCardLoadingItemOverline.vue'
import MediaCardLoadingItemSubtitle from '@/components/MediaCardLoadingItemSubtitle.vue'
import MediaCardLoadingItemTitle from '@/components/MediaCardLoadingItemTitle.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaCardLoadingItemAvatar,
    MediaCardLoadingItemDescription,
    MediaCardLoadingItemOverline,
    MediaCardLoadingItemSubtitle,
    MediaCardLoadingItemTitle,
  },
})
</script>
