import { Input } from '@angular/core';
import { PrimaryKey } from './interfaces/table-builder.internal';
import { ColumnsSchema, TableRow } from './interfaces/table-builder.external';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SelectionMap } from './services/selection/selection';
import { SelectionService } from './services/selection/selection.service';
import { TableBuilderConfig } from './config/table-builder.config';
import { UtilsService } from './services/utils/utils.service';

export abstract class TableBuilderApiImpl {
    @Input() public height: number;
    @Input() public width: string;
    @Input() public source: TableRow[] = [];
    @Input() public keys: string[] = [];
    @Input() public striped: boolean = true;
    @Input() public async: boolean = true;
    @Input('vertical-border') public verticalBorder: boolean = true;
    @Input('enable-selection') public enableSelection: boolean = false;
    @Input('exclude-keys') public excludeKeys: string[] = [];
    @Input('auto-width') public autoWidth: boolean = false;
    @Input('auto-height') public autoHeightDetect: boolean = false;
    @Input('native-scrollbar') public nativeScrollbar: boolean = false;
    @Input('primary-key') public primaryKey: string = PrimaryKey.ID;
    @Input('column-width') public columnWidth: string | number = null;
    @Input('row-height') public rowHeight: string | number = null;
    @Input('buffer-amount') public bufferAmount: number = null;
    protected abstract templateParser: TemplateParserService;
    protected abstract selection: SelectionService;
    protected abstract utils: UtilsService;

    public get columnsSchema(): ColumnsSchema {
        return this.templateParser.schema.columns;
    }

    public get selectedItems(): TableRow[] {
        return this.source.filter((item: TableRow[]) => this.selectionModel.map[item[this.primaryKey]]);
    }

    public get rowKeyValue(): TableRow {
        return this.source && this.source[0];
    }

    public get selectionModel(): SelectionMap {
        return this.selection.selectionModel;
    }

    public get clientRowHeight(): number {
        return parseInt(this.rowHeight as string);
    }

    public get clientColWidth(): number {
        return this.autoWidth ? null : parseInt(this.columnWidth as string);
    }

    public get columnVirtualHeight(): number {
        return this.source.length * (this.clientRowHeight || TableBuilderConfig.ROW_HEIGHT);
    }

    public get columnHeight(): number {
        const rowHeight: number = this.clientRowHeight || TableBuilderConfig.ROW_HEIGHT;
        return this.source.length * rowHeight + rowHeight;
    }

    public get modelColumnKeys(): string[] {
        return this.excluding(this.utils.flattenKeysByRow(this.rowKeyValue));
    }

    public get customModelColumnsKeys(): string[] {
        return this.excluding(this.keys);
    }

    private excluding(keys: string[]): string[] {
        return this.excludeKeys.length ? keys.filter((key: string) => !this.excludeKeys.includes(key)) : keys;
    }
}
