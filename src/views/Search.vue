<template>
  <v-container fill-height grid-list-lg>
    <v-layout justify-center align-center>
      <v-flex v-if="!loading">
        <MediaTimeline :mediaList="media" />
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
import { Route } from 'vue-router'
import moduleMedia from '@/store/modules/media'
import moduleTitle from '@/store/modules/title'
import router from '../router'
import { AMedia } from '../types'

type Next<V extends Vue = Vue> = (
  to?: string | false | void | Location | ((vm: V) => any) | undefined
) => void

Component.registerHooks(['beforeRouteEnter', 'beforeRouteUpdate'])

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
