# Retry functionality

### Retry per suite/step (Mocha)

Some valuable notes about `this.retries(n)`:

- In order to use the `this.retries()` method, 
the suite block `describe` must use an unbound function `function(){}` 
instead of a fat arrow function `() => {}`
- Failed and successful attempts will be displayed in a console log
- No additional parameters on **conf.js** file level required.

For an example, have a look at *tests/vyper/functional/retry/retrySuiteAndStep.test.js*

#### Retries number defined on a suite level

Define the number of retries for failing steps on a suite level. 
```js
describe("Mocha retry per suite/step", function() {
  // Retry failing tests in this suite up to 4 times. Can be overwritten via inner this.retries call
  this.retries(4);
    ...
});
```
In this case each failing step (not the whole suite!) in a suite will be retried 4 times.

#### Retries number defined on a step level

```js
...
  it("should have two retries", async function () {
    // Retry this test up to 2 times.
    this.retries(2);
    ...
  });
```
In this case only this failing step (not the whole suite and not another steps!) in a suite will be retries 4 times.
`this.retries(2);`, defined for a step, overwrites the `this.retries(4);` defined for a suite.

___
### Retry per step (Mocha, Jasmin)

For an example, have a look at *tests/vyper/functional/retry/retryStep.test.js*
```js
  it("should have one retry", async function () {
    ...
  },1);
```
This step will be retried once in case of an error.

Some valuable notes about retry per step:
- A fat arrow function `() => {}` can be used here, but without access to `this.wdioRetries`
- Cannot be applied for a suite
- `this.wdioRetries` variable available inside the script
- Steps are always green - no info about retries in the console log. 

___
### Global retry
You can retry whole file (with multiple suites inside) using WDIO configuration on **conf.js** file level.

For an example, have a look at *tests/vyper/functional/retry/retryGlobal.test.js*

```js
var path = require("path");
var merge = require("deepmerge");
var vyperConfig = require(path.resolve(process.env.CONFIG_TEMPLATES, "chrome.conf.js"));
exports.config = merge(vyperConfig.config, {
  maxInstances: 1,
  bail: 0,

  specFileRetries: 5,
  specFileRetriesDelay: 5,
  specFileRetriesDeferred: false,
  specs: [
    path.resolve(__dirname, "retryGlobal.test.js")
  ],
});

```

- `specFileRetries` property is used to define how many time the whole file will be retried
- `specFileRetriesDelay` property is used to define the delay before a new retry
- `specFileRetriesDeferred` property is used to define if the failed files retry has to be deferred.
If `true`, failed files will be executed at the end (after all tests suites).
if `false`, failed files will be executed again.

Some valuable notes about global (WDIO) retry:
- All suites in a file will be retried even in case of one failed suite

- The file will be retried in a separate instance. 

It means that a separate instance of a browser (selenium, chromium) will be spun up.
You will see lines
```vue
[0-0] RETRYING in chrome - vyper-wdio\tests\vyper\functional\retry\retryGlobal.test.js (1 retries)
[0-0] RUNNING in chrome - vyper-wdio\tests\vyper\functional\retry\retryGlobal.test.js
```


It means that a (global) scope will be cleaned up (refreshed). 
E.g. you cannot store a value in (global) scope for the **n** test file run and later check/reuse this value in **n+1** file run.

- Global retries and inner retries are independent.
 It means that if you defined `specFileRetries: 3` and `this.retries(4);` for a suit, the suit will be retried 4 time in one instance per each global retry:
 
 
 retries flow with both global and local retries defined | 
 ------------ | 
step in a suite failed | 
step in a suite will be retried 4 times due to this.retries(4) |
after 4 attempts (on suite level) it is a time for the first global retry |
inside this first global retry (with scope cleanup and new instance spin up) failing step will be retried 4 times due to this.retries(4) |
so step in a suite failed for the first global retry |
step in a suite will be retried 4 times due to this.retries(4), but this is still the first global retry |
all 4 step attempts expired - the whole suite failed |
now it is a time for the second global retry |
... |
at the end of 3th global attempt (we defined `specFileRetries: 3`) the file won't be retries anymore |
