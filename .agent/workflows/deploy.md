---
description: Build and package the Dataverse Column Namer extension for Chrome/Edge Store deployment
---

// turbo-all

# Deploy Extension to Store Workflow

This workflow creates a production-ready ZIP package for submitting to Chrome Web Store and Microsoft Edge Add-ons.

**Working directory:** `DataverseColumnNamer` (where this workflow is run from)

**Output location:** `deploy/` folder at repository root (parent directory)

**IMPORTANT:** This workflow automatically handles `IS_DEBUG` flag - sets to `false` for production build, then restores to `true` for development.

## Output Structure

```
root/                              ← Repository root
└── deploy/                        ← Deployment folder (committed to git)
    └── DataverseColumnNamer.zip   ← Ready for Chrome/Edge Store upload
```

## Steps

### 1. Set IS_DEBUG = false for production build
In both `content.js` and `popup.js`, change:
```javascript
const IS_DEBUG = true;
```
to:
```javascript
const IS_DEBUG = false;
```

Files to update:
- `./content.js` (line 5)
- `./popup.js` (line 4)

### 2. Clean up old packages
```powershell
Remove-Item -Path "../deploy/DataverseColumnNamer.zip" -Force -ErrorAction SilentlyContinue
```

### 3. Create deploy folder at root if not exists
```powershell
New-Item -ItemType Directory -Force -Path "../deploy"
```

### 4. Create the store-ready extension ZIP
```powershell
Compress-Archive -Path "./manifest.json", "./content.js", "./utils.js", "./styles.css", "./popup.css", "./popup.html", "./popup.js", "./icons" -DestinationPath "../deploy/DataverseColumnNamer.zip" -Force
```

### 5. Verify the package
```powershell
Get-ChildItem "../deploy/DataverseColumnNamer.zip" | Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1024,2)}}, LastWriteTime
```

### 6. Restore IS_DEBUG = true for development
In both `content.js` and `popup.js`, change back:
```javascript
const IS_DEBUG = false;
```
to:
```javascript
const IS_DEBUG = true;
```

Files to update:
- `./content.js` (line 5)
- `./popup.js` (line 4)

## Git Commit

The `deploy/` folder is **included in git** for version tracking:

```powershell
cd ..
git add deploy/DataverseColumnNamer.zip
git commit -m "chore: build production package v1.0.0 for store submission"
git push
```

## Important Notes

- **Version:** Extension is at `1.0.0` (check `manifest.json`)
- **Production Build:** `IS_DEBUG = false` enables configurable suffixes
- **Screenshots:** Prepare 1280x800 screenshots before store submission
- **Package Size:** Should be < 5MB for stores
- **Review Time:** Chrome 1-3 days, Edge 1-5 days
- **Deploy Location:** `../deploy/` (root level, committed to git)

## Package Contents Checklist

- [x] `manifest.json` - v1.0.0, all fields complete
- [x] `content.js` - IS_DEBUG = false
- [x] `popup.js` - IS_DEBUG = false  
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

**IS_DEBUG still true:**
- Re-run steps 1 and 4
- Verify changes before creating ZIP