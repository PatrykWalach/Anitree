import { mockedMediaListEntry } from './mediaListEntry'

export const mockedMedia = {
  airingSchedule: {
    nodes: [],
  },
  bannerImage:
    'https://s4.anilist.co/file/anilistcdn/media/anime/banner/1-yBEAaZkGrrlO.jpg',
  chapters: null,

  coverImage: {
    color: '#e45d43',
    extraLarge:
      'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1-90fRJRDmt2f2.png',
    large:
      'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-90fRJRDmt2f2.png',
    medium:
      'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-90fRJRDmt2f2.png',
  },
  description:
    'Enter a world in the distant future, where Bounty Hunters roam the solar system. Spike and Jet, bounty hunting partners, set out on journeys in an ever struggling effort to win bounty rewards to survive.<br><br>\nWhile traveling, they meet up with other very interesting people. Could Faye, the beautiful and ridiculously poor gambler, Edward, the computer genius, and Ein, the engineered dog be a good addition to the group?',
  duration: 24,
  endDate: {
    day: 24,
    month: 4,
    year: 1999,
  },
  episodes: 26,

  format: 'TV',
  hashtag: null,

  id: 1,
  isFavourite: false,
  meanScore: 86,
  mediaListEntry: null,
  nextAiringEpisode: null,
  rankings: [
    {
      allTime: true,
      context: 'highest rated all time',
      rank: 23,
      season: null,
      type: 'RATED',
      year: null,
    },
    {
      allTime: true,
      context: 'most popular all time',
      rank: 40,
      season: null,
      type: 'POPULAR',
      year: null,
    },
    {
      allTime: false,
      context: 'highest rated',
      rank: 1,
      season: null,
      type: 'RATED',
      year: 1998,
    },
    {
      allTime: false,
      context: 'most popular',
      rank: 1,
      season: null,
      type: 'POPULAR',
      year: 1998,
    },
  ],
  relations: {
    edges: [
      {
        id: 3,
        node: {
          id: 5,
          type: 'ANIME',
        },
        relationType: 'SIDE_STORY',
      },
      {
        id: 4,
        node: {
          id: 17205,
          type: 'ANIME',
        },
        relationType: 'SIDE_STORY',
      },
      {
        id: 29272,
        node: {
          id: 30173,
          type: 'MANGA',
        },
        relationType: 'ADAPTATION',
      },
      {
        id: 29274,
        node: {
          id: 30174,
          type: 'MANGA',
        },
        relationType: 'ADAPTATION',
      },
      {
        id: 29951,
        node: {
          id: 4037,
          type: 'ANIME',
        },
        relationType: 'SUMMARY',
      },
    ],
  },
  season: 'SPRING',
  seasonInt: 982,
  siteUrl: 'https://anilist.co/anime/1',
  source: 'ORIGINAL',
  startDate: {
    day: 3,
    month: 4,
    year: 1998,
  },
  stats: {
    scoreDistribution: [
      {
        amount: 109,
        score: 10,
      },
      {
        amount: 39,
        score: 20,
      },
      {
        amount: 88,
        score: 30,
      },
      {
        amount: 203,
        score: 40,
      },
      {
        amount: 529,
        score: 50,
      },
      {
        amount: 1034,
        score: 60,
      },
      {
        amount: 3185,
        score: 70,
      },
      {
        amount: 6754,
        score: 80,
      },
      {
        amount: 10383,
        score: 90,
      },
      {
        amount: 10540,
        score: 100,
      },
    ],
    statusDistribution: [
      {
        amount: 4806,
        status: 'CURRENT',
      },
      {
        amount: 19457,
        status: 'PLANNING',
      },
      {
        amount: 40963,
        status: 'COMPLETED',
      },
      {
        amount: 1445,
        status: 'DROPPED',
      },
      {
        amount: 4662,
        status: 'PAUSED',
      },
    ],
  },
  status: 'FINISHED',
  studios: {
    nodes: [
      {
        id: 14,
        name: 'Sunrise',
      },
    ],
  },

  tags: [
    {
      id: 63,
      name: 'Space',
      rank: 94,
    },
    {
      id: 483,
      name: 'LGBTQ Issues',
      rank: 92,
    },
    {
      id: 193,
      name: 'Episodic',
      rank: 85,
    },
    {
      id: 105,
      name: 'Ensemble Cast',
      rank: 84,
    },
    {
      id: 648,
      name: 'Crime',
      rank: 79,
    },
    {
      id: 109,
      name: 'Primarily Adult Cast',
      rank: 77,
    },
    {
      id: 327,
      name: 'Noir',
      rank: 76,
    },
    {
      id: 157,
      name: 'Guns',
      rank: 72,
    },
    {
      id: 489,
      name: 'Drugs',
      rank: 70,
    },
    {
      id: 85,
      name: 'Tragedy',
      rank: 70,
    },
    {
      id: 82,
      name: 'Male Protagonist',
      rank: 68,
    },
    {
      id: 391,
      name: 'Philosophy',
      rank: 60,
    },
    {
      id: 30,
      name: 'Martial Arts',
      rank: 60,
    },
    {
      id: 240,
      name: 'Amnesia',
      rank: 58,
    },
    {
      id: 88,
      name: 'Primarily Male Cast',
      rank: 48,
    },
    {
      id: 104,
      name: 'Anti-Hero',
      rank: 46,
    },
    {
      id: 199,
      name: 'Yakuza',
      rank: 45,
    },
  ],
  title: {
    english: 'Cowboy Bebop',
    native: 'カウボーイビバップ',
    romaji: 'Cowboy Bebop',
  },
  trailer: null,

  type: 'ANIME',

  volumes: null,
}

export const mockedMediaAndListEntry = {
  ...mockedMedia,
  mediaListEntry: mockedMediaListEntry,
}
