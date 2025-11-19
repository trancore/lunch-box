<script setup lang="ts">
type Props = {
  shopList: ShopList;
  // status: Status;
};

defineProps<Props>();

const { getBusinessHours } = format();
const { transfoemRatingToNumber } = transform();

function getShopCard(shop: Shop) {
  return {
    id: String(shop.id),
    url: shop.url,
    imageUrl:
      'https://drive.google.com/thumbnail?id=1Z7DyO3snqH7QPwlyvB8-qzT_IRr-pLzE',
    name: shop.name,
    price: String(shop.budget),
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
    <div class="result">
      <template v-for="(shop, index) in shopList">
        <CardShop :shopCard="getShopCard(shop)" />
      </template>
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
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    place-items: center;
    gap: 16px;

    @media (max-width: $breakpoint-sm) {
      grid-template: repeat(2, 1fr) / repeat(2, 1fr);
      gap: 8px;
    }
  }
}
</style>
