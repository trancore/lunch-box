import { defineStore } from 'pinia';
import { ref } from 'vue';

type PriceRange = [number, number];

export type SearchFilterState = {
  genre: string[];
  sort?: string;
  priceRange: PriceRange;
  rating?: number;
};

const DEFAULT_PRICE_RANGE: PriceRange = [...PRICE_RANGE];

/**
 * Search Filter Store
 *
 * @module searchFilterStore
 */
export const useSearchFilterStore = defineStore('searchFilter', () => {
  const genre = ref<string[]>([]);
  const sort = ref<string>();
  const priceRange = ref<PriceRange>([...DEFAULT_PRICE_RANGE]);
  const rating = ref<number>(0);

  function setGenre(next: string[]) {
    genre.value = Array.from(new Set(next));
  }

  function toggleGenre(value: string, checked: boolean) {
    const next = new Set(genre.value);
    if (checked) {
      next.add(value);
    } else {
      next.delete(value);
    }
    genre.value = Array.from(next);
    return genre.value;
  }

  function setSort(value: string | undefined) {
    sort.value = value;
  }

  function setPriceRange(range: PriceRange) {
    priceRange.value = [...range] as PriceRange;
  }

  function setRating(nextRating: number | undefined) {
    rating.value = nextRating && nextRating > 0 ? nextRating : 0;
  }

  function getState(): SearchFilterState {
    return {
      genre: [...genre.value],
      sort: sort.value,
      priceRange: [...priceRange.value] as PriceRange,
      rating: rating.value > 0 ? rating.value : undefined,
    };
  }

  function reset() {
    genre.value = [];
    sort.value = undefined;
    priceRange.value = [...DEFAULT_PRICE_RANGE];
    rating.value = 0;
  }

  return {
    genre,
    sort,
    priceRange,
    rating,
    getState,
    setGenre,
    toggleGenre,
    setSort,
    setPriceRange,
    setRating,
    reset,
  };
});
