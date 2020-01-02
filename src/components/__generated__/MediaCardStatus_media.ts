/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaType, MediaListStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: MediaCardStatus_media
// ====================================================

export interface MediaCardStatus_media_mediaListEntry {
  readonly __typename: "MediaList";
  /**
   * The id of the list entry
   */
  readonly id: number;
  /**
   * The watching/reading status
   */
  readonly status: MediaListStatus | null;
  /**
   * The amount of episodes/chapters consumed by the user
   */
  readonly progress: number | null;
}

export interface MediaCardStatus_media {
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
   * The amount of episodes the anime has when complete
   */
  readonly episodes: number | null;
  /**
   * The amount of chapters the manga has when complete
   */
  readonly chapters: number | null;
  /**
   * The authenticated user's media list entry for the media
   */
  readonly mediaListEntry: MediaCardStatus_media_mediaListEntry | null;
}
