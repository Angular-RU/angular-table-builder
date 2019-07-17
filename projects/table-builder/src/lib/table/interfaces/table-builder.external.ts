import { EventEmitter, TemplateRef } from '@angular/core';
import { Any, KeyMap, TableEvent } from './table-builder.internal';

export type TableRow<T = Any> =
    | Any
    | {
          [key: string]: T;
      };

export interface TableBuilderOptions {
    bufferAmount: number;
    wheelMaxDelta: number;
    defaultValueSeparator: string;
}

export enum ImplicitContext {
    ROW = 'ROW',
    CELL = 'CELL'
}

export interface TableCellOptions<T = Any> {
    template: TemplateRef<T>;
    context: ImplicitContext;
    textBold: boolean;
    nowrap: boolean;
    useDeepPath: boolean;
    class: string | string[] | KeyMap<Any>;
    style: KeyMap<Any>;
    width: number;
    height: number;
    onClick: EventEmitter<Any>;
}

export interface ColumnsSchema<T = Any> {
    [key: string]: TableColumn<T>;
}

export interface TableColumn<T = Any> {
    td: TableCellOptions<T>;
    th: TableCellOptions<T>;
    width: number;
    cssStyle: string[];
    cssClass: string[];
    stickyLeft: boolean;
    stickyRight: boolean;
    resizable: boolean;
    sortable: boolean;
    customColumn: boolean;
    verticalLine: boolean;
}

export interface ColumnsAllowedKeys {
    [key: string]: AllowedKeysProperties;
}

export interface AllowedKeysProperties {
    isModel: boolean;
    visible: boolean;
}

export interface TableSchema<T = unknown> {
    columns: ColumnsSchema;
    columnsAllowedKeys: ColumnsAllowedKeys;
}

export interface TableCellInfo {
    row: TableRow;
    event: TableEvent;
    preventDefault: () => void;
}

export interface ContextItemEvent {
    preventDefault(): void;
}
