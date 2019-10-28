<template>
  <v-col v-if="!media || rankings.length" cols="12" md="4">
    <v-card>
      <v-list>
        <template v-if="!media">
          <v-skeleton-loader type="list-item-avatar" :key="i" v-for="i in 3" />
        </template>
        <template v-else>
          <v-list-item
            v-for="{ id, rank, context, year, type, season } in rankings"
            :key="id"
            :to="{
              name: 'search',
              query: {
                year: year || undefined,
                season: season || undefined,
                sort: popularity ? 'POPULARITY_DESC' : 'SCORE_DESC',
                type: media.type,
              },
            }"
          >
            <v-list-item-icon>
              <v-icon :color="popularity ? 'red' : 'yellow'">
                {{ popularity ? 'favorite' : 'star' }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">
                #{{ rank }}
                {{ context }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-capitalize">
                {{ season }}
                {{ year }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item></template
        >
      </v-list>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '../graphql/schema/media'
export interface Props {
  media: Media | null
  popularity: boolean
}
export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: null },
    popularity: { default: false, required: false, type: Boolean },
  },
  setup(props) {
    const rankings = computed(() => {
      const media = props.media
      const popularity = props.popularity

      return (
        (media &&
          media.rankings.filter(({ type }) => {
            const popular = type === 'POPULAR'
            return (!popularity || popular) && (!popular || popularity)
          })) ||
        []
      )
    })

    return { rankings }
  },
})
</script>
