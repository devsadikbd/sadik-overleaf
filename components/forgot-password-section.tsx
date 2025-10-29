"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OverleafWordmark } from "@/components/overleaf-logo"
import { forgotPassword } from "@/lib/keystone"

export function ForgotPasswordSection() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubmitting(true)
            setError("")
            try {
                await forgotPassword({ email, baseUrl: "http://localhost:7777" })
                setIsSubmitted(true)
            } catch (err: any) {
                setError(err?.message || "Request failed")
            } finally {
                setSubmitting(false)
            }
        }
    }

    return (
        <section className="min-h-screen flex">
            {/* Left Side - Hero (Desktop Only) */}
            <div 
                className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center relative overflow-hidden"
                style={{
                    backgroundImage: 'url(/login-background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#452e6b'
                }}
            >
                {/* Optional overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Content Card */}
                <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-md border border-white/20">
                    <div className="mb-6">
                        <OverleafWordmark variant="white" className="h-8" />
                    </div>
                    
                    <h1 className="text-4xl font-bold text-white mb-8 leading-tight">
                        Streamline Your<br />
                        Thesis Journey
                    </h1>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="text-white text-xl flex-shrink-0 mt-1">&lt;/&gt;</div>
                            <p className="text-white text-lg">Seamless visual and code editing</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-white flex-shrink-0 mt-1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </div>
                            <p className="text-white text-lg">work from any device anywhere</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-white flex-shrink-0 mt-1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                            </div>
                            <p className="text-white text-lg">Share your documents effortlessly</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Forgot Password Form (Responsive) */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo for Mobile */}
                    <div className="lg:hidden flex justify-center items-center mb-8">
                        <Link href="/">
                            <OverleafWordmark className="mx-auto cursor-pointer" />
                        </Link>
                    </div>

                    

                    {!isSubmitted ? (
                        <>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 text-gray-900">
                                Forgot password
                            </h2>
                            
                            <p className="text-gray-600 mb-6 lg:mb-8">
                                Enter your email and we'll send you instructions to reset your password
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        className="h-12 lg:h-14 bg-white border-gray-200"
                                        required
                                    />
                                </div>

                                {error && <p className="text-sm text-red-600">{error}</p>}
                                <Button 
                                    type="submit"
                                    className={`w-full h-12 lg:h-14 font-medium mt-6 transition-colors ${
                                        email 
                                            ? "bg-[#511da1] hover:bg-[#411687] text-white" 
                                            : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                                    }`}
                                    disabled={submitting || !email}
                                >
                                    {submitting ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </form>
                        </>
                    ) : null}

                    {/* Additional Help */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                Back to{" "}
                                <Link href="/login" className="text-[#511da1] hover:text-[#411687] font-medium">
                                    Log in
                                </Link>
                            </p>
                        </div>
                        </div>
            </div>
        </section>
    )
}
