import { NextRequest, NextResponse } from "next/server"
import { getBackendUrl, BACKEND_API_KEY } from "@/lib/api-config"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const backendUrl = getBackendUrl()

        // Get cookies from the incoming request
        const cookies = req.headers.get("cookie") || ""

        // Forward the request to the actual backend with cookies
        const response = await fetch(`${backendUrl}/api/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Forward cookies to backend
                "Cookie": cookies,
                // Add API key if configured
                ...(BACKEND_API_KEY && { "x-api-key": BACKEND_API_KEY }),
            },
            body: JSON.stringify(body),
        })

        const data = await response.json()

        // Get Set-Cookie headers from backend response
        const setCookieHeaders = response.headers.getSetCookie()

        // Create response with backend data
        const nextResponse = NextResponse.json(data, { status: response.status })

        // Forward Set-Cookie headers to the client
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach(cookie => {
                nextResponse.headers.append("Set-Cookie", cookie)
            })
        }

        return nextResponse
    } catch (error: any) {
        console.error("Backend proxy error:", error)
        return NextResponse.json(
            { error: "Failed to connect to backend service" },
            { status: 500 }
        )
    }
}
