import { ChangeDetectorRef, Input, ViewRef } from '@angular/core';
import { ColumnsSchema, TableEvent, TableRow } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { TableBrowserEvent } from '../../interfaces/table-builder.internal';
import { SelectionService } from '../../services/selection/selection.service';
import { UtilsService } from '../../services/utils/utils.service';

export class TableLineRow {
    @Input('column-key') public key: string;
    @Input('column-index') public columnIndex: number;
    @Input('client-row-height') public clientRowHeight: number;

    public cd: ChangeDetectorRef;

    constructor(
        protected readonly templateParser: TemplateParserService,
        public readonly selection: SelectionService,
        protected readonly utils: UtilsService
    ) {}

    public get columnsSchema(): ColumnsSchema {
        return this.templateParser.schema.columns;
    }

    public generateTableCellInfo(item: TableRow, key: string, $event: TableBrowserEvent): TableEvent {
        return {
            row: item,
            event: $event,
            value: this.utils.getValueByPath(item, key),
            preventDefault: (): void => {
                window.clearInterval(this.selection.selectionTaskIdle);
            }
        };
    }

    public update(): void {
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }
}
