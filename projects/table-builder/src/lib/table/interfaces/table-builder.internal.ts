import { ElementRef, QueryList } from '@angular/core';

export enum PrimaryKey {
    ID = 'id'
}

export interface DynamicHeightOptions {
    detect: boolean;
    inViewport: boolean;
    height: number;
    columnHeight: number;
    statusRendered: boolean;
    sourceLength: number;
    headerRef: ElementRef<HTMLDivElement>;
    footerRef: ElementRef<HTMLDivElement>;
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

export interface SelectionStatus {
    status: boolean;
}

export type TableEvent = Event | MouseEvent | KeyboardEvent;

export interface ResizeEvent {
    event: TableEvent;
    key: string;
}

export interface ScrollOverload {
    isOverload: boolean;
}

// Bug: 'QueryList' is imported from external module '@angular/core' but never used
export type QueryListRef<T> = QueryList<T>;

export interface TemplateKeys {
    allRenderedKeys: string[];
    simpleRenderedKeys: string[];
    overridingRenderedKeys: string[];
}
