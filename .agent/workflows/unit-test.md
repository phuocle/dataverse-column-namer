# Unit Test Workflow

Run naming convention unit tests to verify all functions work correctly.

// turbo-all

## Steps

1. Navigate to the repository root:
   ```
   cd c:\src\github\dataverse-column-namer
   ```

2. Run the naming convention tests:
   ```
   node DataverseColumnNamer.Test/naming-convention.test.js
   ```

3. Verify all tests pass (exit code 0)

## Test File Location

- `DataverseColumnNamer.Test/naming-convention.test.js`

## Test Format

Tests follow this format: `[convention, input, expectedOutput]`

```javascript
["underscore_lowercase", "Hello World", "hello_world"],
["pascalCase", "Hello World", "HelloWorld"],
```

## Conventions Tested

| Convention | Example Output |
|------------|----------------|
| `underscore_lowercase` | `hello_world` |
| `pascalCase` | `HelloWorld` |
| `camelCase` | `helloWorld` |
| `underscore_preserve` | `Hello_World` |
| `remove_spaces` | `HelloWorld` |

## Adding New Tests

Add new test cases to the `testCases` array in the test file:

```javascript
const testCases = [
    // Add your test case here:
    ["convention", "input", "expected"],
];
```
