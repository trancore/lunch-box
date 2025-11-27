import type { SelectChangeEvent } from 'primevue/select';

/**
 * 検索フィルタリング用のComposable
 * @module useSearchFiltering
 */
export function useSearchFiltering(shopList: Ref<ShopList>) {
  const { getState, setSort, toggleGenre, setPriceRange, setRating } =
    useSearchFilterStore();

  const isSyncingFromStore = ref(false);

  const sortList = Object.entries(SORT).map((sort) => ({
    id: sort[1].ID,
    name: sort[1].NAME,
    value: sort[0],
  }));
  const sortItems = ref(sortList);
  const selectedSort = ref<(typeof sortList)[number]>();
  function changeSort(event: SelectChangeEvent) {
    const value = event.value.value as string;
    setSort(value);
  }

  const genreList = computed(() => {
    const genreSet = new Set(shopList.value.map((shop: Shop) => shop.genre));
    return Array.from(genreSet).map((genre, index) => ({
      id: index + 1,
      name: genre,
    }));
  });
  const genreItems = computed(() => [
    {
      label: 'ジャンル',
      icon: 'pi pi-file',
      items: genreList.value,
    },
  ]);
  const selectedGenre = ref<string[]>([]);
  const selectedGenreJoined = computed(() => {
    return selectedGenre.value.length > 0
      ? selectedGenre.value.map((genre) => genre).join(', ')
      : undefined;
  });
  async function changeGenre(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const { value, checked } = input;
    if (!value || checked === undefined) return;

    const nextGenre = await toggleGenre(value, checked);
    selectedGenre.value = nextGenre as typeof GENRE_NAME_LIST;
  }

  const priceRange = ref<[number, number]>([...PRICE_RANGE]);
  const priceMin = computed(() => priceRange.value[0]);
  const priceMax = computed(() => priceRange.value[1]);

  const selectedRating = ref<number>(0);

  watch(
    () => getState(),
    (state) => {
      isSyncingFromStore.value = true;
      const matchedSort = sortItems.value.find(
        (item) => item.value === state.sort,
      );
      selectedSort.value = matchedSort ?? sortItems.value[0];
      selectedGenre.value = state.genre as typeof GENRE_NAME_LIST;
      priceRange.value = state.priceRange ?? [...PRICE_RANGE];
      selectedRating.value = state.rating ?? 0;
      nextTick(() => {
        isSyncingFromStore.value = false;
      });
    },
    { immediate: true, deep: true },
  );
  watch(
    priceRange,
    (range) => {
      if (isSyncingFromStore.value) return;
      setPriceRange(range);
    },
    { deep: true },
  );
  watch(selectedRating, (rating) => {
    if (isSyncingFromStore.value) return;
    setRating(rating);
  });

  return {
    sortItems,
    selectedSort,
    changeSort,
    genreItems,
    selectedGenre,
    selectedGenreJoined,
    changeGenre,
    priceRange,
    priceMin,
    priceMax,
    selectedRating,
  };
}
