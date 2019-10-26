<template>
  <v-card v-if="loading || value.length">
    <v-subheader>
      {{ subheader }}
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon
            v-on="on"
            left
            @click="showMore = !showMore"
            :color="showMore ? 'primary' : ''"
            >bar_chart</v-icon
          ></template
        >
        <span>{{ showMore ? 'Less' : 'More' }}</span>
      </v-tooltip>
    </v-subheader>

    <v-card-text>
      <v-skeleton-loader height="156" :loading="loading" type="image">
        <v-sheet color="rgba(0, 0, 0, .12)" class="pa-2">
          <v-sparkline
            auto-draw
            :auto-draw-duration="1000"
            line-width="3"
            :smooth="10"
            type="bar"
            :labels="showMore ? labeledValue : labels"
            :value="value"
            :gradient="gradient"
            gradient-direction="left"
          ></v-sparkline>
        </v-sheet>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { computed, createComponent, inject, ref } from '@vue/composition-api'

export const useTheme = () => {
  const theme = inject('theme', { isDark: false })

  const color = computed(() =>
    theme.isDark ? 'grey darken-2' : 'grey lighten-2',
  )

  return { color, theme }
}

export interface Props {
  gradient: string[]
  subheader: string
  labelKey: string
  sort: boolean
  distribution:
    | {
        amount: number
        [key: string]: string | number
      }[]
    | null
}

export default createComponent<Readonly<Props>>({
  props: {
    distribution: {
      default: null,
      required: true,
      type: null,
    },
    gradient: {
      default: () => [],
      required: false,
      type: Array,
    },
    labelKey: {
      default: '',
      required: false,
      type: String,
    },
    loading: {
      default: false,
      required: false,
      type: Boolean,
    },
    sort: {
      default: false,
      required: false,
      type: Boolean,
    },
    subheader: {
      default: '',
      required: false,
      type: String,
    },
  },
  setup(props) {
    const showMore = ref(false)

    const distribution = computed(() => {
      const { distribution, sort } = props

      const _distribution = (distribution || []).slice()
      if (_distribution.length && sort) {
        return _distribution.sort(({ amount: a }, { amount: b }) => b - a)
      }
      return _distribution
    })

    const value = computed(() => distribution.value.map(({ amount }) => amount))

    const { format } = new Intl.NumberFormat('en-US', {
      compactDisplay: 'short',
      notation: 'compact',
    } as Intl.NumberFormatOptions)

    const labeledValue = computed(() => value.value.map(format))

    const labels = computed(() => {
      const { labelKey } = props
      return distribution.value.map(_distribution => _distribution[labelKey])
    })

    return { labeledValue, labels, showMore, value }
  },
})
</script>
