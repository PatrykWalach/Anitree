<template>
  <v-tabs-items v-model="syncedTab">
    <v-tab-item v-for="i in 4" :key="i" :value="'edit' + i">
      <v-card-text>
        <MediaEditDialogItemsTab
          :method="'edit' + i"
          v-bind="{
            user,
            media,
            form,
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
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'
import MediaEditDialogItemsTab from './MediaEditDialogItemsTab.vue'
import { State } from '@/store'
import { User } from '@/graphql/schema/viewer'
import { mediaListToForm } from '../graphql'
import { useSelector } from 'vue-redux-hooks'
import { SaveVariables } from '../graphql/schema/listEntry'

export interface Props {
  user: User
  media: Media
  tab: string
  changeForm({ form }: { form: Partial<SaveVariables> }): void
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaEditDialogItemsTab,
  },
  props: {
    changeForm: { default: null, required: true, type: Function },
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
      mediaListToForm(
        props.media.mediaListEntry,
        advancedScoring.value.slice(),
      ),
    )

    const editForm = useSelector((state: State) => state.edit.form)

    const form = computed(() => ({
      ...stored.value,
      ...editForm.value,
    }))

    return { advancedScoring, form, manga, scoreFormat, syncedTab }
  },
})
</script>
