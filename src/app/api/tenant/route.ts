import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const config = {
  runtime: "experimental-edge",
}

export const GET = async (req: NextRequest) => {
  try {
    const tenants = await prisma.tenant.findMany()
    return new NextResponse(JSON.stringify(tenants), {
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

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { name, subdomain } = body

    if (!name || !subdomain) {
      return new NextResponse("Missing fields", {
        status: 400,
      })
    }

    const newTenant = await prisma.tenant.create({
      data: {
        name,
        subdomain,
      },
    })

    return new NextResponse(JSON.stringify(newTenant), {
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
