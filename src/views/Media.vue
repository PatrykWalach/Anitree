<template>
  <base-container :loading="loading">
    <MediaTimeline :media-list="mediaList" />
  </base-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
const MediaTimeline = () =>
  import(/* webpackPrefetch: true */ '../components/MediaTimeline.vue')

import { Route } from 'vue-router'
import moduleMedia from '../store/modules/media'
import { Next, Media as MediaT, NextBefore } from '../types'
import BaseContainer from '../components/BaseContainer.vue'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave'
])

@Component({
  components: {
    MediaTimeline,
    BaseContainer
  }
})
export default class Media extends Vue {
  loading: boolean = false

  async beforeRouteEnter(to: Route, from: Route, next: NextBefore<Media>) {
    const currentId = parseInt(to.params.mediaId, 10)

    moduleMedia
      .getMedia(currentId)

      .then(media => {
        const title = media.title.romaji
        document.title = 'Anitree - ' + title
        const slush = title
          .trim()
          .replace(/[^\w\s]/g, '')
          .replace(/\s/g, '-')

        if (to.params.title !== slush) {
          return next({
            name: 'title',
            params: {
              ...to.params,
              title: slush
            },
            replace: true
          })
        } else {
          return next(vm => vm.fetch(media))
        }
      })
      .catch(() => next(false))
  }

  async beforeRouteLeave(to: Route, from: Route, next: Next) {
    await moduleMedia.CHANGE_CURRENT_ID({ currentId: null })
    next()
  }

  async beforeRouteUpdate(to: Route, from: Route, next: Next) {
    const currentId = parseInt(to.params.mediaId, 10)

    moduleMedia
      .getMedia(currentId)

      .then(media => {
        const title = media.title.romaji
        document.title = 'Anitree - ' + title
        const slush = title
          .trim()
          .replace(/[^\w\s]/g, '')
          .replace(/\s/g, '-')

        if (to.params.title !== slush) {
          return next({
            name: 'title',
            params: {
              ...to.params,
              title: slush
            },
            replace: true
          })
        } else {
          next()
          this.fetch(media)
          return
        }
      })
      .catch(() => next(false))
  }

  async fetch(media: MediaT) {
    const { currentId } = this
    this.loading = true
    await moduleMedia.handleQueue([media])
    await moduleMedia.CHANGE_CURRENT_ID({ currentId })
    // await moduleMedia.changeFilteredMedia()

    this.loading = false
  }

  // @Watch('filters', { deep: true })
  // async changeFilteredMedia() {
  //   this.loading = true
  // await moduleMedia.changeFilteredMedia()
  //   this.loading = false
  // }

  // get filters() {
  //   return moduleMedia.activeFilters
  // }

  get mediaList() {
    return moduleMedia.sortedMedia
  }

  get currentId() {
    return parseInt(this.$route.params.mediaId, 10)
  }
}
</script>
