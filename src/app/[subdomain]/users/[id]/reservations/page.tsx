'use client'

import { NextPage } from 'next'

import { Page } from '@/components/pages/users/reservations'

// TODO: 共通化しているPagePropsと合わせたい
type Props = {
  params: {
    subdomain: string
    id: string
  }
}

const ReservationsYearMonth: NextPage<Props> = ({ params: { subdomain, id } }) => <Page subdomain={subdomain} id={id} />

export default ReservationsYearMonth
