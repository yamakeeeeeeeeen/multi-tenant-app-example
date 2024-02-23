import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const config = {
  runtime: "experimental-edge",
}

export const GET = async (_req: NextRequest, { params }: { params: { subdomain: string } }) => {
  try {
    const subdomain = decodeURIComponent(params.subdomain)

    if (!subdomain) {
      return new NextResponse("Not Found", {
        status: 404,
      })
    }

    const tenant = await prisma.tenant.findUnique({
      where: {
        subdomain: subdomain,
      },
    })

    if (!tenant) {
      return new NextResponse("Not Found", {
        status: 404,
      })
    }

    return new NextResponse(JSON.stringify(tenant), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
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
