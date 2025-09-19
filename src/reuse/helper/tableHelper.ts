import { Ui5ControlMetadata } from "../modules/ui5/types/ui5.types";

export class TableHelper {
  static getTable(tableId: string): any {
    return sap.ui.getCore().getElementById(tableId);
  }

  static filterTableByMetadata(tableId: string, tableMetadataName: Ui5ControlMetadata, supportedTablesMetadata: string[]): any {
    if (!supportedTablesMetadata.includes(tableMetadataName)) {
      return null;
    }
    let table = TableHelper.getTable(tableId);
    if (tableMetadataName === supportedTablesMetadata[0] && table.getTable !== undefined) {
      table = table.getTable();
    }
    return table;
  }

  static getItems(table: any): any[] {
    let items: any[] = [];
    if (table.getItems !== undefined) {
      items = table.getItems();
    } else if (table.getRows !== undefined) {
      items = table.getRows();
    }
    return items;
  }

  static getColumnKeyByLabelText(table: any, labelText: string): string | null {
    let columnKey: string | null = null;

    /**
     * Recursively search inside a control and its children for text/value bindings
     */
    function findBindingPath(control: any): string | null {
      if (!control) return null;

      // Try text or value bindings
      const textBinding = control.getBinding?.("text");
      const valueBinding = control.getBinding?.("value");

      if (textBinding?.getPath?.()) return textBinding.getPath();
      if (valueBinding?.getPath?.()) return valueBinding.getPath();

      // Recursively search common aggregation types
      const aggregations = ["content", "items", "cells", "components", "formElements", "elements"];
      for (const agg of aggregations) {
        const children = control.getAggregation?.(agg);
        if (Array.isArray(children)) {
          for (const child of children) {
            const path = findBindingPath(child);
            if (path) return path;
          }
        } else if (children) {
          const path = findBindingPath(children);
          if (path) return path;
        }
      }

      return null;
    }

    const columns = table.getColumns?.();
    if (!columns?.length) return null;

    const isUiTable = typeof columns[0].getLabel === "function";

    if (isUiTable) {
      // === sap.ui.table.Table ===
      const rows = table.getRows?.();
      if (!rows?.length) return null;

      const row = rows[0];
      const cells = row.getCells?.();

      columns.forEach((column: any, index: number) => {
        const label = column.getLabel?.();
        if (label?.getText?.() === labelText && cells?.[index]) {
          columnKey = findBindingPath(cells[index]);
        }
      });
    } else {
      // === sap.m.Table ===
      const items = table.getItems?.();
      if (!items?.length) return null;

      const cells = items[0].getCells?.();

      columns.forEach((column: any, index: number) => {
        const header = column.getHeader?.();
        if (header?.getText?.() === labelText && cells?.[index]) {
          columnKey = findBindingPath(cells[index]);
        }
      });
    }

    return columnKey;
  }

  static async getAllColumnValuesByScrolling(table: any, columnName: string, enableScrolling: boolean = true, scrollDelay: number = 200): Promise<string[]> {
    const oBinding = table.getBinding("rows");
    if (!oBinding) {
      console.warn("No row binding found.");
      return [];
    }

    const iTotalRows = oBinding.getLength();
    const iPageSize = table.getVisibleRowCount();
    const aAllValues: string[] = [];
    const columnKey = TableHelper.getColumnKeyByLabelText(table, columnName);

    if (columnKey == null) {
      console.warn("Column key could not be determined for column:", columnName);
      return [];
    }

    if (!enableScrolling) {
      const aContexts = oBinding.getContexts(0, iTotalRows);
      for (const oContext of aContexts) {
        const oData = oContext.getObject();
        if (oData && oData.hasOwnProperty(columnKey)) {
          aAllValues.push(oData[columnKey]);
        }
      }
    } else {
      for (let i = 0; i < iTotalRows; i += iPageSize) {
        table.setFirstVisibleRow(i);

        // Wait for rendering/data loading
        await new Promise((resolve) => setTimeout(resolve, scrollDelay));

        const aContexts = oBinding.getContexts(i, iPageSize);
        for (const oContext of aContexts) {
          const oData = oContext.getObject();
          if (oData && oData.hasOwnProperty(columnKey)) {
            aAllValues.push(oData[columnKey]);
          }
        }
      }
    }

    return aAllValues;
  }

  static getTableMetadata(tableId: string): Ui5ControlMetadata | undefined {
    const table: any = TableHelper.getTable(tableId);
    if (table && typeof table.getMetadata === "function") {
      return table.getMetadata().getName();
    } else {
      throw new Error(`Table with ID ${tableId} not found or does not have metadata.`);
    }
  }

  static async filterItems(items: any[], values: string[]): Promise<string[] | undefined> {
    const matchedItems = items.filter((item) => values.every((val) => Object.values(item.getBindingContext().getObject()).includes(val)));

    if (!matchedItems.length) return undefined;
    await TableHelper.highlightItems(matchedItems);
    return matchedItems.map((item) => item?.getId?.()).filter(Boolean);
  }

  static filterItemsWithoutTitle(items: any[]): any[] {
    // Filter items with undefined or empty title since titles in rows/columnListItems are only used for dividers of grouped items
    return items.filter((item) => item.getTitle === undefined || item.getTitle() === "");
  }

  static async getIdsForItemsByCellValues(
    rows: any,
    targetValues: string[],
    enableHighlighting = true,
    matchMode: "contains" | "exact" | "wordBoundary" = "contains"
  ): Promise<string[] | undefined> {
    const matchedRows = rows.filter((row: any) => {
      const cells = row.getCells();
      return targetValues.every((val) =>
        cells.some((cell: any) => {
          const domRef = cell.getDomRef();
          if (!domRef || !domRef.innerText) return false;

          const cellText = domRef.innerText;

          switch (matchMode) {
            case "exact":
              return cellText.trim() === val.trim();
            case "wordBoundary": {
              const escapedVal = val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              const regex = new RegExp(`\\b${escapedVal}\\b`, "i");
              return regex.test(cellText);
            }
            case "contains":
            default:
              return cellText.includes(val);
          }
        })
      );
    });

    if (!matchedRows.length) return undefined;
    if (enableHighlighting) await TableHelper.highlightItems(matchedRows);
    return matchedRows.map((item: any) => item.getId());
  }

  static async highlightItems(items: any[]): Promise<void> {
    if (!items || !items.length) return;

    TableHelper.injectHighlightStyle();

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        items.forEach((item) => {
          const domRef = item.getDomRef?.();
          if (domRef) {
            domRef.classList.add("rowHighlightFlash");
            setTimeout(() => domRef.classList.remove("rowHighlightFlash"), 2000);
          }
        });
        setTimeout(resolve, 2250); // total time to wait before resolving
      }, 250);
    });
  }

  static injectHighlightStyle() {
    // @ts-ignore: error TS2584: Cannot find name 'document'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.
    if (!document.getElementById("highlightRowStyle")) {
      // @ts-ignore: error TS2584: Cannot find name 'document'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.
      const style = document.createElement("style");
      style.id = "highlightRowStyle";
      style.innerHTML = `
        .rowHighlightFlash {
          background-color: #ffeaa7 !important;
          transition: background-color 1s ease-out;
        }
      `;
      // @ts-ignore: error TS2584: Cannot find name 'document'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.
      document.head.appendChild(style);
    }
  }

  static serializeClass(): string {
    return TableHelper.toString();
  }
}
