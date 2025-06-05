"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { TableHelper } from "../../helper/tableHelper";
import { Ui5Selector, Ui5ControlMetadata } from "./types/ui5.types";

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
  private static readonly UI_TABLE_METADATA: Ui5ControlMetadata = "sap.ui.table.Table";
  private static readonly COLUMN_LIST_ITEM_METADATA: Ui5ControlMetadata = "sap.m.ColumnListItem";
  private static readonly TABLE_ROW_METADATA: Ui5ControlMetadata = "sap.ui.table.Row";

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

    const ancestorSelector = await Table._resolveTableSelectorOrId(tableSelectorOrId);

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
  async getTotalNumberOfRowsByValues(tableSelectorOrId: Ui5Selector | string, values: string | Array<string>, enableHighlighting: boolean): Promise<number> {
    this.vlf.initLog(this.getTotalNumberOfRowsByValues);

    const rowSelectors = await this.getSelectorsForRowsByValues(tableSelectorOrId, values, enableHighlighting);
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

    const ancestorSelector = await Table._resolveTableSelectorOrId(tableSelectorOrId);

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
  async openItemByValues(tableSelectorOrId: Ui5Selector | string, values: string | Array<string>, index: number = 0, enableHighlighting: boolean) {
    this.vlf.initLog(this.openItemByValues);

    const rowSelectors = await this.getSelectorsForRowsByValues(tableSelectorOrId, values, enableHighlighting);
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
  async getSelectorsForRowsByValues(tableSelector: Ui5Selector | string, values: string | Array<string>, enableHighlighting: boolean = true): Promise<Array<Ui5Selector>> {
    this.vlf.initLog(this.getSelectorsForRowsByValues);

    if (typeof values === "string") {
      values = [values];
    } else if (!Array.isArray(values)) {
      this.ErrorHandler.logException(new Error("Invalid values provided. It should be either a string or an array of strings."));
    }

    const constructedTableSelector = await this._constructTableSelector(tableSelector);
    const tableMetadata = constructedTableSelector.elementProperties.metadata;
    const classCode = TableHelper.serializeClass();
    let filteredRowIds = null;
    const supportedTablesMetadata = [Table.SMART_TABLE_METADATA, Table.TABLE_METADATA, Table.UI_TABLE_METADATA];
    try {
      // =========================== BROWSER COMMAND ===========================
      const browserCommand = `
         ${classCode}
          const table = TableHelper.filterTableByMetadata(${constructedTableSelector.elementProperties}, ${tableMetadata}, ${JSON.stringify(supportedTablesMetadata)});
          const items = TableHelper.getItems(table);
          return await TableHelper.getIdsForItemsByCellValues(items, ${JSON.stringify(values)}, ${enableHighlighting});
        `;
      filteredRowIds = await util.browser.executeScript(browserCommand);
      // ========================================================================
    } catch (error) {
      return this.ErrorHandler.logException(new Error(`Error while executing browser command: ${error}`));
    }
    if (filteredRowIds && filteredRowIds.length > 0) {
      return this._constructRowSelector(filteredRowIds, tableMetadata);
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
    let filteredRowId: string;
    const tableMetadata = constructedTableSelector.elementProperties.metadata;
    const classCode = TableHelper.serializeClass();
    const supportedTablesMetadata = [Table.SMART_TABLE_METADATA, Table.TABLE_METADATA, Table.UI_TABLE_METADATA];

    try {
      // =========================== BROWSER COMMAND ===========================
      filteredRowId = await util.browser.executeScript(
        `
          ${classCode}
          const table = TableHelper.filterTableByMetadata(${constructedTableSelector.elementProperties}, ${tableMetadata}, ${JSON.stringify(supportedTablesMetadata)});
          const items = TableHelper.getItems(table);

          if (!items || !items[${index}]) return null;

          const filteredItems = TableHelper.filterItemsWithoutTitle(items); 
          const item = filteredItems[${index}];

          return item?.getId?.();
        `
      );
      // ========================================================================
    } catch (error) {
      return this.ErrorHandler.logException(new Error(`Error while executing browser command: ${error}`));
    }

    if (!filteredRowId) {
      return this.ErrorHandler.logException(new Error(`No item found with index ${index}.`));
    }
    const rowSelector = this._constructRowSelector([filteredRowId], tableMetadata);
    return rowSelector[0]; // Return the first selector as we expect only one row to match the index
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

    const parentSelector = await Table._resolveTableSelectorOrId(tableSelectorOrId);

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
    const ancestorSelector = await Table._resolveTableSelectorOrId(tableSelectorOrId);

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

    const parentSelector = await Table._resolveTableSelectorOrId(tableSelectorOrId);

    const checkBoxSelector = {
      elementProperties: {
        metadata: "sap.m.CheckBox"
      },
      parentProperties: parentSelector.elementProperties
    };

    await ui5.userInteraction.uncheck(checkBoxSelector);
  }

  // =================================== HELPER ===================================
  private static async _resolveTableSelectorOrId(tableSelectorOrId: Ui5Selector | string): Promise<Ui5Selector> {
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
        },
        {
          elementProperties: {
            metadata: Table.UI_TABLE_METADATA,
            id: tableSelectorOrId
          }
        }
      ];

      try {
        const index = await Promise.any(
          selectors.map(async (selectors, index) => {
            return await ui5.element.getDisplayed(selectors).then(() => index);
          })
        );
        return selectors[index];
      } catch (error) {
        // Intentionally left empty, as the error is handled below
      }
    } else if (typeof tableSelectorOrId === "object" && "elementProperties" in tableSelectorOrId) {
      if (tableSelectorOrId.elementProperties.metadata === Table.TABLE_METADATA || tableSelectorOrId.elementProperties.metadata === Table.SMART_TABLE_METADATA || tableSelectorOrId.elementProperties.metadata === Table.UI_TABLE_METADATA) {
        return tableSelectorOrId;
      }
    }

    throw new Error(`The provided table selector "${tableSelectorOrId}" is not valid. Please provide a valid selector or ID for control type 'SmartTable' or 'Table'.`);
  }

  private static async _getId(tableSelectorOrId: Ui5Selector | string): Promise<string> {
    if (typeof tableSelectorOrId === "string") {
      return tableSelectorOrId;
    } else {
      const resolvedTableSelectorOrId = await Table._resolveTableSelectorOrId(tableSelectorOrId);
      return await ui5.element.getId(resolvedTableSelectorOrId);
    }
  }

  async _getTableMetadata(tableId: string): Promise<Ui5ControlMetadata> {
    try {
      // =========================== BROWSER COMMAND ===========================
      const classCode = TableHelper.serializeClass();
      const tableMetadata = await util.browser.executeScript(`
        ${classCode}
        return TableHelper.getTableMetadata("${tableId}");
      `);
      return tableMetadata;
    } catch (error) {
      throw new Error(`Error while executing browser command: ${error}`);
    }
  }

  private async _constructTableSelector(tableSelector: Ui5Selector | string): Promise<Ui5Selector> {
    const tableId = await Table._getId(tableSelector);
    const tableMetaData: Ui5ControlMetadata = await this._getTableMetadata(tableId);
    const selector: Ui5Selector = {
      elementProperties: {
        metadata: tableMetaData,
        id: tableId
      }
    };
    await ui5.element.waitForAll(selector);
    return selector;
  }

  private _constructRowSelector(filteredRowIds: Array<string>, tableMetadata: Ui5ControlMetadata): Array<Ui5Selector> {
    const rowsSelectors: Array<Ui5Selector> = [];
    const rowMetadata = this._getRowMetadataByTableMetadata(tableMetadata);
    for (const id of filteredRowIds) {
      const columnListItemSelector = {
        elementProperties: {
          metadata: rowMetadata,
          id: id
        }
      };
      rowsSelectors.push(columnListItemSelector);
    }
    return rowsSelectors;
  }

  private _getRowMetadataByTableMetadata(tableMetadata: Ui5ControlMetadata): Ui5ControlMetadata {
    if (tableMetadata === Table.TABLE_METADATA || tableMetadata === Table.SMART_TABLE_METADATA) {
      return Table.COLUMN_LIST_ITEM_METADATA;
    } else {
      return Table.TABLE_ROW_METADATA;
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

  private async _getSortValueGridTable(selector: any, ancestor?: any) {
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
      return Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator"), this._getSortValueGridTable(tableGridColumnSelector)]);
    }
    if (typeof tableSelector == "number") {
      util.console.warn(`The usage of argument 'index' in function ${arguments.callee.caller.name} is deprecated. Please pass a valid table selector instead.`);
      return Promise.any([ui5.element.getPropertyValue(tableColumnSelector, "sortIndicator", tableSelector), this._getSortValueGridTable(tableGridColumnSelector, tableSelector)]);
    } else if (typeof tableSelector === "object") {
      const selector = this._prepareAncestorSelector(tableColumnSelector, tableSelector);
      return Promise.any([ui5.element.getPropertyValue(this._prepareAncestorSelector(tableColumnSelector, tableSelector), "sortIndicator"), this._getSortValueGridTable(this._prepareAncestorSelector(tableGridColumnSelector, tableSelector))]);
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
