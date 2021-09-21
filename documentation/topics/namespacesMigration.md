# Namespaces Migration

## Purpose

Some of the qmate reuse namespaces were changed, and the specs need to be updated to reflect these changes. Though the old specs will not fail if you do not update them, a deprecation warning will be written to the console if you do not do it.
There's an npm script in `wdio-qmate-service` for updating all of your specs' code. Below is a guide on how to use this.

## Usage

```
npm run update-legacy-specs <path_to_file_or_folder> -- --pathsToIgnore=<paths_to_ignore>
```
In case `<path_to_file_or_folder>` is a path to a file, the script will update the namespaces in this particular file.
In case `<path_to_file_or_folder>` is a path to a folder, the script will update the namespaces in the files inside this folder AND will go to all the subfolders recursively and update files there.

`<paths_to_ignore>` is a list of paths, file names or file name parts, for which script should not run. If you do not specify this option, then the following array will be used to filter out files and folders:
```[
  "node_modules",
  ".git",
  "reports",
  "results",
  ".PNG",
  ".png",
  "package.json",
  "package-lock.json",
  ".yml",
  ".JPG",
  ".jpg",
  ".doc",
  ".pdf",
  ".xls",
  ".pptx",
  ".txt"
]```

If you specify this `<paths_to_ignore>` option with your items, they will be added to that list from above.


## Example of usage of `<paths_to_ignore>` option
```
npm run update-legacy-specs ../vyperBusinessObjectReuse -- --pathsToIgnore=ariba supplierInvoice
```

## Customize namespace mapping

The script maps namespaces in specs according to the [legacyMapper.json](../../reuse/helper/legacyMapper.json) file. You can modify or add new namespaces' mappings to it. To do so, you need to add a new object to the array of mapping objects. This object will need to contain `old` and `new` keys, for the values of an old and a new namespace respectively.
```
[
  ...
  {
    "old": "ui5.common.userInteraction", // the old namespace
    "new": "ui5.userInteraction" // the new namespace
  },
  ...
]
```