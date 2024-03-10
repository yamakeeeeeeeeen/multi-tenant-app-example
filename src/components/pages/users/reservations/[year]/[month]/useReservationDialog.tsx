import {
  Button,
  FormControl,
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
import { FC, useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { DayOfWeek } from '@/constants/daysOfWeek'
import { ShiftForm } from '@/schema/zod'

import { TimeToDateInput } from './TimeToDateInput'

const formId = 'reservation'
const initialDay = 1

export const useReservationDialog = (year: number, month: number) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [day, setDay] = useState<number>(initialDay)
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | null>(null)

  const initialDate = useMemo(() => {
    const date = new Date(year, month - 1, 1)
    date.setHours(0, 0)
    return date
  }, [month, year])

  const { register, handleSubmit, setValue, control } = useForm<ShiftForm>({
    defaultValues: {
      date: initialDate,
      startTime: initialDate,
      endTime: initialDate,
      support_content: '',
    },
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
    (d: number, dow: DayOfWeek) => {
      setDay(d)
      setDayOfWeek(dow)
      setFormValues(d)

      onOpen()
    },
    [onOpen, setFormValues],
  )

  const onReservationDialogClose = useCallback(() => {
    onClose()
    setDay(initialDay)
    setDayOfWeek(null)
    setFormValues(initialDay)
  }, [onClose, setFormValues])

  const onValid = useCallback<SubmitHandler<ShiftForm>>(
    (data, event) => {
      console.log('🚀 ~ useReservationDialog ~ data:', data)
      event?.preventDefault()

      // APIリクエストを実行して予約を追加
      // 例: await addReservation(time);
      onReservationDialogClose()
    },
    [onReservationDialogClose],
  )

  const header = `${year}年${month}月${day}日（${dayOfWeek}）の予約をする`

  const ReservationDialog: FC = () => (
    <Modal size="xl" isOpen={isOpen} onClose={onReservationDialogClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" id={formId} onSubmit={handleSubmit(onValid)}>
          <HStack>
            <FormControl id="start-time" width={120}>
              <FormLabel fontSize="xs">開始時間</FormLabel>
              <TimeToDateInput name="startTime" control={control} date={new Date(year, month - 1, day || 1)} />
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

  return { ReservationDialog, onReservationDialogOpen }
}
