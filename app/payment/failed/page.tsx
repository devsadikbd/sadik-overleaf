"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const paymentID = searchParams?.get("paymentID");

  const getErrorMessage = () => {
    switch (error) {
      case "missing_payment_id":
        return "Payment ID is missing. Please try again.";
      case "callback_error":
        return "An error occurred during payment processing.";
      case "unknown_status":
        return "Payment status is unknown. Please contact support.";
      default:
        return "Your payment could not be completed. Please try again.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-6">{getErrorMessage()}</p>

        {paymentID && (
          <p className="text-sm text-gray-500 mb-4">Payment ID: {paymentID}</p>
        )}

        <div className="space-y-3">
          <Button onClick={() => router.push("/pricing")} className="w-full">
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/home")}
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
