export function useMediaQuery() {
  const width = ref<number>(window.innerWidth);

  const isPC = computed(() => width.value > 576);
  const isSP = computed(() => width.value <= 576);

  function updateWidth() {
    width.value = window.innerWidth;
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return { isPC, isSP };
}
