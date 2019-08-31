<script lang="tsx">
import MediaCard from '@/components/MediaCard.vue'
import HomeItem from '@/components/HomeItem.vue'
import TheSettings from '@/components/TheSettings.vue'

import {
  createComponent,
  createElement,
  SetupContext
} from '@vue/composition-api'

//@ts-ignore
import { VContainer, VCol, VRow, VTimeline, VTimelineItem } from 'vuetify/lib'

export default createComponent({
  setup: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const h = createElement

    const content = [
      [
        <home-item
          scopedSlots={{
            title: () => 'This app is under construction'
          }}
        >
          Please visit
          <router-link to="/roadmap"> roadmap </router-link>for more information
        </home-item>
      ],
      [
        <home-item
          scopedSlots={{
            title: () => 'Media Cards'
          }}
        >
          Media cards display media title, type, status, related tags, main
          studios and list status if user is logged in.
          <br />
          More data may be shown in future: relation type and the description
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
          The settings are stored in the browser cache.
        </home-item>,
        <the-settings />
      ]
    ]

    return (_: {}, { root }: SetupContext) => {
      const timeline = root.$vuetify.breakpoint.xsOnly ? (
        content.flat().map(el => <v-col cols="12">{el}</v-col>)
      ) : (
        <v-col>
          <v-timeline dense={root.$vuetify.breakpoint.smAndDown}>
            {content.map(
              (el, i) =>
                // root.$vuetify.breakpoint.smAndDown ?
                el
                  .map((el, j) => (
                    <v-timeline-item
                      large={!root.$vuetify.breakpoint.smAndDown && j === 0}
                      small={root.$vuetify.breakpoint.smAndDown && j !== 0}
                      left={i % 2}
                      right={(i + 1) % 2}
                    >
                      {el}
                    </v-timeline-item>
                  ))
                  .flat()
              //  : (
              //   <v-timeline-item
              //     scopedSlots={{
              //       opposite: () => el[1]
              //     }}
              //   >
              //     {el[0]}
              //   </v-timeline-item>
              // )
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
  },
  components: {
    VContainer,
    VCol,
    VRow,
    VTimeline,
    VTimelineItem,
    HomeItem,
    TheSettings,
    MediaCard
  }
})
</script>
