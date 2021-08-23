#### Synchronous WebdriverIO commands usage with `wdio-qmate-service`

NOTE: 

**`wdio-qmate-service` does not support _sync_ mode.** 

**All `wdio-qmate-service` commands and assertions can be used only with `await` inside `async` functions** 

This package include tests to use `wdio-qmate-service` with parameters:
- automation backend located on local machine (`runner: 'local'`)
- [mocha](https://mochajs.org/) as a [wdio framework](https://webdriver.io/docs/frameworks.html#using-mocha)
- WebdriverIO commands will be used synchronously
- without a compiler (pure `Javascript`)
- test setup services: `chromedriver` and `wdio-qmate-service` (as `WdioQmateService`)

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