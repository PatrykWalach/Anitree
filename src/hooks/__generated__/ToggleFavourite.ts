/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleFavourite
// ====================================================

export interface ToggleFavourite_ToggleFavourite_anime_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * If there is another page
   */
  readonly hasNextPage: boolean | null;
}

export interface ToggleFavourite_ToggleFavourite_anime {
  readonly __typename: "MediaConnection";
  /**
   * The pagination information
   */
  readonly pageInfo: ToggleFavourite_ToggleFavourite_anime_pageInfo | null;
}

export interface ToggleFavourite_ToggleFavourite_manga_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * If there is another page
   */
  readonly hasNextPage: boolean | null;
}

export interface ToggleFavourite_ToggleFavourite_manga {
  readonly __typename: "MediaConnection";
  /**
   * The pagination information
   */
  readonly pageInfo: ToggleFavourite_ToggleFavourite_manga_pageInfo | null;
}

export interface ToggleFavourite_ToggleFavourite {
  readonly __typename: "Favourites";
  /**
   * Favourite anime
   */
  readonly anime: ToggleFavourite_ToggleFavourite_anime | null;
  /**
   * Favourite manga
   */
  readonly manga: ToggleFavourite_ToggleFavourite_manga | null;
}

export interface ToggleFavourite {
  /**
   * Favourite or unfavourite an anime, manga, character, staff member, or studio
   */
  readonly ToggleFavourite: ToggleFavourite_ToggleFavourite | null;
}

export interface ToggleFavouriteVariables {
  readonly animeId?: number | null;
  readonly mangaId?: number | null;
}
