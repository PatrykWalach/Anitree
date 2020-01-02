/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Share_media
// ====================================================

export interface Share_media_title {
  readonly __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  readonly userPreferred: string | null;
}

export interface Share_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The url for the media page on the AniList website
   */
  readonly siteUrl: string | null;
  /**
   * The official titles of the media in various languages
   */
  readonly title: Share_media_title | null;
  /**
   * Short description of the media's story and characters
   */
  readonly rawDescription: string | null;
}
