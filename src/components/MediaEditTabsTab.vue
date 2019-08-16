<script lang="tsx">
import { createComponent, computed, createElement } from 'vue-function-api'

import FormBuilder from './FormBuilder'
import FormDirector from './FormDirector'

import { Media } from '@/apollo/schema/media'

import { User, MediaListTypeOptions } from '@/apollo/schema/viewer'
import { Form } from '../types'

import useEdit from '../store/edit'

interface Props {
  method: string
  user: User
  media: Media
}
import { VLayout } from 'vuetify/lib'

export default createComponent({
  inheritAttrs: false,
  props: ({
    method: {
      required: true,
      type: String
    },
    user: {
      required: true
    },
    media: {
      required: true
    }
  } as unknown) as Readonly<Props>,
  setup: props => {
    const manga = computed(() => {
      return (props.media && props.media.type === 'MANGA') || false
    })

    const mediaListOptions = computed((): MediaListTypeOptions | null => {
      return (
        props.user &&
        (manga.value
          ? props.user.mediaListOptions.mangaList
          : props.user.mediaListOptions.animeList)
      )
    })

    const advancedScoring = computed(
      () =>
        (mediaListOptions.value && mediaListOptions.value.advancedScoring) || []
    )

    const scoreFormat = computed(() => {
      const split = props.user.mediaListOptions.scoreFormat.split('_')
      return {
        round: split[2] === 'DECIMAL' ? 1 : 0,
        max: parseInt(split[1])
      }
    })

    const stored = computed(() => {
      if (props.media && props.media.mediaListEntry) {
        const { mediaListEntry } = props.media

        const advancedScores = advancedScoring.value
          .map(key => mediaListEntry.advancedScores[key])
          .map(value => value || 0)

        return Object.assign(
          Object.fromEntries(
            Object.entries(mediaListEntry)
              .filter(
                ([key, value]) =>
                  value !== null &&
                  key !== '__typename' &&
                  key !== 'advancedScores'
              )
              .map(([key, value]) => [key, value || 0])
          ) as Form,
          { advancedScores }
        )
      }

      const advancedScores = advancedScoring.value.map(() => 0)
      return {
        status: null,
        notes: '',
        score: 0,
        progress: 0,
        progressVolumes: 0,
        repeat: 0,
        startedAt: { day: null, year: null, month: null },
        completedAt: { day: null, year: null, month: null },
        advancedScores
      }
    })

    const { form } = useEdit()

    const director = new FormDirector()

    const h = createElement

    return (props: Readonly<Props>) => {
      const builder = new FormBuilder()

      director[props.method](builder, {
        form: form.value,
        stored: stored.value,
        scoreFormat: scoreFormat.value,
        manga: manga.value,
        media: props.media,
        advancedScoring: advancedScoring.value
      })

      return <VLayout wrap>{builder.getFields()}</VLayout>
    }
  }
})
</script>
