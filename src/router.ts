import {
  AsyncComponentFactory,
  AsyncComponentPromise,
  EsModuleComponent,
} from 'vue/types/options'
import Router, { Route } from 'vue-router'
import Vue, { Component } from 'vue'
import {
  computed,
  createComponent,
  createElement as h,
} from '@vue/composition-api'
import {
  RouterTimelineQuery as RouterTimelineQueryResult,
  RouterTimelineQueryVariables,
} from './__generated__/RouterTimelineQuery'
import { DocumentNode } from 'graphql'

import TheDrawerLoadingViewer from '@/components/TheDrawerLoadingViewer.vue'
import { VList } from 'vuetify/lib'
import { VNode } from 'vue/types/umd'
import { apollo } from '@/apollo'
import { settingsActions } from './store/reducers/settings'
import { store } from './store'
import { useQuery, useResult } from '@vue/apollo-composable'
import {
  RouterTimelineQuery,
  RouterTimelineAppBarQuery,
  RouterTimelineDrawerQuery,
} from './Router.js'

const useQueryProps = (
  { query: fullQuery }: Route,
  filterQuery: (query: Route['query']) => Route['query'],
) => {
  const query = filterQuery(fullQuery)

  const queryWithBoolean = Object.fromEntries(
    Object.entries(query).map(([key, value]) => {
      switch (value) {
        case 'true':
          return [key, true]
        case 'false':
          return [key, false]
        default:
          return [key, value]
      }
    }),
  )

  return { query, queryWithBoolean }
}

export const asyncComponent = (
  component: Promise<any>,
  loading?: Component | EsModuleComponent,
): ReturnType<AsyncComponentFactory> => ({
  component: (component as unknown) as AsyncComponentPromise,
  delay: 0,
  loading,
})

const createDrawerLoading = (length: number) => ({
  setup: () => () =>
    h(
      VList,
      { props: { rounded: true } },
      Array.from({ length }, () => h(TheDrawerLoadingViewer)),
    ),
})

const Home = () =>
  import(
    /* webpackChunkName: "Home" */ /* webpackPrefetch: true */ './views/Home.vue'
  )

const Timeline = () =>
  import(
    /* webpackChunkName: "Timeline" */ /* webpackPrefetch: true */ './views/Timeline.vue'
  )

const TimelineAppBar = () =>
  import(
    /* webpackChunkName: "TimelineAppBar" */ /* webpackPrefetch: true */ './views/TimelineAppBar.vue'
  )
const SearchAppBar = () =>
  import(
    /* webpackChunkName: "SearchAppBar" */ /* webpackPrefetch: true */ './views/SearchAppBar.vue'
  )

const TimelineDrawer = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "TimelineDrawer" */ /* webpackPrefetch: true */ './views/TimelineDrawer.vue'
    ),
    createDrawerLoading(5),
  )
const SearchDrawer = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "SearchDrawer" */ /* webpackPrefetch: true */ './views/SearchDrawer.vue'
    ),
    createDrawerLoading(3),
  )

const Changes = () =>
  import(
    /* webpackChunkName: "Changes" */ /* webpackPrefetch: true */ './views/Changes.vue'
  )

const Search = () =>
  import(
    /* webpackChunkName: "Search" */ /* webpackPrefetch: true */ './views/Search.vue'
  )

export const fetchMedia = async (id: number) => {
  const result = await apollo.query<
    RouterTimelineQueryResult,
    RouterTimelineQueryVariables
  >({
    query: RouterTimelineQuery,
    variables: { id },
  })

  return result.data.Media
}

const createTimelineWrapper = <M>(
  query: DocumentNode,
  Component: ({ media }: { media: M }) => VNode,
  Loading: () => VNode | null = () => null,
) =>
  createComponent({
    props: { currentId: { default: null, required: true, type: Number } },
    setup(props) {
      const mediaQuery = useQuery(
        query,
        computed(() => ({ id: props.currentId })),
      )

      const media = useResult(mediaQuery.result)
      return () => {
        if (mediaQuery.loading.value) {
          return Loading()
        } else if (media.value) {
          return Component({ media: media.value })
        }
      }
    },
  })

const usePropsCurrentId = (route: Route) => {
  const currentId = parseInt(route.params.mediaId, 10)
  return { currentId }
}

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
      name: 'media',
      path: '/:mediaType/:mediaId',
      redirect: to => ({
        name: 'timeline',
        params: {
          ...to.params,
          title: 'title',
        },
      }),
    },
    {
      beforeEnter: (to, from, next) => {
        const currentId = parseInt(to.params.mediaId, 10)

        fetchMedia(currentId).then(media => {
          if (!media) {
            next(from)
            return
          }
          const mediaTitle = media.title
          const documentTitle = (mediaTitle && mediaTitle.userPreferred) || ''
          document.title = documentTitle + ' - Anitree'

          const title = documentTitle
            .trim()
            .replace(/[^\w\s]/g, '')
            .replace(/\s/g, '-')

          if (to.params.title === title) {
            next()
          } else {
            next({
              ...to,
              params: {
                ...to.params,
                title,
              },
            })
          }
        })
      },
      components: {
        appBar: createTimelineWrapper(RouterTimelineAppBarQuery, ({ media }) =>
          h(TimelineAppBar, { props: { media } }),
        ),
        default: Timeline,
        drawer: createTimelineWrapper(
          RouterTimelineDrawerQuery,
          ({ media }) => h(TimelineDrawer, { props: { media } }),
          () => h(createDrawerLoading(5)),
        ),
      },
      name: 'timeline',
      path: '/:mediaType/:mediaId/:title',
      props: {
        appBar: usePropsCurrentId,
        default: (route: Route) => ({
          ...useQueryProps(route, query => ({
            isAdult: query.isAdult,
            page: query.page,
            onList: query.onList,
            type: query.type,
            status: query.status,
            sort: query.sort,
            perPage: query.perPage,
          })),
          ...usePropsCurrentId(route),
        }),
        drawer: usePropsCurrentId,
      },
    },
    {
      component: Changes,
      name: 'changes',
      path: '/changes',
    },
    {
      components: {
        appBar: SearchAppBar,
        default: Search,
        drawer: SearchDrawer,
      },
      name: 'search',
      path: '/search',
      props: {
        default: (route: Route) => ({
          ...useQueryProps(route, query => ({
            isAdult: query.isAdult,
            search: query.search,
            page: query.page,
            includedTags: query.includedTags,
            onList: query.onList,
            year: query.year,
            type: query.type,
            status: query.status,
            season: query.season,
            sort: query.sort,
            perPage: query.perPage,
          })),
        }),
      },
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

        return { hash: '', name: 'home' }
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

router.afterEach(({ name }) => {
  if (name && name !== 'timeline') {
    const [[firstLetter, ...otherLetters]] = name.split('-')
    document.title =
      firstLetter.toUpperCase() + otherLetters.join('') + ' - Anitree'
  }
})

export default router

Vue.use(Router)
