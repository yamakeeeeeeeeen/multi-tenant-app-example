import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SWRResponse } from 'swr'
import { z } from 'zod'

import { DayOfWeek, daysOfWeek } from '@/constants/daysOfWeek'
import { path } from '@/constants/path'
import { Reservation, ReservationForm, ReservationFormSchema } from '@/schema/zod'

import { TimeToDateInput } from './TimeToDateInput'

const formId = 'reservation'
const initialDay = 1

type Props = {
  subdomain: string
  userId: string
  year: number
  month: number
  mutate: SWRResponse<Reservation[]>['mutate']
}

export const useReservationDialog = ({ subdomain, userId, year, month, mutate }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [day, setDay] = useState<number>(initialDay)
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | null>(null)

  const initialDate = useMemo(() => {
    const date = new Date(year, month - 1, 1)
    date.setHours(0, 0)
    return date
  }, [month, year])

  const {
    formState: { isSubmitting, errors },
    register,
    control,
    setValue,
    clearErrors,
    handleSubmit,
    reset,
  } = useForm<ReservationForm>({
    defaultValues: {
      date: initialDate,
      startTime: initialDate,
      endTime: initialDate,
      support_content: '',
      userId,
    },
    resolver: zodResolver(ReservationFormSchema),
  })

  const setFormValues = useCallback(
    (d: number) => {
      const newDateTime = new Date(year, month - 1, d)
      setValue('date', newDateTime)
      setValue('startTime', newDateTime)
      setValue('endTime', newDateTime)
    },
    [month, setValue, year],
  )

  const onReservationDialogOpen = useCallback(
    (d: number, selectedReservation?: Reservation) => {
      const dow = daysOfWeek[new Date(year, month - 1, day).getDay()]

      setDay(d)
      setDayOfWeek(dow)
      setFormValues(d)
      setReservation(selectedReservation || null)

      onOpen()
    },
    [day, month, onOpen, setFormValues, year],
  )

  const onReservationDialogClose = useCallback(() => {
    onClose()
    setDay(initialDay)
    setDayOfWeek(null)
    setReservation(null)
    reset()
    clearErrors()
  }, [clearErrors, onClose, reset])

  useEffect(() => {
    if (reservation) {
      setValue('date', new Date(reservation.date))
      setValue('startTime', new Date(reservation.startTime))
      setValue('endTime', new Date(reservation.endTime))
      setValue('support_content', reservation.support_content)
    }
  }, [reservation, setValue])

  const onValid = useCallback<SubmitHandler<ReservationForm>>(
    async (data, event) => {
      event?.preventDefault()

      try {
        const { date, startTime, endTime } = ReservationFormSchema.parse(data)
        const body = {
          ...data,
          date: date.toISOString(),
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }

        if (reservation) {
          // 更新処理
          const response = await fetch(path.api.reservations.update(subdomain, reservation.id), {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })

          const updatedReservation = await response.json()

          mutate((prev) => (prev ? prev.map((r) => (r.id === updatedReservation.id ? updatedReservation : r)) : []), false)
        } else {
          // 新規作成処理
          const response = await fetch(path.api.reservations.create(subdomain), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })

          const newReservation = await response.json()

          mutate((prev) => [...(prev || []), newReservation], false)
        }

        onReservationDialogClose()
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error(error.issues)
          return
        }

        console.error(error)
      }
    },
    [mutate, onReservationDialogClose, reservation, subdomain],
  )

  const header = reservation
    ? `${year}年${month}月${day}日（${dayOfWeek}）の予約を変更する`
    : `${year}年${month}月${day}日（${dayOfWeek}）の予約をする`

  const ReservationDialog: FC = () => (
    <Modal size="xl" isOpen={isOpen} onClose={onReservationDialogClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" id={formId} onSubmit={handleSubmit(onValid)}>
          <HStack>
            <FormControl id="start-time" width={120} isInvalid={!!errors.startTime}>
              <FormLabel fontSize="xs">開始時間</FormLabel>
              <TimeToDateInput name="startTime" control={control} date={new Date(year, month - 1, day || 1)} />
              {errors.startTime && <FormErrorMessage>{errors.startTime.message}</FormErrorMessage>}
            </FormControl>
            <FormControl id="end-time" width={120}>
              <FormLabel fontSize="xs">終了時間</FormLabel>
              <TimeToDateInput name="endTime" control={control} date={new Date(year, month - 1, day || 1)} />
            </FormControl>
            <FormControl id="start-time" width={120}>
              <FormLabel fontSize="xs">介護内容</FormLabel>
              <Input {...register('support_content')} />
            </FormControl>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} disabled={isSubmitting} onClick={onReservationDialogClose}>
            キャンセル
          </Button>
          <Button form={formId} type="submit" colorScheme="blue" disabled={isSubmitting}>
            {reservation ? '更新' : '予約'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  return { ReservationDialog, onReservationDialogOpen }
}
