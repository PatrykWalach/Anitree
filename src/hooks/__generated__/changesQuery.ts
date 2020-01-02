/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChangesQuery
// ====================================================

export interface ChangesQuery_Media_mediaListEntry {
  readonly __typename: "MediaList";
  /**
   * The id of the list entry
   */
  readonly id: number;
}

export interface ChangesQuery_Media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The authenticated user's media list entry for the media
   */
  readonly mediaListEntry: ChangesQuery_Media_mediaListEntry | null;
}

export interface ChangesQuery {
  /**
   * Media query
   */
  readonly Media: ChangesQuery_Media | null;
}

export interface ChangesQueryVariables {
  readonly id?: number | null;
}
