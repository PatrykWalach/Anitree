<template>
  <v-list-group color="accent">
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>Title Language</v-list-item-title>
        <v-list-item-subtitle
          >Select your prefered language for all the
          titles</v-list-item-subtitle
        >
      </v-list-item-content>
    </template>
    <v-list-item>
      <v-list-item-action>
        <!-- <v-btn-toggle mandatory v-model="preferedTitle">
          <v-btn text v-for="title in titles" :value="title" :key="title">
            {{ title }}
          </v-btn>
        </v-btn-toggle> -->
        <v-chip-group
          mandatory
          v-model="preferedTitle"
          active-class="accent--text"
        >
          <v-chip v-for="title in titles" :value="title" :key="title">
            {{ title }}
          </v-chip>
        </v-chip-group>
      </v-list-item-action>
    </v-list-item>
  </v-list-group>
  <!-- <v-list-item>
    <v-list-item-content>
      <v-list-item-title>Title Language</v-list-item-title>
      <v-list-item-subtitle
        >Select your prefered language for all the titles</v-list-item-subtitle
      >
    </v-list-item-content>

    <v-list-item-action>
      <v-chip-group
        mandatory
        v-model="preferedTitle"
        active-class="accent--text"
      >
        <v-chip v-for="title in titles" :value="title" :key="title">
          {{ title }}
        </v-chip>
      </v-chip-group>

    </v-list-item-action>
  </v-list-item> -->
</template>

<script lang="ts">
import { createComponent } from 'vue-function-api'
import useTitle from '@/store/title'

export default createComponent({
  setup() {
    const { preferedTitle, titles } = useTitle()

    return {
      preferedTitle,
      titles
    }
  }
})
</script>
