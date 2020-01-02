/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaType, MediaListStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: MediaEditItems_media
// ====================================================

export interface MediaEditItems_media_mediaListEntry_startedAt {
  readonly __typename: "FuzzyDate";
  /**
   * Numeric Year (2017)
   */
  readonly year: number | null;
  /**
   * Numeric Month (3)
   */
  readonly month: number | null;
  /**
   * Numeric Day (24)
   */
  readonly day: number | null;
}

export interface MediaEditItems_media_mediaListEntry_completedAt {
  readonly __typename: "FuzzyDate";
  /**
   * Numeric Year (2017)
   */
  readonly year: number | null;
  /**
   * Numeric Month (3)
   */
  readonly month: number | null;
  /**
   * Numeric Day (24)
   */
  readonly day: number | null;
}

export interface MediaEditItems_media_mediaListEntry {
  readonly __typename: "MediaList";
  /**
   * The id of the list entry
   */
  readonly id: number;
  /**
   * Map of advanced scores with name keys
   */
  readonly advancedScores: any | null;
  /**
   * When the entry was started by the user
   */
  readonly startedAt: MediaEditItems_media_mediaListEntry_startedAt | null;
  /**
   * When the entry was completed by the user
   */
  readonly completedAt: MediaEditItems_media_mediaListEntry_completedAt | null;
  /**
   * If the entry should only be visible to authenticated user
   */
  readonly private: boolean | null;
  /**
   * The id of the media
   */
  readonly mediaId: number;
  /**
   * The watching/reading status
   */
  readonly status: MediaListStatus | null;
  /**
   * The score of the entry
   */
  readonly score: number | null;
  /**
   * The amount of episodes/chapters consumed by the user
   */
  readonly progress: number | null;
  /**
   * The amount of volumes read by the user
   */
  readonly progressVolumes: number | null;
  /**
   * The amount of times the user has rewatched/read the media
   */
  readonly repeat: number | null;
  /**
   * Text notes
   */
  readonly notes: string | null;
}

export interface MediaEditItems_media {
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
   * The authenticated user's media list entry for the media
   */
  readonly mediaListEntry: MediaEditItems_media_mediaListEntry | null;
  /**
   * The amount of volumes the manga has when complete
   */
  readonly volumes: number | null;
  /**
   * The amount of chapters the manga has when complete
   */
  readonly chapters: number | null;
  /**
   * The amount of episodes the anime has when complete
   */
  readonly episodes: number | null;
}
