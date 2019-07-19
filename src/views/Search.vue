<template>
  <base-container :loading="loading">
    <template v-if="!media.length">
      No results found
    </template>
    <template v-else>
      <MediaTimeline :media-list="media" />
      <v-pagination
        :value="page"
        :length="lastPage"
        @input="changePage"
      ></v-pagination>
    </template>
  </base-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
const MediaTimeline = () =>
  import(/* webpackPrefetch: true */ '../components/MediaTimeline.vue')
import { Media, Page } from '../types'
import BaseContainer from '../components/BaseContainer.vue'
import mediaModule from '../store/modules/media'

@Component({
  components: {
    MediaTimeline,
    BaseContainer
  }
})
export default class Search extends Vue {
  loading: boolean = true
  pages: Page[] = []

  get query() {
    return this.$route.query
  }

  get page(): number {
    const { page } = this.query
    if (typeof page === 'string') return parseInt(page)
    if (typeof page === 'number') return page
    return 1
  }

  get currentPage(): Page | null {
    return this.pages[this.page] || null
  }

  get media(): Media[] {
    return (this.currentPage && this.currentPage.media) || []
  }

  get pageInfo() {
    return this.currentPage && this.currentPage.pageInfo
  }

  get lastPage() {
    return (this.pageInfo && this.pageInfo.lastPage) || 0
  }

  changePage(page: number) {
    this.$router.replace({
      query: Object.assign({}, this.query, { page })
    })
  }

  @Watch('query', { immediate: true })
  async fetchMedia() {
    this.loading = true
    const page = await mediaModule.fetchMediaPage({
      ...this.query
    })
    Vue.set(this.pages, this.page, page)
    this.loading = false
  }
}
</script>
