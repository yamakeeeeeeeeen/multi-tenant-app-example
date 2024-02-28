import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { FC } from "react"
import { path } from "@/constants/path"
import useSWR from "swr"
import { DIVISION1_LABELS, DIVISION2_LABELS, Employee, JOB_TYPE_LABELS, QUALIFICATION_LABELS } from "@/schema/zod"

type Props = {
  subdomain: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const Page: FC<Props> = ({ subdomain }) => {
  const { data: employees, error } = useSWR<Employee[]>(path.api.employees.index(subdomain), fetcher)

  if (error) return <div>Failed to load</div>
  if (!employees) return <div>Loading...</div>

  return (
    <>
      <Heading as="h1" size="md" pb={4}>
        従業員一覧
      </Heading>

      <HStack as="form" pb={4}>
        <FormControl id="search-id" width={200}>
          <FormLabel fontSize="xs">ID</FormLabel>
          <Input type="text" size="xs" />
        </FormControl>

        <FormControl id="search-name-kana" width={200}>
          <FormLabel fontSize="xs">従業員名前（ふりがな）</FormLabel>
          <Input type="text" size="xs" />
        </FormControl>

        <Button type="submit" size="xs" variant="outline">
          検索
        </Button>
      </HStack>

      <TableContainer>
        <Table variant="simple" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>変更</Th>
              <Th>
                <Text fontSize="xs">名前</Text>
                <Text fontSize="xs">ふりがな</Text>
                <Text fontSize="xs">性別</Text>
              </Th>
              <Th>職種</Th>
              <Th>区分1</Th>
              <Th>区分2</Th>
              <Th>
                <Text fontSize="xs">資格</Text>
                <Text fontSize="xs">color</Text>
              </Th>
              <Th>複数登録</Th>
              <Th>車運転</Th>
              <Th>1H</Th>
              <Th>
                <Text fontSize="xs">入職日</Text>
                <Text fontSize="xs">契約満了日</Text>
              </Th>
              <Th>
                <Text fontSize="xs">郵便番号</Text>
                <Text fontSize="xs">住所</Text>
                <Text fontSize="xs">電話番号</Text>
              </Th>
              <Th>備考</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => {
              const {
                id,
                name,
                kana,
                gender,
                color,
                hireDate,
                contractEndDate,
                jobType,
                division1,
                division2,
                qualification,
                carDriving,
                move1hour,
                multipleAssignments,
                postalCode,
                address,
                addressDetail,
                phone,
                comment,
              } = employee

              return (
                <Tr key={id}>
                  <Td>
                    <Button size="xs" variant="outline">
                      変更
                    </Button>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{name}</Text>
                    <Text fontSize="xs">{kana}</Text>
                    <Text fontSize="xs">{gender ? "男性" : "女性"}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{JOB_TYPE_LABELS[jobType]}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{division1 ? DIVISION1_LABELS[division1] : ""}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{division2 ? DIVISION2_LABELS[division2] : ""}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{qualification ? QUALIFICATION_LABELS[qualification] : ""}</Text>
                    <Text fontSize="xs">{color}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{multipleAssignments ? "副業務" : ""}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{carDriving ? "あり" : ""}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{move1hour ? "1H" : ""}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{hireDate}</Text>
                    <Text fontSize="xs">{contractEndDate ? contractEndDate : ""}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{postalCode}</Text>
                    <Text fontSize="xs">
                      {address}
                      {addressDetail}
                    </Text>
                    <Text fontSize="xs">{phone}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{comment}</Text>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
