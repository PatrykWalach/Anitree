<template>
  <v-chip-group :style="{ 'max-width': '100%' }" :active-class="activeClass">
    <v-chip
      v-for="{ title, id } in media"
      :key="id"
      exact
      :to="{
        name: 'search',
        query: {
          search: title,
        },
      }"
    >
      {{ title }}
    </v-chip>
  </v-chip-group>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Page } from '../graphql/schema/page'
import { useExtensionChip } from '@/mixins'

export interface Props {
  page: Page
}

export default createComponent<Readonly<Props>>({
  props: {
    page: { default: null, required: true, type: Object },
  },
  setup(props, { root }) {
    const { getTitle } = root.$modules.title

    const media = computed(() => {
      const _getTitle = getTitle.value

      return props.page.media
        .map(({ id, title }) => ({ id, title: _getTitle(title) }))
        .filter(
          ({ title }, i, arr) =>
            arr.findIndex(media => media.title === title) === i,
        )
    })

    return {
      ...useExtensionChip(),
      media,
    }
  },
})
</script>
