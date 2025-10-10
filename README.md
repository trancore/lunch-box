# lunch-box

ランチ検索用Webアプリケーション。

## 技術スタック

| ライブラリ・フレームワーク | 説明                           |
| -------------------------- | ------------------------------ |
| Vite                       | ビルドツール                   |
| TypeScript                 | 静的型付け言語                 |
| Vue.js                     | JavaScriptフレームワーク       |
| PrimeVue                   | Vue用UIコンポーネント          |
| Storybook                  | コンポーネントデザインカタログ |
| Vue Router                 | Vue.js用ルーターライブラリ     |
| Pinia                      | Vue.js用状態管理ライブラリ     |
| eslint                     | JavaScript静的解析ツール       |
| prettier                   | 整形ツール                     |

## 画面イメージ

### トップ画面

![トップ画面イメージ](/docs/images/top-page-design.png)

### 検索画面

![検索画面イメージ](/docs/images/search-page-design.png)

### 詳細画面

![詳細画面イメージ](/docs/images/detail-page-design.png)

## 🌳環境変数

```dotenv
# GASのスクリプトID
SCRIPT_ID=
```

## scripts/について

### generate-clasp-json.ts

GASのスクリプトIDをGitHubにpushしないようにするため、.envに環境変数として設定し.clasp.jsonを生成しています。

### main.ts

Webアプリの配信のために必要なGAS用main.tsファイル。
