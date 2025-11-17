const IS_DEV: boolean = import.meta.env.DEV;

export async function useSpreadsheet() {
  const status = ref<Status>('idle');
  const data = ref<SheetValues | undefined>(undefined);
  const error = ref<Error>();

  const dataCache = computed({
    get: () => data.value,
    set: (val) => (data.value = val),
  });

  const { getValues } = await spreadsheet();
  const { getProperties } = await property();

  async function getData() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        status.value = 'loading';
        error.value = undefined;

        let values: any[][];
        if (IS_DEV) {
          // TODO: mock化したい。json-server?
          values = [
            [],
            [
              1,
              'https://tabelog.com/tokyo/A1310/A131002/13242666/',
              '手入力',
              '〒100-0005 東京都千代田区丸の内１丁目',
              35.6812567,
              139.7658563,
              'イタリアン',
              1500,
              '1899-12-30T00:00:00.000Z',
              '1899-12-30T00:00:00.000Z',
              '毎週月曜日',
              '★★★★☆',
              '手入力',
              '2023/01/01',
              '2023/01/01',
            ],
            [
              2,
              'https://tabelog.com/tokyo/A1310/A131002/13242666/',
              '手入力',
              '〒100-0005 東京都千代田区丸の内１丁目',
              35.6812567,
              139.7658563,
              'イタリアン',
              1500,
              '1899-12-30T00:00:00.000Z',
              '1899-12-30T00:00:00.000Z',
              '毎週月曜日',
              '★★★★☆',
              '手入力',
              '2023/01/01',
              '2023/01/01',
            ],
            [
              3,
              'https://tabelog.com/tokyo/A1310/A131002/13242666/',
              '手入力',
              '〒100-0005 東京都千代田区丸の内１丁目',
              35.6812567,
              139.7658563,
              'イタリアン',
              1500,
              '1899-12-30T00:00:00.000Z',
              '1899-12-30T00:00:00.000Z',
              '毎週月曜日',
              '★★★★☆',
              '手入力',
              '2023/01/01',
              '2023/01/01',
            ],
            [
              4,
              'https://tabelog.com/tokyo/A1310/A131002/13242666/',
              '手入力',
              '〒100-0005 東京都千代田区丸の内１丁目',
              35.6812567,
              139.7658563,
              'イタリアン',
              1500,
              '1899-12-30T00:00:00.000Z',
              '1899-12-30T00:00:00.000Z',
              '毎週月曜日',
              '★★★★☆',
              '手入力',
              '2023/01/01',
              '2023/01/01',
            ],
            [
              5,
              'https://tabelog.com/tokyo/A1310/A131002/13242666/',
              '手入力',
              '〒100-0005 東京都千代田区丸の内１丁目',
              35.6812567,
              139.7658563,
              'イタリアン',
              1500,
              '1899-12-30T00:00:00.000Z',
              '1899-12-30T00:00:00.000Z',
              '毎週月曜日',
              '★★★★☆',
              '手入力',
              '2023/01/01',
              '2023/01/01',
            ],
            [
              6,
              'https://tabelog.com/tokyo/A1310/A131002/13242666/',
              '手入力',
              '〒100-0005 東京都千代田区丸の内１丁目',
              35.6812567,
              139.7658563,
              'イタリアン',
              1500,
              '1899-12-30T00:00:00.000Z',
              '1899-12-30T00:00:00.000Z',
              '毎週月曜日',
              '★★★★☆',
              '手入力',
              '2023/01/01',
              '2023/01/01',
            ],
          ];
        } else {
          const properties = await getProperties([
            'SPREADSHEET_ID',
            'SHOP_LIST_SHEET_ID',
          ]);

          values = await getValues(
            properties.SPREADSHEET_ID,
            Number(properties.SHOP_LIST_SHEET_ID),
          );
        }

        dataCache.value = values as SheetValues;
        status.value = 'success';

        resolve();
      } catch (err: unknown) {
        if (err instanceof Error) {
          error.value = err;
        } else {
          error.value = new Error(String(err));
        }
        status.value = 'error';

        reject(error);
      }
    });
  }

  async function refreshData() {
    if (dataCache.value) {
      return;
    }
    await getData();
  }

  await getData();

  return { data: dataCache, error, status, refreshData };
}
