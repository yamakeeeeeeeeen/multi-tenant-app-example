import { renderHook } from '@testing-library/react'
import { usePathname, useRouter } from 'next/navigation'

import { isValidYearAndMonth, useRedirectWithYearAndMonth } from './useRedirectWithQueryParams'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}))

describe('useRedirectWithYearAndMonth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('有効な年と月が与えられた場合、リダイレクトが発生しないこと', () => {
    const mockReplace = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ replace: mockReplace })
    ;(usePathname as jest.Mock).mockReturnValue('/test')

    renderHook(() => useRedirectWithYearAndMonth(2023, 5))

    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('無効な年と月が与えられた場合、現在の年と月を使用してリダイレクトが発生すること', () => {
    const mockReplace = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ replace: mockReplace })
    ;(usePathname as jest.Mock).mockReturnValue('/test')

    const now = new Date()
    const expectedYear = now.getFullYear()
    const expectedMonth = now.getMonth() + 1
    const expectedQueryString = `year=${expectedYear}&month=${expectedMonth}`
    const expectedRedirectUrl = `/test?${expectedQueryString}`

    renderHook(() => useRedirectWithYearAndMonth(2023, 13))

    expect(mockReplace).toHaveBeenCalledWith(expectedRedirectUrl)
  })
})

describe('isValidYearAndMonth', () => {
  it('有効な年と月が与えられた場合、trueを返すこと', () => {
    expect(isValidYearAndMonth(2023, 1)).toBe(true)
    expect(isValidYearAndMonth(2023, 12)).toBe(true)
    expect(isValidYearAndMonth(2024, 2)).toBe(true)
  })

  it('無効な月が与えられた場合、falseを返すこと', () => {
    expect(isValidYearAndMonth(2023, 0)).toBe(false)
    expect(isValidYearAndMonth(2023, 13)).toBe(false)
    expect(isValidYearAndMonth(2023, -1)).toBe(false)
    expect(isValidYearAndMonth(2023, 1.5)).toBe(false)
  })

  it('無効な年が与えられた場合、falseを返すこと', () => {
    expect(isValidYearAndMonth(2023.5, 1)).toBe(false)
    expect(isValidYearAndMonth(2024.8, 6)).toBe(false)
    expect(isValidYearAndMonth(-2023, 1)).toBe(false)
  })
})
