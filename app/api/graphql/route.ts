import { NextRequest, NextResponse } from "next/server"

// Backend URL is kept secret on the server - never exposed to clients
const getBackendUrl = () => {
    const url = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_KEYSTONE_URL || "http://localhost:3000"
    // Remove /api/graphql suffix if present
    return url.replace(/\/api\/graphql$/, "")
}

const BACKEND_API_KEY = process.env.BACKEND_API_KEY // Optional: for extra security

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

// Handle GET requests for GraphQL playground (optional)
export async function GET(req: NextRequest) {
    return NextResponse.json({ 
        message: "GraphQL endpoint - use POST requests" 
    })
}
