<script lang="tsx">
import {
  createComponent,
  computed,
  createElement as h
} from '@vue/composition-api'

import FormBuilder from './FormBuilder'
import FormDirector from './FormDirector'

import { Media } from '@/apollo/schema/media'

import { User, MediaListTypeOptions } from '@/apollo/schema/viewer'
import { Form } from '../types'

import useEdit from '../store/edit'

export interface Props {
  method: keyof FormDirector
  user: User
  media: Media
}

import { VContainer, VRow } from 'vuetify/lib'

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    method: {
      required: true,
      type: String,
      default: ''
    },
    user: {
      required: true,
      type: Object,
      default: null
    },
    media: {
      required: true,
      type: Object,
      default: null
    }
  },
  setup: (props) => {
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

        return {
          ...(Object.fromEntries(
            Object.entries(mediaListEntry)
              .filter(
                ([key, value]) =>
                  value !== null &&
                  key !== '__typename' &&
                  key !== 'advancedScores'
              )
              .map(([key, value]) => [key, value || 0])
          ) as Form),
          advancedScores
        }
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

    /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/

    return (props )=> {
      const builder = new FormBuilder()

      director[props.method](builder, {
        form: form.value,
        stored: stored.value,
        scoreFormat: scoreFormat.value,
        manga: manga.value,
        media: props.media,
        advancedScoring: advancedScoring.value
      })

      return h(VContainer, { props: { fluid: true } }, [
        h(VRow, [builder.getFields()])
      ])

      //<VLayout wrap>{builder.getFields()}</VLayout>
    }
  }
})
</script>
