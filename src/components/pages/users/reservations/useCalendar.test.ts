import { renderHook } from '@testing-library/react'

import { useCalendar } from './useCalendar'

describe('useCalendar', () => {
  it('2022年1月のカレンダーデータが正しく返されること', () => {
    const { result } = renderHook(() => useCalendar(2022, 1))

    expect(result.current.allDays).toEqual([
      26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30, 31, 1, 2, 3, 4, 5,
    ])
    expect(result.current.daysFromPrevMonth).toBe(6) // 2022-01-01 は土曜日
    expect(result.current.endDate).toEqual(new Date(2022, 1 - 1, 31)) // 2022-01-31
  })

  it('2023年2月のカレンダーデータが正しく返されること', () => {
    const { result } = renderHook(() => useCalendar(2023, 2))

    expect(result.current.allDays).toEqual([
      29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 1, 2, 3,
      4,
    ])
    expect(result.current.daysFromPrevMonth).toBe(3) // 2023-02-01 は水曜日
    expect(result.current.endDate).toEqual(new Date(2023, 2 - 1, 28)) // 2023-02-28
  })

  it('2024年3月のカレンダーデータが正しく返されること', () => {
    const { result } = renderHook(() => useCalendar(2024, 3))

    expect(result.current.allDays).toEqual([
      25, 26, 27, 28, 29, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
      29, 30, 31, 1, 2, 3, 4, 5, 6,
    ])
    expect(result.current.daysFromPrevMonth).toBe(5) // 2024-03-01 は金曜日
    expect(result.current.endDate).toEqual(new Date(2024, 3 - 1, 31)) // 2024-03-31
  })
})
