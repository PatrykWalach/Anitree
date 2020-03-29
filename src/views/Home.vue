<script lang="ts">
import {
  HomeQuery as HomeQueryResult,
  HomeQueryVariables,
  HomeQuery_Page_media,
} from './__generated__/HomeQuery'
import {
  VCol,
  VContainer,
  VRow,
  VTimeline,
  VSlideXReverseTransition,
  VTimelineItem,
} from 'vuetify/lib'
import {
  computed,
  defineComponent,
  createElement as h,
} from '@vue/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import HomeItem from '@/components/HomeItem.vue'
import TheBackdrop from '@/components/TheBackdrop.vue'
import MediaCardLoading from '@/components/MediaCardLoading.vue'

import { asyncComponent } from '../router'

import { VNode } from 'vue'
import gql from 'graphql-tag'
import { MediaCardFragments } from '../components/MediaCard.vue'

export const HomeQuery = gql`
  query HomeQuery($perPage: Int = 50) {
    Page(perPage: $perPage) {
      media(sort: TRENDING_DESC) {
        id
        ...MediaCard_media
      }
    }
  }
  ${MediaCardFragments.media}
`

const MediaCard = () =>
  asyncComponent(
    import(/* 'ebpackChunkName: "MediaCard"' */ '@/components/MediaCard.vue'),
    MediaCardLoading,
  )

const HomeBackdrop = () =>
  import(/* 'ebpackChunkName: "HomeBackdrop"' */ './HomeBackdrop.vue')
const HomeAppBar = () =>
  import(/* 'ebpackChunkName: "HomeAppBar"' */ './HomeAppBar.vue')

const PER_PAGE = 50

interface TrendingMediaProps {
  media: HomeQuery_Page_media | null
  loading: boolean
}

interface ContentProps {
  media: readonly (HomeQuery_Page_media | null)[]
  loading: boolean
}

interface DesktopProps extends ContentProps {
  smAndDown: boolean
  content: (props: Readonly<ContentProps>) => (VNode | null)[][]
}

interface TimelineProps extends DesktopProps {
  xsOnly: boolean
}

const Mobile = ({ content, ...props }: Readonly<DesktopProps>) =>
  content(props)
    .flat()
    .map((el) =>
      h(
        VCol,
        {
          props: {
            cols: '12',
          },
        },
        [el],
      ),
    )

const Desktop = ({ content, smAndDown, ...props }: Readonly<DesktopProps>) =>
  h(VCol, [
    h(
      VTimeline,
      { props: { dense: smAndDown } },

      [
        content(props).map((el, i) =>
          el
            .map((el, j) =>
              h(
                VTimelineItem,
                {
                  props: {
                    large: !smAndDown && j === 0,
                    left: !!(i % 2),
                    right: !!((i + 1) % 2),
                    small: smAndDown && j !== 0,
                  },
                },
                [el],
              ),
            )
            .flat(),
        ),
      ],
    ),
  ])

const Timeline = ({ xsOnly, ...props }: Readonly<TimelineProps>) =>
  xsOnly ? Mobile(props) : Desktop(props)

const TrendingMedia = ({ media, loading }: TrendingMediaProps) => {
  if (loading) {
    return h(MediaCardLoading)
  }
  if (media) {
    return h(MediaCard, {
      props: {
        media,
      },
    })
  }
  return null
}

export default defineComponent({
  setup: (_, { root }) => {
    const random = Math.floor(Math.random() * (PER_PAGE - 1))

    const { result, loading } = useQuery<HomeQueryResult, HomeQueryVariables>(
      HomeQuery,
      {
        perPage: PER_PAGE,
      },
      {
        fetchPolicy: 'cache-and-network',
      },
    )

    const media = useResult(result, [], (data) => data?.Page?.media || [])

    const randomMedia = computed(() => media.value.slice().splice(random, 2))

    const static1 = [
      h('p', ["The site doesn't store any information about the user."]),
      h('p', ["I'll try to rewrite everything once Vue 3.0 releases"]),
    ]

    const content = (props: Readonly<ContentProps>) => [
      [
        h(
          HomeItem,
          {
            scopedSlots: {
              title: () => 'This app will be redesigned',
            },
          },
          static1,
        ),
      ],
      props.media?.map((media) => TrendingMedia({ ...props, media })),
    ]

    return () =>
      h(TheBackdrop, {
        style: {
          flex: 1,
          borderRadius: '4px 4px 0 0',
        },
        scopedSlots: {
          backdrop: () => h(HomeBackdrop),
          appBar: ({ active }) =>
            h(VSlideXReverseTransition, [!active ? h(HomeAppBar) : null]),
          default: () =>
            h(
              'div',

              [
                h(VContainer, [
                  h(VRow, [
                    Timeline({
                      content,
                      loading: loading.value,
                      media: randomMedia.value,
                      smAndDown: root.$vuetify.breakpoint.smAndDown,
                      xsOnly: root.$vuetify.breakpoint.xsOnly,
                    }),
                  ]),
                ]),
              ],
            ),
        },
      })
  },
})
</script>
