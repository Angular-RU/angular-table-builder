import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { KeyMap, ResizeEvent } from '../../interfaces/table-builder.internal';
import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { SortOrderType } from '../../services/sortable/sortable.interfaces';
import { FilterableService } from '../../services/filterable/filterable.service';
import { OVERLOAD_WIDTH_TABLE_HEAD_CELL } from '../../symbols';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableTheadComponent {
    @Input('header-top') public headerTop: number;
    @Input('column-width') public columnWidth: number;
    @Input('head-height') public headHeight: string | number;
    @Input('sortable-definition') public sortableDefinition: KeyMap<SortOrderType>;
    @Input('filterable-definition') public filterableDefinition: KeyMap<string>;
    @Input('client-row-height') public clientRowHeight: number;
    @Input('column-schema') public columnSchema: ColumnsSchema;
    @Output() public resize: EventEmitter<ResizeEvent> = new EventEmitter();
    @Output() public sortByKey: EventEmitter<string> = new EventEmitter();
    public orderType: typeof SortOrderType = SortOrderType;
    public limit: number = OVERLOAD_WIDTH_TABLE_HEAD_CELL;

    constructor(protected readonly filterable: FilterableService) {}

    public openFilter(key: string, event: MouseEvent): void {
        this.filterable.openFilter(key, event);
    }
}
