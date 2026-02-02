const namingUtils = require('../DataverseColumnNamer/naming-utils.js');
const { formatSchemaName } = namingUtils;

const testCases = [
    // format: [convention, input, expected]

    // ==========================================
    // 1. UNDERSCORE_LOWERCASE (Default)
    // ==========================================
    // Basic
    ["underscore_lowercase", "Hello World", "hello_world"],
    ["underscore_lowercase", "Customer ID", "customer_id"],
    ["underscore_lowercase", "First Name", "first_name"],

    // Numbers
    ["underscore_lowercase", "Address 1", "address_1"],
    ["underscore_lowercase", "2nd Phone", "2nd_phone"],
    ["underscore_lowercase", "Year 2024", "year_2024"],

    // Edge Cases: Whitespace
    ["underscore_lowercase", "  Leading Space", "leading_space"],
    ["underscore_lowercase", "Trailing Space  ", "trailing_space"],
    ["underscore_lowercase", "   Multiple   Spaces   ", "multiple_spaces"],

    // Edge Cases: Special Characters (Should be replaced/removed)
    ["underscore_lowercase", "Price ($)", "price"],
    ["underscore_lowercase", "User@Email.com", "user_email_com"],
    ["underscore_lowercase", "#Hashtag", "hashtag"],
    ["underscore_lowercase", "Start & End", "start_end"],
    ["underscore_lowercase", "100%", "100"],
    ["underscore_lowercase", "A/B Testing", "a_b_testing"],
    ["underscore_lowercase", "Name (First/Last)", "name_first_last"],
    ["underscore_lowercase", "Hello-World_Test", "hello_world_test"], // Hyphens/Underscores treat as separators

    // Edge Cases: Complex Mixed
    ["underscore_lowercase", "  @#$  Complex   Case  *** ", "complex_case"],
    ["underscore_lowercase", "foo__bar--baz", "foo_bar_baz"],
    ["underscore_lowercase", "123 Go!", "123_go"],
    ["underscore_lowercase", "!@#$%^&*()_+", ""], // All special chars -> empty string

    // ==========================================
    // 2. UNDERSCORE_PRESERVE
    // ==========================================
    // Basic
    ["underscore_preserve", "Hello World", "Hello_World"],
    ["underscore_preserve", "Customer ID", "Customer_ID"],

    // Edge Cases
    ["underscore_preserve", "  Hello   World  ", "Hello_World"],
    ["underscore_preserve", "IP Address", "IP_Address"],
    ["underscore_preserve", "iOS Version", "iOS_Version"], // Case preservation
    ["underscore_preserve", "eCommerce Site", "eCommerce_Site"],
    ["underscore_preserve", "Price ($)", "Price"],
    ["underscore_preserve", "User-Name", "User_Name"],
    ["underscore_preserve", "  @  Data  !  ", "Data"],

    // ==========================================
    // 3. PASCALCASE
    // ==========================================
    // Basic
    ["pascalCase", "Hello World", "HelloWorld"],
    ["pascalCase", "customer name", "CustomerName"],

    // Edge Cases
    ["pascalCase", "  hello   world  ", "HelloWorld"],
    ["pascalCase", "date_of_birth", "DateOfBirth"],
    ["pascalCase", "new-customer-id", "NewCustomerId"],
    ["pascalCase", "HTML Parser", "HtmlParser"], // HTML -> Html (standard capitalization logic in utils?)
    // Checking utils: toPascalCase: w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    // So "HTML" -> "Html". "iOS" -> "Ios".
    ["pascalCase", "iOS App", "IosApp"],
    ["pascalCase", "iPhone 15", "Iphone15"],
    ["pascalCase", "123 Start", "123Start"],
    ["pascalCase", "Start 123", "Start123"],
    ["pascalCase", "$$$ Money", "Money"],
    ["pascalCase", "  multiple   spaces   @here ", "MultipleSpacesHere"],

    // ==========================================
    // 4. CAMELCASE
    // ==========================================
    // Basic
    ["camelCase", "Hello World", "helloWorld"],
    ["camelCase", "Customer ID", "customerId"],

    // Edge Cases
    ["camelCase", "  Start   Process  ", "startProcess"],
    ["camelCase", "API Key", "apiKey"],
    ["camelCase", "User_Email_Address", "userEmailAddress"],
    ["camelCase", "Submit-Request-Now", "submitRequestNow"],
    ["camelCase", "1st Place", "1stPlace"],
    ["camelCase", "Go 2 Sleep", "go2Sleep"],
    ["camelCase", "Mixed $ Characters !", "mixedCharacters"],

    // ==========================================
    // 5. REMOVE_SPACES (Expected: lowercase + no spaces)
    // ==========================================
    // Basic
    ["remove_spaces", "Hello World", "helloworld"],
    ["remove_spaces", "Customer ID", "customerid"],

    // Edge Cases
    ["remove_spaces", "  Hello   World  ", "helloworld"],
    ["remove_spaces", "Price ($)", "price"],
    ["remove_spaces", "First_Name", "firstname"],
    ["remove_spaces", "Up & Down", "updown"],
    ["remove_spaces", "A B C D", "abcd"],
    ["remove_spaces", "1 2 3 4", "1234"],
    ["remove_spaces", "Special !!! Chars", "specialchars"],
    ["remove_spaces", " Mixed--__--Separators ", "mixedseparators"],
    ["remove_spaces", "UPPER CASE", "uppercase"],
];

let failed = 0;
let passed = 0;

console.log("Running EXTENDED naming convention tests...\n");

testCases.forEach(([convention, input, expected], index) => {
    const actual = formatSchemaName(input, convention);
    if (actual === expected) {
        // console.log(`✓ Test ${index + 1} Passed`);
        passed++;
    } else {
        console.error(`✗ Test ${index + 1} Failed: [${convention}] "${input}"`);
        console.error(`  Expected: "${expected}"`);
        console.error(`  Actual:   "${actual}"`);
        failed++;
    }
});

console.log(`\nTests Completed.`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
