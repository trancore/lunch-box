<script setup lang="ts">
const borderRadius = 1;
</script>

<template>
  <div class="skelton-box">
    <div class="image">
      <Skeleton height="8rem" :borderRadius="borderRadius + 'rem'" />
    </div>
    <div class="content">
      <Skeleton
        height="2rem"
        width="80%"
        :borderRadius="borderRadius + 'rem'"
      />
      <Skeleton width="70%" :borderRadius="borderRadius + 'rem'" />
      <Skeleton
        height="1rem"
        width="80%"
        :borderRadius="borderRadius + 'rem'"
      />
      <Skeleton
        height="1rem"
        width="95%"
        :borderRadius="borderRadius + 'rem'"
      />
      <Skeleton
        height="1rem"
        width="50%"
        :borderRadius="borderRadius + 'rem'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skelton-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  & > .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
