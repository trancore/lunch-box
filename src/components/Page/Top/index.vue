<script setup lang="ts">
const imageUrlSplash = IMAGE_URL.SPLASH;
</script>

<template>
  <div class="top-page">
    <div class="splash-area">
      <ImageSplash alt="splash" :src="imageUrlSplash" />
      <p class="catch-text">今日のランチは何にする？</p>
    </div>
    <div class="content">
      <CardRecommend />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-page {
  > .splash-area {
    position: relative;
    text-align: center;

    > .catch-text {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 2.5rem;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }
  }

  > .content {
    margin: 0 auto;
    padding: 44px 0;
    max-width: $breakpoint-xl;
  }
}
</style>
