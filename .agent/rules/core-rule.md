---
trigger: always_on
---

# Core Rules - Dataverse Column Namer Extension

## File Organization

### Source Files
All source code files are placed at the **root level** of `DataverseColumnNamer/` folder.

```
DataverseColumnNamer/
├── manifest.json
├── content.js
├── popup.js
├── popup.html
├── popup.css
├── styles.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Deploy Output
Build artifacts and distribution packages go in `deploy/` folder at **repository root**.

### Root Level (Repository)
At the repository root:
- `.agent` folder
- `DataverseColumnNamer` folder
- `README.md` - Main documentation for GitHub
- `.gitignore` - Git ignore rules

## Folder Structure Summary

```
root/                               ← Repository root
├── .gitignore                      ← Git ignore
├── README.md                       ← Repository documentation
├── deploy/                         ← Build artifacts (included in git)
│   └── DataverseColumnNamer.zip   ← Store-ready package
├── .agent/
│   ├── rules/
│   │   └── core-rule.md           ← This file
│   └── workflows/
│       └── deploy.md              ← Deploy workflow
└── DataverseColumnNamer/          ← Extension root
    ├── manifest.json              ← Extension manifest (v1.0.0)
    ├── content.js                 ← Main content script
    ├── popup.js                   ← Popup logic
    ├── popup.html                 ← Popup UI
    ├── popup.css                  ← Popup styles
    ├── styles.css                 ← Content styles
    ├── icons/                     ← Extension icons
    ├── docs/                      ← Documentation (gitignored)
    └── deploy/                    ← Old location (removed)
```

## Important Notes

1. **No `root/` folder** - Extension files are at `DataverseColumnNamer/` root
2. **Version**: Always keep at `1.0.0` in manifest.json for production
3. **Debug Mode**: `IS_DEBUG` should be `false` for production, `true` for development
4. **Icons**: Only 3 sizes needed: 16, 48, 128 (as per manifest.json)
