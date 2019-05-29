export interface TableRow<T = any> {
    [key: string]: T;
}

export interface TableBuilderOptions {
    bufferAmount: number;
    rowHeight: number;
    columnWidth: number;
    wheelMaxDelta: number;
    enableInteractionObserver: boolean;
}

export enum PrimaryKey {
    ID = 'id'
}

export interface DynamicHeightOptions {
    height: number;
}
