---
description: Build and package the Dataverse Column Namer extension for Chrome/Edge Store deployment
---

// turbo-all

# Deploy Extension to Store Workflow

This workflow creates a production-ready ZIP package for submitting to Chrome Web Store and Microsoft Edge Add-ons.

**Working directory:** `DataverseColumnNamer` (where this workflow is run from)

**Output location:** `deploy/` folder at repository root (parent directory)

**IMPORTANT:** This workflow creates a temporary copy of files with `IS_DEBUG` set to `false` for production build. Source files are never modified, ensuring repository integrity even if the workflow is interrupted.

## Output Structure

```
repo-root/                         ← Repository root
├── DataverseColumnNamer/          ← Working directory for this workflow
└── deploy/                        ← Deployment folder (gitignored)
    └── DataverseColumnNamer.zip   ← Ready for Chrome/Edge Store upload
```

## Steps

### 1. Clean up old packages
```powershell
Remove-Item -Path "../deploy/DataverseColumnNamer.zip" -Force -ErrorAction SilentlyContinue
```

### 2. Create deploy folder at root if not exists
```powershell
New-Item -ItemType Directory -Force -Path "../deploy"
```

### 3. Create temporary build directory
```powershell
$tempDir = "../deploy/temp_build"
New-Item -ItemType Directory -Force -Path $tempDir
```

### 4. Copy files to temporary directory
```powershell
# Copy individual files
Copy-Item -Path "./manifest.json", "./styles.css", "./popup.css", "./popup.html" -Destination $tempDir -Force
# Copy icons directory recursively
Copy-Item -Path "./icons" -Destination $tempDir -Recurse -Force
```

### 5. Copy and modify content.js with IS_DEBUG = false
```powershell
$contentJs = Get-Content "./content.js" -Raw
$contentJs = $contentJs -replace 'const IS_DEBUG = true;', 'const IS_DEBUG = false;'
Set-Content -Path "$tempDir/content.js" -Value $contentJs
```

### 6. Copy and modify popup.js with IS_DEBUG = false
```powershell
$popupJs = Get-Content "./popup.js" -Raw
$popupJs = $popupJs -replace 'const IS_DEBUG = true;', 'const IS_DEBUG = false;'
Set-Content -Path "$tempDir/popup.js" -Value $popupJs
```

### 7. Create the store-ready extension ZIP from temporary directory
```powershell
Compress-Archive -Path "$tempDir/*" -DestinationPath "../deploy/DataverseColumnNamer.zip" -Force
```

### 8. Clean up temporary directory
```powershell
Remove-Item -Path $tempDir -Recurse -Force
```

### 9. Verify the package
```powershell
Get-ChildItem "../deploy/DataverseColumnNamer.zip" | Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1024,2)}}, LastWriteTime
```

## Distribution

The `deploy/` folder is **excluded from git** (gitignored). Use GitHub Releases to distribute the extension package:

1. Create a new release on GitHub
2. Upload `deploy/DataverseColumnNamer.zip` as a release asset
3. Users can download from the Releases page

## Important Notes

- **Version:** Extension is at `1.0.0` (check `manifest.json`)
- **Production Build:** `IS_DEBUG = false` enables configurable suffixes
- **Screenshots:** Prepare 1280x800 screenshots before store submission
- **Package Size:** Should be < 5MB for stores
- **Review Time:** Chrome 1-3 days, Edge 1-5 days
- **Deploy Location:** `../deploy/` (root level, gitignored)

## Package Contents Checklist

- [x] `manifest.json` - v1.0.0, all fields complete
- [x] `content.js` - IS_DEBUG = false (via temporary build)
- [x] `popup.js` - IS_DEBUG = false (via temporary build)
- [x] `popup.html` - Popup interface
- [x] `popup.css` - Popup styles
- [x] `styles.css` - Content injection styles
- [x] `icons/` - icon16.png, icon48.png, icon128.png

## Troubleshooting

**Package too large:**
- Ensure only necessary files are included
- No docs/ folders in the ZIP

**Manifest errors:**
- Validate at Chrome Web Store after upload
- Check all icon paths are correct

**Build fails:**
- Ensure temporary build directory is created successfully
- Check PowerShell execution policy if scripts fail
- Verify source files exist before running workflow