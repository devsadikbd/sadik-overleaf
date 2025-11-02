// Lightweight GraphQL client for KeystoneJS

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION,
  VERIFY_EMAIL_MUTATION,
} from "./graphql/queries";

export type GraphQLVariables = Record<string, any> | undefined;

// Use our own API proxy instead of calling backend directly
// This keeps the backend URL hidden and secure
const getKeystoneUrl = () => {
  if (typeof window !== 'undefined') {
    // In browser: use our proxy
    return `${window.location.origin}/api/graphql`
  }
  // On server: call backend directly
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_KEYSTONE_URL || "http://localhost:3000"
  const cleanUrl = backendUrl.replace(/\/$/, "").replace(/\/api\/graphql$/, "")
  return `${cleanUrl}/api/graphql`
}

const KEYSTONE_GRAPHQL_URL = getKeystoneUrl();

export async function graphqlRequest<T = any>(
  query: string,
  variables?: GraphQLVariables,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(KEYSTONE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include",
    body: JSON.stringify({ query, variables }),
    ...init,
  });

  const json = await response.json();
  if (!response.ok || json.errors) {
    const message = json?.errors?.[0]?.message || `GraphQL error ${response.status}`;
    throw new Error(message);
  }
  return json.data as T;
}

// Auth helpers for common Keystone setups (adjust field names to your schema)

export async function authenticateUserWithPassword(args: {
  email: string;
  password: string;
}): Promise<any> {
  return graphqlRequest(LOGIN_MUTATION, args);
}

export async function signup(args: {
  name: string;
  email: string;
  password: string;
  baseUrl?: string;
}): Promise<any> {
  return graphqlRequest(SIGNUP_MUTATION, {
    baseUrl: args.baseUrl || "http://localhost:7777",
    ...args,
  });
}

export async function verifyEmail(args: { token: string }): Promise<any> {
  return graphqlRequest(VERIFY_EMAIL_MUTATION, args);
}

export async function forgotPassword(args: {
  email: string;
  baseUrl?: string;
}): Promise<any> {
  return graphqlRequest(FORGOT_PASSWORD_MUTATION, {
    baseUrl: args.baseUrl || "http://localhost:7777",
    ...args,
  });
}

export async function resetPassword(args: { token: string; password: string }): Promise<any> {
  return graphqlRequest(RESET_PASSWORD_MUTATION, args);
}

// Optional email verification helpers if configured in Keystone

// Remove optional helpers not present in this starter to avoid confusion


