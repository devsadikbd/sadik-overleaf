"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook } from "lucide-react";
import { OverleafWordmark } from "@/components/overleaf-logo";

export function SignupSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (
      !(firstName && lastName && email && password) ||
      password !== confirmPassword
    )
      return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          password,
        }),
      });
      // Parse JSON body when possible so we can show a helpful message if backend didn't send email
      let data: any = null;
      try {
        data = await res.json();
      } catch (_) {
        // ignore parse errors
      }
      if (!res.ok) {
        const msg =
          data?.error || data?.message || (await res.text()) || "Signup failed";
        throw new Error(msg);
      }

      // Backend returned success; redirect to email verification page and pass the email
      router.push(`/email-verification?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen flex">
      {/* Left Side - Hero (Desktop Only) */}
      <div
        className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url(/login-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#452e6b",
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
            Streamline Your
            <br />
            Thesis Journey
          </h1>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-white text-xl flex-shrink-0 mt-1">
                &lt;/&gt;
              </div>
              <p className="text-white text-lg">
                Seamless visual and code editing
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-white flex-shrink-0 mt-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <p className="text-white text-lg">
                work from any device anywhere
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-white flex-shrink-0 mt-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
              <p className="text-white text-lg">
                Share your documents effortlessly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form (Responsive) */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <div className="lg:hidden flex justify-center items-center mb-8">
            <Link href="/">
              <OverleafWordmark className="mx-auto cursor-pointer" />
            </Link>
          </div>

          {/* Tabs */}
          <div className="inline-flex rounded-full bg-white p-1 mb-6 lg:mb-8 shadow-sm w-full lg:w-auto">
            <Link href="/login" className="flex-1 lg:flex-none">
              <Button
                variant="ghost"
                className="rounded-full px-6 lg:px-8 w-full hover:bg-gray-100"
              >
                Log In
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="rounded-full px-6 lg:px-8 flex-1 lg:flex-none bg-purple-100 text-purple-900 hover:bg-purple-200"
            >
              Register
            </Button>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-gray-900">
            Create your account
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSignup}>
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 lg:h-14 bg-white border-gray-200"
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 lg:h-14 bg-white border-gray-200"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 lg:h-14 bg-white border-gray-200"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 lg:h-14 bg-white border-gray-200"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 lg:h-14 bg-white border-gray-200"
            />

            <div className="text-left pt-2">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-700 hover:text-gray-900 underline"
              >
                Forgot your password?
              </Link>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              className={`w-full h-12 lg:h-14 font-medium mt-6 transition-colors ${
                firstName && lastName && email && password
                  ? "bg-[#511da1] hover:bg-[#411687] text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700"
              }`}
              disabled={
                submitting ||
                !(firstName && lastName && email && password) ||
                password !== confirmPassword
              }
            >
              {submitting ? "Registering..." : "Register"}
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
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 border-gray-200"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.88468 15.9999C6.88468 14.9838 7.05345 14.0095 7.35468 13.0958L2.08213 9.06946C1.05454 11.1559 0.475586 13.5068 0.475586 15.9999C0.475586 18.491 1.05383 20.8405 2.08 22.9255L7.34969 18.8913C7.05131 17.9818 6.88468 17.0111 6.88468 15.9999Z"
                  fill="#FBBC05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.1421 6.75553C18.3497 6.75553 20.3437 7.53775 21.9103 8.81775L26.4679 4.26664C23.6906 1.84886 20.13 0.35553 16.1421 0.35553C9.95097 0.35553 4.63 3.89615 2.08203 9.06948L7.35458 13.0958C8.56945 9.40797 12.0325 6.75553 16.1421 6.75553Z"
                  fill="#EB4335"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.1422 25.2444C12.0325 25.2444 8.56945 22.592 7.35458 18.9042L2.08203 22.9298C4.63 28.1038 9.95097 31.6444 16.1422 31.6444C19.9634 31.6444 23.6116 30.2876 26.3497 27.7454L21.3449 23.8763C19.9328 24.7659 18.1546 25.2444 16.1422 25.2444Z"
                  fill="#34A853"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M31.0971 16C31.0971 15.0755 30.9547 14.08 30.7411 13.1555H16.1426V19.2H24.5456C24.1255 21.2608 22.9818 22.8451 21.3453 23.8762L26.3501 27.7454C29.2264 25.0759 31.0971 21.0993 31.0971 16Z"
                  fill="#4285F4"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 border-gray-200"
            >
              <Facebook
                className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600"
                fill="currentColor"
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white hover:bg-gray-50 border-gray-200"
            >
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2_5051)">
                  <path
                    d="M16.5 0C7.66533 0 0.5 7.164 0.5 16C0.5 23.0693 5.084 29.0667 11.4427 31.1827C12.2413 31.3307 12.5 30.8347 12.5 30.4133V27.4347C8.04933 28.4027 7.12267 25.5467 7.12267 25.5467C6.39467 23.6973 5.34533 23.2053 5.34533 23.2053C3.89333 22.212 5.456 22.2333 5.456 22.2333C7.06267 22.3453 7.908 23.8827 7.908 23.8827C9.33467 26.328 11.6507 25.6213 12.564 25.212C12.7067 24.1787 13.1213 23.472 13.58 23.0733C10.0267 22.6667 6.29067 21.2947 6.29067 15.1653C6.29067 13.4173 6.916 11.9907 7.93867 10.8707C7.77333 10.4667 7.22533 8.83867 8.09467 6.636C8.09467 6.636 9.43867 6.20667 12.496 8.276C13.772 7.92133 15.14 7.744 16.5 7.73733C17.86 7.744 19.2293 7.92133 20.508 8.276C23.5627 6.20667 24.904 6.636 24.904 6.636C25.7747 8.84 25.2267 10.468 25.0613 10.8707C26.088 11.9907 26.708 13.4187 26.708 15.1653C26.708 21.3107 22.9653 22.664 19.4027 23.06C19.976 23.556 20.5 24.5293 20.5 26.0227V30.4133C20.5 30.8387 20.756 31.3387 21.568 31.1813C27.9213 29.0627 32.5 23.0667 32.5 16C32.5 7.164 25.336 0 16.5 0Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_5051">
                    <rect
                      width="32"
                      height="32"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
