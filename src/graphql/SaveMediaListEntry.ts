/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaListStatus, FuzzyDateInput, ScoreFormat } from "../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SaveMediaListEntry
// ====================================================

export interface SaveMediaListEntry_SaveMediaListEntry_startedAt {
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

export interface SaveMediaListEntry_SaveMediaListEntry_completedAt {
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

export interface SaveMediaListEntry_SaveMediaListEntry {
  readonly __typename: "MediaList";
  /**
   * The id of the list entry
   */
  readonly id: number;
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
   * If the entry should only be visible to authenticated user
   */
  readonly private: boolean | null;
  /**
   * Text notes
   */
  readonly notes: string | null;
  /**
   * Map of advanced scores with name keys
   */
  readonly advancedScores: any | null;
  /**
   * When the entry was started by the user
   */
  readonly startedAt: SaveMediaListEntry_SaveMediaListEntry_startedAt | null;
  /**
   * When the entry was completed by the user
   */
  readonly completedAt: SaveMediaListEntry_SaveMediaListEntry_completedAt | null;
}

export interface SaveMediaListEntry {
  /**
   * Create or update a media list entry
   */
  readonly SaveMediaListEntry: SaveMediaListEntry_SaveMediaListEntry | null;
}

export interface SaveMediaListEntryVariables {
  readonly id?: number | null;
  readonly mediaId?: number | null;
  readonly status?: MediaListStatus | null;
  readonly score?: number | null;
  readonly scoreRaw?: number | null;
  readonly progress?: number | null;
  readonly progressVolumes?: number | null;
  readonly repeat?: number | null;
  readonly private?: boolean | null;
  readonly notes?: string | null;
  readonly advancedScores?: ReadonlyArray<(number | null)> | null;
  readonly startedAt?: FuzzyDateInput | null;
  readonly completedAt?: FuzzyDateInput | null;
  readonly format?: ScoreFormat | null;
}
