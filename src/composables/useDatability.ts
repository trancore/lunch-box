type DataName = 'recommend' | 'search' | 'shops-detail';
type RecommendOptions = {
  genre: string;
  rating: number;
};

export async function useDatability<
  T extends DataName,
  S extends RecommendOptions,
>(name: T, options: T extends 'recommend' ? S : undefined) {
  const { transfoemRatingToNumber } = transform();
  const { data, error, status, refreshData } = await useSpreadsheet();

  const shopList = computed<ShopList>(() => {
    const dataWithoutHeader = data.value?.slice(1) || [];
    const result = dataWithoutHeader.map((row) => {
      return {
        id: Number(row[0]),
        url: row[1],
        name: row[2],
        genre: row[3],
        budget: Number(row[4]),
        openAt: new Date(row[5]),
        closeAt: new Date(row[6]),
        rating: row[7] as unknown as Rating,
        introduction: row[8],
        createdAt: new Date(row[9]),
        updatedAt: new Date(row[10]),
      };
    });

    switch (name) {
      case 'recommend':
        return filterRecommendShopList(result);
      case 'search':
      case 'shops-detail':
        return result;
      default:
        return [];
    }
  });

  function filterRecommendShopList(shopList: ShopList) {
    if (!options) return [];

    const genre = options.genre;
    const rating = options.rating;

    const filteredGenreShopList = shopList.filter(
      (shop) => shop.genre === genre,
    );
    const filteredGenreAndRatingShopList = filteredGenreShopList.filter(
      (shop) => transfoemRatingToNumber(shop.rating) >= rating,
    );

    const result: ShopList = [];

    while (result.length < 4) {
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

  async function refresh() {
    await refreshData();
  }

  return { data: shopList, error, status, refresh };
}
