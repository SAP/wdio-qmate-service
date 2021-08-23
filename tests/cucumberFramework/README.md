#### Cucumber Framework usage with `wdio-qmate-service`

This package include tests to use `wdio-qmate-service` with parameters:
- automation backend located on local machine (`runner: 'local'`)
- [cucumber](https://cucumber.io/) as a [wdio framework](https://webdriver.io/docs/frameworks.html#using-jasmine)
- WebdriverIO commands will be used asynchronously
- without a compiler (pure `Javascript`)
- test setup services: `chromedriver` and `wdio-qmate-service` (as `WdioQmateService`)

```shell script
npm init (optional, only if you have no package.json)
npm i @wdio/cli
npx wdio config
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