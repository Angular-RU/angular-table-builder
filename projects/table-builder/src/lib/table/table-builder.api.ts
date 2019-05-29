import { Input } from '@angular/core';
import { PrimaryKey, TableRow } from '../table-builder.interfaces';

export class TableBuilderApiImpl {
    @Input() public height: number;
    @Input() public width: string;
    @Input() public source: TableRow[] = [];
    @Input('auto-height') public autoHeight: boolean = false;
    @Input('native-scrollbar') public nativeScrollbar: boolean = false;
    @Input('primary-key') public primaryKey: string = PrimaryKey.ID;
    @Input('column-width') public columnWidth: string;
    @Input('row-height') public rowHeight: string | number;
    @Input('buffer-amount') public bufferAmount: number;
}
