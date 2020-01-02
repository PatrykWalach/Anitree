/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ScoreFormat } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: MediaEdit_viewer
// ====================================================

export interface MediaEdit_viewer_mediaListOptions_mangaList {
  readonly __typename: "MediaListTypeOptions";
  /**
   * The names of the user's advanced scoring sections
   */
  readonly advancedScoring: ReadonlyArray<(string | null)> | null;
}

export interface MediaEdit_viewer_mediaListOptions_animeList {
  readonly __typename: "MediaListTypeOptions";
  /**
   * The names of the user's advanced scoring sections
   */
  readonly advancedScoring: ReadonlyArray<(string | null)> | null;
}

export interface MediaEdit_viewer_mediaListOptions {
  readonly __typename: "MediaListOptions";
  /**
   * The score format the user is using for media lists
   */
  readonly scoreFormat: ScoreFormat | null;
  /**
   * The user's manga list options
   */
  readonly mangaList: MediaEdit_viewer_mediaListOptions_mangaList | null;
  /**
   * The user's anime list options
   */
  readonly animeList: MediaEdit_viewer_mediaListOptions_animeList | null;
}

export interface MediaEdit_viewer {
  readonly __typename: "User";
  /**
   * The id of the user
   */
  readonly id: number;
  /**
   * The user's media list options
   */
  readonly mediaListOptions: MediaEdit_viewer_mediaListOptions | null;
}
