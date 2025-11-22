import { NextRequest, NextResponse } from "next/server"
import { forgotPassword } from "@/lib/keystone"
import { getBackendUrl } from "@/lib/api-config"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null)
        const email = body?.email?.toString().trim()
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 })
        }
        // Derive the frontend origin from the incoming request so the backend
        // will send reset links that point to the correct domain (e.g. sadikbd.vercel.app)
        const origin = new URL(req.url).origin
        // Resolve the backend URL the server will use so we can include it in
        // error messages if the backend is unreachable.
        const backendUrl = getBackendUrl()
        try {
            await forgotPassword({ email, baseUrl: origin })
        } catch (err: any) {
            console.error("forgot-password -> backend error:", err)
            // Return a clearer message including the backend URL attempted so
            // the frontend can show a helpful direction to fix environment vars.
            const message = err?.message || String(err) || "Backend request failed"
            return NextResponse.json({ error: `Backend error contacting ${backendUrl}: ${message}` }, { status: 502 })
        }
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (err: any) {
        console.error("forgot-password proxy error:", err)
        // If we hit this catch, it likely means the proxy itself couldn't parse
        // the request or another server-side issue. Include a hint about
        // BACKEND_URL so the deployer can verify environment variables.
        const backendUrl = getBackendUrl()
        const hint = backendUrl.includes("localhost") ? "(Hint: set BACKEND_URL in your deployment to your backend URL)" : ""
        return NextResponse.json({ error: err?.message || "Request failed", detail: hint }, { status: 400 })
    }
}

