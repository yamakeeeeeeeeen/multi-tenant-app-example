import { Button, FormControl, FormLabel, Heading, HStack, Input, Radio, RadioGroup, VStack } from "@chakra-ui/react"
import { FC, useCallback } from "react"
import { useForm } from "react-hook-form"
import { UserForm } from "@/schema/zod/modelSchema/UserSchema"
import { path } from "@/constants/path"

type Props = {
  subdomain: string
}

export const Page: FC<Props> = ({ subdomain }) => {
  const { register, handleSubmit } = useForm<UserForm>({
    defaultValues: {
      name: "",
      kana: "",
      birthday: "",
      gender: "male",
      postalCode: "",
      address: "",
      addressDetail: "",
      email: "",
      phone: "",
      careLevel: "moderate",
      comment: "",
    },
  })

  const onValid = useCallback(
    async (data: UserForm) => {
      try {
        const response = await fetch(path.api.users.new(subdomain), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const { userId } = await response.json()
        console.log(userId)
      } catch (error) {
        console.error(error)
      }
    },
    [subdomain],
  )

  return (
    <>
      <Heading as="h1" size="md" pb={4}>
        ユーザー新規登録
      </Heading>

      <VStack as="form" pb={4} onSubmit={handleSubmit(onValid)}>
        <FormControl id="name" width={200}>
          <FormLabel fontSize="xs">名前</FormLabel>
          <Input {...register("name")} type="text" size="xs" />
        </FormControl>
        <FormControl id="kana" width={200}>
          <FormLabel fontSize="xs">ふりがな</FormLabel>
          <Input {...register("kana")} type="text" size="xs" />
        </FormControl>
        <FormControl id="birthday" width={200}>
          <FormLabel fontSize="xs">誕生日</FormLabel>
          <Input {...register("birthday")} type="date" size="xs" />
        </FormControl>
        <FormControl as="fieldset" width={200}>
          <FormLabel as="legend">性別</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio {...register("gender")} value="male" size="sm">
                男性
              </Radio>
              <Radio {...register("gender")} value="female" size="sm">
                女性
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl id="postalCode" width={200}>
          <FormLabel fontSize="xs">郵便番号</FormLabel>
          <Input {...register("postalCode")} type="text" size="xs" />
        </FormControl>
        <FormControl id="address" width={200}>
          <FormLabel fontSize="xs">住所</FormLabel>
          <Input {...register("address")} type="text" size="xs" />
        </FormControl>
        <FormControl id="addressDetail" width={200}>
          <FormLabel fontSize="xs">丁目番地他</FormLabel>
          <Input {...register("addressDetail")} type="text" size="xs" />
        </FormControl>
        <FormControl id="email" width={200}>
          <FormLabel fontSize="xs">メールアドレス</FormLabel>
          <Input {...register("email")} type="text" size="xs" />
        </FormControl>
        <FormControl id="phone" width={200}>
          <FormLabel fontSize="xs">電話番号</FormLabel>
          <Input {...register("phone")} type="text" size="xs" />
        </FormControl>
        <FormControl id="careLevel" as="fieldset" width={200}>
          <FormLabel as="legend">重度</FormLabel>
          <RadioGroup defaultValue="small">
            <HStack spacing="24px">
              <Radio {...register("careLevel")} value="moderate" size="sm">
                軽度
              </Radio>
              <Radio {...register("careLevel")} value="severe" size="sm">
                中度
              </Radio>
              <Radio {...register("careLevel")} value="wheelchair" size="sm">
                重度（車椅子）
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl id="comment" width={200}>
          <FormLabel fontSize="xs">コメント</FormLabel>
          <Input {...register("comment")} type="text" size="xs" />
        </FormControl>

        <HStack>
          <Button size="xs" variant="outline">
            入力内容をクリア
          </Button>
          <Button type="submit" size="xs" variant="outline">
            登録
          </Button>
        </HStack>
      </VStack>
    </>
  )
}
