// Shared configuration for Dataverse Column Namer Extension
// This file contains suffix definitions used by both content.js and popup.js

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
