import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { PrimaryKey, TableRow } from '../table-builder.interfaces';
import { TableBase } from './table.base';

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableBuilderComponent extends TableBase implements OnInit, OnChanges {
    @Input() public height: string;
    @Input() public width: string;
    @Input() public nowrap: boolean = true;
    @Input() public source: TableRow[] = [];
    @Input() public primaryKey: string = PrimaryKey.ID;
    @Input('cell-min-width') public cellMinWidth: string;
    @Input('visible-columns') public visibleColumns: number;
    @Input('row-height') public rowHeight: string;
    public scrollWheel: number = 0;
    public columnKeys: string[] = [];

    private id: number = null;

    public maxWidth: number = 200;

    constructor(private cd: ChangeDetectorRef) {
        super();
    }

    private get modelKeys(): string[] {
        const value: TableRow = this.source[0];
        return Object.keys(value);
    }

    public ngOnInit(): void {
        this.columnKeys = this.modelKeys;
    }

    public ngOnChanges(): void {
        this.columnKeys = this.modelKeys.slice(0, this.visibleColumns ? this.visibleColumns : Infinity);
    }

    public trackByIdx(index: number, item: TableRow): number {
        return item[this.primaryKey] ? item[this.primaryKey] : index;
    }

    public updateViewport(): void {
        window.clearInterval(this.id);

        if (this.scrollWheel > 50) {
            this.id = window.setTimeout(() => {
                this.cd.detectChanges();
            }, 100);
        } else {
            this.cd.detectChanges();
        }
    }
}
