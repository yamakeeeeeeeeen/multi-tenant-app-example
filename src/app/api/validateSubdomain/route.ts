import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const config = {
  runtime: "experimental-edge",
}

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const subdomain = url.searchParams.get("subdomain")

  if (!subdomain) {
    return new NextResponse(JSON.stringify({ isValid: false }), {
      status: 400,
    })
  }

  try {
    const tenant = await prisma.tenant.findUnique({
      where: {
        subdomain: subdomain,
      },
    })

    return new NextResponse(JSON.stringify({ isValid: !!tenant }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ isValid: false }), {
      status: 500,
    })
  }
}
