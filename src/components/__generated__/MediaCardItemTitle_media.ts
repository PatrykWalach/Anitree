/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MediaCardItemTitle_media
// ====================================================

export interface MediaCardItemTitle_media_title {
  readonly __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  readonly userPreferred: string | null;
}

export interface MediaCardItemTitle_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The official titles of the media in various languages
   */
  readonly title: MediaCardItemTitle_media_title | null;
}
