import { getItem, setItem } from '@/localStorage'
import { createSlice } from '@reduxjs/toolkit'

interface Pending {
  id: number
  mediaId: number
}
export interface SavePending extends Pending {
  type: 'SAVE'
  variables: SaveMediaListEntryVariables
}

export interface DeletePending extends Pending {
  type: 'DELETE'
  variables: DeleteMediaListEntryVariables
}

const key = 'CHANGES'

const initialState = getItem(key, {
  id: 0,
  pending: [] as (SavePending | DeletePending)[],
})

export const { reducer: changes, actions: changesActions } = createSlice({
  initialState,
  name: 'changes',
  reducers: {
    SPLICE_PENDING: (state, { payload }: { payload: number }) => {
      state.pending.splice(payload, 1)
      setItem(key, { ...state })
    },
    UNSHIFT_PENDING: (
      state,
      {
        payload,
      }: { payload: Omit<SavePending, 'id'> | Omit<DeletePending, 'id'> },
    ) => {
      state.pending.unshift({
        id: state.id++,
        ...payload,
      })
      setItem(key, state)
    },
  },
})
