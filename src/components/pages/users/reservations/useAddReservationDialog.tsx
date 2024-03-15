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
import { FC, useCallback, useMemo, useState } from 'react'
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
  id: string
  year: number
  month: number
  mutate: SWRResponse<Reservation[]>['mutate']
}

export const useAddReservationDialog = ({ subdomain, id, year, month, mutate }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [day, setDay] = useState<number>(initialDay)
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | null>(null)

  const initialDate = useMemo(() => {
    const date = new Date(year, month - 1, 1)
    date.setHours(0, 0)
    return date
  }, [month, year])

  const {
    formState: { errors },
    register,
    control,
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm<ReservationForm>({
    defaultValues: {
      date: initialDate,
      startTime: initialDate,
      endTime: initialDate,
      support_content: '',
      userId: id,
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
    (d: number) => {
      const dow = daysOfWeek[new Date(year, month - 1, day).getDay()]

      setDay(d)
      setDayOfWeek(dow)
      setFormValues(d)

      onOpen()
    },
    [day, month, onOpen, setFormValues, year],
  )

  const onReservationDialogClose = useCallback(() => {
    onClose()
    setDay(initialDay)
    setDayOfWeek(null)
    setFormValues(initialDay)
    setValue('support_content', '')
    clearErrors()
  }, [clearErrors, onClose, setFormValues, setValue])

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

        const response = await fetch(path.api.reservations.create(subdomain), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })

        const reservation = await response.json()

        mutate((prev) => [...(prev || []), reservation], false)
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error(error.issues)
          return
        }

        console.error(error)
      }

      // APIリクエストを実行して予約を追加
      // 例: await addReservation(time);
      onReservationDialogClose()
    },
    [mutate, onReservationDialogClose, subdomain],
  )

  const header = `${year}年${month}月${day}日（${dayOfWeek}）の予約をする`

  const AddReservationDialog: FC = () => (
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
          <Button colorScheme="red" mr={3} onClick={onReservationDialogClose}>
            キャンセル
          </Button>
          <Button form={formId} type="submit" colorScheme="blue">
            予約
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  return { AddReservationDialog, onReservationDialogOpen }
}
