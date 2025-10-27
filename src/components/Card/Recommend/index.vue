<script setup lang="ts">
const genreList = [
  { genre: '選択してください' },
  { genre: 'イタリアン' },
  { genre: 'フレンチ' },
  { genre: '和食' },
  { genre: '中華' },
  { genre: 'カフェ' },
];
const ratingList = [
  { rating: '3以上' },
  { rating: '4以上' },
  { rating: '5以上' },
];

const selectedGenre = ref(undefined);
const selectedRating = ref(undefined);
</script>

<template>
  <Card>
    <template #title>
      <div class="heading">
        <div class="title">
          <Icon name="CARET_RIGHT" type="primary" />
          おすすめのお店
        </div>
        <div class="form-area">
          <Select
            v-model="selectedGenre"
            optionLabel="genre"
            placeholder="ジャンル"
            :options="genreList"
          />
          <Select
            v-model="selectedRating"
            optionLabel="rating"
            placeholder="評価"
            :options="ratingList"
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="content">
        <CardShop
          :id="'1'"
          :imageUrl="'https://drive.google.com/thumbnail?id=1Z7DyO3snqH7QPwlyvB8-qzT_IRr-pLzE'"
          :name="'店舗名'"
          :price="'1000'"
          :genre="'イタリアン'"
          :businessHours="'11:00 ~ 14:00'"
          :rating="4"
        />
        <CardShop
          :id="'2'"
          :imageUrl="'https://drive.google.com/thumbnail?id=1Z7DyO3snqH7QPwlyvB8-qzT_IRr-pLzE'"
          :name="'店舗名'"
          :price="'1000'"
          :genre="'イタリアン'"
          :businessHours="'11:00 ~ 14:00'"
          :rating="4"
        />
        <CardShop
          :id="'3'"
          :imageUrl="'https://drive.google.com/thumbnail?id=1Z7DyO3snqH7QPwlyvB8-qzT_IRr-pLzE'"
          :name="'店舗名'"
          :price="'1000'"
          :genre="'イタリアン'"
          :businessHours="'11:00 ~ 14:00'"
          :rating="4"
        />
        <CardShop
          :id="'4'"
          :imageUrl="'https://drive.google.com/thumbnail?id=1Z7DyO3snqH7QPwlyvB8-qzT_IRr-pLzE'"
          :name="'店舗名'"
          :price="'1000'"
          :genre="'イタリアン'"
          :businessHours="'11:00 ~ 14:00'"
          :rating="4"
        />
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
  }

  & > .form-area {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.content {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: var(--p-stone-800);
}
</style>
