<template>
  <v-tabs v-model="tab" grow color="primary" hide-slider>
    <v-tab href="#info" :disabled="!media">
      <v-icon left>info</v-icon> Info
    </v-tab>

    <!-- v-if="!media || media.description" -->
    <v-tab :disabled="!media" href="#description">
      <v-icon left>description</v-icon> Description
    </v-tab>
    <!-- v-if="
        !media ||
          (media.stats.scoreDistribution &&
            media.stats.scoreDistribution.length)
      " -->
    <v-tab :disabled="!media" href="#stats">
      <v-icon left>bar_chart</v-icon> Stats
    </v-tab>

    <!-- v-if="!media || media.tags.length" -->
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
          <base-color
            v-for="{ id, rank, name } in media.tags
              .slice()
              .sort(({ rank: a }, { rank: b }) => b - a)"
            :key="`tag-${id}`"
            link
            label
            :style="{ margin: '4px 8px 4px 0' }"
            :color="media.coverImage.color || ''"
            tag="v-chip"
            :to="{ name: 'search', query: { includedTags: name } }"
          >
            <v-avatar left> {{ rank }} </v-avatar>
            {{ name.toLowerCase() }}
          </base-color>
        </v-card-text>
      </v-tab-item>
    </template>
  </v-tabs>
  <!-- <MediaCardItem v-else :media="media" /> -->
</template>
<script lang="ts">
import { createComponent, value as binding, computed } from 'vue-function-api'

import MediaCardItem from './MediaCardItem.vue'
import MediaCardTabsStats from './MediaCardTabsStats.vue'
import MediaCardTabsMenu from './MediaCardTabsMenu.vue'
import BaseColor from './BaseColor.vue'

import { Media } from '@/apollo/schema/media'

import useTitle from '@/store/title'

export default createComponent({
  setup(props) {
    const { title: _title } = useTitle()

    const title = computed(() => _title.value(props.media && props.media.title))

    const tab = binding('info')

    return { tab, title }
  },
  components: {
    MediaCardItem,
    MediaCardTabsStats,
    BaseColor,
    MediaCardTabsMenu
  },
  props: ({
    media: {
      required: true
    }
  } as unknown) as Readonly<Props>
})
interface Props {
  media: Media | null
}
</script>
