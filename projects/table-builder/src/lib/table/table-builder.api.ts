import { Input } from '@angular/core';
import { PrimaryKey } from './interfaces/table-builder.internal';
import { ColumnsSchema, TableRow } from './interfaces/table-builder.external';
import { TemplateParserService } from './services/template-parser/template-parser.service';

export abstract class TableBuilderApiImpl {
    @Input() public height: number;
    @Input() public width: string;
    @Input() public source: TableRow[] = [];
    @Input() public keys: string[] = [];
    @Input() public striped: boolean = true;
    @Input('exclude-keys') public excludeKeys: string[] = [];
    @Input('auto-width') public autoWidth: boolean = false;
    @Input('auto-height') public autoHeightDetect: boolean = false;
    @Input('native-scrollbar') public nativeScrollbar: boolean = false;
    @Input('primary-key') public primaryKey: string = PrimaryKey.ID;
    @Input('column-width') public columnWidth: string;
    @Input('row-height') public rowHeight: string | number;
    @Input('buffer-amount') public bufferAmount: number;

    protected abstract templateParser: TemplateParserService;

    public get columnsSchema(): ColumnsSchema {
        return this.templateParser.schema.columns;
    }
}
