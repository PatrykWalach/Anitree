import FormBuilder from './FormBuilder'
import { Form } from '@/types'

import { SaveVariables } from '@/graphql/schema/listEntry'
import { FuzzyDate, Media } from '@/graphql/schema/media'
import useEdit from '@/store/edit'

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

export const stringToDate = (date: string): FuzzyDate => {
  const values = date.split('-')
  return {
    year: parseInt(values[0]) || null,
    month: parseInt(values[1]) || null,
    day: parseInt(values[2]) || null
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
export interface ItemData {
  scoreFormat: ScoreFormat
  manga: boolean
  media: Media
  advancedScoring: string[]
  form: Partial<SaveVariables>
  stored: Form
}

export default class FormDirector {
  // [index: string]: any

  // public constructor() {}

  public edit1(builder: FormBuilder, data: ItemData) {
    const { scoreFormat, manga, media, form, stored } = data

    builder.setSelects([
      {
        attrs: {
          placeholder: 'Status',
          items: [
            { manga: 'Reading', text: 'Watching', value: 'CURRENT' },
            { manga: 'Plan to read', text: 'Plan to watch', value: 'PLANNING' },
            { manga: 'Completed', text: 'Completed', value: 'COMPLETED' },
            { manga: 'Rereading', text: 'Rewatching', value: 'REPEATING' },
            { manga: 'Paused', text: 'Paused', value: 'PAUSED' },
            { manga: 'Dropped', text: 'Dropped', value: 'DROPPED' }
          ],
          'item-value': 'value',
          'item-text': manga ? 'manga' : 'text',
          label: 'Status'
        },
        props: {
          value: form.status || stored.status,
          afterTransform: [
            (e: string) => Object.fromEntries([['status', e]]),
            useEdit().changeForm
          ]
        }
      }
    ])

    builder.setFields(
      [
        {
          props: {
            value: form.score || stored.score,
            afterTransform: [
              parseFloat,
              (e: string) => Object.fromEntries([['score', e]]),
              useEdit().changeForm
            ],
            validators: [
              scoreFormat.round ? validFloat : validInteger,
              validScore.bind(null, scoreFormat.max)
            ],
            transformations: [
              formatToNumber,
              numberRound.bind(null, scoreFormat.round)
            ],
            beforeTransform: [(e: string) => e.toString()]
          },
          attrs: {
            label: 'Score'
          }
        },
        {
          props: {
            value: form.progress || stored.progress,
            afterTransform: [
              parseFloat,

              (e: string) => Object.fromEntries([['progress', e]]),
              useEdit().changeForm
            ],
            beforeTransform: [(e: string) => e.toString()],
            validators: [validInteger],
            transformations: [
              formatToNumber,
              numberRound.bind(null, 0),
              min.bind(
                null,
                (manga ? media.chapters : media.episodes) || Infinity
              )
            ]
          },
          attrs: {
            label: (manga ? 'Chapter' : 'Episode') + ' Progress'
          }
        },
        {
          props: {
            value: form.volumeProgress || stored.volumeProgress,
            afterTransform: [
              parseFloat,

              (e: string) => Object.fromEntries([['volumeProgress', e]]),
              useEdit().changeForm
            ],
            validators: [validInteger],
            transformations: [
              formatToNumber,
              numberRound.bind(null, 0),
              min.bind(null, media.volumes || Infinity)
            ],
            beforeTransform: [(e: string) => e.toString()]
          },
          attrs: {
            label: 'Volume Progress'
          }
        }
      ].splice(0, manga ? 3 : 2)
    )
  }

  public edit2(builder: FormBuilder, data: ItemData) {
    const { manga, form, stored } = data
    builder.setDateFields([
      {
        props: {
          value: form.startedAt || stored.startedAt,
          afterTransform: [
            stringToDate,
            (e: string) => Object.fromEntries([['startedAt', e]]),
            useEdit().changeForm
          ],
          beforeTransform: [dateToString]
        },
        attrs: {
          label: 'Start Date',
          clearable: true
        }
      },
      {
        props: {
          value: form.completedAt || stored.completedAt,
          afterTransform: [
            stringToDate,
            (e: string) => Object.fromEntries([['completedAt', e]]),
            useEdit().changeForm
          ],
          beforeTransform: [dateToString]
        },
        attrs: {
          label: 'Finish Date',
          clearable: true
        }
      }
    ])
    builder.setFields([
      {
        props: {
          value: form.repeat || stored.repeat,
          afterTransform: [
            parseFloat,
            (e: string) => Object.fromEntries([['repeat', e]]),
            useEdit().changeForm
          ],
          validators: [validInteger],
          transformations: [formatToNumber, numberRound.bind(null, 0)],
          beforeTransform: [(e: string) => e.toString()]
        },
        attrs: {
          label: 'Total ' + (manga ? 'Rereads' : 'Rewatches')
        }
      }
    ])
  }
  public edit3(builder: FormBuilder, data: ItemData) {
    const { form, stored } = data
    builder.setTextareas([
      {
        props: {
          value: form.notes || stored.notes,
          afterTransform: [
            (e: string) => Object.fromEntries([['notes', e]]),
            useEdit().changeForm
          ]
        },
        attrs: {
          'auto-grow': true,
          label: 'Notes'
        }
      }
    ])
  }

  public edit4(builder: FormBuilder, data: ItemData) {
    const { scoreFormat, advancedScoring, form, stored } = data
    builder.setFields(
      advancedScoring.map((label, i) => {
        return {
          props: {
            value:
              form.advancedScores && form.advancedScores[i] !== undefined
                ? form.advancedScores[i]
                : stored.advancedScores[i],
            afterTransform: [
              parseFloat,
              (e: number) => {
                const array: number[] =
                  form['advancedScores'] || stored['advancedScores']

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
                        parseFloat
                      ].reduce(
                        (score, mutation: (score: any) => any) =>
                          mutation(score),
                        (
                          advancedScores.reduce((acc, v) => acc + v, 0) / length
                        ).toString()
                      )
                    : undefined
                }
              },
              useEdit().changeForm
            ],
            beforeTransform: [(e: any) => e.toString()],
            validators: [scoreFormat.round ? validFloat : validInteger],
            transformations: [formatToNumber]
          },
          attrs: {
            label
          }
        }
      })
    )
  }
}
