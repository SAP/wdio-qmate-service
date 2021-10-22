# Setup and installation

## Prerequisites
Make sure you have installed [Node.js](https://nodejs.org/en/download/) on your computer. If you already have Node.js installed, make sure you upgrade to version 12.

## Installation
To install the latest version of `Qmate` globally, you need to open the commandline and enter the following command in you console:
```bash
// Npm configuration for internal nexus
npm config set strict-ssl=false
npm config set registry=http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones.npm/
npm config set no-proxy=nexus.wdf.sap.corp

npm install sproc-qmate@latest -g
qmate chromedriver-upgrade
```
The `NPM` internal configuration is a one time setup, needed so the npm request reach our internal nexus, where all the SAP NPM projects resides (including `qmate`).

### Installing specific version

```bash
npm install sproc-qmate@1.0.1 -g
qmate chromedriver-upgrade
```

## Configure Chromedriver
To be able to execute your test directly with Chrome, you need to install latest chromedriver version. You can achieve that using our CLI command:
```bash
qmate chromedriver-update
```

## Qmate CLI
After setting up the driver and qmate, you can execute your tests using our cli.

```bash
qmate mytests.conf.js
```

Qmate CLI encapsulates and extends the [Webdriver.io CLI](https://www.npmjs.com/package/@wdio/cli). So all the WDIO cli options can be used directly too. See [here](https://webdriver.io/docs/clioptions.html) for more details. Example:

```bash
qmate config  // Normally you would type 'npx wdio config'
```


## Spotlight (Chrome Extension)
To write tests for any UI5 or non UI5 application, we provide a helpful Chrome Extension to generate the selector of an element.
You can find more details under [Spotlight](https://github.wdf.sap.corp/sProcurement/vyper-spotlight). To install it, please follow the steps below.

- **Step 1:** Download the [Repository](https://github.wdf.sap.corp/sProcurement/vyper-spotlight) to your local system and extract the zip file.

- **Step 2:** Open the Chrome browser and go to [Extensions](chrome://extensions/).

- **Step 3:** Make sure you enabled the "Developer Mode".

- **Step 4:** Drag and drop the folder *ChromeExtension* to install it.

## Editor
To write your scripts, you can use any editor of your choice.
- We recommend to use [Visual Studio Code](https://code.visualstudio.com/) to write your scripts.