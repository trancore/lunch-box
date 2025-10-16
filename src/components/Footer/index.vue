<script setup lang="ts">
import lunchBoxIcon from '~/assets/images/lunch-box_icon.svg';
</script>

<template>
  <footer class="footer">
    <div class="logo-area">
      <div class="logo">
        <component :is="lunchBoxIcon" class="logo-icon" />
        <p class="logo-text">lunch-box</p>
      </div>
      <p class="description secondary">もう、悩まない</p>
    </div>
    <div class="link-area">
      <h3 class="heading">Contact</h3>
      <p>trancore</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-evenly;
  height: 200px;
  background-color: var(--p-surface-800);
  color: var(--p-surface-200);

  & > .logo-area {
    display: flex;
    flex-direction: column;
    padding-top: 24px;

    & > .logo {
      display: flex;
      align-items: center;
      gap: 8px;

      & > .logo-text {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
      }
    }

    & > .description {
      margin-top: 4px;
      color: var(--p-text-muted-color);
    }
  }

  & > .link-area {
    padding-top: 8px;
    & > .heading {
      margin: 32px 0 8px;
    }
  }
}
</style>
