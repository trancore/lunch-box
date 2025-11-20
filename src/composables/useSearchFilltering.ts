import type { SelectChangeEvent } from 'primevue/select';

export function useSearchFiltering() {
  const route = useRoute();
  const router = useRouter();

  const { getState, setSort, toggleGenre, setPriceRange, setRating } = query(
    route,
    router,
  );

  const isSyncingFromRoute = ref(false);

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

  const genreList = Object.entries(GENRE).map((genre) => {
    return { id: genre[1].ID, name: genre[1].NAME };
  });
  const genreItems = ref([
    {
      label: 'ジャンル',
      icon: 'pi pi-file',
      items: genreList,
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
    selectedGenre.value = nextGenre;
  }

  const priceRange = ref<[number, number]>([...PRICE_RANGE]);
  const priceMin = computed(() => priceRange.value[0]);
  const priceMax = computed(() => priceRange.value[1]);

  const selectedRating = ref<number>(0);

  watch(
    () => route.query,
    () => {
      isSyncingFromRoute.value = true;
      const state = getState();
      const matchedSort = sortItems.value.find(
        (item) => item.value === state.sort,
      );
      selectedSort.value = matchedSort ?? sortItems.value[0];
      selectedGenre.value = state.genre;
      priceRange.value = state.priceRange ?? [...PRICE_RANGE];
      selectedRating.value = state.rating ?? 0;
      nextTick(() => {
        isSyncingFromRoute.value = false;
      });
    },
    { immediate: true, deep: true },
  );
  watch(
    priceRange,
    (range) => {
      if (isSyncingFromRoute.value) return;
      setPriceRange(range);
    },
    { deep: true },
  );
  watch(selectedRating, (rating) => {
    if (isSyncingFromRoute.value) return;
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
