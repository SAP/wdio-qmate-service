# Data

## Load data
- To load the data inside the script, require it by using:
```javascript
let data = require("../data/01_createPurchaseOrder.json"); 
```

## Access data
- To access the data within another script, use the following code:
```javascript
let street = data.address.street;
```

## Export data
- If you are exporting some data during the script execution, store it inside the *references.json* file:
```javascript
let references = require("../data/references.json"); 
```

- To store any value inside the file, use the following statement:
```javascript
references.documentNumber = "000123";
```
> 🛈 Note: The data is only stored during the runtime of the test execution

## Best Practice

- Always decouple the data from your scripts. 

- Store your data files inside the *data* folder.

- Create a separate data *.json* file for every script. 

- Name the file exactly like the script which the data belongs to.

- Structure your data.

```javascript
{
    "firstName": "John",
    "lastName":  "Doe",
    "address": {
        "street":   "Main Road",
        "number":   "42",
        "zipCode":  "12345",
        "city":     "Metropolis"
    }
}
```