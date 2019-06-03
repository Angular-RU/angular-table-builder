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

export interface PlainObject<T = any> {
    [key: string]: T;
}

export type Fn<T = any, U = any> = (...args: T[]) => U;
