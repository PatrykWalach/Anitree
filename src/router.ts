import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home.vue')
const Media = () => import('./views/Media.vue')
const Roadmap = () => import('./views/Roadmap.vue')
const Search = () => import('./views/Search.vue')

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
    }
  ]
})

router.afterEach(to => {
  const { name } = to
  if (name && name !== 'title') {
    document.title = 'Anitree - ' + name[0].toUpperCase() + name.substr(1)
  }
})

export default router

Vue.use(Router)
