import { Input } from '@angular/core';
import { FilterType } from '../../services/filterable/filterable.interface';

export class ColumnOptions {
    @Input() public nowrap: boolean = null;
    @Input() public width: number = null;
    @Input() public resizable: boolean = null;
    @Input() public sortable: boolean = null;
    @Input() public filterable: boolean = null;
    @Input('filter-type') public filterType: FilterType = null;
    @Input('css-class') public cssClass: string[];
    @Input('css-style') public cssStyle: string[];
}
