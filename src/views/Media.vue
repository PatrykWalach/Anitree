<template>
  <BaseQuery
    :apollo="{
      Viewer,
      Media: { ...Media, 'fetch-policy': 'cache-and-network' },
    }"
    v-slot="{ Viewer, Media, loading }"
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
              <!-- <v-list-item-action>
                <component
                  :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-menu'"
                  :offset-y="$vuetify.breakpoint.xsOnly ? undefined : true"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>
                        more_vert
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <template v-if="$vuetify.breakpoint.xsOnly">
                      <v-list-item>
                        <MediaCardItemAvatar size="40" :media="Media" />
                        <v-list-item-content>
                          <MediaCardItemOverline :media="Media" />
                          <MediaCardItemTitle :media="Media" />
                          <MediaCardItemSubtitle :media="Media" />
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                    </template>
                    <v-list :shaped="!$vuetify.breakpoint.xsOnly">
                      <v-list-item
                        :disabled="!Media"
                        rel="noopener"
                        target="_blank"
                        :href="Media && Media.siteUrl"
                      >
                        <v-list-item-icon>
                          <v-icon>open_in_new</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            Anilist
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        :disabled="!Media"
                        @click.stop="share(Media)"
                      >
                        <v-list-item-icon>
                          <v-icon>share</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>
                            Share
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        :disabled="!Media"
                        @click.stop="open(Media && Media.id)"
                      >
                        <v-list-item-icon>
                          <v-icon>edit</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            Edit
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list></v-card
                  >
                </component>
              </v-list-item-action> -->
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

    const {
      actions: { open },
    } = root.$modules.edit

    return {
      open,
      ...useShare(root),
      ...useMedia(() => ({ id: id.value })),
      ...useViewer(root),
    }
  },
})
</script>
