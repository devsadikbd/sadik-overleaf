import { NextRequest, NextResponse } from "next/server"

const getBackendUrl = () => {
    const url = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_KEYSTONE_URL || "http://localhost:3000"
    return url.replace(/\/api\/graphql$/, "")
}

const BACKEND_API_KEY = process.env.BACKEND_API_KEY

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, baseUrl } = body
        const backendUrl = getBackendUrl()

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            )
        }

        // Use server's origin for baseUrl if not provided
        const verifyBaseUrl = baseUrl || req.nextUrl.origin

        // Forward to backend
        const response = await fetch(`${backendUrl}/api/auth/resend-verification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(BACKEND_API_KEY && { "x-api-key": BACKEND_API_KEY }),
            },
            body: JSON.stringify({ email, baseUrl: verifyBaseUrl }),
        })

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
    } catch (error: any) {
        console.error("Resend verification proxy error:", error)
        return NextResponse.json(
            { error: "Resend service unavailable" },
            { status: 500 }
        )
    }
}
