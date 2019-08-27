<template>
  <base-container :loading="loading">
    <v-col>
      <v-row>
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <RoadmapList
            v-for="list in lists"
            :key="list.list.id"
            v-bind="list"
          />
        </v-timeline>
      </v-row>
    </v-col>
  </base-container>
</template>
<script lang="ts">
import { ref, Ref } from '@vue/composition-api'

import axios from 'axios'
import RoadmapList from '../components/RoadmapList.vue'
import BaseContainer from '../components/BaseContainer.vue'

import { TrelloList, Cards, TrelloCard, TrelloChecklist } from '../types'

export default {
  components: { RoadmapList, BaseContainer },
  setup() {
    const loading = ref(false)

    const lists: Ref<
      {
        list: TrelloList
        cards: Cards
      }[]
    > = ref([])

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

    loading.value = true

    makeRequests().then(([_lists, cards, checklists]) => {
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

      loading.value = false
    })

    return { loading, lists }
  }
}
</script>
