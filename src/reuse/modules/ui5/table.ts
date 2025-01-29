"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class table
 * @memberof ui5
 */
export class Table {
  private vlf = new VerboseLoggerFactory("ui5", "table");

  // =================================== SORTING ===================================
  /**
   * @function sortColumnAscending
   * @memberOf ui5.table
   * @description Sorts the given column "Ascending".
   * @param {String} columnName - The name of the column to sort.
   * @param {Object} [tableSelector] - The selector describing the table element (in case there are more then one).
   * @example await ui5.table.sortColumnAscending("Supplier");
   * @example const glAccountItemsTable = {
   *  "elementProperties": {
   *     "viewName": "ui.s2p.mm.supplinvoice.manage.s1.view.S1",
   *     "metadata": "sap.m.Table",
   *     "id": "*idS2P.MM.MSI.TableGLAccountItems"
   *  }
   * };
   * await ui5.table.sortColumnAscending("Amount", glAccountItemsTable);
   */
  async sortColumnAscending(columnName: string, tableSelector: any) {
    const oldSortButtonSelector = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "icon": "sap-icon://sort-ascending"
      },
      "ancestorProperties": {
        "metadata": "sap.m.Toolbar"
      }
    };
    const newSortButtonSelector = {
      "elementProperties": {
        "metadata": "sap.m.ToggleButton",
        "text": "Ascending"
      }
    };
    const newerSortButtonSelector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://sort-ascending"
      },
      "ancestorProperties": {
          "metadata":"sap.m.InputListItem"
      }
    };
    const sort = await this._getSortIndicatorValue(columnName, tableSelector);
    if (sort !== "Ascending") {
      this._clickColumn(columnName, tableSelector);
      await Promise.any([ui5.userInteraction.click(oldSortButtonSelector), ui5.userInteraction.click(newSortButtonSelector), ui5.userInteraction.click(newerSortButtonSelector)]);
    }
  }

  /**
   * @function sortColumnDescending
   * @memberOf ui5.table
   * @description Sorts the given column "Descending".
   * @param {String} columnName The name of the column to sort.
   * @param {Object} [tableSelector] - The selector describing the table element (in case there are more then one).
   * @example await ui5.table.sortColumnDescending("Supplier");
   * @example const glAccountItemsTable = {
   *  "elementProperties": {
   *     "viewName": "ui.s2p.mm.supplinvoice.manage.s1.view.S1",
   *     "metadata": "sap.m.Table",
   *     "id": "*idS2P.MM.MSI.TableGLAccountItems"
   *  }
   * };
   * await ui5.table.sortColumnDescending("Amount", glAccountItemsTable);
   */
  async sortColumnDescending(columnName: string, tableSelector: any) {
    const oldSortButtonSelector = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "icon": "sap-icon://sort-descending"
      },
      "ancestorProperties": {
        "metadata": "sap.m.Toolbar"
      }
    };
    const newSortButtonSelector = {
      "elementProperties": {
        "metadata": "sap.m.ToggleButton",
        "text": "Descending"
      }
    };
    const newerSortButtonSelector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://sort-descending"
      },
      "ancestorProperties": {
          "metadata":"sap.m.InputListItem"
      }
    };
    const sort = await this._getSortIndicatorValue(columnName, tableSelector);
    if (sort !== "Descending") {
      this._clickColumn(columnName, tableSelector);
      await Promise.any([ui5.userInteraction.click(oldSortButtonSelector), ui5.userInteraction.click(newSortButtonSelector), ui5.userInteraction.click(newerSortButtonSelector)]);
    }
  }

  /**
   * @function clickSettingsButton
   * @memberOf ui5.table
   * @description Opens the user Settings.
   * @param {Object} [tableSelector] - The selector describing the table element (in case there are more then one).
   * @example await ui5.table.clickSettingsButton();
   * @example const glAccountItemsTable = {
   *  "elementProperties": {
   *     "viewName": "ui.s2p.mm.supplinvoice.manage.s1.view.S1",
   *     "metadata": "sap.m.Table",
   *     "id": "*idS2P.MM.MSI.TableGLAccountItems"
   *  }
   * };
   * await ui5.table.clickSettingsButton(glAccountItemsTable);
   */
  async clickSettingsButton(tableSelector: any) {
    const vl = this.vlf.initLog(this.clickSettingsButton);
    const settingsButtonSelector = {
      elementProperties: {
        metadata: "sap.m.OverflowToolbarButton",
        id: "*btnPersonalisation"
      }
    };
    if (!tableSelector) {
      await ui5.userInteraction.click(settingsButtonSelector);
    } else {
      const selector = this._prepareAncestorSelector(settingsButtonSelector, tableSelector);
      await ui5.userInteraction.click(selector);
    }
  }

  // =================================== HELPER ===================================
  private async _clickColumn(name: string, tableSelector: any) {
    const vl = this.vlf.initLog(this._clickColumn);
    const tableColumnSelector = {
      elementProperties: {
        metadata: "sap.m.Column"
      },
      descendantProperties: {
        text: name
      }
    };

    const tableGridColumnSelector = {
        elementProperties: {
            metadata: "sap.ui.table.Column"
        },
        descendantProperties: {
            text: name
        }
    };
    
    if (!tableSelector) {
      await Promise.any([ui5.userInteraction.click(tableColumnSelector), 
                         ui5.userInteraction.click(tableGridColumnSelector)]);
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`Usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      await Promise.any([ui5.userInteraction.click(tableColumnSelector, tableSelector), 
                         ui5.userInteraction.click(tableGridColumnSelector, tableSelector)]); 
    } else if (typeof tableSelector === "object") {
      await Promise.any([ui5.userInteraction.click(this._prepareAncestorSelector(tableColumnSelector, tableSelector)), 
                         ui5.userInteraction.click(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector))]); 
    }
  }

  private async _getSortValudGridTable(selector: any, ancestor?: any) {
      const sortOrder = await ui5.element.getPropertyValue(selector, "sortOrder", ancestor); 
      const sorted = await ui5.element.getPropertyValue(selector, "sorted", ancestor);
      return sorted ? sortOrder : "";
  }
  
  private async _getSortIndicatorValue(name: string, tableSelector: any) {
    const vl = this.vlf.initLog(this._getSortIndicatorValue);
    const tableColumnSelector = {
      elementProperties: {
        metadata: "sap.m.Column"
      },
      descendantProperties: {
        text: name
      }
    };

    const tableGridColumnSelector = {
        elementProperties: {
            metadata: "sap.ui.table.Column"
        },
        descendantProperties: {
            text: name
        }
    };
    
    if (!tableSelector) {
      return Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator"), 
                          this._getSortValudGridTable(tableGridColumnSelector)]);
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`The usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      return Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator", tableSelector), 
                          this._getSortValudGridTable(tableGridColumnSelector, tableSelector)]);
    } else if (typeof tableSelector === "object") {
      const selector = this._prepareAncestorSelector(tableColumnSelector, tableSelector);
      return Promise.any([ui5.element.getPropertyValue(this._prepareAncestorSelector(tableColumnSelector, tableSelector), "sortIndicator"), 
                          this._getSortValudGridTable(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector))]);
    }
  }

  private _prepareAncestorSelector(selector: any, ancestorSelector: any) {
    const vl = this.vlf.initLog(this._prepareAncestorSelector);
    if ("elementProperties" in ancestorSelector) {
      selector.ancestorProperties = ancestorSelector.elementProperties;
    } else if (!("ancestorProperties" in selector)) {
      selector.ancestorProperties = {};
    }

    const keys = Object.keys(ancestorSelector);
    for (const key of keys) {
      if (key !== "elementProperties") {
        selector.ancestorProperties[key] = ancestorSelector[key];
      }
    }
    return selector;
  }
}
export default new Table();
