import { Button, Flex, GridItem, HStack, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'

import { Reservation } from '@/schema/zod'

type Props = {
  day: number
  currentMonth: boolean
  reservation?: Reservation
  onReservationDialogOpen: (day: number, reservation?: Reservation) => void
  onDeleteReservationDialogOpen: (day: number, reservationId: string) => void
}

export const CalendarDate: FC<Props> = ({
  day,
  currentMonth,
  reservation,
  onReservationDialogOpen,
  onDeleteReservationDialogOpen,
}) => (
  <GridItem w="100%" h="40" bg={currentMonth ? 'gray.50' : 'gray.200'} p={2} boxShadow="sm">
    <Text textAlign="center" fontWeight="bold">
      {day}
    </Text>
    {currentMonth &&
      (reservation ? (
        <ReservationInfo
          day={day}
          reservation={reservation}
          onReservationDialogOpen={onReservationDialogOpen}
          onDeleteReservationDialogOpen={onDeleteReservationDialogOpen}
        />
      ) : (
        <AddReservationButton day={day} onReservationDialogOpen={onReservationDialogOpen} />
      ))}
  </GridItem>
)

const ReservationInfo: FC<{
  day: number
  reservation: Reservation
  onReservationDialogOpen: (day: number, reservation: Reservation) => void
  onDeleteReservationDialogOpen: (day: number, reservationId: string) => void
}> = ({ day, reservation, onReservationDialogOpen, onDeleteReservationDialogOpen }) => {
  const startTime = new Date(reservation.startTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const endTime = new Date(reservation.endTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <VStack justify="center" alignItems="center" h="100%">
      <Text textAlign="center" fontSize="sm">
        {startTime}~{endTime}
      </Text>
      <HStack>
        <Button size="xs" variant="outline" onClick={() => onReservationDialogOpen(day, reservation)}>
          変更
        </Button>
        <Button size="xs" colorScheme="red" onClick={() => onDeleteReservationDialogOpen(day, reservation?.id || '')}>
          削除
        </Button>
      </HStack>
    </VStack>
  )
}

const AddReservationButton: FC<{
  day: number
  onReservationDialogOpen: (day: number) => void
}> = ({ day, onReservationDialogOpen }) => (
  <Flex justify="center" alignItems="center" h="100%">
    <Button size="xs" variant="outline" onClick={() => onReservationDialogOpen(day)}>
      予約を追加
    </Button>
  </Flex>
)
