import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewChecked, AfterViewInit, ApplicationRef, ChangeDetectorRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgxTableViewChangesService } from '../table/services/table-view-changes/ngx-table-view-changes.service';
import { Fn, KeyMap, QueryListRef, ResizeEvent } from './interfaces/table-builder.internal';
import { ColumnsSchema, SimpleSchemaColumns, TableRow } from './interfaces/table-builder.external';
import { NgxContextMenuComponent } from './components/ngx-context-menu/ngx-context-menu.component';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { NgxHeaderComponent } from './components/ngx-header/ngx-header.component';
import { NgxFooterComponent } from './components/ngx-footer/ngx-footer.component';
import { NgxFilterComponent } from './components/ngx-filter/ngx-filter.component';
import { DraggableService } from './services/draggable/draggable.service';
import { FilterableService } from './services/filterable/filterable.service';
import { SelectionService } from './services/selection/selection.service';
import { ResizableService } from './services/resizer/resizable.service';
import { SortableService } from './services/sortable/sortable.service';
import { UtilsService } from './services/utils/utils.service';
import { SelectionMap } from './services/selection/selection';
export declare abstract class TableBuilderApiImpl implements OnChanges, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {
    height: number;
    width: string;
    source: TableRow[];
    keys: string[];
    striped: boolean;
    lazy: boolean;
    name: string;
    sortTypes: KeyMap;
    excludeKeys: Array<string | RegExp>;
    autoWidth: boolean;
    autoHeightDetect: boolean;
    nativeScrollbar: boolean;
    primaryKey: string;
    columnWidth: string | number;
    rowHeight: string | number;
    asyncColumns: boolean;
    verticalBorder: boolean;
    enableSelection: boolean;
    enableFiltering: boolean;
    bufferAmount: number;
    schemaColumns: SimpleSchemaColumns;
    afterRendered: EventEmitter<boolean>;
    schemaChanges: EventEmitter<SimpleSchemaColumns>;
    columnOptions: NgxOptionsComponent;
    columnTemplates: QueryListRef<NgxColumnComponent>;
    contextMenuTemplate: NgxContextMenuComponent;
    headerTemplate: NgxHeaderComponent;
    footerTemplate: NgxFooterComponent;
    filterTemplate: NgxFilterComponent;
    inViewport: boolean;
    tableViewportChecked: boolean;
    isFrozenView: boolean;
    isFirefoxMode: boolean;
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
    modelColumnKeys: string[];
    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] />
     *    customModelColumnsKeys === [ 'id', 'description', 'name', 'description' ]
     *    ------------------------
     *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] [exclude]=[ 'id', 'description' ] />
     *    customModelColumnsKeys === [ 'name' ]
     */
    customModelColumnsKeys: string[];
    isDragging: KeyMap<boolean>;
    abstract readonly templateParser: TemplateParserService;
    abstract readonly selection: SelectionService;
    abstract readonly utils: UtilsService;
    abstract readonly cd: ChangeDetectorRef;
    abstract readonly resize: ResizableService;
    abstract readonly sortable: SortableService;
    abstract readonly contextMenu: ContextMenuService;
    abstract readonly filterable: FilterableService;
    abstract readonly ngZone: NgZone;
    accessDragging: boolean;
    protected abstract readonly app: ApplicationRef;
    protected abstract readonly viewChanges: NgxTableViewChangesService;
    protected abstract readonly draggable: DraggableService;
    protected originalSource: TableRow[];
    protected renderedCountKeys: number;
    private filterIdTask;
    /**
     * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned unique displayed columns [ 'id', 'value', 'position' ]
     */
    readonly displayedColumns: string[];
    readonly visibleColumns: string[];
    /**
     * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned ordered displayed columns [ 'id', 'value', 'id', 'position', 'value' ]
     */
    readonly positionColumns: string[];
    readonly columnSchema: ColumnsSchema[];
    readonly selectedItems: TableRow[];
    readonly firstItem: TableRow;
    readonly lastItem: TableRow;
    readonly selectionModel: SelectionMap;
    readonly clientRowHeight: number;
    readonly clientColWidth: number;
    readonly columnVirtualHeight: number;
    readonly columnHeight: number;
    readonly size: number;
    abstract markDirtyCheck(): void;
    abstract markForCheck(): void;
    abstract markTemplateContentCheck(): void;
    abstract ngOnChanges(changes: SimpleChanges): void;
    abstract ngOnInit(): void;
    abstract ngAfterContentInit(): void;
    abstract ngAfterViewInit(): void;
    abstract ngAfterViewChecked(): void;
    abstract ngOnDestroy(): void;
    recheckViewportChecked(): void;
    enableDragging(key: string): void;
    disableDragging(): void;
    resizeColumn({ event, key }: ResizeEvent, column: HTMLDivElement): void;
    filter(): void;
    sortAndFilter(): Promise<void>;
    sortByKey(key: string): void;
    drop({ previousIndex, currentIndex }: CdkDragSortEvent): void;
    checkVisible(visible: boolean): void;
    detectChanges(): void;
    toggleFreeze(time?: number, callback?: Fn): void;
    changeSchema(defaultColumns?: SimpleSchemaColumns): void;
    protected reCheckDefinitions(): void;
    /**
     * @description: returns the number of keys in the model
     * @example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     */
    protected getCountKeys(): number;
    /**
     * @see TableBuilderApiImpl#customModelColumnsKeys for further information
     */
    protected generateCustomModelColumnsKeys(): string[];
    /**
     * @see TableBuilderApiImpl#modelColumnKeys for further information
     */
    protected generateModelColumnKeys(): string[];
    protected idleDetectChanges(): void;
    private calculateWidth;
    private afterCalculateWidth;
    private onMouseResizeColumn;
    private excluding;
}
