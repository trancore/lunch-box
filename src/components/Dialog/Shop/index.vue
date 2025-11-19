<script setup lang="ts">
// auto-importが効かないため、明示的にimport
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';

const dialogRef = inject<{ value: DynamicDialogInstance }>('dialogRef');

function closeDialog(event: PointerEvent) {
  dialogRef?.value.close(event);
}

const shopData = ref<ShopDialog | undefined>(undefined);

onMounted(() => {
  shopData.value = dialogRef?.value.data;
});
</script>

<template>
  <div class="dialog-shop">
    <div class="content">
      <div class="detail">
        <div class="information">
          <div class="sub-title">
            <Icon name="CARET_RIGHT" type="primary" :size="1.5" />
            <h3>基本情報</h3>
          </div>
          <div class="information-items">
            <div class="information-item">
              <Icon name="SPARKLES" type="secondary" :size="1.2" />
              <p>ジャンル：{{ shopData?.genre }}</p>
            </div>
            <div class="information-item">
              <Icon name="CLOCK" type="secondary" :size="1.2" />
              <p>営業時間：{{ shopData?.businessHours }}</p>
            </div>
            <div class="information-item">
              <Icon name="CALENDAR_TIMES" type="secondary" :size="1.2" />
              <p>定休日：{{ shopData?.regularHoliday }}</p>
            </div>
            <div class="information-item">
              <Icon name="MAP_MARKER" type="secondary" :size="1.2" />
              <p>住所：{{ shopData?.address }}</p>
            </div>
          </div>
        </div>
        <div class="menu">
          <div class="sub-title">
            <Icon name="CARET_RIGHT" type="primary" :size="1.5" />
            <h3>紹介文</h3>
          </div>
          <p>{{ shopData?.introduction }}</p>
        </div>
      </div>
      <div class="map">
        <div class="sub-title">
          <Icon name="CARET_RIGHT" type="primary" :size="1.5" />
          <h3>マップ</h3>
        </div>
        <Map
          v-if="shopData?.lat && shopData?.lng"
          class="map-tile"
          :lat="shopData?.lat"
          :lng="shopData?.lng"
          tooltipText="店舗名"
        />
      </div>
    </div>
    <div class="footer">
      <Button class="close" label="閉じる" @click="closeDialog" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog-shop {
  padding: 16px;
  background-color: gainsboro;

  & > .content {
    margin: 0 auto 24px;
    max-width: $breakpoint-xl;

    & > .detail {
      display: flex;
      gap: 24px;

      @media (max-width: $breakpoint-sm) {
        flex-direction: column;
      }

      & > .information {
        flex: 2;
        border-radius: 15px;
        padding: 0 12px 4px;
        background-color: white;

        @media (prefers-color-scheme: dark) {
          background-color: black;
        }

        & > .sub-title {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        & > .information-items {
          & > .information-item {
            display: flex;
            gap: 6px;
            margin: 0 0 14px 24px;
            line-height: 1.2rem;

            & > p {
              margin: 0;
            }
          }
        }
      }

      & > .menu {
        flex: 3;
        border-radius: 15px;
        padding: 0 12px 4px;
        background-color: white;

        @media (prefers-color-scheme: dark) {
          background-color: black;
        }

        & > .sub-title {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        & > p {
          margin: 0 24px;
        }

        & > .menu-items {
          display: grid;
          grid-template-columns: 1fr 3fr;

          & > .review {
            display: flex;
            background-color: var(--p-gray-100);
            padding: 24px;
          }

          & > .menu-items-cards {
          }
        }
      }
    }

    & > .map {
      margin-top: 24px;
      border-radius: 15px;
      padding: 0 12px 24px;
      background-color: white;

      @media (prefers-color-scheme: dark) {
        background-color: black;
      }

      & > .sub-title {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      & > .map-tile {
        padding: 0 24px;
      }
    }
  }

  & > .footer {
    text-align: right;
  }
}
</style>
