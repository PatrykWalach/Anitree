<template>
  <v-tabs v-model="tab" grow>
    <v-tab href="#edit1">
      <v-icon left>dashboard</v-icon>
      Progress
    </v-tab>

    <v-tab href="#edit2">
      <v-icon left>date_range</v-icon>
      Dates
    </v-tab>

    <v-tab href="#edit3">
      <v-icon left>insert_comment</v-icon>
      Notes
    </v-tab>

    <v-tab href="#edit4">
      <v-icon left>edit</v-icon>
      Advanced Scores
    </v-tab>

    <v-tab-item v-for="i in 4" :key="i" :value="'edit' + i">
      <v-card-text>
        <MediaEditTabsTab
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
  </v-tabs>
</template>
<script lang="ts">
import MediaEditTabsTab from './MediaEditTabsTab.vue'
import { Media } from '@/graphql/schema/media'
import { User, MediaListTypeOptions } from '@/graphql/schema/viewer'
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
    MediaEditTabsTab
  },
  setup(props) {
    const { tab } = useEdit()

    const manga = computed(() => {
      return props.media.type === 'MANGA'
    })

    const mediaListOptions = computed(
      (): MediaListTypeOptions => {
        return manga.value
          ? props.user.mediaListOptions.mangaList
          : props.user.mediaListOptions.animeList
      }
    )

    const advancedScoring = computed(
      () => mediaListOptions.value.advancedScoring || []
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
