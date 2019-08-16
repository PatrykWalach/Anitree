<template>
  <component :is="!$vuetify.breakpoint.xsOnly ? 'v-menu' : 'v-bottom-sheet'">
    <template v-slot:activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
          v-show="hover || !media || $vuetify.breakpoint.xsOnly"
          :style="{ top: 0, right: 0 }"
          absolute
          icon
          v-bind="{ ...attrs, ...$attrs }"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>

    <v-card>
      <template v-if="$vuetify.breakpoint.xsOnly">
        <v-list-item>
          <MediaCardItemAvatar :media="media" size="40" />
          <v-list-item-content>
            <MediaCardItemOverline :media="media" />

            <v-list-item-title class="text-capitalize">
              <MediaCardProgress v-if="!media" width="50%" />
              <template v-else>
                {{ title }}
              </template>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>
      <v-list :shaped="desktop" :dense="desktop">
        <v-list-item rel="noopener" target="_blank" :href="url">
          <v-list-item-icon>
            <v-icon>open_in_new</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Anilist</v-list-item-title>
        </v-list-item>

        <v-list-item @click="share">
          <v-list-item-icon>
            <v-icon>share</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Share</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="Viewer" @click="edit">
          <v-list-item-icon>
            <v-icon>edit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </component>
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
import { createComponent, computed, value as binding } from 'vue-function-api'
import useTitle from '../store/title'
import useShareModule from '../store/share'
import useEdit from '../store/edit'
import useAuth from '../store/auth'

function useShare(props: Props) {
  const { CHANGE_OPTIONS, CHANGE_IS_SHARED } = useShareModule()
  const { title: _title } = useTitle()

  const desktopShare = async (data: ShareData) => {
    await CHANGE_OPTIONS(data)
    CHANGE_IS_SHARED(true)
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
  hover: boolean
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
  props: ({
    hover: { required: true, type: Boolean },
    media: { required: true }
  } as unknown) as Readonly<Props>,
  setup(props, context) {
    const { media } = props
    const { root } = context

    const menu = binding(false)

    const desktop = computed(() =>
      !root.$vuetify.breakpoint.xsOnly ? true : undefined
    )

    const { open, isEdited } = useEdit()

    const edit = () => {
      if (media) {
        open(media.id)
      }
    }

    return {
      menu,
      isEdited,
      desktop,
      edit,
      ...useShare(props)
    }
  }
})
</script>
