import { Ui5Selector, Ui5ControlMetadata } from "../modules/ui5/types/ui5.types";

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
    var columns = table.getColumns();
    var targetLabel = labelText; // the label you're looking for
    var columnKey = null;

    columns.forEach(function (column: any) {
      var label = column.getLabel();
      if (label && label.getText && label.getText() === targetLabel) {
        var template = column.getTemplate(); // e.g. Text or Input
        if (template) {
          var bindingInfo = template.getBindingInfo("text") || template.getBindingInfo("value");
          if (bindingInfo && bindingInfo.parts && bindingInfo.parts.length > 0) {
            columnKey = bindingInfo.parts[0].path;
          }
        }
      }
    });
    return columnKey;
  }

  static async getAllColumnValuesByScrolling(table: any, sColumnKey: string): Promise<string[]> {
    const oBinding = table.getBinding("rows");
    if (!oBinding) {
      console.warn("No row binding found.");
      return [];
    }

    const iTotalRows = oBinding.getLength();
    const iPageSize = table.getVisibleRowCount();
    const aAllValues = [];

    for (let i = 0; i < iTotalRows; i += iPageSize) {
      // Scroll to make rows render
      table.setFirstVisibleRow(i);

      // Wait for rendering and data loading
      await new Promise((resolve) => setTimeout(resolve, 200)); // You can adjust timing

      // Get contexts for current visible page
      const aContexts = oBinding.getContexts(i, iPageSize);
      for (const oContext of aContexts) {
        const oData = oContext.getObject();
        if (oData && oData.hasOwnProperty(sColumnKey)) {
          aAllValues.push(oData[sColumnKey]);
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

  static async getIdsForItemsByCellValues(rows: any, targetValues: string[], enableHighlighting = true): Promise<string[] | undefined> {
    const matchedRows = rows.filter((row: any) => {
      const cells = row.getCells();
      return targetValues.every((val) =>
        cells.some((cell: any) => {
          const domRef = cell.getDomRef();
          return domRef && domRef.innerText && domRef.innerText.includes(val);
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
