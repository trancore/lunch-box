/* eslint-disable @typescript-eslint/no-unused-vars */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function getPropertyValues(keys) {
  const props = PropertiesService.getScriptProperties();
  return keys.map((key) => props.getProperty(key) || '');
}

function getSpreadsheetDataRangeValues(spreadsheetId, sheetId) {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetById(sheetId);
  const values = sheet.getDataRange().getValues();

  // Date型や特殊オブジェクトを含むと gas-client 経由で null になるため文字列化する
  const safeValues = values.map((row) =>
    row.map((cell) =>
      cell instanceof Date ? cell.toISOString() : String(cell),
    ),
  );
  return safeValues;
}
