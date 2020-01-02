/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleFavouriteMutation
// ====================================================

export interface ToggleFavouriteMutation_ToggleFavourite_anime_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * If there is another page
   */
  readonly hasNextPage: boolean | null;
}

export interface ToggleFavouriteMutation_ToggleFavourite_anime {
  readonly __typename: "MediaConnection";
  /**
   * The pagination information
   */
  readonly pageInfo: ToggleFavouriteMutation_ToggleFavourite_anime_pageInfo | null;
}

export interface ToggleFavouriteMutation_ToggleFavourite_manga_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * If there is another page
   */
  readonly hasNextPage: boolean | null;
}

export interface ToggleFavouriteMutation_ToggleFavourite_manga {
  readonly __typename: "MediaConnection";
  /**
   * The pagination information
   */
  readonly pageInfo: ToggleFavouriteMutation_ToggleFavourite_manga_pageInfo | null;
}

export interface ToggleFavouriteMutation_ToggleFavourite {
  readonly __typename: "Favourites";
  /**
   * Favourite anime
   */
  readonly anime: ToggleFavouriteMutation_ToggleFavourite_anime | null;
  /**
   * Favourite manga
   */
  readonly manga: ToggleFavouriteMutation_ToggleFavourite_manga | null;
}

export interface ToggleFavouriteMutation {
  /**
   * Favourite or unfavourite an anime, manga, character, staff member, or studio
   */
  readonly ToggleFavourite: ToggleFavouriteMutation_ToggleFavourite | null;
}

export interface ToggleFavouriteMutationVariables {
  readonly animeId?: number | null;
  readonly mangaId?: number | null;
}