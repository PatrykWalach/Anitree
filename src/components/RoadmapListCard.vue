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
