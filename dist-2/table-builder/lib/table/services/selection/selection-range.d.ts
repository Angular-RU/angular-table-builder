export declare class SelectionRange {
    start: number;
    end: number;
    put(index: number): void;
    clear(): void;
    sortKeys(): SelectionRange;
    selectedRange(): boolean;
}
