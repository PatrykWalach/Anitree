<template>
  <v-list-tile target="_blank" :href="card.shortUrl" rel="noopener">
    <v-list-tile-avatar v-if="checklists.length">
      <v-progress-circular
        :value="progress"
        :color="color"
      ></v-progress-circular>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ card.name }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ card.desc }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TrelloCard, TrelloChecklist } from '../types'

@Component
export default class RoadmapListCard extends Vue {
  @Prop({ required: true })
  public readonly card!: TrelloCard

  @Prop({ required: true })
  public readonly checklists!: TrelloChecklist[]

  get progress() {
    return (
      (this.card.badges.checkItemsChecked / this.card.badges.checkItems) * 100
    )
  }

  get color() {
    return `${
      this.progress === 100 ? 'green' : this.progress === 0 ? 'red' : 'orange'
    } lighten-2`
  }
}
</script>
