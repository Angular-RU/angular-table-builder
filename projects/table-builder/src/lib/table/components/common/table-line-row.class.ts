import { Input } from '@angular/core';
import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';

export class TableLineRow {
    @Input('column-key') public key: string;
    @Input('client-row-height') public clientRowHeight: number;

    constructor(protected templateParser: TemplateParserService) {}

    public get columnsSchema(): ColumnsSchema {
        return this.templateParser.schema.columns;
    }
}
