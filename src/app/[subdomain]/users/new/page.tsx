'use client'

import { NextPage } from 'next'

import { Page } from '@/components/pages/users/new'
import { PageProps } from '@/types/pageProps'

const UserNew: NextPage<PageProps> = ({ params: { subdomain } }) => <Page subdomain={subdomain} />

export default UserNew
