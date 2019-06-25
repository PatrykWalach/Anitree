<template>
  <v-list two-line subheader>
    <v-subheader>Filters</v-subheader>

    <TheDrawerFiltersFilter
      v-for="relationType in relationTypes"
      :relationType="relationType"
      :key="relationType"
    />
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TheDrawerFiltersFilter from './TheDrawerFiltersFilter.vue'
import moduleMedia from '@/store/modules/media'

@Component({
  components: {
    TheDrawerFiltersFilter
  }
})
export default class TheDrawerFilters extends Vue {
  get relationTypes() {
    return moduleMedia.relationTypes
  }
}
</script>
