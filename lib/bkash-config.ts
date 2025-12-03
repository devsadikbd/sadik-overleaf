/**
 * bKash Payment Gateway Configuration
 * 
 * bKash API credentials and endpoints.
 * Get credentials from: https://developer.bka.sh/
 * 
 * Environment Variables Required:
 * - BKASH_APP_KEY: Your bKash app key
 * - BKASH_APP_SECRET: Your bKash app secret
 * - BKASH_USERNAME: Your bKash API username
 * - BKASH_PASSWORD: Your bKash API password
 * - BKASH_BASE_URL: Sandbox or Production URL
 */

export const BKASH_CONFIG = {
  // Credentials (server-side only)
  appKey: process.env.BKASH_APP_KEY || "",
  appSecret: process.env.BKASH_APP_SECRET || "",
  username: process.env.BKASH_USERNAME || "",
  password: process.env.BKASH_PASSWORD || "",
  
  // API Base URL
  // Sandbox: https://tokenized.sandbox.bka.sh/v1.2.0-beta
  // Production: https://tokenized.pay.bka.sh/v1.2.0-beta
  baseUrl: process.env.BKASH_BASE_URL || "https://tokenized.sandbox.bka.sh/v1.2.0-beta",
  
  // Callback URLs (will be set dynamically based on request origin)
  callbackURL: process.env.BKASH_CALLBACK_URL || "/api/bkash/callback",
  
  // Payment configuration
  currency: "BDT",
  intent: "sale", // or "authorization"
  merchantInvoiceNumber: "INV", // Prefix for invoice numbers
};

/**
 * Validate bKash configuration
 */
export function validateBkashConfig(): boolean {
  const { appKey, appSecret, username, password } = BKASH_CONFIG;
  return !!(appKey && appSecret && username && password);
}

/**
 * bKash API endpoints
 */
export const BKASH_ENDPOINTS = {
  grantToken: `${BKASH_CONFIG.baseUrl}/tokenized/checkout/token/grant`,
  createPayment: `${BKASH_CONFIG.baseUrl}/tokenized/checkout/create`,
  executePayment: `${BKASH_CONFIG.baseUrl}/tokenized/checkout/execute`,
  queryPayment: `${BKASH_CONFIG.baseUrl}/tokenized/checkout/payment/status`,
  refundTransaction: `${BKASH_CONFIG.baseUrl}/tokenized/checkout/payment/refund`,
};

/**
 * Generate unique invoice number
 */
export function generateInvoiceNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${BKASH_CONFIG.merchantInvoiceNumber}${timestamp}${random}`;
}
