import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const config = {
  runtime: 'experimental-edge',
}

export const GET = async (_req: NextRequest, { params }: { params: { subdomain: string; id: string } }) => {
  try {
    const subdomain = decodeURIComponent(params.subdomain)

    if (!subdomain) {
      return new NextResponse('Not Found', {
        status: 404,
      })
    }

    const tenant = await prisma.tenant.findUnique({
      where: {
        subdomain,
      },
    })

    if (!tenant) {
      return new NextResponse('Not Found', {
        status: 404,
      })
    }

    return new NextResponse(JSON.stringify(tenant), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', {
      status: 500,
    })
  }
}
