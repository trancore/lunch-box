<script setup lang="ts">
import { toRef } from 'vue';

type Props = {
  shopList: ShopList;
};

const props = defineProps<Props>();
const shopList = toRef(props, 'shopList');

const {
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
} = useSearchFiltering(shopList);
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
          <Rating v-model="selectedRating" />
        </div>
      </div>
    </div>
    <slot
      :searchFiltering="{
        selectedSort,
        selectedGenre,
        priceMin,
        priceMax,
        selectedRating,
      }"
    />
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
