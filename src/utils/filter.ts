type RecommendOptions = {
  genre: (typeof GENRE_NAME_LIST)[number] | undefined;
  rating: (typeof RATING_VALUE_LIST)[number] | undefined;
};

export function filter() {
  const { transfoemRatingToNumber } = transform();

  /**
   * おすすめのお店のフィルタリング処理
   *
   * @param shopList 店舗リスト
   * @param options フィルタリングオプション
   * @returns おすすめのお店リスト
   */
  function filterRecommendShopList(
    shopList: ShopList,
    options: RecommendOptions,
  ) {
    if (!options) return shopList;

    const genre = options.genre;
    const rating = options.rating || 0;

    const filteredGenreShopList = genre
      ? shopList.filter((shop) => shop.genre === genre)
      : shopList;
    const filteredGenreAndRatingShopList = rating
      ? filteredGenreShopList.filter(
          (shop) => transfoemRatingToNumber(shop.rating) >= rating,
        )
      : filteredGenreShopList;

    const result: ShopList = [];

    const limit =
      filteredGenreAndRatingShopList.length < 4
        ? filteredGenreAndRatingShopList.length
        : 4;
    while (result.length < limit) {
      const randomIndex = Math.floor(
        Math.random() * filteredGenreAndRatingShopList.length,
      );
      const randomShop = filteredGenreAndRatingShopList[randomIndex];
      if (randomShop && !result.includes(randomShop)) {
        result.push(randomShop);
      }
    }

    return result;
  }

  return { filterRecommendShopList };
}
