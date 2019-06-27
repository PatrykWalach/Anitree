<template>
  <v-container fill-height grid-list-lg>
    <v-layout justify-center align-center>
      <v-flex v-if="!loading">
        <MediaTimeline :media-list="media" />
      </v-flex>
      <v-progress-circular
        v-else
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import MediaTimeline from '../components/MediaTimeline.vue'
import { AMedia } from '../types'

import { fetchMediaApollo } from '@/store/api'
@Component({
  components: {
    MediaTimeline
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
