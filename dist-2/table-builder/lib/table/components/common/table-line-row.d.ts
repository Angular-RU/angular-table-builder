import { ColumnsSchema, TableEvent, TableRow } from '../../interfaces/table-builder.external';
import { TableBrowserEvent } from '../../interfaces/table-builder.internal';
import { SelectionService } from '../../services/selection/selection.service';
import { UtilsService } from '../../services/utils/utils.service';
export declare class TableLineRow {
    readonly selection: SelectionService;
    protected readonly utils: UtilsService;
    isRendered: boolean;
    columnIndex: number;
    clientRowHeight: number;
    columnSchema: ColumnsSchema;
    constructor(selection: SelectionService, utils: UtilsService);
    generateTableCellInfo(item: TableRow, key: string, $event: TableBrowserEvent): TableEvent;
}
