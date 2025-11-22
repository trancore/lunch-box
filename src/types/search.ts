const genreList = Object.entries(SORT).map((sort) => ({
  id: sort[1].ID,
  name: sort[1].NAME,
  value: sort[0],
}));

export type SearchFiltering = {
  selectedSort?: (typeof genreList)[number];
  selectedGenre: (typeof GENRE_NAME_LIST)[number][];
  priceMin: number;
  priceMax: number;
  selectedRating: number;
};
