# Authentication

On S/4HANA side, we provide some configurations and reuse methods to enable you an easy way of system authentication.

There are two different approaches to log into the system:
- via configuration file
- via reuse methods

Which way to choose depends on your needs and preferences. If you are testing a scenario which goes through various systems (especially non UI5 systems) it is not recommended to use a global authentication via the configuration file. If there is only one login during the script execution, it is up to you, to do the authentication via the configuration file.

## Via configuration file
Inside the *conf.js* file You can specify how the script will automatically log into the system. This will only be executed once before the first script is being executed. Hence, we recommend to use this only if you are not switching between multiple users or systems during the test execution.

There are multiple options to set the ```formType``` of the [Configuration](TODO).

### Fiori Login
Use this configuration for the Fiori login.

![fiori-form](../sources/images/fiori_form.PNG)

You only need to specify the ```username``` and ```password```.

```javascript
auth: {
    formType: "fiori-form",
    username: "PURCHASER",
    password: "Welcome1!"
},
```

### SAP Cloud Login
Use this configuration for the SAP Cloud login.

![sapcloud-form](../sources/images/sapCloud_form.PNG)

You only need to specify the ```username``` and ```password```.

```javascript
auth: {
    formType: "sapcloud-form",
    username: "PURCHASER",
    password: "Welcome1!"
},
```

### Others
The following options for ```formType``` are also available. You need to specify the ```username``` and ```password``` for this configuration.
- ```XSA-form```
- ```POT-form```
- ```MIA-form```
- ```UI5-Form```

### Custom Login
If you want to define your own custom form, you can use the following configuration.
Additionally to the ```username``` and ```password```, you need to specify the ```usernameFieldSelector```, ```passwordFieldSelector``` and ```logonButtonSelector```. Therefore set the CSS selectors of the corresponding elements.

```javascript
auth: {
    formType: "custom-form",
    username: "PURCHASER",
    password: "Welcome1!",
    usernameFieldSelector: "#USERNAME_BLOCK input",
    passwordFieldSelector: "#PASSWORD_BLOCK input",
    logonButtonSelector: "#LOGIN_LINK"
},
```

## Via reuse methods
The other way of system authentication, is to use our [reuse methods](https://github.tools.sap/sProcurement/wdio-qmate-service/blob/main/documentation/doc.md#ui5.common.session). 
This is recommended in general, especially if you are switching between multiple users or systems during the test execution. 
With this approach, you handle the login as a step within your script/s. 

The benefit of this is, to have more control over the login as an actual step inside your test process. 
Main advantage here is, that you are able to use the login/logout multiple times during the test execution if you need to switch users or systems during runtime.

You can use the following methods.

### [Fiori Login](https://github.tools.sap/sProcurement/wdio-qmate-service/blob/main/documentation/doc.md#ui5.session.loginFiori)
Use this method for the Fiori login.

![fiori-form](../sources/images/fiori_form.PNG)

Define the step (at the top of your script) and pass at least a valid user to the method. 
If the password for this user differs from the standard password *Welcome1!*, you can additionally pass the password as second parameter.

```javascript
it("Step 01: login Fiori", async function () {
    await ui5.session.loginFiori("PURCHASER");
    // await ui5.session.loginFiori("JOHNDOE", "abc123");
});
```

### [SAP Cloud Login](https://github.tools.sap/sProcurement/wdio-qmate-service/blob/main/documentation/doc.md#ui5.session.loginSapCloud)
Use this method for the SAP Cloud login.

![sapcloud-form](../sources/images/sapCloud_form.PNG)

Define the step (at the top of your script) and pass at least a valid user to the method. 
If the password for this user differs from the standard password *Welcome1!*, you can additionally pass the password as second parameter.

```javascript
it("Step 01: login Sap Cloud", async function () {
    await ui5.session.loginSapCloud("PURCHASER");
    // await ui5.session.loginSapCloud("JOHNDOE", "abc123");
});
```

### [Generic Login](https://github.tools.sap/sProcurement/wdio-qmate-service/blob/main/documentation/doc.md#ui5.session.login)
Generic login which automatically detects the correct form-type (fiori, sap-cloud) and performs the login.

```javascript
it("Step 01: login Generic", async function () {
    await ui5.session.login("PURCHASER", "Welcome1!");
  });
```

### [Custom Login](https://github.tools.sap/sProcurement/wdio-qmate-service/blob/main/documentation/doc.md#ui5.session.loginCustom)
If you want to define your own custom form, you can use the following method.

Define the step (at the top of your script) and pass the ```username```, ```password```, ```usernameFieldSelector```, ```passwordFieldSelector``` 
and ```logonButtonSelector```. Therefore set the CSS selectors of the corresponding elements.

```javascript
it("Step 01: login Custom", async function () {
    await ui5.session.loginCustom("PURCHASER", "Welcome1!", "#USERNAME_BLOCK input", "#PASSWORD_BLOCK input", "#LOGIN_LINK");
  });
```

### [Logout](https://github.tools.sap/sProcurement/wdio-qmate-service/blob/main/documentation/doc.md#ui5.session.logout)
To logout from a S/4HANA system, please use the following method.
```javascript
it("Step XX: logout", async function () {
    await ui5.session.logout();
});
```


