import { Button, FormControl, FormLabel, HStack, Heading, Input, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { FC } from 'react'

export const Page: FC = () => (
  <>
    <Heading as="h1" size="md" pb={4}>
      ユーザー新規登録
    </Heading>

    <VStack as="form" pb={4}>
      <FormControl id="name" width={200}>
        <FormLabel fontSize="xs">名前</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl id="name-kana" width={200}>
        <FormLabel fontSize="xs">ふりがな</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl id="birthday" width={200}>
        <FormLabel fontSize="xs">誕生日</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl as="fieldset" width={200}>
        <FormLabel as="legend">性別</FormLabel>
        <RadioGroup defaultValue="male">
          <HStack spacing="24px">
            <Radio value="male" size="sm">
              男性
            </Radio>
            <Radio value="female" size="sm">
              女性
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl id="postal_code" width={200}>
        <FormLabel fontSize="xs">住所</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl id="postal_code" width={200}>
        <FormLabel fontSize="xs">郵便番号</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl id="address" width={200}>
        <FormLabel fontSize="xs">住所</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl id="address_detail" width={200}>
        <FormLabel fontSize="xs">丁目番地他</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl id="email" width={200}>
        <FormLabel fontSize="xs">メールアドレス</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl id="phone" width={200}>
        <FormLabel fontSize="xs">電話番号</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl as="fieldset" width={200}>
        <FormLabel as="legend">重度</FormLabel>
        <RadioGroup defaultValue="small">
          <HStack spacing="24px">
            <Radio value="small" size="sm">
              軽度
            </Radio>
            <Radio value="medium" size="sm">
              中度
            </Radio>
            <Radio value="large" size="sm">
              重度（車椅子）
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl id="comment" width={200}>
        <FormLabel fontSize="xs">コメント</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>

      <HStack>
        <Button size="xs" variant="outline">
          入力内容をクリア
        </Button>
        <Button type="submit" size="xs" variant="outline">
          内容確認
        </Button>
      </HStack>
    </VStack>
  </>
)
