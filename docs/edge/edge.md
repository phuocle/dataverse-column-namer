# Edge Store Context & Assets

This file documents the assets generated for the Microsoft Edge Add-ons store and the text content used for the listing.

## 🎨 Graphic Assets

### 1. Store Logo
- **File:** `store_logo.png`
- **Size:** 300x300 (Source), required 1:1 ratio.

**Alternative Logo (DC Style)**
- **File:** `store_logo2.png`
- **Size:** 300x300

> [!NOTE]
> This logo corresponds to the generated extension icons in `docs/icons/` (16, 48, 128px).

### 2. Promotional Tiles
**Small Tile**
- **File:** `small_tile_2.png`
- **Size:** 440x280

**Large Tile**
- **File:** `large_tile_2.png`
- **Size:** 1400x560

**Marquee**
- **File:** `marquee_2.png`
- **Size:** 1440x560

### 3. Screenshots (Mockups)
**Popup Interface**
- **File:** `screenshot_popup.png`

**New Column Panel**
- **File:** `screenshot_panel.png`

**Popup Configuration**
- **File:** `screenshot_config_2.png`
- **Caption:** `Easy Configuration` or `Customize Naming Conventions`

**Active Environment Indicator**
- **File:** `screenshot_active_2.png`
- **Caption:** `Active Environment Indicator` or `Seamless Integration`

### 4. Demo Video
- **File:** `demo.gif`
- **Context:** A short animation demonstrating the extension in action. Useful for the "Promotional Video" or "Demo" section if supported, or as a high-quality animated asset for external promotion.

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
Choose from 5 industry-standard naming styles to match your project's coding guidelines.

#### 1. underscore_lowercase (Default)
Clean, standard Dataverse naming style.
- `Hello World` → `hello_world`
- `Customer ID` → `customer_id`
- `Price ($)` → `price`
- `User@Email.com` → `user_email_com`
- `Year 2024` → `year_2024`

#### 2. underscore_preserve
Keeps original casing, useful for specific coding standards.
- `Hello World` → `Hello_World`
- `Customer ID` → `Customer_ID`
- `iOS Version` → `iOS_Version`
- `Price ($)` → `Price`
- `eCommerce Site` → `eCommerce_Site`

#### 3. pascalCase
Compact style, popular in C# and .NET development.
- `Hello World` → `HelloWorld`
- `customer name` → `CustomerName`
- `new-customer-id` → `NewCustomerId`
- `date_of_birth` → `DateOfBirth`
- `123 Start` → `123Start`

#### 4. camelCase
Standard JavaScript/TypeScript naming convention.
- `Hello World` → `helloWorld`
- `Customer ID` → `customerId`
- `API Key` → `apiKey`
- `Submit-Request-Now` → `submitRequestNow`
- `1st Place` → `1stPlace`

#### 5. remove_spaces
Simplest form, lowercase with no separators.
- `Hello World` → `helloworld`
- `Customer ID` → `customerid`
- `First_Name` → `firstname`
- `Price ($)` → `price`
- `A B C D` → `abcd`

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

### Search Terms (Tags)
1. `Dataverse`
2. `Power Apps`
3. `Dynamics 365`
4. `Power Platform`
5. `Schema Name`
6. `Logical Name`
7. `Column Namer`

---

## 🚀 Deployment Instructions

### Microsoft Edge Add-ons (Partner Center)
1.  **Log in**: Go to Partner Center Dashboard (use the correct directory).
2.  **Create New Extension**: Upload the `.zip` file from `deploy/`.
3.  **Store Listing**:
    - **Description**: Copy-paste the **Long Description** markdown above.
    - **Logos**: Upload `store_logo.png` (300x300) and `small_tile_2.png` (440x280), `large_tile_2.png` (1400x560).
    - **Screenshots**: Upload all files from `docs/edge/` (Popup, Panel, etc. - specifically `*_2.png` versions).
    - **Demo Video**: Upload `demo.gif` if a video upload section exists, or use it for promotional materials.
4.  **Properties**:
    - Set Category to "Developer Tools".
    - Add Support URL from "Additional Info".

### Chrome Web Store (Developer Dashboard)
1.  **Log in**: Chrome Web Store Developer Dashboard.
2.  **Upload**: Upload the `.zip` file.
3.  **Store Listing**:
    - **Description**: Copy-paste the **Long Description**. Note that Chrome Store might require plain text or limited HTML; Markdown usually works or is stripped gracefully.
    - **Icon**: Upload `store_logo.png` (128x128 version if asked, otherwise 300x300 usually resizes or use icon128.png).
    - **Screenshots**: Upload `screenshot_*.png`.
    - **Marquee**: Upload `marquee_2.png` (1440x560) as the "Marquee promo tile".

## 📝 Notes for Certification (Reviewers)
Copy and paste this into the "Notes for certification" field:

```text
This extension is a developer productivity tool designed for Microsoft Power Apps & Dataverse makers. It runs entirely locally in the browser and requires no external account or login.

**Testing Instructions:**
1. Navigate to the Power Apps Maker Portal: https://make.powerapps.com/
2. Open any Solution or Table (e.g., create a dummy table).
3. Click "New > Column".
4. Open the Extension Popup and "Pin" the current environment to activate it (Status matches "Active").
5. Type in the "Display name" field (e.g., "Customer ID").
6. Verify that the "Schema name" field automatically populates (e.g., "customer_id") based on the configured convention.

**Key Features to Verify:**
- Auto-population of schema name on keypress.
- Suffix generation for specific data types (e.g., changing type to Lookup appends "_id").
- "Pin Environment" safety feature: The extension only runs on whitelisted environment URLs.

**Dependencies:**
- Depends on the DOM structure of the standard Power Apps Maker portal. 
```
