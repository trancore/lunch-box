<script setup lang="ts">
import type { SelectChangeEvent } from 'primevue/select';

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

const text = ref('');

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
</script>

<template>
  <div class="content">
    <div class="side-menu">
      <div class="side-menu-content">
        <div class="sort">
          <label>並び順：</label>
          <Select
            v-model="selectedSort"
            optionLabel="name"
            :options="sortItems"
            :defaultValue="sortItems[0]"
            @change="changeSort"
          />
        </div>
        <PanelMenu :model="genreItems" class="genre-items">
          <template #item="{ item, active, root }">
            <a v-ripple class="menu-item">
              <div class="title">
                <!-- propsにそのままactiveで条件分岐するとreactiveにコンポーネントが変わらないため、v-ifを使用 -->
                <Icon
                  v-if="root && active"
                  name="CHEVRON_DOWN"
                  type="secondary"
                />
                <Icon
                  v-else-if="root && !active"
                  type="secondary"
                  name="CHEVRON_RIGHT"
                />
                <span v-if="root">{{ item.label }}</span>
                <div v-else class="checkbox">
                  <label>{{ item.name }}</label>
                  <Checkbox
                    v-model="selectedGenre"
                    :inputId="`genre-${item.id}`"
                    :name="item.name"
                    :value="item.name"
                    @change="changeGenre"
                  />
                </div>
              </div>
              <span v-if="root" class="selected">{{
                selectedGenreJoined
              }}</span>
            </a>
          </template>
        </PanelMenu>
        <div class="price-range">
          <label>価格帯：</label>
          <div class="price-renge-form">
            <Slider
              v-model="priceRange"
              range
              :min="0"
              :max="5000"
              :step="500"
            />
            <div class="price-renge-texts">
              <p>{{ priceMin }}円</p>
              <p>{{ priceMax }}円</p>
            </div>
          </div>
        </div>
        <div class="rating">
          <label>評価：</label>
          <Rating v-model="selectedRating" :defaultValue="3" />
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  & > .side-menu {
    position: sticky;
    top: 100px;
    padding: 16px;
    min-width: 260px;
    border-radius: 15px;
    background-color: white;

    @media (prefers-color-scheme: dark) {
      background-color: black;
    }

    @media (max-width: $breakpoint-sm) {
      position: static;
    }

    & > .side-menu-content {
      display: flex;
      flex-direction: column;
      gap: 24px;

      & > .sort {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      & > .genre-items {
        :deep(.menu-item) {
          display: flex;
          align-items: center;
          padding: 8px 10px;
          cursor: pointer;

          & > .title {
            display: flex;
            align-items: center;
            gap: 8px;

            & > .checkbox {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-left: 22px;
              width: 180px;
            }
          }

          & > .selected {
            margin-left: auto;
            max-width: 100px;
            font-size: 0.7rem;
            color: var(--text-muted-color);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            @media (max-width: $breakpoint-sm) {
              max-width: 100%;
            }
          }
        }
      }

      & > .price-range {
        display: flex;
        flex-direction: column;
        gap: 16px;

        & > .price-renge-form {
          padding: 0 8px;

          & > .price-renge-texts {
            display: flex;
            justify-content: space-between;
            padding: 0 4px;
            font-size: 0.8rem;
          }
        }
      }

      & > .rating {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
