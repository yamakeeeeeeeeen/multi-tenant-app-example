import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { FC, useCallback, useState } from 'react'
import { SWRResponse } from 'swr'

import { DayOfWeek, daysOfWeek } from '@/constants/daysOfWeek'
import { path } from '@/constants/path'
import { Reservation } from '@/schema/zod'

const initialDay = 1

type Props = {
  subdomain: string
  year: number
  month: number
  mutate: SWRResponse<Reservation[]>['mutate']
}

export const useDeleteReservationDialog = ({ subdomain, year, month, mutate }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [day, setDay] = useState<number>(initialDay)
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | null>(null)
  const [reservationId, setReservationId] = useState<string | null>(null)

  const onDeleteReservationDialogOpen = useCallback(
    (d: number, id: string) => {
      const dow = daysOfWeek[new Date(year, month - 1, day).getDay()]

      setDay(d)
      setDayOfWeek(dow)
      setReservationId(id)
      onOpen()
    },
    [day, month, onOpen, year],
  )

  const onDeleteReservationDialogClose = useCallback(() => {
    onClose()
    setDay(initialDay)
    setDayOfWeek(null)
    setReservationId(null)
  }, [onClose])

  const onDelete = useCallback(async () => {
    if (!reservationId) return

    try {
      await fetch(path.api.reservations.delete(subdomain, reservationId), {
        method: 'DELETE',
      })

      mutate((prev) => prev?.filter((reservation) => reservation.id !== reservationId), false)
    } catch (error) {
      console.error(error)
    }

    onDeleteReservationDialogClose()
  }, [mutate, onDeleteReservationDialogClose, reservationId, subdomain])

  const header = `${year}年${month}月${day}日（${dayOfWeek}）の予約を削除`

  const DeleteReservationDialog: FC = () => (
    <Modal isOpen={isOpen} onClose={onDeleteReservationDialogClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>この予約を削除しますか？</ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onDeleteReservationDialogClose}>
            キャンセル
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  return { DeleteReservationDialog, onDeleteReservationDialogOpen }
}
