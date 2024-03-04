'use client'

import { NextPage } from 'next'

import { Page } from '@/components/pages/employees/new'
import { PageProps } from '@/types/pageProps'

const EmployeesNew: NextPage<PageProps> = ({ params: { subdomain } }) => <Page subdomain={subdomain} />

export default EmployeesNew
