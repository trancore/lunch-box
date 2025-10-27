<script setup lang="ts">
const imageUrlSplash = IMAGE_URL.SPLASH;

const shopName = ref('飲食店名');

const rating = ref(4.5);
</script>

<template>
  <div class="search-page">
    <div class="splash-area">
      <ImageSplash alt="splash" :src="imageUrlSplash" :height="200" />
      <div class="title-box primary">
        <p class="title">{{ shopName }}</p>
        <Rating :default-value="rating" readonly />
      </div>
    </div>
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
              <p>ジャンル：</p>
            </div>
            <div class="information-item">
              <Icon name="CLOCK" type="secondary" :size="1.2" />
              <p>営業時間：</p>
            </div>
            <div class="information-item">
              <Icon name="CALENDAR_TIMES" type="secondary" :size="1.2" />
              <p>定休日：</p>
            </div>
            <div class="information-item">
              <Icon name="MAP_MARKER" type="secondary" :size="1.2" />
              <p>住所：</p>
            </div>
          </div>
        </div>
        <div class="menu">
          <div class="sub-title">
            <Icon name="CARET_RIGHT" type="primary" :size="1.5" />
            <h3>メニュー</h3>
          </div>
          <p>実装中...</p>
          <!-- TODO: 用件が決まったら実装する -->
          <!-- <div class="menu-items">
            <div class="review">
              <Rating :default-value="rating" readonly />
            </div>
            <div class="menu-items-cards"></div>
          </div> -->
        </div>
      </div>
      <div class="map">
        <div class="sub-title">
          <Icon name="CARET_RIGHT" type="primary" :size="1.5" />
          <h3>マップ</h3>
        </div>
        <Map :lat="35.44604" :lng="139.64266" tooltipText="店舗名" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.search-page {
  & > .splash-area {
    position: relative;
    text-align: center;

    & > .title-box {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);

      & > .title {
        font-size: 3rem;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        margin-bottom: 6px;
      }
    }
  }

  & > .content {
    margin: 0 auto;
    padding: 44px 0;
    max-width: $breakpoint-xl;

    & > .detail {
      display: flex;
      gap: 24px;

      & > .information {
        flex: 1;
        background-color: white;
        border-radius: 15px;
        padding: 16px;

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
        background-color: white;
        border-radius: 15px;
        padding: 16px;

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
      background-color: white;
      border-radius: 15px;
      padding: 16px;
    }
  }
}
</style>
