import { NextRequest, NextResponse } from "next/server"
import { EmployeeForm, EmployeeFormSchema } from "@/schema/zod"
import { prisma } from "@/lib/prisma"
import { convertDateToISO } from "@/app/api/helpers/convertDateToISO"

export const POST = async (req: NextRequest, { params }: { params: { subdomain: string } }) => {
  const subdomain = decodeURIComponent(params.subdomain)

  let body: EmployeeForm

  try {
    const data = await req.json()
    body = EmployeeFormSchema.parse(data)
  } catch (e) {
    return new NextResponse("Invalid request", {
      status: 400,
    })
  }

  const tenant = await prisma.tenant.findUnique({
    where: {
      subdomain: subdomain,
    },
  })

  if (!tenant) {
    return new NextResponse("Tenant not found", {
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
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error", {
      status: 500,
    })
  }
}
