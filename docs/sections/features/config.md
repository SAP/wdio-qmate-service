# Config

## Important WebdriverIO Parameters

!!!info "WebdriverIO Parameters"
    For more information about how to setup your config please see the official [documentation](https://webdriver.io/docs/configurationfile/){target="__blank"} from WebdriverIO.

### *baseUrl*
The `baseUrl` defines the entry point of your script. Here you can define in which system or application your script/s is/are being executed.
```javascript
baseUrl: "https://www.sap.com"
```

### *specs*
Inside the `specs` array you specify the scripts to execute. 
```js
specs: [
  path.resolve(__dirname, "path/to/specs/yourSpec1.spec.js"),
  path.resolve(__dirname, "path/to/specs/yourSpec2.spec.js"),
  path.resolve(__dirname, "path/to/specs/yourSpec3.spec.js")
],
```
!!! warning
    These specs are being executed sequentially in **different instances**. Therefore, data (e.g. via references.json) **can not be passed** between the specs.

To pass data between the specs (run them in a shared instance), you have to group them as shown below:
```js
specs: [
  // grouped
  [
    path.resolve(__dirname, "path/to/specs/yourSpec1.spec.js"),
    path.resolve(__dirname, "path/to/specs/yourSpec2.spec.js")
  ],
  // ungrouped
  path.resolve(__dirname, "path/to/specs/yourSpec3.spec.js")
],
```

### *maxInstances*
The number of parallel instances running at the same time.
```javascript
maxInstances: 0
```

### *bail* & *mocha bail*
In qmate there are **two different** types of parameters to specify how your test executions should behave in case of a failure. Please make sure to set both parameters with the values according to the table below. 

=== "wdio bail"
    Possible values are: `0`, `1`
    ```javascript
    bail: 1
    ```
=== "mocha bail"
    Possible values: `true`, `false`
    ```javascript
    mochaOpts: {
      bail: true
    }
    ```

Please find the below table for a detailed overview of all possible options:

| name          | mocha bail | wdio bail | result                                                                  |
| ------------- | ---------- | --------- | ------------------------------------------------------------------------|
| break all     | ``true``   | ``1``     | break whole test execution after failure                                |
| break further | ``false``  | ``1``     | continue with failed spec, break further spec execution after failure   |
| break current | ``true``   | ``0``     | break failed spec, continue further spec execution                      |
| ignore        | ``false``  | ``0``     | don't break test execution at all                                       |

!!! warning
    Grouped specs or describes within the same file will behave the same as the failed spec.



### *specFileRetries​*
The number of times to retry an entire specfile when it fails as a whole.
```javascript
specFileRetries​: 3
```

### *logLevel*
The level of logging verbosity.

Possible values are: ``trace`` | ``debug`` | ``info`` | ``warn`` | ``error`` | ``silent``
```javascript
logLevel: "warn"
```

___
## Qmate Service specific parameters
The `params` object inside your config defines soe specific Qmate relevant parameters.
```javascript
params: {
  // [..]
}
```

!!! warning
    The following parameters are being defined inside the `params` object above.

#### *auth*
Specifies the way, Qmate will login to the system. See section [Authentication](../bestPractices/authentication.md) for possible options and more details.
```javascript
params: {
  auth: {
      formType: "plain"
  }
}
```

#### *systemUrl*
Defines your system url used for OData/REST API calls.
```javascript
params: {
  systemUrl: "https://www.sap.com"
}
```

#### *logUI5Version*
Specifies the log level of the UI5 version and timestamp of the system in use. Possible values are:

=== "always"
    Logs the UI5 version after each system login.
    ```javascript
    params: {
      logUI5Version: "always"
    }
    ```

=== "true"
    Logs the UI5 version per execution.
    ```javascript
    params: {
      logUI5Version: true
    }
    ```

=== "false"
    Does not log the UI5 version at all.
    ```javascript
    params: {
      logUI5Version: false
    }
    ```

```console title="console output"
UI5 Version:  1.96.1
UI5 Timestamp:	25/11/2021
```

#### *qmateCustomTimeout*
Overwrites the default timeout of 30 seconds in the functions from the Qmate Reuse API with the given value. Unit is milliseconds.
```javascript
params: {
  qmateCustomTimeout: 40000
}
```

#### *stepSleepTime*
Static sleep time after each step. Unit is milliseconds. Can be used to manually slow down the test execution. Set to `0` to disable.
```javascript
params: {
  stepSleepTime: 5000
}
```

#### *loadPropertyTimeout*
Overwrites the default loadPropertyTimeout of 10 seconds in the functions from the Qmate Reuse API with the given value. Unit is milliseconds.
```javascript
params: {
  qmateCustomTimeout: 20000
}
```
