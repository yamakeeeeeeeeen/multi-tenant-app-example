"use client"

import NextLink from "next/link"
import { NextPage } from "next"
import useSWR from "swr"
import { Box, Heading, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import { path } from "@/constants/path"
import { PageProps } from "@/types/pageProps"
import { Tenant } from "@/schema/zod"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const DomainIndex: NextPage<PageProps> = ({ params: { subdomain } }) => {
  const { data, error } = useSWR<Tenant>(path.api.tenants.show(subdomain), fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <main>
      <Box>
        <Heading as="h1" size="md" mb={4}>
          {data.name}
        </Heading>
        <Text fontSize="xs">サブドメイン: {data.subdomain}</Text>
        <Text fontSize="xs">企業アカウント作成日: {new Date(data.createdAt).toLocaleDateString()}</Text>
      </Box>

      <Box>
        <UnorderedList>
          <ListItem>
            <Link as={NextLink} href={path.users}>
              利用者一覧
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href={path.usersNew}>
              利用者作成
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </main>
  )
}

export default DomainIndex
