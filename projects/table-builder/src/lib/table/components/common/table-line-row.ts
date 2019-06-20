import { Input } from '@angular/core';
import { ColumnsSchema, TableCellInfo, TableRow } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { TableEvent } from '../../interfaces/table-builder.internal';
import { SelectionService } from '../../services/selection/selection.service';

export class TableLineRow {
    @Input('column-key') public key: string;
    @Input('client-row-height') public clientRowHeight: number;

    constructor(protected templateParser: TemplateParserService, public selection: SelectionService) {}

    public get columnsSchema(): ColumnsSchema {
        return this.templateParser.schema.columns;
    }

    public generateTableCellInfo(item: TableRow, $event: TableEvent): TableCellInfo {
        return {
            row: item,
            event: $event,
            preventDefault: (): void => {
                clearInterval(this.selection.selectionTaskIdle);
            }
        };
    }
}
