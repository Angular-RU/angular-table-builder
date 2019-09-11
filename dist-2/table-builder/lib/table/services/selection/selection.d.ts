import { KeyMap, RowId } from '../../interfaces/table-builder.internal';
export declare class SelectionMap {
    isAll: boolean;
    entries: KeyMap<boolean>;
    private readonly map;
    readonly size: number;
    generateImmutableEntries(): void;
    hasValue(): boolean;
    readonly isIndeterminate: boolean;
    get(key: RowId): boolean;
    select(key: RowId, emit: boolean): void;
    toggle(key: string | number, emit: boolean): void;
    delete(key: RowId, emit: boolean): void;
    has(key: RowId): boolean;
    clear(): void;
}
