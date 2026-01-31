/**
 * Naming Convention Utility Functions
 * Shared between content.js (browser) and unit tests (Node.js)
 */

(function (exports) {
    'use strict';

    // Normalize input: replace special characters with spaces, then trim
    function normalizeInput(input) {
        if (!input) return '';
        // Replace any non-alphanumeric characters (except spaces) with space
        // This treats &&&, @@@, --- etc. as word separators
        return input.trim().replace(/[^a-zA-Z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function toPascalCase(input) {
        if (!input) return '';
        const normalized = normalizeInput(input);
        const words = normalized.split(/\s+/);
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
        const normalized = normalizeInput(input);
        return normalized.toLowerCase().replace(/\s+/g, '_');
    }

    function toUnderscorePreserve(input) {
        if (!input) return '';
        const normalized = normalizeInput(input);
        return normalized.replace(/\s+/g, '_');
    }

    function toRemoveSpaces(input) {
        if (!input) return '';
        const normalized = normalizeInput(input);
        // Remove spaces, preserve case
        return normalized.replace(/\s+/g, '');
    }

    function applyNamingConvention(str, convention) {
        if (!str) return '';

        switch (convention) {
            case 'underscore_preserve':
                return toUnderscorePreserve(str);
            case 'pascalCase':
                return toPascalCase(str);
            case 'camelCase':
                return toCamelCase(str);
            case 'remove_spaces':
                return toRemoveSpaces(str);
            case 'underscore_lowercase':
            default:
                return toUnderscoreLowercase(str);
        }
    }

    function formatSchemaName(str, convention) {
        if (!str) return '';
        let result = applyNamingConvention(str, convention);
        // Final cleanup: remove any remaining non-alphanumeric (except underscore)
        result = result.replace(/[^a-zA-Z0-9_]/g, '');
        return result;
    }

    // Export functions
    exports.normalizeInput = normalizeInput;
    exports.toPascalCase = toPascalCase;
    exports.toCamelCase = toCamelCase;
    exports.toUnderscoreLowercase = toUnderscoreLowercase;
    exports.toUnderscorePreserve = toUnderscorePreserve;
    exports.toRemoveSpaces = toRemoveSpaces;
    exports.applyNamingConvention = applyNamingConvention;
    exports.formatSchemaName = formatSchemaName;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.NamingUtils = {}));
