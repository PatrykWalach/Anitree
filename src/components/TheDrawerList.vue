<template>
  <v-list expand dense>
    <!-- <v-list-group
      :value="true"
      v-for="category in allCategories"
      :key="category"
      no-action
      prepend-icon="label"
    >
      <template v-slot:activator>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ category }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <template v-for="item in items.filter(item => item.category === category)">
        <v-list-tile :to="`/${item.id}`" avatar ripple :key="item.id">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list-group>-->
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TheDrawerList extends Vue {}
</script>
