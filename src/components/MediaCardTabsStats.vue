<template>
  <v-card-text>
    <template v-if="value.length">
      <v-subheader>Score Distribution</v-subheader>
      <v-sparkline
        smooth
        type="bar"
        :labels="labels"
        :value="value"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        gradient-direction="left"
        auto-line-width
        :color="theme.isDark ? 'white' : 'black'"
      ></v-sparkline>
    </template>
    <v-subheader v-else>There are no stats for this show yet</v-subheader>
  </v-card-text>
</template>

<script lang="ts">
import { createComponent, computed } from 'vue-function-api'
import { Media } from '../apollo/schema/media'
import { useTheme } from './MediaCardProgress.vue'

interface Props {
  media: Media
}

export default createComponent({
  props: { media: { required: true } },
  setup(props: Readonly<Props>) {
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

    return { value, labels, theme }
  }
})
</script>
