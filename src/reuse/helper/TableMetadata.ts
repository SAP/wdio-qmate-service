import { Ui5ControlMetadata } from "../../reuse/modules/ui5/types/ui5.types";

export class TableMetadata {
  public static readonly SMART_TABLE: Ui5ControlMetadata = "sap.ui.comp.smarttable.SmartTable";
  public static readonly TABLE: Ui5ControlMetadata = "sap.m.Table";
  public static readonly UI_TABLE: Ui5ControlMetadata = "sap.ui.table.Table";
  public static readonly COLUMN_LIST_ITEM: Ui5ControlMetadata = "sap.m.ColumnListItem";
  public static readonly TABLE_ROW: Ui5ControlMetadata = "sap.ui.table.Row";

  public static readonly SUPPORTED_TABLES: string[] = [TableMetadata.SMART_TABLE, TableMetadata.TABLE, TableMetadata.UI_TABLE];
}
