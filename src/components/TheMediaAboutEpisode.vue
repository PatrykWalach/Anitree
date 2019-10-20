<template>
  <v-list-item selectable>
    <v-list-item-content>
      <v-list-item-title class="text-capitalize"
        >Episode #{{ media.nextAiringEpisode.episode }}</v-list-item-title
      >
      <v-list-item-subtitle class="text-capitalize">
        {{ subtitle }}</v-list-item-subtitle
      >
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '../graphql/schema/media'

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const fmt = new Intl.RelativeTimeFormat('en', {
      style: 'narrow',
    })
    const types = [
      { type: 'day', value: 3600 * 24 },
      {
        type: 'hour',
        value: 3600,
      },
      { type: 'minute', value: 60 },
    ] as const

    const timeUntilAiring = computed(
      () =>
        (props.media.nextAiringEpisode &&
          props.media.nextAiringEpisode.timeUntilAiring) ||
        0,
    )

    const type = computed(() => {
      for (const type of types) {
        const time = Math.floor(timeUntilAiring.value / type.value)

        if (!time) {
          continue
        }
        return type
      }
      return { type: 'second', value: 1 } as const
    })

    const subtitle = computed(() =>
      fmt.format(
        Math.floor(timeUntilAiring.value / type.value.value),
        type.value.type,
      ),
    )

    return { subtitle, type }
  },
})
</script>
