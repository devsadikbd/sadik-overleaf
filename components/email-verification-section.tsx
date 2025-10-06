"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OverleafWordmark } from "@/components/overleaf-logo"
import { Mail, CheckCircle2 } from "lucide-react"

export function EmailVerificationSection() {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [email] = useState("") // This would come from registration
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0]
        }

        if (!/^\d*$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6)
        if (!/^\d+$/.test(pastedData)) return

        const newCode = [...code]
        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newCode[i] = pastedData[i]
        }
        setCode(newCode)

        // Focus the next empty input or the last one
        const nextIndex = Math.min(pastedData.length, 5)
        inputRefs.current[nextIndex]?.focus()
    }

    const handleConfirm = () => {
        const fullCode = code.join("")
        if (fullCode.length === 6) {
            // Handle verification logic here
            console.log("Verification code:", fullCode)
        }
    }

    const handleResend = () => {
        // Handle resend logic here
        console.log("Resending code to:", email)
    }

    const isCodeComplete = code.every(digit => digit !== "")

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

            {/* Right Side - Email Verification Form (Responsive) */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo for Mobile */}
                    <div className="lg:hidden flex justify-center items-center mb-8">
                        <Link href="/">
                            <OverleafWordmark className="mx-auto cursor-pointer" />
                        </Link>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                            Confirm your email address
                        </h2>
                        
                        <p className="text-gray-600 mb-8">
                            Enter the 6 digit confirmation code sent 
to devsadikbd@gmail.com <span className="font-medium text-gray-900">{email}</span>
                        </p>

                        {/* 6-Digit Code Input */}
                        <div className="flex justify-center gap-2 mb-6">
                            {code.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    required
                                    className="w-12 h-12 lg:w-14 lg:h-14 text-center text-xl font-semibold bg-white border-gray-200 focus:border-[#511da1] focus:ring-[#511da1]"
                                />
                            ))}
                        </div>

                        {/* Confirm Button */}
                        <Link href="/reset-password" className="block">
                        <Button 
                            onClick={handleConfirm}
                            className={`w-full h-12 lg:h-14 font-medium mb-4 transition-colors ${
                                isCodeComplete
                                    ? "bg-[#511da1] hover:bg-[#411687] text-white" 
                                    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                            }`}
                            disabled={!isCodeComplete}
                        >
                            Confirm
                        </Button>
                            </Link>
                        {/* Resend Button */}
                        <Link href="/email-verification" className="block">
                        <Button 
                            onClick={handleResend}
                            variant="outline"
                            className="w-full h-12 lg:h-14 border-2 border-[#511da1] text-[#511da1] hover:bg-purple-50 font-medium"
                        >
                            Resend Confirmation Code
                        </Button>
                        </Link>

                        {/* Back to Login */}
                        <div className="mt-8">
                            <p className="text-sm text-gray-600">
                                Back to{" "}
                                <Link href="/login" className="text-[#511da1] hover:text-[#411687] font-medium">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
