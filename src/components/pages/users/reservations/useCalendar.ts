export const useCalendar = (year: number, month: number) => {
  // 指定された年月の初日と月末の日付を取得
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0)

  // 月の初日が週のどの曜日から始まるかを計算
  // 日曜日: 0, 月曜日: 1, ..., 土曜日: 6
  const startDayOfWeek = startDate.getDay()

  // 月の開始前と終了後の日付を計算
  const daysFromPrevMonth = startDayOfWeek
  const daysFromNextMonth = (7 - endDate.getDay() - 1) % 7

  // 前月と翌月の日付を取得
  const prevMonthEndDate = new Date(year, month - 1, 0).getDate()
  const prevMonthDays = Array.from({ length: daysFromPrevMonth })
    .map((_, index) => prevMonthEndDate - index)
    .reverse()
  const nextMonthDays = Array.from({ length: daysFromNextMonth }).map((_, index) => index + 1)

  // 月の日付を取得
  const currentMonthDays = Array.from({ length: endDate.getDate() }).map((_, index) => index + 1)

  // カレンダーの全日付を合成
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

  return { allDays, daysFromPrevMonth, endDate }
}
