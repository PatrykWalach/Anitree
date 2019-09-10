<template>
  <!-- <div class="teal" :style="{ height: '100%' }">
    <v-subheader>Some text</v-subheader>

    <v-card
      height="100%"
      :style="{ background: '#303030', 'border-radius': '1rem 1rem 0 0' }"
    > -->
  <base-container :loading="loading">
    <MediaTimeline :media-list="mediaList" />
  </base-container>
  <!-- </v-card>
  </div> -->
</template>
<script lang="ts">
// import MediaTimeline from '../components/MediaTimeline.vue'
import { Page, Variables as PageVariables } from '@/graphql/schema/page'
import {
  Ref,
  computed,
  createComponent,
  ref,
  watch
} from '@vue/composition-api'
import BaseContainer from '../components/BaseContainer.vue'
import { Media } from '@/graphql/schema/media'
import { PAGE } from '@/graphql'

const MediaTimeline = () =>
  import(/* webpackPreload: true */ '../components/MediaTimeline.vue')

const getYear = (seasonInt: number) => {
  const year = Math.floor(seasonInt / 10)
  return year > 50 ? 1900 + year : 2000 + year
}

export default createComponent({
  components: {
    BaseContainer,
    MediaTimeline
  },
  setup(_, { root }) {
    const loading = ref(false)
    const mediaList: Ref<Media[]> = ref([])

    const currentId = computed(() => parseInt(root.$route.params.mediaId, 10))

    const fetch = (variables: PageVariables) =>
      root.$apollo
        .query({
          fetchPolicy: 'network-only',
          query: PAGE,
          variables
        })
        .then(({ data }: { data: { Page: Page } }) => data.Page.media)
        .then(media => {
          mediaList.value.push(...media)
          return media
        })

    const fetchMedia = (idIn: number[]) =>
      new Promise<Media[]>(resolve => {
        Promise.all(
          idIn
            .reduce((acc: { idIn: number[] }[], media: number): {
              idIn: number[]
            }[] => {
              const index = acc.findIndex(arr => arr.idIn.length < 50)
              if (index === -1) {
                acc.push({ idIn: [media] })
              } else {
                acc[index].idIn.push(media)
              }
              return acc
            }, [])
            .map(fetch)
        )
          .then(media => media.flat())
          .then(media => {
            const newMedia = media
              .flatMap(({ relations }) => relations.edges)
              .map(({ node }) => node.id)
              .filter(
                (id, i, arr) => arr.findIndex(mediaId => mediaId === id) === i
              )
              .filter(id => !mediaList.value.find(media => media.id === id))

            if (newMedia.length) {
              return fetchMedia(newMedia)
            }

            return media
          })
          .then(resolve)
      })

    watch(currentId, async (currentId, oldId, onCleanup) => {
      loading.value = true
      await fetchMedia([currentId])
      loading.value = false

      onCleanup(() => {
        mediaList.value = []
      })
    })

    const mediaRelations = computed(() =>
      mediaList.value.flatMap(({ relations }) => relations.edges)
    )

    const relationTypes = computed(() => [
      ...new Set(mediaRelations.value.map(({ relationType }) => relationType))
    ])

    const relatedMedia = computed(() => [
      ...new Set(mediaRelations.value.map(({ node }) => node.id))
    ])

    const sorters: ((mediaA: Media, mediaB: Media) => number)[] = [
      ({ seasonInt: seasonA }, { seasonInt: seasonB }) =>
        (seasonA &&
          seasonB &&
          (getYear(seasonA) - getYear(seasonB) ||
            (seasonA % 10) - (seasonB % 10))) ||
        0,
      ({ startDate: dateA }, { startDate: dateB }) =>
        (dateA.year && dateB.year && dateA.year - dateB.year) || 0,
      ({ startDate: dateA }, { startDate: dateB }) =>
        (dateA.month && dateB.month && dateA.month - dateB.month) || 0,
      ({ startDate: dateA }, { startDate: dateB }) =>
        (dateA.day && dateB.day && dateA.day - dateB.day) || 0
    ]

    return {
      loading,
      mediaList: computed(() =>
        mediaList.value.sort(
          (a, b) => {
            for (const sort of sorters) {
              const result = sort(a, b)
              if (result) return result
            }
            return 0
          }
          // (seasonA &&
          //   seasonB &&
          //   (getYear(seasonA) - getYear(seasonB) ||
          //     (seasonA % 10) - (seasonB % 10))) ||
          // (dateA.year && dateB.year && dateA.year - dateB.year) ||
          // (dateA.month && dateB.month && dateA.month - dateB.month) ||
          // (dateA.day && dateB.day && dateA.day - dateB.day) ||
          // 1
        )
      ),
      mediaRelations,
      relatedMedia,
      relationTypes
    }
  }
})
</script>
