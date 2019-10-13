<template>
  <v-chip-group v-if="!media">
    <v-skeleton-loader class="my-1 mr-2" v-for="i in 10" :key="i" type="chip">
    </v-skeleton-loader>
  </v-chip-group>
  <v-card-text v-else>
    <v-chip
      v-if="link"
      outlined
      link
      label
      :style="{ margin: '4px 8px 4px 0' }"
      class="text-uppercase"
      :to="{
        name: 'search',
        query,
      }"
    >
      {{ link }}
    </v-chip>

    <v-chip
      v-for="{ id, rank, name } in media.tags
        .slice()
        .sort(({ rank: a }, { rank: b }) => b - a)"
      :key="`tag-${id}`"
      link
      label
      :style="{ margin: '4px 8px 4px 0' }"
      :to="{ name: 'search', query: { includedTags: name } }"
    >
      <v-avatar left> {{ rank }} </v-avatar>
      {{ name.toLowerCase() }}
    </v-chip>
  </v-card-text>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '../graphql/schema/media'

interface Props {
  media: Media | null
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: null },
  },
  setup(props) {
    const year = computed(() => {
      if (props.media && props.media.seasonInt) {
        const year = Math.floor(props.media && props.media.seasonInt / 10)
        return year > 50 ? 1900 + year : 2000 + year
      }
      return null
    })

    const season = computed(() => props.media && props.media.season)

    const link = computed(() =>
      [season.value && season.value.toLowerCase(), year.value]
        .filter(e => e)
        .join(' '),
    )

    const query = computed(() => ({ season: season.value, year: year.value }))

    return { link, query, season, year }
  },
})
</script>
