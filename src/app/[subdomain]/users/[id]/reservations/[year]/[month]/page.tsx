'use client'

import { NextPage } from 'next'

import { Page } from '@/components/pages/users/reservations/[year]/[month]'

// TODO: 共通化しているPagePropsと合わせたい
type Props = {
  params: {
    subdomain: string
    id: string
    year: number
    month: number
  }
}

const ReservationsYearMonth: NextPage<Props> = ({ params: { subdomain, id, year, month } }) => (
  <Page subdomain={subdomain} id={id} year={year} month={month} />
)

export default ReservationsYearMonth
