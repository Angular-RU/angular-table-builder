import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    NgZone,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { ScrollStatus, TableRow } from '../table-builder.interfaces';
import { TableBuilderApiImpl } from './table-builder.api';
import { fadeAnimation } from './core/fade.animation';
import { COL_WIDTH, ROW_HEIGHT } from '../table-builder.tokens';

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeAnimation]
})
export class TableBuilderComponent extends TableBuilderApiImpl implements OnInit, OnChanges {
    public scrollStatus: ScrollStatus = { overload: false };
    public columnKeys: string[] = [];
    private checkId: number;

    constructor(
        @Inject(ROW_HEIGHT) public defaultRowHeight: number,
        @Inject(COL_WIDTH) public defaultColumnWidth: number,
        private cd: ChangeDetectorRef,
        private zone: NgZone
    ) {
        super();
    }

    public get clientRowHeight(): number {
        return Number(this.rowHeight) || this.defaultRowHeight;
    }

    public get clientColWidth(): number {
        return Number(this.columnWidth) || this.defaultColumnWidth;
    }

    public get columnVirtualHeight(): number {
        return this.source.length * this.clientRowHeight;
    }

    public get columnHeight(): number {
        return this.source.length * this.clientRowHeight + this.clientRowHeight;
    }

    public ngOnChanges(): void {
        this.columnKeys = this.modelKeys.slice();
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

    public checkOutsizeZoneUpdated(): void {
        clearInterval(this.checkId);
        this.zone.runOutsideAngular(() => {
            this.checkId = setTimeout(() => this.cd.detectChanges());
        });
    }
}
