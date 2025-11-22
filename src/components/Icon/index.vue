<script setup lang="ts">
type Props = {
  name: keyof typeof ICON_NAME;
  type: (typeof ICON_TYPE)[number];
  /* アイコンサイズ。単位rem */
  size?: number;
  className?: string;
};

const ICON_NAME = {
  BARS: 'pi pi-bars',
  CALENDAR_TIMES: 'pi pi-calendar-times',
  CARET_RIGHT: 'pi pi-caret-right',
  CHEVRON_DOWN: 'pi pi-chevron-down',
  CHEVRON_RIGHT: 'pi  pi-chevron-right',
  CLOCK: 'pi  pi-clock',
  DOLLAR: 'pi pi-dollar',
  MAP_MARKER: 'pi pi-map-marker',
  MONEY_BILL: 'pi pi-money-bill',
  SEARCH: 'pi pi-search',
  SHOPPING_BAG: 'pi pi-shopping-bag',
  SPARKLES: 'pi pi-sparkles',
} as const;

const ICON_TYPE = ['primary', 'secondary'] as const;

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 1,
});

const classNameList = [
  'icon',
  ICON_NAME[props.name],
  props.type,
  props.className,
];
const className = classNameList
  .filter((className) => className !== null)
  .join(' ');
</script>

<template>
  <i :class="className" :style="{ fontSize: size + 'rem' }" />
</template>

<style lang="scss" scoped></style>
