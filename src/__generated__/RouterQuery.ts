/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RouterQuery
// ====================================================

export interface RouterQuery_Media_title {
  readonly __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  readonly userPreferred: string | null;
}

export interface RouterQuery_Media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The official titles of the media in various languages
   */
  readonly title: RouterQuery_Media_title | null;
}

export interface RouterQuery {
  /**
   * Media query
   */
  readonly Media: RouterQuery_Media | null;
}

export interface RouterQueryVariables {
  readonly id?: number | null;
}
