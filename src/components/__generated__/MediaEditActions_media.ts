/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MediaEditActions_media
// ====================================================

export interface MediaEditActions_media_mediaListEntry {
  readonly __typename: "MediaList";
  /**
   * The id of the list entry
   */
  readonly id: number;
}

export interface MediaEditActions_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The authenticated user's media list entry for the media
   */
  readonly mediaListEntry: MediaEditActions_media_mediaListEntry | null;
}
