import { TemplateRef } from '@angular/core';

export interface TableRow<T = unknown> {
    [key: string]: T;
}

export interface TableBuilderOptions {
    bufferAmount: number;
    rowHeight: number;
    columnWidth: number;
    wheelMaxDelta: number;
}

export interface TableColumnOptions<T> {
    template: TemplateRef<T>;
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
