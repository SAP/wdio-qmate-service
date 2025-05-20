import { UI5ControlHandler } from "../utils/UI5ControlHandler";
export class UI5ControlDataInjector {
  public static convertAndInjectDataForProperties(controls: UI5Control[]) {
    return controls
      .map((control) => {
        const domElement = document.getElementById(control.getId?.());
        UI5ControlDataInjector.injectDataForProperties(domElement, control);
        return domElement;
      })
      .filter(Boolean) as HTMLElement[];
  }

  private static injectDataForProperties(domElement: HTMLElement | null, oControl: UI5Control): void {
    if (!domElement || !oControl) return;

    UI5ControlDataInjector.injectBindingContextPaths(domElement, oControl);

    UI5ControlDataInjector.injectAttributes(domElement, oControl, Object.keys(UI5ControlHandler.getControlAllProperties(oControl)), (key) => UI5ControlHandler.getControlProperty(oControl, key));
  }

  private static injectAttributes(domElement: HTMLElement, oControl: UI5Control, keys: string[], valueGetter: (key: string) => string): void {
    keys.forEach((key) => {
      domElement.setAttribute(`data-${key}`, valueGetter(key));
      const sBindingDataStr = UI5ControlDataInjector.getBindingInfoDataString(oControl, key);
      if (sBindingDataStr && sBindingDataStr.trim() !== "") {
        domElement.setAttribute(`data-${key}-path`, sBindingDataStr);
      }
    });
  }

  private static injectBindingContextPaths(domElement: HTMLElement, oControl: UI5Control): void {
    const aBindingPathValues = UI5ControlHandler.getControlBindingContextPaths(oControl);
    domElement.setAttribute("data-bindingContextPath-size", aBindingPathValues.length.toString());
    aBindingPathValues.forEach((sBindingPathValue, i) => {
      domElement.setAttribute(`data-bindingContextPath${i}`, sBindingPathValue);
    });
  }

  private static getBindingInfoDataString(oControl: UI5Control, key: string): string {
    if (!oControl.getBindingInfo?.(key)) return "";

    const aBindingInfos: string[] = [];
    const aBindingInfoParts = oControl.getBindingInfo?.(key)?.parts;
    if (aBindingInfoParts && aBindingInfoParts.length > 0) {
      for (let i = 0; i < aBindingInfoParts.length; i++) {
        if (!aBindingInfoParts[i].path) continue;
        if (aBindingInfoParts[i].model) aBindingInfos.push(aBindingInfoParts[i].model + ">");
        aBindingInfos.push(aBindingInfoParts[i].path || "");
      }
    } else {
      aBindingInfos.push(oControl.getBindingInfo?.(key)?.path || "");
    }

    if (aBindingInfos.length > 0) {
      return aBindingInfos.join();
    } else {
      return "";
    }
  }
}
