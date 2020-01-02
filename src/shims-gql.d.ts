declare module '*/Home.gql' {
  import { DocumentNode } from 'graphql'
  export const HomeQuery: DocumentNode
  export const ToggleFavouriteQuery: DocumentNode
  export const ToggleFavouriteMutation: DocumentNode
}

declare module '*/Search.gql' {
  import { DocumentNode } from 'graphql'
  export const SearchPageQuery: DocumentNode
  export const SearchViewerQuery: DocumentNode
}

declare module '*/Router.gql' {
  import { DocumentNode } from 'graphql'
  export const RouterTimelineQuery: DocumentNode
  export const RouterTimelineAppBarQuery: DocumentNode
  export const RouterTimelineDrawerQuery: DocumentNode
}

declare module '*/ToggleFavourite.gql' {
  import { DocumentNode } from 'graphql'
  export const ToggleFavouriteQuery: DocumentNode
  export const ToggleFavouriteMutation: DocumentNode
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql'
  const query: DocumentNode
  export default query
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const query: DocumentNode
  export default query
}
