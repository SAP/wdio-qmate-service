# Tech Context - wdio-qmate-service

## Technology Stack

### Core Technologies
- **Node.js**: Runtime environment (ES2021 target)
- **TypeScript**: Primary development language with strict type checking
- **WebDriverIO v8**: Core testing framework and ecosystem integration
- **JavaScript**: Legacy components and build scripts

### Build & Development Tools
- **TypeScript Compiler**: `tsc` with source map generation
- **ESLint**: Code linting with WebDriverIO plugin
- **Prettier**: Code formatting
- **Vitest**: Unit testing framework
- **Rimraf**: Cross-platform file cleanup
- **ts-node**: TypeScript execution for build scripts

### Documentation & Publishing
- **MkDocs**: Documentation site generation
- **JSDoc**: API documentation from source comments
- **Doctrine**: JSDoc parsing for documentation generation
- **jsdoc-to-markdown**: Markdown generation from JSDoc

### Testing Infrastructure
- **Mocha Framework**: Test runner integration with WebDriverIO
- **Appium**: Mobile testing support (iOS/Android)
- **Chromedriver**: Chrome browser automation
- **Sauce Labs**: Cloud testing integration
- **Static Server**: Local development server for testing

## Dependencies Architecture

### Production Dependencies
```json
{
  "@sap_oss/odata-library": "^2.5.0",    // SAP OData integration
  "axios": "^1.11.0",                     // HTTP client
  "deepmerge": "^4.3.1",                 // Configuration merging
  "fs-extra": "^11.3.1",                 // Enhanced file operations
  "node-localstorage": "^3.0.5",         // Browser storage simulation
  "pdf-parse": "^1.1.1",                 // PDF file processing
  "qcrypt": "file:packages/qcrypt",       // Internal encryption package
  "query-string": "^9.2.2",              // URL query parsing
  "sha.js": "^2.4.12",                    // Cryptographic hashing
  "supertest": "^7.1.4",                 // HTTP testing utilities
  "undici": "^7.15.0",                   // Modern HTTP client
  "xlsx": "^0.18.5",                     // Excel file processing
  "xml2js": "^0.6.2",                    // XML parsing
  "yargs": "^17.1.1"                     // Command-line argument parsing
}
```

### Development Dependencies
```json
{
  "@wdio/cli": "^8.46.0",                // WebDriverIO CLI
  "@wdio/local-runner": "^8.46.0",       // Local test execution
  "@wdio/mocha-framework": "^8.46.0",    // Mocha integration
  "@wdio/spec-reporter": "^8.43.0",      // Test reporting
  "appium": "^3.0.0",                    // Mobile automation server
  "chromedriver": "^120.0.2",            // Chrome browser driver
  "typescript": "^5.9.2"                 // TypeScript compiler
}
```

## Development Setup

### Build Configuration
```json
// tsconfig.json highlights
{
  "compilerOptions": {
    "target": "es2021",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./lib",
    "declaration": true,
    "sourceMap": true,
    "strict": true
  }
}
```

### Key Build Commands
```bash
npm run build          # TypeScript compilation
npm run build:dev      # Watch mode compilation  
npm run build:locator  # Locator build step
npm run generate-docs  # Documentation generation
npm run lint           # Code linting
npm run prettier       # Code formatting
```

## Technical Constraints

### Runtime Requirements
- **Node.js**: Compatible with current LTS versions
- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Mobile Platforms**: iOS, Android (via Appium)
- **Operating Systems**: Windows, macOS, Linux

### Integration Constraints
- **WebDriverIO Ecosystem**: Must maintain compatibility with WebDriverIO v8.x
- **SAP Technologies**: Deep integration with UI5 framework requirements
- **Enterprise Environment**: Authentication and security constraints

### Performance Considerations
- **Memory Usage**: Global namespace injection requires careful memory management
- **Startup Time**: Service initialization must not significantly impact test startup
- **Parallel Execution**: Must support WebDriverIO's parallel test execution

## Tool Usage Patterns

### TypeScript Configuration
- **Strict Mode**: All strict type checking enabled
- **Source Maps**: Debugging support in compiled output
- **Declaration Files**: Type definitions generated for consumers
- **JSON Module Support**: Configuration files as TypeScript modules

### Testing Strategy
- **Multi-Level Testing**: Unit, integration, and functional tests
- **Browser Testing**: Real browser automation for validation
- **Mobile Testing**: Appium integration for mobile scenarios
- **API Testing**: REST and OData service validation

### Documentation Approach
- **Source-Driven**: Documentation generated from JSDoc comments
- **Multi-Format**: Markdown, HTML, and JSON documentation outputs
- **Live Examples**: Working code examples in documentation
- **Type Integration**: TypeScript types included in documentation

## Architecture Decisions

### Module System Choice
- **CommonJS**: Selected for WebDriverIO ecosystem compatibility
- **ES2021 Target**: Modern JavaScript features while maintaining compatibility
- **Global Injection**: Eliminates import complexity for end users

### Build Strategy
- **Source to Lib**: Clear separation between source and distribution
- **Type Generation**: Automatic TypeScript definition generation
- **Multi-Stage Build**: Locator build → TypeScript compilation → Documentation

### Testing Philosophy
- **Real Environment Testing**: Tests run against actual browsers and services
- **Configuration-Driven**: Test behavior controlled through WebDriverIO config
- **Comprehensive Coverage**: All public APIs tested across multiple scenarios

## Integration Points

### WebDriverIO Integration
- **Service API**: Implements complete WebDriverIO service interface
- **Hook System**: Proper integration with all WebDriverIO lifecycle hooks
- **Configuration**: Extends WebDriverIO configuration with service-specific options
- **Reporter Integration**: Compatible with all WebDriverIO reporters

### SAP Ecosystem Integration
- **UI5 Framework**: Deep integration with SAP UI5 control library
- **OData Services**: Native support for SAP OData protocol
- **Fiori Patterns**: Built-in support for SAP Fiori design patterns
- **Authentication**: Enterprise SAP authentication mechanisms

### External Tool Integration
- **Appium**: Mobile testing platform integration
- **MkDocs**: Documentation site generation
- **CI/CD**: GitHub Actions and general CI/CD pipeline support
- **IDE Support**: Full TypeScript integration with IntelliSense

This technical context provides the foundation for understanding the development environment, constraints, and integration requirements that shape all implementation decisions.
