(function () {
    'use strict';

    // Set to true for debugging - all suffixes become __[type] pattern
    const IS_DEBUG = true;

    const CONFIG = {
        activeClass: 'dcn-env-active'
    };

    const DEBUG_SUFFIXES = {
        // Relationship Types
        lookup: '__lookup',
        customer: '__customerid',
        // Choice Types
        choice: '__choice',
        choices: '__choices',
        yn: '__yn',
        // Computed Types
        calculated: '__calculated',
        rollup: '__rollup',
        formula: '__formula',
        // Number Types
        currency: '__currency',
        wholenumber: '__wholenumber',
        decimal: '__decimal',
        float: '__float',
        language: '__language',
        // Date/Time Types
        datetime: '__datetime',
        dateonly: '__dateonly',
        duration: '__duration',
        timezone: '__timezone',
        // Text Types
        text: '__text',
        text_area: '__text_area',
        text_richtext: '__text_richtext',
        multiline: '__multiline',
        multiline_richtext: '__multiline_richtext',
        autonumber: '__autonumber',
        email: '__email',
        phone: '__phone',
        url: '__url',
        ticker: '__ticker',
        // File Types
        file: '__file',
        image: '__image'
    };

    const PROD_SUFFIXES = {
        // Relationship Types
        lookup: '_id',
        customer: '_customerid',
        // Choice Types
        choice: '_choice',
        choices: '_choices',
        yn: '_yn',
        // Computed Types
        calculated: '_calculated',
        rollup: '_rollup',
        formula: '_fx',
        // Number Types
        currency: '',
        wholenumber: '',
        decimal: '',
        float: '',
        language: '',
        // Date/Time Types
        datetime: '',
        dateonly: '',
        duration: '',
        timezone: '',
        // Text Types
        text: '',
        text_area: '',
        text_richtext: '',
        multiline: '',
        multiline_richtext: '',
        autonumber: '',
        email: '',
        phone: '',
        url: '',
        ticker: '',
        // File Types
        file: '',
        image: ''
    };

    const DEFAULT_SUFFIXES = IS_DEBUG ? DEBUG_SUFFIXES : PROD_SUFFIXES;

    let currentSuffixes = { ...DEFAULT_SUFFIXES };
    let isExtensionActive = false;

    const STORAGE_KEY = 'DataverseColumnNamer';

    async function loadSettings() {
        // When IS_DEBUG is true, always use DEBUG_SUFFIXES (ignore storage)
        if (IS_DEBUG) {
            currentSuffixes = { ...DEBUG_SUFFIXES };
            currentNamingConvention = 'underscore_lowercase';
            return;
        }

        try {
            const result = await chrome.storage.local.get(STORAGE_KEY);
            const config = result[STORAGE_KEY] || {};
            const stored = config.Suffixes || {};
            currentNamingConvention = config.NamingConvention || 'underscore_lowercase';

            currentSuffixes = { ...DEFAULT_SUFFIXES, ...stored };
        } catch (error) {
            currentSuffixes = { ...DEFAULT_SUFFIXES };
            currentNamingConvention = 'underscore_lowercase';
        }
    }

    function addDataTypeSuffix(schemaName) {
        if (!schemaName) return schemaName;

        const s = currentSuffixes;

        // Behavior-based suffixes (take priority)
        if (isCalculatedBehavior()) {
            if (s.calculated && !schemaName.endsWith(s.calculated)) {
                return schemaName + s.calculated;
            }
            return schemaName;
        }

        if (isRollupBehavior()) {
            if (s.rollup && !schemaName.endsWith(s.rollup)) {
                return schemaName + s.rollup;
            }
            return schemaName;
        }

        // Relationship Types
        if (isCustomerType()) {
            if (s.customer && !schemaName.endsWith(s.customer)) {
                return schemaName + s.customer;
            }
            return schemaName;
        }

        if (isLookupType()) {
            if (s.lookup && !schemaName.endsWith(s.lookup)) {
                return schemaName + s.lookup;
            }
            return schemaName;
        }

        // Choice Types
        if (isYesNoType()) {
            if (s.yn && !schemaName.endsWith(s.yn)) {
                return schemaName + s.yn;
            }
            return schemaName;
        }

        if (isChoiceType()) {
            if (isMultipleChoices()) {
                if (s.choices && !schemaName.endsWith(s.choices)) {
                    return schemaName + s.choices;
                }
            } else {
                if (s.choice && !schemaName.endsWith(s.choice)) {
                    return schemaName + s.choice;
                }
            }
            return schemaName;
        }

        // Computed Types
        if (isFormulaType()) {
            if (s.formula && !schemaName.endsWith(s.formula)) {
                return schemaName + s.formula;
            }
            return schemaName;
        }

        // Number Types
        if (isCurrencyType()) {
            if (s.currency && !schemaName.endsWith(s.currency)) {
                return schemaName + s.currency;
            }
            return schemaName;
        }

        if (isWholeNumberType()) {
            if (s.wholenumber && !schemaName.endsWith(s.wholenumber)) {
                return schemaName + s.wholenumber;
            }
            return schemaName;
        }

        if (isDecimalType()) {
            if (s.decimal && !schemaName.endsWith(s.decimal)) {
                return schemaName + s.decimal;
            }
            return schemaName;
        }

        if (isFloatType()) {
            if (s.float && !schemaName.endsWith(s.float)) {
                return schemaName + s.float;
            }
            return schemaName;
        }

        if (isLanguageType()) {
            if (s.language && !schemaName.endsWith(s.language)) {
                return schemaName + s.language;
            }
            return schemaName;
        }

        // Date/Time Types
        if (isDateTimeType()) {
            if (s.datetime && !schemaName.endsWith(s.datetime)) {
                return schemaName + s.datetime;
            }
            return schemaName;
        }

        if (isDateOnlyType()) {
            if (s.dateonly && !schemaName.endsWith(s.dateonly)) {
                return schemaName + s.dateonly;
            }
            return schemaName;
        }

        if (isDurationType()) {
            if (s.duration && !schemaName.endsWith(s.duration)) {
                return schemaName + s.duration;
            }
            return schemaName;
        }

        if (isTimezoneType()) {
            if (s.timezone && !schemaName.endsWith(s.timezone)) {
                return schemaName + s.timezone;
            }
            return schemaName;
        }

        // Text Types
        if (isTextType()) {
            if (s.text && !schemaName.endsWith(s.text)) {
                return schemaName + s.text;
            }
            return schemaName;
        }

        if (isTextAreaType()) {
            if (s.text_area && !schemaName.endsWith(s.text_area)) {
                return schemaName + s.text_area;
            }
            return schemaName;
        }

        if (isTextRichTextType()) {
            if (s.text_richtext && !schemaName.endsWith(s.text_richtext)) {
                return schemaName + s.text_richtext;
            }
            return schemaName;
        }

        if (isMultilineType()) {
            if (s.multiline && !schemaName.endsWith(s.multiline)) {
                return schemaName + s.multiline;
            }
            return schemaName;
        }

        if (isMultilineRichTextType()) {
            if (s.multiline_richtext && !schemaName.endsWith(s.multiline_richtext)) {
                return schemaName + s.multiline_richtext;
            }
            return schemaName;
        }

        if (isAutoNumberType()) {
            if (s.autonumber && !schemaName.endsWith(s.autonumber)) {
                return schemaName + s.autonumber;
            }
            return schemaName;
        }

        if (isEmailType()) {
            if (s.email && !schemaName.endsWith(s.email)) {
                return schemaName + s.email;
            }
            return schemaName;
        }

        if (isPhoneType()) {
            if (s.phone && !schemaName.endsWith(s.phone)) {
                return schemaName + s.phone;
            }
            return schemaName;
        }

        if (isUrlType()) {
            if (s.url && !schemaName.endsWith(s.url)) {
                return schemaName + s.url;
            }
            return schemaName;
        }

        if (isTickerType()) {
            if (s.ticker && !schemaName.endsWith(s.ticker)) {
                return schemaName + s.ticker;
            }
            return schemaName;
        }

        // File Types
        if (isFileType()) {
            if (s.file && !schemaName.endsWith(s.file)) {
                return schemaName + s.file;
            }
            return schemaName;
        }

        if (isImageType()) {
            if (s.image && !schemaName.endsWith(s.image)) {
                return schemaName + s.image;
            }
            return schemaName;
        }

        return schemaName;
    }

    async function init() {
        await loadSettings();
        setupEnvironmentWatcher();
        setupResizeListener();

        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace === 'local' && changes.DataverseColumnNamer) {
                const oldConfig = changes.DataverseColumnNamer.oldValue || {};
                const newConfig = changes.DataverseColumnNamer.newValue || {};

                if (oldConfig.TargetEnvironment !== newConfig.TargetEnvironment) {
                    checkAndScanEnvironment();
                }

                if (JSON.stringify(oldConfig.Suffixes) !== JSON.stringify(newConfig.Suffixes) ||
                    oldConfig.NamingConvention !== newConfig.NamingConvention) {
                    loadSettings();
                }
            }
        });

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setupSchemaNameOverride();
            });
        } else {
            setupSchemaNameOverride();
        }
    }

    const SELECTORS = {
        displayNameInput: '#ColumnForm_DisplayName',
        schemaNameInput: 'input[data-testid="FormSchemaName"]',
        dataTypeButton: '#ColumnDataTypeFilterContextualMenu .ms-Button-label',
        formatDropdown: '#ColumnForm_Format',
        formatValue: 'div[data-testid="columnFormat"] span'
    };

    function isHighlightActive() {
        const envBtn = document.querySelector('div[data-test-id="EnvironmentTitle"]')?.closest('button');
        return envBtn ? envBtn.classList.contains(CONFIG.activeClass) : false;
    }

    function highlightEnvironmentButton() {
        const envTitle = document.querySelector('div[data-test-id="EnvironmentTitle"]');
        if (!envTitle) return;

        const envBtn = envTitle.closest('button');

        if (envBtn && !envBtn.classList.contains(CONFIG.activeClass)) {
            envBtn.classList.add(CONFIG.activeClass);
        }
    }

    function removeEnvironmentHighlight() {
        const activeBtns = document.querySelectorAll(`.${CONFIG.activeClass}`);
        activeBtns.forEach(btn => {
            btn.classList.remove(CONFIG.activeClass);
        });
    }

    function normalizeString(str) {
        if (!str) return '';
        return str.replace(/\s+/g, ' ').trim();
    }

    function getCurrentEnvironment() {
        const envEl = document.querySelector('div[data-test-id="EnvironmentTitle"]');
        return envEl ? normalizeString(envEl.textContent) : null;
    }

    async function getTargetEnvironment() {
        try {
            const result = await chrome.storage.local.get(STORAGE_KEY);
            const config = result[STORAGE_KEY] || {};
            return config.TargetEnvironment || null;
        } catch (error) {
            return null;
        }
    }

    async function checkAndScanEnvironment() {
        const targetEnvRaw = await getTargetEnvironment();

        if (!targetEnvRaw) {
            isExtensionActive = false;
            removeEnvironmentHighlight();
            return;
        }

        const targetEnv = normalizeString(targetEnvRaw);
        const currentEnv = getCurrentEnvironment();

        if (currentEnv === targetEnv) {
            isExtensionActive = true;
            highlightEnvironmentButton();
        } else {
            isExtensionActive = false;
            removeEnvironmentHighlight();
        }
    }

    async function setupEnvironmentWatcher() {
        // Performance optimization: Use MutationObserver instead of polling
        const envTitleEl = document.querySelector('div[data-test-id="EnvironmentTitle"]');

        if (envTitleEl) {
            // Element already exists
            attachEnvironmentTitleObserver(envTitleEl);
            return;
        }

        // Element not found, wait for it with MutationObserver
        const observer = new MutationObserver((mutations, obs) => {
            const el = document.querySelector('div[data-test-id="EnvironmentTitle"]');
            if (el) {
                obs.disconnect();
                attachEnvironmentTitleObserver(el);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Fallback timeout to disconnect observer if element never appears
        setTimeout(() => {
            observer.disconnect();
        }, 30000); // 30 second timeout
    }

    function attachEnvironmentTitleObserver(element) {
        checkAndScanEnvironment();

        const observer = new MutationObserver((mutations) => {
            checkAndScanEnvironment();
        });

        observer.observe(element, {
            characterData: true,
            childList: true,
            subtree: true
        });
    }

    function setupResizeListener() {
        let timeout;
        window.addEventListener('resize', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                checkAndScanEnvironment();
            }, 500);
        });
    }

    // Performance optimization: Cache getDataType() result
    let cachedDataType = null;
    let cacheTimestamp = 0;
    const CACHE_DURATION = 100; // ms - cache for current update cycle

    function invalidateDataTypeCache() {
        cachedDataType = null;
        cacheTimestamp = 0;
    }

    function getDataType() {
        // Check cache first
        const now = Date.now();
        if (cachedDataType !== null && (now - cacheTimestamp) < CACHE_DURATION) {
            return cachedDataType;
        }

        let result = '';
        const dataTypeLabel = document.querySelector(SELECTORS.dataTypeButton);

        if (dataTypeLabel) {
            const text = dataTypeLabel.textContent.trim().toLowerCase();

            // If it's "Single line of text", check the format dropdown for specific types
            if (text === 'single line of text') {
                const formatValue = document.querySelector(SELECTORS.formatValue);
                if (formatValue) {
                    const formatText = formatValue.textContent.trim().toLowerCase();
                    // Return specific format if it's not just "text"
                    if (formatText === 'text area') {
                        result = 'text_area';
                    } else if (formatText === 'email') {
                        result = 'email';
                    } else if (formatText === 'phone' || formatText === 'phone number') {
                        result = 'phone';
                    } else if (formatText === 'url') {
                        result = 'url';
                    } else if (formatText === 'ticker symbol') {
                        result = 'ticker symbol';
                    } else if (formatText === 'rich text') {
                        result = 'text_richtext';
                    } else {
                        result = text;
                    }
                } else {
                    result = text;
                }
            }
            // If it's "Multiple lines of text", check the format dropdown  
            else if (text === 'multiple lines of text') {
                const formatValue = document.querySelector(SELECTORS.formatValue);
                if (formatValue) {
                    const formatText = formatValue.textContent.trim().toLowerCase();
                    if (formatText === 'rich text') {
                        result = 'multiline_richtext';
                    } else {
                        result = 'multiline';
                    }
                } else {
                    result = 'multiline';
                }
            }
            // If it's "Whole number", check the format dropdown for specific formats
            else if (text === 'whole number') {
                const formatValue = document.querySelector(SELECTORS.formatValue);
                if (formatValue) {
                    const formatText = formatValue.textContent.trim().toLowerCase();
                    if (formatText === 'duration') {
                        result = 'duration';
                    } else if (formatText === 'language code' || formatText === 'language') {
                        result = 'language';
                    } else if (formatText === 'time zone' || formatText === 'timezone') {
                        result = 'timezone';
                    } else {
                        result = 'whole number';
                    }
                } else {
                    result = 'whole number';
                }
            }
            // If it's "Date and time", check the format dropdown
            else if (text === 'date and time') {
                const formatValue = document.querySelector(SELECTORS.formatValue);
                if (formatValue) {
                    const formatText = formatValue.textContent.trim().toLowerCase();
                    if (formatText === 'date only') {
                        result = 'date only';
                    } else {
                        result = 'date and time';
                    }
                } else {
                    result = 'date and time';
                }
            } else {
                result = text;
            }
        }

        // Cache the result
        cachedDataType = result;
        cacheTimestamp = Date.now();
        return result;
    }

    function isLookupType() {
        return getDataType() === 'lookup';
    }

    function isYesNoType() {
        return getDataType() === 'yes/no';
    }

    function isChoiceType() {
        return getDataType() === 'choice';
    }

    function isMultipleChoices() {
        const checkbox = document.querySelector('input[data-testid="multipleChoices"]');
        return checkbox ? checkbox.checked : false;
    }

    function getBehaviorType() {
        const behaviorOption = document.querySelector('#tooltipColumnBehavior-option');
        if (behaviorOption) {
            return behaviorOption.textContent.trim().toLowerCase();
        }
        return '';
    }

    function isCalculatedBehavior() {
        return getBehaviorType() === 'calculated';
    }

    function isRollupBehavior() {
        return getBehaviorType() === 'rollup';
    }

    function isCustomerType() {
        return getDataType() === 'customer';
    }

    function isFormulaType() {
        return getDataType() === 'formula';
    }

    // Number Types
    function isCurrencyType() {
        return getDataType() === 'currency';
    }

    function isWholeNumberType() {
        return getDataType() === 'whole number';
    }

    function isDecimalType() {
        return getDataType() === 'decimal';
    }

    function isFloatType() {
        return getDataType() === 'float';
    }

    function isLanguageType() {
        return getDataType() === 'language';
    }

    // Date/Time Types
    function isDateTimeType() {
        return getDataType() === 'date and time';
    }

    function isDateOnlyType() {
        return getDataType() === 'date only';
    }

    function isDurationType() {
        return getDataType() === 'duration';
    }

    function isTimezoneType() {
        return getDataType() === 'timezone';
    }

    // Text Types
    function isTextType() {
        return getDataType() === 'single line of text';
    }

    function isTextAreaType() {
        return getDataType() === 'text_area';
    }

    function isTextRichTextType() {
        return getDataType() === 'text_richtext';
    }

    function isMultilineType() {
        return getDataType() === 'multiline';
    }

    function isMultilineRichTextType() {
        return getDataType() === 'multiline_richtext';
    }

    function isAutoNumberType() {
        return getDataType() === 'autonumber';
    }

    function isEmailType() {
        return getDataType() === 'email';
    }

    function isPhoneType() {
        return getDataType() === 'phone';
    }

    function isUrlType() {
        return getDataType() === 'url';
    }

    function isTickerType() {
        return getDataType() === 'ticker symbol';
    }

    // File Types
    function isFileType() {
        return getDataType() === 'file';
    }

    function isImageType() {
        return getDataType() === 'image';
    }

    let currentNamingConvention = 'underscore_lowercase';

    function toPascalCase(input) {
        if (!input) return '';
        const words = input.trim().split(/[\s\-_]+/);
        return words.map(w => {
            if (!w) return '';
            return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
        }).join('');
    }

    function toCamelCase(input) {
        const pascal = toPascalCase(input);
        if (!pascal) return '';
        return pascal.charAt(0).toLowerCase() + pascal.slice(1);
    }

    function toUnderscoreLowercase(input) {
        if (!input) return '';
        return input.trim().toLowerCase().replace(/\s+/g, '_');
    }

    function toUnderscorePreserve(input) {
        if (!input) return '';
        return input.trim().replace(/\s+/g, '_');
    }

    function toRemoveSpaces(input) {
        if (!input) return '';
        return input.trim().replace(/\s+/g, ''); // Remove spaces only, preserve case
    }

    function applyNamingConvention(str) {
        if (!str) return '';

        let result = '';

        switch (currentNamingConvention) {
            case 'underscore_preserve':
                result = toUnderscorePreserve(str);
                break;
            case 'pascalCase':
                result = toPascalCase(str);
                break;
            case 'camelCase':
                result = toCamelCase(str);
                break;
            case 'remove_spaces':
                result = toRemoveSpaces(str);
                break;
            case 'underscore_lowercase':
            default:
                result = toUnderscoreLowercase(str);
                break;
        }

        // Remove all invalid characters for Dataverse schema names (only a-zA-Z0-9_ allowed)
        result = result.replace(/[^a-zA-Z0-9_]/g, '');

        return result;
    }

    function toSnakeCase(str) {
        if (!str) return '';

        // applyNamingConvention already filters invalid characters
        return applyNamingConvention(str);
    }

    function setReactInputValue(input, value) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, 'value'
        ).set;

        nativeInputValueSetter.call(input, value);
        const inputEvent = new Event('input', { bubbles: true });
        input.dispatchEvent(inputEvent);
    }

    function handleDisplayNameChange(event) {
        if (!isExtensionActive) return;

        const displayName = event.target.value;
        let schemaName = toSnakeCase(displayName);
        schemaName = addDataTypeSuffix(schemaName);

        const schemaInput = document.querySelector(SELECTORS.schemaNameInput);
        if (schemaInput) {
            setTimeout(() => {
                setReactInputValue(schemaInput, schemaName);
            }, 50);
        }
    }

    function updateSchemaName() {
        if (!isExtensionActive) return;

        const displayInput = document.querySelector(SELECTORS.displayNameInput);
        const schemaInput = document.querySelector(SELECTORS.schemaNameInput);

        if (!displayInput || !schemaInput) return;

        const displayName = displayInput.value;
        if (!displayName) return;

        let schemaName = toSnakeCase(displayName);
        schemaName = addDataTypeSuffix(schemaName);

        setReactInputValue(schemaInput, schemaName);
    }

    function isNewColumnPanel() {
        const headerTitle = document.querySelector('h1[id$="-headerText"]');
        if (!headerTitle) return false;
        const headerText = normalizeString(headerTitle.textContent);
        return headerText === 'New column';
    }

    function setupSchemaNameOverride() {
        // Performance optimization: Debounce function for updateSchemaName
        let updateTimeout;
        const debouncedUpdate = () => {
            invalidateDataTypeCache(); // Clear cache before update
            clearTimeout(updateTimeout);
            updateTimeout = setTimeout(updateSchemaName, 100);
        };

        const observer = new MutationObserver((mutations) => {
            // Only proceed if we're on the "New column" panel
            if (!isNewColumnPanel()) return;

            const displayInput = document.querySelector(SELECTORS.displayNameInput);
            const dataTypeButton = document.querySelector('#ColumnDataTypeFilterContextualMenu');
            const behaviorButton = document.querySelector('#tooltipColumnBehavior');
            const formatDropdown = document.querySelector(SELECTORS.formatDropdown);

            if (displayInput && !displayInput.hasAttribute('data-mf-listening')) {
                displayInput.setAttribute('data-mf-listening', 'true');
                displayInput.addEventListener('input', handleDisplayNameChange);
                // Handle browser autofill - 'change' fires when autofill completes
                displayInput.addEventListener('change', handleDisplayNameChange);
                // Handle paste events
                displayInput.addEventListener('paste', (e) => {
                    setTimeout(() => handleDisplayNameChange({ target: displayInput }), 50);
                });
            }

            // Performance optimization: Consolidate type/behavior/format observers into a single area observer
            const columnPropertiesArea = document.querySelector('#tabDataType');
            if (columnPropertiesArea && !columnPropertiesArea.hasAttribute('data-mf-listening')) {
                columnPropertiesArea.setAttribute('data-mf-listening', 'true');

                // Single consolidated observer for all type/behavior/format changes
                const propertiesObserver = new MutationObserver(debouncedUpdate);
                propertiesObserver.observe(columnPropertiesArea, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            }

            // Fallback: Individual button click listeners for immediate response
            if (dataTypeButton && !dataTypeButton.hasAttribute('data-click-listening')) {
                dataTypeButton.setAttribute('data-click-listening', 'true');
                dataTypeButton.addEventListener('click', () => setTimeout(debouncedUpdate, 500));
            }

            if (behaviorButton && !behaviorButton.hasAttribute('data-click-listening')) {
                behaviorButton.setAttribute('data-click-listening', 'true');
                behaviorButton.addEventListener('click', () => setTimeout(debouncedUpdate, 500));
            }

            if (formatDropdown && !formatDropdown.hasAttribute('data-click-listening')) {
                formatDropdown.setAttribute('data-click-listening', 'true');
                formatDropdown.addEventListener('click', () => setTimeout(debouncedUpdate, 500));
            }

            const multipleChoicesCheckbox = document.querySelector('input[data-testid="multipleChoices"]');
            if (multipleChoicesCheckbox && !multipleChoicesCheckbox.hasAttribute('data-mf-listening')) {
                multipleChoicesCheckbox.setAttribute('data-mf-listening', 'true');
                multipleChoicesCheckbox.addEventListener('change', () => {
                    invalidateDataTypeCache();
                    setTimeout(updateSchemaName, 50);
                });
            }

            if (isExtensionActive) {
                injectPanelBadge();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function injectPanelBadge() {
        const existingBadge = document.querySelector('.dcn-panel-badge');
        if (existingBadge) return;

        // Only inject badge if we're on the "New column" panel
        if (!isNewColumnPanel()) return;

        const headerTitle = document.querySelector('h1[id$="-headerText"]');

        if (headerTitle) {
            const headerStack = headerTitle.closest('.ms-Stack');

            if (headerStack && headerStack.parentElement) {
                const mainContentArea = headerStack.parentElement;

                if (mainContentArea.parentElement) {
                    const badge = document.createElement('div');
                    badge.className = IS_DEBUG ? 'dcn-panel-badge dcn-debug-mode' : 'dcn-panel-badge';
                    badge.innerHTML = IS_DEBUG ? 'YOU ARE IN DEBUG MODE' : 'Column Namer Active';

                    mainContentArea.parentElement.insertBefore(badge, mainContentArea);
                }
            }
        }
    }

    init();

})();
