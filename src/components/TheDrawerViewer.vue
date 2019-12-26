<template>
  <v-list-item @click.stop="extendedSync = !extendedSync">
    <v-list-item-avatar tile size="40">
      <v-img :src="viewer.avatar.large">
        <template v-slot:placeholder>
          <v-skeleton-loader type="image"> </v-skeleton-loader>
        </template>
      </v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ viewer.name }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon>{{
        extendedSync ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
      }}</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

import { User } from '../graphql/schema/viewer'

export interface Props {
  viewer: User
  extended: boolean
}
export default createComponent<Readonly<Props>>({
  props: {
    extended: { default: false, required: true, type: Boolean },
    viewer: { default: null, required: true, type: Object },
  },
  setup(props, { emit }) {
    const extendedSync = computed({
      get: () => props.extended,
      set: value => emit('update:extended', value),
    })
    return { extendedSync }
  },
})
</script>
