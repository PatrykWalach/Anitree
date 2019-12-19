<template>
  <div>
    <MediaCardLoadingBanner v-if="loading" />
    <MediaCardBanner v-else-if="bannerImage" :media="Media" />
    <v-sheet
      class="elevation-2"
      :style="
        $vuetify.breakpoint.xsOnly
          ? undefined
          : {
              position: 'sticky',
              'z-index': 4,
              top: ($vuetify.breakpoint.smAndDown ? 56 : 64) - 112 + 'px',
            }
      "
    >
      <v-container pa-0>
        <v-row no-gutters>
          <v-col cols="12">
            <v-list-item two-line selectable>
              <template v-if="!Media">
                <MediaCardLoadingItemAvatar />
                <v-list-item-content>
                  <MediaCardLoadingItemOverline />
                  <MediaCardLoadingItemTitle />
                  <MediaCardLoadingItemSubtitle />
                </v-list-item-content>
              </template>
              <template v-else>
                <MediaCardItemAvatar :media="Media" />
                <v-list-item-content>
                  <MediaCardItemOverline :media="Media" />
                  <MediaCardItemTitle :media="Media" />
                  <MediaCardItemSubtitle :media="Media" />
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
      <TheAppBarExtensionTabs v-if="!$vuetify.breakpoint.xsOnly" />
    </v-sheet>

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { useMedia, useViewer } from '@/graphql'
import { useQueryLoading, useResult } from '@vue/apollo-composable'
import MediaCardLoadingBanner from '@/components/MediaCardLoadingBanner.vue'
import MediaCardLoadingItemAvatar from '@/components/MediaCardLoadingItemAvatar.vue'
import MediaCardLoadingItemOverline from '@/components/MediaCardLoadingItemOverline.vue'
import MediaCardLoadingItemSubtitle from '@/components/MediaCardLoadingItemSubtitle.vue'
import MediaCardLoadingItemTitle from '@/components/MediaCardLoadingItemTitle.vue'
import TheAppBarExtensionTabs from '@/components/TheAppBarExtensionTabs.vue'
import { asyncComponent } from '@/views/Search.vue'
import { useEdit } from '@/store'

import { useRouteParams } from '../App.vue'
import { useShare } from '@/components/MediaCardActions.vue'
// import { useRoutes } from '../components/TheAppBar.vue'
const MediaCardBanner = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardBanner" */ '@/components/MediaCardBanner.vue'
    ),
    MediaCardLoadingBanner,
  )
const MediaCardItemAvatar = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardItemAvatar" */ '@/components/MediaCardItemAvatar.vue'
    ),
    MediaCardLoadingItemAvatar,
  )
const MediaCardItemOverline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardItemOverline" */ '@/components/MediaCardItemOverline.vue'
    ),
    MediaCardLoadingItemOverline,
  )
const MediaCardItemSubtitle = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardItemSubtitle" */ '@/components/MediaCardItemSubtitle.vue'
    ),
    MediaCardLoadingItemSubtitle,
  )
const MediaCardItemTitle = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardItemTitle" */ '@/components/MediaCardItemTitle.vue'
    ),
    MediaCardLoadingItemTitle,
  )

export default createComponent({
  components: {
    MediaCardBanner,
    MediaCardItemAvatar,
    MediaCardItemOverline,
    MediaCardItemSubtitle,
    MediaCardItemTitle,
    MediaCardLoadingBanner,
    MediaCardLoadingItemAvatar,
    MediaCardLoadingItemOverline,
    MediaCardLoadingItemSubtitle,
    MediaCardLoadingItemTitle,
    TheAppBarExtensionTabs,
  },
  setup(_, { root }) {
    const { currentId } = useRouteParams(root)

    const { open } = useEdit()
    const loading = useQueryLoading()
    // const { routeTitle } = useRoutes(root)
    const { Media, result } = useMedia(
      computed(() => ({ id: currentId.value })),
      {
        // enabled: routeTitle.value,
        fetchPolicy: 'cache-and-network',
      },
    )

    const bannerImage = useResult(result, null, data => data.Media.bannerImage)

    return {
      ...useShare(),
      ...useViewer(),
      Media,
      bannerImage,
      loading,
      open,
    }
  },
})
</script>
