<script lang="tsx">
import { Page, Variables } from '@/graphql/schema/page'
import {
  VCol,
  VContainer,
  VIcon,
  VRow,
  VTimeline,
  VTimelineItem,
} from 'vuetify/lib'
import { computed, createComponent, createElement } from '@vue/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import HomeItem from '@/components/HomeItem.vue'
import MediaCard from '../components/MediaCard.vue'
// import MediaCardError from '../components/MediaCardError.vue'
import MediaCardLoading from '@/components/MediaCardLoading.vue'
import { PAGE } from '@/graphql'
import TheSettings from '@/components/TheSettings.vue'

export default createComponent({
  components: {
    HomeItem,
    MediaCard,
    TheSettings,
    VCol,
    VContainer,
    VIcon,
    VRow,
    VTimeline,
    VTimelineItem,
  },
  setup: (_, { root }) => {
    const h = createElement
    const random = Math.floor(Math.random() * 49)
    const { result } = useQuery<{ Page: Page }, Variables>(
      PAGE,
      {
        sort: 'TRENDING_DESC',
      },
      {
        fetchPolicy: 'cache-and-network',
      },
    )

    const media = useResult(result, [], data => data.Page.media)

    const randomMedia = computed(() => media.value[random])

    const trendingMedia = computed(() => {
      if (randomMedia.value) {
        return <MediaCard media={randomMedia.value}></MediaCard>
      }
      return <MediaCardLoading />
    })

    const content = computed(() => [
      [
        <home-item
          scopedSlots={{
            title: () => 'This app is under construction',
          }}
        >
          <p>
            The site doesn't store any information about the user. All features
            are subjects to change.
          </p>
          <p>
            If you encounter any problems you may have to clean your cache:
            <br />
            <code>F12</code>
            <v-icon>arrow_right_alt</v-icon>
            <code>Application</code>
            <v-icon>arrow_right_alt</v-icon>
            <code>
              <v-icon small color="#BD4147">
                delete
              </v-icon>
              Clear storage
            </code>
            <v-icon>arrow_right_alt</v-icon>
            <code>Clear site data</code>
          </p>
        </home-item>,
      ],
      [
        <home-item
          scopedSlots={{
            title: () => 'Media Cards',
          }}
        >
          Media cards display various informations about the media.
          <br />
          Their layout and amount of information may change in future.
        </home-item>,
        trendingMedia.value,
      ],
      [
        <home-item scopedSlots={{ title: () => 'Settings' }}>
          The settings are cached.
        </home-item>,
        <the-settings />,
      ],
    ])

    const mobile = computed(() =>
      content.value.flat().map(el => <v-col cols="12">{el}</v-col>),
    )
    const desktop = computed(() => {
      const { smAndDown } = root.$vuetify.breakpoint

      return (
        <v-col>
          <v-timeline dense={smAndDown}>
            {content.value.map((el, i) =>
              el
                .map((el, j) => (
                  <v-timeline-item
                    large={!smAndDown && j === 0}
                    small={smAndDown && j !== 0}
                    left={!!(i % 2)}
                    right={!!((i + 1) % 2)}
                  >
                    {el}
                  </v-timeline-item>
                ))
                .flat(),
            )}
          </v-timeline>
        </v-col>
      )
    })

    const timeline = computed(() =>
      root.$vuetify.breakpoint.xsOnly ? mobile.value : desktop.value,
    )

    return () => (
      <v-container>
        <v-row>{timeline.value}</v-row>
      </v-container>
    )
  },
})
</script>
