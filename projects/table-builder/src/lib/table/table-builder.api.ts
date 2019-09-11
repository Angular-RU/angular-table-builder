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

import { NgxTableViewChangesService } from '../table/services/table-view-changes/ngx-table-view-changes.service';
import { Fn, KeyMap, PrimaryKey, QueryListRef, ResizeEvent } from './interfaces/table-builder.internal';
import { ColumnsSchema, SimpleSchemaColumns, TableRow } from './interfaces/table-builder.external';
import { NgxContextMenuComponent } from './components/ngx-context-menu/ngx-context-menu.component';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { NgxHeaderComponent } from './components/ngx-header/ngx-header.component';
import { NgxFooterComponent } from './components/ngx-footer/ngx-footer.component';
import { NgxFilterComponent } from './components/ngx-filter/ngx-filter.component';
import { FilterWorkerEvent } from './services/filterable/filterable.interface';
import { DraggableService } from './services/draggable/draggable.service';
import { FilterableService } from './services/filterable/filterable.service';
import { SelectionService } from './services/selection/selection.service';
import { TableBuilderOptionsImpl } from './config/table-builder-options';
import { ResizableService } from './services/resizer/resizable.service';
import { SortableService } from './services/sortable/sortable.service';
import { UtilsService } from './services/utils/utils.service';
import { SelectionMap } from './services/selection/selection';
import { isFirefox } from './operators/is-firefox';

const { ROW_HEIGHT, MACRO_TIME, TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

export abstract class TableBuilderApiImpl
    implements OnChanges, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {
    @Input() public height: number;
    @Input() public width: string;
    @Input() public source: TableRow[] = null;
    @Input() public keys: string[] = [];
    @Input() public striped: boolean = true;
    @Input() public lazy: boolean = true;
    @Input() public name: string = null;
    @Input('sort-types') public sortTypes: KeyMap = null;
    @Input('exclude-keys') public excludeKeys: Array<string | RegExp> = [];
    @Input('auto-width') public autoWidth: boolean = false;
    @Input('auto-height') public autoHeightDetect: boolean = true;
    @Input('native-scrollbar') public nativeScrollbar: boolean = false;
    @Input('primary-key') public primaryKey: string = PrimaryKey.ID;
    @Input('column-width') public columnWidth: string | number = null;
    @Input('row-height') public rowHeight: string | number = null;
    @Input('async-columns') public asyncColumns: boolean = true;
    @Input('vertical-border') public verticalBorder: boolean = true;
    @Input('enable-selection') public enableSelection: boolean = false;
    @Input('enable-filtering') public enableFiltering: boolean = false;
    @Input('buffer-amount') public bufferAmount: number = null;
    @Input('schema-columns') public schemaColumns: SimpleSchemaColumns = [];
    @Output() public afterRendered: EventEmitter<boolean> = new EventEmitter();
    @Output() public schemaChanges: EventEmitter<SimpleSchemaColumns> = new EventEmitter();

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
    public tableViewportChecked: boolean = true;
    public isFrozenView: boolean = false;
    public isFirefoxMode: boolean = isFirefox();

    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *      <ngx-column *ngFor="let key of table.modelColumnKeys"></ngx-column>
     *    </table-builder>
     *    ------------------------
     *    modelColumnKeys === [ 'id', 'hello', 'value' ]
     */
    public modelColumnKeys: string[] = [];

    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] />
     *    customModelColumnsKeys === [ 'id', 'description', 'name', 'description' ]
     *    ------------------------
     *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] [exclude]=[ 'id', 'description' ] />
     *    customModelColumnsKeys === [ 'name' ]
     */
    public customModelColumnsKeys: string[] = [];

    public isDragging: KeyMap<boolean> = {};
    public abstract readonly templateParser: TemplateParserService;
    public abstract readonly selection: SelectionService;
    public abstract readonly utils: UtilsService;
    public abstract readonly cd: ChangeDetectorRef;
    public abstract readonly resize: ResizableService;
    public abstract readonly sortable: SortableService;
    public abstract readonly contextMenu: ContextMenuService;
    public abstract readonly filterable: FilterableService;
    public abstract readonly ngZone: NgZone;
    public accessDragging: boolean = false;
    protected abstract readonly app: ApplicationRef;
    protected abstract readonly viewChanges: NgxTableViewChangesService;
    protected abstract readonly draggable: DraggableService;
    protected originalSource: TableRow[];
    protected renderedCountKeys: number;
    private filterIdTask: number = null;

    /**
     * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned unique displayed columns [ 'id', 'value', 'position' ]
     */
    public get displayedColumns(): string[] {
        return Object.keys(this.templateParser.compiledTemplates) || [];
    }

    public get visibleColumns(): string[] {
        return this.columnSchema
            .filter((column: ColumnsSchema) => column.isVisible)
            .map((column: ColumnsSchema) => column.key);
    }

    /**
     * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned ordered displayed columns [ 'id', 'value', 'id', 'position', 'value' ]
     */
    public get positionColumns(): string[] {
        return this.columnSchema.map((column: ColumnsSchema) => column.key);
    }

    public get columnSchema(): ColumnsSchema[] {
        return (this.templateParser.schema && this.templateParser.schema.columns) || [];
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

    public recheckViewportChecked(): void {
        this.tableViewportChecked = !this.tableViewportChecked;
        this.idleDetectChanges();
    }

    public enableDragging(key: string): void {
        if (this.templateParser.compiledTemplates[key].draggable) {
            this.accessDragging = true;
            this.detectChanges();
        }
    }

    public disableDragging(): void {
        if (this.accessDragging) {
            this.accessDragging = false;
            this.detectChanges();
        }
    }

    public resizeColumn({ event, key }: ResizeEvent, column: HTMLDivElement): void {
        this.recheckViewportChecked();
        this.disableDragging();

        this.resize.resize(
            event as MouseEvent,
            column,
            (width: number) => this.calculateWidth(key, width),
            () => this.afterCalculateWidth()
        );

        event.preventDefault();
    }

    public filter(): void {
        if (!this.enableFiltering) {
            throw new Error('You forgot to enable filtering: \n <ngx-table-builder [enable-filtering]="true" />');
        }

        this.ngZone.runOutsideAngular(() => {
            window.clearInterval(this.filterIdTask);
            this.filterIdTask = window.setTimeout(() => {
                this.filterable.changeFilteringStatus();
                this.sortAndFilter().then(() => this.reCheckDefinitions());
            }, MACRO_TIME);
        });
    }

    public async sortAndFilter(): Promise<void> {
        this.toggleFreeze();

        if (this.filterable.filterValueExist && this.enableFiltering) {
            const filter: FilterWorkerEvent = await this.filterable.filter(this.originalSource);
            this.source = await this.sortable.sort(filter.source);
            filter.fireSelection();
        } else if (!this.sortable.empty && this.source) {
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

    public drop({ previousIndex, currentIndex }: CdkDragSortEvent): void {
        const previousKey: string = this.visibleColumns[previousIndex];
        const currentKey: string = this.visibleColumns[currentIndex];
        this.draggable.drop(previousKey, currentKey);
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

    public changeSchema(defaultColumns: SimpleSchemaColumns = null): void {
        const renderedColumns: SimpleSchemaColumns = this.templateParser.schema.exportColumns();
        const columns: SimpleSchemaColumns = defaultColumns || renderedColumns;
        this.viewChanges.update({ name: this.name, columns });
        this.schemaChanges.emit(columns);
        this.idleDetectChanges();
    }

    protected reCheckDefinitions(): void {
        this.filterable.definition = { ...this.filterable.definition };
        this.filterable.changeFilteringStatus();
        this.detectChanges();
    }

    /**
     * @description: returns the number of keys in the model
     * @example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     */
    protected getCountKeys(): number {
        return Object.keys(this.firstItem).length;
    }

    /**
     * @see TableBuilderApiImpl#customModelColumnsKeys for further information
     */
    protected generateCustomModelColumnsKeys(): string[] {
        return this.excluding(this.keys);
    }

    /**
     * @see TableBuilderApiImpl#modelColumnKeys for further information
     */
    protected generateModelColumnKeys(): string[] {
        return this.excluding(this.utils.flattenKeysByRow(this.firstItem));
    }

    protected idleDetectChanges(): void {
        this.ngZone.runOutsideAngular(() => window.requestAnimationFrame(() => this.detectChanges()));
    }

    private calculateWidth(key: string, width: number): void {
        this.isDragging[key] = true;
        this.onMouseResizeColumn(key, width);
    }

    private afterCalculateWidth(): void {
        this.isDragging = {};
        this.recheckViewportChecked();
        this.changeSchema();
    }

    private onMouseResizeColumn(key: string, width: number): void {
        this.templateParser.mutateColumnSchema(key, { width });
        this.idleDetectChanges();
    }

    private excluding(keys: string[]): string[] {
        return this.excludeKeys.length
            ? keys.filter((key: string) => {
                  return !this.excludeKeys.some((excludeKey: string | RegExp) => {
                      return excludeKey instanceof RegExp ? !!key.match(excludeKey) : key === excludeKey;
                  });
              })
            : keys;
    }
}
