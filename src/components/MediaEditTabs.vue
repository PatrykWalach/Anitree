<template>
  <v-tabs v-model="tab" grow color="primary">
    <v-tab href="#edit1">
      <v-icon left>dashboard</v-icon>
      Progress
    </v-tab>

    <v-tab href="#edit2">
      <v-icon left>date_range</v-icon>
      Dates
    </v-tab>

    <v-tab href="#edit3">
      <v-icon left>insert_comment</v-icon>
      Notes
    </v-tab>

    <v-tab href="#edit4">
      <v-icon left>edit</v-icon>
      Advanced Scores
    </v-tab>

    <v-tab-item v-for="i in 4" :key="i" :value="'edit' + i">
      <v-container fluid grid-list-md>
        <MediaEditTabsTab :method="'edit' + i" :user="user" :media="media" />
      </v-container>
    </v-tab-item>
  </v-tabs>
</template>
<script lang="ts">
import MediaEditTabsTab from './MediaEditTabsTab.vue'
import { Media } from '@/apollo/schema/media'
import { User } from '@/apollo/schema/viewer'
import { createComponent } from 'vue-function-api'
import useEdit from '../store/edit'
interface Props {
  media: Media
  user: User
}

export default createComponent({
  props: ({
    media: { required: true },
    user: { required: true }
  } as unknown) as Readonly<Props>,
  components: {
    MediaEditTabsTab
  },
  setup() {
    const { tab } = useEdit()

    return { tab }
  }
})
</script>
