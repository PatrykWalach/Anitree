<template>
  <v-container>
    <v-timeline :dense="$vuetify.breakpoint.xs">
      <RoadmapList v-for="list in lists" v-bind="list" :key="list.list.id"/>
    </v-timeline>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import axios from 'axios'
import { trello } from '../../credentials'
import RoadmapList from '../components/RoadmapList.vue'

import {
  TrelloList,
  TrelloLists,
  TrelloCards,
  TrelloChecklists,
  Cards
} from '../types'

@Component({
  components: { RoadmapList }
})
export default class Roadmap extends Vue {
  public lists: Array<{
    list: TrelloList
    cards: Cards
  }> = []

  public async created() {
    const [lists, cards, checklists]: [
      TrelloLists,
      TrelloCards,
      TrelloChecklists
    ] = await this.makeRequests()

    this.lists = lists.map(list => {
      return {
        list,
        cards: cards
          .filter(card => card.idList === list.id)
          .map(card => {
            return {
              card,
              checklists: checklists.filter(
                checklist => checklist.idCard === card.id
              )
            }
          })
      }
    })
  }

  public makeRequests() {
    const id = '5d06a49849ca095384351145'
    return Promise.all([
      axios
        .get(`https://api.trello.com/1/boards/${id}/lists`, {
          params: { key: trello.key, token: trello.token }
        })
        .then(({ data }) => data),
      axios
        .get(`https://api.trello.com/1/boards/${id}/cards`, {
          params: { key: trello.key, token: trello.token }
        })
        .then(({ data }) => data),
      axios
        .get(`https://api.trello.com/1/boards/${id}/checklists`, {
          params: { key: trello.key, token: trello.token }
        })
        .then(({ data }) => data)
    ])
  }
}
</script>
