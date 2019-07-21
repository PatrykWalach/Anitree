<template>
  <base-container :loading="loading">
    <template v-if="!media.length">
      No results found
    </template>
    <template v-else>
      <MediaTimeline :media-list="media" />
      <v-pagination v-model="page" :length="lastPage"></v-pagination>
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
import auth from '../store/modules/auth'

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
    return Object.assign(
      {},
      {
        isAdult: auth.displayAdultContent ? undefined : false
      },
      this.$route.query
    )
  }

  set query(query) {
    this.$router.replace({
      query
    })
  }

  get page(): number {
    const { page } = this.query
    switch (typeof page) {
      case 'string':
        return parseInt(page)
      case 'number':
        return page
      default:
        return 1
    }
  }

  set page(page) {
    this.query = Object.assign({}, this.query, { page })
  }

  get currentPage(): Page | null {
    const { pages, page } = this
    return pages[page] || null
  }

  get media(): Media[] {
    const { currentPage } = this
    return (currentPage && currentPage.media) || []
  }

  get pageInfo() {
    const { currentPage } = this
    return currentPage && currentPage.pageInfo
  }

  get lastPage() {
    const { pageInfo } = this
    return (pageInfo && pageInfo.lastPage) || 0
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
