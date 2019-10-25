<template>
  <v-tabs-items v-model="tab">
    <v-tab-item v-for="i in 4" :key="i" :value="'edit' + i">
      <v-card-text>
        <MediaEditItemsTab
          :method="'edit' + i"
          v-bind="{
            user,
            media,
            form,
            scoreFormat,
            advancedScoring,
            manga,
          }"
        />
      </v-card-text>
    </v-tab-item>
  </v-tabs-items>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

import { Media } from '@/graphql/schema/media'
import MediaEditItemsTab from './MediaEditItemsTab.vue'
import { User } from '@/graphql/schema/viewer'

import { mediaListToForm } from '@/modules/commands'

export interface Props {
  media: Media
  user: User
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaEditItemsTab,
  },
  props: {
    media: { default: null, required: true, type: Object },
    user: { default: null, required: true, type: Object },
  },
  setup(props, { root }) {
    const { tab: _tab, form: _form, CHANGE_TAB } = root.$modules.edit

    const tab = computed({ get: () => _tab.value, set: CHANGE_TAB })
    const manga = computed(() => props.media.type === 'MANGA')

    const advancedScoring = computed(
      () =>
        props.user.mediaListOptions[manga.value ? 'mangaList' : 'animeList']
          .advancedScoring,
    )

    const scoreFormat = computed(() => {
      const [, max, round] = props.user.mediaListOptions.scoreFormat.split('_')

      return {
        max: parseInt(max),
        round: round === 'DECIMAL' ? 1 : 0,
      }
    })

    const stored = computed(() =>
      mediaListToForm(props.media.mediaListEntry, advancedScoring.value),
    )

    const form = computed(() => ({
      ...stored.value,
      ..._form.value,
    }))

    return { advancedScoring, form, manga, scoreFormat, tab }
  },
})
</script>
