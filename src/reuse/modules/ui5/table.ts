"use strict";
/**
 * @class table
 * @memberof ui5
 */
export class Table {

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
  async sortColumnAscending (columnName: string, tableSelector: any) {
    const sortButtonSelector = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "icon": "sap-icon://sort-ascending"
      },
      "ancestorProperties": {
        "metadata": "sap.m.Toolbar"
      }
    };
    const sort = await this._getSortIndicatorValue(columnName, tableSelector);
    if (sort !== "Ascending") {
      this._clickColumn(columnName, tableSelector);
      await ui5.userInteraction.click(sortButtonSelector);
    }
  };

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
   async sortColumnDescending (columnName: string, tableSelector: any) {
    const sortButtonSelector = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "icon": "sap-icon://sort-descending"
      },
      "ancestorProperties": {
        "metadata": "sap.m.Toolbar"
      }
    };
    const sort = await this._getSortIndicatorValue(columnName, tableSelector);
    if (sort !== "Descending") {
      this._clickColumn(columnName, tableSelector);
      await ui5.userInteraction.click(sortButtonSelector);
    }
  };

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
   async clickSettingsButton (tableSelector: any) {
    const settingsButtonSelector = {
      "elementProperties": {
        "metadata": "sap.m.OverflowToolbarButton",
        "id": "*btnPersonalisation"
      }
    };
    if (!tableSelector) {
      await ui5.userInteraction.click(settingsButtonSelector);
    } else {
      const selector = this._prepareAncestorSelector(settingsButtonSelector, tableSelector);
      await ui5.userInteraction.click(selector);
    }
  };


  // =================================== HELPER ===================================
  private async _clickColumn(name: string, tableSelector: any) {
    const tableColumnSelector = {
      "elementProperties": {
        "metadata": "sap.m.Column"
      },
      "descendantProperties": {
        "text": name
      }
    };

    if (!tableSelector) {
      await ui5.userInteraction.click(tableColumnSelector);
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`Usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      await ui5.userInteraction.click(tableColumnSelector, tableSelector);
    } else if (typeof tableSelector === "object") {
      const selector = this._prepareAncestorSelector(tableColumnSelector, tableSelector);
      await ui5.userInteraction.click(selector);
    }
  }

  private async _getSortIndicatorValue(name: string, tableSelector: any) {
    const tableColumnSelector = {
      "elementProperties": {
        "metadata": "sap.m.Column"
      },
      "descendantProperties": {
        "text": name
      }
    };

    if (!tableSelector) {
      return ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator");
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`The usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      return ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator", tableSelector);
    } else if (typeof tableSelector === "object") {
      const selector = this._prepareAncestorSelector(tableColumnSelector, tableSelector);
      return ui5.element.getPropertyValue(selector, "sortIndicator");
    }
  }

  private _prepareAncestorSelector (selector: any, ancestorSelector: any) {
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
  
};
export default new Table();
