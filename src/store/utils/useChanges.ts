import {
  DELETE_MEDIA_LIST_ENTRY,
  MEDIA,
  SAVE_MEDIA_LIST_ENTRY,
} from '@/graphql'
import { DeletePending, SavePending } from '../modules/changes'
import {
  DeleteVariables,
  Deleted,
  SaveVariables,
} from '@/graphql/schema/listEntry'
import { DocumentNode, FetchResult } from 'apollo-link'
import { Ref, ref } from '@vue/composition-api'
import { DataProxy } from 'apollo-cache'
import { Media } from '@/graphql/schema/media'
import { MediaList } from '@/graphql/schema/mediaListCollection'
import { MutationUpdaterFn } from 'apollo-client'
import { Variables } from '@/graphql/schema/media'
import { useActions } from '..'
import { useDispatch } from 'vue-redux-hooks'
import { useMutation } from '@vue/apollo-composable'

type OnError = (
  fn: (param?: Error | undefined) => void,
) => {
  off: () => void
}

export const handleError = <
  P extends Omit<SavePending, 'id'> | Omit<DeletePending, 'id'>
>(
  onError: OnError,
  type: P['type'],
) => {
  const pending: Ref<P> = ref({ type })

  const dispatch = useDispatch()
  const actions = useActions()

  onError(() => {
    dispatch(actions.changes.UNSHIFT_PENDING(pending.value))
  })

  return pending
}

export const useChange = <D, V>(
  query: DocumentNode,
  update: (cache: DataProxy, { data }: FetchResult<D>, mediaId: number) => void,
) => {
  const { mutate: change, loading, onError, onDone } = useMutation<D, V>(query)
  const mutate = (variables: V, mediaId: number) => {
    change(variables, {
      update: (cache, result) => update(cache, result, mediaId),
    })
  }
  return { loading, mutate, onDone, onError }
}

export const useDelete = () => {
  return useChange<{ DeleteMediaListEntry: Deleted }, DeleteVariables>(
    DELETE_MEDIA_LIST_ENTRY,
    updateDeleteMediaListEntry,
  )
}

export const useSave = () => {
  return useChange<
    {
      SaveMediaListEntry: MediaList
    },
    SaveVariables
  >(SAVE_MEDIA_LIST_ENTRY, updateSaveMediaListEntry)
}

export const useDeleteWithChanges = () => {
  const query = useDelete()

  const pending = handleError(query.onError, 'DELETE')

  const mutate = (variables: DeleteVariables, mediaId: number) => {
    pending.value = {
      mediaId,
      type: 'DELETE',
      variables,
    }

    query.mutate(variables, mediaId)
  }

  return { ...query, mutate }
}
export const useSaveWithChanges = () => {
  const query = useSave()

  const pending = handleError(query.onError, 'SAVE')

  const mutate = (variables: SaveVariables) => {
    pending.value = {
      mediaId: variables.mediaId,
      type: 'SAVE',
      variables,
    }

    query.mutate(variables, variables.mediaId)
  }

  return { ...query, mutate }
}

export const useChanges = () => {
  const { mutate: deleteEntry } = useDelete()
  const { mutate: saveEntry } = useSave()

  const isSavePending = (
    pending: SavePending | DeletePending,
  ): pending is SavePending => pending.type === 'SAVE'

  return { deleteEntry, isSavePending, saveEntry }
}

export const updateSaveMediaListEntry: MutationUpdaterFn<{
  SaveMediaListEntry: MediaList
}> = (cache, { data: result }) => {
  if (!result) return

  const query: {
    variables: Variables
    query: DocumentNode
  } = {
    query: MEDIA,
    variables: { id: result.SaveMediaListEntry.mediaId },
  }

  const data: { Media: Media } | null = cache.readQuery(query)

  if (data) {
    data.Media.mediaListEntry = result.SaveMediaListEntry

    cache.writeQuery({
      ...query,
      data,
    })
  }
}

const updateDeleteMediaListEntry = (
  cache: DataProxy,
  { data: result }: FetchResult<{ DeleteMediaListEntry: Deleted }>,
  id: number,
) => {
  if (!result || !result.DeleteMediaListEntry.deleted) return

  const query: {
    variables: Variables
    query: DocumentNode
  } = {
    query: MEDIA,
    variables: {
      id,
    },
  }

  const data: { Media: Media } | null = cache.readQuery(query)

  if (data) {
    data.Media.mediaListEntry = null

    cache.writeQuery({
      ...query,
      data,
    })
  }
}
