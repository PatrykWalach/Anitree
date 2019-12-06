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
        exact
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
        v-for="{ bind, icon, title, on: action } in actions"
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
    </v-card-actions>
  </BaseQuery>
</template>

<script lang="ts">
import { NavigationElement, ShareData } from '../types'
import { computed, createComponent } from '@vue/composition-api'
import { useActions, useEdit as useEditActions } from '@/store'
import BaseQuery from './BaseQuery.vue'

import { Media } from '@/graphql/schema/media'

import { useDispatch } from 'vue-redux-hooks'
import { useTitle } from '../store'
import { useViewer } from '@/graphql'

export interface Props {
  media: Media | null
}

export const useMediaCardActions = () => {
  const { shareBtn, ...share } = useShare()
  const { anilistBtn, ...anilist } = useAnilist()
  const { editBtn, ...edit } = useEdit()

  const actions = (media: Media | null): NavigationElement[] => [
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

export const useShare = () => {
  const dispatch = useDispatch()
  const {
    share: { CHANGE_IS_SHARED, CHANGE_OPTIONS },
  } = useActions()

  const desktopShare = (data: ShareData) => {
    dispatch(CHANGE_OPTIONS(data))
    dispatch(CHANGE_IS_SHARED(true))
  }

  const { getTitle } = useTitle()

  const share = ({ title, siteUrl }: Media) => {
    const share = navigator.share || desktopShare
    share.call(navigator, {
      title: getTitle.value(title),
      url: siteUrl,
    })
  }

  const shareBtn = (media: Media | null): NavigationElement => ({
    bind: {
      disabled: !media,
    },
    icon: 'share',
    on: {
      click: (e: Event) => {
        e.preventDefault()
        media && share(media)
      },
    },
    title: 'Share',
  })

  return { share, shareBtn }
}

export const useEdit = () => {
  const { open } = useEditActions()

  const editBtn = (id: number | null): NavigationElement => ({
    bind: {
      disabled: !id,
    },
    icon: 'edit',
    on: {
      click: (e: Event) => {
        e.preventDefault()
        id && open(id)
      },
    },
    title: 'Edit',
  })

  return { editBtn, open }
}

export const useAnilist = () => {
  const anilistBtn = (media: Media | null): NavigationElement => ({
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
  setup(props) {
    const { actions: _actions } = useMediaCardActions()

    const actions = computed(() => _actions(props.media))

    return {
      actions,
      ...useViewer(),
    }
  },
})
</script>
