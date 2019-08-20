import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ApplicationRef,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewRef
} from '@angular/core';

import {
    DeepPartial,
    Fn,
    KeyMap,
    PrimaryKey,
    QueryListRef,
    ResizeEvent,
    ScrollOverload
} from './interfaces/table-builder.internal';
import { ColumnsSchema, ColumnsSimpleOptions, TableRow, TableSchema } from './interfaces/table-builder.external';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SelectionMap } from './services/selection/selection';
import { SelectionService } from './services/selection/selection.service';
import { UtilsService } from './services/utils/utils.service';
import { TableBuilderOptionsImpl } from './config/table-builder-options';
import { ResizableService } from './services/resizer/resizable.service';
import { SortableService } from './services/sortable/sortable.service';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { NgxContextMenuComponent } from './components/ngx-context-menu/ngx-context-menu.component';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { NgxHeaderComponent } from './components/ngx-header/ngx-header.component';
import { NgxFooterComponent } from './components/ngx-footer/ngx-footer.component';
import { FilterableService } from './services/filterable/filterable.service';
import { FilterWorkerEvent } from './services/filterable/filterable.interface';
import { NgxFilterComponent } from './components/ngx-filter/ngx-filter.component';
import { DraggableService } from './services/draggable/draggable.service';

const { ROW_HEIGHT, FILTER_TIME, TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

export abstract class TableBuilderApiImpl
    implements OnChanges, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {
    @Input() public height: number;
    @Input() public width: string;
    @Input() public source: TableRow[] = [];
    @Input() public keys: string[] = [];
    @Input() public striped: boolean = true;
    @Input() public lazy: boolean = true;
    @Input() public throttling: boolean = false;
    @Input('async-columns') public asyncColumns: boolean = true;
    @Input('schema') public customSchemaOptions: DeepPartial<TableSchema> = {};
    @Input('vertical-border') public verticalBorder: boolean = true;
    @Input('enable-selection') public enableSelection: boolean = false;
    @Input('enable-filtering') public enableFiltering: boolean = false;
    @Input('exclude-keys') public excludeKeys: string[] = [];
    @Input('auto-width') public autoWidth: boolean = false;
    @Input('auto-height') public autoHeightDetect: boolean = true;
    @Input('native-scrollbar') public nativeScrollbar: boolean = false;
    @Input('primary-key') public primaryKey: string = PrimaryKey.ID;
    @Input('column-width') public columnWidth: string | number = null;
    @Input('row-height') public rowHeight: string | number = null;
    @Input('buffer-amount') public bufferAmount: number = null;
    @Output() public afterRendered: EventEmitter<boolean> = new EventEmitter();
    @Output() public schemaChanges: EventEmitter<Partial<TableSchema>> = new EventEmitter();

    @ContentChild(NgxOptionsComponent, { static: false })
    public columnOptions: NgxOptionsComponent = null;

    @ContentChildren(NgxColumnComponent)
    public columnTemplates: QueryListRef<NgxColumnComponent> = null;

    @ContentChild(NgxContextMenuComponent, { static: false })
    public contextMenuTemplate: NgxContextMenuComponent = null;

    @ContentChild(NgxHeaderComponent, { static: false })
    public headerTemplate: NgxHeaderComponent = null;

    @ContentChild(NgxFooterComponent, { static: false })
    public footerTemplate: NgxFooterComponent = null;

    @ContentChild(NgxFilterComponent, { static: false })
    public filterTemplate: NgxFilterComponent = null;

    public inViewport: boolean;
    public scrollOverload: Partial<ScrollOverload> = {};
    public isFrozenView: boolean = false;
    public modelColumnKeys: string[] = [];
    public customModelColumnsKeys: string[] = [];
    public isDragging: KeyMap<boolean> = {};
    public abstract templateParser: TemplateParserService;
    public abstract selection: SelectionService;
    public abstract utils: UtilsService;
    public abstract readonly cd: ChangeDetectorRef;
    public abstract resize: ResizableService;
    public abstract sortable: SortableService;
    public abstract contextMenu: ContextMenuService;
    public abstract filterable: FilterableService;
    public abstract ngZone: NgZone;
    public accessDragging: boolean = false;
    protected abstract app: ApplicationRef;
    protected abstract draggable: DraggableService;
    protected originalSource: TableRow[];
    protected renderedCountKeys: number;
    private filterIdTask: number = null;
    private frameIdTask: number = null;

    public get schema(): Partial<TableSchema> {
        return this.templateParser.schema || {};
    }

    public get columns(): ColumnsSchema {
        return this.schema.columns || {};
    }

    public get columnsAllowedKeys(): ColumnsSimpleOptions {
        return this.schema.columnsSimpleOptions;
    }

    public get selectedItems(): TableRow[] {
        return this.source.filter((item: TableRow[]) => this.selectionModel.entries[item[this.primaryKey]]);
    }

    public get firstItem(): TableRow {
        return (this.source && this.source[0]) || {};
    }

    public get lastItem(): TableRow {
        return (this.source && this.source[this.source.length - 1]) || {};
    }

    public get selectionModel(): SelectionMap {
        return this.selection.selectionModel;
    }

    public get clientRowHeight(): number {
        return parseInt(this.rowHeight as string) || ROW_HEIGHT;
    }

    public get clientColWidth(): number {
        return this.autoWidth ? null : parseInt(this.columnWidth as string) || null;
    }

    public get columnVirtualHeight(): number {
        return this.source.length * this.clientRowHeight;
    }

    public get columnHeight(): number {
        return this.size * this.clientRowHeight + this.clientRowHeight;
    }

    public get size(): number {
        return (this.source && this.source.length) || 0;
    }

    public abstract markDirtyCheck(): void;

    public abstract markForCheck(): void;

    public abstract markTemplateContentCheck(): void;

    public abstract ngOnChanges(changes: SimpleChanges): void;

    public abstract ngOnInit(): void;

    public abstract ngAfterContentInit(): void;

    public abstract ngAfterViewInit(): void;

    public abstract ngAfterViewChecked(): void;

    public abstract ngOnDestroy(): void;

    public disableDragging(): void {
        this.accessDragging = false;
        this.requestDetectChanges();
    }

    public enableDragging(): void {
        this.accessDragging = true;
        this.requestDetectChanges();
    }

    public resizeColumn({ event, key }: ResizeEvent, column: HTMLDivElement): void {
        this.disableDragging();
        this.detectChanges();

        this.resize.resize(
            event as MouseEvent,
            column,
            (width: number) => {
                this.isDragging[key] = true;
                this.onMouseResizeColumn(key, width);
            },
            () => {
                this.isDragging = {};
                this.changeSchema();
            }
        );

        event.preventDefault();
    }

    public filter(): void {
        this.ngZone.runOutsideAngular(() => {
            window.clearInterval(this.filterIdTask);
            this.filterIdTask = window.setTimeout(() => {
                this.filterable.changeFilteringStatus();
                this.sortAndFilter().then(() => this.reCheckDefinitions());
            }, FILTER_TIME);
        });
    }

    public async sortAndFilter(): Promise<void> {
        this.toggleFreeze();

        if (this.filterable.filterValueExist && this.enableFiltering) {
            const filter: FilterWorkerEvent = await this.filterable.filter(this.originalSource);
            this.source = await this.sortable.sort(filter.source);
            filter.fireSelection();
        } else if (!this.sortable.empty) {
            this.source = await this.sortable.sort(this.originalSource);
        }

        if (this.sortable.empty && !this.filterable.filterValueExist) {
            this.source = this.originalSource;
        }

        this.toggleFreeze(TIME_IDLE);
    }

    public sortByKey(key: string): void {
        this.sortable.updateSortKey(key);
        this.sortAndFilter().then(() => this.reCheckDefinitions());
    }

    public drop(event: CdkDragSortEvent): void {
        this.draggable.drop(event);
        this.changeSchema();
    }

    public checkVisible(visible: boolean): void {
        this.inViewport = visible;
        this.detectChanges();
    }

    public detectChanges(): void {
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }

    public toggleFreeze(time: number = null, callback: Fn = null): void {
        this.isFrozenView = !this.isFrozenView;
        if (time) {
            window.setTimeout(() => {
                this.detectChanges();
                callback && callback();
            }, time);
        } else {
            this.detectChanges();
        }
    }

    protected changeSchema(): void {
        this.schemaChanges.emit(this.templateParser.schema.toJSON());
        this.detectChanges();
    }

    protected reCheckDefinitions(): void {
        this.filterable.definition = { ...this.filterable.definition };
        this.filterable.changeFilteringStatus();
        this.detectChanges();
    }

    protected getCountKeys(): number {
        return Object.keys(this.firstItem).length;
    }

    protected generateCustomModelColumnsKeys(): string[] {
        return this.excluding(this.keys);
    }

    protected generateModelColumnKeys(): string[] {
        return this.excluding(this.utils.flattenKeysByRow(this.firstItem));
    }

    protected requestDetectChanges(): void {
        this.ngZone.runOutsideAngular(() => {
            window.cancelAnimationFrame(this.frameIdTask);
            this.frameIdTask = window.requestAnimationFrame(() => this.detectChanges());
        });
    }

    private onMouseResizeColumn(key: string, width: number): void {
        this.templateParser.updateState(key, { width });
        this.requestDetectChanges();
    }

    private excluding(keys: string[]): string[] {
        return this.excludeKeys.length ? keys.filter((key: string) => !this.excludeKeys.includes(key)) : keys;
    }
}
