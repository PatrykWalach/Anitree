import { Form } from '@/types'
import { SaveVariables } from '@/graphql/schema/listEntry'
import { createSlice } from '@reduxjs/toolkit'
import { mergeDeep } from 'apollo-utilities'

export const { reducer: form } = createSlice({
  initialState: {} as Partial<Form>,
  name: 'form',
  reducers: {
    CHANGE_FORM: (state, { payload }: { payload: Partial<SaveVariables> }) => {
      state = mergeDeep(state, payload)
    },
    RESET_FORM: () => ({}),
  },
})

export const { reducer: edit, actions: editActions } = createSlice({
  initialState: {
    form: {} as Partial<Form>,
    isEdited: false,
    // loading: false,
    mediaId: null as number | null,
  },
  name: 'edit',
  reducers: {
    CHANGE_FORM: (state, { payload }: { payload: Partial<SaveVariables> }) => {
      state.form = mergeDeep(state.form, payload)
    },
    CHANGE_IS_EDITED: (state, { payload }: { payload: boolean }) => {
      state.isEdited = payload
    },
    // CHANGE_LOADING: (state, { payload }: { payload: boolean }) => {
    //   state.loading = payload
    // },
    CHANGE_MEDIA_ID: (state, { payload }: { payload: number }) => {
      state.mediaId = payload
    },
    RESET_FORM: state => {
      state.form = {}
    },
  },
})
