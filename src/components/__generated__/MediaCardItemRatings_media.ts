/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MediaCardItemRatings_media
// ====================================================

export interface MediaCardItemRatings_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * Mean score of all the user's scores of the media
   */
  readonly meanScore: number | null;
  /**
   * The number of users with the media on their list
   */
  readonly popularity: number | null;
}
