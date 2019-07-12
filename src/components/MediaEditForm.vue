<template>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout wrap>
        <MediaEditFormField
          :value="store.status || stored.status"
          placeholder="Status"
          tag="v-select"
          :items="statusItems"
          item-value="value"
          :item-text="manga ? 'manga' : 'text'"
          label="Status"
          :after-transform="[toObject.bind(null, 'status')]"
          @input="changeForm"
        />

        <MediaEditFormField
          :value="store.score || stored.score"
          label="Score"
          v-bind="scoreValidatorsTransformations"
          :before-transform="[e => e.toString()]"
          :after-transform="[parseFloat, toObject.bind(null, 'score')]"
          @input="changeForm"
        />

        <MediaEditFormField
          :value="store.progress || stored.progress"
          :label="(manga ? 'Chapter' : 'Episode') + ' Progress'"
          :validators="[validInteger]"
          :transformations="[
            formatToNumber,
            numberRound.bind(null, 0),
            min.bind(null, manga ? media.chapters : media.episodes)
          ]"
          :before-transform="[e => e.toString()]"
          :after-transform="[parseFloat, toObject.bind(null, 'progress')]"
          @input="changeForm"
        />

        <MediaEditFormField
          v-if="manga"
          :value="store.volumeProgress || stored.volumeProgress"
          label="Volume Progress"
          :validators="[validInteger]"
          :transformations="[
            formatToNumber,
            numberRound.bind(null, 0),
            min.bind(null, media.volumes)
          ]"
          :before-transform="[e => e.toString()]"
          :after-transform="[parseFloat, toObject.bind(null, 'volumeProgress')]"
          @input="changeForm"
        />

        <MediaEditFormField
          :value="store.startedAt || stored.startedAt"
          label="Start Date"
          tag="base-date-field"
          :before-transform="[dateToString]"
          :after-transform="[stringToDate, toObject.bind(null, 'startedAt')]"
          @input="changeForm"
        />

        <MediaEditFormField
          :value="store.completedAt || stored.completedAt"
          label="Finish Date"
          tag="base-date-field"
          :before-transform="[dateToString]"
          :after-transform="[stringToDate, toObject.bind(null, 'completedAt')]"
          @input="changeForm"
        />

        <MediaEditFormField
          :value="store.repeat || stored.repeat"
          label="Total rewatches"
          :validators="[validInteger]"
          :transformations="[formatToNumber, numberRound.bind(null, 0)]"
          :before-transform="[e => e.toString()]"
          :after-transform="[parseFloat, toObject.bind(null, 'repeat')]"
          @input="changeForm"
        />

        <MediaEditFormField
          :value="store.notes || stored.notes"
          label="Notes"
          tag="v-textarea"
          :full="true"
          :after-transform="[toObject.bind(null, 'notes')]"
          @input="changeForm"
        />

        <template v-if="advancedScoresEnabled">
          <v-flex xs12>
            <v-subheader>
              Advanced Scores
            </v-subheader>
          </v-flex>

          <MediaEditFormField
            v-for="(key, i) in advancedScoring"
            :key="key"
            :value="
              store.advancedScores && store.advancedScores[i] !== undefined
                ? store.advancedScores[i]
                : stored.advancedScores[i]
            "
            :label="key"
            v-bind="scoreValidatorsTransformations"
            :before-transform="[e => e.toString()]"
            :after-transform="[
              parseFloat,
              e => {
                const advancedScores =
                  store.advancedScores || stored.advancedScores
                advancedScores[i] = e
                return { advancedScores }
              }
            ]"
            @input="changeScore"
        /></template>
      </v-layout>
    </v-container>
  </v-card-text>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { MediaDate, Media, User, Form, MutationVariables } from '../types'
import MediaEditFormField from './MediaEditFormField.vue'
import edit from '../store/modules/edit'

@Component({
  components: { MediaEditFormField }
})
export default class MediaEditForm extends Vue {
  changeForm(value: Partial<Form>) {
    console.log(value)
    edit.CHANGE_FORM(value)
  }

  statusItems: {
    text: string
    value: string
    manga: string
  }[] = [
    { manga: 'Reading', text: 'Watching', value: 'CURRENT' },
    { manga: 'Plan to read', text: 'Plan to watch', value: 'PLANNING' },
    { manga: 'Completed', text: 'Completed', value: 'COMPLETED' },
    { manga: 'Rereading', text: 'Rewatching', value: 'REPEATING' },
    { manga: 'Paused', text: 'Paused', value: 'PAUSED' },
    { manga: 'Dropped', text: 'Dropped', value: 'DROPPED' }
  ]

  get manga() {
    return (this.media && this.media.type === 'MANGA') || false
  }

  get advancedScoring() {
    const { mediaListOptions } = this
    return (mediaListOptions && mediaListOptions.advancedScoring) || []
  }

  get mediaListOptions() {
    const { user, manga } = this
    return (
      user &&
      (manga
        ? user.mediaListOptions.mangaList
        : user.mediaListOptions.animeList)
    )
  }

  get advancedScoresEnabled() {
    const { mediaListOptions } = this
    return mediaListOptions && mediaListOptions.advancedScoringEnabled
  }

  public changeScore({ advancedScores }: { advancedScores: number[] }) {
    const scores = advancedScores.filter(e => e)
    if (scores.length) {
      const { scoreFormat, formatToNumber, numberRound, changeForm } = this

      changeForm({
        advancedScores,
        score: ([
          (scores: number[]) => scores.reduce((acc, v) => acc + v, 0),
          (score: number) => score / scores.length,
          (score: number) => score.toString(),
          formatToNumber,
          numberRound.bind(null, scoreFormat.round),
          parseFloat
        ].reduce(
          (score, transform: Function) => transform(score),
          scores
        ) as unknown) as number
      })
    }
  }

  @Prop()
  public readonly media!: Media

  @Prop()
  public readonly user!: User

  get listEntry() {
    return this.media && this.media.mediaListEntry
  }

  get stored(): Form {
    const { listEntry } = this
    if (listEntry) {
      const advancedScores = this.advancedScoring
        .map(key => listEntry.advancedScores[key])
        .map(value => value || 0)

      return {
        ...(Object.fromEntries(
          Object.entries(listEntry)
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

    const advancedScores = this.advancedScoring.map(() => 0)
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
  }

  get store(): Partial<MutationVariables> {
    return edit.form
  }

  public dateToString(date: MediaDate): string {
    if (date.year && date.month && date.day)
      return Object.entries(date)
        .filter(([key]) => key !== '__typename')
        .map(([key, value]) => {
          if (key === 'year' || value >= 10) return value
          return '0' + value
        })
        .join('-')
    return ''
  }

  public stringToDate(date: string): MediaDate {
    const types = ['year', 'month', 'day']
    const values = date.split('-')
    return (Object.fromEntries(
      types.map((type, i) => [type, parseInt(values[i]) || null])
    ) as unknown) as MediaDate
  }

  public min(n: number, m: string): string {
    const value = parseInt(m)
    return value > n ? n.toString() : value.toString()
  }

  public validFloat(input: string): boolean {
    return !!input.match(/^([0-9])+(\.([1-9])+)?$/)
  }

  public validInteger(input: string): boolean {
    return !!input.match(/^([0-9])+$/)
  }

  public formatToNumber(input: string): string {
    return parseFloat(input).toString()
  }

  public numberRound(dec: number, input: string): string {
    const value = parseFloat(input)
    if (dec && value)
      return (Math.floor(value * 10 ** dec) / 10 ** dec).toString()
    return parseInt(input).toString()
  }

  public validScore(max: number, input: string) {
    const value = parseInt(input)
    return value >= 0 && value <= max
  }

  public toObject(key: string, value: any) {
    return Object.fromEntries([[key, value]])
  }

  get scoreFormat() {
    const split = this.user.mediaListOptions.scoreFormat.split('_')
    return {
      round: split[2] === 'DECIMAL' ? 1 : 0,
      max: parseInt(split[1])
    }
  }

  get scoreValidatorsTransformations() {
    const {
      validScore,
      validInteger,
      validFloat,
      formatToNumber,
      numberRound,
      scoreFormat
    } = this

    return {
      validators: [
        scoreFormat.round ? validFloat : validInteger,
        validScore.bind(null, scoreFormat.max)
      ],
      transformations: [
        formatToNumber,
        numberRound.bind(null, scoreFormat.round)
      ]
    }
  }
}
</script>
