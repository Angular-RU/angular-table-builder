import { TemplateRef } from '@angular/core';
import { Any, KeyMap } from './table-builder.internal';

export interface TableRow<T = Any> {
    [key: string]: T;
}

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
}

export interface TableSchema<T = unknown> {
    columns: ColumnsSchema;
}
