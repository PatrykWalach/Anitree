<template>
  <base-container :loading="loading">
    <MediaTimeline :media-list="media" />
  </base-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
const MediaTimeline = () =>
  import(/* webpackPrefetch: true */ '../components/MediaTimeline.vue')
import { Media } from '../types'
import BaseContainer from '../components/BaseContainer.vue'
import media from '../store/modules/media'

@Component({
  components: {
    MediaTimeline,
    BaseContainer
  }
})
export default class Search extends Vue {
  public media: Media[] = []
  public loading: boolean = true

  get query() {
    return this.$route.query
  }

  @Watch('query', { immediate: true })
  public async fetchMedia() {
    this.loading = true
    this.media = await media.fetchMedia({ ...this.query })
    this.loading = false
  }
}
</script>
