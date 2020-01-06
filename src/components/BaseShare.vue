<template>
  <v-card color="primary darken-1" dark>
    <v-card-title>Share link</v-card-title>

    <v-snackbar v-model="snackbar" left>
      Link copied to clipboard
      <v-btn color="accent" text @click.stop="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-list color="transparent">
      <v-list-item selectable>
        <v-list-item-content>
          <v-list-item-subtitle>
            <v-text-field
              color="accent"
              filled
              single-line
              hide-details
              readonly
              :value="url"
            />
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            v-clipboard="url"
            color="accent"
            outlined
            @success="snackbar = true"
          >
            copy
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <BaseShareItems :url="url" />
  </v-card>
</template>

<script lang="ts">
import { VBottomSheet, VDialog } from 'vuetify/lib'
import { computed, createComponent, ref } from '@vue/composition-api'
import BaseShareItems from './BaseShareItems.vue'
import { ShareData } from '../types'
import { clipboard } from 'vue-clipboards'

export interface Props {
  options: ShareData
}

export default createComponent<Readonly<Props>>({
  components: { BaseShareItems, VBottomSheet, VDialog },
  directives: {
    clipboard,
  },
  props: {
    options: { default: null, required: true, type: Object },
  },
  setup(props) {
    const snackbar = ref(false)

    const url = computed(() => props.options.url)

    return { snackbar, url }
  },
})
</script>
