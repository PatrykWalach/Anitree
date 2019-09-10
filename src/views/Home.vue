<script lang="tsx">
import {
  VCol,
  VContainer,
  VIcon,
  VRow,
  VTimeline,
  VTimelineItem
} from 'vuetify/lib'
import { createComponent, createElement } from '@vue/composition-api'
import HomeItem from '@/components/HomeItem.vue'
import MediaCard from '@/components/MediaCard.vue'
import TheSettings from '@/components/TheSettings.vue'

//@ts-ignore

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
    VTimelineItem
  },
  setup: (_, { root }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const h = createElement

    const content = [
      [
        <home-item
          scopedSlots={{
            title: () => 'This app is under construction'
          }}
        >
          <p>
            All features are subjects to change. Please visit
            <router-link to="/roadmap"> roadmap </router-link>for more
            information about planned features.
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
        </home-item>
      ],
      [
        <home-item
          scopedSlots={{
            title: () => 'Media Cards'
          }}
        >
          Media cards display various informations about the media.
          <br />
          Their layout and amount of information may change in future.
        </home-item>,

        <apollo-query
          query={require('@/graphql/queries/Media.gql')}
          variables={{ id: 21450 }}
          fetch-policy="cache-and-network"
          tag={null}
        >
          <media-card id={21450} />
        </apollo-query>
      ],
      [
        <home-item scopedSlots={{ title: () => 'Settings' }}>
          The settings are cached.
        </home-item>,
        <the-settings />
      ]
    ]

    return () => {
      const timeline = root.$vuetify.breakpoint.xsOnly ? (
        content.flat().map(el => <v-col cols="12">{el}</v-col>)
      ) : (
        <v-col>
          <v-timeline dense={root.$vuetify.breakpoint.smAndDown}>
            {content.map((el, i) =>
              el
                .map((el, j) => (
                  <v-timeline-item
                    large={!root.$vuetify.breakpoint.smAndDown && j === 0}
                    small={root.$vuetify.breakpoint.smAndDown && j !== 0}
                    left={!!(i % 2)}
                    right={!!((i + 1) % 2)}
                  >
                    {el}
                  </v-timeline-item>
                ))
                .flat()
            )}
          </v-timeline>
        </v-col>
      )

      return (
        <v-container>
          <v-row>{timeline}</v-row>
        </v-container>
      )
    }
  }
})
</script>
