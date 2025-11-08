/**
 * スプレッドシートで管理しているジャンルに合わせてid, nameを設定してください
 */
export const GENRE = {
  ITALIAN: {
    ID: 1,
    NAME: 'イタリアン',
  },
  FRENCH: {
    ID: 2,
    NAME: 'フレンチ',
  },
  JAPANESE: {
    ID: 3,
    NAME: '和食',
  },
  CHINESE: {
    ID: 4,
    NAME: '中華',
  },
  CAFE: {
    ID: 5,
    NAME: 'カフェ',
  },
} as const;

export const GENRE_NAME_LIST = Object.entries(GENRE).map((genre) => {
  return genre[1].NAME;
});

export const RATING = {
  '☆☆☆☆☆': {
    ID: 1,
    NAME: '0以上',
    VALUE: 0,
  },
  '★☆☆☆☆': {
    ID: 2,
    NAME: '1以上',
    VALUE: 1,
  },
  '★★☆☆☆': {
    ID: 3,
    NAME: '2以上',
    VALUE: 2,
  },
  '★★★☆☆': {
    ID: 4,
    NAME: '3以上',
    VALUE: 3,
  },
  '★★★★☆': {
    ID: 5,
    NAME: '4以上',
    VALUE: 4,
  },
  '★★★★★': {
    ID: 6,
    NAME: '5以上',
    VALUE: 5,
  },
};

export const RATING_VALUE_LIST = Object.entries(RATING).map((rating) => {
  return rating[1].VALUE;
});
