# Configuration
Inside the *config.js* file you will define how the script/s is/are being executed.
> 🛈 We recommend to use provided [configurations](../../tests/helper/configurations)

## Main configuration properties

###require dependencies
Two required dependencies should be imported into the configuration file:
```javascript
const path = require("path");
const merge = require(path.resolve(process.env.DEEPMERGE_PATH));
```

`path` dependency is required to define paths to specs
`deepmerge` dependency is required to merge your custom configuration with one of base [configurations](../../tests/helper/configurations)

For more information about `deepmerge` approach, please see `WDIO` 

## `params` object
### *auth*
Specifies the way, Qmate will log in to the system. See section [Authentication](./authentication.md) for possible options and more details.
```javascript
auth: {
    formType: "plain"
},
```

### *coverage*
To enable the coverage please set the ```status``` to ```true``` and define the ```coverage_files``` for your application.\
```javascript
coverage: {
    status: true,
    coverage_files: ["mm_po_manages1"],
    sourcePath: "./sourceFolder"
},
```

### *baseUrl*
The ```baseUrl``` defines the entry point of your script. Here you can define in which system your script/s is/are being executed.
```javascript
baseUrl: "https://super-sensitive.domain.name/ui"
```

### *framework*
`mocha` framework is enabled by default in [base.conf.js](../../tests/helper/configurations/base.conf.js)
[More](https://webdriver.io/docs/frameworks) about mocha framework
Mocha [timeouts](https://webdriver.io/docs/timeouts/)


### *specs*
Inside the ```specs``` array you will specify all your scripts that should be executed. 
The scripts are being executed sequentially per default. 
If you are interested in parallel execution, please see section [Run specs sequentially](./migration.md#Run specs sequentially).
Note: `path` should be [imported](./configuration.md#require-dependencies) using `require` statement
```javascript
specs: [
    path.resolve(__dirname, "specs/01_yourScript.spec.js"),
    path.resolve(__dirname, "specs/02_justAnotherScript.spec.js"),
    // [...]
],
```