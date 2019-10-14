<template>
  <BaseQuery
    v-slot="{ Media }"
    :apollo="{
      Media: {
        ...Media,
        tag: null,
      },
    }"
  >
    <!-- <BaseQuery
    v-slot="{ Media }"
    :apollo="{
      Media: {
        query: require('@/graphql/queries/Media.gql'),
        variables: variables,
        skip: !mediaId,
        tag: null,
      },
    }"
  > -->
    <v-container>
      <v-row>
        <v-col cols="12" v-if="!Media || Media.description">
          <v-skeleton-loader type="paragraph" :loading="!Media">
            <p v-html="Media && Media.description"></p>
          </v-skeleton-loader>
        </v-col>

        <v-col cols="12" md="6" v-if="!Media || Media.trailer">
          <v-card :style="{ overflow: 'hidden' }">
            <v-skeleton-loader type="image" :loading="!Media">
              <v-responsive :aspect-ratio="16 / 9">
                <iframe
                  v-if="Media.trailer.site === 'youtube'"
                  height="100%"
                  width="100%"
                  :src="
                    `https://www.youtube-nocookie.com/embed/${Media.trailer.id}`
                  "
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-responsive>
            </v-skeleton-loader>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card> </v-card>
        </v-col>

        <v-col cols="12" md="6" v-if="!Media || Media.stats.scoreDistribution">
          <TheMediaStats
            :loading="!Media"
            subheader="Score Distribution"
            :gradient="['#f72047', '#ffd200', '#1feaea']"
            labelKey="score"
            :distribution="Media && Media.stats.scoreDistribution"
          />
        </v-col>

        <v-col cols="12" md="6" v-if="!Media || Media.stats.statusDistribution">
          <TheMediaStats
            :loading="!Media"
            subheader="Status Distribution"
            :gradient="['#68d639', '#02a9ff', '#9256f3', '#f779a4', '#e85d75']"
            :distribution="Media && Media.stats.statusDistribution"
            labelKey="status"
            sort
          />
        </v-col>

        <template v-if="Media && Media.rankings.length">
          <v-col
            cols="12"
            md="4"
            v-for="(rankings, i) in Media.rankings.reduce(
              (acc, ranking) => {
                acc[ranking.type === 'POPULAR' ? 0 : 1].push(ranking)

                return acc
              },
              [[], []],
            )"
            :key="i === 0 ? 'POPULAR' : 'RATED'"
          >
            <v-card>
              <v-list>
                <v-list-item
                  v-for="{ id, rank, context, year, type, season } in rankings"
                  :key="id"
                  :to="{
                    name: 'search',
                    query: {
                      year: year || undefined,
                      season: season || undefined,
                      sort:
                        type === 'POPULAR' ? 'POPULARITY_DESC' : 'SCORE_DESC',
                      type: Media.type,
                    },
                  }"
                >
                  <v-list-item-icon>
                    <v-icon :color="type === 'POPULAR' ? 'red' : 'yellow'">
                      {{ type === 'POPULAR' ? 'favorite' : 'star' }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-capitalize">
                      #{{ rank }}
                      {{ context }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ season }}
                      {{ year }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </template>

        <v-col cols="12">
          <v-subheader>Tags</v-subheader>
          <TheMediaTags :media="Media" />
        </v-col>
      </v-row>
    </v-container>
  </BaseQuery>
</template>
<script lang="ts">
import BaseQuery from '@/components/BaseQuery.vue'
import TheMediaStats from '@/components/TheMediaStats.vue'
import TheMediaTags from '@/components/TheMediaTags.vue'
import { createComponent } from '@vue/composition-api'
import { useMedia } from '@/graphql'

export default createComponent({
  components: {
    BaseQuery,
    TheMediaStats,
    TheMediaTags,
  },
  setup(_, { root }) {
    return useMedia(() => ({ id: parseInt(root.$route.params.mediaId, 10) }))
  },
})
</script>
