import { KeyMap, RowId } from '../../interfaces/table-builder.internal';

export class SelectionMap {
    public map: KeyMap<boolean> = {};
    public isAll: boolean = false;

    public get length(): number {
        return Object.keys(this.map).length;
    }

    public hasValue(): boolean {
        return this.length > 0;
    }

    public select(key: RowId): void {
        this.map[key] = true;
        this.map = { ...this.map };
    }

    public toggle(key: string | number): void {
        if (this.has(key)) {
            delete this.map[key];
        } else {
            this.select(key);
        }
    }

    public has(key: RowId): boolean {
        return this.map[key];
    }

    public clear(): void {
        this.map = {};
        this.isAll = false;
    }
}
