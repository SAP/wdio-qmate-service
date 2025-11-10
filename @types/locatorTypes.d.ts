declare global {
  type UI5BindingInfo = {
    parts: Array<UI5BindingInfo>;
    path?: string;
    model?: string;
  };
  type QMateBindingInfo = { model: string; path: string; value: string };
  type UI5Control = {
    oPropagatedProperties?: any;
    oBindingContexts?: any;
    mElementBindingContexts?: any;
    getId: () => string;
    getParent?: () => UI5Control;
    getViewName?: () => string;
    getBinding?: (key: string) => any;
    getBindingInfo?: (key: string) => UI5BindingInfo | undefined;
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
    parentProperties?: ElementProperties;
    ancestorProperties?: ElementProperties;
    childProperties?: ElementProperties;
    descendantProperties?: ElementProperties;
    siblingProperties?: ElementProperties;
    prevSiblingProperties?: ElementProperties;
    nextSiblingProperties?: ElementProperties;
  };
}

export { ElementProperties, UI5Control, UI5Selector, QMateBindingInfo as BindingInfo };
