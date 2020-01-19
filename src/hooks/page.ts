import { useQuery, useResult, UseQueryOptions } from '@vue/apollo-composable'
import { useComputedOrCallback } from './reducer'
import { Ref, ref } from '@vue/composition-api'
import { DocumentNode } from 'graphql'
import { Page_page } from './__generated__/Page_page'
import { Page_media } from './__generated__/Page_media'

interface Page extends Page_page {
  media: readonly (Page_media | null)[] | null
}

export const usePage = <R extends { Page: Page | null }, V>(
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
    if (!query.loading.value && !loadingMore.value && hasNextPage.value) {
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

export const updatePageQuery = <P extends { Page: Page | null }>(
  previousResult: P,
  {
    fetchMoreResult,
  }: {
    fetchMoreResult?: P
  },
): P => {
  if (!fetchMoreResult) {
    return previousResult
  }

  const getPageAndMedia = (result: P) => {
    const resultPage = result.Page
    const resultMedia = (resultPage?.media) || []
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
