# Dataverse Column Namer

A browser extension that automatically generates schema names for Dataverse columns in Microsoft PowerApps.

## 🎯 Purpose

When creating columns in Dataverse (PowerApps), you need both a **Display Name** and a **Schema Name**. This extension automates schema name generation based on your naming convention, saving time and ensuring consistency.

## ✨ Features

- **Auto-generate Schema Names** from display names
- **Multiple Naming Conventions**: 
  - `underscore_lowercase` - e.g., `hello_world` (Default)
  - `underscore_preserve` - e.g., `Hello_World`
  - `pascalCase` - e.g., `HelloWorld`
  - `camelCase` - e.g., `helloWorld`
  - `remove_spaces` - e.g., `HelloWorld`
- **Type-based Suffixes**: Automatically adds suffixes (configurable)
  - Lookup → `_id`, Choice → `_choice`, Currency → `_currency`, etc.
- **Environment Detection**: Highlights when on your target environment
- **Import/Export Configuration**: Share settings across teams

## 🚀 Installation

### Chrome Web Store
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Install-blue?logo=googlechrome)](https://chrome.google.com/webstore/detail/dataverse-column-namer)
_Chrome Web Store listing coming soon. This link will be updated once the extension is published._

### Microsoft Edge Add-ons
[![Edge Add-ons](https://img.shields.io/badge/Edge-Install-blue?logo=microsoftedge)](https://microsoftedge.microsoft.com/addons/detail/dataverse-column-namer)
_Microsoft Edge Add-ons listing coming soon. This link will be updated once the extension is published._

## 📖 Usage

1. Install extension from Chrome/Edge store
2. Navigate to [PowerApps Maker Portal](https://make.powerapps.com)
3. Click extension icon → Set your **Target Environment**
4. Click **Save Configuration**
5. Create a new column → Schema name auto-generates!

### Configuration Options

| Setting | Description |
|---------|-------------|
| Target Environment | Your PowerApps environment name |
| Naming Convention | Choose your preferred style |
| Advanced Suffixes | Customize suffix for each column type |

## 🛠️ Development

### Prerequisites
- Chrome/Edge browser
- Git

### Local Development

```bash
git clone https://github.com/phuocle/dataverse-column-namer.git
cd dataverse-column-namer
```

**Load in browser:**
1. Go to `chrome://extensions` or `edge://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → Select `DataverseColumnNamer` folder

### Project Structure

```
DataverseColumnNamer/
├── manifest.json       # Extension manifest (v3)
├── content.js          # Main logic
├── popup.html/js/css   # Extension popup
├── styles.css          # Content styles
└── icons/              # Extension icons
```

### Debug Mode

Set `IS_DEBUG = true` in `content.js` and `popup.js` for development.
Deploy script automatically sets it to `false` for production.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: description"`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 👨‍💻 Author

**PhuocLe**  
- GitHub: [@phuocle](https://github.com/phuocle)
- Website: [PhuocLe.NET](https://phuocle.net)

---

**⭐ If this extension helps you, please give it a star!**
