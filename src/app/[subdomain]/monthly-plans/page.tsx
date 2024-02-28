import { NextPage } from "next"
import { PageProps } from "@/types/pageProps"
import { Page } from "@/components/pages/monthly-plans/show"

const MonthlyPlansShow: NextPage<PageProps> = ({ params: { subdomain } }) => {
  return <Page subdomain={subdomain} />
}

export default MonthlyPlansShow
