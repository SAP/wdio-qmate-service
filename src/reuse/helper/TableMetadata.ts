import { serializeStaticClass } from "./serializeStaticClass";

export class TableMetadata {
  public static readonly SMART_TABLE = "sap.ui.comp.smarttable.SmartTable";
  public static readonly TABLE = "sap.m.Table";
  public static readonly UI_TABLE = "sap.ui.table.Table";
  public static readonly COLUMN_LIST_ITEM = "sap.m.ColumnListItem";
  public static readonly TABLE_ROW = "sap.ui.table.Row";

  public static readonly SUPPORTED_TABLES: string[] = [TableMetadata.SMART_TABLE, TableMetadata.TABLE, TableMetadata.UI_TABLE];

  public static serializeClass(): string {
    return serializeStaticClass(TableMetadata, "TableMetadata");
  }
}
