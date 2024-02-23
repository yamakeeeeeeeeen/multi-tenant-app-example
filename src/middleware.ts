import { NextResponse, NextRequest } from "next/server"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}

const middleware = async (req: NextRequest) => {
  const url = req.nextUrl

  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get("host")!

  if (!hostname) {
    return new Response(null, { status: 404 })
  }

  // Get pathname of the request
  const path = url.pathname

  if (path === "/tenants/new") {
    return NextResponse.next()
  }

  const subdomain = hostname.split(".")[0]
  const baseUrl = hostname?.includes("localhost") ? "http://localhost:3000" : `https://${hostname}`
  const validateUrl = `${baseUrl}/api/validateSubdomain?subdomain=${subdomain}`

  // API Routeを呼び出してサブドメインの有効性を確認
  const response = await fetch(validateUrl)
  const { isValid } = await response.json()

  if (!isValid) {
    // サブドメインが無効な場合は404ページを表示
    return new Response(null, { status: 404 })
  }

  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url))
}

export default middleware
