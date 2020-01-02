/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaListStatus, FuzzyDateInput, ScoreFormat } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SaveMediaListEntry
// ====================================================

export interface SaveMediaListEntry_SaveMediaListEntry {
  readonly __typename: "MediaList";
  /**
   * The id of the list entry
   */
  readonly id: number;
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
