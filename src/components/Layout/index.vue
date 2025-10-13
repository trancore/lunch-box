<script setup lang="ts"></script>

<template>
  <div class="layout">
    <Header />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  background-color: gainsboro;
}
</style>
