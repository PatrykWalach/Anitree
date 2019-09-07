<template>
  <v-tabs v-model="tab" grow color="primary" :hide-slider="false">
    <v-tab href="#info" :disabled="!media">
      <v-icon left>info</v-icon> Summary
    </v-tab>

    <v-tab :disabled="!media" href="#description">
      <v-icon left>description</v-icon> Description
    </v-tab>

    <v-tab :disabled="!media" href="#stats">
      <v-icon left>bar_chart</v-icon> Stats
    </v-tab>

    <v-tab :disabled="!media" href="#tags">
      <v-icon left>class</v-icon> Tags
    </v-tab>

    <v-tab-item value="info">
      <MediaCardItem :media="media" />
    </v-tab-item>

    <template v-if="media">
      <v-tab-item value="description">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text v-html="media.description"></v-card-text>
      </v-tab-item>

      <v-tab-item value="stats">
        <MediaCardTabsStats :media="media" />
      </v-tab-item>

      <v-tab-item value="tags">
        <v-card-text>
          <v-chip
            v-for="{ id, rank, name } in media.tags
              .slice()
              .sort(({ rank: a }, { rank: b }) => b - a)"
            :key="`tag-${id}`"
            link
            label
            :style="{ margin: '4px 8px 4px 0' }"
            :to="{ name: 'search', query: { includedTags: name } }"
          >
            <v-avatar left> {{ rank }} </v-avatar>
            {{ name.toLowerCase() }}
          </v-chip>
          <v-chip
            v-for="{ id, name } in media.studios.nodes"
            :key="`studio-${id}`"
            outlined
            label
            :style="{ margin: '4px 8px 4px 0' }"
            >{{ name }}
          </v-chip>
        </v-card-text>
      </v-tab-item>
    </template>
  </v-tabs>
</template>
<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'

import MediaCardItem from './MediaCardItem.vue'
import MediaCardTabsStats from './MediaCardTabsStats.vue'

import { Media } from '@/graphql/schema/media'

import useTitle from '@/store/title'

export default createComponent<Readonly<Props>>({
  setup(props) {
    const { title: _title } = useTitle()

    const title = computed(() => _title.value(props.media && props.media.title))

    const tab = ref('info')

    return { tab, title }
  },
  components: {
    MediaCardItem,
    MediaCardTabsStats
  },
  props: {
    media: {
      required: true,
      type: null,
      default: null
    }
  }
})

export interface Props {
  media: Media | null
}
</script>
