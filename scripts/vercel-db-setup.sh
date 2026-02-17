#!/bin/bash

# Vercel Database Setup Script
# This script helps set up the database for Vercel deployment

echo "🔧 Setting up database for Vercel deployment..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI is not installed. Please install it first:"
    echo "   npm install -g vercel"
    exit 1
fi

# Check if user is logged in
echo "📝 Checking Vercel login status..."
vercel whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Please login to Vercel first:"
    echo "   vercel login"
    exit 1
fi

echo "✅ Logged in to Vercel"

# Ask if they want to create a new PostgreSQL database
echo ""
echo "📦 Would you like to create a new PostgreSQL database on Vercel? (y/n)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "🚀 Creating PostgreSQL database on Vercel..."
    vercel postgres create
    echo ""
    echo "✅ Database created successfully!"
    echo ""
    echo "⚠️  IMPORTANT: Copy the DATABASE_URL from above and add it to your Vercel project environment variables"
fi

echo ""
echo "🔄 Running database migration..."
bun run prisma db push

echo ""
echo "✅ Database setup completed!"
echo ""
echo "📝 Next steps:"
echo "1. Add DATABASE_URL to your Vercel project environment variables"
echo "2. Deploy your project: vercel --prod"
echo "3. Test the database connection"
