<script setup lang="ts">
import { ref } from 'vue';

import lunchBoxIcon from '~/assets/images/lunch-box_icon.svg';

const text1 = ref('');
</script>

<template>
  <header class="header">
    <div class="logo">
      <component :is="lunchBoxIcon" class="logo-icon" />
      <h1 class="app-name">lunch-box</h1>
    </div>
    <InputGroup class="search-input">
      <InputText v-model="text1" placeholder="店舗名、ジャンルで検索" />
      <InputGroupAddon>
        <Icon name="SEARCH" type="primary" />
      </InputGroupAddon>
    </InputGroup>
    <nav class="nav">
      <!-- TODO: リンクにする -->
      <p>トップ</p>
      <p>お店を探す</p>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background-color: var(--p-primary-color);
  color: var(--p-surface-200);

  & > .logo {
    display: flex;
    align-items: center;
    gap: 4px;

    & > .logo-icon {
    }
    & > .app-name {
    }
  }

  & > .search-input {
    max-width: 400px;
  }

  & > .nav {
    display: flex;
    gap: 24px;
  }
}
</style>
