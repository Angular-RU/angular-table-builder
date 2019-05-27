import { Input } from '@angular/core';
import { PrimaryKey, TableRow } from '../table-builder.interfaces';

export class TableBuilderApiImpl {
    @Input() public height: string;
    @Input() public width: string;
    @Input() public source: TableRow[] = [];
    @Input() public primaryKey: string = PrimaryKey.ID;
    @Input('column-width') public columnWidth: string;
    @Input('max-visible-columns') public maxVisibleColumns: number;
    @Input('row-height') public rowHeight: string | number;
    @Input('buffer-amount') public bufferAmount: number;
}
