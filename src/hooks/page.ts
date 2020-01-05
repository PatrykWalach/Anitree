import { useQuery, useResult, UseQueryOptions } from '@vue/apollo-composable'
import { useComputedOrCallback } from './reducer'
import { Ref, ref } from '@vue/composition-api'
import { DocumentNode } from 'graphql'
import { Page_page } from './__generated__/Page_page'

export const usePage = <
  R extends {
    Page: Page_page | null
  },
  V
>(
  queryDocument: DocumentNode,
  value: Ref<V> | (() => V),
  options:
    | UseQueryOptions<R, V>
    | Ref<UseQueryOptions<R, V>>
    | (() => UseQueryOptions<R, V>)
    | undefined,
) => {
  const variables = useComputedOrCallback(value)
  const query = useQuery<R, V>(queryDocument, variables, options)

  const currentPage = useResult<number, number>(
    query.result,
    0,
    data => data.Page.pageInfo.currentPage,
  )

  const hasNextPage = useResult<boolean, boolean>(
    query.result,
    false,
    data => data.Page.pageInfo.hasNextPage,
  )
  const loadingMore = ref(false)

  const loadMore = async () => {
    if (!query.loading.value && hasNextPage.value) {
      loadingMore.value = true
      await query.fetchMore({
        updateQuery: updatePageQuery,
        variables: {
          ...variables.value,
          page: 1 + currentPage.value,
        },
      })
      loadingMore.value = false
    }
  }

  return {
    ...query,
    loadMore,
    loadingMore,
    currentPage,
    hasNextPage,
  }
}

export const updatePageQuery = <
  Q extends {
    Page: {
      media: readonly any[] | null
    } | null
  }
>(
  previousResult: Q,
  {
    fetchMoreResult,
  }: {
    fetchMoreResult?: Q
  },
): Q => {
  if (!fetchMoreResult) {
    return previousResult
  }

  const getPageAndMedia = (result: Q) => {
    const resultPage = result.Page
    const resultMedia = (resultPage && resultPage.media) || []
    return [resultPage, resultMedia] as const
  }

  const [previousPage, previousMedia] = getPageAndMedia(previousResult)
  const [morePage, moreMedia] = getPageAndMedia(fetchMoreResult)

  return {
    ...previousResult,
    ...fetchMoreResult,
    Page: {
      __typename: 'Page',
      ...previousPage,
      ...morePage,
      media: previousMedia.concat(moreMedia),
    },
  }
}
