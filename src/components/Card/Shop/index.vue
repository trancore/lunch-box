<script setup lang="ts">
type Props = {
  // 画像URL
  imageUrl?: string;
  // 店舗名
  name: string;
  // ランチ値段
  price?: string;
  // ジャンル
  genre?: string;
  // 営業時間
  businessHours?: string;
  // 評価
  rating?: number;
};

defineProps<Props>();
</script>

<template>
  <Card class="shop-card">
    <template #header>
      <!-- TODO: no image -->
      <Image
        image-class="shop-image"
        alt="shop"
        :src="imageUrl ?? '/src/assets/images/no-image.png'"
      />
    </template>
    <template #title>{{ name }}</template>
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
  max-width: 270px;

  :deep(.shop-image) {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 4 / 3;
  }
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
}

.text-list {
  margin: 0;
}
</style>
