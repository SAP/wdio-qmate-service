"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { Ui5Selector, Ui5ControlMetadata } from "./types/ui5.types";
import { GLOBAL_DEFAULT_WAIT_INTERVAL, GLOBAL_DEFAULT_WAIT_TIMEOUT } from "../constants";

/**
 * @class table
 * @memberof ui5
 */
export class Table {
  private vlf = new VerboseLoggerFactory("ui5", "table");
  private ErrorHandler = new ErrorHandler();

  // =================================== CONSTANTS ===================================
  private static readonly SMART_TABLE_METADATA: Ui5ControlMetadata = "sap.ui.comp.smarttable.SmartTable";
  private static readonly TABLE_METADATA: Ui5ControlMetadata = "sap.m.Table";
  private static readonly COLUMN_LIST_ITEM_METADATA: Ui5ControlMetadata = "sap.m.ColumnListItem";

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
  async sortColumnAscending(columnName: string, tableSelector: Ui5Selector, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT) {
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
      await this._clickColumn(columnName, tableSelector);
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([ui5.userInteraction.click(oldSortButtonSelector, 0, 500), ui5.userInteraction.click(newSortButtonSelector, 0, 500), ui5.userInteraction.click(newerSortButtonSelector, 0, 500)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort button not clickable",
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
        }
      );
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
  async sortColumnDescending(columnName: string, tableSelector: Ui5Selector, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT) {
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
      await this._clickColumn(columnName, tableSelector);
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([ui5.userInteraction.click(oldSortButtonSelector, 0, 500), ui5.userInteraction.click(newSortButtonSelector, 0, 500), ui5.userInteraction.click(newerSortButtonSelector, 0, 500)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort button not clickable",
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
        }
      );
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
    this.vlf.initLog(this.clickSettingsButton);

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
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
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
  async getTotalNumberOfRows(tableSelectorOrId: Ui5Selector | string): Promise<number> {
    this.vlf.initLog(this.getTotalNumberOfRows);

    const ancestorSelector = await this._resolveTableSelectorOrId(tableSelectorOrId);

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
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
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
  async getTotalNumberOfRowsByValues(tableSelectorOrId: Ui5Selector | string, values: string | Array<string>): Promise<number> {
    this.vlf.initLog(this.getTotalNumberOfRowsByValues);

    const rowSelectors = await this.getSelectorsForRowsByValues(tableSelectorOrId, values);
    return rowSelectors.length;
  }

  /**
   * @function selectRowByIndex
   * @memberOf ui5.table
   * @description Selects a row in the table by its index.
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @param {Number} index - The index of the row to select.
   * @example await ui5.table.selectRowByIndex("application-ReportingTask-run-component---ReportList--ReportingTable", 0);
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * await ui5.table.selectRowByIndex(selector, 0);
   */
  async selectRowByIndex(tableSelectorOrId: Ui5Selector | string, index: number) {
    this.vlf.initLog(this.selectRowByIndex);

    const ancestorSelector = await this._resolveTableSelectorOrId(tableSelectorOrId);

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
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @param {Number} index - The index of the item to open.
   * @example const selector = {
   *  elementProperties: {
   *   viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *   metadata: "sap.ui.comp.smarttable.SmartTable",
   *   id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * await ui5.table.openItemByIndex(selector, 0);
   * @example const id = "application-ReportingTask-run-component---ReportList--ReportingTable";
   * await ui5.table.openItemByIndex(id, 0);
   */
  async openItemByIndex(tableSelectorOrId: Ui5Selector | string, index: number) {
    this.vlf.initLog(this.openItemByIndex);

    const rowSelector = await this.getSelectorForRowByIndex(tableSelectorOrId, index);
    await ui5.userInteraction.click(rowSelector);
  }

  /**
   * @function openItemByValues
   * @memberOf ui5.table
   * @description Opens the item in the table containing the given values. If multiple items match, it opens the index-th item.
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
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
   * @example const id = "application-ReportingTask-run-component---ReportList--ReportingTable";
   * await ui5.table.openItemByValues(id, "value");
   */
  async openItemByValues(tableSelectorOrId: Ui5Selector | string, values: string | Array<string>, index: number = 0) {
    this.vlf.initLog(this.openItemByValues);

    const rowSelectors = await this.getSelectorsForRowsByValues(tableSelectorOrId, values);
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
   * @function getSelectorsForRowsByValues
   * @memberOf ui5.table
   * @description Gets the selectors of rows in the table that contain the given values. If multiple values are provided, it only returns the selectors of rows that contain all of them.
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @param {string} values - The value(s) to match in the table rows.
   * @example const id = "application-ReportingTask-run-component---ReportList--ReportingTable"
   * await ui5.table.getSelectorsForRowsByValues(id, "February");
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * await ui5.table.getSelectorsForRowsByValues(selector, ["January", "2022"]);
   */
  async getSelectorsForRowsByValues(tableSelector: Ui5Selector | string, values: string | Array<string>): Promise<Array<Ui5Selector>> {
    this.vlf.initLog(this.getSelectorsForRowsByValues);

    if (typeof values === "string") {
      values = [values];
    } else if (!Array.isArray(values)) {
      this.ErrorHandler.logException(new Error("Invalid values provided. It should be either a string or an array of strings."));
    }

    const constructedTableSelector = await this._constructTableSelector(tableSelector);
    let filteredRowIds;

    try {
      // =========================== BROWSER COMMAND ===========================
      filteredRowIds = await util.browser.executeScript(
        (constructedTableSelector: Ui5Selector, values: Array<string>, tableMetadata: Ui5ControlMetadata, smartTableMetadata: Ui5ControlMetadata) => {
          const table = sap.ui.getCore().getElementById(constructedTableSelector.elementProperties?.id);
          let items = [];

          if (tableMetadata === constructedTableSelector.elementProperties.metadata && table.getItems !== undefined) {
            items = table.getItems();
          } else if (tableMetadata === constructedTableSelector.elementProperties.metadata && table.getRows !== undefined) {
            items = table.getRows();
          } else if (smartTableMetadata === constructedTableSelector.elementProperties.metadata && table.getTable !== undefined && table.getTable().getItems !== undefined) {
            items = table.getTable().getItems();
          } else {
            return undefined;
          }

          return items.filter((item: any) => values.every((val) => Object.values(item.getBindingContext().getObject()).includes(val))).map((filteredItems: any) => filteredItems.getId());
        },
        constructedTableSelector,
        values,
        Table.TABLE_METADATA,
        Table.SMART_TABLE_METADATA
      );
      // ========================================================================
    } catch (error) {
      return this.ErrorHandler.logException(new Error(`Error while executing browser command: ${error}`));
    }

    if (filteredRowIds && filteredRowIds.length > 0) {
      const rowsSelectors: Array<Ui5Selector> = [];

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
    } else {
      return [];
    }
  }

  /**
   * @function getSelectorForRowByIndex
   * @memberOf ui5.table
   * @description Gets the selector of a row in the table by its index.
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @param {Number} index - The index of the item to open.
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * const rowSelector = await ui5.table.getSelectorForRowByIndex(selector, 0);
   * @example id = "application-ReportingTask-run-component---ReportList--ReportingTable"
   * const rowSelector = await ui5.table.getSelectorForRowByIndex(id, 0);
   */
  async getSelectorForRowByIndex(tableSelector: any, index: number): Promise<Ui5Selector> {
    this.vlf.initLog(this.getSelectorForRowByIndex);

    const constructedTableSelector = await this._constructTableSelector(tableSelector);
    let columnListItemId;

    try {
      // =========================== BROWSER COMMAND ===========================
      columnListItemId = await util.browser.executeScript(
        (constructedTableSelector: Ui5Selector, index: number, tableMetadata: Ui5ControlMetadata, smartTableMetadata: Ui5ControlMetadata) => {
          const table = sap.ui.getCore().getElementById(constructedTableSelector.elementProperties?.id);
          let items = [];

          if (tableMetadata === constructedTableSelector.elementProperties.metadata && table.getItems !== undefined) {
            items = table.getItems();
          } else if (tableMetadata === constructedTableSelector.elementProperties.metadata && table.getRows !== undefined) {
            items = table.getRows();
          } else if (smartTableMetadata === constructedTableSelector.elementProperties.metadata && table.getTable !== undefined && table.getTable().getItems !== undefined) {
            items = table.getTable().getItems();
          }

          if (!items || !items[index]) return undefined;

          // Filter items with undefined or empty title since titles in rows/columnListItems are only used for dividers of grouped items
          const filteredItems = items.filter((item: any) => item.getTitle === undefined || item.getTitle() === "");
          const item = filteredItems[index];

          return item?.getId?.();
        },
        constructedTableSelector,
        index,
        Table.TABLE_METADATA,
        Table.SMART_TABLE_METADATA
      );
      // ========================================================================
    } catch (error) {
      return this.ErrorHandler.logException(new Error(`Error while executing browser command: ${error}`));
    }

    if (!columnListItemId) {
      return this.ErrorHandler.logException(new Error(`No item found with index ${index}.`));
    }

    const columnListItemSelector: Ui5Selector = {
      elementProperties: {
        metadata: Table.COLUMN_LIST_ITEM_METADATA,
        id: columnListItemId
      }
    };
    return columnListItemSelector;
  }

  /**
   * @function selectAllRows
   * @memberOf ui5.table
   * @description Selects all rows in the table.
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @example await ui5.table.selectAllRows("application-ReportingTask-run-component---ReportList--ReportingTable");
   * await ui5.table.selectAllRows(selector);
   */
  async selectAllRows(tableSelectorOrId: Ui5Selector | string) {
    this.vlf.initLog(this.selectAllRows);

    const parentSelector = await this._resolveTableSelectorOrId(tableSelectorOrId);

    const checkBoxSelector = {
      elementProperties: {
        metadata: "sap.m.CheckBox"
      },
      parentProperties: parentSelector.elementProperties
    };

    await ui5.userInteraction.check(checkBoxSelector);
  }

  /**
   * @function deselectRowByIndex
   * @memberOf ui5.table
   * @description Deselects a row in the table by its index.
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *   id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * await ui5.table.deselectRowByIndex(selector, 0);
   * @example const id = "application-ReportingTask-run-component---ReportList--ReportingTable";
   * await ui5.table.deselectRowByIndex(id, 0);
   */
  async deselectRowByIndex(tableSelectorOrId: Ui5Selector | string, index: number) {
    this.vlf.initLog(this.selectRowByIndex);
    const ancestorSelector = await this._resolveTableSelectorOrId(tableSelectorOrId);

    const checkBoxSelector = {
      elementProperties: {
        metadata: "sap.m.CheckBox"
      },
      parentProperties: {
        metadata: "sap.m.ColumnListItem",
        ancestorProperties: ancestorSelector.elementProperties
      }
    };

    await ui5.userInteraction.uncheck(checkBoxSelector, index);
  }

  /**
   * @function deselectAllRows
   * @memberOf ui5.table
   * @description Deselects all rows in the table.
   * @param {Ui5Selector | String} tableSelectorOrId - The selector or ID describing the table (sap.m.Table | sap.ui.comp.smarttable.SmartTable).
   * @example await ui5.table.deselectAllRows("application-ReportingTask-run-component---ReportList--ReportingTable");
   * @example const selector = {
   *  elementProperties: {
   *    viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
   *    metadata: "sap.ui.comp.smarttable.SmartTable",
   *    id: "application-ReportingTask-run-component---ReportList--ReportingTable"
   *  }
   * };
   * await ui5.table.deselectAllRows(selector);
   */
  async deselectAllRows(tableSelectorOrId: Ui5Selector | string) {
    this.vlf.initLog(this.selectAllRows);

    const parentSelector = await this._resolveTableSelectorOrId(tableSelectorOrId);

    const checkBoxSelector = {
      elementProperties: {
        metadata: "sap.m.CheckBox"
      },
      parentProperties: parentSelector.elementProperties
    };

    await ui5.userInteraction.uncheck(checkBoxSelector);
  }

  // =================================== HELPER ===================================
  private async _resolveTableSelectorOrId(tableSelectorOrId: Ui5Selector | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<Ui5Selector> {
    if (typeof tableSelectorOrId === "string") {
      const selectors: Array<Ui5Selector> = [
        {
          elementProperties: {
            metadata: Table.SMART_TABLE_METADATA,
            id: tableSelectorOrId
          }
        },
        {
          elementProperties: {
            metadata: Table.TABLE_METADATA,
            id: tableSelectorOrId
          }
        }
      ];

      try {
        let index: number = -1;
        await browser.waitUntil(
          async () => {
            try {
              index = await Promise.any(
                selectors.map(async (selectors, index) => {
                  return await ui5.element.getDisplayed(selectors, 0, 500).then(() => index);
                })
              );
              return true;
            } catch (error) {
              // Ignore error and continue to next promise
              return false;
            }
          },
          {
            timeout: timeout,
            timeoutMsg: "Table could not be resolved",
            interval: GLOBAL_DEFAULT_WAIT_INTERVAL
          }
        );
        return selectors[index];
      } catch (error) {
        // Intentionally left empty, as the error is handled below
      }
    } else if (typeof tableSelectorOrId === "object" && "elementProperties" in tableSelectorOrId) {
      if (tableSelectorOrId.elementProperties.metadata === Table.TABLE_METADATA || tableSelectorOrId.elementProperties.metadata === Table.SMART_TABLE_METADATA) {
        return tableSelectorOrId;
      }
    }

    throw new Error(`The provided table selector "${tableSelectorOrId}" is not valid. Please provide a valid selector or ID for control type 'SmartTable' or 'Table'.`);
  }

  private async _getId(tableSelectorOrId: Ui5Selector | string): Promise<string> {
    this.vlf.initLog(this._getId);

    if (typeof tableSelectorOrId === "string") {
      return tableSelectorOrId;
    } else {
      const resolvedTableSelectorOrId = await this._resolveTableSelectorOrId(tableSelectorOrId);
      return await ui5.element.getId(resolvedTableSelectorOrId);
    }
  }

  private async _getTableMetadata(tableId: string): Promise<Ui5ControlMetadata> {
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
      throw new Error(`Browser Command: ${browserCommand} failed with: ${error}`);
    }
  }

  private async _constructTableSelector(tableSelector: Ui5Selector | string): Promise<Ui5Selector> {
    this.vlf.initLog(this._constructTableSelector);

    const tableId = await this._getId(tableSelector);
    const tableMetaData = await this._getTableMetadata(tableId);
    const selector: Ui5Selector = {
      elementProperties: {
        metadata: tableMetaData,
        id: tableId
      }
    };
    await ui5.element.waitForAll(selector);
    return selector;
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

  private async _clickColumn(name: string, tableSelector: Ui5Selector, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT) {
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
            await Promise.any([ui5.userInteraction.click(tableColumnSelector, 0, 500), ui5.userInteraction.click(tableGridColumnSelector, 0, 500)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Column not clickable",
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
        }
      );
    } else if (typeof tableSelector === "object") {
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([ui5.userInteraction.click(this._prepareAncestorSelector(tableColumnSelector, tableSelector), 0, 500), ui5.userInteraction.click(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector), 0, 500)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Column not clickable",
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
        }
      );
    }
  }

  private async _getSortValueGridTable(selector: any, ancestor?: any) {
    const sortOrder = await ui5.element.getPropertyValue(selector, "sortOrder", ancestor, 500);
    const sorted = await ui5.element.getPropertyValue(selector, "sorted", ancestor, 500);
    return sorted ? sortOrder : "";
  }

  private async _getSortIndicatorValue(name: string, tableSelector: Ui5Selector, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT) {
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
            sortIndicator = await Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator", 0, 500), this._getSortValueGridTable(tableGridColumnSelector)]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort indicator not found",
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
        }
      );
    } else if (typeof tableSelector === "object") {
      const selector = this._prepareAncestorSelector(tableColumnSelector, tableSelector);
      await browser.waitUntil(
        async () => {
          try {
            sortIndicator = await Promise.any([ui5.element.getPropertyValue(this._prepareAncestorSelector(tableColumnSelector, tableSelector), "sortIndicator", 0, 500), this._getSortValueGridTable(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector))]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "Sort indicator not found",
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
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
