# Setup and installation

## Prerequisites
Make sure you have installed [Node.js](https://nodejs.org/en/download/) on your computer. If you already have Node.js installed, make sure you upgrade to version ≥ 12.

## Installation
To install the latest version of `wdio-qmate-service`, open the commandline and install Qmate-Service as a dev-dependency to your repository.
```bash
// Npm configuration for internal nexus
npm config set strict-ssl=false
npm config set registry=http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones.npm/
npm config set no-proxy=nexus.wdf.sap.corp

npm install @wdio/qmate-service@latest --save-dev
```
The `NPM` internal configuration is a one time setup, needed so the npm request reach our internal nexus, where all the SAP NPM projects resides (including `qmate-service`).

### Installing specific version

```bash
npm install @wdio/qmate-service@1.0.0 --save-dev
```


## Execute specs using npx

```bash
npx wdio mytests.conf.js
```

## Editor
To write your scripts, you can use any editor of your choice.
- We recommend to use [Visual Studio Code](https://code.visualstudio.com/) to write your scripts.