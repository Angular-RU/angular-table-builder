import { QueryList } from '@angular/core';
import { NgxColumnComponent } from '@angular-ru/table-builder';

export enum PrimaryKey {
    ID = 'id'
}

export interface DynamicHeightOptions {
    detect: boolean;
    height: number;
}

export interface ScrollOffsetStatus {
    offset: boolean;
}

export interface KeyMap<T = unknown> {
    [key: string]: T;
}

export type RowId = string | number;

export type Fn<T = unknown, U = unknown> = (...args: T[]) => U;

export type Any = any; // NOSONAR

export type ColumnTemplates = QueryList<NgxColumnComponent>;

export interface SelectionStatus {
    status: boolean;
}
