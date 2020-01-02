/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ToggleFavourite_media
// ====================================================

export interface ToggleFavourite_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The amount of user's who have favourited the media
   */
  readonly favourites: number | null;
  /**
   * If the media is marked as favourite by the current authenticated user
   */
  readonly isFavourite: boolean;
  /**
   * The type of the media; anime or manga
   */
  readonly type: MediaType | null;
}
