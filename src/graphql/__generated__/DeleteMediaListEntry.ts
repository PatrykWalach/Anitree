/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteMediaListEntry
// ====================================================

export interface DeleteMediaListEntry_DeleteMediaListEntry {
  readonly __typename: "Deleted";
  /**
   * If an item has been successfully deleted
   */
  readonly deleted: boolean | null;
}

export interface DeleteMediaListEntry {
  /**
   * Delete a media list entry
   */
  readonly DeleteMediaListEntry: DeleteMediaListEntry_DeleteMediaListEntry | null;
}

export interface DeleteMediaListEntryVariables {
  readonly id?: number | null;
}
