"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { Ui5Selector } from "./types/ui5.types";

/**
 * @class table
 * @memberof ui5
 */
export class Table {
  private vlf = new VerboseLoggerFactory("ui5", "table");
  private ErrorHandler = new ErrorHandler();

  // =================================== CONSTANTS ===================================
  private static readonly SMART_TABLE_METADATA = "sap.ui.comp.smarttable.SmartTable";
  private static readonly TABLE_METADATA = "sap.m.Table";
  private static readonly COLUMN_LIST_ITEM_METADATA = "sap.m.ColumnListItem";

  // =================================== SORTING ===================================
  /**
   * @function sortColumnAscending
   * @memberOf ui5.table
   * @description Sorts the given column "Ascending".
   * @param {String} columnName - The name of the column to sort.
   * @param {Ui5Selector} tableSelector - The selector describing the table element (in case there are more then one).
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
  async sortColumnAscending(columnName: string, tableSelector: Ui5Selector) {
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
      await Promise.any([ui5.userInteraction.click(oldSortButtonSelector), ui5.userInteraction.click(newSortButtonSelector), ui5.userInteraction.click(newerSortButtonSelector)]);
    }
  }

  /**
   * @function sortColumnDescending
   * @memberOf ui5.table
   * @description Sorts the given column "Descending".
   * @param {String} columnName The name of the column to sort.
   * @param {Ui5Selector} tableSelector - The selector describing the table element (in case there are more then one).
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
  async sortColumnDescending(columnName: string, tableSelector: Ui5Selector) {
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
      await Promise.any([ui5.userInteraction.click(oldSortButtonSelector), ui5.userInteraction.click(newSortButtonSelector), ui5.userInteraction.click(newerSortButtonSelector)]);
    }
  }

  // =================================== SETTINGS ===================================
  /**
   * @function clickSettingsButton
   * @memberOf ui5.table
   * @description Opens the user Settings.
   * @param {Ui5Selector} tableSelector - The selector describing the table element (in case there are more then one).
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
  async clickSettingsButton(tableSelector: Ui5Selector) {
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
   * @param {Ui5Selector | String} tableSelector - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
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
  async getTotalNumberOfRows(tableSelector: Ui5Selector | string): Promise<number> {
    this.vlf.initLog(this.getTotalNumberOfRows);
    const ancestorSelector = await this._resolveTableSelector(tableSelector);

    const tableTitleSelector = {
      elementProperties: {
        metadata: "sap.m.Title"
      },
      parentProperties: {
        metadata: "sap.m.OverflowToolbar",
        ancestorProperties: ancestorSelector.elementProperties
      }
    };

    const tableTitleText = await ui5.element.getPropertyValue(tableTitleSelector, "text");
    return this._extractRowCountFromTitle(tableTitleText);
  }

  /**
   * @function getTotalNumberOfRowsByValues
   * @memberOf ui5.table
   * @description Returns the total number of rows in the table that match the given values.
   * @param {Object | String} tableSelector - The selector or ID describing the outer smart table element.
   * @param {String | Array<String>} values - The value(s) to match in the table rows.
   * @param {Number} [index=0] - The index of the matching row to consider.
   * @returns {Number} The total number of matching rows in the table.
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * const numberOfRows = await ui5.table.getTotalNumberOfRowsByValues(selector, ["value1", "value2"]);
   * const numberOfRows = await ui5.table.getTotalNumberOfRowsByValues(selector, "value");

  **/
  async getTotalNumberOfRowsByValues(tableSelector: any, values: string | Array<string>): Promise<number> {
    this.vlf.initLog(this.getTotalNumberOfRowsByValues);
    const rowSelectors = await this.getSelectorsForRowsByValues(tableSelector, values);
    return rowSelectors.length;
  }

  /**
   * @function selectRowByIndex
   * @memberOf ui5.table
   * @description Selects a row in the table by its index.
   * @param {Ui5Selector | String} tableSelector - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @param {Number} index - The index of the row to select.
   * @example await ui5.table.selectRowByIndex("application-ReportingTask-run-component---ReportList--ReportingTable", 0);
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * await ui5.table.selectRowByIndex(selector, 0);
   */
  async selectRowByIndex(tableSelector: Ui5Selector | string, index: number) {
    this.vlf.initLog(this.selectRowByIndex);
    const ancestorSelector = await this._resolveTableSelector(tableSelector);

    const checkBoxSelector = {
      elementProperties: {
        metadata: "sap.m.CheckBox"
      },
      parentProperties: {
        metadata: Table.COLUMN_LIST_ITEM_METADATA,
        ancestorProperties: ancestorSelector.elementProperties
      }
    };

    await ui5.userInteraction.check(checkBoxSelector, index);
  }

  /**
   * @function openItemByIndex
   * @memberOf ui5.table
   * @description Opens the item in the table by its index.
   * @param {Object | String} tableSelector - The selector or ID describing the outer smart table element.
   * @param {Number} index - The index of the item to open.
   * @example const selector = {
   *  elementProperties: {
   *   viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *   metadata: "sap.ui.comp.smarttable.SmartTable",
   *   id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   * }
   * };
   * await ui5.table.openItemByIndex(selector, 0);
   * @example const id = "application-ReportingTask-run-component---ReportList--ReportingTable";
   * await ui5.table.openItemByIndex(id, 0);
   * @throws {Error} If the table selector is invalid or if the index is out of bounds.
   */
  async openItemByIndex(tableSelector: any, index: number) {
    this.vlf.initLog(this.openItemByIndex);
    const rowSelector = await this.getRowSelectorByIndex(tableSelector, index);
    await ui5.userInteraction.click(rowSelector);
  }

  /**
   * @function openItemByValues
   * @memberOf ui5.table
   * @description Opens the item in the table containing the given values. If multiple items match, it opens the index-th item.
   * @param {Object | String} tableSelector - The selector or ID describing the outer smart table element.
   * @param {String | Array<String>} values - The value(s) to match in the table rows.
   * @param {Number} [index=0] - The index of the matching row to consider.
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * await ui5.table.openItemByValues(selector, ["value1", "value2"]);
   *
   * const id = "application-ReportingTask-run-component---ReportList--ReportingTable";
   * await ui5.table.openItemByValues(id, "value");
   */
  async openItemByValues(tableSelector: any, values: string | Array<string>, index: number = 0) {
    this.vlf.initLog(this.openItemByValues);
    const rowSelectors = await this.getSelectorsForRowsByValues(tableSelector, values);
    if (rowSelectors.length === 0) {
      return this.ErrorHandler.logException(new Error(`No items found with the provided values: ${values}.`));
    } else if (rowSelectors.length <= index) {
      return this.ErrorHandler.logException(new Error(`The index ${index} is out of bounds. The number of matching items is ${rowSelectors.length}.`));
    } else {
      const rowSelector = rowSelectors[index];
      await ui5.userInteraction.click(rowSelector);
    }
  }

  /**
   * @function getRowsSelectorsByValues
   * @memberOf ui5.table
   * @description Gets the selectors of rows in the table that contain the given values. If multiple values are provided, it only returns the selectors of rows that contain all of them.
   * @param {Object | String} tableSelector - The selector or ID describing the outer smart table element.
   * @param {string} values - The value(s) to match in the table rows.
   * @example const id = "application-ReportingTask-run-component---ReportList--ReportingTable"
   * await ui5.table.getRowsSelectorsByValues(id, "February");
   *
   * const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * @example await ui5.table.getRowsSelectorsByValues(selector, ["January", "2022"]);
   */
  async getSelectorsForRowsByValues(tableSelector: any, values: string | Array<string>): Promise<object[]> {
    this.vlf.initLog(this.getSelectorsForRowsByValues);
    const tableId = await this._getId(tableSelector);
    const tableMetaData = await this._getTableMetadata(tableId);
    const selector = {
      elementProperties: {
        metadata: tableMetaData,
        id: tableId
      }
    };
    await ui5.element.waitForAll(selector); // TODO might not be needed => remove
    if (typeof values === "string") {
      values = [values];
    } else if (!Array.isArray(values)) {
      this.ErrorHandler.logException(new Error("Invalid values provided. It should be either a string or an array of strings."));
    }
    let browserCommand;
    try {
      browserCommand = ` //TODO use arrow function instead return
      return (function () {
          const table = sap.ui.getCore().getElementById("${tableId}");
          let items = [];
          if ("${Table.TABLE_METADATA}" === "${tableMetaData}" && table.getItems !== undefined) {
            items = table.getItems();
          } else if("${Table.SMART_TABLE_METADATA}" === "${tableMetaData}" && table.getTable !== undefined && table.getTable().getItems !== undefined) {
            items = table.getTable().getItems();
          } else {
            return undefined;
          }
          return items.filter(
            item => ${JSON.stringify(values)}.every(
              val => Object
              .values(item.getBindingContext().getObject()).includes(val)))
              .map(filteredItems => filteredItems.getId())
      })();`;
      const filteredRowIds = await util.browser.executeScript(browserCommand);
      const rowsSelectors = [];

      for (const id of filteredRowIds) {
        const columnListItemSelector = {
          elementProperties: {
            metadata: Table.COLUMN_LIST_ITEM_METADATA,
            id: id
          }
        };
        rowsSelectors.push(columnListItemSelector);
      }
      return rowsSelectors;
    } catch (error) {
      return this.ErrorHandler.logException(new Error(`Browser Command injected: ${browserCommand} was injected. ${error}`));
    }
  }

  /**
   * @function getRowSelectorByIndex
   * @memberOf ui5.table
   * @description Gets the selector of a row in the table by its index.
   * @param {Object | String} tableSelector - The selector or ID describing the outer smart table element.
   * @param {Number} index - The index of the item to open.
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * const rowSelector = await ui5.table.getRowSelectorByIndex(selector, 0);
   * @example id = "application-ReportingTask-run-component---ReportList--ReportingTable"
   * const rowSelector = await ui5.table.getRowSelectorByIndex(id, 0);
   */
  async getRowSelectorByIndex(tableSelector: any, index: number) {
    this.vlf.initLog(this.getRowSelectorByIndex);
    const tableId = await this._getId(tableSelector);
    const tableMetaData = await this._getTableMetadata(tableId);
    const selector = {
      elementProperties: {
        metadata: tableMetaData,
        id: tableId
      }
    };
    await ui5.element.waitForAll(selector); //TODO: might not be needed => remove
    let browserCommand;
    let columnListItemId;
    try {
      browserCommand = `
        return (function () {
          const table = sap.ui.getCore().getElementById("${tableId}");
          let items = [];
          if ("${Table.TABLE_METADATA}" === "${tableMetaData}" && table.getItems !== undefined) {
            items = table.getItems();
          } else if("${Table.SMART_TABLE_METADATA}" === "${tableMetaData}" && table.getTable !== undefined && table.getTable().getItems !== undefined) {
            items = table.getTable().getItems(); //TODO filter rows for getTitle and keep only the ones which have no title
          } else {
            return undefined;
          }
          if (!items || !items[${index}]) return undefined;
            const filteredItems = items.filter( item => item.getTitle === undefined)
            const item = filteredItems[${index}];
            return item?.getId?.();
        })();
      `;
      columnListItemId = await util.browser.executeScript(browserCommand);
    } catch (error) {
      return this.ErrorHandler.logException(new Error(`Browser Command injected: ${browserCommand} was injected. ${error}`));
    }
    if (!columnListItemId) {
      return this.ErrorHandler.logException(
        new Error(`No item found with index ${index}.
          Browser Command injected: ${browserCommand} was injected.`)
      );
    } else {
      const columnListItemSelector = {
        elementProperties: {
          metadata: Table.COLUMN_LIST_ITEM_METADATA,
          id: columnListItemId
        }
      };
      return columnListItemSelector;
    }
  }

  // =================================== HELPER ===================================
  private async _resolveTableSelector(tableSelector: Ui5Selector | string): Promise<Ui5Selector> {
    let constructedSelector: Ui5Selector;

    if (typeof tableSelector === "string") {
      // Check if passed element ID is for a SmartTable
      constructedSelector = {
        elementProperties: {
          metadata: Table.SMART_TABLE_METADATA,
          id: tableSelector
        }
      };
      if (await ui5.element.isVisible(constructedSelector)) return constructedSelector;

      // Check if passed element ID is for a Table
      constructedSelector = {
        elementProperties: {
          metadata: Table.TABLE_METADATA,
          id: tableSelector
        }
      };
      if (await ui5.element.isVisible(constructedSelector)) return constructedSelector;
    } else if (typeof tableSelector === "object" && "elementProperties" in tableSelector) {
      if (tableSelector.elementProperties.metadata === Table.TABLE_METADATA || tableSelector.elementProperties.metadata === Table.SMART_TABLE_METADATA) {
        return tableSelector;
      }
    }
    return this.ErrorHandler.logException(new Error(`The provided table selector "${tableSelector}" is not valid. Please provide a valid selector or ID for control type 'SmartTable' or 'Table'.`));
  }
  /**
   * @function _getId
   * @memberOf ui5.table
   * @description Returns the ID of the table element.
   * @param {Ui5Selector | String} tableSelector - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @returns {String} The ID of the table element.
   */
  private async _getId(tableSelector: any): Promise<string> {
    this.vlf.initLog(this._getId);
    if (typeof tableSelector === "string") {
      return tableSelector;
    } else {
      const resolvedTableSelector = await this._resolveTableSelector(tableSelector);
      return await ui5.element.getId(resolvedTableSelector);
    }
  }

  private async _getTableMetadata(tableId: string): Promise<string> {
    const vl = this.vlf.initLog(this._getTableMetadata);
    vl.log(`The table selector is a string: ${tableId}`);
    let browserCommand;

    try {
      browserCommand = `
        return (function () {
          const table = sap.ui.getCore().getElementById("${tableId}");
          return table.getMetadata().getName();
        })();
      `;
      const tableMetadata = await util.browser.executeScript(browserCommand);
      return tableMetadata;
    } catch (error) {
      throw new Error(`Browser Command injected: ${browserCommand} was injected: ${error}`);
    }
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

  private async _clickColumn(name: string, tableSelector: Ui5Selector) {
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
      await Promise.any([ui5.userInteraction.click(tableColumnSelector), ui5.userInteraction.click(tableGridColumnSelector)]);
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`Usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      await Promise.any([ui5.userInteraction.click(tableColumnSelector, tableSelector), ui5.userInteraction.click(tableGridColumnSelector, tableSelector)]);
    } else if (typeof tableSelector === "object") {
      await Promise.any([ui5.userInteraction.click(this._prepareAncestorSelector(tableColumnSelector, tableSelector)), ui5.userInteraction.click(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector))]);
    }
  }

  private async _getSortValudGridTable(selector: any, ancestor?: any) {
    const sortOrder = await ui5.element.getPropertyValue(selector, "sortOrder", ancestor);
    const sorted = await ui5.element.getPropertyValue(selector, "sorted", ancestor);
    return sorted ? sortOrder : "";
  }

  private async _getSortIndicatorValue(name: string, tableSelector: Ui5Selector) {
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
      return Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator"), this._getSortValudGridTable(tableGridColumnSelector)]);
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`The usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      return Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator", tableSelector), this._getSortValudGridTable(tableGridColumnSelector, tableSelector)]);
    } else if (typeof tableSelector === "object") {
      const selector = this._prepareAncestorSelector(tableColumnSelector, tableSelector);
      return Promise.any([ui5.element.getPropertyValue(this._prepareAncestorSelector(tableColumnSelector, tableSelector), "sortIndicator"), this._getSortValudGridTable(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector))]);
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
