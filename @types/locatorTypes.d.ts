declare global {
  type BindingInfo = { model: string; path: string; value: string };
  type UI5Control = {
    oPropagatedProperties?: any;
    oBindingContexts?: any;
    mElementBindingContexts?: any;
    getId: () => string;
    getParent?: () => UI5Control;
    getViewName?: () => string;
    getBinding?: (key: string) => any;
    getBindingInfo?: (key: string) => { parts: any; path: string; model: string } | undefined;
    getMetadata: () => {
      getAllAggregations: () => any;
      getAllAssociations: () => any;
      getAllProperties: () => any;
      getAggregation: (key: string) =>
        | {
            get: (control: UI5Control) => any;
          }
        | undefined;
      getAssociation: (key: string) =>
        | {
            get: (control: UI5Control) => any;
          }
        | undefined;
      getProperty: (key: string) =>
        | {
            get: (control: UI5Control) => any;
          }
        | undefined;
      getName: () => string;
    };
  };
  type UI5Selector = {
    elementProperties: ElementProperties;
    parentProperties?: ElementProperties;
    ancestorProperties?: ElementProperties;
    childProperties?: ElementProperties;
    descendantProperties?: ElementProperties;
    siblingProperties?: ElementProperties;
    prevSiblingProperties?: ElementProperties;
    nextSiblingProperties?: ElementProperties;
  };
  type ElementProperties = {
    [key: string]: any;
    elementProperties: any;
    parentProperties?: any;
    ancestorProperties?: any;
    childProperties?: any;
    descendantProperties?: any;
    siblingProperties?: any;
    prevSiblingProperties?: any;
    nextSiblingProperties?: any;
  };
}

export { ElementProperties, UI5Control, UI5Selector, BindingInfo };
