import { createVariations, matchSnapshot } from './utils'
import { mockedMedia, mockedMediaAndListEntry } from './mocks/media'
import MediaCardStatusReady from '@/components/MediaCardStatusReady.vue'
import { mockedMediaListEntry } from './mocks/mediaListEntry'

describe('MediaCardStatusReady', () => {
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
  }).forEach(settings => matchSnapshot(MediaCardStatusReady, settings))
})
