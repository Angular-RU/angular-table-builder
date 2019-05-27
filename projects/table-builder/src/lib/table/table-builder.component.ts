import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { TableRow } from '../table-builder.interfaces';
import { TableBuilderApiImpl } from './table-builder.api';
import { fadeAnimation } from './core/fade.animation';
import { BUFFER_AMOUNT, OUTSIDE_ZONE, COL_WIDTH, ROW_HEIGHT } from '../table-builder.tokens';

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeAnimation]
})
export class TableBuilderComponent extends TableBuilderApiImpl implements OnInit, OnChanges {
    public columnKeys: string[] = [];

    constructor(
        @Inject(OUTSIDE_ZONE) public outsideZone: boolean,
        @Inject(BUFFER_AMOUNT) public defaultBufferAmount: number,
        @Inject(ROW_HEIGHT) public defaultRowHeight: number,
        @Inject(COL_WIDTH) public defaultColumnWidth: number,
        private cd: ChangeDetectorRef
    ) {
        super();
    }

    public get clientRowHeight(): number {
        return Number(this.rowHeight) || this.defaultRowHeight;
    }

    public get clientColWidth(): number {
        return Number(this.columnWidth) || this.defaultColumnWidth;
    }

    public get clientBufferAmount(): number {
        return Number(this.bufferAmount) || this.defaultBufferAmount;
    }

    public get columnVirtualHeight(): number {
        return this.source.length * this.clientRowHeight + this.clientRowHeight;
    }

    private get modelKeys(): string[] {
        return Object.keys(this.rowKeyValue);
    }

    private get rowKeyValue(): TableRow {
        return (this.source && this.source[0]) || {};
    }

    public ngOnInit(): void {
        this.columnKeys = this.modelKeys;
    }

    public ngOnChanges(): void {
        this.columnKeys = this.modelKeys.slice(0, this.maxVisibleColumns ? this.maxVisibleColumns : Infinity);
    }

    public trackByIdx(index: number, item: TableRow): number {
        return item[this.primaryKey] ? item[this.primaryKey] : index;
    }

    public updateViewport(): void {
        if (this.outsideZone) {
            this.cd.detectChanges();
        }
    }
}
