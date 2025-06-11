#!/bin/bash

# EDUCART Uganda Deployment Script
echo "🚀 Starting EDUCART Uganda Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Install dependencies
print_status "Installing dependencies..."
npm install --legacy-peer-deps

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run linting
print_status "Running linter..."
npm run lint

if [ $? -eq 0 ]; then
    print_success "Linting passed"
else
    print_warning "Linting issues found, but continuing..."
fi

# Build the application
print_status "Building application..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    print_warning ".env.local file not found"
    print_status "Creating sample .env.local file..."
    cat > .env.local << EOL
# Flutterwave Configuration
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your-public-key-here
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your-secret-key-here
FLUTTERWAVE_ENCRYPTION_KEY=your-encryption-key-here

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Webhook Configuration
FLUTTERWAVE_WEBHOOK_SECRET=your-webhook-secret-here
EOL
    print_warning "Please update .env.local with your actual API keys"
fi

# Check if git is initialized
if [ ! -d .git ]; then
    print_status "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - EDUCART Uganda with Mobile Money Integration"
    print_success "Git repository initialized"
else
    print_status "Git repository already exists"
fi

print_success "🎉 EDUCART Uganda is ready for deployment!"
echo ""
print_status "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/yourusername/educart-uganda.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Visit https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Add environment variables"
echo "   - Deploy!"
echo ""
echo "3. Configure Flutterwave:"
echo "   - Get live API keys from https://flutterwave.com"
echo "   - Update webhook URL to your production domain"
echo "   - Test payments with real mobile money"
echo ""
print_status "For detailed instructions, see DEPLOYMENT_GUIDE.md"
print_success "Happy deploying! 🚀"
