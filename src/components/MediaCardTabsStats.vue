<template>
  <v-card-text>
    <v-subheader v-if="value.length">Score Distribution</v-subheader>
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
  </v-card-text>
</template>

<script lang="ts">
import { createComponent, computed, inject, Wrapper } from 'vue-function-api'
import { Media } from '../apollo/schema/media'

interface Props {
  media: Media
}

export default createComponent({
  props: ({ media: { required: true } } as unknown) as Readonly<Props>,
  setup(props) {
    const scoreDistribution = computed(
      () => props.media.stats.scoreDistribution || []
    )

    const value = computed(
      () => scoreDistribution.value.map(({ amount }) => amount) || []
    )

    const labels = computed(
      () => scoreDistribution.value.map(({ score }) => score) || []
    )
    const theme: void | Wrapper<{
      isDark: boolean
    }> = inject('theme')

    return { value, labels, theme }
  }
})
</script>
