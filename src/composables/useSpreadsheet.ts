import type { Error, Status } from '~/types/http';
import type { SheetValues } from '~/types/spreadsheet';
import { property } from '~/utils/property';
import { spreadsheet } from '~/utils/spreadsheet';

const IS_DEV: boolean = import.meta.env.DEV;

export async function useSpreadsheet() {
  const status = ref<Status>('idle');
  const data = ref<SheetValues | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);

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
              'イタリアン',
              1500,
              '9:00',
              '12:00',
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
      } catch (error: any) {
        error.value = error;
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
