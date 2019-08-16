<template>
  <base-container :loading="loading">
    <v-flex>
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <RoadmapList v-for="list in lists" :key="list.list.id" v-bind="list" />
      </v-timeline>
    </v-flex>
  </base-container>
</template>
<script lang="ts">
import {
  createComponent,
  value as binding,
  onCreated,
  Wrapper
} from 'vue-function-api'

import axios from 'axios'
import RoadmapList from '../components/RoadmapList.vue'
import BaseContainer from '../components/BaseContainer.vue'

import { TrelloList, Cards, TrelloCard, TrelloChecklist } from '../types'

export default createComponent({
  components: { RoadmapList, BaseContainer },
  setup() {
    const loading = binding(false)

    const lists: Wrapper<
      {
        list: TrelloList
        cards: Cards
      }[]
    > = binding([])

    const get = (el: string) => {
      const id = '5d06a49849ca095384351145'
      const key = process.env.VUE_APP_TRELLO_KEY
      const token = process.env.VUE_APP_TRELLO_TOKEN
      return axios
        .get(`https://api.trello.com/1/boards/${id}/${el}`, {
          params: { key, token }
        })
        .then(({ data }) => data)
    }

    const getLists = (): Promise<TrelloList[]> => get('lists')

    const getCards = (): Promise<TrelloCard[]> => get('cards')

    const getChecklists = (): Promise<TrelloChecklist[]> => get('checklists')

    const makeRequests = () =>
      Promise.all([getLists(), getCards(), getChecklists()])

    onCreated(async () => {
      loading.value = true
      const [_lists, cards, checklists]: [
        TrelloList[],
        TrelloCard[],
        TrelloChecklist[]
      ] = await makeRequests()
      loading.value = false

      lists.value = _lists.map(list => {
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
    })

    return { loading, lists }
  }
})
</script>
