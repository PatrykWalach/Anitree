<template>
  <VCard color="primary darken-1" dark>
    <VCardTitle>Share link</VCardTitle>

    <VSnackbar v-model="snackbar" left>
      Link copied to clipboard
      <VBtn color="accent" text @click.stop="snackbar = false">
        Close
      </VBtn>
    </VSnackbar>

    <VList color="transparent">
      <VListItem selectable>
        <VListItemContent>
          <VListItemSubtitle>
            <VTextField
              color="accent"
              filled
              single-line
              hide-details
              readonly
              :value="url"
            />
          </VListItemSubtitle>
        </VListItemContent>
        <VListItemAction>
          <VBtn
            v-clipboard="url"
            color="accent"
            outlined
            @success="snackbar = true"
          >
            copy
          </VBtn>
        </VListItemAction>
      </VListItem>
    </VList>
    <BaseShareItems :url="url" />
  </VCard>
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
