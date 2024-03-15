import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const DELETE = async (_req: NextRequest, { params }: { params: { subdomain: string; id: string } }) => {
  const subdomain = decodeURIComponent(params.subdomain)
  const id = decodeURIComponent(params.id)

  const tenant = await prisma.tenant.findUnique({
    where: {
      subdomain,
    },
  })

  if (!tenant) {
    return new NextResponse('Tenant not found', {
      status: 404,
    })
  }

  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        tenantId: tenant.id,
        id,
      },
    })

    if (!reservation) {
      return new NextResponse('Reservation not found', {
        status: 404,
      })
    }

    await prisma.reservation.delete({
      where: {
        tenantId: tenant.id,
        id,
      },
    })

    return new NextResponse('Reservation deleted', {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', {
      status: 500,
    })
  }
}
