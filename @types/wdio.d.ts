import type {} from "webdriverio";

// Inherit the installed WDIO command surface, including optional AI augmentation.
declare global {
  namespace WebdriverIO {
    interface Element {
      getUI5Property(property: string): Promise<any>;
      getBindingProperty(property: string): Promise<any>;
      getBindingContextPath(): Promise<string>;
      uiControl(selector: any, index?: number, timeout?: number, returnAllDomElements?: boolean): Promise<Element>;
      uiControls(selector: any, timeout?: number, returnAllDomElements?: boolean): Promise<Element[]>;
    }
  }
}

export type Element = WebdriverIO.Element;
