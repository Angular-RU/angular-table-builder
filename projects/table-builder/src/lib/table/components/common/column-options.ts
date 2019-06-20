import { Input } from '@angular/core';

export class ColumnOptions {
    @Input() public width: number = null;
    @Input() public resizable: boolean = false;
    @Input('css-class') public cssClass: string[];
    @Input('css-style') public cssStyle: string[];
}
