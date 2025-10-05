"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook } from "lucide-react"
import { OverleafWordmark } from "@/components/overleaf-logo"

export function LoginSection() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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

            {/* Right Side - Login Form (Responsive) */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo for Mobile */}
                    <div className="lg:hidden flex justify-center items-center mb-8">
                        <OverleafWordmark className="mx-auto" />
                    </div>

                    {/* Tabs */}
                    <div className="inline-flex rounded-full bg-white p-1 mb-6 lg:mb-8 shadow-sm w-full lg:w-auto">
                        <Button
                            variant="ghost"
                            onClick={() => setActiveTab("login")}
                            className={`rounded-full px-6 lg:px-8 flex-1 lg:flex-none ${
                                activeTab === "login" 
                                    ? "bg-purple-100 text-purple-900 hover:bg-purple-200" 
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            Log In
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setActiveTab("register")}
                            className={`rounded-full px-6 lg:px-8 flex-1 lg:flex-none ${
                                activeTab === "register" 
                                    ? "bg-purple-100 text-purple-900 hover:bg-purple-200" 
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            Register
                        </Button>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-gray-900">
                        Log in to your account
                    </h2>

                    {/* Form */}
                    <form className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className="h-12 lg:h-14 bg-white border-gray-200"
                        />
                        
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            className="h-12 lg:h-14 bg-white border-gray-200"
                        />

                        <div className="text-left pt-2">
                            <a href="#" className="text-sm text-gray-700 hover:text-gray-900 underline">
                                Forgot your password?
                            </a>
                        </div>

                        <Button 
                            type="submit"
                            className="w-full h-12 lg:h-14 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium mt-6"
                        >
                            Log in
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6 lg:my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-50 text-gray-500">or</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" size="icon" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 border-gray-200">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="55" height="55" rx="7.5" fill="white"/>
                        <rect x="0.5" y="0.5" width="55" height="55" rx="7.5" stroke="#D4CAE3"/>    
                        <g clip-path="url(#clip0_2_4234)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.8847 27.9999C18.8847 26.9838 19.0534 26.0095 19.3547 25.0958L14.0821 21.0695C13.0545 23.1559 12.4756 25.5068 12.4756 27.9999C12.4756 30.491 13.0538 32.8405 14.08 34.9255L19.3497 30.8913C19.0513 29.9818 18.8847 29.0111 18.8847 27.9999Z" fill="#FBBC05"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M28.1421 18.7555C30.3497 18.7555 32.3437 19.5378 33.9103 20.8178L38.4679 16.2666C35.6906 13.8489 32.13 12.3555 28.1421 12.3555C21.951 12.3555 16.63 15.8962 14.082 21.0695L19.3546 25.0958C20.5695 21.408 24.0325 18.7555 28.1421 18.7555Z" fill="#EB4335"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M28.1422 37.2444C24.0325 37.2444 20.5695 34.592 19.3546 30.9042L14.082 34.9298C16.63 40.1038 21.951 43.6444 28.1422 43.6444C31.9634 43.6444 35.6116 42.2876 38.3497 39.7454L33.3449 35.8763C31.9328 36.7659 30.1546 37.2444 28.1422 37.2444Z" fill="#34A853"/>                 
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M43.0966 28C43.0966 27.0755 42.9542 26.08 42.7406 25.1555H28.1421V31.2H36.5451C36.125 33.2608 34.9813 34.8451 33.3448 35.8762L38.3496 39.7454C41.2259 37.0759 43.0966 33.0993 43.0966 28Z" fill="#4285F4"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2_4234">
                        <rect width="32" height="32" fill="white" transform="translate(12 12)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        </Button>

                        <Button variant="outline" size="icon" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 border-gray-200">
                            <Facebook className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="currentColor" />
                        </Button>
                        <Button variant="outline" size="icon" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 border-gray-200">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}