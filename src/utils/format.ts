export function format() {
  /**
   * 店舗の営業時間を「HH:MM ~ HH:MM」の形式で取得する
   *
   * @param openAt 開店時間
   * @param closeAt 閉店時間
   * @returns 営業時間
   */
  function getBusinessHours(openAt: Date, closeAt: Date): string {
    const openHours = openAt.getHours().toString().padStart(2, '0');
    const openMinutes = openAt.getMinutes().toString().padStart(2, '0');
    const closeHours = closeAt.getHours().toString().padStart(2, '0');
    const closeMinutes = closeAt.getMinutes().toString().padStart(2, '0');

    return `${openHours}:${openMinutes} ~ ${closeHours}:${closeMinutes}`;
  }
  return { getBusinessHours };
}
