/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaType, MediaFormat, MediaStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: MediaCardItem_media
// ====================================================

export interface MediaCardItem_media_coverImage {
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

export interface MediaCardItem_media_studios_nodes {
  readonly __typename: "Studio";
  /**
   * The id of the studio
   */
  readonly id: number;
  /**
   * The name of the studio
   */
  readonly name: string;
}

export interface MediaCardItem_media_studios {
  readonly __typename: "StudioConnection";
  readonly nodes: ReadonlyArray<(MediaCardItem_media_studios_nodes | null)> | null;
}

export interface MediaCardItem_media_title {
  readonly __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  readonly userPreferred: string | null;
}

export interface MediaCardItem_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * Short description of the media's story and characters
   */
  readonly description: string | null;
  /**
   * The cover images of the media
   */
  readonly coverImage: MediaCardItem_media_coverImage | null;
  /**
   * The companies who produced the media
   */
  readonly studios: MediaCardItem_media_studios | null;
  /**
   * Mean score of all the user's scores of the media
   */
  readonly meanScore: number | null;
  /**
   * The number of users with the media on their list
   */
  readonly popularity: number | null;
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
  /**
   * The official titles of the media in various languages
   */
  readonly title: MediaCardItem_media_title | null;
}
