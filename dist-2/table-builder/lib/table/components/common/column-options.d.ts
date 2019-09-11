import { TableFilterType } from '../../services/filterable/filterable.interface';
export declare class ColumnOptions {
    nowrap: boolean;
    width: number;
    resizable: boolean;
    sortable: boolean;
    filterable: boolean;
    draggable: boolean;
    filterType: TableFilterType;
    cssClass: string[];
    cssStyle: string[];
}
