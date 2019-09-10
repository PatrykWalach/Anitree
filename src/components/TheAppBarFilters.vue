<template>
  <v-dialog v-model="dialog" max-width="720px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>tune</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Filters
      </v-card-title>
      <v-divider></v-divider>
      <v-list subheader>
        <v-subheader>Type</v-subheader>
        <v-chip-group
          v-model="form.type"
          show-arrows
          active-class="accent--text"
        >
          <v-chip
            v-for="type in ['ANIME', 'MANGA']"
            :key="type"
            :value="type"
            class="text-capitalize"
          >
            {{ type.toLowerCase() }}
          </v-chip>
        </v-chip-group>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-subheader>Sort</v-subheader>

        <v-chip-group
          v-model="form.sort"
          show-arrows
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
            :key="value"
            :value="value"
            class="text-capitalize"
          >
            {{ text }}
          </v-chip>
        </v-chip-group>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-subheader>Status</v-subheader>

        <base-field
          v-model="form.status"
          :before-transform="[e => (e instanceof Array ? e : [])]"
          :after-transform="[e => (e.length ? e : undefined)]"
          tag="v-chip-group"
          multiple
          show-arrows
          active-class="accent--text"
        >
          <v-chip
            v-for="status in [
              'CANCELLED',
              'FINISHED',
              'NOT_YET_RELEASED',
              'RELEASING'
            ]"
            :key="status"
            filter
            :value="status"
            class="text-capitalize"
          >
            {{
              status
                .toLowerCase()
                .split(/_/)
                .join(' ')
            }}
          </v-chip>
        </base-field>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="close">cancel</v-btn>
        <v-btn text color="primary" @click="submit">submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, createComponent, ref } from '@vue/composition-api'

import BaseField from './BaseField.vue'

export default createComponent({
  components: {
    BaseField
  },
  setup(_, { root }) {
    const _form = ref({})
    const dialog = ref(false)

    const close = () => {
      dialog.value = false
      _form.value = {}
    }

    const submit = () => {
      root.$router.replace({
        query: form.value
      })
      close()
    }
    const query = computed(() => root.$route.query)

    const form = computed({
      get: () => {
        return {
          ...query.value,
          ..._form.value
        }
      },
      set: e => {
        _form.value = e
      }
    })
    return { close, dialog, form, query, submit }
  }
})
</script>
