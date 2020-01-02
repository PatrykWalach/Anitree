/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MediaCardItemAvatar_media
// ====================================================

export interface MediaCardItemAvatar_media_coverImage {
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

export interface MediaCardItemAvatar_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The cover images of the media
   */
  readonly coverImage: MediaCardItemAvatar_media_coverImage | null;
}
