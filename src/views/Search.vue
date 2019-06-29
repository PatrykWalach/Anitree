<template>
  <base-container :loading="loading">
    <MediaTimeline :media-list="media" />
  </base-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
const MediaTimeline = () =>
  import(/* webpackPrefetch: true */ '../components/MediaTimeline.vue')
import { AMedia } from '../types'
import BaseContainer from '../components/BaseContainer.vue'
import { fetchMediaApollo } from '@/store/api'
@Component({
  components: {
    MediaTimeline,
    BaseContainer
  }
})
export default class Search extends Vue {
  public media: AMedia[] = []
  public loading: boolean = true

  get search() {
    return this.$route.query.search
  }

  @Watch('search', { immediate: true })
  public async fetchMedia(search: string) {
    this.loading = true
    this.media = await fetchMediaApollo({ search })
    this.loading = false
  }
}
</script>
