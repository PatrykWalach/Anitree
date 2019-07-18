import { MediaEditFormItemBuilder } from './MediaEditFormItemBuilder'
import { Media, MediaDate } from '@/types'

const validFloat = (input: string): boolean =>
  !!input.match(/^([0-9])+(\.([1-9])+)?$/)

const validInteger = (input: string): boolean => !!input.match(/^([0-9])+$/)
const validScore = (max: number, input: string) => {
  const value = parseInt(input)
  return value >= 0 && value <= max
}

const formatToNumber = (input: string): string => parseFloat(input).toString()
const dateToString = (date: MediaDate): string => {
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

const stringToDate = (date: string): MediaDate => {
  const types = ['year', 'month', 'day']
  const values = date.split('-')
  return (Object.fromEntries(
    types.map((type, i) => [type, parseInt(values[i]) || null])
  ) as unknown) as MediaDate
}

const numberRound = (dec: number, input: string): string => {
  const value = parseFloat(input)
  if (dec && value)
    return (Math.floor(value * 10 ** dec) / 10 ** dec).toString()
  return parseInt(input).toString()
}
const min = (n: number, m: string): string => {
  const value = parseInt(m)
  return value > n ? n.toString() : value.toString()
}
interface ScoreFormat {
  round: number
  max: number
}

interface ScoreFormat {
  round: number
  max: number
}
interface Arguments {
  scoreFormat: ScoreFormat
  manga: boolean
  media: Media
  advancedScoring: string[]
}

export class MediaEditFormItemDirector {
  [index: string]: (builder: MediaEditFormItemBuilder, arg: Arguments) => void

  public edit1(
    builder: MediaEditFormItemBuilder,
    { scoreFormat, manga, media }: Arguments
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
          id: 'status'
        }
      }
    ])

    builder.setFields(
      [
        {
          props: {
            id: 'score',
            afterTransform: [parseFloat]
          },
          attrs: {
            label: 'score',
            validators: [
              scoreFormat.round ? validFloat : validInteger,
              validScore.bind(null, scoreFormat.max)
            ],
            transformations: [
              formatToNumber,
              numberRound.bind(null, scoreFormat.round)
            ],
            beforeTransform: [(e: any) => e.toString()]
          }
        },
        {
          props: {
            id: 'progress',

            afterTransform: [parseFloat]
          },
          attrs: {
            beforeTransform: [(e: any) => e.toString()],
            label: (manga ? 'Chapter' : 'Episode') + ' Progress',
            validators: [validInteger],
            transformations: [
              formatToNumber,
              numberRound.bind(null, 0),
              min.bind(
                null,
                (manga ? media.chapters : media.episodes) || Infinity
              )
            ]
          }
        },
        {
          props: {
            id: 'volumeProgress',
            afterTransform: [parseFloat]
          },
          attrs: {
            label: 'Volume Progress',
            validators: [validInteger],
            transformations: [
              formatToNumber,
              numberRound.bind(null, 0),
              min.bind(null, media.volumes || Infinity)
            ],
            beforeTransform: [(e: any) => e.toString()]
          }
        }
      ].splice(0, manga ? 3 : 2)
    )
  }

  public edit2(builder: MediaEditFormItemBuilder, { manga }: Arguments) {
    builder.setDateFields([
      {
        props: {
          id: 'startedAt',
          afterTransform: [stringToDate]
        },
        attrs: {
          label: 'Start Date',
          beforeTransform: [dateToString],
          clearable: true
        }
      },
      {
        props: {
          id: 'completedAt',
          afterTransform: [stringToDate]
        },
        attrs: {
          label: 'Finish Date',
          beforeTransform: [dateToString],
          clearable: true
        }
      }
    ])
    builder.setFields([
      {
        props: {
          id: 'repeat',
          afterTransform: [parseFloat]
        },
        attrs: {
          label: 'Total ' + (manga ? 'Rereads' : 'Rewatches'),
          validators: [validInteger],
          transformations: [formatToNumber, numberRound.bind(null, 0)],
          beforeTransform: [(e: any) => e.toString()]
        }
      }
    ])
  }
  public edit3(builder: MediaEditFormItemBuilder) {
    builder.setTextareas([
      {
        props: {
          id: 'notes'
        },
        attrs: {
          label: 'Notes'
        }
      }
    ])
  }
  public edit4(
    builder: MediaEditFormItemBuilder,
    { scoreFormat, advancedScoring }: Arguments
  ) {
    builder.setFields(
      advancedScoring.map((label, i) => {
        return {
          props: {
            id: 'advancedScores',
            i,
            afterTransform: [parseFloat]
          },
          attrs: {
            label,
            beforeTransform: [e => e.toString()],
            validators: [scoreFormat.round ? validFloat : validInteger],
            transformations: [formatToNumber]
          }
        }
      })
    )
  }
}
