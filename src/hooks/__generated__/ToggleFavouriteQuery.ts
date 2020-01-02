/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ToggleFavouriteQuery
// ====================================================

export interface ToggleFavouriteQuery_Media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * If the media is marked as favourite by the current authenticated user
   */
  readonly isFavourite: boolean;
  /**
   * The amount of user's who have favourited the media
   */
  readonly favourites: number | null;
}

export interface ToggleFavouriteQuery {
  /**
   * Media query
   */
  readonly Media: ToggleFavouriteQuery_Media | null;
}

export interface ToggleFavouriteQueryVariables {
  readonly id?: number | null;
}
