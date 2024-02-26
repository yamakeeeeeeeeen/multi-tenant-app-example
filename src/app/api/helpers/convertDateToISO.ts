/**
 * 日付のみの文字列を受け取り、UTCの午前0時でのISO 8601形式の日付時刻文字列に変換
 * @param {string} dateInput - 日付のみを含む文字列 (例: '2024-01-01')
 * @return {string} ISO 8601形式の日付時刻文字列 (例: '2024-01-01T00:00:00.000Z')
 */
export const convertDateToISO = (dateInput: string): string => {
  const date = new Date(dateInput + "T00:00:00.000Z") // UTCの午前0時を基準とする
  return date.toISOString()
}
