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

const GEMINI_API_KEY =
  PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
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

function toTime(stringTime) {
  var parts = stringTime.split(':');
  var hours = Number(parts[0]);
  var minutes = Number(parts[1]);

  // スプレッドシートの時間シリアル値
  return (hours + minutes / 60) / 24;
}
