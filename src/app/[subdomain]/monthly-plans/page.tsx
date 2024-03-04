import { NextPage } from 'next'

import { Page } from '@/components/pages/monthly-plans/show'
import { PageProps } from '@/types/pageProps'

const MonthlyPlansShow: NextPage<PageProps> = ({ params: { subdomain } }) => <Page subdomain={subdomain} />

export default MonthlyPlansShow
