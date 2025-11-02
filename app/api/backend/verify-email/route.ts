import { NextRequest, NextResponse } from "next/server"

const getBackendUrl = () => {
    const url = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_KEYSTONE_URL || "http://localhost:3000"
    return url.replace(/\/api\/graphql$/, "")
}

const BACKEND_API_KEY = process.env.BACKEND_API_KEY

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const token = searchParams.get("token")
        const backendUrl = getBackendUrl()

        if (!token) {
            return NextResponse.json(
                { error: "Token is required" },
                { status: 400 }
            )
        }

        // Forward to backend with secret credentials
        const response = await fetch(
            `${backendUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`,
            {
                method: "GET",
                headers: {
                    ...(BACKEND_API_KEY && { "x-api-key": BACKEND_API_KEY }),
                },
            }
        )

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
    } catch (error: any) {
        console.error("Verify email proxy error:", error)
        return NextResponse.json(
            { error: "Verification service unavailable" },
            { status: 500 }
        )
    }
}
