import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { SelectionMap } from './selection';
import { SelectionRange } from './selection-range';
import { TableRow } from '../../interfaces/table-builder.external';
import { PrimaryKey, RowId, SelectionStatus } from '../../interfaces/table-builder.internal';
import { Subject } from 'rxjs';

@Injectable()
export class SelectionService implements OnDestroy {
    public selectionModel: SelectionMap = new SelectionMap();
    public range: SelectionRange = new SelectionRange();
    public selectionStart: SelectionStatus = { status: false };
    public primaryKey: string = PrimaryKey.ID;
    public selectionTaskIdle: number;
    public onChanges: Subject<void> = new Subject<void>();

    constructor(private readonly ngZone: NgZone) {
        this.listenShiftKeyByType('keydown');
        this.listenShiftKeyByType('keyup');
    }

    private static validateSelectionId(id: RowId): void {
        if (!id) {
            throw new Error(`Can't select item, make sure you pass the correct primary key`);
        }
    }

    public ngOnDestroy(): void {
        this.removeListenerByType('keydown');
        this.removeListenerByType('keyup');
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
        this.onChanges.next();
    }

    public getIdByRow(row: TableRow): RowId {
        const id: RowId = row[this.primaryKey];
        SelectionService.validateSelectionId(id);
        return id;
    }

    public shiftKeyDetectSelection({ shiftKey }: KeyboardEvent): void {
        this.changeSelectionStart(shiftKey);
    }

    private listenShiftKeyByType(type: string): void {
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener(type, this.shiftKeyDetectSelection.bind(this), true);
        });
    }

    private removeListenerByType(type: string): void {
        window.removeEventListener(type, this.shiftKeyDetectSelection.bind(this), true);
    }

    private changeSelectionStart(shiftKey: boolean): void {
        this.selectionStart = { status: shiftKey };
    }

    private checkIsAllSelected(rows: TableRow[]): void {
        this.selectionModel.isAll = rows.length === this.selectionModel.size;
        this.selectionModel.generateImmutableEntries();
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
