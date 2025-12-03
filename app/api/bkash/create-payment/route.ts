import { NextRequest, NextResponse } from "next/server";
import {
  BKASH_CONFIG,
  BKASH_ENDPOINTS,
  validateBkashConfig,
  generateInvoiceNumber,
} from "@/lib/bkash-config";

/**
 * Get bKash grant token
 */
async function getGrantToken(): Promise<string> {
  const response = await fetch(BKASH_ENDPOINTS.grantToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      username: BKASH_CONFIG.username,
      password: BKASH_CONFIG.password,
    },
    body: JSON.stringify({
      app_key: BKASH_CONFIG.appKey,
      app_secret: BKASH_CONFIG.appSecret,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`bKash token grant failed: ${error}`);
  }

  const data = await response.json();
  return data.id_token;
}

/**
 * Create bKash payment
 */
export async function POST(req: NextRequest) {
  try {
    // Validate bKash configuration
    if (!validateBkashConfig()) {
      return NextResponse.json(
        {
          error: "bKash not configured. Please contact support.",
          detail: "Missing bKash credentials in server environment",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { amount, userEmail, userName } = body;

    // Validate request
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    // Get grant token
    const idToken = await getGrantToken();

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber();

    // Get callback URL from request origin
    const origin = new URL(req.url).origin;
    const callbackURL = `${origin}/api/bkash/callback`;

    // Create payment request
    const paymentData = {
      mode: "0011", // Wallet payment
      payerReference: userEmail || "guest",
      callbackURL: callbackURL,
      amount: amount.toString(),
      currency: BKASH_CONFIG.currency,
      intent: BKASH_CONFIG.intent,
      merchantInvoiceNumber: invoiceNumber,
    };

    // Call bKash create payment API
    const paymentResponse = await fetch(BKASH_ENDPOINTS.createPayment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: idToken,
        "x-app-key": BKASH_CONFIG.appKey,
      },
      body: JSON.stringify(paymentData),
    });

    if (!paymentResponse.ok) {
      const error = await paymentResponse.text();
      console.error("bKash create payment error:", error);
      return NextResponse.json(
        { error: "Failed to create bKash payment", detail: error },
        { status: 500 }
      );
    }

    const paymentResult = await paymentResponse.json();

    // Return payment URL and details
    return NextResponse.json({
      success: true,
      paymentID: paymentResult.paymentID,
      bkashURL: paymentResult.bkashURL,
      invoiceNumber: invoiceNumber,
      amount: amount,
      currency: BKASH_CONFIG.currency,
    });
  } catch (error: any) {
    console.error("bKash payment creation error:", error);
    return NextResponse.json(
      {
        error: "Payment creation failed",
        detail: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
