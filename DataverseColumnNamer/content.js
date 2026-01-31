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

        // Cache dataType and behaviorType once to avoid repeated DOM queries
        const dataType = getDataType();
        const behaviorType = getBehaviorType();

        // Behavior-based suffixes (take priority)
        if (behaviorType === 'calculated') {
            if (s.calculated && !schemaName.endsWith(s.calculated)) {
                return schemaName + s.calculated;
            }
            return schemaName;
        }

        if (behaviorType === 'rollup') {
            if (s.rollup && !schemaName.endsWith(s.rollup)) {
                return schemaName + s.rollup;
            }
            return schemaName;
        }

        // Relationship Types
        if (dataType === 'customer') {
            if (s.customer && !schemaName.endsWith(s.customer)) {
                return schemaName + s.customer;
            }
            return schemaName;
        }

        if (dataType === 'lookup') {
            if (s.lookup && !schemaName.endsWith(s.lookup)) {
                return schemaName + s.lookup;
            }
            return schemaName;
        }

        // Choice Types
        if (dataType === 'yes/no') {
            if (s.yn && !schemaName.endsWith(s.yn)) {
                return schemaName + s.yn;
            }
            return schemaName;
        }

        if (dataType === 'choice') {
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
        if (dataType === 'formula') {
            if (s.formula && !schemaName.endsWith(s.formula)) {
                return schemaName + s.formula;
            }
            return schemaName;
        }

        // Number Types
        if (dataType === 'currency') {
            if (s.currency && !schemaName.endsWith(s.currency)) {
                return schemaName + s.currency;
            }
            return schemaName;
        }

        if (dataType === 'whole number') {
            if (s.wholenumber && !schemaName.endsWith(s.wholenumber)) {
                return schemaName + s.wholenumber;
            }
            return schemaName;
        }

        if (dataType === 'decimal') {
            if (s.decimal && !schemaName.endsWith(s.decimal)) {
                return schemaName + s.decimal;
            }
            return schemaName;
        }

        if (dataType === 'float') {
            if (s.float && !schemaName.endsWith(s.float)) {
                return schemaName + s.float;
            }
            return schemaName;
        }

        if (dataType === 'language') {
            if (s.language && !schemaName.endsWith(s.language)) {
                return schemaName + s.language;
            }
            return schemaName;
        }

        // Date/Time Types
        if (dataType === 'date and time') {
            if (s.datetime && !schemaName.endsWith(s.datetime)) {
                return schemaName + s.datetime;
            }
            return schemaName;
        }

        if (dataType === 'date only') {
            if (s.dateonly && !schemaName.endsWith(s.dateonly)) {
                return schemaName + s.dateonly;
            }
            return schemaName;
        }

        if (dataType === 'duration') {
            if (s.duration && !schemaName.endsWith(s.duration)) {
                return schemaName + s.duration;
            }
            return schemaName;
        }

        if (dataType === 'timezone') {
            if (s.timezone && !schemaName.endsWith(s.timezone)) {
                return schemaName + s.timezone;
            }
            return schemaName;
        }

        // Text Types
        if (dataType === 'single line of text') {
            if (s.text && !schemaName.endsWith(s.text)) {
                return schemaName + s.text;
            }
            return schemaName;
        }

        if (dataType === 'text_area') {
            if (s.text_area && !schemaName.endsWith(s.text_area)) {
                return schemaName + s.text_area;
            }
            return schemaName;
        }

        if (dataType === 'text_richtext') {
            if (s.text_richtext && !schemaName.endsWith(s.text_richtext)) {
                return schemaName + s.text_richtext;
            }
            return schemaName;
        }

        if (dataType === 'multiline') {
            if (s.multiline && !schemaName.endsWith(s.multiline)) {
                return schemaName + s.multiline;
            }
            return schemaName;
        }

        if (dataType === 'multiline_richtext') {
            if (s.multiline_richtext && !schemaName.endsWith(s.multiline_richtext)) {
                return schemaName + s.multiline_richtext;
            }
            return schemaName;
        }

        if (dataType === 'autonumber') {
            if (s.autonumber && !schemaName.endsWith(s.autonumber)) {
                return schemaName + s.autonumber;
            }
            return schemaName;
        }

        if (dataType === 'email') {
            if (s.email && !schemaName.endsWith(s.email)) {
                return schemaName + s.email;
            }
            return schemaName;
        }

        if (dataType === 'phone') {
            if (s.phone && !schemaName.endsWith(s.phone)) {
                return schemaName + s.phone;
            }
            return schemaName;
        }

        if (dataType === 'url') {
            if (s.url && !schemaName.endsWith(s.url)) {
                return schemaName + s.url;
            }
            return schemaName;
        }

        if (dataType === 'ticker symbol') {
            if (s.ticker && !schemaName.endsWith(s.ticker)) {
                return schemaName + s.ticker;
            }
            return schemaName;
        }

        // File Types
        if (dataType === 'file') {
            if (s.file && !schemaName.endsWith(s.file)) {
                return schemaName + s.file;
            }
            return schemaName;
        }

        if (dataType === 'image') {
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
        const maxAttempts = 60;
        let envTitleEl = null;

        for (let i = 0; i < maxAttempts; i++) {
            envTitleEl = document.querySelector('div[data-test-id="EnvironmentTitle"]');
            if (envTitleEl) break;
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        if (!envTitleEl) {
            const bodyObserver = new MutationObserver((mutations, obs) => {
                const el = document.querySelector('div[data-test-id="EnvironmentTitle"]');
                if (el) {
                    obs.disconnect();
                    attachEnvironmentTitleObserver(el);
                }
            });

            bodyObserver.observe(document.body, { childList: true, subtree: true });
            return;
        }

        attachEnvironmentTitleObserver(envTitleEl);
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

    function getDataType() {
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
                        return 'text_area';
                    }
                    if (formatText === 'email') {
                        return 'email';
                    }
                    if (formatText === 'phone' || formatText === 'phone number') {
                        return 'phone';
                    }
                    if (formatText === 'url') {
                        return 'url';
                    }
                    if (formatText === 'ticker symbol') {
                        return 'ticker symbol';
                    }
                    if (formatText === 'rich text') {
                        return 'text_richtext';
                    }
                }
            }

            // If it's "Multiple lines of text", check the format dropdown
            if (text === 'multiple lines of text') {
                const formatValue = document.querySelector(SELECTORS.formatValue);
                if (formatValue) {
                    const formatText = formatValue.textContent.trim().toLowerCase();
                    if (formatText === 'rich text') {
                        return 'multiline_richtext';
                    }
                }
                return 'multiline';
            }

            // If it's "Whole number", check the format dropdown for specific formats
            if (text === 'whole number') {
                const formatValue = document.querySelector(SELECTORS.formatValue);
                if (formatValue) {
                    const formatText = formatValue.textContent.trim().toLowerCase();
                    if (formatText === 'duration') {
                        return 'duration';
                    }
                    if (formatText === 'language code' || formatText === 'language') {
                        return 'language';
                    }
                    if (formatText === 'time zone' || formatText === 'timezone') {
                        return 'timezone';
                    }
                }
                return 'whole number';
            }

            // If it's "Date and time", check the format dropdown
            if (text === 'date and time') {
                const formatValue = document.querySelector(SELECTORS.formatValue);
                if (formatValue) {
                    const formatText = formatValue.textContent.trim().toLowerCase();
                    if (formatText === 'date only') {
                        return 'date only';
                    }
                }
                return 'date and time';
            }

            return text;
        }

        return '';
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

    let currentNamingConvention = 'underscore_lowercase';

    // Use shared NamingUtils (loaded from naming-utils.js)
    function formatSchemaName(str) {
        if (!str) return '';
        return window.NamingUtils.formatSchemaName(str, currentNamingConvention);
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
        let schemaName = formatSchemaName(displayName);
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

        let schemaName = formatSchemaName(displayName);
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

            if (dataTypeButton && !dataTypeButton.hasAttribute('data-mf-listening')) {
                dataTypeButton.setAttribute('data-mf-listening', 'true');
                const labelObserver = new MutationObserver(() => setTimeout(updateSchemaName, 100));
                labelObserver.observe(dataTypeButton, { childList: true, subtree: true, characterData: true });
                dataTypeButton.addEventListener('click', () => setTimeout(updateSchemaName, 500));
            }

            if (behaviorButton && !behaviorButton.hasAttribute('data-mf-listening')) {
                behaviorButton.setAttribute('data-mf-listening', 'true');
                const behaviorObserver = new MutationObserver(() => setTimeout(updateSchemaName, 100));
                behaviorObserver.observe(behaviorButton, { childList: true, subtree: true, characterData: true });
                behaviorButton.addEventListener('click', () => setTimeout(updateSchemaName, 500));
            }

            // Listen to format dropdown (Email, Phone, URL, Ticker Symbol, Text Area, Rich Text, Duration, Language, Timezone)
            if (formatDropdown && !formatDropdown.hasAttribute('data-mf-listening')) {
                formatDropdown.setAttribute('data-mf-listening', 'true');
                const formatObserver = new MutationObserver(() => setTimeout(updateSchemaName, 100));
                formatObserver.observe(formatDropdown, { childList: true, subtree: true, characterData: true });
                formatDropdown.addEventListener('click', () => setTimeout(updateSchemaName, 500));
            }

            // Also listen to the format value element directly for changes
            const formatValueEl = document.querySelector(SELECTORS.formatValue);
            if (formatValueEl && !formatValueEl.hasAttribute('data-mf-listening')) {
                formatValueEl.setAttribute('data-mf-listening', 'true');
                const formatValueObserver = new MutationObserver(() => setTimeout(updateSchemaName, 100));
                formatValueObserver.observe(formatValueEl, { childList: true, subtree: true, characterData: true });
            }

            // Watch the parent container of format value for any DOM changes
            const formatContainer = document.querySelector('div[data-testid="columnFormat"]');
            if (formatContainer && !formatContainer.hasAttribute('data-mf-listening')) {
                formatContainer.setAttribute('data-mf-listening', 'true');
                const formatContainerObserver = new MutationObserver(() => setTimeout(updateSchemaName, 100));
                formatContainerObserver.observe(formatContainer, { childList: true, subtree: true, characterData: true });
            }

            const multipleChoicesCheckbox = document.querySelector('input[data-testid="multipleChoices"]');
            if (multipleChoicesCheckbox && !multipleChoicesCheckbox.hasAttribute('data-mf-listening')) {
                multipleChoicesCheckbox.setAttribute('data-mf-listening', 'true');
                multipleChoicesCheckbox.addEventListener('change', () => setTimeout(updateSchemaName, 50));
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
