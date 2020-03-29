<script lang="ts">
import {
  HomeQuery as HomeQueryResult,
  HomeQueryVariables,
  HomeQuery_Page_media,
} from './__generated__/HomeQuery'
import {
  VCol,
  VContainer,
  VIcon,
  VRow,
  VTimeline,
  VCard,
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

interface DesktopProps extends TrendingMediaProps {
  smAndDown: boolean
  content: (props: Readonly<TrendingMediaProps>) => (VNode | null)[][]
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

    const randomMedia = computed(() => media.value[random])

    const static1 = [
      h('p', [
        "The site doesn't store any information about the user. All features are subjects to change.",
      ]),
      'If you encounter any problems you may have to clean your cache:',
      h('br'),
      h('code', ['F12']),
    ]
    const static2 = h('code', ['Application'])
    const static3 = h('code', ['Clear site data'])

    const content = (props: TrendingMediaProps) => [
      [
        h(
          HomeItem,
          {
            scopedSlots: {
              title: () => 'This app is under construction',
            },
          },
          [
            ...static1,
            h('p', [
              h(VIcon, ['arrow_right_alt']),
              static2,
              h(VIcon, ['arrow_right_alt']),
              h('code', [
                h(
                  VIcon,
                  {
                    props: { small: true, color: '#BD4147' },
                  },
                  ['delete'],
                ),
                'Clear storage',
              ]),
              h(VIcon, ['arrow_right_alt']),
              static3,
            ]),
          ],
        ),
      ],
      [
        h(
          HomeItem,

          {
            scopedSlots: {
              title: () => 'Media Cards',
            },
          },
          [
            'Media cards display various informations about the media.',
            h('br'),
            'Their layout and amount of information may change in future.',
          ],
        ),
        TrendingMedia(props),
      ],
    ]

    return () =>
      h(TheBackdrop, {
        scopedSlots: {
          backdrop: () => h(HomeBackdrop),
          appBar: ({ active }) =>
            h(VSlideXReverseTransition, [!active ? h(HomeAppBar) : null]),
          default: () =>
            h(
              VCard,
              {
                style: {
                  flex: 1,
                  borderRadius: '4px 4px 0 0',
                },
              },
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
