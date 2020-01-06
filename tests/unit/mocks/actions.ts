import { DeletePending, SavePending } from '@/store/reducers/changes'

import { mockedMediaListEntry } from './mediaListEntry'

export const mockedSavePending: SavePending = {
  type: 'SAVE',
  id: 0,
  mediaId: 1,
  variables: {
    // ...mediaListToForm(mockedMediaListEntry, []),
    mediaId: 1,
  },
}

export const mockedDeletePending: DeletePending = {
  type: 'DELETE',
  id: 1,
  mediaId: 1,
  variables: {
    id: mockedMediaListEntry.id,
  },
}
