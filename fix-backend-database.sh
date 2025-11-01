#!/usr/bin/env bash
# Helper script to fix backend database tables
# Run this in your backend directory (adik-overleaf-backend)

echo "🔧 Fixing Keystone backend database..."
echo ""
echo "📍 Make sure you're in your backend directory first:"
echo "   cd ~/adik-overleaf-backend"
echo ""
echo "Then run ONE of these commands:"
echo ""
echo "Option 1 (Recommended for dev):"
echo "  npx prisma db push"
echo ""
echo "Option 2 (If you have migrations):"
echo "  npx prisma migrate deploy"
echo ""
echo "Option 3 (Create new migration):"
echo "  npx prisma migrate dev --name init"
echo ""
echo "Option 4 (If Keystone has a migrate script):"
echo "  npm run migrate"
echo ""
echo "After running one of these, restart your Keystone server."
