import { Input } from '@angular/core';

export class TableLineRow {
    @Input('column-key') public key: string;
    @Input('client-row-height') public clientRowHeight: number;
}
