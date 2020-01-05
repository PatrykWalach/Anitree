declare module '*TheDrawer.js' {
  import { DocumentNode } from 'graphql'
  export const TheDrawerQuery: DocumentNode
}
declare module '*ChangeCard.js' {
  import { DocumentNode } from 'graphql'
  export const ChangeCardQuery: DocumentNode
}

declare module '*Home.js' {
  import { DocumentNode } from 'graphql'
  export const HomeQuery: DocumentNode
  export const ToggleFavouriteQuery: DocumentNode
  export const ToggleFavouriteMutation: DocumentNode
}
declare module '*Timeline.js' {
  import { DocumentNode } from 'graphql'
  export const TimelineQuery: DocumentNode
  export const TimelinePrefetchQuery: DocumentNode
}

declare module '*Search.js' {
  import { DocumentNode } from 'graphql'
  export const SearchQuery: DocumentNode
  export const Search_viewer: DocumentNode
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
