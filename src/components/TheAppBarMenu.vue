<template>
  <v-menu bottom left v-if="list.length">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs"><v-icon>more_vert</v-icon></v-btn>
    </template>
    <v-list shaped>
      <v-list-item
        v-for="{ title, on, bind, icon } in list"
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
  </v-menu>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { useAnilist, useEdit } from './MediaCardActions.vue'
import { Media } from '@/graphql/schema/media'
import { useBottomNavigation } from '@/App.vue'

export interface Props {
  media: Media | null
  routeTitle: boolean
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: null },
    routeTitle: { default: false, required: true, type: Boolean },
  },
  setup(props, { root }) {
    const { bottomNavigation } = useBottomNavigation(root)

    const {
      state: { main },
    } = root.$modules.navigation

    const { editBtn: _editBtn } = useEdit(root)

    const { anilistBtn: _anilistBtn } = useAnilist()

    const anilistBtn = computed(() => _anilistBtn(props.media))

    const editBtn = computed(() => _editBtn(props.media))

    const list = computed(() =>
      (root.$route.name === 'title-timeline' ? [editBtn.value] : []).concat(
        props.routeTitle ? [anilistBtn.value] : [],
        root.$vuetify.breakpoint.xsOnly && !bottomNavigation.value
          ? main.value
          : [],
      ),
    )

    return {
      bottomNavigation,
      list,
      main,
    }
  },
})
</script>
