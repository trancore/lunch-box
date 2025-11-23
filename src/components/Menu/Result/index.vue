<script setup lang="ts">
type Props = {
  shopList: ShopList;
  status: Status;
  searchFiltering: SearchFiltering;
};

const props = defineProps<Props>();

const { filterSearchResultShopList } = filter();
const result = computed(() =>
  filterSearchResultShopList(props.shopList, props.searchFiltering),
);

const { getBusinessHours } = format();
const { transfoemRatingToNumber } = transform();
function getShopCard(shop: Shop) {
  return {
    id: String(shop.id),
    url: shop.url,
    imageUrl:
      'https://drive.google.com/thumbnail?id=1Z7DyO3snqH7QPwlyvB8-qzT_IRr-pLzE',
    name: shop.name,
    price: shop.budget,
    genre: shop.genre,
    businessHours: getBusinessHours(shop.openAt, shop.closeAt),
    rating: transfoemRatingToNumber(shop.rating),
    // canExpenses
    regularHoliday: shop.regularHoliday,
    address: shop.address,
    introduction: shop.introduction,
    lat: shop.lat,
    lng: shop.lng,
  };
}
</script>

<template>
  <div class="content">
    <div class="title">
      <Icon name="CARET_RIGHT" type="primary" :size="1.5"></Icon>
      <p>お店を探す</p>
    </div>
    <div v-if="status === 'success' && result.length > 0" class="result fadeup">
      <CardShop
        v-for="(shop, index) in result"
        class="shop-card"
        :key="shop.id"
        :id="shop.id"
        :shopCard="getShopCard(shop)"
      />
    </div>
    <div
      v-else-if="status === 'success' && result.length === 0"
      class="result fadeup"
    >
      <p>店舗がありませんでした</p>
    </div>
    <div v-else class="content fadeup">
      <SkeltonShop v-for="shop in Array(9)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding: 24px;
  border-radius: 15px;
  background-color: white;

  @media (prefers-color-scheme: dark) {
    background-color: black;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 24px 8px;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .result {
    display: grid;
    grid-template: repeat(1, 1fr) / repeat(3, 1fr);
    place-items: center;
    gap: 16px;

    @media (max-width: $breakpoint-sm) {
      grid-template: repeat(2, 1fr) / repeat(2, 1fr);
      gap: 8px;
    }

    & > .shop-card {
      width: 232px;

      @media (max-width: $breakpoint-sm) {
        max-width: 194px;
      }
    }
  }
}
</style>
