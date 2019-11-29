import { ShareData } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

export const { reducer: share, actions: shareActions } = createSlice({
  initialState: { isShared: false, options: null as ShareData | null },
  name: 'share',
  reducers: {
    CHANGE_IS_SHARED: (state, { payload }: { payload: boolean }) => {
      state.isShared = payload
    },
    CHANGE_OPTIONS: (state, { payload }: { payload: ShareData | null }) => {
      state.options = payload
    },
  },
})
