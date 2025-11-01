#!/usr/bin/env bash
# Quick test script for 6-digit verification endpoints
# Usage: ./test-6digit-code.sh verify 123456
#        ./test-6digit-code.sh resend user@example.com
set -euo pipefail
cmd=${1:-}
if [[ "$cmd" == "verify" ]]; then
  code=${2:-}
  if [[ -z "$code" ]]; then
    echo "Usage: $0 verify 123456"
    exit 1
  fi
  echo "Calling verify endpoint with token=$code"
  curl -v "http://localhost:3000/api/auth/verify-email?token=${code}"
elif [[ "$cmd" == "resend" ]]; then
  email=${2:-}
  if [[ -z "$email" ]]; then
    echo "Usage: $0 resend user@example.com"
    exit 1
  fi
  echo "Calling resend endpoint for $email"
  curl -v -X POST http://localhost:3000/api/auth/resend-verification \
    -H 'Content-Type: application/json' \
    -d "{\"email\":\"${email}\",\"baseUrl\":\"http://localhost:7777\"}"
else
  echo "Usage: $0 {verify|resend} args"
  exit 1
fi
