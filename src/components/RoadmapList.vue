<template>
  <v-timeline-item :color="color" :large="!$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title :class="color">{{ list.name }}</v-card-title>
      <v-card-text>
        <v-list two-line>
          <RoadmapListCard
            v-for="card in cards"
            :key="card.card.id"
            v-bind="card"
          />
        </v-list>
      </v-card-text>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TrelloList, Cards } from '../types'
import RoadmapListCard from './RoadmapListCard.vue'

@Component({
  components: {
    RoadmapListCard
  }
})
export default class RoadmapList extends Vue {
  @Prop({ required: true })
  readonly list!: TrelloList

  @Prop({ required: true })
  readonly cards!: Cards

  get color() {
    return `${
      this.allChecked ? (this.anyChecked ? 'orange' : 'red') : 'green'
    } lighten-2`
  }
  get allChecked() {
    return this.cards.find(
      ({ card }) => card.badges.checkItemsChecked !== card.badges.checkItems
    )
  }
  get anyChecked() {
    return this.cards.find(card => !!card.card.badges.checkItemsChecked)
  }
}
</script>
