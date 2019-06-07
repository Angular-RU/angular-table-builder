import { TemplateRef } from '@angular/core';
import { Any } from './table-builder.internal';

export interface TableRow<T = Any> {
    [key: string]: T;
}

export interface TableBuilderOptions {
    bufferAmount: number;
    rowHeight: number;
    columnWidth: number;
    wheelMaxDelta: number;
}

export enum ImplicitContext {
    ROW = 'ROW',
    CELL = 'CELL'
}

export interface TableColumnOptions<T> {
    template: TemplateRef<T>;
    context: ImplicitContext;
    textBold: boolean;
    nowrap: boolean;
    useDeepPath: boolean;
}

export interface ColumnsSchema<T = unknown> {
    [key: string]: {
        td: TableColumnOptions<T>;
        th: TableColumnOptions<T>;
        width: number;
        cssStyle: string[];
        cssClass: string[];
        stickyLeft: boolean;
        stickyRight: boolean;
    };
}

export interface TableSchema<T = unknown> {
    columns: ColumnsSchema;
}
