import { NextRequest, NextResponse } from 'next/server'

import { convertDateToISO } from '@/app/api/helpers/convertDateToISO'
import { prisma } from '@/lib/prisma'
import { EmployeeForm, EmployeeFormSchema } from '@/schema/zod'

export const GET = async (_req: NextRequest, { params }: { params: { subdomain: string } }) => {
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

    const employees = await prisma.employee.findMany({
      where: {
        tenantId: tenant.id,
      },
    })

    return new NextResponse(JSON.stringify(employees), {
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

  let body: EmployeeForm

  try {
    const data = await req.json()
    body = EmployeeFormSchema.parse(data)
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

  const createEmployeeWithAccountAndEmployeeAccount = async () =>
    await prisma.$transaction(async (p) => {
      const account = await p.account.create({
        data: {
          tenantId: tenant.id,
        },
      })

      const employeeAccount = await p.employeeAccount.create({
        data: {
          tenantId: tenant.id,
          accountId: account.id,
        },
      })

      const employee = await p.employee.create({
        data: {
          ...body,
          hireDate: convertDateToISO(body.hireDate),
          contractEndDate: body.contractEndDate ? convertDateToISO(body.contractEndDate) : null,
          tenantId: tenant.id,
          employeeAccountId: employeeAccount.id,
        },
      })

      return employee
    })

  try {
    const employee = await createEmployeeWithAccountAndEmployeeAccount()

    return new NextResponse(JSON.stringify({ employee }), {
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
