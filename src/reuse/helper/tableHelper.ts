import { Ui5Selector, Ui5ControlMetadata } from "../modules/ui5/types/ui5.types";

export class TableHelper {
  static getTable(tableId: string): any {
    return sap.ui.getCore().getElementById(tableId);
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

  static findRowIndexesByCellValues(table: any, targetValues: string[]): number[] {
    const searchValues = Array.isArray(targetValues) ? targetValues : [targetValues];
    const oBinding = table.getBinding("rows");
    const aContexts = oBinding.getContexts(0, oBinding.getLength());
    const matchedRowIndexes = [];

    for (let i = 0; i < aContexts.length; i++) {
      const oRowData = aContexts[i].getObject();
      const flatRowValues = Object.values(oRowData).flatMap((cell) => (cell && typeof cell === "object" ? Object.values(cell as object) : [cell]));
      const allMatch = searchValues.every((val) => flatRowValues.includes(val));
      if (allMatch) {
        matchedRowIndexes.push(i);
      }
    }

    return matchedRowIndexes;
  }

  static async getRowControlIdsByMatchedValuesAsync(table: any, targetValues: string[]): Promise<string[] | undefined> {
    const matchedIndexes = TableHelper.findRowIndexesByCellValues(table, targetValues);
    if (!matchedIndexes.length) return undefined;

    const iFirstVisible = table.getFirstVisibleRow();
    const visibleRowCount = table.getVisibleRowCount();
    const matchedRows: any[] = [];

    for (const index of matchedIndexes) {
      if (index < iFirstVisible || index >= iFirstVisible + visibleRowCount) {
        table.setFirstVisibleRow(index);
      }

      await new Promise((res) => setTimeout(res, 250)); // wait for UI to rerender

      const relativeIndex = index - table.getFirstVisibleRow();
      const oRow = table.getRows()[relativeIndex];
      if (oRow) matchedRows.push(oRow);
    }

    await TableHelper.highlightItems(matchedRows);
    return matchedRows.map((row) => row?.getId?.()).filter(Boolean);
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

  static serializeClass(): string {
    return TableHelper.toString();
  }
}
