// These UI5 controls exist in the control registry but sit outside the standard UI5 control tree
// (e.g. sap.ui.core.HTML renders raw HTML and has no UI5 parent/child relationships). 
// Including them during DOM traversal breaks parent and child filtering, so they are skipped and their DOM children are inspected directly instead.
export const IGNORED_METADATA_LIST = [
  "sap.ui.core.HTML"
]