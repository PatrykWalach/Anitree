import { FuzzyDate, Media } from '@/graphql/schema/media'
import { Form } from '@/types'
import { FormBuilder } from './FormBuilder'
import { SaveVariables } from '@/graphql/schema/listEntry'
import { User } from '@/graphql/schema/viewer'

export interface Props {
  method: keyof FormDirector
  user: User
  media: Media
  form: Form
  changeForm({ form }: { form: Partial<SaveVariables> }): void
  scoreFormat: {
    round: number
    max: number
  }
  advancedScoring: string[]
  manga: boolean
}

export const validFloat = (input: string): boolean =>
  !!input.match(/^([0-9])+(\.([1-9])+)?$/)

export const validInteger = (input: string): boolean =>
  !!input.match(/^([0-9])+$/)

export const validScore = (max: number, input: string) => {
  const value = parseInt(input)
  return value >= 0 && value <= max
}

export const formatToNumber = (input: string): string =>
  parseFloat(input).toString()

export const dateToString = (date: FuzzyDate): string => {
  if (date.year && date.month && date.day) {
    return Object.entries(date)
      .filter(([key]) => key !== '__typename')
      .map(([key, value]) => {
        if (key === 'year' || value >= 10) {
          return value
        }
        return '0' + value
      })
      .join('-')
  }
  return ''
}

export const stringToDate = (date: string): Omit<FuzzyDate, '__typename'> => {
  const [_day = null, _month = null, _year = null] = date.split('-')

  return {
    day: _day ? parseInt(_day) : null,
    month: _month ? parseInt(_month) : null,
    year: _year ? parseInt(_year) : null,
  }
}

export const numberRound = (dec: number, input: string): string => {
  const value = parseFloat(input)
  if (dec && value) {
    return (Math.round(value * 10 ** dec) / 10 ** dec).toString()
  }
  return parseInt(input).toString()
}
export const min = (n: number, m: string): string => {
  const value = parseInt(m)
  return value > n ? n.toString() : value.toString()
}

export interface ScoreFormat {
  round: number
  max: number
}

export class FormDirector {
  public edit1(
    builder: FormBuilder,
    { scoreFormat, manga, media, form, changeForm }: Readonly<Props>,
  ) {
    builder.setSelects([
      {
        attrs: {
          'item-text': manga ? 'manga' : 'text',
          'item-value': 'value',
          items: [
            { manga: 'Reading', text: 'Watching', value: 'CURRENT' },
            { manga: 'Plan to read', text: 'Plan to watch', value: 'PLANNING' },
            { manga: 'Completed', text: 'Completed', value: 'COMPLETED' },
            { manga: 'Rereading', text: 'Rewatching', value: 'REPEATING' },
            { manga: 'Paused', text: 'Paused', value: 'PAUSED' },
            { manga: 'Dropped', text: 'Dropped', value: 'DROPPED' },
          ],
          label: 'Status',
          placeholder: 'Status',
        },
        props: {
          afterTransform: [
            (status: Partial<SaveVariables>['status']) =>
              changeForm({
                form: { status },
              }),
          ],
          value: form.status,
        },
      },
    ])

    builder.setFields(
      [
        {
          attrs: {
            label: 'Score',
          },
          props: {
            afterTransform: [
              parseFloat,
              (score: Partial<SaveVariables>['score']) =>
                changeForm({
                  form: { score },
                }),
            ],
            beforeTransform: [(e: string) => e.toString()],
            transformations: [
              formatToNumber,
              numberRound.bind(null, scoreFormat.round),
            ],
            validators: new Set([
              scoreFormat.round ? validFloat : validInteger,
              validScore.bind(null, scoreFormat.max),
            ]),
            value: form.score,
          },
        },
        {
          attrs: {
            label: (manga ? 'Chapter' : 'Episode') + ' Progress',
          },
          props: {
            afterTransform: [
              parseFloat,

              (progress: Partial<SaveVariables>['progress']) =>
                changeForm({
                  form: { progress },
                }),
            ],
            beforeTransform: [(e: string) => e.toString()],
            transformations: [
              formatToNumber,
              numberRound.bind(null, 0),
              min.bind(
                null,
                (manga ? media.chapters : media.episodes) || Infinity,
              ),
            ],
            validators: new Set([validInteger]),
            value: form.progress || 0,
          },
        },
        {
          attrs: {
            label: 'Volume Progress',
          },
          props: {
            afterTransform: [
              parseFloat,
              (progressVolumes: Partial<SaveVariables>['progressVolumes']) =>
                changeForm({
                  form: { progressVolumes },
                }),
            ],
            beforeTransform: [(e: string) => e.toString()],
            transformations: [
              formatToNumber,
              numberRound.bind(null, 0),
              min.bind(null, media.volumes || Infinity),
            ],
            validators: new Set([validInteger]),
            value: form.progressVolumes || 0,
          },
        },
      ].splice(0, manga ? 3 : 2),
    )
  }

  public edit2(
    builder: FormBuilder,
    { manga, form, changeForm }: Readonly<Props>,
  ) {
    builder.setDateFields([
      {
        attrs: {
          clearable: true,
          label: 'Start Date',
        },
        props: {
          afterTransform: [
            stringToDate,
            (startedAt: Partial<SaveVariables>['startedAt']) =>
              changeForm({
                form: { startedAt },
              }),
          ],
          beforeTransform: [dateToString],
          value: form.startedAt,
        },
      },
      {
        attrs: {
          clearable: true,
          label: 'Finish Date',
        },
        props: {
          afterTransform: [
            stringToDate,
            (completedAt: Partial<SaveVariables>['completedAt']) =>
              changeForm({
                form: { completedAt },
              }),
          ],
          beforeTransform: [dateToString],
          value: form.completedAt,
        },
      },
    ])
    builder.setFields([
      {
        attrs: {
          label: 'Total ' + (manga ? 'Rereads' : 'Rewatches'),
        },
        props: {
          afterTransform: [
            parseFloat,

            (repeat: Partial<SaveVariables>['repeat']) =>
              changeForm({
                form: { repeat },
              }),
          ],
          beforeTransform: [(e: string) => e.toString()],
          transformations: [formatToNumber, numberRound.bind(null, 0)],

          validators: new Set([validInteger]),
          value: form.repeat,
        },
      },
    ])
  }
  public edit3(builder: FormBuilder, { form, changeForm }: Readonly<Props>) {
    builder.setTextareas([
      {
        attrs: {
          'auto-grow': true,
          label: 'Notes',
        },
        props: {
          afterTransform: [
            (notes: Partial<SaveVariables>['notes']) =>
              changeForm({
                form: { notes },
              }),
          ],
          value: form.notes || '',
        },
      },
    ])
  }

  public edit4(
    builder: FormBuilder,
    { scoreFormat, advancedScoring, form, changeForm }: Readonly<Props>,
  ) {
    builder.setFields(
      advancedScoring.map((label, i) => ({
        attrs: {
          label,
        },
        props: {
          afterTransform: [
            parseFloat,
            (e: number) => {
              const array: number[] = form.advancedScores
              array[i] = e
              return array
            },
            (advancedScores: number[]) => {
              const length = advancedScores.length
              return {
                advancedScores,
                score: length
                  ? [
                      formatToNumber,
                      numberRound.bind(null, scoreFormat.round),
                      parseFloat,
                    ].reduce(
                      (score, mutation: (score: any) => any) => mutation(score),
                      (
                        advancedScores.reduce((acc, v) => acc + v, 0) / length
                      ).toString(),
                    )
                  : undefined,
              }
            },
            (form: Partial<SaveVariables>) =>
              changeForm({
                form,
              }),
          ],
          beforeTransform: [(e: any) => e.toString()],
          transformations: [formatToNumber],
          validators: new Set([scoreFormat.round ? validFloat : validInteger]),
          value: form.advancedScores[i] || 0,
        },
      })),
    )
  }
}
