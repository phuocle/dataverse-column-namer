// Shared utility functions for Dataverse Column Namer extension

/**
 * Normalizes a string by replacing multiple spaces with a single space and trimming
 * @param {string} str - The string to normalize
 * @returns {string} The normalized string
 */
function normalizeString(str) {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
}
