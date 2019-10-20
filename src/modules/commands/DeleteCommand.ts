import {
  DELETE_MEDIA_LIST_ENTRY,
  MEDIA,
  SAVE_MEDIA_LIST_ENTRY,
  VIEWER,
} from '@/graphql'

import {
  DeleteVariables,
  Deleted,
  SaveVariables,
} from '@/graphql/schema/listEntry'
import { ListCommand, mediaListToForm } from '../commands'
import { Media, Variables as MediaVariables } from '@/graphql/schema/media'
import { DollarApollo } from 'vue-apollo/types/vue-apollo'
import { Form } from '@/types'
import { MediaList } from '@/graphql/schema/mediaListCollection'
import { User } from '@/graphql/schema/viewer'
import Vue from 'vue'
import { updateSaveMediaListEntry } from './SaveCommand'

export type DeleteCommandConstructor = Partial<
  Pick<DeleteCommand, 'backup' | 'done'>
> &
  Pick<DeleteCommand, 'variables' | 'apollo'>

export class DeleteCommand implements ListCommand {
  public backup: Form | null
  public variables: DeleteVariables & Pick<SaveVariables, 'mediaId'>
  public done: boolean
  public apollo: DollarApollo<Vue>
  public _class = 'DeleteCommand' as const

  constructor({
    variables,
    apollo,
    backup = null,
    done = false,
  }: DeleteCommandConstructor) {
    this.variables = variables
    this.backup = backup
    this.done = done
    this.apollo = apollo
  }

  public saveState() {
    const {
      variables: { mediaId },
    } = this

    return Promise.all([
      this.apollo
        .query<{ Media: Media }, MediaVariables>({
          query: MEDIA,
          variables: { id: mediaId },
        })
        .then(({ data }) => data.Media),
      this.apollo
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

  public undo() {
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
            variables: {
              mediaId,
              ...backup,
            },
          })
          .then(() => resolve())
          .catch(reject)
      } else {
        resolve()
      }
    })
  }

  public async execute() {
    await this.saveState()

    const {
      variables: { id, mediaId },
    } = this

    return this.apollo
      .mutate<{ DeleteMediaListEntry: Deleted }, DeleteVariables>({
        mutation: DELETE_MEDIA_LIST_ENTRY,
        update(cache, { data }) {
          if (!data) return

          const query = {
            query: MEDIA,
            variables: {
              mediaId,
            },
          }

          const _data: { Media: Media } | null = cache.readQuery(query)

          cache.writeQuery({
            ...query,
            data: {
              Media: {
                __typename: 'Media',
                id: mediaId,
                ...(_data && _data.Media),
                mediaListEntry: null,
              },
            },
          })
        },
        variables: {
          id,
        },
      })
      .then(r => {
        console.log(r)
        this.done = true
      })
  }
}
