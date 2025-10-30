import { NextRequest, NextResponse } from "next/server"
import { verifyEmail } from "@/lib/keystone"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const token = searchParams.get("token") || ""
        if (!token) {
            return NextResponse.json({ error: "token is required" }, { status: 400 })
        }
        await verifyEmail({ token })
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || "Verification failed" }, { status: 400 })
    }
}


