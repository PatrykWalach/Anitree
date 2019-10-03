<template>
  <TheMediaDistributionBase
    subheader="Status Distribution"
    :gradient="['#68d639', '#02a9ff', '#9256f3', '#f779a4', '#e85d75']"
    :distribution="media.stats.statusDistribution"
    labelKey="status"
    sort
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
