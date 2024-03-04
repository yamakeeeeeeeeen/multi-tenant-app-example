import { FC } from "react"
import { Box, Grid, GridItem, Text } from "@chakra-ui/react"

type Props = {
  subdomain: string
}

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"] as const

const year = 2024
const month = 2

export const Page: FC<Props> = ({ subdomain }) => {
  console.log(subdomain)

  // 指定された年月の初日と月末の日付を取得
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0)

  // 月の初日が週のどの曜日から始まるかを計算
  const startDayOfWeek = startDate.getDay()

  // 月の開始前と終了後の日付を計算
  const daysFromPrevMonth = startDayOfWeek
  const daysFromNextMonth = (7 - endDate.getDay() - 1) % 7

  // 前月と翌月の日付を取得
  const prevMonthEndDate = new Date(year, month - 1, 0).getDate()
  const prevMonthDays = Array.from({ length: daysFromPrevMonth })
    .map((_, index) => prevMonthEndDate - index)
    .reverse()
  const nextMonthDays = Array.from({ length: daysFromNextMonth }).map((_, index) => index + 1)

  // 月の日付を取得
  const currentMonthDays = Array.from({ length: endDate.getDate() }).map((_, index) => index + 1)

  // カレンダーの全日付を合成
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

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

        {allDays.map((day, index) => (
          <GridItem
            key={index}
            w="100%"
            h="40"
            bg={index >= daysFromPrevMonth && index < daysFromPrevMonth + endDate.getDate() ? "gray.50" : "gray.200"}
            p={2}
            boxShadow="sm"
          >
            <Text textAlign="center" fontWeight="bold">
              {day}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
