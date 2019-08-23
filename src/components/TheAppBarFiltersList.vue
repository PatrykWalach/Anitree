<template>
  <v-card-text class="pa-0">
    <v-container fluid>
      <v-layout column>
        <v-subheader>Type</v-subheader>
        <v-flex>
          <v-chip-group
            @change="
              e => {
                syncedForm.type = e
              }
            "
            :value="syncedForm.type || query.type"
            column
            active-class="accent--text"
          >
            <v-chip
              v-for="type in ['ANIME', 'MANGA']"
              :value="type"
              :key="type"
              class="text-capitalize"
            >
              {{ type.toLowerCase() }}
            </v-chip>
          </v-chip-group>
        </v-flex>

        <v-subheader>Sort</v-subheader>
        <v-flex>
          <v-chip-group
            @change="
              e => {
                syncedForm.sort = e
              }
            "
            :value="syncedForm.sort || query.sort"
            column
            active-class="accent--text"
          >
            <v-chip
              v-for="{ value, text } in [
                {
                  value: 'ID_DESC',
                  text: 'Date Added'
                },
                {
                  value: 'FAVOURITES_DESC',
                  text: 'Favorites'
                },
                {
                  value: 'POPULARITY_DESC',
                  text: 'Popularity'
                },
                {
                  value: 'START_DATE_DESC',
                  text: 'Release Date'
                },
                {
                  value: 'SCORE_DESC',
                  text: 'Score'
                },
                {
                  value: 'TITLE_ROMAJI',
                  text: 'Title'
                },
                {
                  value: 'TRENDING_DESC',
                  text: 'Trending'
                }
              ]"
              :value="value"
              :key="value"
              class="text-capitalize"
            >
              {{ text }}
            </v-chip>
          </v-chip-group>
        </v-flex>
        <v-subheader>Status</v-subheader>
        <v-flex>
          <base-field
            :value="syncedForm.status || query.status"
            @input="
              e => {
                syncedForm.status = e
              }
            "
            :beforeTransform="[e => (e instanceof Array ? e : [e])]"
            :afterTransform="[e => (e.length ? e : undefined)]"
            tag="v-chip-group"
            multiple
            column
            active-class="accent--text"
          >
            <v-chip
              filter
              v-for="status in [
                'CANCELLED',
                'FINISHED',
                'NOT_YET_RELEASED',
                'RELEASING'
              ]"
              :value="status"
              :key="status"
              class="text-capitalize"
            >
              {{
                status
                  .toLowerCase()
                  .split(/_/)
                  .join(' ')
              }}
            </v-chip></base-field
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-text>
</template>

<script lang="ts">
import { createComponent, computed } from 'vue-function-api'

import { Variables } from '@/apollo/schema/page'
import BaseField from './BaseField.vue'
interface Props {
  form: Partial<Variables>
}

export default createComponent({
  components: {
    BaseField
  },
  props: {
    form: { required: true }
  },
  setup(props: Readonly<Props>, { root, emit }) {
    const query = computed(() => root.$route.query)

    const syncedForm = computed({
      get: () => props.form,
      set: form => emit('update:form', form)
    })

    return { syncedForm, query }
  }
})
</script>
