<template>
  <v-card-actions>
    <v-spacer></v-spacer>

    <v-tooltip top>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          icon
          :disabled="!media"
          rel="noopener"
          target="_blank"
          :href="url"
        >
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </template>
      <span>Anilist</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          icon
          :disabled="!media"
          @click.stop="share"
        >
          <v-icon>share</v-icon>
        </v-btn>
      </template>
      <span>Share</span>
    </v-tooltip>

    <v-tooltip v-if="Viewer" top>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          icon
          :disabled="!media"
          @click.stop="edit"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <span>Edit</span>
    </v-tooltip>
  </v-card-actions>
</template>

<script lang="ts">
import { ShareData, NewNavigator } from '../types'

import BaseLazyImg from './BaseLazyImg.vue'
import MediaCardItemOverline from './MediaCardItemOverline.vue'
import MediaCardItemAvatar from './MediaCardItemAvatar.vue'
import MediaCardProgress from './MediaCardProgress.vue'

import { VIEWER } from '@/apollo'
import { Media } from '@/apollo/schema/media'

import { VMenu, VBottomSheet } from 'vuetify/lib'
import { createComponent, computed } from 'vue-function-api'
import useTitle from '../store/title'
import useShareModule from '../store/share'
import useEdit from '../store/edit'
import useAuth from '../store/auth'

function useShare(props: Props) {
  const { options, isShared } = useShareModule()
  const { title: _title } = useTitle()

  const desktopShare = async (data: ShareData) => {
    options.value = data
    isShared.value = true
  }

  const title = computed(() => _title.value(props.media && props.media.title))

  const url = computed(() => (props.media && props.media.siteUrl) || '')

  const share = () => {
    const share = (navigator as NewNavigator).share || desktopShare

    share.call(navigator, {
      url: url.value,
      title: title.value
    })
  }

  return { url, title, share }
}

interface Props {
  media: Media | null
}

export default createComponent({
  components: {
    BaseLazyImg,
    MediaCardItemOverline,
    MediaCardItemAvatar,
    MediaCardProgress,
    VMenu,
    VBottomSheet
  },
  apollo: {
    Viewer: {
      query: VIEWER,
      skip() {
        return !useAuth().token.value
      }
    }
  },
  props: {
    media: { required: true }
  },
  setup(props: Readonly<Props>) {
    const { media } = props

    const { open } = useEdit()

    const edit = () => {
      if (media) {
        open(media.id)
      }
    }

    return {
      edit,
      ...useShare(props)
    }
  }
})
</script>
