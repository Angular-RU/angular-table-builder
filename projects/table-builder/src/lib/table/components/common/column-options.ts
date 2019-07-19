import { Input } from '@angular/core';

export class ColumnOptions {
    @Input() public width: number = null;
    @Input() public resizable: boolean = null;
    @Input() public sortable: boolean = null;
    @Input('css-class') public cssClass: string[];
    @Input('css-style') public cssStyle: string[];
}
