<template>
  <v-card-text>
    <template v-if="value.length">
      <v-subheader>Score Distribution</v-subheader>

      <v-sparkline
        auto-draw
        :auto-draw-duration="1000"
        line-width="3"
        :smooth="10"
        type="bar"
        :labels="labels"
        :value="value"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        gradient-direction="left"
        :color="theme.isDark ? 'white' : 'black'"
      ></v-sparkline>
    </template>
    <v-subheader v-else>There are no stats for this show yet</v-subheader>
  </v-card-text>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'
import { useTheme } from './MediaCardProgress.vue'

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  props: { media: { default: null, required: true, type: Object } },
  setup(props) {
    const scoreDistribution = computed(
      () => props.media.stats.scoreDistribution || []
    )

    const value = computed(() =>
      scoreDistribution.value.map(({ amount }) => amount)
    )

    const labels = computed(() =>
      scoreDistribution.value.map(({ score }) => score)
    )

    const { theme } = useTheme()

    return { labels, theme, value }
  }
})
</script>
