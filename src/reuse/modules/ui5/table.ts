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
   * @param {String} columnName The name of the column to sort.
   * @param {Number} [index=0] - The index of the sort icon selector (in case there are more than one elements visible at the same time). 
   * @example await ui5.table.sortColumnAscending("Supplier");
   */
  async sortColumnAscending (columnName: string, index = 0) {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "icon": "sap-icon://sort-ascending"
      },
      "ancestorProperties": {
        "metadata": "sap.m.Toolbar"
      }
    };
    if (await this._getSortIndicatorValue(columnName, index) !== "Ascending") {
      await this._clickColumn(columnName, index);
      await ui5.userInteraction.click(selector);
    }
  };

  /**
   * @function sortColumnDescending
   * @memberOf ui5.table
   * @description Sorts the given column "Descending".
   * @param {String} columnName The name of the column to sort.
   * @param {Number} [index=0] - The index of the sort icon selector (in case there are more than one elements visible at the same time). 
   * @example await ui5.table.sortColumnDescending("Supplier");
   */
  async sortColumnDescending (columnName: string, index = 0) {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "icon": "sap-icon://sort-descending"
      },
      "ancestorProperties": {
        "metadata": "sap.m.Toolbar"
      }
    };
    if (await this._getSortIndicatorValue(columnName, index) !== "Descending") {
      await this._clickColumn(columnName, index);
      await ui5.userInteraction.click(selector);
    }
  };


  // =================================== HELPER ===================================
  private async _clickColumn(name: string, index: number) {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.Column"
      },
      "descendantProperties": {
        "text": name
      }
    };
    await ui5.userInteraction.click(selector, index);
  }

  private async _getSortIndicatorValue(name: string, index: number) {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.Column"
      },
      "descendantProperties": {
        "text": name
      }
    };
    return ui5.element.getPropertyValue(selector, "sortIndicator", index);
  }
  
};
export default new Table();
