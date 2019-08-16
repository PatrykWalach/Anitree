<template>
  <v-timeline-item :color="color" :large="!$vuetify.breakpoint.smAndDown">
    <v-card>
      <base-color :color="color" tag="v-toolbar" flat>
        <div class="headline">
          {{ list.name }}
        </div>
      </base-color>
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
import BaseColor from './BaseColor.vue'
import { createComponent, computed } from 'vue-function-api'

interface Props {
  list: TrelloList
  cards: Cards
}
export default createComponent({
  components: {
    RoadmapListCard,
    BaseColor
  },
  props: ({
    list: { required: true },
    cards: { required: true }
  } as unknown) as Readonly<Props>,
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
