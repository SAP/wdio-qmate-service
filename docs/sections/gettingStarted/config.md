# Config

> Related Topics: [Features &#10095; Config](../features/config.md)

## Enable Qmate Service

To use our service you have to enable `@sap_oss/wdio-qmate-service` in your *config.js*.

```js title="config.js"
const QmateService = require("@sap_oss/wdio-qmate-service");

exports.config = {
    // ...
  services: [[QmateService]],
    // ...
};
```

!!! info "WebdriverIO Parameters"
    For more information about **how to setup your config**, please see the official [documentation](https://webdriver.io/docs/configurationfile/){target="__blank"} from WebdriverIO.
