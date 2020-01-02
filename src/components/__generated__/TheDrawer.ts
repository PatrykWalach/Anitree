/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TheDrawer
// ====================================================

export interface TheDrawer_Media_title {
  readonly __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  readonly userPreferred: string | null;
}

export interface TheDrawer_Media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The official titles of the media in various languages
   */
  readonly title: TheDrawer_Media_title | null;
}

export interface TheDrawer {
  /**
   * Media query
   */
  readonly Media: TheDrawer_Media | null;
}

export interface TheDrawerVariables {
  readonly id?: number | null;
}
