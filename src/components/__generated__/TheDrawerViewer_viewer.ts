/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TheDrawerViewer_viewer
// ====================================================

export interface TheDrawerViewer_viewer_avatar {
  readonly __typename: "UserAvatar";
  /**
   * The avatar of user at its largest size
   */
  readonly large: string | null;
}

export interface TheDrawerViewer_viewer {
  readonly __typename: "User";
  /**
   * The id of the user
   */
  readonly id: number;
  /**
   * The name of the user
   */
  readonly name: string;
  /**
   * The user's avatar images
   */
  readonly avatar: TheDrawerViewer_viewer_avatar | null;
  /**
   * The url for the user page on the AniList website
   */
  readonly siteUrl: string | null;
}
