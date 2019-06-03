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

export interface PlainObject<T = unknown> {
    [key: string]: T;
}

export type Fn<T = unknown, U = unknown> = (...args: T[]) => U;

export type Any = any; // NOSONAR
