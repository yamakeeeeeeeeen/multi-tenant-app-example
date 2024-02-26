"use client"

import { NextPage } from "next"
import { Page } from "@/components/pages/users/new"
import { PageProps } from "@/types/pageProps"

const UserNew: NextPage<PageProps> = ({ params: { subdomain } }) => {
  return <Page subdomain={subdomain} />
}

export default UserNew
