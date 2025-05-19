module.exports = {
  ui5All: function ui5All(ui5Selector, index, opt_parentElement) {
    // src/scripts/locators/qmateLocatorSrc/Debug.ts
    var cyrb53 = function (str, seed = 0) {
      let h1 = 3735928559 ^ seed,
        h2 = 1103547991 ^ seed;
      for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
      h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
      h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
      return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };
    var LocatorDebug = class {
      static initializeLogs(ui5Selector) {
        this.logs = [];
        if (!document.qmateLogHashes) {
          document.qmateLogHashes = [];
        }
        this.debugLog(
          "QmateLocator Debug Logs for Selector:" + JSON.stringify(ui5Selector)
        );
      }
      static debugLog(...messages) {
        this.logs.push(messages);
      }
      static printLogs() {
        if (this.logs.length === 0) {
          return;
        }
        if (this.sameLogAlreadyPrinted()) {
          return;
        }
        for (const log of this.logs) {
          console.warn(...log);
        }
      }
      static sameLogAlreadyPrinted() {
        const now = /* @__PURE__ */ new Date();
        now.setSeconds(Math.floor(now.getSeconds() / 10) * 10, 0);
        const time = now.toISOString().replace(/T/, " ").replace(/\..+/, "");
        const hash = cyrb53(JSON.stringify(this.logs) + time);
        if (document.qmateLogHashes.includes(hash)) {
          return true;
        }
        document.qmateLogHashes.push(hash);
        return false;
      }
    };

    // src/scripts/locators/qmateLocatorSrc/ControlFinder.ts
    var ControlFinder = class {
      static retrieveUI5Controls(selector, index, opt_parentElement) {
        const nodes =
          this.retrieveNodesFromBody(selector, index, opt_parentElement) || [];
        return this.retrieveValidUI5Controls(nodes);
      }
      static isInt(value) {
        return !isNaN(value) && (parseFloat(value) | 0) === parseFloat(value);
      }
      static retrieveNodesFromBody(selector, index, opt_parentElement) {
        let cssSelector = "*";
        if (selector.elementProperties?.id) {
          if (
            selector.elementProperties.id.startsWith("*") ||
            (selector.elementProperties.id.endsWith("*") &&
              !selector.elementProperties.id
                .substring(1, selector.elementProperties.id.length - 1)
                .includes("*"))
          ) {
            const idWithoutWildcards = selector.elementProperties.id.replaceAll(
              "*",
              ""
            );
            LocatorDebug.debugLog(
              "shortened id is '",
              idWithoutWildcards,
              "' from '",
              selector.elementProperties.id,
              "'"
            );
            cssSelector = `*[id*="${idWithoutWildcards}"]`;
          }
        }
        if (index) {
          if (!this.isInt(index) && index.nodeType) {
            return Array.from(index.querySelectorAll(cssSelector));
          } else if (opt_parentElement && opt_parentElement.nodeType) {
            return Array.from(opt_parentElement.querySelectorAll(cssSelector));
          }
        }
        const sapBodies = Array.from(
          document.getElementsByClassName("sapUiBody")
        );
        return sapBodies.reduce((acc, body) => {
          return acc.concat(Array.from(body.querySelectorAll(cssSelector)));
        }, []);
      }
      static retrieveValidUI5Controls(nodes) {
        return nodes
          .map((node) => this.getUI5Control(node.getAttribute("id")))
          .filter((element) => element);
      }
      static getUI5Control(id) {
        return sap.ui.core.Element.getElementById(id);
      }
    };

    // src/scripts/locators/qmateLocatorSrc/UI5ControlHandler.ts
    var UI5ControlHandler = class _UI5ControlHandler {
      static retrieveValidUI5ControlsSubElements(nodes) {
        if (!nodes || nodes.length === 0) {
          return [];
        }
        const aCandidateControls = [];
        Array.prototype.forEach.call(nodes, (node) => {
          const nodeId = node.getAttribute("id");
          const control = ControlFinder.getUI5Control(nodeId);
          if (control) {
            aCandidateControls.push(control);
          } else {
            aCandidateControls.push(
              ..._UI5ControlHandler.retrieveValidUI5ControlsSubElements(
                node.children
              )
            );
          }
        });
        return aCandidateControls;
      }
      static extractBindingPathAndModelProperty(pathObj) {
        const binding = {
          model: "",
          path: "",
        };
        if (!pathObj?.path) return binding;
        binding.path = pathObj.path;
        if (pathObj.path.indexOf(">") !== -1) {
          binding.model = pathObj.path.substring(0, pathObj.path.indexOf(">"));
          binding.path = pathObj.path.substring(
            pathObj.path.indexOf(">") + 1,
            pathObj.path.length
          );
        }
        return binding;
      }
      static findSiblingControls(control) {
        const parentControl = _UI5ControlHandler.getUI5Parent(control);
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
        const aValidControls =
          this.retrieveValidUI5ControlsSubElements(allSiblingNodes);
        if (!aValidControls || aValidControls.length === 0) return [];
        const controlIndx = aValidControls.findIndex(
          (element) => element.getId() === controlId
        );
        if (controlIndx === -1) {
          throw new Error(
            "Something is very wrong with prev/next control finder"
          );
        } else {
          aValidControls.splice(controlIndx, 1);
          return aValidControls;
        }
      }
      static findPrevNextControl(control, bIsNext) {
        const oParentControl = _UI5ControlHandler.getUI5Parent(control);
        const sControlId = control?.getId?.();
        const sParentId = oParentControl?.getId?.();
        if (!oParentControl || !sParentId || !sControlId) return null;
        const parentElement = document.getElementById(sParentId);
        if (!parentElement) return null;
        const aAllSiblingNodes = parentElement.children;
        const aValidControls =
          this.retrieveValidUI5ControlsSubElements(aAllSiblingNodes);
        const controlIndx = aValidControls.findIndex(
          (element) => element.getId() === sControlId
        );
        if (controlIndx === -1) {
          console.error(
            "Something is very wrong with prev/next control finder"
          );
        }
        if (bIsNext && aValidControls.length - 1 > controlIndx) {
          return aValidControls[controlIndx + 1];
        } else if (!bIsNext && controlIndx > 0) {
          return aValidControls[controlIndx - 1];
        }
        return null;
      }
      static getControlBindingContextPaths(control) {
        if (!control) return [];
        const bindingContexts = Object.assign(
          {},
          control.oPropagatedProperties?.oBindingContexts,
          control.oBindingContexts,
          control.mElementBindingContexts
        );
        return Object.values(bindingContexts)
          .filter(
            (value) =>
              !!value && value.getPath && typeof value.getPath === "function"
          )
          .map((ctx) => ctx.getPath())
          .filter((path) => path);
      }
      // first navigate up the DOM tree to find the UI5 parent element
      // if none is found try with the ui5 getParent method
      // if none is found return undefined
      static getUI5Parent(control) {
        let domParent = document.getElementById(
          control.getId?.()
        )?.parentElement;
        while (true) {
          if (!domParent) return control.getParent?.();
          const oParentControl = ControlFinder.getUI5Control(
            domParent.getAttribute("id")
          );
          if (oParentControl) {
            return oParentControl;
          }
          domParent = domParent.parentElement;
        }
      }
      static getControlProperty(control, propKey) {
        return control?.getMetadata?.()?.getProperty?.(propKey)?.get?.(control);
      }
      static getAggregationProperty(control, propKey) {
        return control
          ?.getMetadata?.()
          ?.getAggregation?.(propKey)
          ?.get?.(control);
      }
      static getAssociationProperty(control, propKey) {
        return control
          ?.getMetadata?.()
          ?.getAssociation?.(propKey)
          ?.get?.(control);
      }
      static getControlAllProperties(control) {
        return control?.getMetadata?.()?.getAllProperties?.() || {};
      }
      static getControlAllAggregations(control) {
        return control?.getMetadata?.()?.getAllAggregations?.() || {};
      }
      static getControlAllAssociations(control) {
        return control?.getMetadata?.()?.getAllAssociations?.() || {};
      }
      static getBindDataForAggregation(control, propKey) {
        const aAggregation = this.getControlAllAggregations(control);
        return this.getBindingData(aAggregation, control, propKey);
      }
      static getBindDataForAssociation(control, propKey) {
        const aAssociation = this.getControlAllAssociations(control);
        return this.getBindingData(aAssociation, control, propKey);
      }
      static getBindDataForProperty(control, propKey) {
        const aProperties = this.getControlAllProperties(control);
        return this.getBindingData(aProperties, control, propKey);
      }
      static getBindingData(aProperties, control, propKey) {
        let aBindingInfos = [];
        if (aProperties.hasOwnProperty(propKey)) {
          if (!control?.getBindingInfo?.(propKey)) return aBindingInfos;
          aBindingInfos = this.getBindingInfos(control, propKey);
        }
        return aBindingInfos;
      }
      static getBindingInfos(control, propKey) {
        const bindingInfo = control.getBindingInfo?.(propKey);
        if (!bindingInfo) return [];
        const parts = bindingInfo.parts;
        const infos = [];
        if (Array.isArray(parts) && parts.length > 0) {
          for (const part of parts) {
            if (!part.path) continue;
            infos.push({
              model: part.model || "",
              path: part.path,
              value: "",
            });
          }
        } else if (bindingInfo.path) {
          infos.push({
            model: bindingInfo.model || "",
            path: bindingInfo.path,
            value: "",
          });
        }
        const binding = control.getBinding?.(propKey);
        if (binding) {
          this.retrieveCompositeBindings(binding, infos);
        }
        return infos;
      }
      static retrieveCompositeBindings(oBinding, aBindingInfos) {
        if (!oBinding || !aBindingInfos) return;
        const processBinding = (binding) => {
          if (binding.getBindings) {
            const subBindings = binding.getBindings();
            if (Array.isArray(subBindings)) {
              subBindings.forEach(processBinding);
            }
          } else if (binding.getPath && binding.getValue) {
            const info = aBindingInfos.find(
              (bi) => bi.path === binding.getPath()
            );
            if (info) {
              info.value = binding.getValue();
            }
          }
        };
        processBinding(oBinding);
      }
      static getUI5Ancestors(control) {
        const MAXIMUM_DEPTH = 500;
        const ancestors = [];
        let parentControl = _UI5ControlHandler.getUI5Parent(control);
        const visited = /* @__PURE__ */ new Set();
        visited.add(control);
        while (
          parentControl &&
          !visited.has(parentControl) &&
          ancestors.length < MAXIMUM_DEPTH
        ) {
          ancestors.push(parentControl);
          visited.add(parentControl);
          parentControl = _UI5ControlHandler.getUI5Parent(parentControl);
        }
        if (ancestors.length >= MAXIMUM_DEPTH) {
          console.warn(
            "Maximum depth reached while retrieving ancestors for control",
            control.getId?.()
          );
        }
        return ancestors;
      }
    };

    // src/scripts/locators/qmateLocatorSrc/UI5ControlDataInjector.ts
    var UI5ControlDataInjector = class _UI5ControlDataInjector {
      static injectDataForProperties(domElement, oControl) {
        if (!domElement || !oControl) return;
        this.injectBindingContextPaths(domElement, oControl);
        this.injectAttributes(
          domElement,
          oControl,
          Object.keys(UI5ControlHandler.getControlAllProperties(oControl)),
          (key) => UI5ControlHandler.getControlProperty(oControl, key)
        );
        this.injectAttributes(
          domElement,
          oControl,
          Object.keys(UI5ControlHandler.getControlAllAggregations(oControl)),
          (key) => UI5ControlHandler.getAggregationProperty(oControl, key)
        );
        this.injectAttributes(
          domElement,
          oControl,
          Object.keys(UI5ControlHandler.getControlAllAssociations(oControl)),
          (key) => UI5ControlHandler.getAssociationProperty(oControl, key)
        );
      }
      static injectAttributes(domElement, oControl, keys, valueGetter) {
        keys.forEach((key) => {
          domElement.setAttribute(`data-${key}`, valueGetter(key));
          const sBindingDataStr =
            _UI5ControlDataInjector.getBindingInfoDataString(oControl, key);
          if (sBindingDataStr && sBindingDataStr.trim() !== "") {
            domElement.setAttribute(`data-${key}-path`, sBindingDataStr);
          }
        });
      }
      static injectBindingContextPaths(domElement, oControl) {
        const aBindingPathValues =
          UI5ControlHandler.getControlBindingContextPaths(oControl);
        domElement.setAttribute(
          "data-bindingContextPath-size",
          aBindingPathValues.length.toString()
        );
        aBindingPathValues.forEach((sBindingPathValue, i) => {
          domElement.setAttribute(
            `data-bindingContextPath${i}`,
            sBindingPathValue
          );
        });
      }
      static getBindingInfoDataString(oControl, key) {
        if (!oControl.getBindingInfo?.(key)) return "";
        const aBindingInfos = [];
        const aBindingInfoParts = oControl.getBindingInfo?.(key)?.parts;
        if (aBindingInfoParts && aBindingInfoParts.length > 0) {
          for (let i = 0; i < aBindingInfoParts.length; i++) {
            if (!aBindingInfoParts[i].path) continue;
            if (aBindingInfoParts[i].model)
              aBindingInfos.push(aBindingInfoParts[i].model + ">");
            aBindingInfos.push(aBindingInfoParts[i].path);
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
    };

    // src/scripts/locators/qmateLocatorSrc/Comparator.ts
    var Comparator = class _Comparator {
      static isNullish(value) {
        return value === null || value === void 0;
      }
      static convertToString(value) {
        if (this.isNullish(value)) {
          return "";
        }
        return value.toString();
      }
      static compareWithWildCard(sWild, value) {
        if (this.isNullish(sWild) && this.isNullish(value)) return true;
        const strWild = this.convertToString(sWild).trim();
        const strValue = this.convertToString(value);
        if (!strWild || !strWild.includes("*")) {
          return strWild === strValue;
        }
        const wildParts = strWild.split("*").filter(Boolean);
        let lastIndex = 0;
        for (const part of wildParts) {
          const idx = strValue.indexOf(part, lastIndex);
          if (idx === -1) return false;
          lastIndex = idx + part.length;
        }
        return true;
      }
      static compareId(control, expectedId) {
        const controlID = control.getId?.();
        if (!expectedId) {
          return true;
        }
        if (controlID) {
          return this.compareWithWildCard(expectedId, controlID);
        } else {
          return false;
        }
      }
      static compareProperty(control, key, value) {
        const controlVal = UI5ControlHandler.getControlProperty(control, key);
        if (!this.isNullish(controlVal) && !this.isNullish(value)) {
          return _Comparator.compareWithWildCard(value, controlVal);
        } else if (this.isNullish(controlVal) && value) {
          return false;
        }
        return true;
      }
      static compareAggregation(control, key, value) {
        const controlVal = UI5ControlHandler.getAggregationProperty(
          control,
          key
        );
        if (!this.isNullish(controlVal) && value) {
          return this.compareWithWildCard(value, controlVal);
        } else if (this.isNullish(controlVal) && value) {
          return false;
        }
        return true;
      }
      static compareAssociation(control, key, value) {
        const controlVal = UI5ControlHandler.getAssociationProperty(
          control,
          key
        );
        if (!this.isNullish(controlVal) && value) {
          return this.compareWithWildCard(value, controlVal);
        } else if (this.isNullish(controlVal) && value) {
          return false;
        }
        return true;
      }
      static compareBindingPathAndModelProperty(key, value, control) {
        const extrPath =
          UI5ControlHandler.extractBindingPathAndModelProperty(value);
        let bindingInfo =
          UI5ControlHandler.getBindDataForProperty(control, key) ||
          UI5ControlHandler.getBindDataForAggregation(control, key) ||
          UI5ControlHandler.getBindDataForAssociation(control, key) ||
          [];
        if (!extrPath.path && bindingInfo.length >= 0) return true;
        if (extrPath.path && bindingInfo.length === 0) return false;
        return bindingInfo.some((info) => {
          if (extrPath.model && info.model) {
            return (
              this.compareWithWildCard(extrPath.model, info.model) &&
              this.compareWithWildCard(extrPath.path, info.path)
            );
          }
          return this.compareWithWildCard(extrPath.path, info.path);
        });
      }
      static compareArrayStrElements(key, elemId, control) {
        let values =
          UI5ControlHandler.getAssociationProperty(control, key) ||
          UI5ControlHandler.getAggregationProperty(control, key) ||
          UI5ControlHandler.getControlProperty(control, key) ||
          [];
        if (!values.length && elemId) return false;
        if (!values.length && !elemId) return true;
        if (values.length && !elemId) return false;
        const elemIdStr = this.convertToString(elemId).toLowerCase();
        return values.some((elem) => {
          let elemStr = elem;
          if (typeof elem === "object" && typeof elem.getId === "function") {
            elemStr = elem.getId();
          }
          elemStr = this.convertToString(elemStr).toLowerCase();
          return this.compareWithWildCard(elemIdStr, elemStr);
        });
      }
    };

    // src/scripts/locators/qmateLocatorSrc/ElementPropertiesCheck.ts
    var ElementPropertiesCheck = class _ElementPropertiesCheck {
      static filterByElementProperties(rawElementProperties, controls) {
        if (
          !rawElementProperties ||
          this.undefinedOrEmptyObject(rawElementProperties) ||
          controls.length === 0
        ) {
          return controls;
        }
        let elementProperties = rawElementProperties;
        if (typeof rawElementProperties.mProperties === "object") {
          elementProperties = {
            ...rawElementProperties,
            ...rawElementProperties.mProperties,
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
            !this.compareToDomProperties(
              control,
              elementProperties.domProperties
            )
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
      static filterByParentProperties(rawElementProperties, controls) {
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
            _ElementPropertiesCheck.filterByElementProperties(
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
      static filterByAncestorProperties(rawElementProperties, controls) {
        if (
          this.undefinedOrEmptyObject(rawElementProperties) ||
          controls.length === 0
        ) {
          return controls;
        }
        const filteredControls = controls.filter((control) => {
          return (
            this.filterByElementProperties(
              rawElementProperties,
              UI5ControlHandler.getUI5Ancestors(control)
            ).length > 0
          );
        });
        LocatorDebug.debugLog(
          "Valid ui5Controls after ancestorProperties check:",
          filteredControls.length
        );
        return filteredControls;
      }
      static filterByDescendantProperties(rawElementProperties, controls) {
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
              this.filterByElementProperties(rawElementProperties, [
                childControl,
              ]).length > 0
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
      static filterByChildProperties(rawElementProperties, controls) {
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
          const aChildrenControls = this.filterByElementProperties(
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
      static filterBySiblingProperties(rawElementProperties, controls) {
        if (
          this.undefinedOrEmptyObject(rawElementProperties) ||
          controls.length === 0
        ) {
          return controls;
        }
        const filteredControls = controls.filter((control) => {
          const aSiblingControls =
            UI5ControlHandler.findSiblingControls(control);
          return (
            this.filterByElementProperties(
              rawElementProperties,
              aSiblingControls
            ).length > 0
          );
        });
        LocatorDebug.debugLog(
          "Valid ui5Controls after siblingProperties check:",
          filteredControls.length
        );
        return filteredControls;
      }
      static filterByPrevElementProperties(rawElementProperties, controls) {
        if (
          this.undefinedOrEmptyObject(rawElementProperties) ||
          controls.length === 0
        ) {
          return controls;
        }
        const filteredControls = controls.filter((control) => {
          const prevControl = UI5ControlHandler.findPrevNextControl(
            control,
            false
          );
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
      static filterByNextElementProperties(rawElementProperties, controls) {
        if (
          this.undefinedOrEmptyObject(rawElementProperties) ||
          controls.length === 0
        ) {
          return controls;
        }
        const filteredControls = controls.filter((control) => {
          const nextControl = UI5ControlHandler.findPrevNextControl(
            control,
            true
          );
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
      static compareMetadata(elementProperties, control) {
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
      static compareToDomProperties(control, properties) {
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
      static retrieveNodeAttributes(node) {
        const domProperties = /* @__PURE__ */ new Map();
        const attributes = node.attributes || [];
        for (let i = 0; i < attributes.length; i++) {
          domProperties.set(attributes[i].nodeName, attributes[i].nodeValue);
        }
        return domProperties;
      }
      static compareAttributeToElementAttributes(key, value, nodeAttributes) {
        if (!key || !value || !nodeAttributes) return false;
        const actualValue = nodeAttributes.get(key)?.toString();
        return Comparator.compareWithWildCard(value, actualValue);
      }
      static compareToProperties(elementProperties, control) {
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
              "mProperties",
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
              !Comparator.compareBindingPathAndModelProperty(
                key,
                value,
                control
              )
            ) {
              return false;
            }
          } else if (key === "viewName") {
            if (!this.isControlInViewName(control, value)) {
              return false;
            }
          } else if (key === "viewId") {
            if (!this.isControlInViewId(control, value)) {
              return false;
            }
          } else if (key === "id") {
            if (!Comparator.compareId(control, value)) {
              return false;
            }
          } else if (key === "bindingContextPath") {
            const aPaths =
              UI5ControlHandler.getControlBindingContextPaths(control);
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
      static isControlInViewName(control, viewName) {
        if (!control || !sap.ui.core.mvc.View) {
          return false;
        }
        const ancesterControls = UI5ControlHandler.getUI5Ancestors(control);
        for (const ancestorControl of ancesterControls) {
          if (
            ancestorControl instanceof sap.ui.core.mvc.View && // @ts-ignore
            Comparator.compareWithWildCard(
              viewName,
              ancestorControl.getViewName()
            )
          ) {
            return true;
          }
        }
        return false;
      }
      static isControlInViewId(control, sViewId) {
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
      static undefinedOrEmptyObject(obj) {
        return !obj || Object.keys(obj).length === 0;
      }
    };

    // src/scripts/locators/qmateLocatorSrc/Locator.ts
    var Locator = class {
      static locate(ui5Selector, index, opt_parentElement) {
        LocatorDebug.initializeLogs(ui5Selector);
        try {
          this.checkSelector(ui5Selector);
          if (!sap.ui?.getCore?.()) {
            console.error("This is not an UI5 App, please use other locators");
            throw new Error(
              "This is not an UI5 App, please use other locators"
            );
          }
          const ui5Controls = ControlFinder.retrieveUI5Controls(
            ui5Selector,
            index,
            opt_parentElement
          );
          LocatorDebug.debugLog("Total ui5Controls:", ui5Controls.length);
          const validUi5Controls = this.checkControls(ui5Controls, ui5Selector);
          LocatorDebug.debugLog("Valid ui5Controls:", validUi5Controls.length);
          const resultElements = this.filterByIndex(validUi5Controls, index)
            .map((control) => {
              const domElement = document.getElementById(control.getId?.());
              UI5ControlDataInjector.injectDataForProperties(
                domElement,
                control
              );
              return domElement;
            })
            .filter((element) => element);
          LocatorDebug.debugLog("Result elements:", resultElements.length);
          if (resultElements.length === 0) {
            LocatorDebug.printLogs();
          }
          return resultElements;
        } catch (error) {
          console.error("Error in locator:", error.stack);
          throw error;
        }
      }
      static checkControls(controls, ui5Selector) {
        let validUi5Controls = ElementPropertiesCheck.filterByElementProperties(
          ui5Selector.elementProperties,
          controls
        );
        validUi5Controls = ElementPropertiesCheck.filterByParentProperties(
          ui5Selector.parentProperties,
          validUi5Controls
        );
        validUi5Controls = ElementPropertiesCheck.filterByAncestorProperties(
          ui5Selector.ancestorProperties,
          validUi5Controls
        );
        validUi5Controls = ElementPropertiesCheck.filterByChildProperties(
          ui5Selector.childProperties,
          validUi5Controls
        );
        validUi5Controls = ElementPropertiesCheck.filterByDescendantProperties(
          ui5Selector.descendantProperties,
          validUi5Controls
        );
        validUi5Controls = ElementPropertiesCheck.filterBySiblingProperties(
          ui5Selector.siblingProperties,
          validUi5Controls
        );
        validUi5Controls = ElementPropertiesCheck.filterByPrevElementProperties(
          ui5Selector.prevSiblingProperties,
          validUi5Controls
        );
        validUi5Controls = ElementPropertiesCheck.filterByNextElementProperties(
          ui5Selector.nextSiblingProperties,
          validUi5Controls
        );
        return validUi5Controls;
      }
      static checkSelector(ui5Selector) {
        if (!ui5Selector) {
          console.error(
            `The selector your provided ${ui5Selector} is undefined/null, please provide a valid selector`
          );
          throw new Error(
            `The selector your provided ${ui5Selector} is undefined/null, please provide a valid selector`
          );
        }
        if (!ui5Selector.elementProperties) {
          console.error(
            `The selector your provided ${JSON.stringify(
              ui5Selector
            )} does not contain elementProperties, please provide a valid selector with elementProperties`
          );
          throw new Error(
            `The selector your provided ${JSON.stringify(
              ui5Selector
            )} does not contain elementProperties, please provide a valid selector with elementProperties`
          );
        }
      }
      static filterByIndex(aControls, index) {
        if (!index === null && !index === void 0) {
          if (typeof index === "object" && index.nodeType) {
            return aControls;
          } else if (index <= aControls.length - 1 && index >= 0) {
            return [aControls[index]];
          } else {
            return [];
          }
        }
        return aControls;
      }
    };

    // src/scripts/locators/qmateLocatorSrc/index.ts
    function locate(ui5Selector, index, opt_parentElement) {
      return Locator.locate(ui5Selector, index, opt_parentElement);
    }

    return locate(ui5Selector, index, opt_parentElement);
  },
};
