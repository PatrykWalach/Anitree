<template>
  <v-list-item @click>
    <v-list-item-action>
      <v-switch :input-value="active" @change="changeActive"></v-switch>
      <!-- <Basevalue v-model="value"/> -->
    </v-list-item-action>

    <v-list-item-content @click="changeActive(!active)">
      <v-list-item-title class="text-capitalize">{{
        relationType.replace(/_/g, ' ').toLowerCase()
      }}</v-list-item-title>
      <v-list-item-subtitle class="text-capitalize">{{
        type.toLowerCase()
      }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-checkbox
        :disabled="!active"
        :input-value="exclusive"
        @change="changeExclusive"
      ></v-checkbox>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moduleMedia from '../store/modules/media'

@Component
export default class TheDrawerFiltersFilter extends Vue {
  @Prop({ required: true })
  readonly relationType!: string

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

  changeActive(active: boolean) {
    this.CHANGE_FILTER({
      active
    })
  }

  changeExclusive(exclusive: boolean) {
    this.CHANGE_FILTER({ exclusive })
  }

  created() {
    this.CHANGE_FILTER()
  }

  CHANGE_FILTER({
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
