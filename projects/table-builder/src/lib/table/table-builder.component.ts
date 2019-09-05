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
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

const { TIME_IDLE, TIME_RELOAD, FRAME_TIME }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

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
    private forcedRefresh: boolean = false;
    private readonly destroy$: Subject<boolean> = new Subject<boolean>();
    private checkedTaskId: number = null;

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
        return !!this.source && this.source.length > 0;
    }

    private get viewIsDirty(): boolean {
        return this.contentCheck && !this.forcedRefresh;
    }

    public checkSourceIsNull(): boolean {
        return !('length' in (this.source || {}));
    }

    public recalculateHeight(): void {
        this.recalculated = { recalculateHeight: true };
        this.detectChanges();
    }

    public ngOnChanges(changes: SimpleChanges = {}): void {
        const nonIdenticalStructure: boolean = this.sourceExists && this.getCountKeys() !== this.renderedCountKeys;
        this.sourceIsNull = this.checkSourceIsNull();
        this.sortable.setDefinition(this.sortTypes);

        if (nonIdenticalStructure) {
            this.renderedCountKeys = this.getCountKeys();
            this.customModelColumnsKeys = this.generateCustomModelColumnsKeys();
            this.modelColumnKeys = this.generateModelColumnKeys();
            this.originalSource = this.source;
            const unDirty: boolean = !this.dirty;

            this.checkFilterValues();

            if (unDirty) {
                this.markForCheck();
            }

            const recycleView: boolean = unDirty && this.isRendered && this.contentInit;

            if (recycleView) {
                this.renderTable();
            }
        } else if (TableSimpleChanges.SOURCE_KEY in changes && this.isRendered) {
            this.originalSource = changes[TableSimpleChanges.SOURCE_KEY].currentValue;
            this.sortAndFilter().then(() => this.reCheckDefinitions());
        }

        if (TableSimpleChanges.SCHEMA_COLUMNS in changes) {
            const schemaChange: SimpleChange = changes[TableSimpleChanges.SCHEMA_COLUMNS];
            if (!schemaChange.currentValue) {
                throw new Error(
                    `You need set correct <ngx-table-builder [schema-columns]="[] || [..]" /> for one time binding`
                );
            }
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

    public updateScrollOffset(offset: boolean): void {
        this.scrollOffset = { offset };
        this.idleDetectChanges();
    }

    public markVisibleColumn(column: HTMLDivElement, visible: boolean): void {
        column['visible'] = visible;
        this.detectChanges();
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
        this.listenSelectionChanges();
        this.recheckTemplateChanges();
    }

    public ngAfterViewChecked(): void {
        if (this.viewIsDirty) {
            this.viewForceRefresh();
        }
    }

    public ngOnDestroy(): void {
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

    public renderTable({ async }: { async: boolean } = { async: true }): void {
        if (this.rendering) {
            return;
        }

        this.rendering = true;
        const columnList: string[] = this.generateDisplayedColumns();
        const drawTask: Fn<string[], Promise<void>> =
            this.asyncColumns && async ? this.asyncDrawColumns.bind(this) : this.syncDrawColumns.bind(this);

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
        this.detectChanges();

        this.renderTable({ async: false });
        this.changeSchema([]);

        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                this.tableViewportChecked = true;
                this.detectChanges();
            }, TableBuilderOptionsImpl.TIME_IDLE);
        });
    }

    private checkFilterValues(): void {
        if (this.enableFiltering) {
            this.filterable.filterType =
                this.filterable.filterType ||
                (this.columnOptions && this.columnOptions.filterType) ||
                TableFilterType.START_WITH;

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
                this.detectChanges();
                this.ngZone.runOutsideAngular(() =>
                    window.requestAnimationFrame(() => {
                        this.detectChanges();
                        this.app.tick();
                    })
                );
            });
        }
    }

    private viewForceRefresh(): void {
        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.checkedTaskId);
            this.checkedTaskId = window.setTimeout(() => {
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
            this.contextMenu.events.pipe(takeUntil(this.destroy$)).subscribe(() => this.detectChanges());
        }
    }

    /**
     * @description: lazy rendering of columns
     */
    private async asyncDrawColumns(columnList: string[]): Promise<void> {
        for (let index: number = 0; index < columnList.length; index++) {
            const key: string = columnList[index];
            const schema: ColumnsSchema = this.mergeColumnSchema(key, index);

            if (schema.isVisible) {
                await this.utils.requestAnimationFrame(() => this.processedColumnList(schema, key, true));
            } else {
                this.processedColumnList(schema, key, true);
            }
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
        this.templateParser.schema.columns.push(this.templateParser.compiledTemplates[key]);
        if (async) {
            this.idleDetectChanges();
        }
    }

    /**
     * @description: notification that the table has been rendered
     * @see TableBuilderComponent#isRendered
     */
    private emitRendered(): void {
        this.isRendered = true;
        this.rendering = false;
        this.afterRendered.emit(this.isRendered);
        this.idleDetectChanges();
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
        const allowedKeyMap: KeyMap<boolean> = this.keys.length
            ? this.generateColumnsKeyMap(this.customModelColumnsKeys)
            : this.generateColumnsKeyMap(this.modelColumnKeys);

        this.templateParser.parse(allowedKeyMap, this.columnTemplates);

        return {
            allRenderedKeys: Array.from(this.templateParser.fullTemplateKeys),
            overridingRenderedKeys: this.templateParser.overrideTemplateKeys,
            simpleRenderedKeys: this.templateParser.templateKeys
        };
    }
}
