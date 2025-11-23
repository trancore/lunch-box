/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * GAS Webアプリケーションエンドポイント
 *
 * @returns HTML
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Lunch Box')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * スクリプトプロパティから複数の値を取得する
 *
 * @param {*} keys プロパティキーの配列
 * @returns プロパティ値の配列
 */
function getPropertyValues(keys) {
  const props = PropertiesService.getScriptProperties();
  return keys.map((key) => props.getProperty(key) || '');
}

/**
 * スプレッドシートのデータ範囲の値を取得する
 *
 * @param {*} spreadsheetId
 * @param {*} sheetId
 * @returns データ範囲の値の2次元配列
 */
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

const GEMINI_API_KEY =
  PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
/**
 * AIに回答を取得する
 * @param {*} prompt
 * @returns AIの回答
 */
function getAiAnswer(prompt) {
  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  const options = {
    method: 'POST',
    contentType: 'application/json',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
    },
    payload: JSON.stringify(payload),
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response);
  const content = data['candidates'][0]['content']['parts'][0]['text'];
  return content;
}

/**
 * 文字列の時刻をスプレッドシートの時間シリアル値に変換する
 * @param {*} stringTime "HH:MM"形式の時刻文字列
 * @returns スプレッドシートの時間シリアル値
 */
function toTime(stringTime) {
  var parts = stringTime.split(':');
  var hours = Number(parts[0]);
  var minutes = Number(parts[1]);

  // スプレッドシートの時間シリアル値
  return (hours + minutes / 60) / 24;
}
