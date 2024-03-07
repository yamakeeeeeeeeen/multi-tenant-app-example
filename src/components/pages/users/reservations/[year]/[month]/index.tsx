import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { FC } from 'react'

import { useCalender } from './useCalendar'

type Props = {
  subdomain: string
  id: string
  year: number
  month: number
}

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'] as const

export const Page: FC<Props> = ({ subdomain, id, year, month }) => {
  console.log('🚀 ~ subdomain:', subdomain)
  console.log('🚀 ~ id:', id)

  const { allDays, daysFromPrevMonth, endDate } = useCalender(year, month)

  return (
    <Box maxW="container.lg" mx="auto" p={5}>
      <Grid templateColumns="repeat(7, 1fr)" gap={1}>
        {daysOfWeek.map((day) => (
          <GridItem w="100%" h="10" key={day} bg="gray.200" p={2}>
            <Text textAlign="center" fontWeight="bold">
              {day}
            </Text>
          </GridItem>
        ))}

        {allDays.map((day, index) => {
          const currentMonth = index >= daysFromPrevMonth && index < daysFromPrevMonth + endDate.getDate()

          return (
            <GridItem key={index} w="100%" h="40" bg={currentMonth ? 'gray.50' : 'gray.200'} p={2} boxShadow="sm">
              <Text textAlign="center" fontWeight="bold">
                {day}
              </Text>
              {currentMonth && (
                // TODO: ここに条件分岐を追加する
                // 予約がある場合は予約を表示する
                // 予約はAPI経由で取得する

                // 予約がない場合は予約を追加するボタンを表示する
                <Flex justify="center" alignItems="center" h="100%">
                  <Button size="xs" variant="outline">
                    予約を追加
                  </Button>
                </Flex>
              )}
            </GridItem>
          )
        })}
      </Grid>
    </Box>
  )
}
