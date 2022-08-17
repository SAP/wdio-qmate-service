> Related Topics: [Features &#10095; Config](../features/config.md)

## Enable Qmate Service

To use our service you have to enable `wdio-qmate-service`in your `config.js`

```js
const qmateService = require("@wdio/qmate-service");

exports.config = {
    //...
  services: [[qmateService]],
    //...
};
```

!!!info "WebdriverIO Parameters"
    For more information about how to setup your config please see the official [documentation](https://webdriver.io/docs/configurationfile/) from WebdriverIO.
