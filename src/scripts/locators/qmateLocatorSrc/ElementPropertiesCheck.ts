import { UI5ControlHandler } from "./UI5ControlHandler";
import { Comparator } from "./Comparator";
import { LocatorDebug } from "./Debug";

export class ElementPropertiesCheck {
  public static filterByElementProperties(
    rawElementProperties: ElementProperties | undefined,
    controls: UI5Control[]
  ): UI5Control[] {
    if (!rawElementProperties ||
      this.undefinedOrEmptyObject(rawElementProperties) ||
      controls.length === 0
    ) {
      return controls;
    }

    // needed for backward compatibility
    let elementProperties = rawElementProperties;
    if (typeof rawElementProperties.mProperties === "object") {
      elementProperties = {
        ...rawElementProperties,
        ...rawElementProperties.mProperties
      };
      delete elementProperties.mProperties;
    }

    if (
      elementProperties.prevSiblingProperties ||
      elementProperties.nextSiblingProperties ||
      elementProperties.childProperties ||
      elementProperties.parentProperties
    ) {
      console.error(
        `The selector your provided ${JSON.stringify(
          elementProperties
        )} contains childProperties, parentProperties, prevSiblingProperties or nextSiblingProperties, please provide a valid selector without these properties`
      );
      throw new Error(
        "Nested properties can only be used for ancestorProperties, descendantProperties or siblingProperties."
      );
    }

    let filteredControls = controls.filter((control) => {
      if (!control) {
        return false;
      }
      if (!this.compareMetadata(elementProperties, control)) {
        return false;
      }
      if (!this.compareToProperties(elementProperties, control)) {
        return false;
      }
      if (
        !this.compareToDomProperties(control, elementProperties.domProperties)
      ) {
        return false;
      }
      return true;
    });

    LocatorDebug.debugLog(
      "Valid ui5Controls after initial elementProperties check:",
      filteredControls.length
    );

    filteredControls = this.filterByAncestorProperties(
      elementProperties.ancestorProperties,
      filteredControls
    );

    filteredControls = this.filterByDescendantProperties(
      elementProperties.descendantProperties,
      filteredControls
    );

    filteredControls = this.filterBySiblingProperties(
      elementProperties.siblingProperties,
      filteredControls
    );
    LocatorDebug.debugLog(
      "Valid ui5Controls after extended elementProperties check:",
      filteredControls.length
    );
    return filteredControls;
  }

  public static filterByParentProperties(
    rawElementProperties: ElementProperties | undefined,
    controls: UI5Control[]
  ): UI5Control[] {
    if (
      this.undefinedOrEmptyObject(rawElementProperties) ||
      controls.length === 0
    ) {
      return controls;
    }

    const filteredControls = controls.filter((control) => {
      const parentControl = UI5ControlHandler.getUI5Parent(control);
      if (!parentControl) {
        console.error(
          `The parent control of ${control.getId()} is not valid, please check the control`
        );
        return false;
      }
      return (
        ElementPropertiesCheck.filterByElementProperties(
          rawElementProperties,
          [parentControl]
        ).length > 0
      );
    });

    LocatorDebug.debugLog(
      "Valid ui5Controls after parentProperties check:",
      filteredControls.length
    );
    return filteredControls;
  }

  public static filterByAncestorProperties(
    rawElementProperties: ElementProperties | undefined,
    controls: UI5Control[]
  ): UI5Control[] {
    if (
      this.undefinedOrEmptyObject(rawElementProperties) ||
      controls.length === 0
    ) {
      return controls;
    }
    LocatorDebug.debugLog("Valid ui5Controls before  ancestorProperties check:", controls.length);
    const filteredControls = controls.filter((control) => {
      return this.filterByElementProperties(
          rawElementProperties,
          UI5ControlHandler.getUI5Ancestors(control)
        ).length > 0;
    });

    LocatorDebug.debugLog(
      "Valid ui5Controls after ancestorProperties check:",
      filteredControls.length
    );
    return filteredControls;
  }

  public static filterByDescendantProperties(
    rawElementProperties: ElementProperties | undefined,
    controls: UI5Control[]
  ): UI5Control[] {
    if (
      this.undefinedOrEmptyObject(rawElementProperties) ||
      controls.length === 0
    ) {
      return controls;
    }

    const filteredControls = controls.filter((control) => {
      const parentElement = document.getElementById(control.getId?.());
      if (!parentElement) {
        return false;
      }
      const childrenControls =
        UI5ControlHandler.retrieveValidUI5ControlsSubElements(
          parentElement.children
        );
      for (const childControl of childrenControls) {
        if (
          this.filterByElementProperties(rawElementProperties, [childControl])
            .length > 0
        ) {
          return true;
        }
      }

      if (
        this.filterByDescendantProperties(
          rawElementProperties,
          childrenControls
        ).length > 0
      ) {
        return true;
      }
      return false;
    });
    LocatorDebug.debugLog(
      "Valid ui5Controls after descendantProperties check:",
      filteredControls.length
    );
    return filteredControls;
  }

  public static filterByChildProperties(
    rawElementProperties: ElementProperties | undefined,
    controls: UI5Control[]
  ): UI5Control[] {
    if (
      this.undefinedOrEmptyObject(rawElementProperties) ||
      controls.length === 0
    ) {
      return controls;
    }

    const filteredControls = controls.filter((control) => {
      const parentElement = document.getElementById(control.getId());
      if (!parentElement) {
        return false;
      }
      const aAllChildrenNodes = parentElement.children;
      const aValidControls =
        UI5ControlHandler.retrieveValidUI5ControlsSubElements(
          aAllChildrenNodes
        );
      const aChildrenControls: any[] = this.filterByElementProperties(
        rawElementProperties,
        aValidControls
      );

      return aChildrenControls.length > 0;
    });
    LocatorDebug.debugLog(
      "Valid ui5Controls after childProperties check:",
      filteredControls.length
    );
    return filteredControls;
  }

  public static filterBySiblingProperties(
    rawElementProperties: ElementProperties | undefined,
    controls: UI5Control[]
  ): UI5Control[] {
    if (
      this.undefinedOrEmptyObject(rawElementProperties) ||
      controls.length === 0
    ) {
      return controls;
    }

    const filteredControls = controls.filter((control) => {
      const aSiblingControls = UI5ControlHandler.findSiblingControls(control);
      return (
        this.filterByElementProperties(rawElementProperties, aSiblingControls)
          .length > 0
      );
    });

    LocatorDebug.debugLog(
      "Valid ui5Controls after siblingProperties check:",
      filteredControls.length
    );
    return filteredControls;
  }

  public static filterByPrevElementProperties(
    rawElementProperties: ElementProperties | undefined,
    controls: UI5Control[]
  ): UI5Control[] {
    if (
      this.undefinedOrEmptyObject(rawElementProperties) ||
      controls.length === 0
    ) {
      return controls;
    }

    const filteredControls = controls.filter((control) => {
      const prevControl = UI5ControlHandler.findPrevNextControl(control, false);
      if (!prevControl) {
        return false;
      }
      return (
        this.filterByElementProperties(rawElementProperties, [prevControl])
          .length > 0
      );
    });

    LocatorDebug.debugLog(
      "Valid ui5Controls after prevSiblingProperties check:",
      filteredControls.length
    );
    return filteredControls;
  }

  public static filterByNextElementProperties(
    rawElementProperties: ElementProperties | undefined,
    controls: UI5Control[]
  ): UI5Control[] {
    if (
      this.undefinedOrEmptyObject(rawElementProperties) ||
      controls.length === 0
    ) {
      return controls;
    }

    const filteredControls = controls.filter((control) => {
      const nextControl = UI5ControlHandler.findPrevNextControl(control, true);
      if (!nextControl) {
        return false;
      }
      return (
        this.filterByElementProperties(rawElementProperties, [nextControl])
          .length > 0
      );
    });

    LocatorDebug.debugLog(
      "Valid ui5Controls after nextSiblingProperties check:",
      filteredControls.length
    );
    return filteredControls;
  }

  private static compareMetadata(
    elementProperties: ElementProperties,
    control: UI5Control
  ): boolean {
    if (!elementProperties?.metadata) {
      return true;
    }

    const controlMetadata = control.getMetadata().getName();
    const metadata = elementProperties.metadata;
    if (controlMetadata && metadata) {
      return Comparator.compareWithWildCard(metadata, controlMetadata);
    } else {
      return false;
    }
  }

  private static compareToDomProperties(
    control: UI5Control,
    properties: ElementProperties
  ): boolean {
    const node = document.getElementById(control.getId?.());
    if (!properties || !node || typeof properties !== "object") {
      return true;
    }

    const nodeAttributes = this.retrieveNodeAttributes(node);
    for (const [key, value] of Object.entries(properties)) {
      if (!value) {
        return false;
      }
      if (key === "nodeName") {
        const nodeName = node?.nodeName || "";
        return nodeName.toLowerCase() === value.toLowerCase();
      } else {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (
              !this.compareAttributeToElementAttributes(
                key,
                value[i],
                nodeAttributes
              )
            ) {
              return false;
            }
          }
        } else {
          return this.compareAttributeToElementAttributes(
            key,
            value,
            nodeAttributes
          );
        }
      }
    }
    return true;
  }

  private static retrieveNodeAttributes(
    node: HTMLElement
  ): Map<string, string> {
    const domProperties = new Map();
    const attributes: any[] | NamedNodeMap = node.attributes || [];
    for (let i = 0; i < attributes.length; i++) {
      domProperties.set(attributes[i].nodeName, attributes[i].nodeValue);
    }
    return domProperties;
  }

  private static compareAttributeToElementAttributes(
    key: string,
    value: any,
    nodeAttributes: Map<string, string>
  ): boolean {
    if (!key || !value || !nodeAttributes) return false;
    const actualValue = nodeAttributes.get(key)?.toString();
    return Comparator.compareWithWildCard(value, actualValue);
  }

  private static compareToProperties(
    elementProperties: ElementProperties,
    control: UI5Control
  ): boolean {
    if (!elementProperties) {
      return true;
    }
    for (const [key, value] of Object.entries(elementProperties)) {
      if (
        [
          "domProperties",
          "metadata",
          "ancestorProperties",
          "descendantProperties",
          "siblingProperties",
          "mProperties"
        ].includes(key)
      ) {
        continue;
      }

      if (Array.isArray(value)) {
        let bIsStringVal = typeof value[0] === "string";
        for (const valData of value) {
          if (
            (bIsStringVal &&
              !Comparator.compareArrayStrElements(key, valData, control)) ||
            (!bIsStringVal &&
              !Comparator.compareBindingPathAndModelProperty(
                key,
                valData,
                control
              ))
          ) {
            return false;
          }
        }
      } else if (typeof value === "object") {
        if (
          !Comparator.compareBindingPathAndModelProperty(key, value, control)
        ) {
          return false;
        }
      } else if (key === "viewName") {
        if (!this.isControlInViewName(control, value as string)) {
          return false;
        }
      } else if (key === "viewId") {
        if (!this.isControlInViewId(control, value as string)) {
          return false;
        }
      } else if (key === "id") {
        if (!Comparator.compareId(control, value as string)) {
          return false;
        }
      } else if (key === "bindingContextPath") {
        const aPaths = UI5ControlHandler.getControlBindingContextPaths(control);
        let bFound = false;
        for (let i = 0; i < aPaths.length; i++) {
          if (
            aPaths[i] &&
            value &&
            Comparator.compareWithWildCard(value, aPaths[i])
          ) {
            bFound = true;
            break;
          }
        }
        if (!bFound) {
          return false;
        }
      } else if (
        !Comparator.compareProperty(control, key, value) &&
        !Comparator.compareAggregation(control, key, value) &&
        !Comparator.compareAssociation(control, key, value)
      ) {
        return false;
      }
    }
    return true;
  }

  private static isControlInViewName(
    control: UI5Control | undefined,
    viewName: string
  ): boolean {
    if (!control || !sap.ui.core.mvc.View) {
      return false;
    }

    if (
      control instanceof sap.ui.core.mvc.View &&
      // @ts-ignore
      Comparator.compareWithWildCard(viewName, control.getViewName())
    ) {
      return true;
    }
      const ancesterControls = UI5ControlHandler.getUI5Ancestors(control);
    for (const ancestorControl of ancesterControls) {
      if (
        ancestorControl instanceof sap.ui.core.mvc.View &&
        // @ts-ignore
        Comparator.compareWithWildCard(viewName, ancestorControl.getViewName())
      ) {
        return true;
      }
    }
    return false;
  }

  private static isControlInViewId(
    control: UI5Control | undefined,
    sViewId: string
  ): boolean {
    if (!control || !sap.ui.core.mvc.View) {
      return false;
    }
    if (
      control instanceof sap.ui.core.mvc.View &&
      Comparator.compareWithWildCard(sViewId, control.getId())
    ) {
      return true;
    } else {
      return this.isControlInViewId(
        UI5ControlHandler.getUI5Parent(control),
        sViewId
      );
    }
  }

  private static undefinedOrEmptyObject(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }
}
