export type Ui5Selector = {
  elementProperties: any,
  ancestorProperties?: any,
  parentProperties?: any,
  siblingProperties?: any,
  prevSiblingProperties?: any,
  nextSiblingProperties?: any,
  childProperties?: any,
  descendantProperties?: any
};
export type Ui5SelectorWithOptions = {
  selector: Ui5Selector,
  index?: number,
  timeout?: number,
  returnAllDomElements?: boolean
};