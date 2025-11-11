<script setup lang="ts">
import lunchBoxIcon from '~/assets/images/lunch-box_icon.svg';

// クエリからkeywordを取得し、入力フォームに設定する
const route = useRoute();
const keyword = ref(route.query.keyword?.toString() || '');
watch(
  () => route.query,
  () => {
    const keywordQuery = route.query.keyword?.toString() || '';
    keyword.value = keywordQuery;
  },
);

const router = useRouter();

function search(event?: PointerEvent | KeyboardEvent) {
  if (event instanceof KeyboardEvent && event.key !== 'Enter') {
    return;
  }

  router.push({ path: '/search', query: { keyword: keyword.value } });
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <component :is="lunchBoxIcon" class="logo-icon" />
      <h1 class="app-name">lunch-box</h1>
    </div>
    <InputGroup class="search-input">
      <InputText
        v-model="keyword"
        placeholder="店舗名、ジャンルで検索"
        enterkeyhint="search"
        @keyup="search"
      />
      <InputGroupAddon>
        <Button
          severity="contrast"
          variant="text"
          aria-label="search"
          @click="search"
        >
          <Icon name="SEARCH" type="primary" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
    <nav class="nav">
      <RouterLink to="/">トップ</RouterLink>
      <RouterLink to="/search">お店を探す</RouterLink>
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
