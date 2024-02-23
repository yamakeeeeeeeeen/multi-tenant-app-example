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

const dummyUsers = [
  {
    id: 1,
    name: "山田太郎",
    kana: "やまだたろう",
    birthday: "2000/01/01",
    sex: "男性",
    disability: "重度",
    livingPostalCode: "123-4567",
    livingAddress: "東京都新宿区1-2-3",
    livingTel: "03-1234-5678",
    postalCode: "123-4567",
    address: "東京都新宿区1-2-3",
    tel: "03-1234-5678",
    createdAt: "2021/01/01",
    comment: "コメント1",
  },
  {
    id: 2,
    name: "佐藤二郎",
    kana: "さとうじろう",
    birthday: "2000/02/02",
    sex: "男性",
    disability: "中度",
    livingPostalCode: "234-5678",
    livingAddress: "神奈川県横浜市4-5-6",
    livingTel: "045-1234-5678",
    postalCode: "234-5678",
    address: "神奈川県横浜市4-5-6",
    tel: "045-1234-5678",
    createdAt: "2021/02/02",
    comment: "コメント2",
  },
  {
    id: 3,
    name: "鈴木一郎",
    kana: "すずきいちろう",
    birthday: "2000/03/03",
    sex: "男性",
    disability: "軽度",
    livingPostalCode: "345-6789",
    livingAddress: "埼玉県さいたま市7-8-9",
    livingTel: "048-1234-5678",
    postalCode: "345-6789",
    address: "埼玉県さいたま市7-8-9",
    tel: "048-1234-5678",
    createdAt: "2021/03/03",
    comment: "コメント3",
  },
  {
    id: 4,
    name: "田中花子",
    kana: "たなかはなこ",
    birthday: "2000/04/04",
    sex: "女性",
    disability: "なし",
    livingPostalCode: "456-7890",
    livingAddress: "千葉県千葉市10-11-12",
    livingTel: "043-1234-5678",
    postalCode: "456-7890",
    address: "千葉県千葉市10-11-12",
    tel: "043-1234-5678",
    createdAt: "2021/04/04",
    comment: "コメント4",
  },
  {
    id: 5,
    name: "和田あきこ",
    kana: "わだあきこ",
    birthday: "2000/05/05",
    sex: "女性",
    disability: "重度",
    livingPostalCode: "567-8901",
    livingAddress: "北海道札幌市13-14-15",
    livingTel: "011-1234-5678",
    postalCode: "567-8901",
    address: "北海道札幌市13-14-15",
    tel: "011-1234-5678",
    createdAt: "2021/05/05",
    comment: "コメント5",
  },
  {
    id: 6,
    name: "木村次郎",
    kana: "きむらじろう",
    birthday: "2000/06/06",
    sex: "男性",
    disability: "軽度",
    livingPostalCode: "678-9012",
    livingAddress: "大阪府大阪市16-17-18",
    livingTel: "06-1234-5678",
    postalCode: "678-9012",
    address: "大阪府大阪市16-17-18",
    tel: "06-1234-5678",
    createdAt: "2021/06/06",
    comment: "コメント6",
  },
]

export const Page: FC = () => {
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
            {dummyUsers.map((user) => {
              const {
                id,
                name,
                kana,
                birthday,
                sex,
                disability,
                livingPostalCode,
                livingAddress,
                livingTel,
                postalCode,
                address,
                tel,
                createdAt,
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
                      {birthday} {sex}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{disability}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{livingPostalCode}</Text>
                    <Text fontSize="xs">{livingAddress}</Text>
                    <Text fontSize="xs">{livingTel}</Text>
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
                    <Text fontSize="xs">{tel}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs">{createdAt}</Text>
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
