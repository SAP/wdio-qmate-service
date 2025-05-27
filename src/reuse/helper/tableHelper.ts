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

  static filterItems(items: any[], values: string[]) {
    const matchedItems = items.filter((item) => values.every((val) => Object.values(item.getBindingContext().getObject()).includes(val)));
    if (matchedItems.length === 0) return undefined;
    TableHelper.injectHighlightStyle();
    const highlightPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        matchedItems.forEach((item) => {
          const domRef = item.getDomRef();
          if (domRef) {
            domRef.classList.add("rowHighlightFlash");
            setTimeout(() => domRef.classList.remove("rowHighlightFlash"), 2000);
          }
        });
        // Wait for the highlight to be removed before resolving
        setTimeout(() => resolve(), 2250);
      }, 250);
    });
    (matchedItems as any).highlightPromise = highlightPromise;
    return matchedItems;
  }

  static findRowIndexesByCellValues(table: any, targetValues: string[]): number[] {
    const searchValues = Array.isArray(targetValues) ? targetValues : [targetValues];
    const oBinding = table.getBinding("rows");
    const aContexts = oBinding.getContexts(0, oBinding.getLength());
    const matchedRowIndexes = [];

    for (let i = 0; i < aContexts.length; i++) {
      const oRowData = aContexts[i].getObject();
      const flatRowValues = Object.values(oRowData).flatMap((cell) =>
        (cell && typeof cell === "object") ? Object.values(cell as object) : [cell]
      );
      const allMatch = searchValues.every((val) => flatRowValues.includes(val));
      if (allMatch) {
        matchedRowIndexes.push(i);
      }
    }

    return matchedRowIndexes;
  }

  static getRowControlIdsByMatchedValuesAsync(table: any, targetValues: string[]) {
    TableHelper.injectHighlightStyle();

    const matchedIndexes = TableHelper.findRowIndexesByCellValues(table, targetValues);
    const iFirstVisible = table.getFirstVisibleRow();
    const visibleRowCount = table.getVisibleRowCount();

    const scrollAndCollect = (index: number) => {
      return new Promise((resolve) => {
        // Scroll if necessary
        if (index < iFirstVisible || index >= iFirstVisible + visibleRowCount) {
          table.setFirstVisibleRow(index);
        }

        // Wait a bit for UI to render
        setTimeout(() => {
          const relativeIndex = index - table.getFirstVisibleRow();
          const oRow = table.getRows()[relativeIndex];
          if (oRow) {
            const domRef = oRow.getDomRef();
            if (domRef) {
              domRef.classList.add("rowHighlightFlash");
              setTimeout(() => domRef.classList.remove("rowHighlightFlash"), 2000);
            }
            resolve(oRow.getId());
          } else {
            resolve(null); // row not rendered yet
          }
        }, 250);
      });
    };

    // Run scrolling and ID collection in sequence
    const promises = matchedIndexes.map((index) => scrollAndCollect(index));
    return Promise.all(promises);
  }

  static injectHighlightStyle() {
    if (!document.getElementById("highlightRowStyle")) {
      const style = document.createElement("style");
      style.id = "highlightRowStyle";
      style.innerHTML = `
        .rowHighlightFlash {
          background-color: #ffeaa7 !important;
          transition: background-color 1s ease-out;
        }
      `;
      document.head.appendChild(style);
    }
  }

  static serializeClass(): string {
    return TableHelper.toString();
  }
}
