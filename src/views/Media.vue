<template>
  <base-container :loading="loading">
    <MediaTimeline :media-list="mediaList" />
  </base-container>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
// import MediaTimeline from '../components/MediaTimeline.vue'
const MediaTimeline = () =>
  import(/* webpackPrefetch: true */ '../components/MediaTimeline.vue')

import { Route } from 'vue-router'
import moduleMedia from '../store/modules/media'
import { Next, AMedia } from '../types'
import BaseContainer from '../components/BaseContainer.vue'

Component.registerHooks(['beforeRouteEnter', 'beforeRouteUpdate'])

@Component({
  components: {
    MediaTimeline,
    BaseContainer
  }
})
export default class Media extends Vue {
  public loading: boolean = false

  public async beforeRouteEnter(to: Route, from: Route, next: Next<Media>) {
    const currentId = parseInt(to.params.mediaId, 10)

    new Promise<AMedia>(async (resolve, reject) => {
      const storedMedia = moduleMedia.media[currentId]
      if (storedMedia) {
        resolve(storedMedia)
      } else {
        const media = await moduleMedia.fetchMedia({
          idIn: [currentId]
        })

        if (media.length) {
          resolve(media.shift())
        } else {
          reject()
        }
      }
    })

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

  public async beforeRouteUpdate(to: Route, from: Route, next: Next<Media>) {
    const currentId = parseInt(to.params.mediaId, 10)

    new Promise<AMedia>(async (resolve, reject) => {
      const storedMedia = moduleMedia.media[currentId]
      if (storedMedia) {
        resolve(storedMedia)
      } else {
        const media = await moduleMedia.fetchMedia({
          idIn: [currentId]
        })

        if (media.length) {
          resolve(media.shift())
        } else {
          reject()
        }
      }
    })

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

  // @Watch('$route')
  public async fetch(media: AMedia) {
    const { currentId } = this
    this.loading = true
    // setTimeout(() => (this.loading = true), 200)
    await moduleMedia.handleQueue([media])
    await moduleMedia.CHANGE_CURRENT_ID({ currentId })
    await moduleMedia.changeFilteredMedia()

    this.loading = false
  }

  @Watch('filters', { deep: true })
  public async changeFilteredMedia() {
    this.loading = true
    await moduleMedia.changeFilteredMedia()
    this.loading = false
  }

  get filters() {
    return moduleMedia.activeFilters
  }

  // @Watch('slush', { immediate: true })
  // public changeSlush() {
  //   if (this.slush) {
  //     this.$router.push({
  //       name: 'title',
  //       params: {
  //         title: this.slush
  //       }
  //     })
  //   }
  // }

  // @Watch('title', { immediate: true })
  // public changeTitle() {
  //   if (this.title) {
  //     document.title = 'Anitree - ' + this.title
  //   }
  // }

  get mediaList() {
    return moduleMedia.sortedMedia
  }

  // get slush() {
  //   return this.title
  //     .trim()
  //     .replace(/[^\w\s]/g, '')
  //     .replace(/\s/g, '-')
  // }

  // get media() {
  //   return moduleMedia.currentMedia
  // }

  get currentId() {
    return parseInt(this.$route.params.mediaId, 10)
  }

  // get title() {
  //   return this.media ? this.media.title.romaji : ''
  // }
}
</script>
