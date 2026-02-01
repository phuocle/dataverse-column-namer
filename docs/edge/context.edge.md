# Edge Store Context & Assets

This file documents the assets generated for the Microsoft Edge Add-ons store and the text content used for the listing.

## 🎨 Graphic Assets

### 1. Store Logo
- **File:** `store_logo.png`
- **Size:** 300x300 (Source), required 1:1 ratio.
- **Prompt Used:**
  > A modern, professional logo for a developer tool extension named 'Dataverse Column Namer'. The design should feature a stylized column or database icon being renamed or a magic wand efffect. Colors: PowerApps purple, dataverse green/blue, clean white background. Minimalist and flat design. Size: 300x300.

### 2. Promotional Tiles
**Small Tile**
- **File:** `small_tile.png`
- **Size:** 440x280
- **Prompt Used:**
  > Promotional tile for 'Dataverse Column Namer'. Text: 'Auto-Name Columns'. Background: Soft gradient purple and blue. Icon: Magic wand renaming a database column. Size: 440x280. Professional style.

**Large Tile**
- **File:** `large_tile.png`
- **Size:** 920x680
- **Prompt Used:**
  > Large promotional tile for 'Dataverse Column Namer'. Featured text: 'Smart Column Naming for PowerApps'. Visuals: Abstract UI showing a display name being converted to a schema name automatically. Colors: Microsoft Power Platform aesthetics. Size: 920x680.

**Marquee**
- **File:** `marquee.png`
- **Size:** 1400x560
- **Prompt Used:**
  > Marquee banner for 'Dataverse Column Namer'. Wide format. Text: 'Boost Productivity in PowerApps'. Visual: Clean, modern workflow illustration showing automated naming. Professional, enterprise-grade look. Size: 1400x560.

### 3. Screenshots (Mockups)
**Popup Interface**
- **File:** `screenshot_popup.png`
- **Prompt Used:**
  > Screenshot mockup of a browser extension popup named 'Dataverse Column Namer'. Dark mode UI. Shows settings for 'Target Environment' (Dev) and 'Naming Convention' (Underscore Lowercase). Clean, modern interface. Size: 640x400.

**New Column Panel**
- **File:** `screenshot_panel.png`
- **Prompt Used:**
  > Screenshot mockup of PowerApps 'New Column' panel. Display Name input: 'Start Date'. Schema Name input automatically filled with 'new_startdate_date'. Highlighted schema name field indicating automation. Size: 640x400.

**Configuration Settings**
- **File:** `screenshot_config.png`
- **Prompt Used:**
  > Screenshot mockup of configuration settings for suffixes. List of data types (Lookup, Choice, Currency) with corresponding text inputs for suffixes (e.g., _id, _code, _cur). Modern table layout. Size: 640x400.

---

## 📝 Store Listing Text

### Product Details
- **Name:** Dataverse Column Namer
- **Short Description (Summary):**
  ```text
  Auto-generates schema names for Dataverse columns with configurable naming conventions and type-based suffixes
  ```

### Long Description
```markdown
# Dataverse Column Namer

Automatically generates schema names for Dataverse columns in Microsoft PowerApps, following configurable naming conventions.

## Features
- 🎯 Auto-generate schema names from display names
- 🔧 5 naming conventions (underscore_lowercase, pascalCase, camelCase, etc.)
- 📝 Type-based suffixes (e.g., _lookup, _choice, _currency)
- 🌍 Environment detection & activation
- 💾 Import/Export configuration
- ⚡ Real-time schema name updates

## How to Use
1. Install the extension
2. Navigate to make.powerapps.com
3. Configure your environment and naming convention
4. Create a new column
5. Type the display name - schema name is auto-generated!

## Privacy
This extension does not collect any personal data. All settings are stored locally in your browser.

## Support
For issues or feature requests, visit: https://github.com/phuocle/dataverse-column-namer
```

### Additional Info
- **Category:** Developer Tools
- **Website:** https://github.com/phuocle/dataverse-column-namer
- **Support:** https://github.com/phuocle/dataverse-column-namer/issues
