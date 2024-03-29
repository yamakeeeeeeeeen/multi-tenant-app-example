import { NextRequest, NextResponse } from 'next/server'

import { convertDateToISO } from '@/app/api/helpers/convertDateToISO'
import { prisma } from '@/lib/prisma'
import { UserForm, UserFormSchema } from '@/schema/zod'

export const config = {
  runtime: 'experimental-edge',
}

export const GET = async (req: NextRequest, { params }: { params: { subdomain: string } }) => {
  try {
    const subdomain = decodeURIComponent(params.subdomain)

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

    const users = await prisma.user.findMany({
      where: {
        tenantId: tenant.id,
      },
    })

    return new NextResponse(JSON.stringify(users), {
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

  let body: UserForm

  try {
    const data = await req.json()
    body = UserFormSchema.parse(data)
  } catch (e) {
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

  const createUserWithAccountAndUserAccount = async () =>
    await prisma.$transaction(async (p) => {
      const account = await p.account.create({
        data: {
          tenantId: tenant.id,
        },
      })

      const userAccount = await p.userAccount.create({
        data: {
          tenantId: tenant.id,
          accountId: account.id,
        },
      })

      const user = await p.user.create({
        data: {
          ...body,
          birthday: convertDateToISO(body.birthday),
          tenantId: tenant.id,
          userAccountId: userAccount.id,
        },
      })

      return user
    })

  try {
    const user = await createUserWithAccountAndUserAccount()

    return new NextResponse(JSON.stringify({ user }), {
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
