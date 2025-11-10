<script setup lang="ts">
import lunchBoxIcon from '~/assets/images/lunch-box_icon.svg';

const { isPC } = useMediaQuery();

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
    <nav v-if="isPC" class="nav">
      <RouterLink to="/">トップ</RouterLink>
      <RouterLink to="search">お店を探す</RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 16px 0;
  background-color: var(--p-primary-color);
  color: white;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: 16px;
  }

  & > .logo {
    display: flex;
    align-items: center;
    gap: 4px;

    & > .logo-icon {
    }

    & > .app-name {
      margin: 0;
    }
  }

  & > .search-input {
    max-width: 400px;

    @media (max-width: $breakpoint-sm) {
      max-width: 350px;
    }
  }

  & > .nav {
    display: flex;
    gap: 24px;
  }
}
</style>
