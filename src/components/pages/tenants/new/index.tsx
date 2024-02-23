import { FormControl, FormLabel, Heading, Input, VStack } from "@chakra-ui/react"
import { FC } from "react"

const Page: FC = () => (
  <>
    <Heading as="h1" size="md" mb={4}>
      企業アカウント新規登録
    </Heading>

    <VStack as="form" mb={4}>
      <FormControl id="name" width={200}>
        <FormLabel fontSize="xs">企業名</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
      <FormControl id="name" width={200}>
        <FormLabel fontSize="xs">サブドメイン</FormLabel>
        <Input type="text" size="xs" />
      </FormControl>
    </VStack>
  </>
)

export default Page
