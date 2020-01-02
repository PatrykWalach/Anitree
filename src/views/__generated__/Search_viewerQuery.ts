/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search_viewerQuery
// ====================================================

export interface Search_viewerQuery_Viewer_options {
  readonly __typename: "UserOptions";
  /**
   * Whether the user has enabled viewing of 18+ content
   */
  readonly displayAdultContent: boolean | null;
}

export interface Search_viewerQuery_Viewer {
  readonly __typename: "User";
  /**
   * The id of the user
   */
  readonly id: number;
  /**
   * The user's general options
   */
  readonly options: Search_viewerQuery_Viewer_options | null;
}

export interface Search_viewerQuery {
  /**
   * Get the currently authenticated user
   */
  readonly Viewer: Search_viewerQuery_Viewer | null;
}
