import { TemplateRef } from '@angular/core';
import { Any, KeyMap } from './table-builder.internal';

export interface TableRow<T = Any> {
    [key: string]: T;
}

export interface TableBuilderOptions {
    BUFFER_AMOUNT: number;
    WHEEL_MAX_DELTA: number;
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
    class: string | string[] | KeyMap<Any>;
    style: KeyMap<Any>;
    width: number;
    height: number;
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
