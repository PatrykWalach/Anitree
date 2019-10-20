<template>
  <v-card v-if="loading || value.length">
    <v-subheader>
      {{ subheader }}
      <v-spacer></v-spacer>
      <v-icon left>bar_chart</v-icon>
    </v-subheader>

    <v-card-text>
      <v-skeleton-loader height="156" :loading="loading" type="image">
        <v-hover v-slot="{ hover }">
          <v-sheet color="rgba(0, 0, 0, .12)" class="pa-2">
            <v-sparkline
              auto-draw
              :auto-draw-duration="1000"
              line-width="3"
              :smooth="10"
              type="bar"
              :labels="hover ? labeledValue : labels"
              :value="value"
              :gradient="gradient"
              gradient-direction="left"
            ></v-sparkline>
          </v-sheet>
        </v-hover>
      </v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { computed, createComponent, inject } from '@vue/composition-api'

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
    const distribution = computed(() => {
      const _distribution = (props.distribution || []).slice()
      if (_distribution.length && props.sort) {
        return _distribution.sort(({ amount: a }, { amount: b }) => b - a)
      }
      return _distribution
    })

    const value = computed(() => distribution.value.map(({ amount }) => amount))

    const fmt = new Intl.NumberFormat('en-US', {
      compactDisplay: 'short',
      notation: 'compact',
    } as Intl.NumberFormatOptions)

    const labeledValue = computed(() => value.value.map(fmt.format))

    const labels = computed(() =>
      distribution.value.map(_distribution => _distribution[props.labelKey]),
    )

    return { labeledValue, labels, value }
  },
})
</script>
