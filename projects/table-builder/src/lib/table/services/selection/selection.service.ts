import { ApplicationRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import { SelectionMap } from './selection';
import { SelectionRange } from './selection-range';
import { TableRow } from '../../interfaces/table-builder.external';
import { RowKey, SelectionStatus } from '../../interfaces/table-builder.internal';

@Injectable()
export class SelectionService implements OnDestroy {
    public selectionModel: SelectionMap = new SelectionMap();
    public range: SelectionRange = new SelectionRange();
    public selectionStart: SelectionStatus = { status: false };
    public primaryKey: string;

    constructor(private app: ApplicationRef, private ngZone: NgZone) {
        this.listenShiftKeyByType('keydown');
        this.listenShiftKeyByType('keyup');
    }

    public ngOnDestroy(): void {
        this.removeListenerByType('keydown');
        this.removeListenerByType('keyup');
    }

    public toggleAll(rows: TableRow[]): void {
        const selectIsAll: boolean = rows.length === this.selectionModel.length;
        if (!selectIsAll) {
            rows.forEach((row: TableRow) => this.selectionModel.select(this.getIdByRow(row)));
        } else {
            this.selectionModel.clear();
        }

        this.checkIsAllSelected(rows);
    }

    public toggle(row: TableRow): void {
        this.selectionModel.select(this.getIdByRow(row));
        this.app.tick();
    }

    public selectRow(row: TableRow, event: MouseEvent, rows: TableRow[]): void {
        const { shiftKey, ctrlKey }: MouseEvent = event;
        const index: number = rows.indexOf(row);

        if (shiftKey) {
            this.multipleSelectByShiftKeydown(index, rows);
        } else if (ctrlKey) {
            this.multipleSelectByCtrlKeydown(row, index);
        } else {
            this.singleSelect(row, index);
        }

        this.checkIsAllSelected(rows);
        this.app.tick();
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

    private shiftKeyDetectSelection({ shiftKey }: KeyboardEvent): void {
        this.changeSelectionStart(shiftKey);
    }

    private checkIsAllSelected(rows: TableRow[]): void {
        this.selectionModel.isAll = rows.length === this.selectionModel.length;
        this.app.tick();
    }

    private multipleSelectByShiftKeydown(index: number, rows: TableRow[]): void {
        this.selectionModel.clear();
        this.range.put(index);
        const selectedRange: boolean = this.range.selectedRange();

        if (selectedRange) {
            const { start, end }: SelectionRange = this.range.sortKeys();
            for (let i: number = start; i <= end; ++i) {
                this.selectionModel.select(this.getIdByRow(rows[i]));
            }
        }
    }

    private multipleSelectByCtrlKeydown(row: TableRow, index: number): void {
        this.range.clear();
        this.range.start = index;
        this.selectionModel.toggle(this.getIdByRow(row));
    }

    private singleSelect(row: TableRow, index: number): void {
        this.selectionModel.clear();
        this.selectionModel.select(this.getIdByRow(row));
        this.range.clear();
        this.range.start = index;
    }

    private getIdByRow(row: TableRow): RowKey {
        return row[this.primaryKey];
    }
}
