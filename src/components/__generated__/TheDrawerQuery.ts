/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TheDrawerQuery
// ====================================================

export interface TheDrawerQuery_Viewer_avatar {
  readonly __typename: "UserAvatar";
  /**
   * The avatar of user at its largest size
   */
  readonly large: string | null;
}

export interface TheDrawerQuery_Viewer {
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
  readonly avatar: TheDrawerQuery_Viewer_avatar | null;
  /**
   * The url for the user page on the AniList website
   */
  readonly siteUrl: string | null;
}

export interface TheDrawerQuery {
  /**
   * Get the currently authenticated user
   */
  readonly Viewer: TheDrawerQuery_Viewer | null;
}
