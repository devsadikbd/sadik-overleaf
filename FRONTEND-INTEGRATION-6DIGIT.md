# Frontend Integration (6-digit verification)

This guide shows how to integrate a 6-digit verification code flow in your Next.js frontend (localhost:7777) with a backend running on http://localhost:3000.

Files added to repo for quick testing:

- `test-verification-page.html` — simple static page for manual testing
- `test-6digit-code.sh` — shell script to test verify/resend endpoints

Important: The backend must implement the following endpoints:

- GET /api/auth/verify-email?token=XXXXXX (accepts 6-digit code)
- POST /api/auth/resend-verification { email, baseUrl }

## Client-side examples

1. Automatic verification on page load (for email links pointing to `/verify-email?token=XXXXXX`):

```js
// Put in a client page (we added /verify-email client page)
const token = new URLSearchParams(window.location.search).get("token");
if (token) {
  fetch(
    `http://localhost:3000/api/auth/verify-email?token=${encodeURIComponent(
      token
    )}`,
    { credentials: "include" }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data?.ok || data?.message) {
        alert("✅ Email verified!");
        window.location.href = "/login";
      } else {
        alert("❌ " + (data?.error || "Verification failed"));
      }
    })
    .catch((err) => {
      alert("❌ Can't reach backend (port 3000).");
      console.error(err);
    });
}
```

2. Verify when user enters 6-digit code manually (e.g. in `components/email-verification-section.tsx`):

```js
const code = codeDigits.join(""); // e.g. "279218"
fetch(`/api/auth/verify-email?token=${encodeURIComponent(code)}`, {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    if (data?.ok || data?.message) {
      // success UI
    } else {
      // show error
    }
  });
```

Note: the frontend route `/api/auth/verify-email` in this repo proxies to the Keystone GraphQL verifyEmail mutation. We also added a direct backend call from `/verify-email` page to `http://localhost:3000/api/auth/verify-email` for convenience.

## Resend verification (button)

Wire the resend button to call the backend endpoint:

```js
fetch("http://localhost:3000/api/auth/resend-verification", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: userEmail, baseUrl: "http://localhost:7777" }),
  credentials: "include",
})
  .then((res) => res.json())
  .then((json) => alert(json.message || json.error))
  .catch((err) => alert("Couldn't reach backend"));
```

## CORS and credentials

- If your frontend (7777) and backend (3000) are different origins, configure CORS on the backend to allow `http://localhost:7777` and allow credentials (Access-Control-Allow-Credentials: true).
- When the frontend calls the backend directly (fetch to port 3000), use `credentials: 'include'` if the backend relies on cookies/sessions.

## Testing

- Start the backend (keep it running on port 3000)
- Start the frontend `npm run dev` (port 7777)
- Open `test-verification-page.html` or your frontend `/email-verification` page and exercise the verify/resend flows.

If the backend returns `Invalid token`, either the token expired, was already used, or tokens are being generated/stored differently (e.g., hashed in DB). In that case, use the resend flow to get a fresh code and try again.

## Security notes

- 6-digit codes are short-lived and should be single-use. Ensure backend enforces expiration and invalidates used codes.
- Rate-limit resend attempts to avoid abuse.
- Store tokens/hashed codes securely and compare in constant time.

Reference: See `EMAIL-VERIFICATION-SOLUTION.md` for more details and debugging steps.
