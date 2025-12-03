import { NextRequest, NextResponse } from "next/server";
import {
  BKASH_CONFIG,
  BKASH_ENDPOINTS,
  validateBkashConfig,
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
 * Execute bKash payment after user authorization
 */
export async function POST(req: NextRequest) {
  try {
    // Validate bKash configuration
    if (!validateBkashConfig()) {
      return NextResponse.json(
        { error: "bKash not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { paymentID } = body;

    if (!paymentID) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    // Get grant token
    const idToken = await getGrantToken();

    // Execute payment
    const executeResponse = await fetch(BKASH_ENDPOINTS.executePayment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: idToken,
        "x-app-key": BKASH_CONFIG.appKey,
      },
      body: JSON.stringify({ paymentID }),
    });

    if (!executeResponse.ok) {
      const error = await executeResponse.text();
      console.error("bKash execute payment error:", error);
      return NextResponse.json(
        { error: "Failed to execute payment", detail: error },
        { status: 500 }
      );
    }

    const result = await executeResponse.json();

    // Check transaction status
    if (result.transactionStatus === "Completed") {
      // Payment successful
      // TODO: Update database, create subscription, etc.
      return NextResponse.json({
        success: true,
        message: "Payment completed successfully",
        transactionID: result.trxID,
        paymentID: result.paymentID,
        amount: result.amount,
        currency: result.currency,
        customerMsisdn: result.customerMsisdn,
        merchantInvoiceNumber: result.merchantInvoiceNumber,
      });
    } else {
      // Payment failed or pending
      return NextResponse.json(
        {
          success: false,
          message: "Payment not completed",
          status: result.transactionStatus,
          statusMessage: result.statusMessage,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("bKash execute payment error:", error);
    return NextResponse.json(
      {
        error: "Payment execution failed",
        detail: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
