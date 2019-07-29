import { Input } from '@angular/core';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';

export class TableContent {
    @Input() public height: number = TableBuilderOptionsImpl.ROW_HEIGHT;
    @Input('content-cell') public contentCell: boolean = null;
    @Input('align-center') public alignCenter: boolean = null;
    @Input('css-class') public cssClasses: string[] = null;
    @Input() public bold: boolean = null;
}
