<template>
  <v-container>
    <v-row>
      <v-col v-if="!Media || description">
        <v-skeleton-loader type="paragraph" :loading="!Media">
          <p v-html="description"></p>
        </v-skeleton-loader>
      </v-col>

      <v-col cols="12" md="5" v-if="!Media || Media.trailer">
        <v-card shaped :style="{ overflow: 'hidden' }">
          <v-skeleton-loader type="image" :loading="!Media">
            <v-responsive :aspect-ratio="16 / 9">
              <iframe
                loading="lazy"
                v-if="Media && Media.trailer.site === 'youtube'"
                height="100%"
                width="100%"
                :src="
                  `https://www.youtube-nocookie.com/embed/${Media &&
                    Media.trailer.id}`
                "
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </v-responsive>
          </v-skeleton-loader>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="6" md="3" v-if="!Media || Media.nextAiringEpisode">
                <v-skeleton-loader :loading="!Media" type="list-item-two-line">
                  <TheMediaAboutEpisode :media="Media" />
                </v-skeleton-loader>
              </v-col>

              <v-col cols="6" md="3" v-if="!Media || Media.seasonInt">
                <v-skeleton-loader :loading="!Media" type="list-item-two-line">
                  <v-list-item selectable>
                    <v-list-item-content>
                      <v-list-item-title class="text-capitalize"
                        >Series Season</v-list-item-title
                      >
                      <v-list-item-subtitle class="text-capitalize">
                        {{
                          Media &&
                            Media.seasonInt &&
                            getSeason(Media.seasonInt).toLowerCase()
                        }}
                        {{
                          Media && Media.seasonInt && getYear(Media.seasonInt)
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-skeleton-loader>
              </v-col>

              <v-col cols="6" md="3" v-if="!Media || Media.source">
                <v-skeleton-loader :loading="!Media" type="list-item-two-line">
                  <v-list-item selectable>
                    <v-list-item-content>
                      <v-list-item-title class="text-capitalize"
                        >Series Origin</v-list-item-title
                      >
                      <v-list-item-subtitle class="text-capitalize">{{
                        Media && clean(Media.source)
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-skeleton-loader>
              </v-col>
              <v-col cols="6" md="3" v-if="!Media || Media.duration">
                <v-skeleton-loader :loading="!Media" type="list-item-two-line">
                  <v-list-item selectable>
                    <v-list-item-content>
                      <v-list-item-title class="text-capitalize"
                        >Episode duration</v-list-item-title
                      >
                      <v-list-item-subtitle class="text-capitalize"
                        >{{ Media && Media.duration }}min</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-skeleton-loader>
              </v-col>
              <v-col cols="6" md="3" v-if="!Media || Media.hashtag">
                <v-skeleton-loader :loading="!Media" type="list-item-two-line">
                  <v-list-item selectable>
                    <v-list-item-content>
                      <v-list-item-title class="text-capitalize"
                        >Hashtag</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        <a
                          rel="noopener"
                          target="_blank"
                          :href="`www.twitter.com?s=${Media && Media.hashtag}`"
                        >
                          {{ Media && Media.hashtag }}
                          <v-icon color="primary" small>open_in_new</v-icon>
                        </a>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-skeleton-loader>
              </v-col>
              <v-col cols="6" md="3" v-if="!Media || Media.meanScore">
                <v-skeleton-loader :loading="!Media" type="list-item-two-line">
                  <v-list-item selectable>
                    <v-list-item-content>
                      <v-list-item-title class="text-capitalize"
                        >Mean Score</v-list-item-title
                      >
                      <v-list-item-subtitle class="text-capitalize">{{
                        Media && Media.meanScore
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-skeleton-loader>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-if="
        !Media ||
          Media.stats.scoreDistribution ||
          Media.stats.statusDistribution
      "
    >
      <v-col cols="12" md="6" v-if="!Media || Media.stats.scoreDistribution">
        <TheMediaAboutStats
          :loading="!Media"
          subheader="Score Distribution"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          labelKey="score"
          :distribution="Media && Media.stats.scoreDistribution"
        />
      </v-col>

      <v-col cols="12" md="6" v-if="!Media || Media.stats.statusDistribution">
        <TheMediaAboutStats
          :loading="!Media"
          subheader="Status Distribution"
          :gradient="['#68d639', '#02a9ff', '#9256f3', '#f779a4', '#e85d75']"
          :distribution="Media && Media.stats.statusDistribution"
          labelKey="status"
          sort
        />
      </v-col>
    </v-row>
    <v-row>
      <TheMediaAboutRanking :media="Media" />
      <TheMediaAboutRanking popularity :media="Media" />

      <v-col cols="12" v-if="!Media || Media.tags">
        <v-subheader>Tags</v-subheader>
        <TheMediaAboutTags :media="Media" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import TheMediaAboutEpisode from '@/components/TheMediaAboutEpisode.vue'
import TheMediaAboutRanking from '@/components/TheMediaAboutRanking.vue'
import TheMediaAboutStats from '@/components/TheMediaAboutStats.vue'
import TheMediaAboutTags from '@/components/TheMediaAboutTags.vue'
import { useMedia } from '@/graphql'
import { useResult } from '@vue/apollo-composable'
import { useRouteParams } from '../App.vue'
import { useString } from '@/components/MediaCardItemSubtitle.vue'

export default createComponent({
  components: {
    TheMediaAboutEpisode,
    TheMediaAboutRanking,
    TheMediaAboutStats,
    TheMediaAboutTags,
  },
  setup(_, { root }) {
    const getYear = (seasonInt: number) => {
      const year = Math.floor(seasonInt / 10)
      return (year < 50 ? 2000 : 1900) + year
    }

    const getSeason = (seasonInt: number) => {
      const season = seasonInt % 10
      switch (season) {
        case 1:
          return 'SPRING'
        case 2:
          return 'SUMMER'
        case 3:
          return 'FALL'
        default:
          return 'WINTER'
      }
    }

    const { currentId } = useRouteParams(root)

    const { Media, result } = useMedia(
      computed(() => ({ id: currentId.value })),
    )

    const description = useResult(result, null, data => data.Media.description)

    return {
      getSeason,
      getYear,
      ...useString(),
      Media,
      description,
    }
  },
})
</script>
