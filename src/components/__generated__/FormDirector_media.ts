/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FormDirector_media
// ====================================================

export interface FormDirector_media {
  readonly __typename: "Media";
  /**
   * The id of the media
   */
  readonly id: number;
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
