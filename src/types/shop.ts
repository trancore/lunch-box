export type Rating = '☆☆☆☆☆' | '★☆☆☆☆' | '★★☆☆☆' | '★★★☆☆' | '★★★★☆' | '★★★★★';

export type ShopList = {
  /** 店舗ID */
  id: number;
  /** URL */
  url: string;
  /** 店舗名 */
  name: string;
  /** ジャンル */
  genre: (typeof GENRE_NAME_LIST)[number];
  /** 予算 */
  budget: number;
  /** 開店時間 */
  openAt: Date;
  /** 閉店時間 */
  closeAt: Date;
  /** レーティング */
  rating: Rating;
  /** 紹介文 */
  introduction: string;
  /** 作成日 */
  createdAt: Date;
  /** 更新日 */
  updatedAt: Date;
}[];

export type ShopCard = {
  // 店舗ID
  id: string;
  // 画像URL
  imageUrl?: string;
  // 店舗名
  name: string;
  // ランチ値段
  price?: string;
  // ジャンル
  genre?: string;
  // 営業時間
  businessHours?: string;
  // 評価
  rating?: number;
  // 経費計算可否
  canExpenses?: boolean;
};
