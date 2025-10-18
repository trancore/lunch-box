<script setup lang="ts">
type Props = {
  alt: string;
  src: string;
  height?: number;
};

const props = withDefaults(defineProps<Props>(), {
  height: 300,
});

const heightCss = props.height + 'px';
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
    height: v-bind(heightCss);
    object-fit: cover;
  }
}
</style>
