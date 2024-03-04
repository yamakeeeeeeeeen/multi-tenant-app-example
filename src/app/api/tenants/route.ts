import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { TenantForm, TenantFormSchema } from '@/schema/zod'

export const config = {
  runtime: 'experimental-edge',
}

export const POST = async (req: NextRequest) => {
  try {
    let body: TenantForm

    try {
      const data = await req.json()
      body = TenantFormSchema.parse(data)
    } catch (e) {
      return new NextResponse('Invalid request', {
        status: 400,
      })
    }

    const tenant = await prisma.tenant.create({
      data: body,
    })

    return new NextResponse(JSON.stringify({ tenant }), {
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
