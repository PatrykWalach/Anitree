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
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import BaseQuery from './BaseQuery.vue'
// import { Element } from '@/modules/navigation'
import { Media } from '@/graphql/schema/media'
import { useViewer } from '@/graphql'

export interface Props {
  media: Media | null
}

export const useMediaCardActions = (root: SetupContext['root']) => {
  const { shareBtn, ...share } = useShare(root)
  const { anilistBtn, ...anilist } = useAnilist()
  const { editBtn, ...edit } = useEdit(root)

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

export const useShare = (root: SetupContext['root']) => {
  const { CHANGE_OPTIONS, CHANGE_IS_SHARED } = root.$modules.share

  const { getTitle } = root.$modules.title

  const desktopShare = (data: ShareData) => {
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

export const useEdit = (root: SetupContext['root']) => {
  const { open } = root.$modules.edit

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
  setup(props, { root }) {
    const { actions: _actions } = useMediaCardActions(root)

    const actions = computed(() => _actions(props.media))

    return {
      actions,
      ...useViewer(root),
    }
  },
})
</script>
