import { ChangeDetectorRef, Input, OnDestroy, ViewRef } from '@angular/core';
import { ColumnsSchema, TableCellInfo, TableRow } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { Any, Fn, TableEvent } from '../../interfaces/table-builder.internal';
import { SelectionService } from '../../services/selection/selection.service';

export class TableLineRow implements OnDestroy {
    @Input() public async: boolean;
    @Input('column-key') public key: string;
    @Input('column-index') public columnIndex: number;
    @Input('client-row-height') public clientRowHeight: number;

    public cd: ChangeDetectorRef;
    public taskId: number;

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

    public detectChanges(): void {
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.taskId);
    }
}
