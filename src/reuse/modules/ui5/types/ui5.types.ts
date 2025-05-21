// Qmate
export type QmateSelectors = Record<string, Ui5Selector | Ui5DynamicSelector | CssSelector | CssDynamicSelector>;

// Ui5
export interface Ui5Selector {
  elementProperties: ElementProperties;
  ancestorProperties?: ElementProperties;
  parentProperties?: ElementProperties;
  siblingProperties?: ElementProperties;
  prevSiblingProperties?: ElementProperties;
  nextSiblingProperties?: ElementProperties;
  childProperties?: ElementProperties;
  descendantProperties?: ElementProperties;
}

export type Ui5DynamicSelector = (...args: Array<any>) => Ui5Selector;

export interface ElementProperties {
  viewName?: string;
  metadata: Ui5ControlMetadata;
  [key: string]: any;
}

export type Ui5ControlMetadata = `sap.m.${Capitalize<string>}` | `sap.ui.comp.${Lowercase<string>}.${Capitalize<string>}`;

export type Ui5SelectorWithOptions = {
  selector: Ui5Selector;
  index?: number;
  timeout?: number;
  returnAllDomElements?: boolean;
};

// CSS
export type CssSelector = string;

export type CssDynamicSelector = (...args: Array<any>) => CssSelector;