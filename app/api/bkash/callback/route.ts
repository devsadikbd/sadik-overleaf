import { NextRequest, NextResponse } from "next/server";

/**
 * bKash callback handler
 * This endpoint is called by bKash after user completes/cancels payment
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentID = searchParams.get("paymentID");
    const status = searchParams.get("status");

    if (!paymentID) {
      return NextResponse.redirect(
        new URL("/payment/failed?error=missing_payment_id", req.url)
      );
    }

    if (status === "success") {
      // Redirect to success page with paymentID
      // The success page should call execute-payment API
      return NextResponse.redirect(
        new URL(`/payment/success?paymentID=${paymentID}`, req.url)
      );
    } else if (status === "failure") {
      return NextResponse.redirect(
        new URL(`/payment/failed?paymentID=${paymentID}`, req.url)
      );
    } else if (status === "cancel") {
      return NextResponse.redirect(
        new URL(`/payment/cancelled?paymentID=${paymentID}`, req.url)
      );
    } else {
      // Unknown status
      return NextResponse.redirect(
        new URL(
          `/payment/failed?error=unknown_status&status=${status}`,
          req.url
        )
      );
    }
  } catch (error: any) {
    console.error("bKash callback error:", error);
    return NextResponse.redirect(
      new URL("/payment/failed?error=callback_error", req.url)
    );
  }
}
