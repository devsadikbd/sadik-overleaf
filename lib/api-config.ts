/**
 * Backend API URL configuration.
 * 
 * This file centralizes the backend URL so it can be updated in one place.
 * The NEXT_PUBLIC_BACKEND_URL is exposed to the client (it's part of build output),
 * while BACKEND_URL (without NEXT_PUBLIC_ prefix) is server-only.
 * 
 * Usage:
 *   - In client components: import { BACKEND_API_URL } from '@/lib/api-config'
 *   - In server routes: import { getBackendUrl } from '@/lib/api-config'
 */

/**
 * Get the backend URL for use in server-side code (e.g., API routes).
 * Priority: BACKEND_URL (server-only) > NEXT_PUBLIC_BACKEND_URL > localhost fallback
 */
export function getBackendUrl(): string {
  // Server-side env vars are preferred (not exposed to clients)
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.replace(/\/$/, "");
  }
  
  // Fallback to public env var if server-only is not set
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "");
  }
  
  // Development fallback
  return "http://localhost:3000";
}

/**
 * Client-side backend URL (publicly visible in build output).
 * Use NEXT_PUBLIC_* prefix so Next.js inlines it into the client bundle.
 */
export const BACKEND_API_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
      "http://localhost:3000"
    : "";

/**
 * Optional API key for extra security (if your backend requires it).
 */
export const BACKEND_API_KEY = process.env.BACKEND_API_KEY || "";
