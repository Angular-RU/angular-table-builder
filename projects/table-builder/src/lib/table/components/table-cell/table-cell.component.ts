import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

import { SelectionService } from '../../services/selection/selection.service';
import { ImplicitContext, TableRow } from '../../interfaces/table-builder.external';
import { TableLineRow } from '../common/table-line-row';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCellComponent extends TableLineRow {
    @Input() public item: TableRow;
    @Input() public index: number;
    @Input() public parent: HTMLDivElement;
    @Input('is-filterable') public isFilterable: boolean;
    @Input('enable-filtering') public enableFiltering: boolean;
    public contextType: typeof ImplicitContext = ImplicitContext;

    constructor(
        public readonly cd: ChangeDetectorRef,
        public readonly selection: SelectionService,
        protected readonly utils: UtilsService
    ) {
        super(selection, utils);
    }
}
