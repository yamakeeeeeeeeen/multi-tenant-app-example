import { Box } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import useSWR from 'swr'

import { Calendar } from '@/components/pages/users/reservations/Calendar'
import { useDeleteReservationDialog } from '@/components/pages/users/reservations/useDeleteReservationDialog'
import { useRedirectWithYearAndMonth } from '@/components/pages/users/reservations/useRedirectWithQueryParams'
import { useReservationDialog } from '@/components/pages/users/reservations/useReservationDialog'
import { path } from '@/constants/path'
import { Reservation } from '@/schema/zod'

type Props = {
  subdomain: string
  id: string
}

class ApiError extends Error {
  info: any
  status: number

  constructor(message: string, info: any, status: number) {
    super(message)
    this.info = info
    this.status = status
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const errorInfo = await res.json()
    const error = new ApiError('An error occurred while fetching the data.', errorInfo, res.status)
    throw error
  }

  return res.json()
}

export const Page: FC<Props> = ({ subdomain, id }) => {
  const searchParams = useSearchParams()
  const year = Number(searchParams.get('year'))
  const month = Number(searchParams.get('month'))

  const needsRedirect = useRedirectWithYearAndMonth(year, month)

  const {
    data: reservations,
    error,
    mutate,
  } = useSWR<Reservation[]>(needsRedirect ? null : path.api.reservations.index(subdomain, { userId: id, year, month }), fetcher)

  const { ReservationDialog, onReservationDialogOpen } = useReservationDialog({ subdomain, userId: id, year, month, mutate })
  const { DeleteReservationDialog, onDeleteReservationDialogOpen } = useDeleteReservationDialog({
    subdomain,
    year,
    month,
    mutate,
  })

  if (needsRedirect) return <div>Redirecting...</div>

  if (error) {
    console.error('Error:', error.message)
    console.error('Error Info:', error.info)
    console.error('Error Status:', error.status)
    return <div>Failed to load</div>
  }

  if (!reservations) return <div>Loading...</div>

  return (
    <>
      <Box maxW="container.lg" mx="auto" p={5}>
        <Calendar
          year={year}
          month={month}
          reservations={reservations}
          onReservationDialogOpen={onReservationDialogOpen}
          onDeleteReservationDialogOpen={onDeleteReservationDialogOpen}
        />
      </Box>
      <ReservationDialog />
      <DeleteReservationDialog />
    </>
  )
}
