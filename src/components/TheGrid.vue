<template>
  <v-row dense>
    <v-col
      :cols="6"
      :sm="4"
      :md="3"
      :lg="2"
      :key="media.id"
      v-for="media in mediaList"
    >
      <TheGridCard :media="media" />
    </v-col>
    <slot v-bind="{ showingEverything, increaseShowing }"></slot>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import TheGridCard, { TheGridCardFragments } from './TheGridCard.vue'
import { useReducer } from '../hooks/reducer'
import { TheGrid_media } from './__generated__/TheGrid_media'

import gql from 'graphql-tag'

export const TheGridFragments = {
  media: gql`
    fragment TheGrid_media on Media {
      id
      ...TheGridCard_media
    }
    ${TheGridCardFragments.media}
  `,
}

export const useShow = (props: Readonly<Props>) => {
  const [showing, increaseShowing] = useReducer(
    (state) => state + props.show,
    props.show,
    [
      ({ dispatch, state }) => (next) => (action) =>
        action instanceof Function ? action(dispatch, state) : next(action),
    ],
  )

  const mediaList = computed(() => props.media.slice(0, showing.value))
  const showingEverything = computed(() => showing.value >= props.media.length)

  return { showingEverything, mediaList, increaseShowing }
}

interface Props {
  media: TheGrid_media[]
  show: number
}

export default defineComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Array },
    show: { default: 12, required: false, type: Number },
  },
  components: { TheGridCard },

  setup(props) {
    return useShow(props)
  },
})
</script>
