<template>
  <v-tooltip v-if="action" :[position]="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-on="{ ...on, ...action.on }"
        v-bind="{ ...attrs, ...action.bind }"
      >
        <v-icon>{{ action.icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ action.title }}</span>
  </v-tooltip>
  <component
    :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-menu'"
    :offset-y="!$vuetify.breakpoint.xsOnly || undefined"
    v-else-if="actions.length"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs"><v-icon>more_vert</v-icon></v-btn>
    </template>
    <v-card>
      <template v-if="$vuetify.breakpoint.xsOnly">
        <v-list-item two-line selectable>
          <MediaCardItemAvatar size="56" :media="media" />
          <v-list-item-content>
            <MediaCardItemOverline :media="media" />
            <MediaCardItemTitle :media="media" />
            <MediaCardItemSubtitle :media="media" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>

      <v-list :shaped="!$vuetify.breakpoint.xsOnly">
        <v-list-item
          v-for="{ title, on, bind, icon } in actions"
          v-bind="bind"
          v-on="on"
          :key="title"
        >
          <v-list-item-icon>
            <v-icon>
              {{ icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </component>
</template>
<script lang="ts">
import { VBottomSheet, VMenu } from 'vuetify/lib'
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '../graphql/schema/media'
import MediaCardLoadingItemAvatar from './MediaCardLoadingItemAvatar.vue'
import MediaCardLoadingItemOverline from './MediaCardLoadingItemOverline.vue'
import MediaCardLoadingItemSubtitle from './MediaCardLoadingItemSubtitle.vue'
import MediaCardLoadingItemTitle from './MediaCardLoadingItemTitle.vue'
import { NavigationElement } from '../types'
import { asyncComponent } from '@/views/Search.vue'

const MediaCardItemAvatar = () =>
  asyncComponent(
    import(/* webpackChunkName: "BaseLazyImg" */ './MediaCardItemAvatar.vue'),
    MediaCardLoadingItemAvatar,
  )
const MediaCardItemOverline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardItemOverline" */ './MediaCardItemOverline.vue'
    ),
    MediaCardLoadingItemOverline,
  )
const MediaCardItemSubtitle = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardItemSubtitle" */ './MediaCardItemSubtitle.vue'
    ),
    MediaCardLoadingItemSubtitle,
  )
const MediaCardItemTitle = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardItemTitle" */ './MediaCardItemTitle.vue'
    ),
    MediaCardLoadingItemTitle,
  )

export interface Props {
  actions: NavigationElement[]
  media: Media | null
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemAvatar,
    MediaCardItemOverline,
    MediaCardItemSubtitle,
    MediaCardItemTitle,
    VBottomSheet,
    VMenu,
  },
  props: {
    actions: { default: null, required: true, type: Array },
    media: { default: null, required: true, type: null },
  },
  setup(props, { root }) {
    const action = computed(() => {
      const actions = props.actions

      return actions.length === 1 ? actions[0] : null
    })

    const position = computed(() =>
      root.$vuetify.breakpoint.xsOnly ? 'top' : 'bottom',
    )

    return {
      action,
      position,
    }
  },
})
</script>
