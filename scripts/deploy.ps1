#Requires -Version 5.1
<#
.SYNOPSIS
    Deploy Dataverse Column Namer extension for Chrome/Edge Store submission.

.DESCRIPTION
    This script automates the deployment workflow for the Dataverse Column Namer extension.
    It creates a production-ready ZIP package with IS_DEBUG set to false without modifying source files.

.NOTES
    Version: 1.0.0
    Author: PhuocLe.NET
    Working Directory: Should be run from repository root
#>

[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

# Script configuration
$repoRoot = $PSScriptRoot | Split-Path -Parent
$sourceDir = Join-Path $repoRoot "DataverseColumnNamer"
$deployDir = Join-Path $repoRoot "deploy"
$tempBuildDir = Join-Path $deployDir "temp_build"
$outputZip = Join-Path $deployDir "DataverseColumnNamer.zip"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Dataverse Column Namer - Deploy Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Validate source directory
Write-Host "[1/9] Validating source directory..." -ForegroundColor Yellow
if (-not (Test-Path $sourceDir)) {
    Write-Error "Source directory not found: $sourceDir"
    exit 1
}
Write-Host "      Success: Source directory validated" -ForegroundColor Green
Write-Host ""

# Step 2: Clean up old packages
Write-Host "[2/9] Cleaning up old packages..." -ForegroundColor Yellow
if (Test-Path $outputZip) {
    Remove-Item -Path $outputZip -Force -ErrorAction SilentlyContinue
    Write-Host "      Success: Removed old package" -ForegroundColor Green
} else {
    Write-Host "      Success: No old package to remove" -ForegroundColor Green
}
Write-Host ""

# Step 3: Create deploy folder
Write-Host "[3/9] Creating deploy folder..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $deployDir | Out-Null
Write-Host "      Success: Deploy folder ready" -ForegroundColor Green
Write-Host ""

# Step 4: Create temporary build directory
Write-Host "[4/9] Creating temporary build directory..." -ForegroundColor Yellow
if (Test-Path $tempBuildDir) {
    Remove-Item -Path $tempBuildDir -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $tempBuildDir | Out-Null
Write-Host "      Success: Temporary build directory created" -ForegroundColor Green
Write-Host ""

# Step 5: Copy static files
Write-Host "[5/9] Copying static files..." -ForegroundColor Yellow
$staticFiles = @("manifest.json", "styles.css", "popup.css", "popup.html", "naming-utils.js")
foreach ($file in $staticFiles) {
    $sourcePath = Join-Path $sourceDir $file
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $tempBuildDir -Force
        Write-Host "      Success: Copied $file" -ForegroundColor Green
    } else {
        Write-Warning "      Warning: File not found: $file (skipping)"
    }
}

# Copy icons directory
$iconsSource = Join-Path $sourceDir "icons"
if (Test-Path $iconsSource) {
    Copy-Item -Path $iconsSource -Destination $tempBuildDir -Recurse -Force
    Write-Host "      Success: Copied icons directory" -ForegroundColor Green
} else {
    Write-Warning "      Warning: Icons directory not found"
}
Write-Host ""

# Step 6: Copy and modify content.js
Write-Host "[6/9] Processing content.js (IS_DEBUG = false)..." -ForegroundColor Yellow
$contentJsSource = Join-Path $sourceDir "content.js"
$contentJsDest = Join-Path $tempBuildDir "content.js"
if (Test-Path $contentJsSource) {
    $contentJs = Get-Content $contentJsSource -Raw
    $contentJs = $contentJs -replace 'const IS_DEBUG = true;', 'const IS_DEBUG = false;'
    Set-Content -Path $contentJsDest -Value $contentJs -NoNewline -Encoding UTF8
    Write-Host "      Success: content.js processed with IS_DEBUG = false" -ForegroundColor Green
} else {
    Write-Error "content.js not found!"
}
Write-Host ""

# Step 7: Copy and modify popup.js
Write-Host "[7/9] Processing popup.js (IS_DEBUG = false)..." -ForegroundColor Yellow
$popupJsSource = Join-Path $sourceDir "popup.js"
$popupJsDest = Join-Path $tempBuildDir "popup.js"
if (Test-Path $popupJsSource) {
    $popupJs = Get-Content $popupJsSource -Raw
    $popupJs = $popupJs -replace 'const IS_DEBUG = true;', 'const IS_DEBUG = false;'
    Set-Content -Path $popupJsDest -Value $popupJs -NoNewline -Encoding UTF8
    Write-Host "      Success: popup.js processed with IS_DEBUG = false" -ForegroundColor Green
} else {
    Write-Error "popup.js not found!"
}
Write-Host ""

# Step 8: Create ZIP package
Write-Host "[8/9] Creating production ZIP package..." -ForegroundColor Yellow

Compress-Archive -Path "$tempBuildDir\*" -DestinationPath $outputZip -Force
Write-Host "      Success: ZIP package created: DataverseColumnNamer.zip" -ForegroundColor Green
Write-Host ""

# Step 9: Clean up temporary directory
Write-Host "[9/9] Cleaning up temporary files..." -ForegroundColor Yellow
Remove-Item -Path $tempBuildDir -Recurse -Force
Write-Host "      Success: Temporary build directory removed" -ForegroundColor Green
Write-Host ""

# Verify the package
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Package Information" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
$packageInfo = Get-ChildItem $outputZip
$sizeKB = [math]::Round($packageInfo.Length / 1024, 2)
Write-Host "Name:          $($packageInfo.Name)" -ForegroundColor White
Write-Host "Size:          $sizeKB KB" -ForegroundColor White
Write-Host "Location:      $($packageInfo.FullName)" -ForegroundColor White
Write-Host "Last Modified: $($packageInfo.LastWriteTime)" -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Upload to Chrome Web Store: https://chrome.google.com/webstore/devconsole" -ForegroundColor White
Write-Host "  2. Upload to Edge Add-ons: https://partner.microsoft.com/dashboard/microsoftedge" -ForegroundColor White
Write-Host "  3. Or create GitHub Release and attach the ZIP file" -ForegroundColor White
Write-Host ""
