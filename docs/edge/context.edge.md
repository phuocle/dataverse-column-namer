# Edge Store Context & Assets

This file documents the assets generated for the Microsoft Edge Add-ons store and the text content used for the listing.

## 🎨 Graphic Assets

### 1. Store Logo
- **File:** `store_logo.png`
- **Size:** 300x300 (Source), required 1:1 ratio.
- **Prompt Used:**
  > High resolution 300x300 pixel version of the provided icon. The design must be identical to the input image but cleaner and sharper for use as a store logo. Centered on a clean white background.

**Alternative Logo (DC Style)**
- **File:** `store_logo2.png`
- **Size:** 300x300
- **Prompt Used:**
  > Extract the 'DC' stylized logo from the bottom right of the provided image. Create a high-quality square 300x300 pixel logo from it on a transparent background.

> [!NOTE]
> This logo corresponds to the generated extension icons in `docs/icons/` (16, 48, 128px).

### 2. Promotional Tiles
**Small Tile**
- **File:** `small_tile.png`
- **Size:** 440x280
- **Prompt Used:**
  > Small promotional tile for 'Dataverse Column Namer'. Style based on 'Smart Column Naming' concept. Visuals: Compact abstract UI showing automated arrow flow from Display Name to Schema Name. Colors: Microsoft Power Platform aesthetics (purple/blue gradients), same style as the large tile. TEXT MUST BE EXACTLY: 'Smart Column Naming for PowerApps'. Ensure text is legible on 440x280 canvas.

**Large Tile**
- **File:** `large_tile.png`
- **Size:** 920x680
- **Prompt Used:**
  > Large promotional tile for 'Dataverse Column Namer'. Featured text: 'Smart Column Naming for PowerApps'. Visuals: Abstract UI showing a display name being converted to a schema name automatically. Colors: Microsoft Power Platform aesthetics. Size: 920x680.

**Marquee**
- **File:** `marquee.png`
- **Size:** 1400x560
- **Prompt Used:**
  > Marquee banner for 'Dataverse Column Namer'. Professional 1400x560 promotional graphic. Visual composition: Split view showing the 'Before' and 'After' of the extension's magic. Left side: A PowerApps input field 'Display Name: Customer Email'. Center: A stylized glowing arrow or gear icon representing automation. Right side: The result 'Schema Name: new_CustomerEmail_email' automatically filled. Background: Fluent UI design style, PowerApps purple to blue gradient. Text: 'Automated Schema Naming for Dataverse'.

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
  > Create a 640x400 landscape image. Place the provided vertical UI screenshot in the center. The background should be a modern, professional gradient.

**Active Environment Indicator**
- **File:** `screenshot_active.png`
- **Prompt Used:**
  > Create a 640x400 landscape image. Place the provided horizontal UI screenshot in the center. The background should be a modern, professional gradient. Add a nice drop shadow. Demonstrates the 'Active Environment' feature.

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

**Boost your Power Apps development productivity with automated, consistent schema naming.**

Dataverse Column Namer is the essential utility for Microsoft Power Platform developers and consultants. It eliminates the tedious, error-prone manual process of typing schema names for Dataverse columns. Just type your "Display Name", and watch the "Schema Name" automatically populate based on your preferred convention—instantly.

## 🚀 Key Features

### 🎯 Automated Naming
- **Instant Generation**: As you type the Display Name, the Schema Name is generated in real-time.
- **Smart Conversion**: Automatically handles special characters, spaces, and casing logic.

### 🔧 Flexible Naming Conventions
Choose from 5 industry-standard naming styles to match your project's coding guidelines:
- **underscore_lowercase** (e.g., `hello_world`) - *Default*
- **underscore_preserve** (e.g., `Hello_World`)
- **pascalCase** (e.g., `HelloWorld`)
- **camelCase** (e.g., `helloWorld`)
- **remove_spaces** (e.g., `helloworld`)

### 📝 Intelligent Type-Based Suffixes
Automatically appends standardized suffixes based on the column data type to keep your schema clean and organized:
- **Lookups**: `_id`, `_customerid`
- **Choices**: `_choice`, `_choices`, `_yn`
- **Calculated/Rollup**: `_calculated`, `_rollup`
- **Date/Time**: `_date`, `_time`
- *Fully configurable!* Customize these suffixes to match your organization's specific standards.

### 🌍 Environment Awareness
- **Safe Activation**: The extension only activates on Power Apps environments you explicitly "pin".
- **Visual Indicators**: Clear visual feedback (Active/Inactive) directly in the popup shows when the tool is running.
- **Prevent Accidents**: Avoid unintentional naming changes in inconsistent environments.

### 💾 Configuration Management
- **Import/Export**: Easily share your naming standards with your team by exporting your configuration to a JSON file.
- **Cross-Device Sync**: Keep your settings consistent across different machines.

## 💡 Why use Dataverse Column Namer?
- **Save Time**: Shave seconds off every column creation. In a large project, this saves hours.
- **Consistency**: Ensure every developer on the team uses the exact same naming pattern.
- **Reduce Errors**: No more typos or accidentally leaving the schema name as `new_column`.
- **Focus on Logic**: Stop worrying about mundane details and focus on building great apps.

## Privacy & Security
This extension runs entirely locally within your browser. It does not transmit any data to external servers or collect any personal information. Your configuration is stored safely in your browser's local storage.

## Support
Found a bug or have a feature request? We'd love to hear from you!
Visit our GitHub repository: [https://github.com/phuocle/dataverse-column-namer](https://github.com/phuocle/dataverse-column-namer)
```

### Additional Info
- **Category:** Developer Tools
- **Website:** https://github.com/phuocle/dataverse-column-namer
- **Support:** https://github.com/phuocle/dataverse-column-namer/issues
