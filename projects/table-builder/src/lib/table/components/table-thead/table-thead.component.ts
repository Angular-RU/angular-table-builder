import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TableLineRow } from '../common/table-line-row';
import { SelectionService } from '../../services/selection/selection.service';
import { KeyMap, ResizeEvent } from '../../interfaces/table-builder.internal';
import { SortOrderType } from '../../services/sortable/sortable.interfaces';
import { UtilsService } from '../../services/utils/utils.service';
import { FilterableService } from '../../services/filterable/filterable.service';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableTheadComponent extends TableLineRow {
    @Input('header-top') public headerTop: number;
    @Input('head-height') public headHeight: number;
    @Input('sortable-definition') public sortableDefinition: KeyMap<SortOrderType>;
    @Input('filterable-definition') public filterableDefinition: KeyMap<string>;
    @Output() public resize: EventEmitter<ResizeEvent> = new EventEmitter();
    @Output() public sortByKey: EventEmitter<string> = new EventEmitter();
    public orderType: typeof SortOrderType = SortOrderType;

    constructor(
        public readonly selection: SelectionService,
        protected readonly utils: UtilsService,
        protected readonly filterable: FilterableService
    ) {
        super(selection, utils);
    }

    public openFilter(key: string, event: MouseEvent): void {
        this.filterable.openFilter(key, event);
    }
}
