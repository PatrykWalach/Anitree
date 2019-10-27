<template>
  <BaseQuery
    :apollo="{
      Viewer,
    }"
    v-slot="{ Viewer }"
  >
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :disabled="!media"
        :to="
          (media && {
            name: 'media',
            params: {
              mediaId: media.id,
              mediaType: media.type.toLowerCase(),
            },
          }) ||
            undefined
        "
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>
      <v-tooltip
        top
        :key="title"
        v-for="{ bind, icon, title, on: action } in actions"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="{ ...bind, ...attrs }"
            icon
            v-on="{ ...action, ...on }"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ title }}</span>
      </v-tooltip>
    </v-card-actions>
  </BaseQuery>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import BaseQuery from './BaseQuery.vue'

import { Media } from '@/graphql/schema/media'
import { useMediaCardActions } from '@/mixins'
import { useViewer } from '@/graphql'

export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    BaseQuery,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
  setup(props, { root }) {
    const { actions: _actions } = useMediaCardActions(root)

    const actions = computed(() => _actions(props.media))

    return {
      actions,
      ...useViewer(root),
    }
  },
})
</script>
