# Update existing here.now site using PowerShell
param(
    [Parameter(Mandatory=$true)]
    [string]$Slug,
    
    [Parameter(Mandatory=$true)]
    [string]$ClaimToken
)

$ErrorActionPreference = "Stop"

$distPath = Join-Path $PSScriptRoot "dist"
$baseUrl = "https://here.now"

# Get all files
$files = Get-ChildItem -Path $distPath -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($distPath.Length + 1).Replace("\", "/")
    $hash = (Get-FileHash $_.FullName -Algorithm SHA256).Hash.ToLower()
    
    # Determine content type
    $ext = $_.Extension.ToLower()
    $contentType = switch ($ext) {
        ".html" { "text/html; charset=utf-8" }
        ".css" { "text/css; charset=utf-8" }
        ".js" { "text/javascript; charset=utf-8" }
        ".svg" { "image/svg+xml" }
        ".png" { "image/png" }
        ".jpg" { "image/jpeg" }
        ".jpeg" { "image/jpeg" }
        ".gif" { "image/gif" }
        ".webp" { "image/webp" }
        ".ico" { "image/x-icon" }
        ".json" { "application/json; charset=utf-8" }
        default { "application/octet-stream" }
    }
    
    @{
        path = $relativePath
        size = $_.Length
        contentType = $contentType
        hash = $hash
    }
}

# Build request body with claim token
$body = @{
    files = $files
    claimToken = $ClaimToken
} | ConvertTo-Json -Depth 10

Write-Host "Updating publish '$Slug' ($($files.Count) files)..."

# Step 1: Update publish (PUT request with slug)
$response = Invoke-RestMethod -Uri "$baseUrl/api/v1/publish/$Slug" -Method PUT -ContentType "application/json" -Headers @{
    "X-HereNow-Client" = "verdent/direct-api"
} -Body $body

$versionId = $response.upload.versionId
$finalizeUrl = $response.upload.finalizeUrl
$siteUrl = $response.siteUrl

$uploadCount = if ($response.upload.uploads) { $response.upload.uploads.Count } else { 0 }
$skippedCount = if ($response.upload.skipped) { $response.upload.skipped.Count } else { 0 }

Write-Host "Uploading $uploadCount files ($skippedCount unchanged, skipped)..."

# Step 2: Upload files
$uploadErrors = 0
if ($response.upload.uploads) {
    foreach ($upload in $response.upload.uploads) {
        $localFile = Join-Path $distPath $upload.path.Replace("/", "\")
        $contentType = $upload.headers."Content-Type"
        
        if (-not (Test-Path $localFile)) {
            Write-Warning "Missing local file for $($upload.path)"
            $uploadErrors++
            continue
        }
        
        try {
            $headers = @{}
            if ($contentType) {
                $headers["Content-Type"] = $contentType
            }
            
            Invoke-RestMethod -Uri $upload.url -Method PUT -Headers $headers -InFile $localFile
        } catch {
            Write-Warning "Upload failed for $($upload.path): $_"
            $uploadErrors++
        }
    }
}

if ($uploadErrors -gt 0) {
    throw "$uploadErrors file(s) failed to upload"
}

# Step 3: Finalize
Write-Host "Finalizing..."
$finalizeBody = @{
    versionId = $versionId
} | ConvertTo-Json

Invoke-RestMethod -Uri $finalizeUrl -Method POST -ContentType "application/json" -Body $finalizeBody | Out-Null

# Output results
Write-Host ""
Write-Host "Site updated successfully!" -ForegroundColor Green
Write-Host "URL: $siteUrl" -ForegroundColor Cyan

return $siteUrl
