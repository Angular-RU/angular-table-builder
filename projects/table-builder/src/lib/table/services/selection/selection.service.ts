import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { SelectionMap } from './selection';
import { SelectionRange } from './selection-range';
import { TableRow } from '../../interfaces/table-builder.external';
import { Fn, KeyMap, KeyType, PrimaryKey, RowId, SelectionStatus } from '../../interfaces/table-builder.internal';

@Injectable()
export class SelectionService implements OnDestroy {
    public selectionModel: SelectionMap = new SelectionMap();
    public range: SelectionRange = new SelectionRange();
    public selectionStart: SelectionStatus = { status: false };
    public primaryKey: string = PrimaryKey.ID;
    public selectionTaskIdle: number;
    public onChanges: Subject<void> = new Subject<void>();
    private handler: KeyMap<Fn> = {};

    constructor(private readonly ngZone: NgZone) {}

    public listenShiftKey(): void {
        this.listenShiftKeyByType(KeyType.KEYDOWN);
        this.listenShiftKeyByType(KeyType.KEYUP);
    }

    public unListenShiftKey(): void {
        this.removeListenerByType(KeyType.KEYDOWN);
        this.removeListenerByType(KeyType.KEYUP);
    }

    private static validateSelectionId(id: RowId): void {
        if (!id) {
            throw new Error(`Can't select item, make sure you pass the correct primary key`);
        }
    }

    public ngOnDestroy(): void {
        this.unListenShiftKey();
    }

    public toggleAll(rows: TableRow[]): void {
        clearInterval(this.selectionTaskIdle);

        const selectIsAll: boolean = rows.length === this.selectionModel.size;
        if (!selectIsAll) {
            rows.forEach((row: TableRow) => this.selectionModel.select(this.getIdByRow(row), false));
        } else {
            this.selectionModel.clear();
        }

        this.checkIsAllSelected(rows);
    }

    public toggle(row: TableRow): void {
        clearInterval(this.selectionTaskIdle);
        this.selectionModel.toggle(this.getIdByRow(row), true);
        this.onChanges.next();
    }

    public selectRow(row: TableRow, event: MouseEvent, rows: TableRow[]): void {
        const { shiftKey, ctrlKey }: MouseEvent = event;
        const index: number = rows.findIndex((item: TableRow) => item[this.primaryKey] === row[this.primaryKey]);

        if (shiftKey) {
            this.multipleSelectByShiftKeydown(index, rows);
        } else if (ctrlKey) {
            this.multipleSelectByCtrlKeydown(row, index);
        } else {
            this.singleSelect(row, index);
        }

        this.checkIsAllSelected(rows);
    }

    public getIdByRow(row: TableRow): RowId {
        const id: RowId = row[this.primaryKey];
        SelectionService.validateSelectionId(id);
        return id;
    }

    public shiftKeyDetectSelection({ shiftKey }: KeyboardEvent): void {
        this.selectionStart = { status: shiftKey };
    }

    private listenShiftKeyByType(type: KeyType): void {
        this.ngZone.runOutsideAngular(() => {
            this.handler[type] = ({ shiftKey }: KeyboardEvent): void => {
                this.selectionStart = { status: shiftKey };
            };
            window.addEventListener(type, this.handler[type], true);
        });
    }

    private removeListenerByType(type: string): void {
        window.removeEventListener(type, this.handler[type], true);
    }

    private checkIsAllSelected(rows: TableRow[]): void {
        this.selectionModel.isAll = rows.length === this.selectionModel.size;
        this.selectionModel.generateImmutableEntries();
        this.onChanges.next();
    }

    private multipleSelectByShiftKeydown(index: number, rows: TableRow[]): void {
        this.selectionModel.clear();
        this.range.put(index);
        const selectedRange: boolean = this.range.selectedRange();

        if (selectedRange) {
            const { start, end }: SelectionRange = this.range.sortKeys();
            for (let i: number = start; i <= end; ++i) {
                this.selectionModel.select(this.getIdByRow(rows[i]), false);
            }
        }
    }

    private multipleSelectByCtrlKeydown(row: TableRow, index: number): void {
        this.range.clear();
        this.range.start = index;
        this.selectionModel.toggle(this.getIdByRow(row), true);
    }

    private singleSelect(row: TableRow, index: number): void {
        this.selectionModel.clear();
        this.selectionModel.select(this.getIdByRow(row), true);
        this.range.clear();
        this.range.start = index;
    }
}
