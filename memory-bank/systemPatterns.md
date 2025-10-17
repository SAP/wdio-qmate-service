# System Patterns - wdio-qmate-service

## Architecture Overview

### Core Service Pattern
The system implements the **WebDriverIO Service Pattern** with complete lifecycle integration:

```javascript
// Main service class (src/index.ts)
class CustomWorkerService {
  async onPrepare(config, capabilities) { /* Pre-execution setup */ }
  async beforeSession(config, capabilities, specs) { /* Session initialization */ }
  async before(capabilities, specs, browser) { /* Test setup */ }
  async after(result, capabilities, specs) { /* Test cleanup */ }
  async onComplete(exitCode, config, capabilities, results) { /* Final reporting */ }
}
```

### Global Namespace Injection Pattern
**Core Pattern**: Global object injection for clean API without imports

```javascript
// Reuse library (src/reuse/index.ts) injects globals
global.ui5 = { assertion, control, element, ... };
global.nonUi5 = { assertion, element, navigation, ... };
global.mobile = { element, userInteraction, gestures, ... };
global.service = { odata, rest };
global.util = { browser, console, data, file, ... };
global.common = { assertion, date, navigation, ... };
global.flp = { userSettings, userLocks };
```

**Benefits**:
- No import statements needed in test files
- Intuitive API discovery through namespaces
- Consistent interface across domains

## Key Architectural Decisions

### 1. Modular Domain Organization
**Pattern**: Domain-driven module separation

```
src/reuse/modules/
├── ui5/          # SAP UI5 specific functionality
├── nonUi5/       # Generic web testing
├── mobile/       # Mobile testing (iOS/Android)
├── service/      # API testing (REST/OData)
├── common/       # Cross-cutting concerns
├── util/         # Utility functions  
└── flp/          # Fiori Launchpad specific
```

**Design Principle**: Each domain is self-contained with clear boundaries

### 2. Authentication Abstraction Layer
**Pattern**: Strategy pattern for multiple authentication mechanisms

```javascript
// Authentication types (src/reuse/authenticator/)
├── basicUrlAuthenticator.js    # HTTP Basic auth
├── formAuthenticator.js        # Form-based login
├── customAuthenticator.js      # Custom implementation
└── plainAuthenticator.js       # No authentication
```

**Key Design**: Configuration-driven authentication selection

### 3. Hook-Based Lifecycle Management
**Pattern**: WebDriverIO hook integration for proper lifecycle management

```javascript
// Hooks (src/scripts/hooks/)
├── onPrepare.ts       # Pre-execution setup
├── beforeSession.ts   # Session initialization  
├── before.ts          # Test environment setup
├── after.ts           # Test cleanup
└── onComplete.ts      # Final reporting
```

## Critical Implementation Patterns

### 1. Global API Surface Design
**Namespace Structure**:
```javascript
// Domain-specific namespaces
ui5.{module}.{function}        // ui5.assertion.expectToBeVisible()
nonUi5.{module}.{function}     // nonUi5.navigation.navigateToUrl()
mobile.{module}.{function}     // mobile.userInteraction.tap()
service.{protocol}.{function}  // service.odata.get()
util.{utility}.{function}      // util.browser.refresh()
common.{module}.{function}     // common.assertion.expectEqual()
```

**Consistency Rules**:
- All async functions return Promises
- Similar parameter patterns across modules
- Consistent error handling and reporting

### 2. TypeScript Integration Pattern
**Full TypeScript Implementation**:
```javascript
// Type definitions (@types/)
├── index.d.ts          # Main type definitions
├── locatorTypes.d.ts   # Locator-specific types
└── wdio.d.ts          # WebDriverIO extensions
```

**Build Process**:
- TypeScript compilation: `src/` → `lib/`
- Source map generation for debugging
- Type definition generation for consumers

### 3. Configuration-Driven Behavior
**Pattern**: WebDriverIO config drives all behavior

```javascript
// Example configuration
exports.config = {
  services: [['@sap_oss/wdio-qmate-service', serviceOptions]],
  // Authentication handled via config
  // Behavior customization through serviceOptions
}
```

## Component Relationships

### 1. Service → Reuse Library → Modules
```
CustomWorkerService (main service)
  ↓ (hooks)
ReuseLibrary.load() (global injection)
  ↓ (imports)
Domain Modules (ui5, nonUi5, mobile, etc.)
  ↓ (uses)
Helper Libraries (authentication, utilities)
```

### 2. Authentication Flow
```
WebDriverIO Config
  ↓ (specifies auth type)
AuthHandler (src/reuse/authenticator/)
  ↓ (selects strategy)
Specific Authenticator
  ↓ (handles login)
Browser Session (authenticated)
```

### 3. Test Execution Flow
```
onPrepare Hook
  ↓ (stats setup)
beforeSession Hook  
  ↓ (config setup)
before Hook
  ↓ (global injection)
Test Execution (with global APIs)
  ↓ (cleanup)
after Hook → onComplete Hook
```

## Design Patterns in Use

### 1. Service Locator Pattern
Global namespace acts as service locator for all testing functionality

### 2. Strategy Pattern
Authentication system uses strategy pattern for different auth mechanisms

### 3. Hook Template Pattern  
WebDriverIO hooks provide template for lifecycle management

### 4. Module Pattern
Each domain module encapsulates related functionality

### 5. Factory Pattern
Browser and session management through WebDriverIO factories

## Critical Implementation Paths

### 1. Service Initialization
`src/index.ts` → `src/scripts/hooks/before.ts` → `src/reuse/index.ts` → Global injection

### 2. Authentication Flow
Config → `src/reuse/authenticator/authHandler.ts` → Specific authenticator → Session setup

### 3. Test Function Execution
Global API call → Domain module → Helper functions → WebDriverIO commands

### 4. Documentation Generation
JSDoc comments → `src/reuse/helper/jsDocGen.js` → MkDocs documentation

This system architecture provides a robust, extensible foundation for comprehensive testing across multiple domains while maintaining clean APIs and proper separation of concerns.
