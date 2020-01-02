import { DeletePending, SavePending } from '@/store/reducers/changes'
import { mediaListToForm } from '@/graphql'
import { mockedMediaListEntry } from './mediaListEntry'

export const mockedSavePending: SavePending = {
  id: 0,
  mediaId: 1,
  type: 'SAVE',
  variables: {
    ...mediaListToForm(mockedMediaListEntry, []),
    mediaId: 1,
  },
}

export const mockedDeletePending: DeletePending = {
  id: 1,
  mediaId: 1,
  type: 'DELETE',
  variables: {
    id: mockedMediaListEntry.id,
  },
}
