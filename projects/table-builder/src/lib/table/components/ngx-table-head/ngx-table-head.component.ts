import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ColumnsSchema } from '@angular-ru/ng-table-builder';
import { SortableService } from '../../services/sortable/sortable.service';

@Component({
    selector: 'ngx-table-head',
    templateUrl: './ngx-table-head.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxTableHeadComponent {
    @Input() public schema: ColumnsSchema[];
    @Input('head-height') public headHeight: number;
    @Input('cell-width') public clientColWidth: number;
    @Input('cell-height') public clientRowHeight: number;
    @Output() public sortByKey: EventEmitter<string> = new EventEmitter();

    constructor(public readonly sortable: SortableService) {}
}
