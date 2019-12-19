import { Media as MediaT, Variables } from '@/graphql/schema/media'
import { MEDIA } from '@/graphql'
import Router from 'vue-router'
import Vue from 'vue'
import { apollo } from '@/apollo'
import { setItem } from '@/store/utils/localStorage'
import { settingsActions } from './store/modules/settings'
import { store } from './store'

const Home = () =>
  import(
    /* webpackChunkName: "Home" */ /* webpackPrefetch: true */ './views/Home.vue'
  )
const Media = () =>
  import(
    /* webpackChunkName: "Media" */ /* webpackPrefetch: true */ './views/Media.vue'
  )
const MediaAbout = () =>
  import(
    /* webpackChunkName: "MediaAbout" */ /* webpackPrefetch: true */ './views/MediaAbout.vue'
  )
const MediaTimeline = () =>
  import(
    /* webpackChunkName: "MediaTimeline" */ /* webpackPrefetch: true */ './views/MediaTimeline.vue'
  )

const Changes = () =>
  import(
    /* webpackChunkName: "Changes" */ /* webpackPrefetch: true */ './views/Changes.vue'
  )

const Settings = () =>
  import(
    /* webpackChunkName: "Settings" */ /* webpackPrefetch: true */ './views/Settings.vue'
  )
const Search = () =>
  import(
    /* webpackChunkName: "Search" */ /* webpackPrefetch: true */ './views/Search.vue'
  )

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      component: Home,
      name: 'home',
      path: '/',
    },
    {
      beforeEnter: (to, from, next) => {
        next({
          name: 'media-about',
          params: {
            ...to.params,
            title: 'title',
          },
        })
      },
      name: 'media',
      path: '/:mediaType/:mediaId',
    },
    {
      beforeEnter: (to, from, next) => {
        const currentId = parseInt(to.params.mediaId, 10)

        apollo
          .query<{ Media: MediaT }, Variables>({
            query: MEDIA,
            variables: { id: currentId },
          })
          .then(({ data }) => data.Media)
          .then(media => {
            const title = media.title.romaji || ''
            document.title = title + ' - Anitree'

            const slush = title
              .trim()
              .replace(/[^\w\s]/g, '')
              .replace(/\s/g, '-')

            if (to.params.title === slush) {
              next()
            } else {
              next({
                ...to,
                params: {
                  ...to.params,
                  title: slush,
                },
              })
            }
          })
      },
      children: [
        {
          component: MediaAbout,
          name: 'media-about',
          path: '',
        },
        {
          component: MediaTimeline,
          name: 'media-timeline',
          path: 'timeline',
        },
      ],
      component: Media,
      path: '/:mediaType/:mediaId/:title',
    },
    {
      component: Changes,
      name: 'changes',
      path: '/changes',
    },
    {
      component: Search,
      name: 'search',
      path: '/search',
    },
    {
      component: Settings,
      name: 'settings',
      path: '/settings',
    },
    {
      name: 'auth',
      path: '/auth',
      redirect: to => {
        const hash = Object.fromEntries(
          to.hash
            .replace(/#/, '')
            .split(/&/)
            .map(el => el.split(/=/)),
        )

        store.dispatch(settingsActions.CHANGE_TOKEN(hash.access_token || null))

        const route = localStorage.getItem('LAST_ROUTE')
        if (route) {
          return { ...JSON.parse(route), hash: '' }
        }
        return { hash: '', name: 'home' }
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

router.afterEach(to => {
  const { name, params, query } = to
  if (name) {
    if (name !== 'media-timeline' && name !== 'media-about') {
      const [[firstLetter, ...otherLetters]] = name.split('-')
      document.title =
        firstLetter.toUpperCase() + otherLetters.join('') + ' - Anitree'
    }

    setItem('LAST_ROUTE', { name, params, query })
  }
})

export default router

Vue.use(Router)
