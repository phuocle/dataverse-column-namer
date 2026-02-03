---
description: Build and package the Dataverse Column Namer extension for Chrome/Edge Store deployment
---

// turbo-all

# Deploy Extension to Store Workflow

This workflow creates a production-ready ZIP package for submitting to Chrome Web Store and Microsoft Edge Add-ons.

**Working directory:** Repository root

**Output location:** `deploy/` folder at repository root

**IMPORTANT:** During development, `IS_DEBUG` should always be `true`. Before deployment, AI must change it to `false`, run the deployment, then restore it back to `true`.

## Output Structure

```
root/                              ← Repository root
└── deploy/                        ← Deployment folder (committed to git)
    └── DataverseColumnNamer.zip   ← Ready for Chrome/Edge Store upload
```

## Steps

### 1. Set IS_DEBUG = false for production build

**AI Instructions:** Automatically find and modify the following files:

Find `DataverseColumnNamer/content.js` and change:
```javascript
const IS_DEBUG = true;
```
to:
```javascript
const IS_DEBUG = false;
```

Find `DataverseColumnNamer/popup.js` and change:
```javascript
const IS_DEBUG = true;
```
to:
```javascript
const IS_DEBUG = false;
```

### 2. Run the deployment script

```powershell
cd /path/to/dataverse-column-namer
.\scripts\deploy.ps1
```

The script will:
1. Validate the source directory
2. Clean up old packages
3. Create a temporary build directory
4. Copy all files including the modified JS files with IS_DEBUG = false
5. Create the production ZIP package at `deploy/DataverseColumnNamer.zip`
6. Clean up temporary files

### 3. Verify the package

The script automatically displays package information. You can also manually verify:

```powershell
Get-ChildItem deploy/DataverseColumnNamer.zip | Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1024,2)}}, LastWriteTime
```

### 4. Restore IS_DEBUG = true for development

**AI Instructions:** After deployment is complete, restore the files for development:

In `DataverseColumnNamer/content.js`, change back:
```javascript
const IS_DEBUG = false;
```
to:
```javascript
const IS_DEBUG = true;
```

In `DataverseColumnNamer/popup.js`, change back:
```javascript
const IS_DEBUG = false;
```
to:
```javascript
const IS_DEBUG = true;
```

### 5. Git Commit

The `deploy/` folder is **included in git** for version tracking:

```powershell
git add deploy/DataverseColumnNamer.zip
git commit -m "chore: build production package v1.0.0 for store submission"
git push
```

## Important Notes

- **Version:** Extension is at `1.0.0` (check `manifest.json`)
- **Development Mode:** Always keep `IS_DEBUG = true` in source files during development
- **Production Build:** Manually set `IS_DEBUG = false` before running deploy script, then restore to `true` after
- **Screenshots:** Prepare 1280x800 screenshots before store submission
- **Package Size:** Should be < 5MB for stores
- **Review Time:** Chrome 1-3 days, Edge 1-5 days
- **Deploy Location:** `deploy/` at repository root (committed to git)

## Package Contents Checklist

- [x] `manifest.json` - v1.0.0, all fields complete
- [x] `content.js` - IS_DEBUG = false (during packaging only)
- [x] `popup.js` - IS_DEBUG = false (during packaging only)
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

**IS_DEBUG still true in package:**
- Verify you changed IS_DEBUG to false in step 1 before running the deploy script
- Check the packaged files inside the ZIP to confirm

**Script fails:**
- Ensure PowerShell 5.1 or later is installed
- Run from repository root: `.\scripts\deploy.ps1`
- Check that all source files exist in DataverseColumnNamer/ folder