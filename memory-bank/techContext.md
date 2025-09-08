# Technical Context: Qmate Service

## Core Technologies
- **Language:** TypeScript
- **Framework:** WebdriverIO
- **Package Manager:** npm

## Key Dependencies
- `@sap_oss/odata-library`: For OData interactions.
- `axios`: For making HTTP requests.
- `webdriverio`: Core testing framework.
- `typescript`: For static typing.
- `appium`: For mobile testing.

## Development & Build Scripts
- `build`: Compiles TypeScript to JavaScript.
- `lint`: Lints the codebase using ESLint.
- `test`: Runs a comprehensive suite of tests, including unit and integration tests.
- `generate-docs`: Generates documentation.
- `serve-docs`: Serves the documentation locally.
- `deploy-docs`: Deploys the documentation to GitHub Pages.

## Testing
The project has an extensive set of tests organized into different categories:
- **Unit Tests:** Using `vitest`.
- **Authenticator Tests:** For different login mechanisms.
- **Core Functional Tests:** Covering various features like data exchange, locators, and native browser interactions.
- **Reuse Library Tests:** For reusable components and utilities.
