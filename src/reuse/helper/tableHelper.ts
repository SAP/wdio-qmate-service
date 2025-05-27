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

  static serializeClass(): string {
    return TableHelper.toString();
  }
}
