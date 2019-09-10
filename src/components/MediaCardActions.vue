<template>
  <v-card-actions>
    <v-spacer></v-spacer>

    <v-tooltip top>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          icon
          :disabled="!media"
          rel="noopener"
          target="_blank"
          :href="url"
          v-on="on"
        >
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </template>
      <span>Anilist</span>
    </v-tooltip>

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

    <v-tooltip v-if="Viewer" top>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          icon
          :disabled="!media"
          v-on="on"
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
import { NewNavigator, ShareData } from '../types'
import { computed, createComponent } from '@vue/composition-api'

import { Media } from '@/graphql/schema/media'
import { VIEWER } from '@/graphql'

import { useEdit } from '../store/edit'
import { useSettings } from '../store/settings'
import { useShare as useShareModule } from '../store/share'
import { useTitle } from '../store/title'

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
  apollo: {
    Viewer: {
      query: VIEWER,
      skip() {
        return !useSettings().token.value
      },
    },
  },
  props: {
    media: { default: null, required: true, type: null },
  },
  setup(props) {
    const { media } = props

    const { open } = useEdit()

    const edit = () => {
      if (media) {
        open(media.id)
      }
    }

    return {
      edit,
      ...useShare(props),
    }
  },
})
</script>
