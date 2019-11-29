<template>
  <component
    :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-dialog'"
    v-model="isShared"
    scrollable
    max-width="440px"
  >
    <v-card>
      <v-card-title
        >Share link
        <v-spacer></v-spacer>
        <v-tooltip v-if="!$vuetify.breakpoint.xsOnly" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" @click.stop="isShared = false" v-on="on">
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>Close</span>
        </v-tooltip>
      </v-card-title>

      <v-snackbar v-model="snackbar" left>
        Link copied to clipboard
        <v-btn color="accent" text @click.stop="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>

      <v-list>
        <v-list-item v-clipboard="url" @success="snackbar = true">
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-text-field
                v-clipboard="url"
                hide-details
                flat
                single-line
                solo
                readonly
                :value="url"
                @success="snackbar = true"
              ></v-text-field>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn>
              copy
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <BaseShareItems :url="url" />
    </v-card>
  </component>
</template>

<script lang="ts">
import { VBottomSheet, VDialog } from 'vuetify/lib'
import { computed, createComponent, ref } from '@vue/composition-api'
import { useStore,useState } from '@/store'
import BaseShareItems from './BaseShareItems.vue'
import { ShareData } from '../types'
import { clipboard } from 'vue-clipboards'



export interface Props {
  options: ShareData | null
}

export default createComponent<Readonly<Props>>({
  components: { BaseShareItems, VBottomSheet, VDialog },
  directives: {
    clipboard,
  },
  props: {
    options: { default: null, required: true, type: null },
  },
  setup(props) {
    const snackbar = ref(false)

    const {
      dispatch,
      actions: {
        share: { CHANGE_IS_SHARED },
      },
    } = useStore()

    const isSharedState = useState(state => state.share.isShared)

    const isShared = computed({
      get: () => isSharedState.value,
      set: v => dispatch(CHANGE_IS_SHARED(v)),
    })

    // const isShared = computed({
    //   get: () => isSharedState.value,
    //   set: v => dispatch(CHANGE_IS_SHARED(v)),
    // })

    const url = computed(() => {
      const { options } = props
      return (options && options.url) || ''
    })

    return { isShared, snackbar, url }
  },
})
</script>
