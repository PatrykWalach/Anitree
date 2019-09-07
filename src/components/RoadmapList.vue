<template>
  <v-timeline-item :color="color" :large="!$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-toolbar :color="color" flat>
        <div class="headline">
          {{ list.name }}
        </div>
      </v-toolbar>
      <v-list two-line>
        <RoadmapListCard
          v-for="card in cards"
          :key="card.card.id"
          v-bind="card"
        />
      </v-list>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import { TrelloList, Cards } from '../types'
import RoadmapListCard from './RoadmapListCard.vue'
import { createComponent, computed } from '@vue/composition-api'

export interface Props {
  list: TrelloList
  cards: Cards
}

export default createComponent<Readonly<Props>>({
  components: {
    RoadmapListCard
  },
  props: {
    list: { required: true, type: Object, default: null },
    cards: { required: true, type: Array, default: null }
  },
  setup(props) {
    const allChecked = computed(() =>
      props.cards.find(
        ({ card }) => card.badges.checkItemsChecked !== card.badges.checkItems
      )
    )

    const anyChecked = computed(() =>
      props.cards.find(card => !!card.card.badges.checkItemsChecked)
    )

    const color = computed(
      () =>
        `${
          allChecked.value ? (anyChecked.value ? 'orange' : 'red') : 'green'
        } lighten-2`
    )
    return { color, allChecked, anyChecked }
  }
})
</script>
