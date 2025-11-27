<script setup lang="ts">
type Selected = {
  id: number;
  name: string;
};
type Props = {
  shopList: ShopList;
  status: Status;
};
const props = defineProps<Props>();

const ratingList = Object.entries(RATING).map((rating) => {
  return { id: rating[1].ID, name: rating[1].NAME, value: rating[1].VALUE };
});

const { filterRecommendShopList } = filter();
const { getBusinessHours } = format();
const { transfoemRatingToNumber } = transform();
const selectedGenre = ref<Selected>();
const selectedRating = ref<(typeof ratingList)[number]>();
const recommentShopOptions = ref({
  genre: selectedGenre.value?.name,
  rating: selectedRating.value?.value,
});
const recommendShopList = computed(() => {
  return filterRecommendShopList(props.shopList, recommentShopOptions.value);
});
const genreList = computed(() => {
  const genreSet = new Set(props.shopList.map((shop: Shop) => shop.genre));
  return Array.from(genreSet).map((genre, index) => ({
    id: index + 1,
    name: genre,
  }));
});

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

watch(
  [selectedGenre, selectedRating],
  async ([newGenre, newRating], [oldGenre, oldRating]) => {
    if (newGenre !== oldGenre || newRating !== oldRating) {
      recommentShopOptions.value = {
        genre: newGenre?.name,
        rating: newRating?.value,
      };
    }
  },
);
</script>

<template>
  <Card>
    <template #title>
      <div class="heading">
        <div class="title">
          <Icon name="CARET_RIGHT" type="primary" />
          おすすめのお店
        </div>
        <div class="form-area">
          <Select
            v-model="selectedGenre"
            optionLabel="name"
            placeholder="ジャンル"
            :options="genreList"
          />
          <Select
            v-model="selectedRating"
            optionLabel="name"
            placeholder="評価"
            :options="ratingList"
          />
        </div>
      </div>
    </template>
    <template #content>
      <div
        v-if="status === 'success' && recommendShopList.length > 0"
        class="content fadeup"
      >
        <CardShop
          v-for="shop in recommendShopList"
          class="shop-card"
          :key="shop.id"
          :shopCard="getShopCard(shop)"
        />
      </div>
      <div
        v-else-if="status === 'success' && recommendShopList.length === 0"
        class="content fadeup"
      >
        <p>店舗がありませんでした</p>
      </div>
      <div v-else class="content fadeup">
        <SkeltonShop v-for="shop in Array(4)" />
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  & > .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
  }

  & > .form-area {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.content {
  display: flex;
  justify-content: space-around;
  min-height: 400px;
  padding: 16px;
  gap: 1rem;

  @media (prefers-color-scheme: dark) {
    background-color: var(--p-stone-800);
  }

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 16px;
    height: 100%;
  }

  & > .shop-card {
    width: 232px;

    @media (max-width: $breakpoint-sm) {
      width: 340px;
    }
  }

  & > p {
    margin: 0;
  }
}
</style>
