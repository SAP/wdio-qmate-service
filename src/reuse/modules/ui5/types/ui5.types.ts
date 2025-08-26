// Qmate
export type QmateSelectors = Record<string, Ui5Selector | Ui5DynamicSelector | CssSelector | CssDynamicSelector>;

// Ui5
export interface Ui5Selector {
  elementProperties: ElementProperties | Ui5Selector;
  ancestorProperties?: ElementProperties | Ui5Selector;
  parentProperties?: ElementProperties | Ui5Selector;
  siblingProperties?: ElementProperties | Ui5Selector;
  prevSiblingProperties?: ElementProperties | Ui5Selector;
  nextSiblingProperties?: ElementProperties | Ui5Selector;
  childProperties?: ElementProperties | Ui5Selector;
  descendantProperties?: ElementProperties | Ui5Selector;
}

export type Ui5DynamicSelector = (...args: Array<any>) => Ui5Selector;

export interface ElementProperties {
  viewName?: string;
  metadata: Ui5ControlMetadata;
  [key: string]: any;
}

export type Ui5ControlMetadata = `sap.m.${Capitalize<string>}` | `sap.ui.comp.${Lowercase<string>}.${Capitalize<string>}` | `sap.ui.${Lowercase<string>}.${Capitalize<string>}`;

export type Ui5SelectorWithOptions = {
  selector: Ui5Selector;
  index?: number;
  timeout?: number;
  returnAllDomElements?: boolean;
};

// CSS
export type CssSelector = string;

export type CssDynamicSelector = (...args: Array<any>) => CssSelector;
