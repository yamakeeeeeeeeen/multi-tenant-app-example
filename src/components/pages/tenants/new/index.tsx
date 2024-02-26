import { Button, FormControl, FormLabel, Heading, HStack, Input, VStack } from "@chakra-ui/react"
import { FC, useCallback } from "react"
import { useForm } from "react-hook-form"
import { TenantForm } from "@/schema/zod"
import { path } from "@/constants/path"

const Page: FC = () => {
  const { register, handleSubmit } = useForm<TenantForm>({
    defaultValues: {
      name: "",
      subdomain: "",
    },
  })

  const onValid = useCallback(async (data: TenantForm) => {
    console.log(data)
    try {
      const response = await fetch(path.api.tenants.new, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const { tenant } = await response.json()
      console.log(tenant)
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <>
      <Heading as="h1" size="md" mb={4}>
        企業アカウント新規登録
      </Heading>

      <VStack as="form" mb={4} onSubmit={handleSubmit(onValid)}>
        <FormControl id="name" width={200}>
          <FormLabel fontSize="xs">企業名</FormLabel>
          <Input {...register("name")} type="text" size="xs" />
        </FormControl>
        <FormControl id="subdomain" width={200}>
          <FormLabel fontSize="xs">サブドメイン</FormLabel>
          <Input {...register("subdomain")} type="text" size="xs" />
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

export default Page
