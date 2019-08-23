import Vue from 'vue'
import Router from 'vue-router'
import useAuth from './store/auth'
import apollo, { MEDIA } from '@/apollo'
import { Media as MediaT, Variables } from './apollo/schema/media'

const Home = () => import(/* webpackPrefetch: true */ './views/Home.vue')
const Media = () => import(/* webpackPrefetch: true */ './views/Media.vue')

const Roadmap = () => import('./views/Roadmap.vue')
const Settings = () =>
  import(/* webpackPrefetch: true */ './views/Settings.vue')
const Search = () => import(/* webpackPrefetch: true */ './views/Search.vue')

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/:mediaType/:mediaId',
      name: 'media',
      beforeEnter: (to, from, next) => {
        const currentId = parseInt(to.params.mediaId, 10)

        apollo
          .query<{ Media: MediaT }, Variables>({
            query: MEDIA,
            variables: { id: currentId }
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
              name: 'title',
              params: {
                ...to.params,
                title: slush
              }
            })
          })
          .catch(() => next(false))
      }
    },
    {
      path: '/:mediaType/:mediaId/:title',
      name: 'title',
      component: Media
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: Roadmap
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: to => {
        const hash = Object.fromEntries(
          to.hash
            .replace(/#/, '')
            .split(/&/)
            .map(el => el.split(/=/))
        )
        const { CHANGE_TOKEN } = useAuth()

        CHANGE_TOKEN(hash.access_token || null)

        const route = localStorage.getItem('LAST_ROUTE')
        if (route) {
          return { ...JSON.parse(route), hash: '' }
        }
        return { name: 'home', hash: '' }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.afterEach(to => {
  const { name, params, query } = to
  if (name) {
    if (name !== 'title') {
      document.title = 'Anitree - ' + name[0].toUpperCase() + name.substr(1)
    }

    localStorage.setItem('LAST_ROUTE', JSON.stringify({ name, params, query }))
  }
})

export default router

Vue.use(Router)
