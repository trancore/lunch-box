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
  // 経費計算可否
  canExpenses?: boolean;
};

withDefaults(defineProps<Props>(), {
  canExpenses: false,
});
</script>

<template>
  <Card class="shop-card">
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
  position: relative;
  max-width: 270px;

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
