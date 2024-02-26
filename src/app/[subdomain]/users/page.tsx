"use client"

import { Page } from "@/components/pages/users/index"
import { NextPage } from "next"
import { PageProps } from "@/types/pageProps"

const Users: NextPage<PageProps> = ({ params: { subdomain } }) => {
  return <Page subdomain={subdomain} />
}

export default Users
