import { MediaList } from '@/graphql/schema/mediaListCollection'

export const mockedMediaListEntry: MediaList = {
  __typename: 'MediaList',
  advancedScores: { Audio: 10, Characters: 10, Story: 10, Visuals: 7.75 },
  completedAt: { __typename: 'FuzzyDate', day: null, month: null, year: null },
  id: 52780395,
  mediaId: 1,
  notes:
    "\"Once, there was a tiger striped cat.\nThis cat, died a million deaths, revived and lived a million lives.\nAnd he had various owners that he didn't really care about, the cat wasn't afraid to die.\nThen ONE day, he met a white female cat, the two of them fell in love and lived together happily.\nWell, the years went by and the white female cat got old and passed away.\nThe Tiger Striped cat cried a million times, then he also died.\nBut this time.....he didn't come back.\"\n~Spike Spiegel",
  private: false,
  progress: 26,
  progressVolumes: null,
  repeat: 0,
  score: 9.4,
  startedAt: { __typename: 'FuzzyDate', day: null, month: null, year: null },
  status: 'COMPLETED',
}
