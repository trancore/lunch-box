import 'dotenv/config';
import { writeFileSync } from 'node:fs';

console.log('.envファイルから環境変数を読み込み、clasp.jsonに書き込みます。');

const claspConfig = {
  scriptId: process.env.SCRIPT_ID,
  rootDir: '',
  scriptExtensions: ['.js', '.gs'],
  htmlExtensions: ['.html'],
  jsonExtensions: ['.json'],
  filePushOrder: [],
  skipSubdirectories: false,
};

writeFileSync('.clasp.json', JSON.stringify(claspConfig, null, 2));

console.log('書き込みが終了しました。');
