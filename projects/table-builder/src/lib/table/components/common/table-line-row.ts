import { Input } from '@angular/core';
import { ColumnsSchema, TableEvent, TableRow } from '../../interfaces/table-builder.external';
import { TableBrowserEvent } from '../../interfaces/table-builder.internal';
import { SelectionService } from '../../services/selection/selection.service';
import { UtilsService } from '../../services/utils/utils.service';
import { getDeepValue } from '../../operators/deep-value';

export class TableLineRow {
    @Input('is-rendered') public isRendered: boolean;
    @Input('column-index') public columnIndex: number;
    @Input('client-row-height') public clientRowHeight: number;
    @Input('column-schema') public columnSchema: ColumnsSchema;

    constructor(public readonly selection: SelectionService, protected readonly utils: UtilsService) {}

    public generateTableCellInfo(item: TableRow, key: string, $event: TableBrowserEvent): TableEvent {
        return {
            row: item,
            event: $event,
            value: getDeepValue(item, key),
            preventDefault: (): void => {
                window.clearInterval(this.selection.selectionTaskIdle);
            }
        };
    }
}
