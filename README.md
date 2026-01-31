# Dataverse Column Namer

A Chrome/Edge browser extension that automatically generates schema names for Dataverse columns in Microsoft PowerApps, following configurable naming conventions.

![Extension Icon](DataverseColumnNamer/icons/icon128.png)

## 🎯 Purpose

When creating columns in Dataverse (PowerApps), you need to provide both a **Display Name** and a **Schema Name**. This extension automates the schema name generation based on your preferred naming convention, saving time and ensuring consistency across your Dataverse environment.

## ✨ Features

- **Auto-generate Schema Names**: Automatically creates schema names from display names
- **Multiple Naming Conventions**: 
  - `underscore_lowercase` - e.g., `hello_world` (Default)
  - `underscore_preserve` - e.g., `Hello_World`
  - `pascalCase` - e.g., `HelloWorld`
  - `camelCase` - e.g., `helloWorld`
  - `remove_spaces` - e.g., `HelloWorld`
- **Type-based Suffixes**: Automatically adds suffixes based on column type:
  - Lookup columns → `_lookup`
  - Choice columns → `_choice`
  - Money columns → `_currency`
  - And many more (configurable)
- **Environment Detection**: Automatically detects and highlights your target environment
- **Import/Export Configuration**: Share settings across teams
- **Debug Mode**: Built-in debug mode for testing and development

## 🚀 Installation

### From ZIP (Developer Mode)

1. Download the latest `DataverseColumnNamer-Share.zip` from [Releases](https://github.com/phuocle/dataverse-column-namer/releases)
2. Extract the ZIP file
3. Follow instructions in `HUONG-DAN-CAI-DAT.md` (included in the package)

### From Chrome Web Store

*(Coming soon)*

## 📖 Usage

1. Navigate to [PowerApps Maker Portal](https://make.powerapps.com)
2. Select your environment
3. Create a new table or edit existing table
4. Click **Add Column**
5. Enter the **Display Name**
6. The **Schema Name** will be auto-generated based on your settings!

### Configuration

Click the extension icon to configure:

- **Target Environment**: Set your environment name for auto-detection
- **Naming Convention**: Choose your preferred naming style
- **Advanced Suffix Configuration**: Customize suffixes for each column type

## 🛠️ Development

### Prerequisites

- Node.js (for any build tools, if needed)
- Chrome/Edge browser
- Git

### Fork & Clone

```bash
# Fork this repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/dataverse-column-namer.git
cd dataverse-column-namer
```

### Project Structure

```
DataverseColumnNamer/
├── src/
│   ├── manifest.json       # Extension manifest (Manifest V3)
│   ├── content.js          # Main logic for schema name generation
│   ├── popup.html          # Extension popup UI
│   ├── popup.js            # Popup logic
│   ├── popup.css           # Fluent UI-inspired styles
│   ├── styles.css          # Content script styles
│   └── icons/              # Extension icons
├── docs/
│   └── DISTRIBUTION-GUIDE.md
└── deploy/
    └── (generated packages)
```

### Debug Mode

The extension has a built-in debug mode for development:

1. Open `src/content.js` and `src/popup.js`
2. Set `IS_DEBUG = true` (default for development)
3. In debug mode, all suffixes use the `__[type]` pattern for easy identification
4. Example: `my_field__lookup`, `my_field__choice`

### Load Extension Locally

1. Open Chrome/Edge
2. Navigate to `chrome://extensions` (or `edge://extensions`)
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `src` folder

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Test thoroughly:
   - Load the extension in developer mode
   - Test on https://make.powerapps.com
   - Test different column types and naming conventions

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

### Build for Production

For production deployment, set `IS_DEBUG = false` in both `content.js` and `popup.js` before building.

You can use the deployment workflow:
```powershell
# From DataverseColumnNamer directory
cd DataverseColumnNamer

# Run the deploy workflow (see .agent/workflows/deploy.md)
# This will create deploy/DataverseColumnNamer.zip
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Code Style**: 
   - Use 'use strict' mode
   - Follow existing code formatting
   - Use meaningful variable names
   - Add comments for complex logic

2. **Testing**:
   - Test with different column types
   - Test all naming conventions
   - Verify environment detection works

3. **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/)
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring

4. **Pull Requests**:
   - Provide clear description
   - Reference any related issues
   - Include screenshots for UI changes

## 📋 Roadmap

- [ ] Support for autofill detection (currently in progress)
- [ ] Additional naming conventions (SCREAMING_SNAKE_CASE, etc.)
- [ ] Custom prefix/suffix patterns
- [ ] Multi-language support
- [ ] Publish to Chrome Web Store

## 🐛 Known Issues

- **Autofill Detection**: The extension may not trigger when using browser autofill. This is being actively worked on.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**PhuocLe**  
- GitHub: [@phuocle](https://github.com/phuocle)
- Website: [PhuocLe.NET](https://phuocle.net)

## 🙏 Acknowledgments

- Built for the Dataverse/PowerApps community
- Uses Fluent UI design principles
- Follows Chrome Extension Manifest V3 standards

---

**⭐ If this extension helps you, please give it a star!**
