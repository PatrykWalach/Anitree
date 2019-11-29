import { ListCommand, mediaListToForm } from '.'
import { MEDIA, SAVE_MEDIA_LIST_ENTRY, VIEWER } from '@/graphql'
import { Media, Variables as MediaVariables } from '@/graphql/schema/media'

import { DollarApollo } from 'vue-apollo/types/vue-apollo'
import { Form } from '@/types'
import { MediaList } from '@/graphql/schema/mediaListCollection'
import { MutationUpdaterFn } from 'apollo-client'
import { SaveVariables } from '@/graphql/schema/listEntry'
import { User } from '@/graphql/schema/viewer'
import Vue from 'vue'

export type SaveCommandConstructor = Partial<
  Pick<SaveCommand, 'backup' | 'done'>
> &
  Pick<SaveCommand, 'variables' | 'apollo'>

export const updateSaveMediaListEntry: MutationUpdaterFn<{
  SaveMediaListEntry: MediaList
}> = (cache, { data }) => {
  if (!data) return

  const query = {
    query: MEDIA,
    variables: { id: data.SaveMediaListEntry.mediaId },
  }

  const _data: { Media: Media } | null = cache.readQuery(query)

  cache.writeQuery({
    ...query,
    data: {
      Media: {
        __typename: 'Media',
        id: data.SaveMediaListEntry.mediaId,
        ...(_data && _data.Media),
        mediaListEntry: data.SaveMediaListEntry,
      },
    },
  })
}

export class SaveCommand implements ListCommand {
  public backup: Form | null
  public variables: SaveVariables
  public done: boolean
  public apollo: DollarApollo<Vue>
  public _class = 'SaveCommand' as const

  constructor({
    apollo,
    variables,
    backup = null,
    done = false,
  }: SaveCommandConstructor) {
    this.variables = variables
    this.backup = backup
    this.done = done
    this.apollo = apollo
  }

  public saveState() {
    const { variables } = this

    return Promise.all([
      this.apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: variables.mediaId },
        })
        .then(({ data }) => data.Media),
      this.apollo
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
    return new Promise<void>((resolve, reject) => {
      const {
        backup,
        variables: { mediaId },
      } = this

      if (this.done) {
        this.apollo
          .mutate<{ SaveMediaListEntry: MediaList }, SaveVariables>({
            mutation: SAVE_MEDIA_LIST_ENTRY,
            update: updateSaveMediaListEntry,
            variables: { mediaId, ...backup },
          })
          .then(() => {
            resolve()
          })
          .catch(reject)
      } else {
        resolve()
      }
    })
  }

  public async execute() {
    await this.saveState()

    const { variables } = this

    await this.apollo
      .mutate<{ SaveMediaListEntry: MediaList }, SaveVariables>({
        mutation: SAVE_MEDIA_LIST_ENTRY,
        update: updateSaveMediaListEntry,
        variables,
      })
      .then(() => {
        this.done = true
      })
  }
}
