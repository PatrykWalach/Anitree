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
import { computed } from 'vue-function-api'
interface Props {
  card: TrelloCard
  checklists: TrelloChecklist[]
}

export default {
  props: {
    card: { required: true },
    checklists: { required: true }
  },
  setup(props: Readonly<Props>) {
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

    return { progress, color }
  }
}
</script>
