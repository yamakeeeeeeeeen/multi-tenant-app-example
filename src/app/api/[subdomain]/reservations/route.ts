import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { ReservationForm, ReservationFormSchema } from '@/schema/zod'

export const POST = async (req: NextRequest, { params }: { params: { subdomain: string } }) => {
  const subdomain = decodeURIComponent(params.subdomain)

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

  const user = await prisma.user.findUnique({
    where: {
      id: body.userId,
    },
  })

  if (!user) {
    return new NextResponse('User not found', {
      status: 404,
    })
  }

  try {
    const shift = await prisma.reservation.create({
      data: {
        ...body,
        tenantId: tenant.id,
        userId: user.id,
      },
    })

    return new NextResponse(JSON.stringify({ shift }), {
      status: 201,
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
