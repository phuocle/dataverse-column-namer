---
description: Build and package the Dataverse Column Namer extension for Chrome/Edge Store deployment
---

// turbo-all

# Deploy Extension to Store Workflow

This workflow creates a production-ready ZIP package for submitting to Chrome Web Store and Microsoft Edge Add-ons.

**Working directory:** Repository root

**Output location:** `deploy/` folder at repository root

**IMPORTANT:** The `scripts/deploy.ps1` script creates a production build with `IS_DEBUG = false` WITHOUT modifying source files. It copies files to a temporary build directory, modifies them there, creates the ZIP, and cleans up.

## Output Structure

```
root/                              ← Repository root
└── deploy/                        ← Deployment folder (committed to git)
    └── DataverseColumnNamer.zip   ← Ready for Chrome/Edge Store upload
```

## Steps

### 1. Run the deployment script
```powershell
cd /path/to/dataverse-column-namer
.\scripts\deploy.ps1
```

The script will automatically:
1. Validate the source directory
2. Clean up old packages
3. Create a temporary build directory
4. Copy static files (manifest.json, styles.css, popup.css, popup.html, naming-utils.js, icons/)
5. Copy and modify content.js (set IS_DEBUG = false)
6. Copy and modify popup.js (set IS_DEBUG = false)
7. Create the production ZIP package
8. Clean up temporary files

**Note:** Source files remain unchanged. The script only modifies copies in the temporary build directory.

### 2. Verify the package
The script automatically displays package information. You can also manually verify:

```powershell
Get-ChildItem deploy/DataverseColumnNamer.zip | Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1024,2)}}, LastWriteTime
```

### 3. Git Commit

The `deploy/` folder is **included in git** for version tracking:

```powershell
git add deploy/DataverseColumnNamer.zip
git commit -m "chore: build production package v1.0.0 for store submission"
git push
```

## Important Notes

- **Version:** Extension is at `1.0.0` (check `manifest.json`)
- **Production Build:** The deploy script automatically sets `IS_DEBUG = false` in the packaged files
- **Source Files:** Source files remain at `IS_DEBUG = true` for development
- **Screenshots:** Prepare 1280x800 screenshots before store submission
- **Package Size:** Should be < 5MB for stores
- **Review Time:** Chrome 1-3 days, Edge 1-5 days
- **Deploy Location:** `deploy/` at repository root (committed to git)

## Package Contents Checklist

- [x] `manifest.json` - v1.0.0, all fields complete
- [x] `content.js` - IS_DEBUG = false (in package only)
- [x] `popup.js` - IS_DEBUG = false (in package only)
- [x] `popup.html` - Popup interface
- [x] `popup.css` - Popup styles
- [x] `styles.css` - Content injection styles
- [x] `naming-utils.js` - Naming utility functions
- [x] `icons/` - icon16.png, icon48.png, icon128.png

## Troubleshooting

**Package too large:**
- Ensure only necessary files are included
- No docs/ folders in the ZIP

**Manifest errors:**
- Validate at Chrome Web Store after upload
- Check all icon paths are correct

**Script fails:**
- Ensure PowerShell 5.1 or later is installed
- Run from repository root: `.\scripts\deploy.ps1`
- Check that all source files exist in DataverseColumnNamer/ folder