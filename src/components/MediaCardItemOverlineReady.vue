<template>
  <div v-if="link" class="overline">
    <router-link
      :to="{
        name: 'search',
        query
      }"
    >
      {{ link }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'

export interface Props {
  media: Media
}
export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object }
  },
  setup(props) {
    const year = computed(() => {
      if (props.media.seasonInt) {
        const year = Math.floor(props.media.seasonInt / 10)
        return year > 50 ? 1900 + year : 2000 + year
      }
      return null
    })

    const season = computed(() => props.media.season)

    const link = computed(() =>
      [season.value && season.value.toLowerCase(), year.value]
        .filter(e => e)
        .join(' ')
    )

    const query = computed(() => {
      return { season: season.value, year: year.value }
    })

    return { link, query, season, year }
  }
})
</script>
