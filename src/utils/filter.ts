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

  /**
   * 検索結果のお店リストのフィルタリング処理
   * @param shopList 店舗リスト
   * @param searchFiltering 検索フィルタリング条件
   * @returns フィルタリング後の店舗リスト
   */
  function filterSearchResultShopList(
    shopList: ShopList,
    searchFiltering: SearchFiltering,
  ) {
    let filteredShopList = shopList;
    const { selectedSort, selectedGenre, priceMin, priceMax, selectedRating } =
      searchFiltering;

    // ジャンルでフィルタリング
    if (selectedGenre.length > 0) {
      filteredShopList = filteredShopList.filter((shop) =>
        selectedGenre.includes(shop.genre),
      );
    }

    // 価格帯でフィルタリング
    filteredShopList = filteredShopList.filter(
      (shop) => shop.budget >= priceMin && shop.budget <= priceMax,
    );

    // 評価でフィルタリング
    if (selectedRating > 0) {
      filteredShopList = filteredShopList.filter(
        (shop) => transfoemRatingToNumber(shop.rating) >= selectedRating,
      );
    }

    // ソート
    if (selectedSort) {
      switch (selectedSort.name) {
        case '価格の安い順':
          filteredShopList.sort((a, b) => a.budget - b.budget);
          break;
        case '価格の高い順':
          filteredShopList.sort((a, b) => b.budget - a.budget);
          break;
        case '評価の高い順':
          filteredShopList.sort(
            (a, b) =>
              transfoemRatingToNumber(b.rating) -
              transfoemRatingToNumber(a.rating),
          );
          break;
        default:
          break;
      }
    }

    return filteredShopList;
  }

  return { filterRecommendShopList, filterSearchResultShopList };
}
