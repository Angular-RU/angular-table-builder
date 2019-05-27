export interface TableRow<T = any> {
    [key: string]: T;
}

export interface TableBuilderOptions {
    outsideZone: boolean;
    bufferAmount: number;
    rowHeight: number;
    columnWidth: number;
    wheelMaxDelta: number;
}

export enum PrimaryKey {
    ID = 'id'
}

export interface ScrollStatus {
    overload: boolean;
}
