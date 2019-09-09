import FormBuilder from './FormBuilder'

import { FuzzyDate } from '@/graphql/schema/media'
import useEdit from '@/store/edit'
import { Props } from './MediaEditItemsTab.vue'

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

export default class FormDirector {
  // [index: string]: any

  // public constructor() {}

  public edit1(
    builder: FormBuilder,
    { scoreFormat, manga, media, form }: Readonly<Props>
  ) {
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
          value: form.status,
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
            value: form.score,
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
            value: form.progress || 0,
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
            value: form.progressVolumes || 0,
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

  public edit2(builder: FormBuilder, { manga, form }: Readonly<Props>) {
    builder.setDateFields([
      {
        props: {
          value: form.startedAt,
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
          value: form.completedAt,
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
          value: form.repeat,
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
  public edit3(builder: FormBuilder, data: Readonly<Props>) {
    const { form } = data
    builder.setTextareas([
      {
        props: {
          value: form.notes || '',
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

  public edit4(builder: FormBuilder, data: Readonly<Props>) {
    const { scoreFormat, advancedScoring, form } = data
    builder.setFields(
      advancedScoring.map((label, i) => {
        return {
          props: {
            value: form.advancedScores[i] || 0,
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
