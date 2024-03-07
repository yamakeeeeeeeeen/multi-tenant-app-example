'use client'

import { Box, Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import useSWR from 'swr'

import { path } from '@/constants/path'
import { Tenant } from '@/schema/zod'
import { PageProps } from '@/types/pageProps'

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
            <Link as={NextLink} href={path.users.index}>
              利用者一覧
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href={path.users.new}>
              利用者作成
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href={path.employees.index}>
              従業員一覧
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href={path.employees.new}>
              従業員作成
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href={path.users.reservations.index('928c0fff-f0c6-4059-a87a-f6e7757d96c0', 2024, 3)}>
              月間計画表詳細
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </main>
  )
}

export default DomainIndex
