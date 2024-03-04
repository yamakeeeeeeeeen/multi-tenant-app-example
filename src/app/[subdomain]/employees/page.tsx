'use client'

import { NextPage } from 'next'

import { Page } from '@/components/pages/employees/index'
import { PageProps } from '@/types/pageProps'

const EmployeesIndex: NextPage<PageProps> = ({ params: { subdomain } }) => <Page subdomain={subdomain} />

export default EmployeesIndex
