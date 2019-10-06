<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading, query }"
    :query="require('@/graphql/queries/Media.gql')"
    :variables="variables"
    :skip="!mediaId"
  >
    <MediaCardBanner :media="data && data.Media" />

    <v-card flat>
      <v-container pa-0>
        <v-row no-gutters>
          <v-col cols="12">
            <v-list-item two-line>
              <MediaCardItemAvatar :media="data && data.Media" />
              <v-list-item-content>
                <MediaCardItemOverline :media="data && data.Media" />
                <MediaCardItemTitle :media="data && data.Media" />
                <MediaCardItemSubtitle :media="data && data.Media" />
              </v-list-item-content>
              <v-list-item-action>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      icon
                      :disabled="!data"
                      rel="noopener"
                      target="_blank"
                      :href="data && data.Media.siteUrl"
                      v-on="on"
                    >
                      <v-icon>open_in_new</v-icon>
                    </v-btn>
                  </template>
                  <span>Anilist</span>
                </v-tooltip>
              </v-list-item-action>
              <v-list-item-action>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      icon
                      :disabled="!data"
                      v-on="on"
                      @click.stop="share"
                    >
                      <v-icon>share</v-icon>
                    </v-btn>
                  </template>
                  <span>Share</span>
                </v-tooltip>
              </v-list-item-action>
              <!-- <v-list-item-action>
                <v-tooltip v-if="Viewer" top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      icon
                      :disabled="!data"
                      v-on="on"
                      @click.stop="edit"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
              </v-list-item-action> -->
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <TheAppBarExtensionTabs
      v-if="!$vuetify.breakpoint.xsOnly"
      :style="{
        position: 'sticky',
        'z-index': 5,
        top: ($vuetify.breakpoint.smAndDown ? '56' : '64') + 'px',
      }"
    />

    <keep-alive>
      <router-view />
    </keep-alive>
  </ApolloQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import MediaCardBanner from '@/components/MediaCardBanner.vue'

import MediaCardItemAvatar from '@/components/MediaCardItemAvatar.vue'
import MediaCardItemOverline from '@/components/MediaCardItemOverline.vue'
import MediaCardItemSubtitle from '@/components/MediaCardItemSubtitle.vue'
import MediaCardItemTitle from '@/components/MediaCardItemTitle.vue'
import TheAppBarExtensionTabs from '@/components/TheAppBarExtensionTabs.vue'

import { title } from '@/store/title'

export default createComponent({
  components: {
    MediaCardBanner,
    MediaCardItemAvatar,
    MediaCardItemOverline,
    MediaCardItemSubtitle,
    MediaCardItemTitle,
    TheAppBarExtensionTabs,
  },
  setup(_, { root }) {
    const mediaId = computed(() => parseInt(root.$route.params.mediaId, 10))
    const variables = computed(() => ({ id: mediaId.value }))

    const {
      getters: { getTitle },
    } = title

    return {
      getTitle,
      mediaId,
      variables,
    }
  },
})
</script>
