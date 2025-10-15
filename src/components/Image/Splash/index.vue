<script setup lang="ts">
type Props = {
  alt: string;
  src: string;
};

defineProps<Props>();
</script>

<template>
  <Image class="splash" :alt="alt">
    <template #image>
      <div>
        <img class="splash-image" :src="src" />
      </div>
    </template>
  </Image>
</template>

<style lang="scss" scoped>
.splash {
  filter: blur(4px);

  .splash-image {
    width: calc(100%);
    height: 300px;
    object-fit: cover;
  }
}
</style>
