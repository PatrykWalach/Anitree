/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ToggleFavourite_updateQuery
// ====================================================

export interface ToggleFavourite_updateQuery_Media {
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

export interface ToggleFavourite_updateQuery {
  /**
   * Media query
   */
  readonly Media: ToggleFavourite_updateQuery_Media | null;
}

export interface ToggleFavourite_updateQueryVariables {
  readonly id?: number | null;
}
