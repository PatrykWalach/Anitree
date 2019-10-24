<template>
  <BaseQuery
    :apollo="{
      Viewer,
    }"
    v-slot="{ Viewer }"
  >
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :disabled="!media"
        :to="
          (media && {
            name: 'media',
            params: {
              mediaId: media.id,
              mediaType: media.type.toLowerCase(),
            },
          }) ||
            undefined
        "
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>
      <v-tooltip
        top
        :key="title"
        v-for="{ bind, icon, title, on: action } in actions(media)"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="{ ...bind, ...attrs }"
            icon
            v-on="{ ...action, ...on }"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ title }}</span>
      </v-tooltip>
      <!-- <v-tooltip top>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            icon
            :disabled="!media"
            rel="noopener"
            target="_blank"
            :href="media && media.siteUrl"
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
            @click.stop="share(media)"
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
            @click.stop="open(media && media.id)"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
        <span>Edit</span>
      </v-tooltip> -->
    </v-card-actions>
  </BaseQuery>
</template>

<script lang="ts">
import { SetupContext, createComponent } from '@vue/composition-api'
import BaseQuery from './BaseQuery.vue'
import { Element } from '@/modules/navigation'
import { Media } from '@/graphql/schema/media'

import { ShareData } from '../types'

export interface Props {
  media: Media | null
}
import { useViewer } from '@/graphql'

export const useMediaCardActions = (root: SetupContext['root']) => {
  const { shareBtn, ...share } = useShare(root)
  const { anilistBtn, ...anilist } = useAnilist()
  const { editBtn, ...edit } = useEdit(root)

  const actions = (media: Media | null): Element[] => [
    editBtn(media && media.id),
    shareBtn(media),
    anilistBtn(media),
  ]

  return {
    ...edit,
    ...anilist,
    ...share,
    actions,
  }
}

export const useShare = (root: SetupContext['root']) => {
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

  const share = ({ title, siteUrl }: Media) => {
    const share = navigator.share || desktopShare

    share.call(navigator, {
      title: getTitle.value(title),
      url: siteUrl,
    })
  }

  const shareBtn = (media: Media | null): Element => ({
    bind: {
      disabled: !media,
    },
    icon: 'share',
    on: {
      click: () => media && share(media),
    },
    title: 'Share',
  })

  return { share, shareBtn }
}

export const useEdit = (root: SetupContext['root']) => {
  const {
    actions: { open },
  } = root.$modules.edit

  const editBtn = (id: number | null): Element => ({
    bind: {
      disabled: !id,
    },
    icon: 'edit',
    on: {
      click: () => id && open(id),
    },
    title: 'Edit',
  })

  return { editBtn, open }
}
export const useAnilist = () => {
  const anilistBtn = (media: Media | null): Element => ({
    bind: {
      disabled: !media,
      href: media && media.siteUrl,
      rel: 'noopener',
      target: '_blank',
    },
    icon: 'open_in_new',
    title: 'Anilist',
  })

  return { anilistBtn }
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseQuery,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
  setup(props, { root }) {
    return {
      ...useViewer(root),
      ...useMediaCardActions(root),
    }
  },
})
</script>
