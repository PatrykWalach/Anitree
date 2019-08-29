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
import { Media } from '@/graphql/schema/media'
import { createComponent, computed } from '@vue/composition-api'
export interface Props {
  media: Media
}
export default createComponent<Readonly<Props>>({
  props: {
    media: { required: true, default: null, type: Object }
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
      return { year: year.value, season: season.value }
    })

    return { year, season, link, query }
  }
})
</script>
