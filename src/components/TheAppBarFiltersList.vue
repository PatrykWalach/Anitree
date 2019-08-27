<template>
  <v-card-text class="pa-0">
    <v-container fluid>
      <v-col>
        <v-subheader>Type</v-subheader>
        <v-row cols="12">
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
        </v-row>

        <v-subheader>Sort</v-subheader>
        <v-row cols="12">
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
        </v-row>
        <v-subheader>Status</v-subheader>
        <v-row cols="12">
          <base-field
            :value="syncedForm.status || query.status || []"
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
        </v-row>
      </v-col>
    </v-container>
  </v-card-text>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'

import { Variables } from '@/apollo/schema/page'
import BaseField from './BaseField.vue'
export interface Props {
  form: Partial<Variables>
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseField
  },
  props: {
    form: { required: true, type: Object, default: null }
  },
  setup(props, { root, emit }) {
    const query = computed(() => root.$route.query)

    const syncedForm = computed({
      get: () => props.form,
      set: form => emit('update:form', form)
    })

    return { syncedForm, query }
  }
})
</script>
