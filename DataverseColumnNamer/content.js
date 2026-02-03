(function () {
    'use strict';
    const IS_DEBUG = true;
    const CONFIG = {
        activeClass: 'dcn-env-active'
    };
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    const DEBUG_SUFFIXES = {
        lookup: '__lookup',
        customer: '__customerid',
        choice: '__choice',
        choices: '__choices',
        yn: '__yn',
        calculated: '__calculated',
        rollup: '__rollup',
        formula: '__formula',
        currency: '__currency',
        wholenumber: '__wholenumber',
        decimal: '__decimal',
        float: '__float',
        language: '__language',
        datetime: '__datetime',
        dateonly: '__dateonly',
        duration: '__duration',
        timezone: '__timezone',
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
        file: '__file',
        image: '__image'
    };
    const PROD_SUFFIXES = {
        lookup: '_id',
        customer: '_customerid',
        choice: '_choice',
        choices: '_choices',
        yn: '_yn',
        calculated: '_calculated',
        rollup: '_rollup',
        formula: '_fx',
        currency: '',
        wholenumber: '',
        decimal: '',
        float: '',
        language: '',
        datetime: '',
        dateonly: '',
        duration: '',
        timezone: '',
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
        file: '',
        image: ''
    };
    const DEFAULT_SUFFIXES = IS_DEBUG ? DEBUG_SUFFIXES : PROD_SUFFIXES;
    let currentSuffixes = { ...DEFAULT_SUFFIXES };
    let isExtensionActive = false;
    const STORAGE_KEY = 'DataverseColumnNamer';
    async function loadSettings() {
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
        const dataType = getDataType();
        const behaviorType = getBehaviorType();
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
        if (dataType === 'formula') {
            if (s.formula && !schemaName.endsWith(s.formula)) {
                return schemaName + s.formula;
            }
            return schemaName;
        }
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
        dataTypeLabel: '#ColumnDataTypeFilterContextualMenu .ms-Button-label',
        behaviorButton: '#tooltipColumnBehavior',
        formatDropdown: '#ColumnForm_Format',
        formatValue: 'div[data-testid="columnFormat"] span',
        multipleChoicesCheckbox: 'input[data-testid="multipleChoices"]',
        environmentTitle: 'div[data-test-id="EnvironmentTitle"]',
        behaviorOption: '#tooltipColumnBehavior-option',
        headerText: 'h1[id$="-headerText"]',
        panelContainer: '#pagePanels-layer-id',
        badge: '.dcn-panel-badge',
        stack: '.ms-Stack'
    };
    function highlightEnvironmentButton() {
        const envTitle = document.querySelector(SELECTORS.environmentTitle);
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
        const envEl = document.querySelector(SELECTORS.environmentTitle);
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
            envTitleEl = document.querySelector(SELECTORS.environmentTitle);
            if (envTitleEl) break;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        if (!envTitleEl) {
            const bodyObserver = new MutationObserver((mutations, obs) => {
                const el = document.querySelector(SELECTORS.environmentTitle);
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
        const dataTypeLabel = document.querySelector(SELECTORS.dataTypeLabel);
        if (dataTypeLabel) {
            const text = dataTypeLabel.textContent.trim().toLowerCase();
            if (text === 'single line of text') {
                const formatValue = document.querySelector(SELECTORS.formatValue);
                if (formatValue) {
                    const formatText = formatValue.textContent.trim().toLowerCase();
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
        const behaviorOption = document.querySelector(SELECTORS.behaviorOption);
        if (behaviorOption) {
            return behaviorOption.textContent.trim().toLowerCase();
        }
        return '';
    }
    let currentNamingConvention = 'underscore_lowercase';
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
    function updateSchemaNameCore() {
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
    const updateSchemaName = debounce(updateSchemaNameCore, 300);
    function isNewColumnPanel() {
        const headerTitle = document.querySelector(SELECTORS.headerText);
        if (!headerTitle) return false;
        const headerText = normalizeString(headerTitle.textContent);
        return headerText === 'New column';
    }
    function setupSchemaNameOverride() {
        const observer = new MutationObserver((mutations) => {
            if (!isNewColumnPanel()) return;
            const displayInput = document.querySelector(SELECTORS.displayNameInput);
            const dataTypeLabel = document.querySelector(SELECTORS.dataTypeLabel);
            const dataTypeButton = dataTypeLabel ? dataTypeLabel.closest('button') : null;
            const behaviorButton = document.querySelector(SELECTORS.behaviorButton);
            const formatDropdown = document.querySelector(SELECTORS.formatDropdown);
            const multipleChoicesCheckbox = document.querySelector(SELECTORS.multipleChoicesCheckbox);
            if (displayInput && !displayInput.hasAttribute('data-mf-listening')) {
                displayInput.setAttribute('data-mf-listening', 'true');
                displayInput.addEventListener('input', handleDisplayNameChange);
                displayInput.addEventListener('change', handleDisplayNameChange);
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
            if (formatDropdown && !formatDropdown.hasAttribute('data-mf-listening')) {
                formatDropdown.setAttribute('data-mf-listening', 'true');
                const formatObserver = new MutationObserver(() => setTimeout(updateSchemaName, 100));
                formatObserver.observe(formatDropdown, { childList: true, subtree: true, characterData: true });
                formatDropdown.addEventListener('click', () => setTimeout(updateSchemaName, 500));
            }
            if (multipleChoicesCheckbox && !multipleChoicesCheckbox.hasAttribute('data-mf-listening')) {
                multipleChoicesCheckbox.setAttribute('data-mf-listening', 'true');
                multipleChoicesCheckbox.addEventListener('change', () => setTimeout(updateSchemaName, 50));
            }
            if (isExtensionActive) {
                injectPanelBadge();
            }
        });
        const panelContainer = document.querySelector(SELECTORS.panelContainer);
        if (panelContainer) {
            observer.observe(panelContainer, {
                childList: true,
                subtree: true
            });
        } else {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    function injectPanelBadge() {
        const existingBadge = document.querySelector(SELECTORS.badge);
        if (existingBadge) return;
        if (!isNewColumnPanel()) return;
        const headerTitle = document.querySelector(SELECTORS.headerText);
        if (headerTitle) {
            const headerStack = headerTitle.closest(SELECTORS.stack);
            if (headerStack && headerStack.parentElement) {
                const mainContentArea = headerStack.parentElement;
                if (mainContentArea.parentElement) {
                    const badge = document.createElement('div');
                    badge.className = IS_DEBUG ? 'dcn-panel-badge dcn-debug-mode' : 'dcn-panel-badge';
                    badge.innerHTML = IS_DEBUG ? 'YOU ARE IN DEBUG MODE' : 'Dataverse Column Namer Active';
                    mainContentArea.parentElement.insertBefore(badge, mainContentArea);
                }
            }
        }
    }
    init();
})();