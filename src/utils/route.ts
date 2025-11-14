import { isNavigationFailure } from 'vue-router';
import type {
  LocationQueryRaw,
  LocationQueryValue,
  LocationQueryValueRaw,
  RouteLocationNormalizedLoaded,
  Router,
} from 'vue-router';

type SearchQueryState = {
  genre: string[];
  sort?: string;
  priceRange?: [number, number];
  rating?: number;
};

type SearchQueryManagerOptions = {
  path?: string;
};

type PossibleQueryValue =
  | LocationQueryValue
  | LocationQueryValue[]
  | LocationQueryValueRaw
  | LocationQueryValueRaw[]
  | undefined;

function toSingleString(input: PossibleQueryValue): string | undefined {
  const [first] = toStringArray(input);
  return first;
}

function toStringArray(input: PossibleQueryValue): string[] {
  if (input === undefined || input === null) return [];
  const normalized = Array.isArray(input) ? [...input] : [input];
  return normalized.filter(
    (item): item is string => typeof item === 'string' && item.length > 0,
  );
}

function isSameQuery(
  current: RouteLocationNormalizedLoaded['query'],
  target: LocationQueryRaw,
): boolean {
  const normalize = (query: Record<string, unknown>) => {
    const entries = Object.entries(query)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, [...value].map(String).sort()];
        }
        if (value === null) return [key, null];
        return [key, String(value)];
      });

    return Object.fromEntries(entries);
  };

  const currentNormalized = normalize(current);
  const targetNormalized = normalize(target);

  const currentKeys = Object.keys(currentNormalized).sort();
  const targetKeys = Object.keys(targetNormalized).sort();

  if (
    currentKeys.length !== targetKeys.length ||
    currentKeys.some((key, index) => key !== targetKeys[index])
  ) {
    return false;
  }

  return currentKeys.every((key) => {
    const currentValue = currentNormalized[key];
    const targetValue = targetNormalized[key];

    if (Array.isArray(currentValue) && Array.isArray(targetValue)) {
      if (currentValue.length !== targetValue.length) return false;
      return currentValue.every(
        (item, index) => String(item) === String(targetValue[index]),
      );
    }

    return currentValue === targetValue;
  });
}

async function pushQuery(
  router: Router,
  route: RouteLocationNormalizedLoaded,
  query: LocationQueryRaw,
  options: SearchQueryManagerOptions,
) {
  if (
    isSameQuery(route.query, query) &&
    route.path === (options.path ?? route.path)
  ) {
    return;
  }

  try {
    await router.push({
      path: options.path ?? route.path ?? '/',
      query,
    });
  } catch (error) {
    if (!isNavigationFailure(error)) {
      throw error;
    }
  }
}

export function query(
  route: RouteLocationNormalizedLoaded,
  router: Router,
  options: SearchQueryManagerOptions = {},
) {
  const getState = (): SearchQueryState => {
    const genre = toStringArray(route.query.genre);
    const sort = toSingleString(route.query.sort);
    const priceFrom = toSingleString(route.query.priceFrom);
    const priceTo = toSingleString(route.query.priceTo);
    const ratingString = toSingleString(route.query.rating);

    const priceRange =
      priceFrom !== undefined && priceTo !== undefined
        ? ([Number(priceFrom), Number(priceTo)] as [number, number])
        : undefined;

    const rating =
      ratingString !== undefined && ratingString !== null
        ? Number(ratingString)
        : undefined;

    return {
      genre,
      sort,
      priceRange:
        priceRange && priceRange.every((value) => !Number.isNaN(value))
          ? priceRange
          : undefined,
      rating:
        rating !== undefined && !Number.isNaN(rating) ? rating : undefined,
    };
  };

  const toggleGenre = async (value: string, checked: boolean) => {
    const query: LocationQueryRaw = { ...route.query };
    const genreValues = toStringArray(query.genre);

    const nextGenre = checked
      ? Array.from(new Set([...genreValues, value]))
      : genreValues.filter((item) => item !== value);

    if (nextGenre.length === 0) {
      delete query.genre;
    } else {
      query.genre = nextGenre;
    }

    await pushQuery(router, route, query, options);
    return nextGenre;
  };

  const setSort = async (value: string | undefined) => {
    const query: LocationQueryRaw = { ...route.query };

    if (!value) {
      delete query.sort;
    } else {
      query.sort = value;
    }

    await pushQuery(router, route, query, options);
    return value;
  };

  const setPriceRange = async (range: [number, number]) => {
    const [from, to] = range;
    const query: LocationQueryRaw = { ...route.query };

    query.priceFrom = String(from);
    query.priceTo = String(to);

    await pushQuery(router, route, query, options);
    return range;
  };

  const setRating = async (rating: number) => {
    const query: LocationQueryRaw = { ...route.query };

    if (!rating) {
      delete query.rating;
    } else {
      query.rating = String(rating);
    }

    await pushQuery(router, route, query, options);
    return rating;
  };

  return {
    getState,
    toggleGenre,
    setSort,
    setPriceRange,
    setRating,
  };
}
