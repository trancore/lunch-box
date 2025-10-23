<script setup lang="ts"></script>

<template>
  <div class="search-page">
    <div class="splash-area">
      <ImageSplash
        src="https://drive.google.com/thumbnail?id=1iMnuWgMBmR0us47IQQ1z-ldRIBfu2Nil"
        alt="splash"
        :height="150"
      />
    </div>
    <div class="content">
      <MenuSide>
        <MenuResult />
      </MenuSide>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-page {
  > .splash-area {
    position: relative;
    text-align: center;
  }

  > .content {
    margin: 0 auto;
    padding: 44px 0;
    max-width: $breakpoint-xl;
  }
}
</style>
