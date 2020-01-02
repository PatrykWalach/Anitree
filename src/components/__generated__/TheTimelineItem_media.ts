/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TheTimelineItem_media
// ====================================================

export interface TheTimelineItem_media_startDate {
  readonly __typename: "FuzzyDate";
  /**
   * Numeric Day (24)
   */
  readonly day: number | null;
  /**
   * Numeric Year (2017)
   */
  readonly year: number | null;
  /**
   * Numeric Month (3)
   */
  readonly month: number | null;
}

export interface TheTimelineItem_media_endDate {
  readonly __typename: "FuzzyDate";
  /**
   * Numeric Day (24)
   */
  readonly day: number | null;
  /**
   * Numeric Year (2017)
   */
  readonly year: number | null;
  /**
   * Numeric Month (3)
   */
  readonly month: number | null;
}

export interface TheTimelineItem_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The first official release date of the media
   */
  readonly startDate: TheTimelineItem_media_startDate | null;
  /**
   * The last official release date of the media
   */
  readonly endDate: TheTimelineItem_media_endDate | null;
}