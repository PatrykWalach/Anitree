/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaType, MediaFormat, MediaStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: MediaCardItemSubtitle_media
// ====================================================

export interface MediaCardItemSubtitle_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
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
