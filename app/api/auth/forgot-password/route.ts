import { NextRequest, NextResponse } from "next/server"
import { forgotPassword } from "@/lib/keystone"

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
        await forgotPassword({ email, baseUrl: origin })
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (err: any) {
        console.error("forgot-password proxy error:", err)
        return NextResponse.json({ error: err?.message || "Request failed" }, { status: 400 })
    }
}


