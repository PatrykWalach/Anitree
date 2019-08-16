<template>
  <v-list subheader>
    <v-subheader>Filters</v-subheader>
    <v-divider></v-divider>

    <v-subheader>Type</v-subheader>
    <v-list-item>
      <v-list-item-action>
        <search-filters-filter active-class="accent--text" name="type" column>
          <v-chip v-for="type in ['ANIME', 'MANGA']" :value="type" :key="type">
            {{ capitalize(type) }}
          </v-chip>
        </search-filters-filter>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>Sort</v-subheader>
    <v-list-item>
      <v-list-item-action>
        <search-filters-filter active-class="accent--text" name="sort" column>
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
          >
            {{ text }}
          </v-chip>
        </search-filters-filter>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>Status</v-subheader>
    <v-list-item>
      <v-list-item-action>
        <search-filters-filter
          active-class="accent--text"
          name="status"
          column
          multiple
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
          >
            {{ capitalize(status) }}
          </v-chip>
        </search-filters-filter>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import SearchFiltersFilter from './SearchFiltersFilter.vue'
import { createComponent } from 'vue-function-api'

export default createComponent({
  components: {
    SearchFiltersFilter
  },
  setup() {
    const capitalize = (str: string) =>
      str
        .split(/_/)
        .map(str => str[0].toUpperCase() + str.substr(1).toLowerCase())
        .join(' ')

    return { capitalize }
  }
})
</script>
