"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending")
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (!token) {
      setStatus("error")
      setMessage("No token provided in the URL.")
      return
    }

    // Call backend verify endpoint directly
    fetch(`http://localhost:3000/api/auth/verify-email?token=${encodeURIComponent(token)}`, {
      credentials: "include",
    })
      .then(async (res) => {
        const text = await res.text()
        try {
          return { status: res.status, body: JSON.parse(text) }
        } catch {
          return { status: res.status, body: text }
        }
      })
      .then(({ status: httpStatus, body }) => {
        if (httpStatus >= 200 && httpStatus < 300 && (body?.ok || body?.message)) {
          setStatus("success")
          setMessage("Email verified successfully. Redirecting to login...")
          setTimeout(() => router.push("/login"), 1200)
        } else {
          setStatus("error")
          setMessage(body?.error || body?.message || "Verification failed")
        }
      })
      .catch((err) => {
        console.error(err)
        setStatus("error")
        setMessage("Cannot reach backend server. Make sure it's running on port 3000")
      })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">Verifying your email</h1>
        {status === "pending" && <p className="text-gray-600">Please wait — verifying your token...</p>}
        {status === "success" && <p className="text-green-600 font-medium">{message}</p>}
        {status === "error" && <p className="text-red-600 font-medium">{message}</p>}
        <div className="mt-6">
          <a href="/" className="text-sm text-gray-600 underline">Back to home</a>
        </div>
      </div>
    </div>
  )
}
