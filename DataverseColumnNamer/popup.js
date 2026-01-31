const STORAGE_KEY = 'DataverseColumnNamer';

// Set to true for debugging - all suffixes become __[type] pattern
const IS_DEBUG = true;

// Valid naming convention options
const VALID_NAMING_CONVENTIONS = [
    'underscore_lowercase',
    'underscore_preserve',
    'pascalCase',
    'camelCase',
    'remove_spaces'
];

// Valid suffix keys
const VALID_SUFFIX_KEYS = [
    'lookup', 'customer',
    'choice', 'choices', 'yn',
    'calculated', 'rollup', 'formula',
    'currency', 'wholenumber', 'decimal', 'float', 'language',
    'datetime', 'dateonly', 'duration', 'timezone',
    'text', 'text_area', 'text_richtext', 'multiline', 'multiline_richtext',
    'autonumber', 'email', 'phone', 'url', 'ticker',
    'file', 'image'
];

const currentEnvEl = document.getElementById('currentEnv');
const statusSection = document.getElementById('statusSection');
const statusText = document.getElementById('statusText');
const targetEnvInput = document.getElementById('targetEnv');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const resetBtn = document.getElementById('resetBtn');
const useCurrentBtn = document.getElementById('useCurrentBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const messageEl = document.getElementById('message');
const namingConventionSelect = document.getElementById('namingConvention');

const suffixInputs = {
    // Relationship Types
    lookup: document.getElementById('suffixLookup'),
    customer: document.getElementById('suffixCustomer'),
    // Choice Types
    choice: document.getElementById('suffixChoice'),
    choices: document.getElementById('suffixChoices'),
    yn: document.getElementById('suffixYesNo'),
    // Computed Types
    calculated: document.getElementById('suffixCalculated'),
    rollup: document.getElementById('suffixRollup'),
    formula: document.getElementById('suffixFormula'),
    // Number Types
    currency: document.getElementById('suffixCurrency'),
    wholenumber: document.getElementById('suffixWholeNumber'),
    decimal: document.getElementById('suffixDecimal'),
    float: document.getElementById('suffixFloat'),
    language: document.getElementById('suffixLanguage'),
    // Date/Time Types
    datetime: document.getElementById('suffixDateTime'),
    dateonly: document.getElementById('suffixDateOnly'),
    duration: document.getElementById('suffixDuration'),
    timezone: document.getElementById('suffixTimezone'),
    // Text Types
    text: document.getElementById('suffixText'),
    text_area: document.getElementById('suffixTextArea'),
    text_richtext: document.getElementById('suffixTextRichText'),
    multiline: document.getElementById('suffixMultiline'),
    multiline_richtext: document.getElementById('suffixMultilineRichText'),
    autonumber: document.getElementById('suffixAutoNumber'),
    email: document.getElementById('suffixEmail'),
    phone: document.getElementById('suffixPhone'),
    url: document.getElementById('suffixUrl'),
    ticker: document.getElementById('suffixTicker'),
    // File Types
    file: document.getElementById('suffixFile'),
    image: document.getElementById('suffixImage')
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

function normalizeString(str) {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
}

let currentEnvironment = null;

async function getCurrentEnvironment() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab || !tab.url.startsWith('https://make.powerapps.com')) {
            currentEnvEl.textContent = 'Not on PowerApps page';
            return null;
        }

        // Request environment name from content script
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'getEnvironment' });
        
        const envName = response?.environment;
        currentEnvEl.textContent = envName || 'Could not detect';
        currentEnvironment = envName;
        return envName;
    } catch (error) {
        console.error('Error getting environment:', error);
        currentEnvEl.textContent = 'Error detecting';
        return null;
    }
}

async function loadConfig() {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    const config = result[STORAGE_KEY] || {};

    const targetEnv = config.TargetEnvironment || '';
    const namingConvention = config.NamingConvention || 'underscore_lowercase';
    const storedSuffixes = config.Suffixes || {};

    targetEnvInput.value = targetEnv;
    namingConventionSelect.value = namingConvention;

    for (const [key, input] of Object.entries(suffixInputs)) {
        input.value = storedSuffixes[key] || '';
        input.placeholder = DEFAULT_SUFFIXES[key];
    }

    return targetEnv;
}

async function saveConfig() {
    const targetEnv = normalizeString(targetEnvInput.value);
    const namingConvention = namingConventionSelect.value;

    const suffixesToSave = {};
    for (const [key, input] of Object.entries(suffixInputs)) {
        const val = input.value.trim();
        if (val) {
            suffixesToSave[key] = val;
        }
    }

    const config = {
        TargetEnvironment: targetEnv,
        NamingConvention: namingConvention,
        Suffixes: suffixesToSave
    };

    await chrome.storage.local.set({ [STORAGE_KEY]: config });

    showMessage('Configuration saved!');
    updateStatus(currentEnvironment, targetEnv);
}

async function clearConfig() {
    await chrome.storage.local.remove(STORAGE_KEY);
    targetEnvInput.value = '';
    namingConventionSelect.value = 'underscore_lowercase';

    for (const input of Object.values(suffixInputs)) {
        input.value = '';
    }

    showMessage('Configuration cleared. Extension is now DISABLED.');
    updateStatus(currentEnvironment, '');
}

async function resetConfig() {
    namingConventionSelect.value = 'underscore_lowercase';

    for (const [key, input] of Object.entries(suffixInputs)) {
        input.value = DEFAULT_SUFFIXES[key];
    }

    await saveConfig();
    showMessage('Defaults restored and saved!');
}

function useCurrentEnv() {
    if (!currentEnvironment) {
        showMessage('No current environment detected');
        return;
    }

    targetEnvInput.value = currentEnvironment;
    showMessage('Current environment copied!');
}

function updateStatus(currentEnv, targetEnv) {
    // Show debug mode warning instead of normal status
    if (IS_DEBUG) {
        statusSection.className = 'status-badge debug-mode';
        statusText.textContent = 'YOU ARE IN DEBUG MODE';
        useCurrentBtn.disabled = true;
        useCurrentBtn.title = 'Debug mode active';
        return;
    }

    const normalizedCurrent = normalizeString(currentEnv);
    const normalizedTarget = normalizeString(targetEnv);

    if (!normalizedTarget) {
        statusSection.className = 'status-badge inactive';
        statusText.textContent = 'Disabled (no environment configured)';
        useCurrentBtn.disabled = false;
        useCurrentBtn.title = 'Use current environment';
    } else if (normalizedCurrent === normalizedTarget) {
        statusSection.className = 'status-badge active';
        statusText.textContent = 'Active (environment matched)';
        useCurrentBtn.disabled = true;
        useCurrentBtn.title = 'Current environment already selected';
    } else {
        statusSection.className = 'status-badge inactive';
        statusText.textContent = 'Inactive (environment mismatch)';
        useCurrentBtn.disabled = false;
        useCurrentBtn.title = 'Use current environment';
    }
}

function showMessage(msg) {
    messageEl.textContent = msg;
    setTimeout(() => {
        messageEl.textContent = '';
    }, 2000);
}

async function init() {
    const [currentEnv, targetEnv] = await Promise.all([
        getCurrentEnvironment(),
        loadConfig()
    ]);
    updateStatus(currentEnv, targetEnv);

    // Disable suffix inputs when in debug mode
    if (IS_DEBUG) {
        for (const input of Object.values(suffixInputs)) {
            input.disabled = true;
            input.title = 'Debug mode: suffixes are locked to __[type] pattern';
        }
        resetBtn.disabled = true;
        resetBtn.title = 'Debug mode: reset is disabled';
    }
}

saveBtn.addEventListener('click', saveConfig);
clearBtn.addEventListener('click', clearConfig);
resetBtn.addEventListener('click', resetConfig);
useCurrentBtn.addEventListener('click', useCurrentEnv);
exportBtn.addEventListener('click', exportConfig);
importBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', importConfig);

function exportConfig() {
    const config = {
        NamingConvention: namingConventionSelect.value,
        Suffixes: {}
    };

    // Export actual values being used (from input value or DEFAULT_SUFFIXES)
    for (const [key, input] of Object.entries(suffixInputs)) {
        const val = input.value.trim();
        if (val) {
            config.Suffixes[key] = val;
        } else if (DEFAULT_SUFFIXES[key]) {
            // If input is empty, use default suffix
            config.Suffixes[key] = DEFAULT_SUFFIXES[key];
        }
    }

    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataverse-column-namer-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('Configuration exported!');
}

function importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const config = JSON.parse(e.target.result);

            // Validate config is an object
            if (!config || typeof config !== 'object' || Array.isArray(config)) {
                showMessage('Error: Invalid config format');
                return;
            }

            // Protect against prototype pollution
            if ('__proto__' in config || 'constructor' in config || 'prototype' in config) {
                showMessage('Error: Invalid config - contains forbidden keys');
                return;
            }

            // Validate and apply naming convention
            if (config.NamingConvention) {
                if (!VALID_NAMING_CONVENTIONS.includes(config.NamingConvention)) {
                    showMessage('Error: Invalid naming convention');
                    return;
                }
                namingConventionSelect.value = config.NamingConvention;
            }

            // Validate and apply suffixes
            if (config.Suffixes) {
                if (typeof config.Suffixes !== 'object' || Array.isArray(config.Suffixes)) {
                    showMessage('Error: Invalid suffixes format');
                    return;
                }

                // Protect against prototype pollution in Suffixes
                if ('__proto__' in config.Suffixes || 'constructor' in config.Suffixes || 'prototype' in config.Suffixes) {
                    showMessage('Error: Invalid suffixes - contains forbidden keys');
                    return;
                }

                for (const [key, value] of Object.entries(config.Suffixes)) {
                    // Validate key is in the expected list
                    if (!VALID_SUFFIX_KEYS.includes(key)) {
                        showMessage(`Error: Invalid suffix key: ${key}`);
                        return;
                    }

                    // Validate value is a safe string
                    if (typeof value !== 'string') {
                        showMessage(`Error: Suffix value must be a string for key: ${key}`);
                        return;
                    }

                    // Validate string doesn't contain potentially dangerous content
                    // Check for HTML tags, javascript:, data: URLs, and common XSS patterns
                    const dangerousPatterns = [
                        /<[^>]*>/g,              // HTML tags
                        /javascript:/gi,          // javascript: URLs
                        /data:/gi,                // data: URLs
                        /on\w+\s*=/gi,           // Event handlers like onclick=
                        /&#/g,                    // HTML entities
                        /&\w+;/g                  // Named entities
                    ];
                    
                    if (dangerousPatterns.some(pattern => pattern.test(value))) {
                        showMessage(`Error: Suffix value contains invalid characters for key: ${key}`);
                        return;
                    }

                    // Apply the validated suffix
                    if (suffixInputs[key]) {
                        suffixInputs[key].value = value;
                    }
                }
            }

            showMessage('Configuration imported! Click Save to apply.');
        } catch (error) {
            showMessage('Error: Invalid config file');
        }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = '';
}

init();
