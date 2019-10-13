<template>
  <v-tooltip top>
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        v-bind="attrs"
        icon
        :disabled="!media"
        v-on="on"
        @click.stop="share"
      >
        <v-icon>share</v-icon>
      </v-btn>
    </template>
    <span>Share</span>
  </v-tooltip>
</template>

<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'
import { ShareData } from '../types'

export const useShare = (props: Props, { root }: SetupContext) => {
  const {
    mutations: { CHANGE_OPTIONS, CHANGE_IS_SHARED },
  } = root.$modules.share

  const {
    getters: { getTitle },
  } = root.$modules.title

  const desktopShare = async (data: ShareData) => {
    CHANGE_OPTIONS(data)
    CHANGE_IS_SHARED(true)
  }

  const title = computed(() => getTitle.value(props.media && props.media.title))

  const url = computed(() => (props.media && props.media.siteUrl) || '')

  const share = () => {
    const share = navigator.share || desktopShare

    share.call(navigator, {
      title: title.value,
      url: url.value,
    })
  }

  return { share, title, url }
}

export interface Props {
  media: Media | null
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: null },
  },
  setup(props, context) {
    return useShare(props, context)
  },
})
</script>
