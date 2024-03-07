import { NextPage } from 'next'

import { Page } from '@/components/pages/users/reservations/[year]/[month]'
import { PageProps } from '@/types/pageProps'

const ReservationsYearMonth: NextPage<PageProps> = ({ params: { subdomain } }) => <Page subdomain={subdomain} />

export default ReservationsYearMonth
