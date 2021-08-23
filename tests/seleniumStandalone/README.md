#### Selenium standalone usage with `wdio-qmate-service`

This package include tests to use `wdio-qmate-service` with parameters:
- automation backend located on local machine (`runner: 'local'`)
- [mocha](https://mochajs.org/) as a [wdio framework](https://webdriver.io/docs/frameworks.html#using-mocha)
- WebdriverIO commands will be used asynchronously
- without a compiler (pure `Javascript`)
- test setup services: `selenium-standalone` and `wdio-qmate-service` (as `WdioQmateService`)


```shell script
npm i @wdio/cli
npx wdio config
```
![WDIO configuration helper steps](./wdioConfigurationHelper.PNG)

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