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
import { User } from "@/schema/zod"

type Props = {
  subdomain: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const Page: FC<Props> = ({ subdomain }) => {
  const { data, error } = useSWR<User[]>(path.api.users.index(subdomain), fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Heading as="h1" size="md" pb={4}>
        ユーザー一覧
      </Heading>

      <HStack as="form" pb={4}>
        <FormControl id="search-id" width={200}>
          <FormLabel fontSize="xs">ID</FormLabel>
          <Input type="text" size="xs" />
        </FormControl>

        <FormControl id="search-name-kana" width={200}>
          <FormLabel fontSize="xs">利用者名前（ふりがな）</FormLabel>
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
              <Th>座標</Th>
              <Th>地図</Th>
              <Th>ID</Th>
              <Th>名前 ふりがな 誕生日/性別</Th>
              <Th>重度</Th>
              <Th>郵便番号 居住所 居住所TEL</Th>
              <Th>保護者名前 ふりがな</Th>
              <Th>介護可能者登録</Th>
              <Th>介護可能者</Th>
              <Th>相性設定</Th>
              <Th>介護士（相性良）</Th>
              <Th>自動複写</Th>
              <Th>軽度/緯度</Th>
              <Th>X-Axis/Y-Axis</Th>
              <Th>郵便番号 現住所 現住所TEL</Th>
              <Th>登録日 コメント</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((user) => {
              const {
                id,
                name,
                kana,
                birthday,
                gender,
                postalCode,
                address,
                addressDetail,
                phone,
                careLevel,
                comment,
              } = user

              return (
                <Tr key={id}>
                  <Td>
                    <Button size="xs" variant="outline">
                      変更
                    </Button>
                  </Td>
                  <Td>
                    <Button size="xs" variant="outline">
                      座標反映
                    </Button>
                  </Td>
                  <Td>
                    <Button size="xs" variant="outline">
                      地図
                    </Button>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{id}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{name}</Text>
                    <Text fontSize="xs">{kana}</Text>
                    <Text fontSize="xs">
                      {birthday} {gender}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{careLevel}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{postalCode}</Text>
                    <Text fontSize="xs">{address}</Text>
                    <Text fontSize="xs">{addressDetail}</Text>
                    <Text fontSize="xs">{phone}</Text>
                  </Td>
                  <Td>
                    <Button size="xs" variant="outline">
                      登録
                    </Button>
                  </Td>
                  <Td>
                    <Text fontSize="xs">--全員対象--</Text>
                  </Td>
                  <Td>
                    <Button size="xs" variant="outline">
                      相性
                    </Button>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    <Button size="xs" variant="outline">
                      解除
                    </Button>
                    <Text fontSize="xs">自動複写</Text>
                  </Td>
                  <Td>
                    <Button size="xs" variant="outline">
                      検索pt
                    </Button>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Text fontSize="xs">{postalCode}</Text>
                    <Text fontSize="xs">{address}</Text>
                    <Text fontSize="xs">{addressDetail}</Text>
                    <Text fontSize="xs">{phone}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">TODO</Text>
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
