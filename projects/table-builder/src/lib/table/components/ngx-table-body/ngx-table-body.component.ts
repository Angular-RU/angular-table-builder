import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ColumnsSchema, TableRow } from '@angular-ru/ng-table-builder';

@Component({
    selector: 'ngx-table-body',
    templateUrl: './ngx-table-body.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxTableBodyComponent {
    @Input() public columnSchema: ColumnsSchema[];
    @Input() public item: TableRow;
    @Input() public even: boolean;
    @Input() public index: number;
    @Input() public striped: boolean;
}
