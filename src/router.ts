import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/store/modules/auth'

const Home = () => import('./views/Home.vue')
const Media = () => import(/* webpackPrefetch: true */ './views/Media.vue')
const Roadmap = () => import('./views/Roadmap.vue')
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
      component: Media,
      children: [{ path: ':title', name: 'title' }]
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
      path: '/auth',
      name: 'auth',
      redirect: to => {
        const hash = Object.fromEntries(
          to.hash
            .replace(/#/, '')
            .split(/&/)
            .map(el => el.split(/=/))
        )
        auth.CHANGE_TOKEN(hash || null).then(auth.fetchUser)
        const route = localStorage.getItem('LAST_ROUTE')
        if (route) {
          return { ...JSON.parse(route), hash: '' }
        }
        return { name: 'home', hash: '' }
      }
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
