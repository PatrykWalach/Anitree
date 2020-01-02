<template>
  <v-tabs-items v-model="syncedTab" class="transparent" :dark="theme.isDark">
    <v-tab-item v-for="i in 4" :key="i" :value="'edit' + i">
      <v-card-text>
        <MediaEditItemsTab
          :method="'edit' + i"
          v-bind="{
            media,
            form: mergedForm,
            scoreFormat,
            advancedScoring,
            manga,
            changeForm,
          }"
        />
      </v-card-text>
    </v-tab-item>
  </v-tabs-items>
</template>
<script lang="ts">
import MediaEditItemsTab from './MediaEditItemsTab.vue'
import { computed, createComponent } from '@vue/composition-api'
import { Form, RecursiveMutable } from '../types'
import { MediaEditItems_viewer } from './__generated__/MediaEditItems_viewer'
import { useInjectedTheme } from '@/hooks/theme'
import { MediaEditItems_media } from './__generated__/MediaEditItems_media'
import { useResult } from '@vue/apollo-composable'

export interface Props {
  user: MediaEditItems_viewer
  media: MediaEditItems_media
  tab: string
  form: Partial<Form>
  changeForm(payload: Partial<Form>): void
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaEditItemsTab,
  },
  props: {
    changeForm: { default: null, required: true, type: Function },
    form: { default: null, required: true, type: Object },
    media: { default: null, required: true, type: Object },
    tab: { default: 'edit1', required: true, type: String },
    user: { default: null, required: true, type: Object },
  },
  setup(props, { emit }) {
    const syncedTab = computed({
      get: () => props.tab,
      set: e => emit('update:tab', e),
    })
    const manga = computed(() => props.media.type === 'MANGA')

    const advancedScoring = useResult(
      computed(() => props.user),
      null,
      user =>
        user.mediaListOptions[manga.value ? 'mangaList' : 'animeList']
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
      mediaListToForm(
        props.media.mediaListEntry,
        advancedScoring.value.slice(),
      ),
    )

    const mergedForm = computed(() => ({
      ...stored.value,
      ...props.form,
    }))

    const { theme } = useInjectedTheme()

    return { advancedScoring, manga, mergedForm, scoreFormat, syncedTab, theme }
  },
})

export const mediaListToForm = (
  mediaListEntry: RecursiveMutable<MediaEditItems_media_mediaListEntry>,
  advancedScoring: string[],
): Form => {
  if (mediaListEntry) {
    const advancedScores = advancedScoring
      .map(key => mediaListEntry.advancedScores[key])
      .map(value => value || 0)

    delete mediaListEntry.__typename
    if (mediaListEntry.startedAt) delete mediaListEntry.startedAt.__typename
    if (mediaListEntry.completedAt) delete mediaListEntry.completedAt.__typename
    delete mediaListEntry.private
    delete mediaListEntry.id
    delete mediaListEntry.mediaId

    return {
      ...mediaListEntry,
      advancedScores,
    }
  }

  const advancedScores = advancedScoring.map(() => 0)
  return {
    advancedScores,
    completedAt: { day: null, month: null, year: null },
    notes: '',
    progress: 0,
    progressVolumes: 0,
    repeat: 0,
    score: 0,
    startedAt: { day: null, month: null, year: null },
    status: null,
  }
}
</script>
