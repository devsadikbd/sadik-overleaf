import { NextRequest, NextResponse } from "next/server"
import { getBackendUrl, BACKEND_API_KEY } from "@/lib/api-config"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const backendUrl = getBackendUrl()

        // Forward the request to the actual backend
        const response = await fetch(`${backendUrl}/api/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add API key if configured
                ...(BACKEND_API_KEY && { "x-api-key": BACKEND_API_KEY }),
            },
            body: JSON.stringify(body),
        })

        const data = await response.json()

        // Return the backend response
        return NextResponse.json(data, { status: response.status })
    } catch (error: any) {
        console.error("Backend proxy error:", error)
        return NextResponse.json(
            { error: "Failed to connect to backend service" },
            { status: 500 }
        )
    }
}
