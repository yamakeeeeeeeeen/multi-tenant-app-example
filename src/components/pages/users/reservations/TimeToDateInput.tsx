import { Input } from '@chakra-ui/react'
import { ChangeEvent, FC, useCallback } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

import { ShiftForm } from '@/schema/zod'

type Props = {
  date: Date
} & UseControllerProps<ShiftForm>

export const TimeToDateInput: FC<Props> = ({ date, ...props }) => {
  const {
    field: { onChange, value, ...field },
  } = useController(props)

  const timeValue = value?.toLocaleString('ja-JP', { hour: '2-digit', minute: '2-digit' }) || '00:00'

  /*
    以下の関数は、指定された時刻を日付オブジェクトに変換する関数です。
    @param time - 時刻（HH:mm）
    @return 時刻を含む日付オブジェクト
  */
  const timeToDate = useCallback(
    (time: string) => {
      const [hour, minute] = time.split(':')
      // const date = new Date(year, month - 1, day, Number(hour), Number(minute))
      date.setHours(Number(hour), Number(minute))

      return date
    },
    [date],
  )

  const onTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange(timeToDate(e.target.value)),
    [onChange, timeToDate],
  )

  return <Input {...field} value={timeValue} onChange={onTimeChange} size="md" type="time" />
}
