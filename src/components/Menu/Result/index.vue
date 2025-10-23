<script setup lang="ts"></script>

<template>
  <div class="content">
    <div class="title">
      <Icon name="CARET_RIGHT" type="primary" :size="1.5"></Icon>
      <p>お店を探す</p>
    </div>
    <div class="result">
      <template v-for="(_value, index) in Array(10)">
        <CardShop
          :id="index.toString()"
          :imageUrl="'https://drive.google.com/thumbnail?id=1Z7DyO3snqH7QPwlyvB8-qzT_IRr-pLzE'"
          :name="'店舗名'"
          :price="'1000'"
          :genre="'イタリアン'"
          :businessHours="'11:00 ~ 14:00'"
          :rating="4"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  background-color: white;
  padding: 24px;
  border-radius: 15px;
  width: 100%;

  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .result {
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    place-items: center;
    gap: 16px;
  }
}
</style>
