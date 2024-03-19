import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { ReservationForm, ReservationFormSchema } from '@/schema/zod'

export const PUT = async (req: NextRequest, { params }: { params: { subdomain: string; id: string } }) => {
  const subdomain = decodeURIComponent(params.subdomain)
  const id = decodeURIComponent(params.id)

  let body: ReservationForm

  try {
    const data = await req.json()
    body = ReservationFormSchema.parse({
      ...data,
      date: new Date(data.date),
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
    })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: e.issues }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new NextResponse('Invalid request', {
      status: 400,
    })
  }

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

    const updatedReservation = await prisma.reservation.update({
      where: {
        tenantId: tenant.id,
        id,
      },
      data: {
        ...body,
        userId: reservation.userId,
      },
    })

    return new NextResponse(JSON.stringify(updatedReservation), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', {
      status: 500,
    })
  }
}

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
