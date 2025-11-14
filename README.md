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

## 要件

- 飲食店を簡単に探すことができる
- 飲食店が決まらない場合に、飲食店をランダムで選出してくれる
- 飲食店のデータはURLを指定しておけば自動で(AIによって)データ化してくれる。

## ER図

```mermaid
---
title: Lunch Box ER図
---

erDiagram
    SHOPS {
        number id PK "店舗ID"
        string url "URL"
        string(30) name "店舗名"
        string genre "ジャンル"
        number budget  "予算"
        date open_at "開店時間"
        date close_at "閉店時間"
        number rating "レーティング"
        string(300) introduction "紹介文"
        timestamp created_at "作成日"
        timestamp updated_at "更新日"
    }
```

## 画面イメージ

### トップ画面

![トップ画面イメージ](/docs/images/top-page-design.png)

### 検索画面

![検索画面イメージ](/docs/images/search-page-design.png)

- 全ての店舗データを一括取得し、フロント側でデータのフィルタリング、ソートを行う。

### 詳細画面

![詳細画面イメージ](/docs/images/detail-page-design.png)

### 検索画面と詳細画面の削除

このアプリはGASでデプロイし、GAS APIを用いて通信する想定です。  
そのため、API通信には制限があるため、極力通信回数を減らすことが重要となります。  
当初は検索画面、詳細画面を別々にして、各画面でAPI通信（スプレッドシートからデータを取得する通信）することを考えていましたが、上記の理由により画面の構造を変更することにしました。

つまり、

- 検索画面 → トップ画面と統合し、トップ画面のデータを使い回す。
- 詳細画面 → クリックしたらモーダルで表示し、トップ画面のデータを使い回す。

ことになります。

## 画面一覧

| No | 画面名 | パス | クエリ | meta title |
| :-: | --- | --- | --- | --- |
| 1 | トップ | `/` | - | トップ \| lunch-box |
| 2 | 検索 | `/search` | `keyword`：キーワード検索<br>`sort`：並び順<br>`genre`：ジャンル<br>`price`：価格帯<br>`rating`：評価 | 検索 \| lunch-box |
| 3 | 店舗詳細 | `/shops/:id` | - | {店舗名} \| lunch-box |

## 仕様

### 検索条件について

| 検索条件 | 要素         | 概要                                               |
| -------- | ------------ | -------------------------------------------------- |
| ソート   | おすすめ順   | ランダムに並び替える                               |
|          | 価格の安い順 |                                                    |
|          | 価格の高い順 |                                                    |
|          | 評価の高い順 |                                                    |
| ジャンル | ...          | スプレッドシートに定義しているジャンルと同期させる |
| 価格帯   | 最低価格     |                                                    |
|          | 最高価格     |                                                    |
| 評価     | ...          | その星の数以上の店舗をフィルタする                 |

## 🌳環境変数

スクリプトIDは、.clasp.jsonに指定する必要があります。  
このスクリプトIDをリポジトリ上に保存しないために、.envで管理しています。

```dotenv
# GASのスクリプトID
SCRIPT_ID=
```

一方で、スプレッドシートID（SPREADSHEET_ID）、店舗一覧を記載したシートID（SHOP_LIST_SHEET_ID）はGASのスクリプトプロパティに指定してください。

## scripts/について

### generate-clasp-json.ts

GASのスクリプトIDをGitHubにpushしないようにするため、.envに環境変数として設定し.clasp.jsonを生成しています。

### main.ts

Webアプリの配信のために必要なGAS用main.tsファイルです。

また、クライアント（HTML）側でGAS APIを実行するために、関数を定義しています。  
この関数は、GAS（サーバー）側での実行数をできるがぎり少なくするために、関数の処理をできるだけ大きくするように設計しています。
