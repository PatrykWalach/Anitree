<template>
  <v-tabs
    v-model="tab"
    vertical
    fixed-tabs
    :slider-color="media.coverImage.color"
  >
    <v-tab href="#edit1">
      <v-icon>dashboard</v-icon>
    </v-tab>
    <v-tab href="#edit2">
      <v-icon>date_range</v-icon>
    </v-tab>
    <v-tab href="#edit3">
      <v-icon>insert_comment</v-icon>
    </v-tab>
    <v-tab href="#edit4">
      <v-icon>edit</v-icon>
    </v-tab>
    <v-tabs-items v-model="tab" vertical>
      <MediaEditFormItem
        v-for="i in 4"
        :key="i"
        :method="'edit' + i"
        :user="user"
        :media="media"
      />
    </v-tabs-items>
  </v-tabs>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { Media, User } from '../types'
import MediaEditFormItem from './MediaEditFormItem.vue'

@Component({
  components: {
    MediaEditFormItem
  }
})
export default class MediaEditForm extends Vue {
  tab = 'edit1'

  @Prop()
  readonly media!: Media

  @Prop()
  readonly user!: User
}
</script>
