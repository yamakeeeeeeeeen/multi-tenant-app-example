'use client'

import { NextPage } from 'next'

import { Page } from '@/components/pages/users/index'
import { PageProps } from '@/types/pageProps'

const Users: NextPage<PageProps> = ({ params: { subdomain } }) => <Page subdomain={subdomain} />

export default Users
