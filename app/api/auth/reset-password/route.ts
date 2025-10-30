import { NextRequest, NextResponse } from "next/server"
import { resetPassword } from "@/lib/keystone"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null)
        const token = body?.token?.toString()
        const password = body?.password?.toString()
        if (!token || !password) {
            return NextResponse.json({ error: "token and password are required" }, { status: 400 })
        }
        await resetPassword({ token, password })
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || "Reset failed" }, { status: 400 })
    }
}


