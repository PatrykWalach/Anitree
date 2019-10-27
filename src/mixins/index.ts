import { NavigationElement, ShareData } from '@/types'
import { Ref, SetupContext, computed, inject, ref } from '@vue/composition-api'
import { Location } from 'vue-router'
import { Media } from '@/graphql/schema/media'
import { MediaSort } from '@/graphql/schema/page'

export const useTheme = (root: SetupContext['root']) => {
  const dark = computed({
    get: () => root.$vuetify.theme.dark,
    set: dark => {
      root.$vuetify.theme.dark = dark
      localStorage.setItem('THEME', dark.toString())
    },
  })
  return { dark }
}

export const useInjectedTheme = () => {
  const theme = inject('theme', { isDark: false })

  const color = computed(() =>
    theme.isDark ? 'grey darken-2' : 'grey lighten-2',
  )

  return { color, theme }
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

export const useString = () => ({
  clean: (str: string | null) =>
    (str &&
      str
        .split(/_/g)
        .map(str => {
          if (str !== 'TV' && str !== 'OVA' && str !== 'ONA')
            return str.toLowerCase()
          return str
        })
        .join(' ')) ||
    '',
})

export const useRoutes = (root: SetupContext['root']) => {
  const routeTitle = computed(() => {
    const { name } = root.$route
    return name === 'media-about' || name === 'media-timeline'
  })
  const routeHome = computed(() => root.$route.name === 'home')
  const routeSearch = computed(() => root.$route.name === 'search')

  const { main } = useMainNavigation(root)

  const routeMain = computed(() => {
    const { name } = root.$route

    return !!main.value.find(({ bind }) => bind.to.name === name)
  })

  return {
    routeHome,
    routeMain,
    routeSearch,
    routeTitle,
  }
}

export const useExtensionChip = () => {
  const { theme } = useInjectedTheme()

  const activeClass = computed(() =>
    theme.isDark ? 'white black--text ' : 'grey darken-2 white--text',
  )
  return {
    activeClass,
    theme,
  }
}

export const useAppBarActions = (
  props: { media: Media | null },
  root: SetupContext['root'],
) => {
  const { actions: _actions } = useMediaCardActions(root)

  const { active } = useFab(root)

  const { routeTitle } = useRoutes(root)

  const { searchBtn: _searchBtn } = useSearch()

  const searchBtn = computed(_searchBtn)
  const actions = computed(() => _actions(props.media))

  const allActions = computed(() =>
    (routeTitle.value ? actions.value : []).concat([searchBtn.value]),
  )

  const filteredActions = computed(() => {
    const { name } = root.$route
    const activeIcon = active.value.icon

    return allActions.value
      .filter(
        ({ icon, bind }) =>
          icon !== activeIcon && (!bind || !bind.to || bind.to.name !== name),
      )
      .reverse()
  })

  const mainActions = computed(() => filteredActions.value.slice().splice(0, 2))
  const moreActions = computed(() => filteredActions.value.slice().splice(2))

  return {
    allActions,
    filteredActions,
    mainActions,
    moreActions,
  }
}

export const useMainNavigation = (root: SetupContext['root']) => {
  const main: Ref<
    (NavigationElement & { bind: { to: Location } })[]
  > = computed(() => [
    {
      bind: { exact: true, to: { name: 'home' } },
      icon: 'home',
      title: 'Home',
    },
    {
      badge: {
        value: root.$modules.commands.pending.value.length,
      },
      bind: { exact: true, to: { name: 'changes' } },
      icon: 'change_history',
      title: 'Changes',
    },
    {
      bind: { exact: true, to: { name: 'settings' } },
      icon: 'settings',
      title: 'Settings',
    },
  ])

  return { main }
}

export const useSearchNavigation = () => {
  const search: NavigationElement[] = [
    {
      bind: {
        to: {
          name: 'search',
          query: {
            season: (() => {
              const months = ['WINTER', 'SPRING', 'SUMMER', 'FALL']
              const date = Math.floor(new Date().getMonth() / 3)
              return months[date]
            })(),
            sort: 'POPULARITY_DESC',
            year: new Date().getFullYear().toString(),
          },
        },
      },
      icon: 'whatshot',
      title: 'Current season',
    },
    {
      bind: {
        to: {
          name: 'search',
          query: {
            sort: 'ID_DESC',
          },
        },
      },
      icon: 'new_releases',
      title: 'Recently added',
    },
    {
      bind: {
        to: {
          name: 'search',
          query: {
            sort: 'TRENDING_DESC',
          },
        },
      },
      icon: 'trending_up',
      title: 'Trending',
    },
  ]
  return { search }
}
export const useSearch = () => {
  const searchBtn = (): NavigationElement => ({
    bind: { exact: true, to: { name: 'search', query: {} } },
    icon: 'search',
    title: 'Search',
  })

  return { searchBtn }
}

export const useFab = (root: SetupContext['root']) => {
  const { editBtn: _editBtn } = useEdit(root)

  const editBtn = computed(() =>
    _editBtn(parseInt(root.$route.params.mediaId, 10)),
  )

  const { searchBtn: _searchBtn } = useSearch()

  const searchBtn = computed(_searchBtn)

  const active = computed(() => {
    const { filter, timeline } = root.$modules

    switch (root.$route.name) {
      case 'search':
        return {
          icon: 'tune',
          on: {
            click: (e: Event) => {
              e.preventDefault()
              filter.CHANGE_IS_SHOWN(true)
            },
          },
          title: 'Filter',
        }
      case 'media-timeline':
        return {
          icon: 'sort',
          on: {
            click: (e: Event) => {
              e.preventDefault()
              timeline.CHANGE_ORDER(timeline.state.order.value * -1)
            },
          },
          title: 'Sort',
        }
      case 'media-about':
        return editBtn.value
      default:
        return searchBtn.value
    }
  })

  return {
    active,
  }
}

export const useDialog = (root: SetupContext['root']) => {
  const { isShown, CHANGE_IS_SHOWN } = root.$modules.filter

  const dialog = computed({
    get: () => isShown.value,
    set: _value => CHANGE_IS_SHOWN(_value),
  })

  return {
    dialog,
  }
}

export interface Filters {
  sort: MediaSort
  onList: 'false' | 'true'
  adult: 'false' | 'true'
  isAdult: 'false' | 'true'
}

export const useForm = (root: SetupContext['root']) => {
  const _form: Ref<Partial<Filters>> = ref({})

  const query = computed(() => root.$route.query)

  const form = computed({
    get: () => ({
      ...query.value,
      ..._form.value,
    }),
    set: change => {
      _form.value = { ..._form.value, ...change }
    },
  })

  return { _form, form, query }
}

export const useAccount = (root: SetupContext['root']) => {
  const id = ref(process.env.VUE_APP_ANILIST_ID || false)

  const { token } = root.$modules.settings

  return { id, token }
}
