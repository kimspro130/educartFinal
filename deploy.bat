@echo off
echo 🚀 Starting EDUCART Uganda Deployment...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [INFO] Node.js version:
node --version
echo [INFO] npm version:
npm --version
echo.

REM Install dependencies
echo [INFO] Installing dependencies...
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully
echo.

REM Run linting
echo [INFO] Running linter...
npm run lint

if %errorlevel% neq 0 (
    echo [WARNING] Linting issues found, but continuing...
) else (
    echo [SUCCESS] Linting passed
)
echo.

REM Build the application
echo [INFO] Building application...
npm run build

if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [SUCCESS] Build completed successfully
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo [WARNING] .env.local file not found
    echo [INFO] Creating sample .env.local file...
    (
        echo # Flutterwave Configuration
        echo NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your-public-key-here
        echo FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your-secret-key-here
        echo FLUTTERWAVE_ENCRYPTION_KEY=your-encryption-key-here
        echo.
        echo # Application URLs
        echo NEXT_PUBLIC_APP_URL=http://localhost:3000
        echo.
        echo # Webhook Configuration
        echo FLUTTERWAVE_WEBHOOK_SECRET=your-webhook-secret-here
    ) > .env.local
    echo [WARNING] Please update .env.local with your actual API keys
    echo.
)

REM Check if git is initialized
if not exist .git (
    echo [INFO] Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit - EDUCART Uganda with Mobile Money Integration"
    echo [SUCCESS] Git repository initialized
    echo.
) else (
    echo [INFO] Git repository already exists
    echo.
)

echo [SUCCESS] 🎉 EDUCART Uganda is ready for deployment!
echo.
echo [INFO] Next steps:
echo 1. Push your code to GitHub:
echo    git remote add origin https://github.com/yourusername/educart-uganda.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 2. Deploy to Vercel:
echo    - Visit https://vercel.com
echo    - Import your GitHub repository
echo    - Add environment variables
echo    - Deploy!
echo.
echo 3. Configure Flutterwave:
echo    - Get live API keys from https://flutterwave.com
echo    - Update webhook URL to your production domain
echo    - Test payments with real mobile money
echo.
echo [INFO] For detailed instructions, see DEPLOYMENT_GUIDE.md
echo [SUCCESS] Happy deploying! 🚀
echo.
pause
