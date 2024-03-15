import { Box, Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import useSWR from 'swr'

import { useCalender } from '@/components/pages/users/reservations/useCalendar'
import { useRedirectWithYearAndMonth } from '@/components/pages/users/reservations/useRedirectWithQueryParams'
import { useReservationDialog } from '@/components/pages/users/reservations/useReservationDialog'
import { daysOfWeek } from '@/constants/daysOfWeek'
import { path } from '@/constants/path'
import { Reservation } from '@/schema/zod'

type Props = {
  subdomain: string
  id: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const Page: FC<Props> = ({ subdomain, id }) => {
  const searchParams = useSearchParams()
  const year = Number(searchParams.get('year'))
  const month = Number(searchParams.get('month'))

  const {
    data: reservations,
    error,
    mutate,
  } = useSWR<Reservation[]>(path.api.reservations.index(subdomain, { userId: id, year, month }), fetcher)

  useRedirectWithYearAndMonth(year, month)

  const { allDays, daysFromPrevMonth, endDate } = useCalender(year, month)
  const { ReservationDialog, onReservationDialogOpen } = useReservationDialog({ subdomain, id, year, month, mutate })

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

  if (error) return <div>Failed to load</div>
  if (!reservations) return <div>Loading...</div>

  return (
    <>
      <Box maxW="container.lg" mx="auto" p={5}>
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
              <GridItem key={index} w="100%" h="40" bg={currentMonth ? 'gray.50' : 'gray.200'} p={2} boxShadow="sm">
                <Text textAlign="center" fontWeight="bold">
                  {day}
                </Text>
                {currentMonth &&
                  (reservationsByDate.has(mapKey) ? (
                    // 予約あり
                    <VStack justify="center" alignItems="center" h="100%">
                      {(() => {
                        const reservation = reservationsByDate.get(mapKey)
                        const startTime = new Date(reservation!.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        const endTime = new Date(reservation!.endTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        return (
                          <>
                            <Text textAlign="center" fontSize="sm">
                              {startTime}~{endTime}
                            </Text>
                            <Button size="xs" variant="outline" onClick={() => {}}>
                              予約を変更
                            </Button>
                          </>
                        )
                      })()}
                    </VStack>
                  ) : (
                    // 予約なし
                    <Flex justify="center" alignItems="center" h="100%">
                      <Button size="xs" variant="outline" onClick={() => onReservationDialogOpen(day)}>
                        予約を追加
                      </Button>
                    </Flex>
                  ))}
              </GridItem>
            )
          })}
        </Grid>
      </Box>
      <ReservationDialog />
    </>
  )
}
