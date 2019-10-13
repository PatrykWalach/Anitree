<template>
  <BaseQuery
    :apollo="{
      Media,
    }"
    v-slot="{ Media, loading }"
  >
    <MediaCardBanner :media="Media" />

    <v-sheet color="secondary">
      <v-container pa-0>
        <v-row no-gutters>
          <v-col cols="12">
            <v-list-item two-line>
              <MediaCardItemAvatar :media="Media" />
              <v-list-item-content>
                <MediaCardItemOverline :media="Media" />
                <MediaCardItemTitle :media="Media" />
                <MediaCardItemSubtitle :media="Media" />
              </v-list-item-content>
              <v-list-item-action>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      icon
                      :disabled="!Media"
                      rel="noopener"
                      target="_blank"
                      :href="Media && Media.siteUrl"
                      v-on="on"
                    >
                      <v-icon>open_in_new</v-icon>
                    </v-btn>
                  </template>
                  <span>Anilist</span>
                </v-tooltip>
              </v-list-item-action>
              <v-list-item-action>
                <MediaCardActionsShare :media="Media" />
              </v-list-item-action>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

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
  </BaseQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import BaseQuery from '@/components/BaseQuery.vue'
import MediaCardActionsShare from '@/components/MediaCardActionsShare.vue'
import MediaCardBanner from '@/components/MediaCardBanner.vue'
import MediaCardItemAvatar from '@/components/MediaCardItemAvatar.vue'
import MediaCardItemOverline from '@/components/MediaCardItemOverline.vue'
import MediaCardItemSubtitle from '@/components/MediaCardItemSubtitle.vue'
import MediaCardItemTitle from '@/components/MediaCardItemTitle.vue'
import TheAppBarExtensionTabs from '@/components/TheAppBarExtensionTabs.vue'
import { useMedia } from '@/graphql'

// import { ApolloQueryProps } from '@/graphql/schema'

// export const useMedia = (props: () => Variables) => {
//   const variables = computed(props)

//   const Media: Ref<ApolloQueryProps<{ Media: MediaT }, Variables>> = computed(
//     () => ({
//       query: MEDIA,
//       skip: !variables.value.id || variables.value.id === 0,
//       variables: variables.value,
//     }),
//   )

//   return {
//     Media,
//     variables,
//   }
// }

export default createComponent({
  components: {
    BaseQuery,
    MediaCardActionsShare,
    MediaCardBanner,
    MediaCardItemAvatar,
    MediaCardItemOverline,
    MediaCardItemSubtitle,
    MediaCardItemTitle,
    TheAppBarExtensionTabs,
  },
  setup(_, { root }) {
    const id = computed(() => parseInt(root.$route.params.mediaId, 10))

    const {
      getters: { getTitle },
    } = root.$modules.title

    return {
      getTitle,
      id,
      ...useMedia(() => ({ id: id.value })),
    }
  },
})
</script>
