import { EventEmitter, TemplateRef } from '@angular/core';
import { Any, KeyMap, TableBrowserEvent } from './table-builder.internal';

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

export type TableClickEventEmitter = EventEmitter<TableEvent> | null;

export interface TableCellOptions<T = Any> {
    class: string | string[] | KeyMap;
    textBold: boolean;
    nowrap: boolean;
    useDeepPath: boolean;
    style: KeyMap;
    width: number;
    height: number;
    template: TemplateRef<T>;
    context: ImplicitContext;
    onClick: EventEmitter<Any>;
    dblClick: EventEmitter<Any>;
}

export interface TableHeadCellOptions<T = Any> {
    headTitle: string;
    emptyHead: boolean;
}

export interface ColumnsSchema<T = Any> {
    [key: string]: TableColumn<T>;
}

export interface TableColumn<T = Any> {
    td: TableCellOptions<T>;
    th: TableCellOptions<T> & TableHeadCellOptions;
    width: number;
    cssStyle: string[];
    cssClass: string[];
    stickyLeft: boolean;
    stickyRight: boolean;
    resizable: boolean;
    sortable: boolean;
    filterable: boolean;
    draggable: boolean;
    customColumn: boolean;
    verticalLine: boolean;
}

export interface ColumnsSimpleOptions {
    [key: string]: ColumnSimpleOptions;
}

export interface ColumnSimpleOptions {
    isModel: boolean;
    visible: boolean;
}

export interface TableSchema<T = Any> {
    columns: ColumnsSchema<T>;
    displayedColumns: string[];
    allRenderedColumnKeys: string[];
    columnsSimpleOptions: ColumnsSimpleOptions;
}

export interface TableEvent<T = Any> {
    value: T;
    row: TableRow;
    event: TableBrowserEvent;
    preventDefault: () => void;
}

export interface ContextItemEvent {
    preventDefault(): void;
}
