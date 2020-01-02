/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MediaType, MediaStatus, MediaSeason, MediaSort, MediaFormat, MediaListStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchPageQuery
// ====================================================

export interface SearchPageQuery_Page_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * The current page
   */
  readonly currentPage: number | null;
  /**
   * If there is another page
   */
  readonly hasNextPage: boolean | null;
}

export interface SearchPageQuery_Page_media_startDate {
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

export interface SearchPageQuery_Page_media_endDate {
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

export interface SearchPageQuery_Page_media_coverImage {
  readonly __typename: "MediaCoverImage";
  /**
   * The cover image url of the media at medium size
   */
  readonly medium: string | null;
  /**
   * The cover image url of the media at a large size
   */
  readonly large: string | null;
  /**
   * The cover image url of the media at its largest size. If this size isn't available, large will be provided instead.
   */
  readonly extraLarge: string | null;
}

export interface SearchPageQuery_Page_media_studios_nodes {
  readonly __typename: "Studio";
  /**
   * The id of the studio
   */
  readonly id: number;
  /**
   * The name of the studio
   */
  readonly name: string;
}

export interface SearchPageQuery_Page_media_studios {
  readonly __typename: "StudioConnection";
  readonly nodes: ReadonlyArray<(SearchPageQuery_Page_media_studios_nodes | null)> | null;
}

export interface SearchPageQuery_Page_media_title {
  readonly __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  readonly userPreferred: string | null;
}

export interface SearchPageQuery_Page_media_mediaListEntry_startedAt {
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

export interface SearchPageQuery_Page_media_mediaListEntry_completedAt {
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

export interface SearchPageQuery_Page_media_mediaListEntry {
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
  readonly startedAt: SearchPageQuery_Page_media_mediaListEntry_startedAt | null;
  /**
   * When the entry was completed by the user
   */
  readonly completedAt: SearchPageQuery_Page_media_mediaListEntry_completedAt | null;
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

export interface SearchPageQuery_Page_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The first official release date of the media
   */
  readonly startDate: SearchPageQuery_Page_media_startDate | null;
  /**
   * The last official release date of the media
   */
  readonly endDate: SearchPageQuery_Page_media_endDate | null;
  /**
   * The banner image of the media
   */
  readonly bannerImage: string | null;
  /**
   * Short description of the media's story and characters
   */
  readonly description: string | null;
  /**
   * The cover images of the media
   */
  readonly coverImage: SearchPageQuery_Page_media_coverImage | null;
  /**
   * The companies who produced the media
   */
  readonly studios: SearchPageQuery_Page_media_studios | null;
  /**
   * Mean score of all the user's scores of the media
   */
  readonly meanScore: number | null;
  /**
   * The number of users with the media on their list
   */
  readonly popularity: number | null;
  /**
   * The type of the media; anime or manga
   */
  readonly type: MediaType | null;
  /**
   * The amount of chapters the manga has when complete
   */
  readonly chapters: number | null;
  /**
   * The amount of episodes the anime has when complete
   */
  readonly episodes: number | null;
  /**
   * The format the media was released in
   */
  readonly format: MediaFormat | null;
  /**
   * The current releasing status of the media
   */
  readonly status: MediaStatus | null;
  /**
   * The official titles of the media in various languages
   */
  readonly title: SearchPageQuery_Page_media_title | null;
  /**
   * The url for the media page on the AniList website
   */
  readonly siteUrl: string | null;
  /**
   * The amount of user's who have favourited the media
   */
  readonly favourites: number | null;
  /**
   * If the media is marked as favourite by the current authenticated user
   */
  readonly isFavourite: boolean;
  /**
   * Short description of the media's story and characters
   */
  readonly rawDescription: string | null;
  /**
   * The authenticated user's media list entry for the media
   */
  readonly mediaListEntry: SearchPageQuery_Page_media_mediaListEntry | null;
  /**
   * The amount of volumes the manga has when complete
   */
  readonly volumes: number | null;
}

export interface SearchPageQuery_Page {
  readonly __typename: "Page";
  /**
   * The pagination information
   */
  readonly pageInfo: SearchPageQuery_Page_pageInfo | null;
  readonly media: ReadonlyArray<(SearchPageQuery_Page_media | null)> | null;
}

export interface SearchPageQuery {
  readonly Page: SearchPageQuery_Page | null;
}

export interface SearchPageQueryVariables {
  readonly isAdult?: boolean | null;
  readonly search?: string | null;
  readonly idIn?: ReadonlyArray<(number | null)> | null;
  readonly page?: number | null;
  readonly includedTags?: ReadonlyArray<(string | null)> | null;
  readonly onList?: boolean | null;
  readonly year?: number | null;
  readonly type?: MediaType | null;
  readonly status?: ReadonlyArray<(MediaStatus | null)> | null;
  readonly season?: MediaSeason | null;
  readonly sort?: ReadonlyArray<(MediaSort | null)> | null;
  readonly perPage?: number | null;
}
