import { Grid, GridItem, Text } from '@chakra-ui/react'
import { FC, useMemo } from 'react'

import { CalendarDate } from '@/components/pages/users/reservations/CalendarDate'
import { useCalendar } from '@/components/pages/users/reservations/useCalendar'
import { daysOfWeek } from '@/constants/daysOfWeek'
import { Reservation } from '@/schema/zod'

type Props = {
  year: number
  month: number
  reservations: Reservation[]
  onReservationDialogOpen: (day: number, reservation?: Reservation) => void
  onDeleteReservationDialogOpen: (day: number, reservationId: string) => void
}

export const Calendar: FC<Props> = ({ year, month, reservations, onReservationDialogOpen, onDeleteReservationDialogOpen }) => {
  const { allDays, daysFromPrevMonth, endDate } = useCalendar(year, month)

  const currentMonthDays = useMemo(
    () => allDays.map((_day, index) => index >= daysFromPrevMonth && index < daysFromPrevMonth + endDate.getDate()),
    [allDays, daysFromPrevMonth, endDate],
  )

  const reservationsByDate = useMemo(() => {
    const map = new Map<string, Reservation>()
    reservations?.forEach((reservation) => {
      const date = new Date(reservation.date)
      const key = `${date.getMonth() + 1}-${date.getDate()}`
      map.set(key, reservation)
    })
    return map
  }, [reservations])

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={1}>
      {daysOfWeek.map((d) => (
        <GridItem w="100%" h="10" key={d} bg="gray.200" p={2}>
          <Text textAlign="center" fontWeight="bold">
            {d}
          </Text>
        </GridItem>
      ))}

      {allDays.map((day, index) => {
        const currentMonth = currentMonthDays[index]
        const mapKey = `${month}-${day}`

        return (
          <CalendarDate
            key={index}
            day={day}
            currentMonth={currentMonth}
            reservation={reservationsByDate.get(mapKey)}
            onReservationDialogOpen={onReservationDialogOpen}
            onDeleteReservationDialogOpen={onDeleteReservationDialogOpen}
          />
        )
      })}
    </Grid>
  )
}
