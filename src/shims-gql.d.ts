declare module '*ChangeCard.gql.js' {
  import { DocumentNode } from 'graphql'
  export const ChangeCardQuery: DocumentNode
}
declare module '*TheDrawer.gql.js' {
  import { DocumentNode } from 'graphql'
  export const TheDrawerQuery: DocumentNode
}

declare module '*Home.gql.js' {
  import { DocumentNode } from 'graphql'
  export const HomeQuery: DocumentNode
  // export const ToggleFavouriteQuery: DocumentNode
  // export const ToggleFavouriteMutation: DocumentNode
}
declare module '*Search.gql.js' {
  import { DocumentNode } from 'graphql'
  export const SearchQuery: DocumentNode
  // export const Search_viewer: DocumentNode
}
declare module '*Timeline.gql.js' {
  import { DocumentNode } from 'graphql'
  export const TimelineQuery: DocumentNode
  export const TimelinePrefetchQuery: DocumentNode
}

declare module '*DeleteMediaListEntry.gql.js' {
  import { DocumentNode } from 'graphql'
  export const DeleteMediaListEntryQuery: DocumentNode
  export const DeleteMediaListEntryMutation: DocumentNode
}

declare module '*SaveMediaListEntry.gql.js' {
  import { DocumentNode } from 'graphql'
  export const SaveMediaListEntryQuery: DocumentNode
  export const SaveMediaListEntryMutation: DocumentNode
}
declare module '*ToggleFavourite.gql.js' {
  import { DocumentNode } from 'graphql'
  export const ToggleFavouriteQuery: DocumentNode
  export const ToggleFavouriteMutation: DocumentNode
}

declare module '*App.gql.js' {
  import { DocumentNode } from 'graphql'
  export const AppQuery: DocumentNode
}
declare module '*Router.gql.js' {
  import { DocumentNode } from 'graphql'
  export const RouterTimelineQuery: DocumentNode
  export const RouterTimelineAppBarQuery: DocumentNode
  export const RouterTimelineDrawerQuery: DocumentNode
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
