# Setup and installation

## Prerequisites
Make sure [Node.js](https://nodejs.org/en/download/) is installed on your computer. If you already have Node.js installed, make sure you upgrade to version ≥ 12.

## Installation
To install the latest version of `qmate-service`, open the commandline and install Qmate-Service as a dev-dependency to your repository.
```bash
npm config set strict-ssl=false
npm config set registry=https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/

npm install @wdio/qmate-service@latest --save-dev
```  

!!! info
    The `NPM` internal configuration is a one time setup, needed so the npm request reach our internal nexus, where all the SAP NPM projects resides (including `qmate-service`).

### Installing specific version

```bash
npm install @wdio/qmate-service@1.0.0 --save-dev
```

## Execute specs using npx

```bash
npx wdio mytests.conf.js
```
