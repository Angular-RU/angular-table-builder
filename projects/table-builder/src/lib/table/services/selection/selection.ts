import { KeyMap, RowId } from '../../interfaces/table-builder.internal';

export class SelectionMap {
    public isAll: boolean = false;
    public entries: KeyMap<boolean> = {};
    private readonly map: Map<RowId, boolean> = new Map<RowId, boolean>();

    public get size(): number {
        return this.map.size;
    }

    public generateImmutableEntries(): void {
        this.entries = Array.from(this.map.entries()).reduce(
            (main: KeyMap<boolean>, [key, value]: [RowId, boolean]) => ({ ...main, [key]: value }),
            {}
        );
    }

    public hasValue(): boolean {
        return this.size > 0;
    }

    public get(key: RowId): boolean {
        return this.map.get(key);
    }

    public select(key: RowId, emit: boolean): void {
        this.map.set(key, true);

        if (emit) {
            this.generateImmutableEntries();
        }
    }

    public toggle(key: string | number, emit: boolean): void {
        if (this.has(key)) {
            this.delete(key, emit);
        } else {
            this.select(key, emit);
        }
    }

    public delete(key: RowId, emit: boolean): void {
        this.map.delete(key);
        if (emit) {
            this.generateImmutableEntries();
        }
    }

    public has(key: RowId): boolean {
        return this.map.has(key);
    }

    public clear(): void {
        this.map.clear();
        this.generateImmutableEntries();
        this.isAll = false;
    }
}
