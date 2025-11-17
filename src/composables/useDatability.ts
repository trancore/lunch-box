type DataName = 'recommend' | 'search' | 'shops-detail';
type RecommendOptions = {
  genre: (typeof GENRE_NAME_LIST)[number] | undefined;
  rating: (typeof RATING_VALUE_LIST)[number] | undefined;
};
type Options<S> = S extends 'recommend'
  ? Ref<RecommendOptions>
  : Ref<undefined>;

export function useDatability<S extends DataName>(
  name: S,
  options: Options<S>,
) {
  const { transfoemRatingToNumber } = transform();

  const status = ref<Status>('idle');
  const data = ref<SheetValues | undefined>(undefined);
  const error = ref<Error>();

  const shopList = computed<ShopList>(() => {
    const dataWithoutHeader = data.value?.slice(1) || [];
    return dataWithoutHeader.map((row) => {
      return {
        id: Number(row[0]),
        url: row[1],
        name: row[2],
        address: row[3],
        lat: row[4],
        lng: row[5],
        genre: row[6] as (typeof GENRE_NAME_LIST)[number],
        budget: Number(row[7]),
        openAt: new Date(row[8]),
        closeAt: new Date(row[9]),
        regularHoliday: row[10],
        rating: row[11] as unknown as Rating,
        introduction: row[12],
        createdAt: new Date(row[13]),
        updatedAt: new Date(row[14]),
      };
    });
  });

  function whichShopList(options: Options<S>) {
    switch (name) {
      case 'recommend':
        return filterRecommendShopList(shopList.value, options);
      case 'search':
      case 'shops-detail':
        return shopList.value;
      default:
        return [];
    }
  }

  function filterRecommendShopList(shopList: ShopList, options: Options<S>) {
    if (!options) return shopList;

    const genre = options.value?.genre;
    const rating = options.value?.rating || 0;

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

  const formattedShopList = computed({
    get: () => whichShopList(options),
    set: () => whichShopList(options),
  });

  async function fetchData() {
    status.value = 'loading';
    try {
      const { data: dataSpreadsheet } = await useSpreadsheet();
      data.value = dataSpreadsheet.value;
      status.value = 'success';
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      } else {
        error.value = new Error(String(err));
      }
      status.value = 'error';
    }
  }

  watch(
    options,
    async () => {
      formattedShopList.value = whichShopList(options);
    },
    { deep: true },
  );

  return { data: formattedShopList, error, status, fetch: fetchData };
}
