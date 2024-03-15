import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { ReservationForm, ReservationFormSchema } from '@/schema/zod'

const getReservationsSchema = z.object({
  userId: z.string().uuid(),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: 'Year must be a 4-digit number' })
    .transform(Number)
    .refine((year) => year >= 2024, {
      message: 'Year must be greater than or equal to 2024',
    }),
  month: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])$/, { message: 'Month must be a number between 1 and 12' })
    .transform(Number),
})

export const GET = async (req: NextRequest, { params }: { params: { subdomain: string } }) => {
  const subdomain = decodeURIComponent(params.subdomain)
  const { searchParams } = new URL(req.url)

  let query: z.infer<typeof getReservationsSchema>

  try {
    query = getReservationsSchema.parse({
      userId: searchParams.get('userId'),
      year: searchParams.get('year'),
      month: searchParams.get('month'),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: error.issues }), {
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
      id: query.userId,
    },
  })

  if (!user) {
    return new NextResponse('User not found', {
      status: 404,
    })
  }

  try {
    const reservation = await prisma.reservation.findMany({
      where: {
        tenantId: tenant.id,
        userId: user.id,
        // 特定の年月の予約を取得する
        // ex) 2024-01-01T00:00:00.000Z <= date < 2024-02-01T00:00:00.000Z
        date: {
          gte: new Date(query.year, query.month - 1, 1),
          lt: new Date(query.year, query.month, 1),
        },
      },
    })

    return new NextResponse(JSON.stringify(reservation), {
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
    const reservation = await prisma.reservation.create({
      data: {
        ...body,
        tenantId: tenant.id,
        userId: user.id,
      },
    })

    return new NextResponse(JSON.stringify(reservation), {
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
