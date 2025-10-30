import { NextRequest, NextResponse } from "next/server"
import { forgotPassword } from "@/lib/keystone"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null)
        const email = body?.email?.toString().trim()
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 })
        }
        await forgotPassword({ email })
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || "Request failed" }, { status: 400 })
    }
}


