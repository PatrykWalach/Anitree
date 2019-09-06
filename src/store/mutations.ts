import CompositionApi, { ref, Ref, watch } from '@vue/composition-api'

import Vue from 'vue'
import apollo, {
  SAVE_MEDIA_LIST_ENTRY as SAVE_MEDIA_LIST_ENTRY_MUTATION,
  MEDIA,
  VIEWER
} from '@/graphql'
import { SaveVariables } from '@/graphql/schema/listEntry'
Vue.use(CompositionApi)
import { Variables as MediaVariables, Media } from '@/graphql/schema/media'
import { MediaList } from '@/graphql/schema/mediaListCollection'

import { User } from '@/graphql/schema/viewer'
import { Form } from '@/types'
import useSettings from './settings'

export interface Event {
  backup?: Form | null
  mediaId: number
  variables: Partial<Form>
  commandId?: number
  done?: boolean
}
const stored = localStorage.getItem('CHANGES')

if (useSettings().cacheChanges) {
  watch(() => {
    localStorage.setItem('CHANGES', JSON.stringify(elements.value))
  })
}

export class SaveMediaListEntry {
  backup: Form | null
  mediaId: number
  variables: Partial<Form>
  commandId: number
  done: boolean

  constructor({
    mediaId,
    variables,
    backup = null,
    commandId = 0,
    done = false
  }: Event) {
    this.mediaId = mediaId
    this.variables = variables
    this.backup = backup
    this.commandId = commandId
    this.done = done
  }

  saveState() {
    const { variables } = this

    return Promise.all([
      apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: this.mediaId }
        })
        .then(({ data }) => data.Media),
      apollo
        .query<{ Viewer: User }>({ query: VIEWER })
        .then(({ data }) => data.Viewer)
    ] as [Promise<Media>, Promise<User>]).then(
      ([{ mediaListEntry }, { mediaListOptions }]) => {
        this.backup = Object.fromEntries(
          Object.entries(
            mediaListToForm(
              mediaListEntry,
              mediaListOptions.mangaList.advancedScoring
            )
          ).filter(([key]) => variables.hasOwnProperty(key))
        ) as Form
      }
    )
  }

  undo() {
    const { backup, mediaId } = this

    return (
      apollo
        .mutate<MediaList, SaveVariables>({
          mutation: SAVE_MEDIA_LIST_ENTRY_MUTATION,
          variables: {
            mediaId,
            ...backup
          }
        })
        .then(() => {
          this.done = false
        })
        // .catch(console.error)
        .catch(() => {
          // this.done = true
        })
    )
  }

  execute() {
    const { variables, mediaId } = this

    this.commandId = elements.value.length
    return apollo
      .mutate<MediaList, SaveVariables>({
        mutation: SAVE_MEDIA_LIST_ENTRY_MUTATION,
        variables: {
          mediaId,
          ...variables
        }
      })
      .then(() => {
        this.done = true
      })
      .catch(() => {
        // this.done = false
      })
  }
}

const elements: Ref<SaveMediaListEntry[]> = ref(
  (stored && JSON.parse(stored).map((e: Event) => new SaveMediaListEntry(e))) ||
    []
)

elements.value
  .filter(({ done }) => !done)
  .map(async command => {
    await command.saveState()
    command.execute()
  })

const SAVE_MEDIA_LIST_ENTRY = async (e: Event) => {
  const command = new SaveMediaListEntry(e)
  elements.value.push(command)

  await command.saveState()
  await command.execute()

  return command
}

export default function useMutations() {
  return {
    elements,
    SAVE_MEDIA_LIST_ENTRY
  }
}

export const mediaListToForm = (
  mediaListEntry: MediaList | null,
  advancedScoring: string[]
): Form => {
  if (mediaListEntry) {
    const advancedScores = advancedScoring
      .map(key => mediaListEntry.advancedScores[key])
      .map(value => value || 0)

    return {
      ...Object.fromEntries(
        Object.entries(mediaListEntry)
          .filter(
            ([key, value]) =>
              value !== null && key !== '__typename' && key !== 'advancedScores'
          )
          .map(([key, value]) => [key, value || 0])
      ),
      advancedScores
    } as Form
  }

  const advancedScores = advancedScoring.map(() => 0)
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
