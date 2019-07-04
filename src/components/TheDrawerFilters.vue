<template>
  <v-list two-line subheader>
    <v-subheader>Filters</v-subheader>

    <TheDrawerFiltersFilter
      v-for="filter in filters"
      :key="filter"
      :relation-type="filter"
    />
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TheDrawerFiltersFilter from './TheDrawerFiltersFilter.vue'

@Component({
  components: {
    TheDrawerFiltersFilter
  }
})
export default class TheDrawerFilters extends Vue {
  @Prop()
  public readonly filters!: string[]
}
</script>
