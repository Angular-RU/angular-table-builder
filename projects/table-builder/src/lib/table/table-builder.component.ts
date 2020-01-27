import { CdkDragStart } from '@angular/cdk/drag-drop';
import { catchError, takeUntil } from 'rxjs/operators';
import { EMPTY, fromEvent, Subject } from 'rxjs';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChange,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {
    Any,
    Fn,
    KeyMap,
    RecalculatedStatus,
    ScrollOffsetStatus,
    TableSimpleChanges,
    TemplateKeys
} from './interfaces/table-builder.internal';
import { TableBuilderApiImpl } from './table-builder.api';
import { NGX_ANIMATION } from './animations/fade.animation';
import { ColumnsSchema } from './interfaces/table-builder.external';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SortableService } from './services/sortable/sortable.service';
import { SelectionService } from './services/selection/selection.service';
import { UtilsService } from './services/utils/utils.service';
import { ResizableService } from './services/resizer/resizable.service';
import { TableBuilderOptionsImpl } from './config/table-builder-options';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { FilterableService } from './services/filterable/filterable.service';
import { TableFilterType } from './services/filterable/filterable.interface';
import { DraggableService } from './services/draggable/draggable.service';
import { NgxTableViewChangesService } from './services/table-view-changes/ngx-table-view-changes.service';
import { detectChanges } from './operators/detect-changes';

const { TIME_IDLE, TIME_RELOAD, FRAME_TIME, MACRO_TIME }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TemplateParserService,
        SortableService,
        SelectionService,
        ResizableService,
        ContextMenuService,
        FilterableService,
        DraggableService
    ],
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableBuilderComponent extends TableBuilderApiImpl
    implements OnChanges, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {
    public dirty: boolean = true;
    public rendering: boolean = false;
    public isRendered: boolean = false;
    public contentInit: boolean = false;
    public contentCheck: boolean = false;
    public showedCellByDefault: boolean = true;
    public scrollOffset: ScrollOffsetStatus = { offset: false };
    public recalculated: RecalculatedStatus = { recalculateHeight: false };
    @ViewChild('header', { static: false })
    public headerRef: ElementRef<HTMLDivElement>;
    @ViewChild('footer', { static: false })
    public footerRef: ElementRef<HTMLDivElement>;
    public sourceIsNull: boolean;
    public afterViewInitDone: boolean = false;
    private forcedRefresh: boolean = false;
    private readonly destroy$: Subject<boolean> = new Subject<boolean>();
    private timeoutCheckedTaskId: number = null;
    private frameViewportSliceId: number;
    private timeoutScrolledId: number;
    private timeoutViewCheckedId: number;
    private frameCalculateViewportId: number;

    constructor(
        public readonly selection: SelectionService,
        public readonly templateParser: TemplateParserService,
        public readonly cd: ChangeDetectorRef,
        public readonly ngZone: NgZone,
        public readonly utils: UtilsService,
        public readonly resize: ResizableService,
        public readonly sortable: SortableService,
        public readonly contextMenu: ContextMenuService,
        protected readonly app: ApplicationRef,
        public readonly filterable: FilterableService,
        protected readonly draggable: DraggableService,
        protected readonly viewChanges: NgxTableViewChangesService
    ) {
        super();
    }

    public get selectionEntries(): KeyMap<boolean> {
        return this.selection.selectionModel.entries;
    }

    public get sourceExists(): boolean {
        return this.sourceRef.length > 0;
    }

    private get viewIsDirty(): boolean {
        return this.contentCheck && !this.forcedRefresh;
    }

    private get needUpdateViewport(): boolean {
        return this.viewPortInfo.prevScrollOffsetTop !== this.scrollOffsetTop;
    }

    private get viewportHeight(): number {
        return this.scrollContainer.nativeElement.offsetHeight;
    }

    private get scrollOffsetTop(): number {
        return this.scrollContainer.nativeElement.scrollTop;
    }

    private static checkCorrectInitialSchema(changes: SimpleChanges = {}): void {
        if (TableSimpleChanges.SCHEMA_COLUMNS in changes) {
            const schemaChange: SimpleChange = changes[TableSimpleChanges.SCHEMA_COLUMNS];
            if (!schemaChange.currentValue) {
                throw new Error(
                    `You need set correct <ngx-table-builder [schema-columns]="[] || [..]" /> for one time binding`
                );
            }
        }
    }

    public checkSourceIsNull(): boolean {
        return !('length' in (this.source || {}));
    }

    public recalculateHeight(): void {
        this.recalculated = { recalculateHeight: true };
        this.forceCalculateViewport();
    }

    public ngOnChanges(changes: SimpleChanges = {}): void {
        TableBuilderComponent.checkCorrectInitialSchema(changes);

        const nonIdenticalStructure: boolean = this.sourceExists && this.getCountKeys() !== this.renderedCountKeys;
        this.sourceIsNull = this.checkSourceIsNull();
        this.sortable.setDefinition(this.sortTypes);

        if (nonIdenticalStructure) {
            this.preRenderTable();
        } else if (TableSimpleChanges.SOURCE_KEY in changes && this.isRendered) {
            this.preSortAndFilterTable(changes);
        }
    }

    public markForCheck(): void {
        this.contentCheck = true;
    }

    public ngOnInit(): void {
        if (this.enableSelection) {
            this.selection.primaryKey = this.primaryKey;
            this.selection.listenShiftKey();
        }
    }

    public markVisibleColumn(column: HTMLDivElement, visible: boolean): void {
        column['visible'] = visible;
        detectChanges(this.cd);
    }

    public ngAfterContentInit(): void {
        this.markDirtyCheck();
        this.markTemplateContentCheck();

        if (this.sourceExists) {
            this.render();
        }
    }

    public ngAfterViewInit(): void {
        this.listenTemplateChanges();
        this.listenFilterResetChanges();
        this.listenSelectionChanges();
        this.recheckTemplateChanges();
        this.afterViewInitChecked();
    }

    private listenFilterResetChanges(): void {
        this.filterable.resetEvents.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.source = this.originalSource;
            this.calculateViewport(true);
        });
    }

    public cdkDragMoved(event: CdkDragStart, root: HTMLElement): void {
        const preview: HTMLElement = event.source._dragRef['_preview'];
        const head: HTMLElement = root.querySelector('table-thead');

        const transform: string = event.source._dragRef['_preview'].style.transform || '';
        const [x, , z]: [number, number, number] = transform
            .replace(/translate3d|\(|\)|px/g, '')
            .split(',')
            .map((val: string) => parseFloat(val)) as [number, number, number];

        preview.style.transform = `translate3d(${x}px, ${head.getBoundingClientRect().top}px, ${z}px)`;
    }

    public ngAfterViewChecked(): void {
        if (this.viewIsDirty) {
            this.viewForceRefresh();
        }
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.timeoutScrolledId);
        window.clearTimeout(this.timeoutViewCheckedId);
        window.clearTimeout(this.timeoutCheckedTaskId);
        window.cancelAnimationFrame(this.frameViewportSliceId);
        window.cancelAnimationFrame(this.frameCalculateViewportId);
        this.templateParser.schema = null;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public markTemplateContentCheck(): void {
        this.contentInit = !!this.source || !(this.columnTemplates && this.columnTemplates.length);
    }

    public markDirtyCheck(): void {
        this.dirty = false;
    }

    /**
     * @internal
     * @description: Key table generation for internal use
     * @sample: keys - ['id', 'value'] -> { id: true, value: true }
     */
    public generateColumnsKeyMap(keys: string[]): KeyMap<boolean> {
        const map: KeyMap<boolean> = {};
        keys.forEach((key: string) => (map[key] = true));
        return map;
    }

    public render(): void {
        this.contentCheck = false;
        this.utils.macrotask(() => this.renderTable(), TIME_IDLE).then(() => this.idleDetectChanges());
    }

    public renderTable(): void {
        if (this.rendering) {
            return;
        }

        this.rendering = true;
        const columnList: string[] = this.generateDisplayedColumns();
        const drawTask: Fn<string[], Promise<void>> = this.syncDrawColumns.bind(this);

        if (!this.sortable.empty) {
            this.sortAndFilter().then(() => drawTask(columnList).then(() => this.emitRendered()));
        } else {
            drawTask(columnList).then(() => this.emitRendered());
        }
    }

    public toggleColumnVisibility(key: string): void {
        this.recheckViewportChecked();
        this.templateParser.toggleColumnVisibility(key);
        this.utils
            .requestAnimationFrame(() => {
                this.changeSchema();
                this.recheckViewportChecked();
            })
            .then(() => this.app.tick());
    }

    public resetSchema(): void {
        this.tableViewportChecked = false;
        this.schemaColumns = null;
        detectChanges(this.cd);

        this.renderTable();
        this.changeSchema([]);

        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                this.tableViewportChecked = true;
                detectChanges(this.cd);
            }, TableBuilderOptionsImpl.TIME_IDLE);
        });
    }

    protected calculateViewport(force?: boolean): void {
        if (!this.source || !this.viewportHeight) {
            return;
        }

        const isDownMoved: boolean = this.scrollOffsetTop > this.viewPortInfo.prevScrollOffsetTop;

        this.viewPortInfo.prevScrollOffsetTop = this.scrollOffsetTop;
        let start: number = this.getOffsetVisibleStartIndex();
        let end: number = start + this.getVisibleCountItems() + this.buffer;
        end = end > this.sourceRef.length ? this.sourceRef.length : end;

        let lastVisibleIndex: number = this.getOffsetVisibleEndIndex();
        const bufferOffset: number = isDownMoved
            ? (this.viewPortInfo.endIndex || end) - lastVisibleIndex
            : start - this.viewPortInfo.startIndex;

        if (typeof this.viewPortInfo.startIndex !== 'number') {
            this.updateViewportInfo(start, end);
            this.idleDetectChanges();
        } else if (bufferOffset <= this.bufferMinOffset && bufferOffset >= 0) {
            let newStart = start - this.buffer;
            newStart = newStart >= 0 ? newStart : 0;
            this.updateViewportInfo(newStart, end);
            this.idleDetectChanges();
        } else if (bufferOffset < 0 || force) {
            this.updateViewportInfo(start, end);
            detectChanges(this.cd);
        }

        this.viewPortInfo.bufferOffset = bufferOffset;
    }

    protected updateViewportInfo(start: number, end: number): void {
        this.viewPortInfo.startIndex = start;
        this.viewPortInfo.endIndex = end;

        // lazy slicing
        this.ngZone.runOutsideAngular(() => {
            window.cancelAnimationFrame(this.frameViewportSliceId);
            this.frameViewportSliceId = window.requestAnimationFrame(() => {
                this.viewPortItems = this.sourceRef.slice(start, end);
                detectChanges(this.cd);
            });
        });

        this.viewPortInfo.scrollTop = start * this.clientRowHeight;
    }

    private afterViewInitChecked(): void {
        this.ngZone.runOutsideAngular(
            () =>
                (this.timeoutViewCheckedId = window.setTimeout(() => {
                    this.afterViewInitDone = true;
                    this.listenScroll();
                    if (!this.isRendered && !this.rendering && this.sourceRef.length === 0) {
                        this.emitRendered();
                        detectChanges(this.cd);
                    }
                }, MACRO_TIME))
        );
    }

    private listenScroll(): void {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.scrollContainer.nativeElement, 'scroll', { passive: true })
                .pipe(
                    catchError(() => {
                        this.calculateViewport();
                        return EMPTY;
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => this.scrollHandler());
        });
    }

    private scrollHandler(): void {
        this.viewPortInfo.isScrolling = true;

        this.ngZone.runOutsideAngular(() => {
            window.cancelAnimationFrame(this.frameCalculateViewportId);
            window.clearTimeout(this.timeoutScrolledId);
            this.timeoutScrolledId = window.setTimeout(() => {
                this.viewPortInfo.isScrolling = false;
                this.idleDetectChanges();
            }, TIME_RELOAD);
        });

        if (this.needUpdateViewport) {
            this.ngZone.runOutsideAngular(() => {
                this.frameCalculateViewportId = window.requestAnimationFrame(() => this.calculateViewport());
            });
        }
    }

    private getOffsetVisibleEndIndex(): number {
        return Math.floor((this.scrollOffsetTop + this.viewportHeight) / this.clientRowHeight) - 1;
    }

    private getVisibleCountItems(): number {
        return Math.ceil(this.viewportHeight / this.clientRowHeight - 1);
    }

    private getOffsetVisibleStartIndex(): number {
        return Math.ceil(this.scrollOffsetTop / this.clientRowHeight);
    }

    private preSortAndFilterTable(changes: SimpleChanges = {}): void {
        this.originalSource = changes[TableSimpleChanges.SOURCE_KEY].currentValue;
        this.sortAndFilter().then(() => {
            this.reCheckDefinitions();
            this.checkSelectionValue();
        });
    }

    private preRenderTable(): void {
        this.tableViewportChecked = false;
        this.renderedCountKeys = this.getCountKeys();
        this.customModelColumnsKeys = this.generateCustomModelColumnsKeys();
        this.modelColumnKeys = this.generateModelColumnKeys();
        this.originalSource = this.source;
        const unDirty: boolean = !this.dirty;

        this.checkSelectionValue();
        this.checkFilterValues();

        if (unDirty) {
            this.markForCheck();
        }

        const recycleView: boolean = unDirty && this.isRendered && this.contentInit;

        if (recycleView) {
            this.renderTable();
        }
    }

    private checkSelectionValue(): void {
        if (this.enableSelection) {
            this.selection.invalidate();
        }
    }

    private checkFilterValues(): void {
        if (this.enableFiltering) {
            this.filterable.filterType =
                this.filterable.filterType ||
                (this.columnOptions && this.columnOptions.filterType) ||
                TableFilterType.CONTAINS;

            this.modelColumnKeys.forEach((key: string) => {
                this.filterable.filterTypeDefinition[key] =
                    this.filterable.filterTypeDefinition[key] || this.filterable.filterType;
            });
        }
    }

    private recheckTemplateChanges(): void {
        this.ngZone.runOutsideAngular(() => window.setTimeout(() => this.app.tick(), TIME_RELOAD));
    }

    private listenSelectionChanges(): void {
        if (this.enableSelection) {
            this.selection.onChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
                detectChanges(this.cd);
                this.ngZone.runOutsideAngular(() =>
                    window.requestAnimationFrame(() => {
                        detectChanges(this.cd);
                        this.app.tick();
                    })
                );
            });
        }
    }

    private viewForceRefresh(): void {
        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.timeoutCheckedTaskId);
            this.timeoutCheckedTaskId = window.setTimeout(() => {
                this.forcedRefresh = true;
                this.markTemplateContentCheck();
                this.render();
            }, FRAME_TIME);
        });
    }

    private listenTemplateChanges(): void {
        if (this.columnTemplates) {
            this.columnTemplates.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.markForCheck();
                this.markTemplateContentCheck();
            });
        }

        if (this.contextMenuTemplate) {
            this.contextMenu.events.pipe(takeUntil(this.destroy$)).subscribe(() => detectChanges(this.cd));
        }
    }

    /**
     * @description: sync rendering of columns
     */
    private async syncDrawColumns(columnList: string[]): Promise<void> {
        await this.utils.microtask(() => {
            for (let index: number = 0; index < columnList.length; index++) {
                const key: string = columnList[index];
                const schema: ColumnsSchema = this.mergeColumnSchema(key, index);
                this.processedColumnList(schema, columnList[index], false);
            }
        });
    }

    private getCustomColumnSchemaByIndex(index: number): Partial<ColumnsSchema> {
        return ((this.schemaColumns && this.schemaColumns[index]) || ({} as Any)) as Partial<ColumnsSchema>;
    }

    /**
     * @description - it is necessary to combine the templates given from the server and default
     * @param key - column schema from rendered templates map
     * @param index - column position
     */
    private mergeColumnSchema(key: string, index: number): ColumnsSchema {
        const customColumn: Partial<ColumnsSchema> = this.getCustomColumnSchemaByIndex(index);

        if (!this.templateParser.compiledTemplates[key]) {
            const column: NgxColumnComponent = new NgxColumnComponent().withKey(key);
            this.templateParser.compileColumnMetadata(column);
        }

        const defaultColumn: ColumnsSchema = this.templateParser.compiledTemplates[key];

        if (customColumn.key === defaultColumn.key) {
            this.templateParser.compiledTemplates[key] = { ...defaultColumn, ...customColumn } as ColumnsSchema;
        }

        return this.templateParser.compiledTemplates[key];
    }

    /**
     * @description: column meta information processing
     * @param schema - column schema
     * @param key - column name
     * @param async - whether to draw a column asynchronously
     */
    private processedColumnList(schema: ColumnsSchema, key: string, async: boolean): void {
        if (this.templateParser.schema) {
            this.templateParser.schema.columns.push(this.templateParser.compiledTemplates[key]);
            if (async) {
                this.idleDetectChanges();
            }
        }
    }

    /**
     * @description: notification that the table has been rendered
     * @see TableBuilderComponent#isRendered
     */
    private emitRendered(): void {
        this.tableViewportChecked = true;
        this.isRendered = true;
        this.rendering = false;
        this.afterRendered.emit(this.isRendered);
        this.recalculateHeight();
        this.calculateViewport();
        this.onChanges.emit(this.source || null);
    }

    /**
     * @description: parsing templates and input parameters (keys, schemaColumns) for the number of columns
     */
    private generateDisplayedColumns(): string[] {
        let generatedList: string[] = [];
        this.templateParser.initialSchema(this.columnOptions);
        const { simpleRenderedKeys, allRenderedKeys }: TemplateKeys = this.parseTemplateKeys();

        if (this.schemaColumns && this.schemaColumns.length) {
            generatedList = this.schemaColumns.map((column: ColumnsSchema) => column.key);
        } else if (this.keys.length) {
            generatedList = this.customModelColumnsKeys;
        } else if (simpleRenderedKeys.size) {
            generatedList = allRenderedKeys;
        } else {
            generatedList = this.modelColumnKeys;
        }

        return generatedList;
    }

    /**
     * @description: this method returns the keys by which to draw table columns
     * <allowedKeyMap> - possible keys from the model, this must be checked,
     * because users can draw the wrong keys in the template (ngx-column key=invalid)
     */
    private parseTemplateKeys(): TemplateKeys {
        this.templateParser.keyMap = this.generateColumnsKeyMap(this.keys.length ? this.keys : this.getModelKeys());

        this.templateParser.allowedKeyMap = this.keys.length
            ? this.generateColumnsKeyMap(this.customModelColumnsKeys)
            : this.generateColumnsKeyMap(this.modelColumnKeys);

        this.templateParser.parse(this.columnTemplates);

        return {
            allRenderedKeys: Array.from(this.templateParser.fullTemplateKeys),
            overridingRenderedKeys: this.templateParser.overrideTemplateKeys,
            simpleRenderedKeys: this.templateParser.templateKeys
        };
    }
}
