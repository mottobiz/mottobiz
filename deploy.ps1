# Deploy script for MottoBiz - Build and push to trigger Hostinger deployment
param(
    [string]$Message = "Update site"
)

$ErrorActionPreference = "Stop"

Write-Host "MottoBiz Deploy Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "Error: Must run from repository root (where package.json is)" -ForegroundColor Red
    exit 1
}

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "You have uncommitted changes:" -ForegroundColor Yellow
    Write-Host $status
    Write-Host ""

    $response = Read-Host "Do you want to commit these changes? (y/n)"
    if ($response -ne 'y') {
        Write-Host "Deploy cancelled" -ForegroundColor Red
        exit 1
    }
}

# Build the project (includes OG image generation and pre-rendering)
Write-Host "Building project and pre-rendering all routes..." -ForegroundColor Yellow

try {
    npm.cmd run build:full
    if ($LASTEXITCODE -ne 0) {
        throw "Build/Prerender failed with exit code $LASTEXITCODE"
    }
} catch {
    Write-Host "Build failed!" -ForegroundColor Red
    Write-Host $_
    exit 1
}

# Stage deploy artifacts
Write-Host "Staging deploy artifacts..." -ForegroundColor Yellow
git add public/
git add dist/
git add assets/
git add og/
git add index.html
git add .htaccess
git add favicon.svg
git add logo-static.svg
git add logo-wordmark.svg
# Root-level static files (copied from public/ by build plugin for Hostinger)
git add sitemap.xml
git add robots.txt
git add llms.txt
git add pricing.md
git add og-image.png
git add og-image-new.png
git add icons.svg

# Pre-rendered routes at repository root level for Hostinger
if (Test-Path "resources") { git add resources/ }
if (Test-Path "industries") { git add industries/ }
if (Test-Path "locations") { git add locations/ }
if (Test-Path "privacy") { git add privacy/ }
if (Test-Path "terms") { git add terms/ }

# Check if there are changes to commit
$diff = git diff --cached --name-only
if (-not $diff) {
    Write-Host "No changes to deploy" -ForegroundColor Green
    exit 0
}

# Commit
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "$Message"

# Push
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "Deploy initiated!" -ForegroundColor Green
Write-Host "Hostinger will auto-deploy in a few moments" -ForegroundColor Cyan
Write-Host ""
Write-Host "Check your site at: https://mottobiz.com" -ForegroundColor Magenta
