import { QueryList } from '@angular/core';
import { NgxColumnComponent } from '../components/ngx-column/ngx-column.component';
import { ColumnOptions } from '../components/common/column-options';

export enum PrimaryKey {
    ID = 'id'
}

export enum TableKeys {
    SOURCE_KEY = 'source'
}

export interface DynamicHeightOptions {
    detect: boolean;
    inViewport: boolean;
    height: number;
}

export interface ScrollOffsetStatus {
    offset: boolean;
}

export interface KeyMap<T = unknown> {
    [key: string]: T;
}

export type RowId = string | number;

export type Fn<T = Any, U = Any> = (...args: T[]) => U;

export type Any = any; // NOSONAR

export type ColumnListRef = QueryList<NgxColumnComponent> | NgxColumnComponent[];
export type ColumnOptionsRef = ColumnOptions;

export interface SelectionStatus {
    status: boolean;
}

export type TableEvent = Event | MouseEvent | KeyboardEvent;

export interface ResizeEvent {
    event: MouseEvent;
    key: string;
}

export interface ScrollOverload {
    isOverload: boolean;
}
