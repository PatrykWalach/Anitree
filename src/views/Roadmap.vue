<template>
  <base-container :loading="loading">
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <RoadmapList v-for="list in lists" v-bind="list" :key="list.list.id" />
    </v-timeline>
  </base-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import axios from 'axios'
import RoadmapList from '../components/RoadmapList.vue'
import BaseContainer from '../components/BaseContainer.vue'

import { TrelloList, Cards, TrelloCard, TrelloChecklist } from '../types'

@Component({
  components: { RoadmapList, BaseContainer }
})
export default class Roadmap extends Vue {
  public loading: boolean = false

  public lists: Array<{
    list: TrelloList
    cards: Cards
  }> = []

  public async created() {
    this.loading = true
    const [lists, cards, checklists]: [
      TrelloList[],
      TrelloCard[],
      TrelloChecklist[]
    ] = await this.makeRequests()
    this.loading = false

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
    const { getLists, getCards, getChecklists } = this
    return Promise.all([getLists(), getCards(), getChecklists()])
  }

  public get(el: string) {
    const id = '5d06a49849ca095384351145'
    const key = process.env.TRELLO_KEY
    const token = process.env.TRELLO_TOKEN
    return axios
      .get(`https://api.trello.com/1/boards/${id}/${el}`, {
        params: { key, token }
      })
      .then(({ data }) => data)
  }

  public getLists(): Promise<TrelloList[]> {
    return this.get('lists')
  }

  public getCards(): Promise<TrelloCard[]> {
    return this.get('cards')
  }

  public getChecklists(): Promise<TrelloChecklist[]> {
    return this.get('checklists')
  }
}
</script>
