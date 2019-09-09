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
            manga
          }"
        />
      </v-card-text>
    </v-tab-item>
  </v-tabs-items>
</template>
<script lang="ts">
import MediaEditItemsTab from './MediaEditItemsTab.vue'

import { Media } from '@/graphql/schema/media'
import { User } from '@/graphql/schema/viewer'
import { createComponent, computed } from '@vue/composition-api'
import useEdit from '../store/edit'

export interface Props {
  media: Media
  user: User
}

import { mediaListToForm } from '@/store/mutations'

export default createComponent<Readonly<Props>>({
  props: {
    media: { required: true, type: Object, default: null },
    user: { required: true, type: Object, default: null }
  },
  components: {
    MediaEditItemsTab
  },
  setup(props) {
    const { tab } = useEdit()

    const manga = computed(() => {
      return props.media.type === 'MANGA'
    })

    const advancedScoring = computed(
      () =>
        props.user.mediaListOptions[manga.value ? 'mangaList' : 'animeList']
          .advancedScoring
    )

    const scoreFormat = computed(() => {
      const split = props.user.mediaListOptions.scoreFormat.split('_')

      return {
        round: split[2] === 'DECIMAL' ? 1 : 0,
        max: parseInt(split[1])
      }
    })

    const stored = computed(() =>
      mediaListToForm(props.media.mediaListEntry, advancedScoring.value)
    )

    const { form: _form } = useEdit()

    const form = computed(() => {
      return {
        ...stored.value,
        ..._form.value
      }
    })

    return { tab, form, scoreFormat, advancedScoring, manga }
  }
})
</script>