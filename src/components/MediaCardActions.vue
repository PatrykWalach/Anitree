<template>
  <!-- <ApolloQuery
    v-slot="{ result: { data } }"
    :tag="null"
    :query="require('@/graphql/queries/Viewer.gql')"
    :skip="!token"
  > -->
  <BaseQuery
    :apollo="{
      Viewer,
    }"
    v-slot="{ Viewer }"
  >
    <v-card-actions>
      <v-btn
        color="primary"
        outlined
        text
        v-if="$route.params.mediaId !== (media && media.id)"
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

      <v-tooltip top>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            icon
            :disabled="!media"
            rel="noopener"
            target="_blank"
            :href="media && media.siteUrl"
            v-on="on"
          >
            <v-icon>open_in_new</v-icon>
          </v-btn>
        </template>
        <span>Anilist</span>
      </v-tooltip>

      <MediaCardActionsShare :media="media" />

      <v-tooltip v-if="Viewer" top>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            icon
            :disabled="!media"
            v-on="on"
            @click.stop="edit"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </template>
        <span>Edit</span>
      </v-tooltip>
    </v-card-actions>
  </BaseQuery>
  <!-- </ApolloQuery> -->
</template>

<script lang="ts">
import BaseQuery from './BaseQuery.vue'
import { Media } from '@/graphql/schema/media'
import MediaCardActionsShare from './MediaCardActionsShare.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media | null
}
import { useViewer } from '@/graphql'

export default createComponent<Readonly<Props>>({
  components: {
    BaseQuery,
    MediaCardActionsShare,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
  setup(props, { root }) {
    const {
      actions: { open },
    } = root.$modules.edit

    const edit = () => {
      const { media } = props
      if (media) {
        open(media.id)
      }
    }

    return {
      edit,
      ...useViewer(root),
    }
  },
})
</script>
