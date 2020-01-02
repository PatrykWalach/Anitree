/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaType, MediaFormat, MediaStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ChangeCardQuery
// ====================================================

export interface ChangeCardQuery_Media_title {
  readonly __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  readonly userPreferred: string | null;
}

export interface ChangeCardQuery_Media_coverImage {
  readonly __typename: "MediaCoverImage";
  /**
   * The cover image url of the media at medium size
   */
  readonly medium: string | null;
  /**
   * The cover image url of the media at a large size
   */
  readonly large: string | null;
  /**
   * The cover image url of the media at its largest size. If this size isn't available, large will be provided instead.
   */
  readonly extraLarge: string | null;
}

export interface ChangeCardQuery_Media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The official titles of the media in various languages
   */
  readonly title: ChangeCardQuery_Media_title | null;
  /**
   * The cover images of the media
   */
  readonly coverImage: ChangeCardQuery_Media_coverImage | null;
  /**
   * The type of the media; anime or manga
   */
  readonly type: MediaType | null;
  /**
   * The amount of chapters the manga has when complete
   */
  readonly chapters: number | null;
  /**
   * The amount of episodes the anime has when complete
   */
  readonly episodes: number | null;
  /**
   * The format the media was released in
   */
  readonly format: MediaFormat | null;
  /**
   * The current releasing status of the media
   */
  readonly status: MediaStatus | null;
}

export interface ChangeCardQuery {
  /**
   * Media query
   */
  readonly Media: ChangeCardQuery_Media | null;
}

export interface ChangeCardQueryVariables {
  readonly id?: number | null;
}
