# Contribution
If you want to contribute to the `wdio-qmate-service` project, follow the steps below.

## Prerequisites
- Make sure to read the guide [Understanding the GitHub flow](https://guides.github.com/introduction/flow), if you are not aware of working with GitHub.
- Have a look at [WDIO custom services](https://webdriver.io/docs/customservices/)

## Contributors Setup
- **Step 1:** Navigate to the location where you want Vyper Service to be installed.
> 🛈 Don't use any path referring to a cloud location. Otherwise Vyper wont be able to run correctly.

- **Step 2:** Open the command prompt inside this folder and clone the repository by executing the following command.

  Please use one of the following methods. Fore more information visit section [GitHub Authentication](./troubleshooting.md/#GitHub_Authentification).
    - Via HTTPS:
     ```bash
    git clone https://github.tools.sap/sProcurement/wdio-qmate-service.git
    ```

- **Step 3:** Navigate into the repository:
```bash
cd wdio-qmate-service
```

- **Step 4:** Install local dependencies (Note: `wdio-qmate-service` has only devDependencies)
```bash
npm i
```

- **Step 5.** Navigate to `tests` inner folder where you want to run tests
```bash
cd tests/<folder name>
```

- **Step 6:** Install local dependencies (Note: `wdio-qmate-service` can be installed as a local dependency too)
```bash
npm i
```

- **Step 7:** Update your webdriver, if required.
```bash
npm run webdriver-update
```

- **Step 8:** Once the setup is done, execute the scripts with the following command:

```bash
npm run test
```
or, if you want to run one config file:

```bash
npx wdio <path/to/configuration file>
```



## Important


**Note 1:** Order of hooks call: 
- hooks from config file with imported `wdio-qmate-service` will be called first 
- wdio-qmate-service hooks will be called after user's specs.

---
**Note 2:** Errors in WDIO hooks are suppressed by default. 
The only way to interrupt execution after an error in a hook - call process.exit(1). 
It will mark all specs as failed

---
**Note 3:** WDIO hooks have different global scope.

E.g. `before` and `after` hooks have the same global scope, `beforeSession` and `afterSession` have the same global scope.
`onPrepare', `before` and `beforeSession` hooks have different global scopes.

Global variables, established in `beforeSession` hook, can be access in `describe` block and in `it` blocks.


Global variables, established in `before` hook, can be access in `it` blocks, but cannot be access in `describe` block.
