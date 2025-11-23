const IS_PROD: boolean = import.meta.env.PROD;
const IS_SSR: boolean = import.meta.env.SSR;

export async function spreadsheet() {
  let getSpreadsheetDataRangeValues: (
    spreadsheetId: string,
    sheetId: number,
  ) => Promise<any[][]> = async () => [[]];

  if (IS_PROD && !IS_SSR) {
    const { GASClient } = await import('gas-client');
    const { serverFunctions } = new GASClient<{
      getSpreadsheetDataRangeValues: (
        spreadsheetId: string,
        sheetId: number,
      ) => any[][];
    }>();
    getSpreadsheetDataRangeValues =
      serverFunctions.getSpreadsheetDataRangeValues;
  }

  /**
   * スプレッドシートの指定シートのデータ範囲の値を取得する
   * @param spreadsheetId
   * @param sheetId
   * @returns シートのデータ範囲の値
   */
  async function getValues(spreadsheetId: string, sheetId: number) {
    return await getSpreadsheetDataRangeValues(spreadsheetId, sheetId);
  }

  return {
    getValues,
  };
}
