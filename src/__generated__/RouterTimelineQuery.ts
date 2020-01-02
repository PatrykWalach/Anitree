/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RouterTimelineQuery
// ====================================================

export interface RouterTimelineQuery_Media_title {
  readonly __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  readonly userPreferred: string | null;
}

export interface RouterTimelineQuery_Media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The official titles of the media in various languages
   */
  readonly title: RouterTimelineQuery_Media_title | null;
}

export interface RouterTimelineQuery {
  /**
   * Media query
   */
  readonly Media: RouterTimelineQuery_Media | null;
}

export interface RouterTimelineQueryVariables {
  readonly id?: number | null;
}
