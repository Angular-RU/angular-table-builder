export enum PrimaryKey {
    ID = 'id'
}

export interface DynamicHeightOptions {
    autoHeight: boolean;
    height: number;
}

export interface ScrollOffsetStatus {
    offset: boolean;
}

export interface PlainObject<T = any> {
    [key: string]: T;
}

export type Fn = (...args: any[]) => any;
