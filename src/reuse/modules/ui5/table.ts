"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class table
 * @memberof ui5
 */
export class Table {
  private vlf = new VerboseLoggerFactory("ui5", "table");
  private ErrorHandler = new ErrorHandler();

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
  async sortColumnAscending(columnName: string, tableSelector: any, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const oldSortButtonSelector = {
      elementProperties: {
        metadata: "sap.m.Button",
        icon: "sap-icon://sort-ascending"
      },
      ancestorProperties: {
        metadata: "sap.m.Toolbar"
      }
    };
    const newSortButtonSelector = {
      elementProperties: {
        metadata: "sap.m.ToggleButton",
        text: "Ascending"
      }
    };
    const newerSortButtonSelector = {
      elementProperties: {
        metadata: "sap.ui.core.Icon",
        src: "sap-icon://sort-ascending"
      },
      ancestorProperties: {
        metadata: "sap.m.InputListItem"
      }
    };
    const sort = await this._getSortIndicatorValue(columnName, tableSelector);
    if (sort !== "Ascending") {
      this._clickColumn(columnName, tableSelector);
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([ui5.userInteraction.click(oldSortButtonSelector,0,0), ui5.userInteraction.click(newSortButtonSelector,0,0), ui5.userInteraction.click(newerSortButtonSelector,0,0)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort button not clickable",
          interval: 10
        }
      );
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
  async sortColumnDescending(columnName: string, tableSelector: any, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000){
    const oldSortButtonSelector = {
      elementProperties: {
        metadata: "sap.m.Button",
        icon: "sap-icon://sort-descending"
      },
      ancestorProperties: {
        metadata: "sap.m.Toolbar"
      }
    };
    const newSortButtonSelector = {
      elementProperties: {
        metadata: "sap.m.ToggleButton",
        text: "Descending"
      }
    };
    const newerSortButtonSelector = {
      elementProperties: {
        metadata: "sap.ui.core.Icon",
        src: "sap-icon://sort-descending"
      },
      ancestorProperties: {
        metadata: "sap.m.InputListItem"
      }
    };
    const sort = await this._getSortIndicatorValue(columnName, tableSelector);
    if (sort !== "Descending") {
      this._clickColumn(columnName, tableSelector);
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([ui5.userInteraction.click(oldSortButtonSelector,0,0), ui5.userInteraction.click(newSortButtonSelector,0,0), ui5.userInteraction.click(newerSortButtonSelector,0,0)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort button not clickable",
          interval: 10
        }
      );
    }
  }

  // =================================== SETTINGS ===================================
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

  // =================================== OPERATIONS ===================================
  /**
   * @function getTotalNumberOfRows
   * @memberOf ui5.table
   * @description Returns the total number of rows in the table.
   * @param {Object | String} [tableSelector] - The selector or ID describing the outer smart table element.
   * @returns {Number} The total number of rows in the table.
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *   id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * const numberOfRows = await ui5.table.getTotalNumberOfRows(selector);
   */
  async getTotalNumberOfRows(tableSelector: object | string): Promise<number> {
    this.vlf.initLog(this.getTotalNumberOfRows);
    const smartTableSelector = this._resolveTableSelector(tableSelector);

    const tableTitleSelector = {
      elementProperties: {
        metadata: "sap.m.Title"
      },
      parentProperties: {
        metadata: "sap.m.OverflowToolbar",
        ancestorProperties: smartTableSelector
      }
    };

    const tableTitleText = await ui5.element.getPropertyValue(tableTitleSelector, "text");
    return this._extractRowCountFromTitle(tableTitleText);
  }

  // =================================== HELPER ===================================
  private _resolveTableSelector(tableSelector: string | object) {
    let smartTableSelector;

    if (typeof tableSelector === "string") {
      smartTableSelector = {
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: tableSelector
      };
    } else if (typeof tableSelector === "object") {
      smartTableSelector = tableSelector;
    } else {
      throw new Error("Invalid table selector provided. It should be either a string or an object (Qmate selector).");
    }

    return smartTableSelector;
  }

  private _extractRowCountFromTitle(title: string): number {
    const vl = this.vlf.initLog(this._extractRowCountFromTitle);

    const match = title.match(/\((\d+)\)/);
    if (match) {
      return parseInt(match[1], 10);
    } else {
      vl.log(`Extracting row count from title was not successful, returning 0.`);
      return 0;
    }
  }

  private async _clickColumn(name: string, tableSelector: any, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
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
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([ui5.userInteraction.click(tableColumnSelector,0,0), ui5.userInteraction.click(tableGridColumnSelector,0,0)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Column not clickable",
          interval: 10
        }
      );
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`Usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([ui5.userInteraction.click(tableColumnSelector, tableSelector, 0), ui5.userInteraction.click(tableGridColumnSelector, tableSelector, 0)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Column not clickable",
          interval: 10
        }
      );
    } else if (typeof tableSelector === "object") {
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([ui5.userInteraction.click(this._prepareAncestorSelector(tableColumnSelector, tableSelector),0), ui5.userInteraction.click(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector),0)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Column not clickable",
          interval: 10
        }
      );
    }
  }

  private async _getSortValudGridTable(selector: any, ancestor?: any) {
    const sortOrder = await ui5.element.getPropertyValue(selector, "sortOrder", ancestor,0);
    const sorted = await ui5.element.getPropertyValue(selector, "sorted", ancestor,0);
    return sorted ? sortOrder : "";
  }

  private async _getSortIndicatorValue(name: string, tableSelector: any, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
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

    let sortIndicator;
    if (!tableSelector) {
      await browser.waitUntil(
        async () => {
          try {
            sortIndicator = await Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator",0,0), this._getSortValudGridTable(tableGridColumnSelector)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort indicator not found",
          interval: 10
        }
      );
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`The usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      await browser.waitUntil(
        async () => {
          try {
            sortIndicator = await Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator", tableSelector, 0), this._getSortValudGridTable(tableGridColumnSelector, tableSelector)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort indicator not found",
          interval: 10
        }
      );
    } else if (typeof tableSelector === "object") {
      const selector = this._prepareAncestorSelector(tableColumnSelector, tableSelector);
      await browser.waitUntil(
        async () => {
          try {
            sortIndicator = await Promise.any([ui5.element.getPropertyValue(this._prepareAncestorSelector(tableColumnSelector, tableSelector), "sortIndicator",0,0), this._getSortValudGridTable(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector), undefined)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort indicator not found",
          interval: 10
        }
      );
    }
    return sortIndicator;
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
