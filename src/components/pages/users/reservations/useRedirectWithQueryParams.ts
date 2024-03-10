import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useRedirectWithYearAndMonth = (year: number, month: number) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!year || !month) {
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
