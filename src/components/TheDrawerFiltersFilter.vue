<template>
  <v-list-tile avatar @click>
    <v-list-tile-action>
      <v-switch :input-value="active" @change="changeActive"></v-switch>
      <!-- <Basevalue v-model="value"/> -->
    </v-list-tile-action>

    <v-list-tile-content @click="changeActive(!active)">
      <v-list-tile-title class="text-capitalize">{{
        relationType.replace(/_/g, ' ').toLowerCase()
      }}</v-list-tile-title>
      <v-list-tile-sub-title class="text-capitalize">{{
        type.toLowerCase()
      }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-checkbox
        :disabled="!active"
        :input-value="exclusive"
        @change="changeExclusive"
      ></v-checkbox>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moduleMedia from '../store/modules/media'

@Component
export default class TheDrawerFiltersFilter extends Vue {
  @Prop({ required: true })
  public readonly relationType!: string

  get type() {
    return !this.exclusive ? 'include' : 'exclude'
  }

  get filter() {
    return moduleMedia.filters[this.relationType]
  }

  get active() {
    return (this.filter && this.filter.active) || false
  }

  get exclusive(): boolean {
    return (this.filter && this.filter.exclusive) || false
  }

  public changeActive(active: boolean) {
    this.CHANGE_FILTER({
      active
    })
  }

  public changeExclusive(exclusive: boolean) {
    this.CHANGE_FILTER({ exclusive })
  }

  public created() {
    this.CHANGE_FILTER()
  }

  public CHANGE_FILTER({
    exclusive,
    active
  }: {
    exclusive?: boolean
    active?: boolean
  } = {}) {
    moduleMedia.CHANGE_FILTER({
      filter: node => node.relationType !== this.relationType,
      id: this.relationType,
      exclusive: exclusive !== undefined ? exclusive : this.exclusive,
      active: active !== undefined ? active : this.active
    })
  }
}
</script>
