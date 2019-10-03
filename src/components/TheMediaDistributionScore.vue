<template>
  <TheMediaDistributionBase
    subheader="Score Distribution"
    :gradient="['#f72047', '#ffd200', '#1feaea']"
    :distribution="media.stats.scoreDistribution"
    labelKey="score"
  />
</template>

<script lang="ts">
import { Media } from '../graphql/schema/media'
import TheMediaDistributionBase from './TheMediaDistributionBase.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  components: { TheMediaDistributionBase },
  props: { media: { default: null, required: true, type: Object } },
})
</script>
