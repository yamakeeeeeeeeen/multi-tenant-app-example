import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const isValidYearAndMonth = (year: number, month: number): boolean => {
  const date = new Date(year, month - 1)
  return date.getFullYear() === year && date.getMonth() === month - 1
}

export const useRedirectWithYearAndMonth = (year: number, month: number) => {
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
}
