import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const isValidYearAndMonth = (year: number, month: number): boolean => {
  if (year < 0 || month < 1 || month > 12) {
    return false
  }

  const date = new Date(year, month - 1)
  return date.getFullYear() === year && date.getMonth() === month - 1
}

export const useRedirectWithYearAndMonth = (year: number, month: number): boolean => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isValidYearAndMonth(year, month)) {
      const now = new Date()
      const queryString = new URLSearchParams({
        year: now.getFullYear().toString(),
        month: (now.getMonth() + 1).toString(),
      }).toString()

      const redirectUrl = `${pathname}?${queryString}`
      router.replace(redirectUrl)
    }
  }, [month, pathname, router, year])

  return !isValidYearAndMonth(year, month)
}
