<template>
  <v-chip-group :style="{ 'max-width': '100%' }" active-class="primary--text">
    <v-chip
      outlined
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
import { title } from '@/store/title'

export interface Props {
  page: Page
}

export default createComponent<Readonly<Props>>({
  props: {
    page: { default: null, required: true, type: Object },
  },
  setup(props) {
    const {
      getters: { getTitle },
    } = title

    const media = computed(() =>
      props.page.media
        .map(({ id, title }) => ({ id, title: getTitle.value(title) }))
        .filter(
          ({ title }, i, arr) =>
            arr.findIndex(media => media.title === title) === i,
        ),
    )

    return {
      media,
    }
  },
})
</script>
