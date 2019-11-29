<template>
  <BaseQuery
    :apollo="{
      Viewer,
      Media: { ...Media, 'fetch-policy': 'cache-and-network' },
    }"
    v-slot="{ Viewer, Media }"
  >
    <MediaCardBanner :media="Media" />

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
              <MediaCardItemAvatar :media="Media" />
              <v-list-item-content>
                <MediaCardItemOverline :media="Media" />
                <MediaCardItemTitle :media="Media" />
                <MediaCardItemSubtitle :media="Media" />
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
      <TheAppBarExtensionTabs v-if="!$vuetify.breakpoint.xsOnly" />
    </v-sheet>

    <keep-alive>
      <router-view />
    </keep-alive>
  </BaseQuery>
</template>
<script lang="ts">
import { VBottomSheet, VMenu } from 'vuetify/lib'
import { computed, createComponent } from '@vue/composition-api'
import { useMedia, useViewer } from '@/graphql'
import BaseQuery from '@/components/BaseQuery.vue'

import MediaCardBanner from '@/components/MediaCardBanner.vue'
import MediaCardItemAvatar from '@/components/MediaCardItemAvatar.vue'
import MediaCardItemOverline from '@/components/MediaCardItemOverline.vue'
import MediaCardItemSubtitle from '@/components/MediaCardItemSubtitle.vue'
import MediaCardItemTitle from '@/components/MediaCardItemTitle.vue'
import TheAppBarExtensionTabs from '@/components/TheAppBarExtensionTabs.vue'

import { useEdit } from '@/store'
import { useShare } from '@/components/MediaCardActions.vue'

export default createComponent({
  components: {
    BaseQuery,
    MediaCardBanner,
    MediaCardItemAvatar,
    MediaCardItemOverline,
    MediaCardItemSubtitle,
    MediaCardItemTitle,
    TheAppBarExtensionTabs,
    VBottomSheet,
    VMenu,
  },
  setup(_, { root }) {
    const id = computed(() => parseInt(root.$route.params.mediaId, 10))

    const { open } = useEdit()

    return {
      open,
      ...useShare(),
      ...useMedia(() => ({ id: id.value })),
      ...useViewer(),
    }
  },
})
</script>
