import { AfterContentInit, AfterViewChecked, AfterViewInit, ApplicationRef, ChangeDetectorRef, ElementRef, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { KeyMap, RecalculatedStatus, ScrollOffsetStatus } from './interfaces/table-builder.internal';
import { TableBuilderApiImpl } from './table-builder.api';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SortableService } from './services/sortable/sortable.service';
import { SelectionService } from './services/selection/selection.service';
import { UtilsService } from './services/utils/utils.service';
import { ResizableService } from './services/resizer/resizable.service';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { FilterableService } from './services/filterable/filterable.service';
import { DraggableService } from './services/draggable/draggable.service';
import { NgxTableViewChangesService } from './services/table-view-changes/ngx-table-view-changes.service';
import { OverloadScrollService } from './services/overload-scroll/overload-scroll.service';
import { CdkDragStart } from '@angular/cdk/drag-drop';
export declare class TableBuilderComponent extends TableBuilderApiImpl implements OnChanges, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {
    readonly selection: SelectionService;
    readonly templateParser: TemplateParserService;
    readonly cd: ChangeDetectorRef;
    readonly ngZone: NgZone;
    readonly utils: UtilsService;
    readonly resize: ResizableService;
    readonly sortable: SortableService;
    readonly contextMenu: ContextMenuService;
    protected readonly app: ApplicationRef;
    readonly filterable: FilterableService;
    protected readonly draggable: DraggableService;
    protected readonly viewChanges: NgxTableViewChangesService;
    protected readonly overloadScroll: OverloadScrollService;
    dirty: boolean;
    rendering: boolean;
    isRendered: boolean;
    contentInit: boolean;
    contentCheck: boolean;
    showedCellByDefault: boolean;
    scrollOffset: ScrollOffsetStatus;
    recalculated: RecalculatedStatus;
    headerRef: ElementRef<HTMLDivElement>;
    footerRef: ElementRef<HTMLDivElement>;
    sourceIsNull: boolean;
    isScrolling: boolean;
    private forcedRefresh;
    private readonly destroy$;
    private checkedTaskId;
    constructor(selection: SelectionService, templateParser: TemplateParserService, cd: ChangeDetectorRef, ngZone: NgZone, utils: UtilsService, resize: ResizableService, sortable: SortableService, contextMenu: ContextMenuService, app: ApplicationRef, filterable: FilterableService, draggable: DraggableService, viewChanges: NgxTableViewChangesService, overloadScroll: OverloadScrollService);
    readonly selectionEntries: KeyMap<boolean>;
    readonly sourceExists: boolean;
    private readonly viewIsDirty;
    private static checkCorrectInitialSchema;
    checkSourceIsNull(): boolean;
    recalculateHeight(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    markForCheck(): void;
    ngOnInit(): void;
    updateScrollOffset(offset: boolean): void;
    markVisibleColumn(column: HTMLDivElement, visible: boolean): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    cdkDragMoved(event: CdkDragStart, root: HTMLElement): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    markTemplateContentCheck(): void;
    markDirtyCheck(): void;
    /**
     * @internal
     * @description: Key table generation for internal use
     * @sample: keys - ['id', 'value'] -> { id: true, value: true }
     */
    generateColumnsKeyMap(keys: string[]): KeyMap<boolean>;
    render(): void;
    renderTable({ async }?: {
        async: boolean;
    }): void;
    toggleColumnVisibility(key: string): void;
    resetSchema(): void;
    private preSortAndFilterTable;
    private preRenderTable;
    private listenScrollEvents;
    private checkFilterValues;
    private recheckTemplateChanges;
    private listenSelectionChanges;
    private viewForceRefresh;
    private listenTemplateChanges;
    /**
     * @description: lazy rendering of columns
     */
    private asyncDrawColumns;
    /**
     * @description: sync rendering of columns
     */
    private syncDrawColumns;
    private getCustomColumnSchemaByIndex;
    /**
     * @description - it is necessary to combine the templates given from the server and default
     * @param key - column schema from rendered templates map
     * @param index - column position
     */
    private mergeColumnSchema;
    /**
     * @description: column meta information processing
     * @param schema - column schema
     * @param key - column name
     * @param async - whether to draw a column asynchronously
     */
    private processedColumnList;
    /**
     * @description: notification that the table has been rendered
     * @see TableBuilderComponent#isRendered
     */
    private emitRendered;
    /**
     * @description: parsing templates and input parameters (keys, schemaColumns) for the number of columns
     */
    private generateDisplayedColumns;
    /**
     * @description: this method returns the keys by which to draw table columns
     * <allowedKeyMap> - possible keys from the model, this must be checked,
     * because users can draw the wrong keys in the template (ngx-column key=invalid)
     */
    private parseTemplateKeys;
}
