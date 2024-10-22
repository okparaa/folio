import { Column, ColumnBaseConfig, ColumnDataType } from "drizzle-orm";
import { PgTable, TableConfig } from "drizzle-orm/pg-core";

export type DbTable = PgTable<TableConfig> & {
  id: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>;
};
export type RequiredWith<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type RequiredWithNonNull<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};
export type OptionalWith<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};
export type VResult = { issues: any; output: any };

export interface HTTPError extends Error {
  statusCode: number;
}
