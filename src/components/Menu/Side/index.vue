<script setup lang="ts">
const sorts = [
  { sort: 'おすすめ順' },
  { sort: '価格の安い順' },
  { sort: '価格の高い順' },
  { sort: '評価の高い順' },
];
const items = ref([
  {
    label: 'ジャンル',
    icon: 'pi pi-file',
    items: [
      { label: 'イタリアン' },
      { label: 'フレンチ' },
      { label: '和食' },
      { label: '中華' },
      { label: 'カフェ' },
    ],
  },
]);

// TODO: デバッグのため、一旦ダミーデータを入れる。undefinedに戻す
const selectedGenre = ref<string[] | undefined>(['イタリアン', 'カフェ']);
const selectedGenreJoined = computed(() => {
  return selectedGenre.value?.map((genre) => genre).join(', ');
});

// TODO: デバッグのため、一旦ダミーデータを入れる。
const priceRange = ref<[number, number]>([0, 5000]);
const priceMin = computed(() => priceRange.value[0]);
const priceMax = computed(() => priceRange.value[1]);

const selectedRating = ref<number>(0);

const text = ref('');
</script>

<template>
  <div class="content">
    <div class="side-menu">
      <div class="side-menu-content">
        <div class="sort">
          <label>並び順：</label>
          <Select
            v-model="selectedGenre"
            optionLabel="sort"
            :options="sorts"
            :defaultValue="sorts[0]"
          />
        </div>
        <PanelMenu :model="items" class="genre-items">
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
                  <label>{{ item.label }}</label>
                  <Checkbox v-model="selectedGenre" binary />
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
  gap: 24px;

  & > .side-menu {
    padding: 16px;
    min-width: 300px;
    background-color: white;
    border-radius: 15px;

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
              width: 200px;
            }
          }

          & > .selected {
            margin-left: auto;
            font-size: 0.7rem;
            color: var(--text-muted-color);
          }
        }
      }

      & > .price-range {
        display: flex;
        flex-direction: column;
        gap: 16px;

        & > .price-renge-form {
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
