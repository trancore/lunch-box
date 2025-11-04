import type { Rating } from '~/types/shop';

export function transform() {
  /**
   * レーティング文字列を数値に変換する
   *
   * @param rating レーティング文字列
   * @returns レーティング数値
   * @example ☆☆☆☆☆ -> 0
   */
  function transfoemRatingToNumber(rating: Rating): number {
    switch (rating) {
      case '☆☆☆☆☆':
        return 0;
      case '★☆☆☆☆':
        return 1;
      case '★★☆☆☆':
        return 2;
      case '★★★☆☆':
        return 3;
      case '★★★★☆':
        return 4;
      case '★★★★★':
        return 5;
      default:
        return 0;
    }
  }

  return { transfoemRatingToNumber };
}
