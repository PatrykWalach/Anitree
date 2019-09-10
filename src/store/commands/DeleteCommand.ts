import {
  DELETE_MEDIA_LIST_ENTRY,
  MEDIA,
  SAVE_MEDIA_LIST_ENTRY,
  VIEWER,
  apollo,
} from '@/graphql'
import { DeleteVariables, SaveVariables } from '@/graphql/schema/listEntry'
import { ListCommand, mediaListToForm, useCommands } from '../commands'
import { Media, Variables as MediaVariables } from '@/graphql/schema/media'
import { Form } from '@/types'

import { User } from '@/graphql/schema/viewer'

export type DeleteCommandConstructor = Partial<
  Pick<DeleteCommand, 'backup' | 'done'>
> &
  Pick<DeleteCommand, 'variables'>

export class DeleteCommand implements ListCommand {
  public backup: Form | null
  public variables: DeleteVariables & Pick<SaveVariables, 'mediaId'>
  public done: boolean
  public _class = 'DeleteCommand' as const

  constructor({
    variables,

    backup = null,
    done = false,
  }: DeleteCommandConstructor) {
    this.variables = variables
    this.backup = backup
    this.done = done
  }

  public saveState() {
    const {
      variables: { mediaId },
    } = this

    return Promise.all([
      apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: mediaId },
        })
        .then(({ data }) => data.Media),
      apollo
        .query<{ Viewer: User }>({ query: VIEWER })
        .then(({ data }) => data.Viewer),
    ] as [Promise<Media>, Promise<User>]).then(
      ([{ mediaListEntry, type }, { mediaListOptions }]) => {
        this.backup = mediaListToForm(
          mediaListEntry,
          mediaListOptions[type === 'MANGA' ? 'mangaList' : 'animeList']
            .advancedScoring,
        )
      },
    )
  }

  public async undo() {
    const {
      backup,
      variables: { mediaId },
    } = this

    if (this.done) {
      await apollo
        .mutate<MediaList, SaveVariables>({
          mutation: SAVE_MEDIA_LIST_ENTRY,
          variables: {
            mediaId,
            ...backup,
          },
        })
        .then(() => {
          useCommands().history.value.pop()
        })
    } else {
      useCommands().history.value.pop()
    }
  }

  public async execute() {
    await this.saveState()

    const {
      variables: { id },
    } = this

    return apollo
      .mutate<{ deleted: boolean }, DeleteVariables>({
        mutation: DELETE_MEDIA_LIST_ENTRY,
        variables: {
          id,
        },
      })
      .then(() => {
        this.done = true
      })
  }
}
