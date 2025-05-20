import { ControlFinder } from "../utils/ControlFinder";
import { LocatorDebug } from "../utils/LocatorDebug";

export class UI5ControlHandler {
  public static retrieveValidUI5ControlsSubElements(nodes: HTMLCollection): UI5Control[] {
    if (!nodes || nodes.length === 0) {
      return [];
    }
    const aCandidateControls: any[] = [];
    Array.prototype.forEach.call(nodes, (node) => {
      const nodeId = node.getAttribute("id");
      const control = ControlFinder.getUI5Control(nodeId);
      if (control) {
        aCandidateControls.push(control);
      } else {
        aCandidateControls.push(...UI5ControlHandler.retrieveValidUI5ControlsSubElements(node.children));
      }
    });
    return aCandidateControls;
  }

  public static extractBindingPathAndModelProperty(pathObj: any): any {
    const binding = {
      model: "",
      path: ""
    };
    if (!pathObj?.path) return binding;
    binding.path = pathObj.path;
    if (pathObj.path.indexOf(">") !== -1) {
      binding.model = pathObj.path.substring(0, pathObj.path.indexOf(">"));
      binding.path = pathObj.path.substring(pathObj.path.indexOf(">") + 1, pathObj.path.length);
    }
    return binding;
  }

  public static findSiblingControls(control: UI5Control): UI5Control[] {
    const parentControl = UI5ControlHandler.getUI5Parent(control);
    const parentId = parentControl?.getId?.();
    const controlId = control?.getId?.();
    if (!parentControl || !parentId || !controlId) {
      return [];
    }

    const parentElement = document.getElementById(parentId);
    if (!parentElement) {
      return [];
    }
    const allSiblingNodes = parentElement.children;
    const aValidControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(allSiblingNodes);
    if (!aValidControls || aValidControls.length === 0) return [];
    const controlIndx = aValidControls.findIndex((element) => element.getId() === controlId);
    if (controlIndx === -1) {
      throw new Error("Something is very wrong with prev/next control finder");
    } else {
      aValidControls.splice(controlIndx, 1);
      return aValidControls;
    }
  }

  public static findPrevNextControl(control: UI5Control, bIsNext: boolean): UI5Control | null {
    const oParentControl = UI5ControlHandler.getUI5Parent(control);
    const sControlId = control?.getId?.();
    const sParentId = oParentControl?.getId?.();
    if (!oParentControl || !sParentId || !sControlId) return null;

    const parentElement = document.getElementById(sParentId);
    if (!parentElement) return null;

    const aAllSiblingNodes = parentElement.children;
    const aValidControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(aAllSiblingNodes);
    const controlIndx = aValidControls.findIndex((element) => element.getId() === sControlId);
    if (controlIndx === -1) {
      console.error("Something is very wrong with prev/next control finder");
    }

    if (bIsNext && aValidControls.length - 1 > controlIndx) {
      return aValidControls[controlIndx + 1];
    } else if (!bIsNext && controlIndx > 0) {
      return aValidControls[controlIndx - 1];
    }
    return null;
  }

  public static getControlBindingContextPaths(control: UI5Control): string[] {
    if (!control) return [];

    // Merge all possible binding context sources
    const bindingContexts = Object.assign({}, control.oPropagatedProperties?.oBindingContexts, control.oBindingContexts, control.mElementBindingContexts);

    return Object.values(bindingContexts)
      .filter((value: any) => !!value && value.getPath && typeof value.getPath === "function")
      .map((ctx: any) => ctx.getPath())
      .filter((path) => path);
  }

  // first navigate up the DOM tree to find the UI5 parent element
  // if none is found try with the ui5 getParent method
  // if none is found return undefined
  public static getUI5Parent(control: UI5Control): UI5Control | undefined {
    let domParent = document.getElementById(control.getId?.())?.parentElement;
    while (true) {
      if (!domParent) return control.getParent?.();
      const oParentControl = ControlFinder.getUI5Control(domParent.getAttribute("id"));
      if (oParentControl) {
        return oParentControl;
      }
      domParent = domParent.parentElement;
    }
  }

  public static getControlProperty(control: UI5Control, propKey: string): any {
    return control?.getMetadata?.()?.getProperty?.(propKey)?.get?.(control);
  }

  public static getAggregationProperty(control: UI5Control, propKey: string): any {
    return control?.getMetadata?.()?.getAggregation?.(propKey)?.get?.(control);
  }

  public static getAssociationProperty(control: UI5Control, propKey: string): any {
    return control?.getMetadata?.()?.getAssociation?.(propKey)?.get?.(control);
  }

  public static getControlAllProperties(control: UI5Control): any {
    return control?.getMetadata?.()?.getAllProperties?.() || {};
  }

  public static getControlAllAggregations(control: UI5Control): any {
    return control?.getMetadata?.()?.getAllAggregations?.() || {};
  }

  public static getControlAllAssociations(control: UI5Control): any {
    return control?.getMetadata?.()?.getAllAssociations?.() || {};
  }

  public static getBindDataForAggregation(control: UI5Control, propKey: string): BindingInfo[] {
    const aAggregation = UI5ControlHandler.getControlAllAggregations(control);
    return UI5ControlHandler.getBindingData(aAggregation, control, propKey);
  }

  public static getBindDataForAssociation(control: UI5Control, propKey: string): BindingInfo[] {
    const aAssociation = UI5ControlHandler.getControlAllAssociations(control);
    return UI5ControlHandler.getBindingData(aAssociation, control, propKey);
  }

  public static getBindDataForProperty(control: UI5Control, propKey: string): BindingInfo[] {
    const aProperties = UI5ControlHandler.getControlAllProperties(control);
    return UI5ControlHandler.getBindingData(aProperties, control, propKey);
  }

  public static getBindingData(aProperties: any, control: UI5Control, propKey: string): BindingInfo[] {
    let aBindingInfos: BindingInfo[] = [];
    if (aProperties.hasOwnProperty(propKey)) {
      if (!control?.getBindingInfo?.(propKey)) return aBindingInfos;
      aBindingInfos = UI5ControlHandler.getBindingInfos(control, propKey);
    }
    return aBindingInfos;
  }

  private static getBindingInfos(control: UI5Control, propKey: string): BindingInfo[] {
    const bindingInfo = control.getBindingInfo?.(propKey);
    if (!bindingInfo) return [];

    const parts = bindingInfo.parts as any[] | undefined;
    const infos: BindingInfo[] = [];

    if (Array.isArray(parts) && parts.length > 0) {
      for (const part of parts) {
        if (!part.path) continue;
        infos.push({
          model: part.model || "",
          path: part.path,
          value: ""
        });
      }
    } else if (bindingInfo.path) {
      infos.push({
        model: bindingInfo.model || "",
        path: bindingInfo.path,
        value: ""
      });
    }

    const binding = control.getBinding?.(propKey);
    if (binding) {
      UI5ControlHandler.retrieveCompositeBindings(binding, infos);
    }

    return infos;
  }

  private static retrieveCompositeBindings(oBinding: any, aBindingInfos: any): void {
    if (!oBinding || !aBindingInfos) return;

    const processBinding = (binding: any) => {
      if (binding.getBindings) {
        const subBindings = binding.getBindings();
        if (Array.isArray(subBindings)) {
          subBindings.forEach(processBinding);
        }
      } else if (binding.getPath && binding.getValue) {
        const info = aBindingInfos.find((bi: any) => bi.path === binding.getPath());
        if (info) {
          info.value = binding.getValue();
        }
      }
    };

    processBinding(oBinding);
  }

  public static getUI5Ancestors(control: UI5Control): UI5Control[] {
    const MAXIMUM_DEPTH = 500;
    const ancestors: UI5Control[] = [];
    let parentControl = UI5ControlHandler.getUI5Parent(control);
    const visited = new Set<UI5Control>();
    visited.add(control);
    while (parentControl && !visited.has(parentControl) && ancestors.length < MAXIMUM_DEPTH) {
      ancestors.push(parentControl);
      visited.add(parentControl);
      parentControl = UI5ControlHandler.getUI5Parent(parentControl);
    }
    if (ancestors.length >= MAXIMUM_DEPTH) {
      LocatorDebug.debugLog("Maximum depth reached while retrieving ancestors for control", control.getId?.());
    }
    LocatorDebug.debugLog("found ancestors:" + ancestors.length);

    return ancestors;
  }
}
