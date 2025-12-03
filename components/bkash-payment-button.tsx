"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BkashPaymentButtonProps {
  amount: number;
  userEmail?: string;
  userName?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function BkashPaymentButton({
  amount,
  userEmail,
  userName,
  onSuccess,
  onError,
  className,
  children,
}: BkashPaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create payment
      const response = await fetch("/api/bkash/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount,
          userEmail,
          userName,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create payment");
      }

      const data = await response.json();

      if (data.success && data.bkashURL) {
        // Redirect to bKash payment page
        window.location.href = data.bkashURL;
      } else {
        throw new Error("Invalid payment response");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      if (onError) {
        onError(error.message || "Payment failed");
      } else {
        alert("Payment failed: " + (error.message || "Unknown error"));
      }
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading || !amount || amount <= 0}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children || (
          <>
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            Pay ৳{amount} with bKash
          </>
        )
      )}
    </Button>
  );
}
