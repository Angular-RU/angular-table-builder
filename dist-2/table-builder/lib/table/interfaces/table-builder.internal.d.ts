import { QueryList } from '@angular/core';
export declare enum PrimaryKey {
    ID = "id"
}
export declare enum TableSimpleChanges {
    SOURCE_KEY = "source",
    SCHEMA_COLUMNS = "schemaColumns"
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
export interface RecalculatedStatus {
    recalculateHeight: boolean;
}
export interface KeyMap<T = Any> {
    [key: string]: T;
}
export declare type RowId = string | number;
export declare type Fn<T = Any, U = Any> = (...args: T[]) => U;
export declare type Any = any;
export interface SelectionStatus {
    status: boolean;
}
export declare enum KeyType {
    KEYDOWN = "keydown",
    KEYUP = "keyup"
}
export declare type TableBrowserEvent = Event | MouseEvent | KeyboardEvent;
export interface ResizeEvent {
    event: TableBrowserEvent;
    key: string;
}
export declare type QueryListRef<T> = QueryList<T>;
export interface TemplateKeys {
    allRenderedKeys: string[];
    simpleRenderedKeys: Set<string>;
    overridingRenderedKeys: Set<string>;
}
export declare type Resolver<T> = (value?: T | PromiseLike<T>) => void;
export interface MousePosition {
    left: number;
    top: number;
}
export declare type DeepPartial<T = Any> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer R> ? ReadonlyArray<DeepPartial<R>> : DeepPartial<T[P]>;
};
