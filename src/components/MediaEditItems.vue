<template>
  <v-tabs-items v-model="syncedTab" class="transparent" :dark="theme.isDark">
    <v-tab-item v-for="i in 4" :key="i" :value="'edit' + i">
      <VCardText>
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
      </VCardText>
    </v-tab-item>
  </v-tabs-items>
</template>
<script lang="ts">
import MediaEditItemsTab from './MediaEditItemsTab.vue'
import { computed, defineComponent } from '@vue/composition-api'
import { Form, RecursiveMutable } from '../types'
import { MediaEditItems_viewer } from './__generated__/MediaEditItems_viewer'
import { useInjectedTheme } from '@/hooks/theme'
import {
  MediaEditItems_media,
  MediaEditItems_media_mediaListEntry,
} from './__generated__/MediaEditItems_media'

import { useSync } from '@/hooks/sync'

import gql from 'graphql-tag'
import { MediaEditItemsTabFragments } from './MediaEditItemsTab.vue'

export const MediaEditItemsFragments = {
  media: gql`
    fragment MediaEditItems_media on Media {
      id
      type
      mediaListEntry {
        id
        advancedScores
        startedAt {
          year
          month
          day
        }
        completedAt {
          year
          month
          day
        }
        private
        mediaId
        status
        score
        progress
        progressVolumes
        repeat
        notes
      }
      ...MediaEditItemsTab_media
    }
    ${MediaEditItemsTabFragments.media}
  `,

  viewer: gql`
    fragment MediaEditItems_viewer on User {
      id
      mediaListOptions {
        scoreFormat
        mangaList {
          advancedScoring
        }
        animeList {
          advancedScoring
        }
      }
    }
  `,
}

export interface Props {
  user: MediaEditItems_viewer
  media: MediaEditItems_media
  tab: string
  form: Partial<Form>
  changeForm(payload: Partial<Form>): void
}

export default defineComponent<Readonly<Props>>({
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
    const syncedTab = useSync(props, 'tab', emit)
    const manga = computed(() => props.media.type === 'MANGA')

    const advancedScoring = computed(
      () =>
        props.user.mediaListOptions?.[manga.value ? 'mangaList' : 'animeList']
          ?.advancedScoring || [],
    )

    const rawScoreFormat = computed(
      () => props.user.mediaListOptions?.scoreFormat || '',
    )

    const scoreFormat = computed(() => {
      const [, max, round] = rawScoreFormat.value.split('_')

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

const createAdvancedScores = (
  mediaListEntry: RecursiveMutable<MediaEditItems_media_mediaListEntry>,
  advancedScoring: (string | null)[],
) =>
  (advancedScoring.map((key) =>
    key ? mediaListEntry.advancedScores[key] : 0,
  ) as unknown) as number[]
// .map(value => value || 0) as number[]

export const mediaListToForm = (
  mediaListEntry: RecursiveMutable<MediaEditItems_media_mediaListEntry> | null,
  advancedScoring: (string | null)[],
): Form => {
  if (mediaListEntry) {
    const advancedScores = createAdvancedScores(mediaListEntry, advancedScoring)

    delete mediaListEntry.__typename
    if (mediaListEntry.startedAt) delete mediaListEntry.startedAt.__typename
    if (mediaListEntry.completedAt) delete mediaListEntry.completedAt.__typename
    delete mediaListEntry.private
    delete mediaListEntry.id
    delete mediaListEntry.mediaId

    return {
      ...mediaListEntry,
      repeat: mediaListEntry.repeat || 0,
      score: mediaListEntry.score || 0,
      completedAt: mediaListEntry.completedAt || {
        day: null,
        month: null,
        year: null,
      },
      startedAt: mediaListEntry.startedAt || {
        day: null,
        month: null,
        year: null,
      },
      advancedScores,
    }
  }

  const advancedScores = Array.from<number>({
    length: advancedScoring.length,
  }).fill(0)

  return {
    advancedScores,
    notes: '',
    progress: 0,
    repeat: 0,
    score: 0,
    progressVolumes: 0,
    completedAt: { day: null, month: null, year: null },
    startedAt: { day: null, month: null, year: null },
    status: null,
  }
}
</script>
