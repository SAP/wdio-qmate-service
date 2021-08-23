#### Synchronous WebdriverIO commands usage with `wdio-vyper-service`

NOTE: 

**`wdio-vyper-service` does not support _sync_ mode.** 

**All `wdio-vyper-service` commands and assertions can be used only with `await` inside `async` functions** 

This package include tests to use `wdio-vyper-service` with parameters:
- automation backend located on local machine (`runner: 'local'`)
- [mocha](https://mochajs.org/) as a [wdio framework](https://webdriver.io/docs/frameworks.html#using-mocha)
- WebdriverIO commands will be used synchronously
- without a compiler (pure `Javascript`)
- test setup services: `chromedriver` and `wdio-vyper-service` (as `WdioVyperService`)

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