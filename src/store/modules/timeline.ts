import { Media } from '@/graphql/schema/media'

import { createSlice } from '@reduxjs/toolkit'

const isNumber = (e: any): e is number => !isNaN(e)

const compare = (keys: string[], transform?: (arg: any) => number) => (
  a: Record<string, any>,
  b: Record<string, any>,
) => {
  const _a: unknown = keys.reduce((acc, key) => acc[key], a) || Infinity
  const _b: unknown = keys.reduce((acc, key) => acc[key], b) || Infinity

  if (isNumber(_a) && isNumber(_b)) {
    return _a - _b || 0
  }
  if (!transform) {
    return 0
  }
  return transform(_a) - transform(_b) || 0
}

export const sorters = [
  compare(['startDate', 'year']),
  compare(['startDate', 'month']),
  compare(['startDate', 'day']),
  compare(['seasonInt'], int => (int < 500 ? 2000 : 1900) + int),
  compare(['status'], int =>
    ['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED'].indexOf(int),
  ),
] as ((mediaA: Media, mediaB: Media) => number)[]

export const { reducer: timeline, actions: timelineActions } = createSlice({
  initialState: { order: 1 },
  name: 'timeline',
  reducers: {
    CHANGE_ORDER: (state, { payload }: { payload: number }) => {
      state.order = payload
    },
  },
})
