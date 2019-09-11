import { EventEmitter } from '@angular/core';
import { TableLineRow } from '../common/table-line-row';
import { SelectionService } from '../../services/selection/selection.service';
import { KeyMap, ResizeEvent } from '../../interfaces/table-builder.internal';
import { SortOrderType } from '../../services/sortable/sortable.interfaces';
import { UtilsService } from '../../services/utils/utils.service';
import { FilterableService } from '../../services/filterable/filterable.service';
export declare class TableTheadComponent extends TableLineRow {
    readonly selection: SelectionService;
    protected readonly utils: UtilsService;
    protected readonly filterable: FilterableService;
    headerTop: number;
    sortableDefinition: KeyMap<SortOrderType>;
    filterableDefinition: KeyMap<string>;
    resize: EventEmitter<ResizeEvent>;
    sortByKey: EventEmitter<string>;
    orderType: typeof SortOrderType;
    constructor(selection: SelectionService, utils: UtilsService, filterable: FilterableService);
    openFilter(key: string, event: MouseEvent): void;
}
