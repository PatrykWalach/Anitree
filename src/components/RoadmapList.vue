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
import { Cards, TrelloList } from '../types'
import { computed, createComponent } from '@vue/composition-api'
import RoadmapListCard from './RoadmapListCard.vue'

export interface Props {
  list: TrelloList
  cards: Cards
}

export default createComponent<Readonly<Props>>({
  components: {
    RoadmapListCard
  },
  props: {
    cards: { default: null, required: true, type: Array },
    list: { default: null, required: true, type: Object }
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
    return { allChecked, anyChecked, color }
  }
})
</script>
