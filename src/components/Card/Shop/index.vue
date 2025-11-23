<script setup lang="ts">
type Props = {
  shopCard: {
    /** 店舗ID */
    id: string;
    /** URL */
    url: string;
    /** 画像URL */
    imageUrl?: string;
    /** 店舗名 */
    name: string;
    /** ランチ値段 */
    price?: number;
    /** ジャンル */
    genre: (typeof GENRE_NAME_LIST)[number];
    /** 営業時間 */
    businessHours?: string;
    /** レーティング */
    rating: number;
    /** 経費計算可否 */
    canExpenses?: boolean;
    /** 定休日 */
    regularHoliday: string;
    /** 住所 */
    address: string;
    /** 紹介文 */
    introduction: string;
    /** 緯度 */
    lat: number;
    /** 経度 */
    lng: number;
  };
};

const { shopCard } = defineProps<Props>();

const {
  id,
  url,
  imageUrl,
  name,
  address,
  lat,
  lng,
  price,
  genre,
  businessHours,
  regularHoliday,
  rating,
  introduction,
  canExpenses = false,
} = shopCard;
const { open } = usePrimeVue().useDialog();
const dialogData = ref<ShopDialog>({
  id,
  url,
  imageUrl,
  name,
  address,
  lat,
  lng,
  price,
  genre,
  businessHours,
  regularHoliday,
  rating,
  canExpenses,
  introduction,
});
function openShopDialog() {
  open(
    defineAsyncComponent(() => import('~/components/Dialog/Shop/index.vue')),
    {
      props: {
        header: name,
        modal: true,
        style: {
          width: '90vw',
          maxWidth: '800px',
          height: '70vh',
        },
        dismissableMask: true,
        blockScroll: true,
      },
      data: dialogData.value,
    },
  );
}
</script>

<template>
  <Card class="shop-card hoverable" :id="shopCard.id" @click="openShopDialog">
    <template #header>
      <Icon
        v-if="canExpenses"
        class="can-expenses"
        name="DOLLAR"
        type="primary"
        :size="2"
      />
      <Image
        image-class="shop-image"
        alt="shop"
        :src="
          imageUrl ??
          // no-image
          'https://drive.google.com/thumbnail?id=1nNC-25R33LyXVhS7DBcTbWnP58ylOccO'
        "
      />
    </template>
    <template #title>
      <p class="title">{{ name }}</p>
    </template>
    <template #subtitle>
      <p class="subtitle">ランチ値段：~ {{ price ?? '??? ' }}円</p>
    </template>
    <template #content>
      <p class="text-list">ジャンル：{{ genre ?? '???' }}</p>
      <p class="text-list">営業時間：{{ businessHours ?? '???' }}</p>
    </template>
    <template #footer>
      <Rating v-if="rating" :default-value="rating" readonly />
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.shop-card {
  display: flex;
  position: relative;
  outline: 1px solid var(--p-primary-color);

  @media (prefers-color-scheme: dark) {
    outline: 1px solid white;
  }

  .can-expenses {
    position: absolute;
    top: 8px;
    right: 8px;
    font-weight: bold;
  }

  :deep(.shop-image) {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 4 / 3;
    border-radius: var(--p-card-border-radius) var(--p-card-border-radius) 0 0;
  }
}

.title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
}

.text-list {
  margin: 0;
}
</style>
