export const SORT = {
  RECOMMEND: {
    ID: 1,
    NAME: 'おすすめ順',
  },
  CHEAPER: {
    ID: 2,
    NAME: '価格の安い順',
  },
  HIGHER: {
    ID: 3,
    NAME: '価格の高い順',
  },
  HIGH_RATING: {
    ID: 4,
    NAME: '評価の高い順',
  },
} as const;

export const SORT_KEY_LIST = Object.entries(SORT).map((genre) => {
  return genre[0];
});

export const PRICE_RANGE = [0, 5000] as const;
