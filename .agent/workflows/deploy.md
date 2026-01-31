---
description: Build and package the Dataverse Column Namer extension for Chrome/Edge Store deployment
---

// turbo-all

# Deploy Extension to Store Workflow

This workflow creates a production-ready ZIP package for submitting to Chrome Web Store and Microsoft Edge Add-ons.

**Working directory:** Repository root (ensure you're in the correct directory before running commands)

**Output location:** `deploy/` folder at repository root

**IMPORTANT:** This workflow uses temporary files to build the production package without modifying source files.

## Output Structure

```
repo-root/                         ← Repository root (working directory)
├── DataverseColumnNamer/          ← Extension source files (unchanged)
└── deploy/                        ← Deployment folder (gitignored)
    └── DataverseColumnNamer.zip   ← Ready for Chrome/Edge Store upload
```

## Prerequisites

Before running this workflow, verify you're in the repository root:

```powershell
# Check current directory
Get-Location

# You should see something like: C:\...\dataverse-column-namer
# If not in repo root, navigate there first
```

## Steps

### 1. Verify working directory
```powershell
# Ensure you're in the repository root
if (!(Test-Path "DataverseColumnNamer/manifest.json")) {
    Write-Error "Error: Not in repository root. Please navigate to the repository root directory."
    exit 1
}
```

### 2. Clean up old packages
```powershell
Remove-Item -Path "deploy/DataverseColumnNamer.zip" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "deploy/temp" -Recurse -Force -ErrorAction SilentlyContinue
```

### 3. Create deploy folder and temp directory
```powershell
New-Item -ItemType Directory -Force -Path "deploy/temp"
```

### 4. Copy source files to temporary directory
```powershell
Copy-Item -Path "DataverseColumnNamer/*" -Destination "deploy/temp/" -Recurse -Force
```

### 5. Set IS_DEBUG = false in temporary files
```powershell
# Update content.js
(Get-Content "deploy/temp/content.js") -replace 'const IS_DEBUG = true;', 'const IS_DEBUG = false;' | Set-Content "deploy/temp/content.js"

# Update popup.js
(Get-Content "deploy/temp/popup.js") -replace 'const IS_DEBUG = true;', 'const IS_DEBUG = false;' | Set-Content "deploy/temp/popup.js"
```

### 6. Create the store-ready extension ZIP from temp files
```powershell
Compress-Archive -Path "deploy/temp/manifest.json", "deploy/temp/content.js", "deploy/temp/styles.css", "deploy/temp/popup.css", "deploy/temp/popup.html", "deploy/temp/popup.js", "deploy/temp/icons" -DestinationPath "deploy/DataverseColumnNamer.zip" -Force
```

### 7. Clean up temporary files
```powershell
Remove-Item -Path "deploy/temp" -Recurse -Force
```

### 8. Verify the package
```powershell
Get-ChildItem "deploy/DataverseColumnNamer.zip" | Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1024,2)}}, LastWriteTime
```

## Distribution

The `deploy/` folder is **excluded from git** (gitignored). Use GitHub Releases to distribute the extension package:

1. Create a new release on GitHub
2. Upload `deploy/DataverseColumnNamer.zip` as a release asset
3. Users can download from the Releases page

## Important Notes

- **Version:** Extension is at `1.0.0` (check `manifest.json`)
- **Production Build:** Package contains IS_DEBUG = false for configurable suffixes
- **Source Files:** Source files in DataverseColumnNamer/ remain unchanged (IS_DEBUG stays as-is)
- **Screenshots:** Prepare 1280x800 screenshots before store submission
- **Package Size:** Should be < 5MB for stores
- **Review Time:** Chrome 1-3 days, Edge 1-5 days

## Package Contents Checklist

- [x] `manifest.json` - v1.0.0, all fields complete
- [x] `content.js` - IS_DEBUG = false (in package only)
- [x] `popup.js` - IS_DEBUG = false (in package only)
- [x] `popup.html` - Popup interface
- [x] `popup.css` - Popup styles
- [x] `styles.css` - Content injection styles
- [x] `icons/` - icon16.png, icon48.png, icon128.png

## Troubleshooting

**"Not in repository root" error:**
- Navigate to the repository root directory
- Verify DataverseColumnNamer/manifest.json exists

**Package too large:**
- Ensure only necessary files are included
- No docs/ folders in the ZIP

**Manifest errors:**
- Validate at Chrome Web Store after upload
- Check all icon paths are correct

**IS_DEBUG verification:**
- Extract the ZIP and verify IS_DEBUG = false in both content.js and popup.js
- Source files should remain unchanged