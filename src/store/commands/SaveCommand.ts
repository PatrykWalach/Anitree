import { ListCommand, mediaListToForm, useCommands } from '../commands'
import { MEDIA, SAVE_MEDIA_LIST_ENTRY, VIEWER, apollo } from '@/graphql'
import { Media, Variables as MediaVariables } from '@/graphql/schema/media'

import { Form } from '@/types'
import { SaveVariables } from '@/graphql/schema/listEntry'
import { User } from '@/graphql/schema/viewer'

export type SaveCommandConstructor = Partial<
  Pick<SaveCommand, 'backup' | 'done'>
> &
  Pick<SaveCommand, 'variables'>

export class SaveCommand implements ListCommand {
  public backup: Form | null
  public variables: SaveVariables
  public done: boolean
  public _class = 'SaveCommand' as const

  constructor({
    variables,

    backup = null,
    done = false,
  }: SaveCommandConstructor) {
    this.variables = variables
    this.backup = backup
    this.done = done
  }

  public saveState() {
    const { variables } = this

    return Promise.all([
      apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: variables.mediaId },
        })
        .then(({ data }) => data.Media),
      apollo
        .query<{ Viewer: User }>({ query: VIEWER })
        .then(({ data }) => data.Viewer),
    ] as [Promise<Media>, Promise<User>]).then(
      ([{ mediaListEntry, type }, { mediaListOptions }]) => {
        this.backup = Object.fromEntries(
          Object.entries(
            mediaListToForm(
              mediaListEntry,
              mediaListOptions[type === 'MANGA' ? 'mangaList' : 'animeList']
                .advancedScoring,
            ),
          ).filter(([key]) => variables.hasOwnProperty(key)),
        ) as Form
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
          variables: { mediaId, ...backup },
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

    const { variables } = this

    return apollo
      .mutate<MediaList, SaveVariables>({
        mutation: SAVE_MEDIA_LIST_ENTRY,
        variables,
      })
      .then(() => {
        this.done = true
      })
  }
}
