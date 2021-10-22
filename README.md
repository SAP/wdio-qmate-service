# qmate service (WebdriverIO)
Qmate-service Is an easy-to-use UI and E2E test automation [custom service](https://webdriver.io/docs/customservices/) based on [Webdriver.io](https://webdriver.io/).
It provides helpful reuse methods for any web application to write scripts more easily.


## Quicklinks
[Migration Guide](./documentation/topics/migration.md) |
[Reuse API](./reuse/doc.md) |
[Business Object Reuse](https://github.wdf.sap.corp/sProcurement/vyperBusinessObjectReuse) |
[Samples](documentation/downloads/samples) |
[Spotlight - Chrome Extension](https://github.wdf.sap.corp/sProcurement/vyper-spotlight)


## Table Of Contents
- [Setup & Installation](./documentation/topics/setupAndInstallation.md)

- [Native Features](./documentation/topics/nativeFeatures.md)
  - [Frameworks](./documentation/topics/nativeFeatures.md#Frameworks)
  - [Compilers](./documentation/topics/nativeFeatures.md#Compilers)
  - [Reporter](./documentation/topics/nativeFeatures.md#Reporter)
  - [Assertion Libraries](./documentation/topics/nativeFeatures.md#Assertion_Libraries)
  - [Services](./documentation/topics/nativeFeatures.md#Services)

- [Custom Features](./documentation/topics/customFeatures.md)
  - [Reuse API](./documentation/topics/customFeatures#Reuse_API.md)
  - [Other Custom Services](./documentation/topics/customFeatures/#Other_Custom_Services)
  - [Migration Tools](./documentation/topics/customFeatures/#Migration_Tools_for_Vyper)
  
- [Best Practices](./documentation/topics/bestPractices.md)


- [Actions & Reuse](./documentation/topics/actionsAndReuse.md)
- [Data](./documentation/topics/data.md)
- [Data Exchange](./documentation/topics/dataImportExport.md)
- [Qmate UI5 Locators](./documentation/topics/locators.md)
- [Authentication](./documentation/topics/authentication.md)
- [Contribution](./documentation/topics/contribution.md)
- [OData](./documentation/topics/OData.md)  

## Why qmate service?
### Native wdio- and qmate common reuse API
*wdio-qmate-service* allows you to use all the native webdriver.io commands and features and
provides additionally access to qmate [Reuse API](./reuse/doc.md).

### Flexibility / Advanced Setup
Compared to [qmate](https://github.tools.sap/sProcurement/qmate) - which covers all related custom services like common reuse, reporting etc. out of the box, *wdio-qmate-service* provides you more flexibility to enable only the services and [features](#Native_Features) you require and is intended as more advanced setup. 


## Samples and tests

`qmate-service` can be integrated with wdio available frameworks/features:
- [Jasmine tests](documentation/downloads/samples/jasmineFramework)
- [Mocha tests](documentation/downloads/samples/mochaFramework)
- [Cucumber tests](documentation/downloads/samples/cucumberFramework)
- [Typescript tests](documentation/downloads/samples/typescriptSupport)
- [Sync tests](documentation/downloads/samples/syncSupport)
- [Selenium-standalone tests](documentation/downloads/samples/seleniumStandalone)


## Contact
### Georgios Treska
⌂ Walldorf - Germany\
✉ georgios.treska@sap.com

### Marvin Grüßinger
⌂ Walldorf - Germany\
✉ marvin.gruessinger@sap.com

### Benjamin Warth
⌂ Walldorf - Germany\
✉ benjamin.warth@sap.com