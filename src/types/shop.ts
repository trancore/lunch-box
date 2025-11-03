export type ShopList = {
  /** 店舗ID */
  id: number;
  /** URL */
  url: string;
  /** 店舗名 */
  name: string;
  /** ジャンル */
  genre: string;
  /** 予算 */
  budget: number;
  /** 開店時間 */
  openAt: Date;
  /** 閉店時間 */
  closeAt: Date;
  /** レビュー */
  review: number;
  /** 紹介文 */
  introduction: string;
  /** 作成日 */
  createdAt: Date;
  /** 更新日 */
  updatedAt: Date;
}[];
