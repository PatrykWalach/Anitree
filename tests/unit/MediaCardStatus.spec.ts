import { createVariations, matchSnapshot } from './utils'
import { mockedMedia, mockedMediaAndListEntry } from './mocks/media'
import MediaCardStatus from '@/components/MediaCardStatus.vue'
import { mockedMediaListEntry } from './mocks/mediaListEntry'

describe('MediaCardStatus', () => {
  createVariations({
    propsData: {
      media: () => [
        mockedMedia,
        mockedMediaAndListEntry,
        ...createVariations({
          ...mockedMedia,
          mediaListEntry: {
            ...mockedMediaListEntry,
            status: () => [
              'CURRENT',
              'PLANNING',
              'COMPLETED',
              'DROPPED',
              'PAUSED',
              'REPEATING',
            ],
          },
        }),
      ],
    },
  }).forEach(settings => matchSnapshot(MediaCardStatus, settings))
})
