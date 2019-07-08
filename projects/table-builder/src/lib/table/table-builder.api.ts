import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    ViewRef
} from '@angular/core';

import { PrimaryKey, QueryListColumns, ResizeEvent, ScrollOverload } from './interfaces/table-builder.internal';
import { ColumnsSchema, TableRow, TableSchema } from './interfaces/table-builder.external';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SelectionMap } from './services/selection/selection';
import { SelectionService } from './services/selection/selection.service';
import { UtilsService } from './services/utils/utils.service';
import { TableBuilderOptionsImpl } from './config/table-builder-options';
import { ResizableService } from './services/resizer/resizable.service';
import { SortableService } from './services/sortable/sortable.service';
import { ColumnOptions } from './components/common/column-options';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';

const { ROW_HEIGHT, TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

export abstract class TableBuilderApiImpl
    implements OnChanges, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {
    @Input() public height: number;
    @Input() public width: string;
    @Input() public source: TableRow[] = [];
    @Input() public keys: string[] = [];
    @Input() public striped: boolean = true;
    @Input() public lazy: boolean = true;
    @Input() public throttling: boolean = true;
    @Input('async-columns') public asyncColumns: boolean = true;
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
    @Output() public afterRendered: EventEmitter<boolean> = new EventEmitter();
    @Output() public schemaChanges: EventEmitter<TableSchema> = new EventEmitter();
    @ContentChild(NgxOptionsComponent, { static: false }) public columnOptions: ColumnOptions = null;
    @ContentChildren(NgxColumnComponent) public columnTemplates: QueryListColumns = null;

    public inViewport: boolean;
    public scrollOverload: Partial<ScrollOverload> = {};
    public freezeTable: boolean;
    public modelColumnKeys: string[] = [];
    public customModelColumnsKeys: string[] = [];
    public abstract templateParser: TemplateParserService;
    public abstract selection: SelectionService;
    protected originalSource: TableRow[];
    protected abstract utils: UtilsService;
    protected abstract resize: ResizableService;
    protected abstract sortable: SortableService;
    protected renderedCountKeys: number;

    protected constructor(protected readonly cd: ChangeDetectorRef) {}

    public get columnsSchema(): ColumnsSchema {
        return this.templateParser.schema.columns;
    }

    public get selectedItems(): TableRow[] {
        return this.source.filter((item: TableRow[]) => this.selectionModel.entries[item[this.primaryKey]]);
    }

    public get rowKeyValue(): TableRow {
        return (this.source && this.source[0]) || {};
    }

    public get selectionModel(): SelectionMap {
        return this.selection.selectionModel;
    }

    public get clientRowHeight(): number {
        return parseInt(this.rowHeight as string) || null;
    }

    public get clientColWidth(): number {
        return this.autoWidth ? null : parseInt(this.columnWidth as string) || null;
    }

    public get columnVirtualHeight(): number {
        return this.source.length * (this.clientRowHeight || ROW_HEIGHT);
    }

    public get columnHeight(): number {
        const rowHeight: number = this.clientRowHeight || ROW_HEIGHT;
        return this.source.length * rowHeight + rowHeight;
    }

    public abstract markDirtyCheck(): void;

    public abstract markForCheck(): void;

    public abstract markTemplateContentCheck(): void;

    public abstract ngOnChanges(): void;

    public abstract ngOnInit(): void;

    public abstract ngAfterContentInit(): void;

    public abstract ngAfterViewInit(): void;

    public abstract ngAfterViewChecked(): void;

    public abstract ngOnDestroy(): void;

    public resizeColumn({ event, key }: ResizeEvent, column: HTMLDivElement): void {
        this.resize.resize(
            event as MouseEvent,
            column,
            (width: number) => this.onMouseResizeColumn(key, width),
            () => this.schemaChanges.emit(this.templateParser.schema)
        );

        event.preventDefault();
    }

    public sortByKey(key: string): void {
        this.toggleFreeze();
        this.sortable.sort(this.originalSource, key).then((sorted: TableRow[]) => {
            this.source = this.sortable.empty ? this.originalSource : sorted;
            this.toggleFreeze(TIME_IDLE);
        });
    }

    protected getCountKeys(): number {
        return Object.keys(this.rowKeyValue).length;
    }

    protected generateCustomModelColumnsKeys(): string[] {
        return this.excluding(this.keys);
    }

    protected generateModelColumnKeys(): string[] {
        return this.excluding(this.utils.flattenKeysByRow(this.rowKeyValue));
    }

    protected toggleFreeze(time: number = null): void {
        this.freezeTable = !this.freezeTable;
        if (time) {
            window.setTimeout(() => this.detectChanges(), time);
        } else {
            this.detectChanges();
        }
    }

    protected detectChanges(): void {
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }

    private onMouseResizeColumn(key: string, width: number): void {
        this.templateParser.updateState(key, { width });
        this.cd.detectChanges();
    }

    private excluding(keys: string[]): string[] {
        return this.excludeKeys.length ? keys.filter((key: string) => !this.excludeKeys.includes(key)) : keys;
    }
}
