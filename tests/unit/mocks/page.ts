import { mockedMedia, mockedMediaAndListEntry } from './media'

export const mockedPage = {
  media: [],
  pageInfo: {
    currentPage: 1,
    hasNextPage: true,
    lastPage: 30904,
    total: 61808,
  },
}
export const mockedPageAndMedia = {
  ...mockedPage,
  media: [mockedMedia],
}
export const mockedPageAndMediaAndListEntry = {
  ...mockedPage,
  media: [mockedMediaAndListEntry],
}
