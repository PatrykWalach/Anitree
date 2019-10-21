<script lang="ts">
import {
  computed,
  createComponent,
  createElement as h,
} from '@vue/composition-api'
import { ApolloQueryProps } from '@/graphql/schema'
import { SmartQuery } from 'vue-apollo/types/vue-apollo'

export interface Props {
  apollo: {
    [key: string]:
      | ApolloQueryProps
      | ((scopedProps: QueryResult) => ApolloQueryProps)
  }
}

export interface QueryResult {
  [key: string]: any
  errors: {
    [key: string]: null | string
  }
  isLoading: {
    [key: string]: number
  }
  loading: {
    [key: string]: boolean
  }
  queries: {
    [key: string]: SmartQuery<any>
  }
}

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    apollo: { default: null, required: true, type: Object },
  },
  setup: (props, { slots }) => {
    const reversed = computed(() => Object.entries(props.apollo).reverse())

    const add = <O extends any, T, K extends string>(
      object: O,
      key: K,
      value: T,
    ): O &
      {
        [Key in K]: T
      } => {
      object[key] = value
      return object
    }

    return () =>
      reversed.value
        .reduce(
          (slot, [key, props]) => scopedProps => [
            h('ApolloQuery', {
              props: props instanceof Function ? props(scopedProps) : props,
              scopedSlots: {
                default: ({
                  result: { data, error, loading },
                  isLoading,
                  query,
                }) => {
                  const {
                    errors,
                    isLoading: _isLoading,
                    loading: _loading,
                    queries,
                  } = scopedProps

                  return slot(
                    add(
                      {
                        ...scopedProps,
                        errors: add(errors, key, error),
                        isLoading: add(_isLoading, key, isLoading),
                        loading: add(_loading, key, loading),
                        queries: add(queries, key, query),
                      },
                      key,
                      data && data[key],
                    ),
                  )
                },
              },
            }),
          ],
          (scopedProps: QueryResult) => slots.default(scopedProps),
        )({
          errors: {},
          isLoading: {},
          loading: {},
          queries: {},
        })
        .shift() || null
  },
})
</script>
