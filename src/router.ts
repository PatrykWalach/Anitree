import { MEDIA, apollo } from '@/graphql'
import { Media as MediaT, Variables } from '@/graphql/schema/media'
import Router from 'vue-router'
import Vue from 'vue'
import { settings } from '@/store/settings'

const Home = () => import(/* webpackPrefetch: true */ './views/Home.vue')
const Media = () => import(/* webpackPrefetch: true */ './views/Media.vue')
const MediaAbout = () =>
  import(/* webpackPrefetch: true */ './views/MediaAbout.vue')
const MediaTimeline = () =>
  import(/* webpackPrefetch: true */ './views/MediaTimeline.vue')

const Changes = () => import(/* webpackPrefetch: true */ './views/Changes.vue')

const Settings = () =>
  import(/* webpackPrefetch: true */ './views/Settings.vue')
const Search = () => import(/* webpackPrefetch: true */ './views/Search.vue')

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
        const currentId = parseInt(to.params.mediaId, 10)

        apollo
          .query<{ Media: MediaT }, Variables>({
            query: MEDIA,
            variables: { id: currentId },
          })
          .then(({ data }) => data.Media)
          .then(media => {
            const title = media.title.romaji
            document.title = 'Anitree - ' + title
            const slush = title
              .trim()
              .replace(/[^\w\s]/g, '')
              .replace(/\s/g, '-')

            return next({
              name: 'media-about',
              params: {
                ...to.params,
                title: slush,
              },
            })
          })
          .catch(() => {
            next(from ? false : { name: 'home' })
          })
      },
      name: 'media',
      path: '/:mediaType/:mediaId',
    },
    {
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
        const {
          mutations: { CHANGE_TOKEN },
        } = settings

        CHANGE_TOKEN(hash.access_token || null)

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
    if (name !== 'title') {
      document.title =
        'Anitree - ' + name[0].toUpperCase() + name.split('-')[0].substr(1)
    }

    localStorage.setItem('LAST_ROUTE', JSON.stringify({ name, params, query }))
  }
})

export default router

Vue.use(Router)
