import type { ShopList } from '~/types/shop';

import { useSpreadsheet } from './useSpreadsheet';

type DataName = 'recommend' | 'search' | 'shops-detail';

export async function useDatability(name: DataName) {
  const { data, error, status, refreshData } = await useSpreadsheet();

  const shopList = computed<ShopList>(() => {
    const dataWithoutHeader = data.value?.slice(1) || [];
    return dataWithoutHeader.map((row) => {
      return {
        id: row[0],
        url: row[1],
        name: row[2],
        genre: row[3],
        budget: row[4],
        openAt: row[5],
        closeAt: row[6],
        review: row[7],
        introduction: row[8],
        createdAt: row[9],
        updatedAt: row[10],
      };
    });
  });

  async function refresh() {
    await refreshData();
  }

  return { data: shopList, error, status, refresh };
}
