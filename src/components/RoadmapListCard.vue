<template>
  <v-list-item target="_blank" :href="card.shortUrl" rel="noopener">
    <v-list-item-avatar v-if="checklists.length">
      <v-progress-circular
        :value="progress"
        :color="color"
      ></v-progress-circular>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ card.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ card.desc }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { TrelloCard, TrelloChecklist } from '../types'
import { computed, createComponent } from '@vue/composition-api'
export interface Props {
  card: TrelloCard
  checklists: TrelloChecklist[]
}

export default createComponent<Readonly<Props>>({
  props: {
    card: {
      default: null,
      required: true,
      type: Object
    },
    checklists: {
      default: () => [],
      required: true,
      type: Array
    }
  },
  setup(props) {
    const progress = computed(
      () =>
        (props.card.badges.checkItemsChecked / props.card.badges.checkItems) *
        100
    )

    const color = computed(
      () =>
        `${
          progress.value === 100
            ? 'green'
            : progress.value === 0
            ? 'red'
            : 'orange'
        } lighten-2`
    )

    return { color, progress }
  }
})
</script>
