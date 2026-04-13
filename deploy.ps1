# Deploy script for MottoBiz - Build and push to trigger Hostinger deployment
param(
    [string]$Message = "Update site"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 MottoBiz Deploy Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "mottobiz\package.json")) {
    Write-Host "❌ Error: Must run from repository root (where mottobiz/ folder is)" -ForegroundColor Red
    exit 1
}

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Yellow
    Write-Host $status
    Write-Host ""
    
    $response = Read-Host "Do you want to commit these changes? (y/n)"
    if ($response -ne 'y') {
        Write-Host "❌ Deploy cancelled" -ForegroundColor Red
        exit 1
    }
}

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
Set-Location mottobiz

try {
    npm run build 2>&1 | ForEach-Object {
        Write-Host $_
    }
    
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed"
    }
} catch {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host $_
    exit 1
}

Set-Location ..

# Stage dist folder
Write-Host "📁 Staging dist folder..." -ForegroundColor Yellow
git add mottobiz/dist/

# Check if there are changes to commit
$diff = git diff --cached --name-only
if (-not $diff) {
    Write-Host "✅ No changes to deploy" -ForegroundColor Green
    exit 0
}

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "$Message"

# Push
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Deploy initiated!" -ForegroundColor Green
Write-Host "🌐 Hostinger will auto-deploy in a few moments" -ForegroundColor Cyan
Write-Host ""
Write-Host "Check your site at: https://mottobiz.com" -ForegroundColor Magenta
