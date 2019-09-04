import { QueryList } from '@angular/core';

export enum PrimaryKey {
    ID = 'id'
}

export enum TableSimpleChanges {
    SOURCE_KEY = 'source',
    SCHEMA_COLUMNS = 'schemaColumns'
}

export interface DynamicHeightOptions {
    detect: boolean;
    inViewport: boolean;
    height: number;
    columnHeight: number;
    statusRendered: boolean;
    sourceLength: number;
}

export interface ScrollOffsetStatus {
    offset: boolean;
}

export interface KeyMap<T = Any> {
    [key: string]: T;
}

export type RowId = string | number;

export type Fn<T = Any, U = Any> = (...args: T[]) => U;

export type Any = any; // NOSONAR

export interface SelectionStatus {
    status: boolean;
}

export enum KeyType {
    KEYDOWN = 'keydown',
    KEYUP = 'keyup'
}

export type TableBrowserEvent = Event | MouseEvent | KeyboardEvent;

export interface ResizeEvent {
    event: TableBrowserEvent;
    key: string;
}

// Bug: 'QueryList' is imported from external module '@angular/core' but never used
export type QueryListRef<T> = QueryList<T>;

export interface TemplateKeys {
    allRenderedKeys: string[];
    simpleRenderedKeys: Set<string>;
    overridingRenderedKeys: Set<string>;
}

export type Resolver<T> = (value?: T | PromiseLike<T>) => void;

export interface MousePosition {
    left: number;
    top: number;
}

export type DeepPartial<T = Any> = {
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer R>
        ? ReadonlyArray<DeepPartial<R>>
        : DeepPartial<T[P]>;
};
