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
 * スプレッドシートを開いたときにカスタムメニューを追加
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('カスタム関数')
    .addItem('AI生成', 'fillEmptyCellsWithAiAnswer')
    .addToUi();
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

const SHEET_HEADERS = [
  '店舗ID',
  'URL',
  '店舗名',
  '住所',
  '緯度(lat)',
  '経度(lng)',
  'ジャンル',
  '予算',
  '開店時間',
  '閉店時間',
  '定休日',
  '評価',
  '紹介文',
  '作成日',
  '更新日',
];

const PROMPT_BUILDERS = {
  店舗名: (row) =>
    buildPromptFromSource(
      row['URL'],
      'URLから店舗名のみを抽出して1行で返してください。',
    ),
  住所: (row) =>
    buildPromptFromSource(
      row['URL'],
      'URLから郵便番号と住所のみを抽出して1行で返してください。',
    ),
  '緯度(lat)': (row) =>
    buildPromptFromSource(
      row['URL'],
      '緯度のみを数字として抽出して1行で返してください。',
    ),
  '経度(lng)': (row) =>
    buildPromptFromSource(
      row['URL'],
      '経度のみを数字として抽出して1行で返してください。',
    ),
  ジャンル: (row) =>
    buildPromptFromSource(
      row['店舗名'] || row['URL'],
      '飲食店のジャンル（イタリアンや中華など）を抽出して1行で返してください。',
    ),
  予算: (row) =>
    buildPromptFromSource(
      row['店舗名'] || row['住所'],
      'お昼ご飯を想定した予算を抽出して数字のみ1行（例: 1500）で返してください。',
    ),
  開店時間: (row) =>
    buildPromptFromSource(
      row['店舗名'] || row['住所'],
      'お昼ご飯を想定した開店時間を抽出し、Googleスプレッドシートで表示形式を時刻にできる形式（例: 10:00）で1行返してください。',
    ),
  閉店時間: (row) =>
    buildPromptFromSource(
      row['住所'] || row['店舗名'],
      'お昼ご飯を想定した閉店時間を抽出し、表示形式を時刻にできる形式（例: 14:30）で1行返してください。',
    ),
  定休日: (row) =>
    buildPromptFromSource(
      row['店舗名'] || row['住所'],
      'お昼ご飯を想定した定休日を抽出して1行（例: 毎週月曜日）で返してください。',
    ),
  評価: (row) =>
    buildPromptFromSource(
      row['店舗名'] || row['住所'],
      '評価を☆☆☆☆☆、★☆☆☆☆、★★☆☆☆、★★★☆☆、★★★★☆、★★★★★のいずれか1つで返してください。',
    ),
  紹介文: (row) =>
    buildPromptFromSource(
      row['店舗名'] || row['住所'],
      '紹介文を300文字以内で返してください。',
    ),
};

function buildPromptFromSource(source, instruction) {
  if (!source) {
    return '';
  }
  return `${source}\n${instruction}`;
}

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

/**
 * 選択範囲の空白セルをAI回答で埋める
 */
function fillEmptyCellsWithAiAnswer() {
  const ui = SpreadsheetApp.getUi();
  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getActiveSheet();
  const range = sheet.getActiveRange();

  if (!range) {
    ui.alert('AIで埋めたいセル範囲を選択してください。');
    return;
  }

  const headers =
    sheet.getLastColumn() === 0
      ? []
      : sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values = range.getValues();
  const startRow = range.getRow();
  const startCol = range.getColumn();

  let filledCount = 0;

  spreadsheet.toast('AIで空白セルを補完しています...', 'Lunch Box', 5);

  try {
    for (let r = 0; r < values.length; r++) {
      for (let c = 0; c < values[r].length; c++) {
        const cellValue = values[r][c];
        if (cellValue !== '' && cellValue !== null) {
          continue;
        }

        const targetRow = startRow + r;
        const targetCol = startCol + c;
        const rowValues = sheet
          .getRange(targetRow, 1, 1, sheet.getLastColumn())
          .getDisplayValues()[0];

        const targetHeader = headers[targetCol - 1] || `列${targetCol}`;
        const prompt = createPromptFromRowData(
          headers,
          rowValues,
          targetHeader,
        );

        const answer = getAiAnswer(prompt).trim();
        sheet.getRange(targetRow, targetCol).setValue(answer);
        filledCount++;

        Utilities.sleep(1000); // APIの連続呼び出しを緩和
      }
    }

    spreadsheet.toast(
      `AIによる補完が完了しました（${filledCount}件）`,
      'Lunch Box',
      5,
    );
  } catch (error) {
    spreadsheet.toast(
      'AI補完でエラーが発生しました。ログを確認してください。',
      'Lunch Box',
      5,
    );
    console.error(error);
    ui.alert('エラーが発生しました', error.message || error, ui.ButtonSet.OK);
  }
}

/**
 * 行データと対象列に応じたプロンプトを生成する
 * @param {*} headers
 * @param {*} rowValues
 * @param {*} targetHeader
 * @returns プロンプト文字列
 */
function createPromptFromRowData(headers, rowValues, targetHeader) {
  const headerFallback = headers.length === 0;
  const normalizedHeaders = headers.length === 0 ? SHEET_HEADERS : headers;
  const rowObject = normalizedHeaders.reduce((acc, header, index) => {
    acc[header] = rowValues[index] || '';
    return acc;
  }, {});

  const builder = PROMPT_BUILDERS[targetHeader];
  if (builder) {
    const prompt = builder(rowObject);
    if (prompt) {
      return prompt;
    }
  }

  const contextLines = rowValues
    .map((value, index) => {
      const headerName = headerFallback
        ? `列${index + 1}`
        : headers[index] || `列${index + 1}`;
      const safeValue = value || '未入力';
      return `${headerName}: ${safeValue}`;
    })
    .join('\n');

  return `以下は飲食店に関するデータです。\n${contextLines}\n\n上記の情報を踏まえ、スプレッドシートの「${targetHeader}」列に入れるべき1行のテキストを日本語で生成してください。`;
}
