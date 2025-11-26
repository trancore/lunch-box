export type Rating = '☆☆☆☆☆' | '★☆☆☆☆' | '★★☆☆☆' | '★★★☆☆' | '★★★★☆' | '★★★★★';

export type Shop = {
  /** 店舗ID */
  id: number;
  /** URL */
  url: string;
  /** 店舗名 */
  name: string;
  /** 住所 */
  address: string;
  /** 緯度 */
  lat: number;
  /** 経度 */
  lng: number;
  /** ジャンル */
  genre: string;
  /** 予算 */
  budget: number;
  /** 開店時間 */
  openAt: Date;
  /** 閉店時間 */
  closeAt: Date;
  /** 定休日 */
  regularHoliday: string;
  /** レーティング */
  rating: Rating;
  /** 紹介文 */
  introduction: string;
  /** 作成日 */
  createdAt: Date;
  /** 更新日 */
  updatedAt: Date;
};

export type ShopList = Shop[];

export type ShopDialog = {
  id: string;
  url: string;
  imageUrl?: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  price?: number;
  genre: string;
  businessHours?: string;
  regularHoliday: string;
  rating: number;
  canExpenses?: boolean;
  introduction: string;
};
