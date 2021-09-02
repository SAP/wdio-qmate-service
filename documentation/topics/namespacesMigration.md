# Namespaces Migration

## Purpose

Some of the qmate reuse namespaces were changed, and the specs need to be updated to reflect these changes. Though the old specs will not fail if you do not update them, a deprecation warning will be written to the console if you do not do it.
There's an npm script in `wdio-qmate-service` for updating all of your specs' code. Below is a guide on how to use this.

## Usage

```
npm run update-legacy-specs <path_to_file_or_folder>
```
In case `<path_to_file_or_folder>` is a path to a file, the script will update the namespaces in this particular file.
In case `<path_to_file_or_folder>` is a path to a folder, the script will update the namespaces in the files inside this folder AND will go to all the subfolders recursively and update files there.

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