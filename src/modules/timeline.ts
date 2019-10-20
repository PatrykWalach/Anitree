import { Module, State } from 'vuex-composition-api'
import { Media } from '@/graphql/schema/media'

export const useTimeline = () =>
  new Module({
    name: 'timeline',
    namespaced: true,
    setup({ state, mutation }) {
      const isNumber = (e: any): e is number => !isNaN(e)

      const compare = (keys: (string)[], transform?: (arg: any) => number) => (
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

      const sorters: State<
        ((mediaA: Media, mediaB: Media) => number)[]
      > = state([
        compare(['startDate', 'year']),
        compare(['startDate', 'month']),
        compare(['startDate', 'day']),
        compare(['seasonInt'], int => (int < 500 ? 2000 : 1900) + int),
        compare(['status'], int =>
          ['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED'].indexOf(
            int,
          ),
        ),
      ])

      const order = state(1)

      const CHANGE_ORDER = mutation(
        'CHANGE_ORDER',
        { order },
        (state, order: number) => {
          state.order = order
        },
      )

      return {
        mutations: {
          CHANGE_ORDER,
        },
        state: {
          order,
          sorters,
        },
      }
    },
  })
