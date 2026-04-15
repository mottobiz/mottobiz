# Restructure repository for Hostinger deployment
# This moves dist files to root level

$ErrorActionPreference = "Stop"

Write-Host "Restructuring repository for Hostinger..." -ForegroundColor Cyan

# Create a temporary directory for dist files
$tempDir = "D:\IDEprojects\Mottobiz\temp-dist"
$distSource = "D:\IDEprojects\Mottobiz\mottobiz\dist"

# Copy dist files to temp
if (Test-Path $distSource) {
    Copy-Item -Path $distSource -Destination $tempDir -Recurse -Force
    Write-Host "✅ Copied dist files to temp location" -ForegroundColor Green
}

# Remove mottobiz folder from git tracking (keep locally)
Write-Host "Removing mottobiz from git tracking..." -ForegroundColor Yellow
git rm -r --cached mottobiz 2>$null

# Move dist files to root
Write-Host "Moving dist files to repository root..." -ForegroundColor Yellow
Move-Item -Path "$tempDir\*" -Destination "D:\IDEprojects\Mottobiz\" -Force
Remove-Item -Path $tempDir -Recurse -Force

# Stage new structure
git add .
git commit -m "Restructure: Move dist files to root for Hostinger deployment"

Write-Host "✅ Repository restructured!" -ForegroundColor Green
Write-Host "Push with: git push origin main" -ForegroundColor Cyan
