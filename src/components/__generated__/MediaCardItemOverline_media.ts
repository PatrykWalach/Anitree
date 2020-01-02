/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MediaCardItemOverline_media
// ====================================================

export interface MediaCardItemOverline_media_studios_nodes {
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

export interface MediaCardItemOverline_media_studios {
  readonly __typename: "StudioConnection";
  readonly nodes: ReadonlyArray<(MediaCardItemOverline_media_studios_nodes | null)> | null;
}

export interface MediaCardItemOverline_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
  /**
   * The companies who produced the media
   */
  readonly studios: MediaCardItemOverline_media_studios | null;
}
