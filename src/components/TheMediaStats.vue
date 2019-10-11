<template>
  <v-card v-if="value.length">
    <v-subheader
      >{{ subheader }}
      <v-spacer></v-spacer>
      <v-icon left>bar_chart</v-icon></v-subheader
    >
    <v-card-text>
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
            :color="theme.isDark ? 'white' : 'black'"
          ></v-sparkline>
        </v-sheet>
      </v-hover>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { useTheme } from './MediaCardProgress.vue'

export interface Props {
  gradient: string[]
  subheader: string
  labelKey: string
  sort: boolean
  distribution: {
    amount: number
    [key: string]: string | number
  }[]
}

export default createComponent<Readonly<Props>>({
  props: {
    distribution: {
      default: null,
      required: false,
      type: Array,
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
      const _distribution = props.distribution.slice() || []
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

    const { theme } = useTheme()

    return { labeledValue, labels, theme, value }
  },
})
</script>
