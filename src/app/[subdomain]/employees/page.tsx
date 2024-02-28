"use client"

import { NextPage } from "next"
import { PageProps } from "@/types/pageProps"
import { Page } from "@/components/pages/employees/index"

const EmployeesIndex: NextPage<PageProps> = ({ params: { subdomain } }) => {
  return <Page subdomain={subdomain} />
}

export default EmployeesIndex
