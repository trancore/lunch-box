<script setup lang="ts">
// 型解決できないため、明示的にimportする
import type { ShopCard } from '~/types/shop';

type Props = ShopCard;

const props = withDefaults(defineProps<Props>(), {
  canExpenses: false,
});

const { open } = usePrimeVue().useDialog();

function openShopDialog() {
  open(
    defineAsyncComponent(() => import('~/components/Dialog/Shop/index.vue')),
    {
      props: {
        header: props.name,
        modal: true,
        style: {
          width: '90vw',
          maxWidth: '800px',
          height: '70vh',
        },
        dismissableMask: true,
        blockScroll: true,
      },
      data: {
        id: props.id,
        imageUrl: props.imageUrl,
        name: props.name,
        price: props.price,
        genre: props.genre,
        businessHours: props.businessHours,
        rating: props.rating,
        canExpenses: props.canExpenses,
      },
    },
  );
}
</script>

<template>
  <Card class="shop-card hoverable" @click="openShopDialog">
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
  outline: 1px solid var(--p-primary-color);
  height: fit-content;

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

.subtitle {
  margin: 0;
  font-size: 0.9rem;
}

.text-list {
  margin: 0;
}
</style>
