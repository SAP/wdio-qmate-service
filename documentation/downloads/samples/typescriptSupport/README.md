#### Typescript with `wdio-qmate-service`

This package include tests to use `wdio-qmate-service` with parameters:
- automation backend located on local machine (`runner: 'local'`)
- [mocha](https://mochajs.org/) as a [wdio framework](https://webdriver.io/docs/frameworks.html#using-mocha)
- WebdriverIO commands will be used asynchronously
- [Typescript](https://www.typescriptlang.org/) compiler (project language - `typescript`) ([more](https://webdriver.io/docs/typescript/)  about how to use typescript)
- test setup services: `chromedriver` and `wdio-qmate-service` (as `WdioQmateService`)

```shell script
npm i @wdio/cli
npx wdio config
```
![WDIO configuration helper steps](wdioConfigurationHelper.PNG)

```shell script
npm install typescript ts-node --save-dev
```

To run tests:

Step 1. Install dependencies:
```bash
npm i
```
or 
```bash
npm ci
```

Step 2. Run tests using script command
```bash
npm run test
```

NOTE: it is not required to compiler test files separately - wdio are using `ts-node` to compile `.ts` files on fly