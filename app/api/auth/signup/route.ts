import { NextRequest, NextResponse } from "next/server"
import { signup } from "@/lib/keystone"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null)
        const name = body?.name?.toString().trim()
        const email = body?.email?.toString().trim()
        const password = body?.password?.toString()

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Derive the frontend origin so verification emails link to the correct domain
        const origin = new URL(req.url).origin
        await signup({ name, email, password, baseUrl: origin })
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || "Signup failed" }, { status: 400 })
    }
}

