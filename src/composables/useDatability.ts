/**
 * Googleスプレッドシートから店舗データを取得・処理するためのコンポーザブル。
 *
 * @module useDatability
 */
export function useDatability() {
  /** 通信状態 */
  const status = ref<Status>('idle');
  /** 通信データ */
  const data = ref<SheetValues | undefined>(undefined);
  /** エラー情報 */
  const error = ref<Error>();

  /** 店舗リストを整形して返す */
  const shopList = computed<ShopList>(() => {
    const dataWithoutHeader = data.value?.slice(1) || [];
    return dataWithoutHeader.map((row) => {
      return {
        id: Number(row[0]),
        url: row[1],
        name: row[2],
        address: row[3],
        lat: row[4],
        lng: row[5],
        genre: row[6] as (typeof GENRE_NAME_LIST)[number],
        budget: Number(row[7]),
        openAt: new Date(row[8]),
        closeAt: new Date(row[9]),
        regularHoliday: row[10],
        rating: row[11] as unknown as Rating,
        introduction: row[12],
        createdAt: new Date(row[13]),
        updatedAt: new Date(row[14]),
      };
    });
  });

  /** スプレッドシートからデータを取得する */
  async function fetch() {
    status.value = 'loading';
    try {
      const { data: dataSpreadsheet } = await useSpreadsheet();
      data.value = dataSpreadsheet.value;
      status.value = 'success';
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      } else {
        error.value = new Error(String(err));
      }
      status.value = 'error';
    }
  }

  return {
    shopList,
    error,
    status,
    fetch,
  };
}
