/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TableSimpleChanges } from './interfaces/table-builder.internal';
import { TableBuilderApiImpl } from './table-builder.api';
import { NGX_ANIMATION } from './animations/fade.animation';
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
import { OverloadScrollService } from './services/overload-scroll/overload-scroll.service';
const { TIME_IDLE, TIME_RELOAD, FRAME_TIME } = TableBuilderOptionsImpl;
export class TableBuilderComponent extends TableBuilderApiImpl {
    /**
     * @param {?} selection
     * @param {?} templateParser
     * @param {?} cd
     * @param {?} ngZone
     * @param {?} utils
     * @param {?} resize
     * @param {?} sortable
     * @param {?} contextMenu
     * @param {?} app
     * @param {?} filterable
     * @param {?} draggable
     * @param {?} viewChanges
     * @param {?} overloadScroll
     */
    constructor(selection, templateParser, cd, ngZone, utils, resize, sortable, contextMenu, app, filterable, draggable, viewChanges, overloadScroll) {
        super();
        this.selection = selection;
        this.templateParser = templateParser;
        this.cd = cd;
        this.ngZone = ngZone;
        this.utils = utils;
        this.resize = resize;
        this.sortable = sortable;
        this.contextMenu = contextMenu;
        this.app = app;
        this.filterable = filterable;
        this.draggable = draggable;
        this.viewChanges = viewChanges;
        this.overloadScroll = overloadScroll;
        this.dirty = true;
        this.rendering = false;
        this.isRendered = false;
        this.contentInit = false;
        this.contentCheck = false;
        this.showedCellByDefault = true;
        this.scrollOffset = { offset: false };
        this.recalculated = { recalculateHeight: false };
        this.forcedRefresh = false;
        this.destroy$ = new Subject();
        this.checkedTaskId = null;
    }
    /**
     * @return {?}
     */
    get selectionEntries() {
        return this.selection.selectionModel.entries;
    }
    /**
     * @return {?}
     */
    get sourceExists() {
        return !!this.source && this.source.length > 0;
    }
    /**
     * @private
     * @return {?}
     */
    get viewIsDirty() {
        return this.contentCheck && !this.forcedRefresh;
    }
    /**
     * @return {?}
     */
    checkSourceIsNull() {
        return !('length' in (this.source || {}));
    }
    /**
     * @return {?}
     */
    recalculateHeight() {
        this.recalculated = { recalculateHeight: true };
        this.detectChanges();
    }
    /**
     * @param {?=} changes
     * @return {?}
     */
    ngOnChanges(changes = {}) {
        /** @type {?} */
        const nonIdenticalStructure = this.sourceExists && this.getCountKeys() !== this.renderedCountKeys;
        this.sourceIsNull = this.checkSourceIsNull();
        this.sortable.setDefinition(this.sortTypes);
        if (nonIdenticalStructure) {
            this.renderedCountKeys = this.getCountKeys();
            this.customModelColumnsKeys = this.generateCustomModelColumnsKeys();
            this.modelColumnKeys = this.generateModelColumnKeys();
            this.originalSource = this.source;
            /** @type {?} */
            const unDirty = !this.dirty;
            this.checkFilterValues();
            if (unDirty) {
                this.markForCheck();
            }
            /** @type {?} */
            const recycleView = unDirty && this.isRendered && this.contentInit;
            if (recycleView) {
                this.renderTable();
            }
        }
        else if (TableSimpleChanges.SOURCE_KEY in changes && this.isRendered) {
            this.originalSource = changes[TableSimpleChanges.SOURCE_KEY].currentValue;
            this.sortAndFilter().then((/**
             * @return {?}
             */
            () => this.reCheckDefinitions()));
        }
        if (TableSimpleChanges.SCHEMA_COLUMNS in changes) {
            /** @type {?} */
            const schemaChange = changes[TableSimpleChanges.SCHEMA_COLUMNS];
            if (!schemaChange.currentValue) {
                throw new Error(`You need set correct <ngx-table-builder [schema-columns]="[] || [..]" /> for one time binding`);
            }
        }
    }
    /**
     * @return {?}
     */
    markForCheck() {
        this.contentCheck = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.enableSelection) {
            this.selection.primaryKey = this.primaryKey;
            this.selection.listenShiftKey();
        }
    }
    /**
     * @param {?} offset
     * @return {?}
     */
    updateScrollOffset(offset) {
        this.scrollOffset = { offset };
        this.idleDetectChanges();
    }
    /**
     * @param {?} column
     * @param {?} visible
     * @return {?}
     */
    markVisibleColumn(column, visible) {
        column['visible'] = visible;
        this.detectChanges();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.markDirtyCheck();
        this.markTemplateContentCheck();
        if (this.sourceExists) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.listenTemplateChanges();
        this.listenSelectionChanges();
        this.recheckTemplateChanges();
        this.listenScrollEvents();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.viewIsDirty) {
            this.viewForceRefresh();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.templateParser.schema = null;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    /**
     * @return {?}
     */
    markTemplateContentCheck() {
        this.contentInit = !!this.source || !(this.columnTemplates && this.columnTemplates.length);
    }
    /**
     * @return {?}
     */
    markDirtyCheck() {
        this.dirty = false;
    }
    /**
     * \@internal
     * \@description: Key table generation for internal use
     * \@sample: keys - ['id', 'value'] -> { id: true, value: true }
     * @param {?} keys
     * @return {?}
     */
    generateColumnsKeyMap(keys) {
        /** @type {?} */
        const map = {};
        keys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => (map[key] = true)));
        return map;
    }
    /**
     * @return {?}
     */
    render() {
        this.contentCheck = false;
        this.utils.macrotask((/**
         * @return {?}
         */
        () => this.renderTable()), TIME_IDLE).then((/**
         * @return {?}
         */
        () => this.idleDetectChanges()));
    }
    /**
     * @param {?=} __0
     * @return {?}
     */
    renderTable({ async } = { async: true }) {
        if (this.rendering) {
            return;
        }
        this.rendering = true;
        /** @type {?} */
        const columnList = this.generateDisplayedColumns();
        /** @type {?} */
        const drawTask = this.asyncColumns && async ? this.asyncDrawColumns.bind(this) : this.syncDrawColumns.bind(this);
        if (!this.sortable.empty) {
            this.sortAndFilter().then((/**
             * @return {?}
             */
            () => drawTask(columnList).then((/**
             * @return {?}
             */
            () => this.emitRendered()))));
        }
        else {
            drawTask(columnList).then((/**
             * @return {?}
             */
            () => this.emitRendered()));
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    toggleColumnVisibility(key) {
        this.recheckViewportChecked();
        this.templateParser.toggleColumnVisibility(key);
        this.utils
            .requestAnimationFrame((/**
         * @return {?}
         */
        () => {
            this.changeSchema();
            this.recheckViewportChecked();
        }))
            .then((/**
         * @return {?}
         */
        () => this.app.tick()));
    }
    /**
     * @return {?}
     */
    resetSchema() {
        this.tableViewportChecked = false;
        this.schemaColumns = null;
        this.detectChanges();
        this.renderTable({ async: false });
        this.changeSchema([]);
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.setTimeout((/**
             * @return {?}
             */
            () => {
                this.tableViewportChecked = true;
                this.detectChanges();
            }), TableBuilderOptionsImpl.TIME_IDLE);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    listenScrollEvents() {
        this.overloadScroll.scrollStatus.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} scrolling
         * @return {?}
         */
        (scrolling) => {
            this.isScrolling = scrolling;
            this.detectChanges();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    checkFilterValues() {
        if (this.enableFiltering) {
            this.filterable.filterType =
                this.filterable.filterType ||
                    (this.columnOptions && this.columnOptions.filterType) ||
                    TableFilterType.START_WITH;
            this.modelColumnKeys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                this.filterable.filterTypeDefinition[key] =
                    this.filterable.filterTypeDefinition[key] || this.filterable.filterType;
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    recheckTemplateChanges() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => window.setTimeout((/**
         * @return {?}
         */
        () => this.app.tick()), TIME_RELOAD)));
    }
    /**
     * @private
     * @return {?}
     */
    listenSelectionChanges() {
        if (this.enableSelection) {
            this.selection.onChanges.pipe(takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            () => {
                this.detectChanges();
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => window.requestAnimationFrame((/**
                 * @return {?}
                 */
                () => {
                    this.detectChanges();
                    this.app.tick();
                }))));
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    viewForceRefresh() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.clearTimeout(this.checkedTaskId);
            this.checkedTaskId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                this.forcedRefresh = true;
                this.markTemplateContentCheck();
                this.render();
            }), FRAME_TIME);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    listenTemplateChanges() {
        if (this.columnTemplates) {
            this.columnTemplates.changes.pipe(takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            () => {
                this.markForCheck();
                this.markTemplateContentCheck();
            }));
        }
        if (this.contextMenuTemplate) {
            this.contextMenu.events.pipe(takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            () => this.detectChanges()));
        }
    }
    /**
     * \@description: lazy rendering of columns
     * @private
     * @param {?} columnList
     * @return {?}
     */
    asyncDrawColumns(columnList) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let index = 0; index < columnList.length; index++) {
                /** @type {?} */
                const key = columnList[index];
                /** @type {?} */
                const schema = this.mergeColumnSchema(key, index);
                if (schema.isVisible) {
                    yield this.utils.requestAnimationFrame((/**
                     * @return {?}
                     */
                    () => {
                        this.processedColumnList && this.processedColumnList(schema, key, true);
                    }));
                }
                else {
                    this.processedColumnList(schema, key, true);
                }
            }
        });
    }
    /**
     * \@description: sync rendering of columns
     * @private
     * @param {?} columnList
     * @return {?}
     */
    syncDrawColumns(columnList) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.utils.microtask((/**
             * @return {?}
             */
            () => {
                for (let index = 0; index < columnList.length; index++) {
                    /** @type {?} */
                    const key = columnList[index];
                    /** @type {?} */
                    const schema = this.mergeColumnSchema(key, index);
                    this.processedColumnList(schema, columnList[index], false);
                }
            }));
        });
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    getCustomColumnSchemaByIndex(index) {
        return (/** @type {?} */ (((this.schemaColumns && this.schemaColumns[index]) || ((/** @type {?} */ ({}))))));
    }
    /**
     * \@description - it is necessary to combine the templates given from the server and default
     * @private
     * @param {?} key - column schema from rendered templates map
     * @param {?} index - column position
     * @return {?}
     */
    mergeColumnSchema(key, index) {
        /** @type {?} */
        const customColumn = this.getCustomColumnSchemaByIndex(index);
        if (!this.templateParser.compiledTemplates[key]) {
            /** @type {?} */
            const column = new NgxColumnComponent().withKey(key);
            this.templateParser.compileColumnMetadata(column);
        }
        /** @type {?} */
        const defaultColumn = this.templateParser.compiledTemplates[key];
        if (customColumn.key === defaultColumn.key) {
            this.templateParser.compiledTemplates[key] = (/** @type {?} */ (Object.assign({}, defaultColumn, customColumn)));
        }
        return this.templateParser.compiledTemplates[key];
    }
    /**
     * \@description: column meta information processing
     * @private
     * @param {?} schema - column schema
     * @param {?} key - column name
     * @param {?} async - whether to draw a column asynchronously
     * @return {?}
     */
    processedColumnList(schema, key, async) {
        this.templateParser.schema.columns.push(this.templateParser.compiledTemplates[key]);
        if (async) {
            this.idleDetectChanges();
        }
    }
    /**
     * \@description: notification that the table has been rendered
     * @see TableBuilderComponent#isRendered
     * @private
     * @return {?}
     */
    emitRendered() {
        this.isRendered = true;
        this.rendering = false;
        this.afterRendered.emit(this.isRendered);
        this.recalculateHeight();
    }
    /**
     * \@description: parsing templates and input parameters (keys, schemaColumns) for the number of columns
     * @private
     * @return {?}
     */
    generateDisplayedColumns() {
        /** @type {?} */
        let generatedList = [];
        this.templateParser.initialSchema(this.columnOptions);
        const { simpleRenderedKeys, allRenderedKeys } = this.parseTemplateKeys();
        if (this.schemaColumns && this.schemaColumns.length) {
            generatedList = this.schemaColumns.map((/**
             * @param {?} column
             * @return {?}
             */
            (column) => column.key));
        }
        else if (this.keys.length) {
            generatedList = this.customModelColumnsKeys;
        }
        else if (simpleRenderedKeys.size) {
            generatedList = allRenderedKeys;
        }
        else {
            generatedList = this.modelColumnKeys;
        }
        return generatedList;
    }
    /**
     * \@description: this method returns the keys by which to draw table columns
     * <allowedKeyMap> - possible keys from the model, this must be checked,
     * because users can draw the wrong keys in the template (ngx-column key=invalid)
     * @private
     * @return {?}
     */
    parseTemplateKeys() {
        /** @type {?} */
        const allowedKeyMap = this.keys.length
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
TableBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-table-builder',
                template: "<div\r\n    #root\r\n    observerView\r\n    [style.width]=\"width\"\r\n    class=\"table-grid__root\"\r\n    [style.height.px]=\"height\"\r\n    [class.table-grid__root--is-rendered]=\"isRendered\"\r\n    [class.table-grid__root--is-scrolling]=\"isScrolling\"\r\n    [class.table-grid__root-auto-height]=\"autoHeightDetect\"\r\n    [class.table-grid__no-display]=\"!(columnSchema.length > 0)\"\r\n    [class.table-grid__root--content-is-init]=\"contentInit && inViewport\"\r\n    [class.table-grid__root--is-scroll-overload]=\"tableViewport.scrollWidth > tableViewport.clientWidth\"\r\n    [class.table-grid__root--empty-list]=\"!source?.length && !filterable.filtering && !isFrozenView\"\r\n    [class.table-grid__root--visible]=\"contentInit && root.offsetHeight > clientRowHeight && columnHeight\"\r\n    (contextmenu)=\"contextMenuTemplate ? contextMenu.openContextMenu($event) : null\"\r\n    (recalculatedHeight)=\"recalculateHeight()\"\r\n    (observeVisible)=\"checkVisible($event)\"\r\n    [autoHeight]=\"{\r\n        detect: autoHeightDetect,\r\n        height: height,\r\n        inViewport: inViewport,\r\n        columnHeight: columnHeight,\r\n        statusRendered: isRendered,\r\n        sourceLength: source?.length || 0\r\n    }\"\r\n    [headerHeight]=\"headerRef?.nativeElement.clientHeight\"\r\n    [footerHeight]=\"footerRef?.nativeElement.clientHeight\"\r\n>\r\n    <div\r\n        cdkDropList\r\n        #tableViewport\r\n        class=\"table-grid\"\r\n        [wheelThrottling]=\"tableViewport\"\r\n        [cdkDropListDisabled]=\"!accessDragging\"\r\n        (scrollOffset)=\"updateScrollOffset($event)\"\r\n        [class.table-grid__scroll-offset]=\"scrollOffset.offset\"\r\n        [class.table-grid__native-scrollbar]=\"nativeScrollbar\"\r\n        cdkDropListOrientation=\"horizontal\"\r\n        (cdkDropListDropped)=\"drop($event)\"\r\n    >\r\n        <div class=\"table-grid__header-sticky\" *ngIf=\"headerTemplate\" #header>\r\n            <ng-content select=\"ngx-header\"></ng-content>\r\n        </div>\r\n\r\n        <div\r\n            class=\"table-grid__column-area-content\"\r\n            [style.width.px]=\"\r\n                tableViewportChecked && tableViewport.scrollWidth > tableViewport.clientWidth\r\n                    ? tableViewport.scrollWidth\r\n                    : null\r\n            \"\r\n        >\r\n            <ng-container *ngFor=\"let columnSchema of columnSchema; let index = index\">\r\n                <div\r\n                    #column\r\n                    cdkDrag\r\n                    observerView\r\n                    cdkDragHandle\r\n                    *ngIf=\"columnSchema.isVisible\"\r\n                    [attr.column-id]=\"columnSchema.key\"\r\n                    [rendered]=\"isRendered\"\r\n                    [cdkDragDisabled]=\"!accessDragging\"\r\n                    class=\"table-grid__column\"\r\n                    [style.height.px]=\"columnHeight\"\r\n                    [ngStyle]=\"columnSchema?.cssStyle\"\r\n                    [ngClass]=\"columnSchema?.cssClass\"\r\n                    cdkDragBoundary=\".table-grid__column-area-content\"\r\n                    [style.max-width.px]=\"columnSchema?.width || clientColWidth\"\r\n                    [style.width.px]=\"columnSchema?.width || clientColWidth\"\r\n                    [style.min-width.px]=\"columnSchema?.width || clientColWidth\"\r\n                    [class.table-grid__column--with-footer-content]=\"footerTemplate\"\r\n                    [class.table-grid__column--vertical-line]=\"verticalBorder || columnSchema?.verticalLine\"\r\n                    [class.table-grid__column--custom-column]=\"columnSchema?.customColumn\"\r\n                    [class.table-grid__column--selected-all]=\"selection.selectionModel.isAll\"\r\n                    [class.table-grid__column--sticky-left]=\"columnSchema?.stickyLeft\"\r\n                    [class.table-grid__column--sticky-right]=\"columnSchema?.stickyRight\"\r\n                    [class.table-grid__column--is-visible]=\"column['visible']\"\r\n                    [class.table-grid__column--is-invisible]=\"!column['visible']\"\r\n                    [class.table-grid__column--is-dragging]=\"isDragging[columnSchema.key]\"\r\n                    [class.table-grid__column--default-width]=\"!autoWidth\"\r\n                    [class.table-grid__column--filter-enable]=\"filterTemplate\"\r\n                    (observeVisible)=\"markVisibleColumn(column, $event)\"\r\n                >\r\n                    <div\r\n                        [@fadeAnimation]\r\n                        class=\"table-grid__column-area\"\r\n                        *ngIf=\"asyncColumns === false || column['visible']\"\r\n                    >\r\n                        <table-thead\r\n                            [column-schema]=\"columnSchema\"\r\n                            (mouseleave)=\"disableDragging()\"\r\n                            [header-top]=\"headerRef?.nativeElement.offsetHeight || 0\"\r\n                            [sortable-definition]=\"sortable.definition\"\r\n                            [filterable-definition]=\"filterable.definition\"\r\n                            [client-row-height]=\"clientRowHeight\"\r\n                            (resize)=\"resizeColumn($event, column)\"\r\n                            (sortByKey)=\"sortByKey($event)\"\r\n                        >\r\n                            <div\r\n                                slot=\"draggable\"\r\n                                *ngIf=\"columnSchema?.draggable\"\r\n                                class=\"table-grid__column--draggable\"\r\n                                (mouseenter)=\"enableDragging(columnSchema.key)\"\r\n                                [class.table-grid__column--draggable--handle-hidden]=\"scrollOffset.offset\"\r\n                            >\r\n                                <drag-icon></drag-icon>\r\n                            </div>\r\n                        </table-thead>\r\n\r\n                        <table-tbody\r\n                            [source]=\"source\"\r\n                            [striped]=\"striped\"\r\n                            [column-index]=\"index\"\r\n                            [is-rendered]=\"isRendered\"\r\n                            [primary-key]=\"primaryKey\"\r\n                            [is-firefox]=\"isFirefoxMode\"\r\n                            [recalculated]=\"recalculated\"\r\n                            [buffer-amount]=\"bufferAmount\"\r\n                            [column-schema]=\"columnSchema\"\r\n                            [table-viewport]=\"tableViewport\"\r\n                            [context-menu]=\"contextMenuTemplate\"\r\n                            [enable-selection]=\"enableSelection\"\r\n                            [client-row-height]=\"clientRowHeight\"\r\n                            [selection-entries]=\"selectionEntries\"\r\n                            [showed-cell-by-default]=\"showedCellByDefault\"\r\n                            [column-virtual-height]=\"columnVirtualHeight\"\r\n                        >\r\n                        </table-tbody>\r\n                    </div>\r\n                </div>\r\n            </ng-container>\r\n        </div>\r\n\r\n        <div class=\"table-grid__footer-sticky\" *ngIf=\"footerTemplate && isRendered\" #footer [@fadeAnimation]>\r\n            <ng-content select=\"ngx-footer\"></ng-content>\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"isFrozenView\" class=\"freeze\"></div>\r\n</div>\r\n\r\n<ng-template [ngIf]=\"contextMenuTemplate && contextMenu.state.opened\">\r\n    <ng-content select=\"ngx-context-menu\"></ng-content>\r\n</ng-template>\r\n\r\n<div *ngIf=\"(source && source.length) === 0 && !filterable.filtering\">\r\n    <ng-content select=\"ngx-empty\"></ng-content>\r\n</div>\r\n\r\n<div *ngIf=\"sourceIsNull\">\r\n    <ng-content select=\"ngx-source-null\"></ng-content>\r\n</div>\r\n\r\n<ng-template [ngIf]=\"filterTemplate\">\r\n    <ng-content select=\"ngx-filter\"></ng-content>\r\n</ng-template>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    TemplateParserService,
                    SortableService,
                    SelectionService,
                    ResizableService,
                    ContextMenuService,
                    FilterableService,
                    DraggableService,
                    OverloadScrollService
                ],
                encapsulation: ViewEncapsulation.None,
                animations: [NGX_ANIMATION],
                styles: ["@-webkit-keyframes slide{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}.table-grid:not(.table-grid__native-scrollbar){color:transparent;transition:color .3s;background:#fff}.table-grid:not(.table-grid__native-scrollbar)::-webkit-scrollbar,.table-grid:not(.table-grid__native-scrollbar)::-webkit-scrollbar-thumb{width:10px;border-radius:10px;background-clip:padding-box;border:2px solid transparent;height:12px}.table-grid:not(.table-grid__native-scrollbar)::-webkit-scrollbar-thumb{box-shadow:inset 0 0 0 10px;background:0 0}.table-grid:not(.table-grid__native-scrollbar):hover{color:rgba(0,0,0,.2)}.table-grid__column{width:100%;box-sizing:border-box;z-index:1;touch-action:initial!important;-webkit-user-drag:initial!important;-webkit-tap-highlight-color:initial!important;-webkit-user-select:initial!important;-moz-user-select:initial!important;-ms-user-select:initial!important;user-select:initial!important}.table-grid__column--sticky-left,.table-grid__column--sticky-right{position:-webkit-sticky;position:sticky;background:#fff;will-change:auto;z-index:100}.table-grid__column--sticky-left{left:0}.table-grid__column--sticky-right{right:0}.table-grid__column--selected-all{background:#fff3ad}.table-grid__column--default-width{min-width:200px}.table-grid__column--resize{height:100%;width:10px;position:absolute;background:0 0;cursor:ew-resize;right:0;top:0;display:flex;align-items:center;justify-content:center}.table-grid__column--resize--line{height:70%;width:2px;vertical-align:middle;background:#e0e0e0;display:flex}.table-grid__column:last-child .table-grid__column--resize{display:none}.table-grid__column--vertical-line{border-right:1px solid #e0e0e0}.table-grid__column--vertical-line:last-child{border-left:1px solid #e0e0e0;border-right:none}.table-grid__column--vertical-line:nth-last-child(2){border-right:none}.table-grid__column--draggable,.table-grid__column--filterable,.table-grid__column--sortable{width:24px;height:20px;font-size:12px;opacity:.2;transition:.2s ease-in-out;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.table-grid__column--draggable-active,.table-grid__column--filterable-active,.table-grid__column--sortable-active{opacity:1}.table-grid__column--draggable:hover,.table-grid__column--filterable:hover,.table-grid__column--sortable:hover{opacity:1;cursor:pointer}.table-grid__column--filter-enable .table-grid__column--filterable{display:table-cell}.table-grid__column--filterable{display:none}.table-grid__column--draggable{opacity:0}.table-grid__column--draggable--handle-hidden{visibility:hidden}.table-grid__column--draggable-active{opacity:.8}.table-grid__column--filterable,.table-grid__column--sortable-desc{-webkit-transform:rotate(0);transform:rotate(0)}.table-grid__cell--content-sortable{cursor:pointer}.table-grid__cell--content-sortable:hover+.table-grid__column--sortable:not(.table-grid__column--sortable-active){transition:opacity .2s ease-in-out;opacity:.5}.table-grid .table-grid__column:last-child{width:100%!important;max-width:initial!important}.table-grid__column:not(table-grid__column--vertical-line).table-grid__column--is-dragging{border-right:1px solid #e0e0e0}.table-grid__column--vertical-line .table-grid__column--resize--line{display:none}[draggable=true]{user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}.table-grid__root{opacity:.0012;overflow:hidden;position:relative;border:1px solid transparent;transition:opacity .2s ease-in-out;-webkit-transform:translate(0);transform:translate(0)}.table-grid__root.table-grid__root--visible{box-shadow:0 0 10px -2px #e0e0e0;border:1px solid #e0e0e0}.table-grid__root.table-grid__root--content-is-init{opacity:.4}.table-grid__root.table-grid__root--is-rendered{opacity:1}.table-grid__root-auto-height{height:0}.table-grid__root--is-scrolling table-cell,.table-grid__root--is-scrolling table-tbody,.table-grid__root:not(.table-grid__root--is-rendered) table-cell,.table-grid__root:not(.table-grid__root--is-rendered) table-tbody{pointer-events:none}.table-grid__root:not(.table-grid__root--is-rendered){cursor:wait}.table-grid__root--empty-list{-webkit-transform:translate(9999px)!important;transform:translate(9999px)!important;border:none!important;opacity:0!important;height:0!important}.scrollable-content{height:unset!important;will-change:auto;-webkit-backface-visibility:hidden;backface-visibility:hidden}.table-grid__cell--content,.table-grid__column--draggable,.table-grid__column--filterable,.table-grid__column--sortable,.vertical-align{vertical-align:middle;margin:auto 0;box-sizing:border-box}table-tbody{display:block}.freeze{top:0;left:0;z-index:1000;position:absolute;width:100%;height:100%}.freeze:after{content:\"\";top:0;-webkit-transform:translateX(100%);transform:translateX(100%);width:100%;height:100%;position:absolute;z-index:1;-webkit-animation:1.4s infinite slide;animation:1.4s infinite slide;background:linear-gradient(to right,rgba(255,255,255,0) 0,rgba(255,255,255,.7) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%)}@keyframes slide{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}.filter-founded{border-bottom:1px dotted #000}table-cell{margin:0 auto;width:100%}.table-grid__header-cell{top:0;z-index:100;position:-webkit-sticky;position:sticky;background:#fff;box-sizing:border-box;text-overflow:ellipsis;border-bottom:1px solid #e0e0e0;transition:box-shadow .3s ease-in-out}.table-grid__header-cell--content{overflow:hidden}.table-grid__header-cell:hover .table-grid__column--draggable{opacity:.2}table-tbody .table-grid__cell:last-child{border-bottom:none}.table-grid__cell{color:#000;width:100%;box-sizing:border-box;text-align:center;word-break:break-word;border-bottom:1px solid #e0e0e0;min-height:45px;max-height:45px;display:flex;overflow:hidden;justify-content:center;padding:5px 20px}.table-grid__cell--custom-cell{padding:0}.table-grid__cell--content{overflow:hidden}.table-grid__cell--content:not(.table-grid__cell--content-sortable){width:100%}.table-grid__cell--content .table-grid__cell--inner-content{overflow:hidden}.table-grid__cell--text-bold{font-weight:700}.table-grid__cell--nowrap,.table-grid__cell--nowrap .table-grid__cell--inner-content{white-space:nowrap;text-overflow:ellipsis}.table-grid__cell--enable-selection{cursor:pointer}.table-grid__cell--strip{background:#f7f7fc}.table-grid__cell--selected{background:#fff3ad}.table-grid__cell--settings{margin-left:10px;display:flex;justify-content:center;align-items:center}.table-grid__cell-overflow-content{position:fixed;background:#fff;padding:10px;border-radius:4px;box-shadow:0 0 10px 2px #e0e0e0;opacity:0;z-index:1;visibility:hidden;white-space:pre-wrap;word-break:break-word;line-height:20px;transition:visibility .1s linear,opacity .1s linear;-webkit-transform:translate(-9999px);transform:translate(-9999px);max-height:300px;max-width:300px;overflow:auto;overflow-x:hidden;margin-top:-10px;margin-left:-50px;font-weight:400;font-size:15px}.table-grid__cell-overflow-content.text-center{text-align:center}.table-grid__cell-overflow-content.visible{visibility:visible;transition:visibility .1s linear,opacity .1s linear;opacity:1;-webkit-transform:translate(0);transform:translate(0)}.cdk-drag-preview .table-grid__header-cell{top:0!important}.table-grid-icon--draggable,.table-grid-icon--sortable{width:24px;height:20px}.table-grid-icon--draggable{cursor:move}.table-grid-icon--filterable{width:20px;height:20px;line-height:20px}.cdk-drag-preview{background:#fff;box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.table-grid__root--is-rendered .table-grid{overflow:auto;overflow-y:auto}.table-grid{position:relative;overflow:hidden;background:#fff;will-change:auto;scroll-behavior:smooth;overflow-x:visible;height:100%}.table-grid__column-area-content{display:flex}.table-grid__footer-sticky,.table-grid__header-sticky{background:#fff;position:-webkit-sticky;position:sticky;z-index:1000;width:100%}.table-grid__header-sticky{top:0;left:0}.table-grid__footer-sticky{bottom:0;left:0}.table-grid__footer-sticky .table-grid__table-content-place{border-top:1px solid #e0e0e0;border-bottom:none}.table-grid__column--with-footer-content table-tbody .table-grid__cell:last-child{border-bottom:none}.table-grid__table-content-place{color:#000;border-bottom:1px solid #e0e0e0}.table-grid__table-content-place--content-cell{box-sizing:border-box;display:flex;overflow:hidden;padding:5px 20px}.table-grid__table-content-place--content-cell .content-box{display:flex;vertical-align:middle;box-sizing:border-box;margin:auto 0}.table-grid__table-content-place--align-center{justify-content:center;text-align:center}.table-grid__table-content-place--align-center .content-box{text-align:center}.table-grid__table-content-place--bold{font-weight:700}.table-grid__cell--inner-content{opacity:0;visibility:hidden;will-change:opacity;transition:visibility .5s ease-in-out,opacity .5s ease-in-out}.table-grid__scroll-offset .table-grid__header-cell{transition:box-shadow .3s ease-in-out;box-shadow:0 3px 2px -2px #e0e0e0}.loaded,.table-grid__scroll-offset .table-grid__cell--inner-content{visibility:visible;opacity:1}.table-grid__scroll-offset .table-grid__cell--inner-content{transition-duration:0s}.table-grid__no-display{opacity:.012!important}"]
            }] }
];
/** @nocollapse */
TableBuilderComponent.ctorParameters = () => [
    { type: SelectionService },
    { type: TemplateParserService },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: UtilsService },
    { type: ResizableService },
    { type: SortableService },
    { type: ContextMenuService },
    { type: ApplicationRef },
    { type: FilterableService },
    { type: DraggableService },
    { type: NgxTableViewChangesService },
    { type: OverloadScrollService }
];
TableBuilderComponent.propDecorators = {
    headerRef: [{ type: ViewChild, args: ['header', { static: false },] }],
    footerRef: [{ type: ViewChild, args: ['footer', { static: false },] }]
};
if (false) {
    /** @type {?} */
    TableBuilderComponent.prototype.dirty;
    /** @type {?} */
    TableBuilderComponent.prototype.rendering;
    /** @type {?} */
    TableBuilderComponent.prototype.isRendered;
    /** @type {?} */
    TableBuilderComponent.prototype.contentInit;
    /** @type {?} */
    TableBuilderComponent.prototype.contentCheck;
    /** @type {?} */
    TableBuilderComponent.prototype.showedCellByDefault;
    /** @type {?} */
    TableBuilderComponent.prototype.scrollOffset;
    /** @type {?} */
    TableBuilderComponent.prototype.recalculated;
    /** @type {?} */
    TableBuilderComponent.prototype.headerRef;
    /** @type {?} */
    TableBuilderComponent.prototype.footerRef;
    /** @type {?} */
    TableBuilderComponent.prototype.sourceIsNull;
    /** @type {?} */
    TableBuilderComponent.prototype.isScrolling;
    /**
     * @type {?}
     * @private
     */
    TableBuilderComponent.prototype.forcedRefresh;
    /**
     * @type {?}
     * @private
     */
    TableBuilderComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    TableBuilderComponent.prototype.checkedTaskId;
    /** @type {?} */
    TableBuilderComponent.prototype.selection;
    /** @type {?} */
    TableBuilderComponent.prototype.templateParser;
    /** @type {?} */
    TableBuilderComponent.prototype.cd;
    /** @type {?} */
    TableBuilderComponent.prototype.ngZone;
    /** @type {?} */
    TableBuilderComponent.prototype.utils;
    /** @type {?} */
    TableBuilderComponent.prototype.resize;
    /** @type {?} */
    TableBuilderComponent.prototype.sortable;
    /** @type {?} */
    TableBuilderComponent.prototype.contextMenu;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderComponent.prototype.app;
    /** @type {?} */
    TableBuilderComponent.prototype.filterable;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderComponent.prototype.draggable;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderComponent.prototype.viewChanges;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderComponent.prototype.overloadScroll;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLWJ1aWxkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUlILGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQU1OLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQU1ILGtCQUFrQixFQUVyQixNQUFNLHFDQUFxQyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxN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MENBQTJDOztJQUMzQywrQ0FBcUQ7O0lBQ3JELG1DQUFxQzs7SUFDckMsdUNBQThCOztJQUM5QixzQ0FBbUM7O0lBQ25DLHVDQUF3Qzs7SUFDeEMseUNBQXlDOztJQUN6Qyw0Q0FBK0M7Ozs7O0lBQy9DLG9DQUFzQzs7SUFDdEMsMkNBQTZDOzs7OztJQUM3QywwQ0FBOEM7Ozs7O0lBQzlDLDRDQUEwRDs7Ozs7SUFDMUQsK0NBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBBZnRlclZpZXdDaGVja2VkLFxyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBOZ1pvbmUsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBTaW1wbGVDaGFuZ2UsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgQW55LFxyXG4gICAgRm4sXHJcbiAgICBLZXlNYXAsXHJcbiAgICBSZWNhbGN1bGF0ZWRTdGF0dXMsXHJcbiAgICBTY3JvbGxPZmZzZXRTdGF0dXMsXHJcbiAgICBUYWJsZVNpbXBsZUNoYW5nZXMsXHJcbiAgICBUZW1wbGF0ZUtleXNcclxufSBmcm9tICcuL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IFRhYmxlQnVpbGRlckFwaUltcGwgfSBmcm9tICcuL3RhYmxlLWJ1aWxkZXIuYXBpJztcclxuaW1wb3J0IHsgTkdYX0FOSU1BVElPTiB9IGZyb20gJy4vYW5pbWF0aW9ucy9mYWRlLmFuaW1hdGlvbic7XHJcbmltcG9ydCB7IENvbHVtbnNTY2hlbWEgfSBmcm9tICcuL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IE5neENvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtY29sdW1uL25neC1jb2x1bW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGVtcGxhdGVQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90ZW1wbGF0ZS1wYXJzZXIvdGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0YWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3NvcnRhYmxlL3NvcnRhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNpemFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9yZXNpemVyL3Jlc2l6YWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuc2VydmljZSc7XHJcbmltcG9ydCB7IEZpbHRlcmFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhYmxlRmlsdGVyVHlwZSB9IGZyb20gJy4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERyYWdnYWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RyYWdnYWJsZS9kcmFnZ2FibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFRhYmxlVmlld0NoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90YWJsZS12aWV3LWNoYW5nZXMvbmd4LXRhYmxlLXZpZXctY2hhbmdlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3ZlcmxvYWRTY3JvbGxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9vdmVybG9hZC1zY3JvbGwvb3ZlcmxvYWQtc2Nyb2xsLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgeyBUSU1FX0lETEUsIFRJTUVfUkVMT0FELCBGUkFNRV9USU1FIH06IHR5cGVvZiBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCA9IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC10YWJsZS1idWlsZGVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1idWlsZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL3RhYmxlLWJ1aWxkZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLFxyXG4gICAgICAgIFNvcnRhYmxlU2VydmljZSxcclxuICAgICAgICBTZWxlY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIFJlc2l6YWJsZVNlcnZpY2UsXHJcbiAgICAgICAgQ29udGV4dE1lbnVTZXJ2aWNlLFxyXG4gICAgICAgIEZpbHRlcmFibGVTZXJ2aWNlLFxyXG4gICAgICAgIERyYWdnYWJsZVNlcnZpY2UsXHJcbiAgICAgICAgT3ZlcmxvYWRTY3JvbGxTZXJ2aWNlXHJcbiAgICBdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICAgIGFuaW1hdGlvbnM6IFtOR1hfQU5JTUFUSU9OXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVCdWlsZGVyQ29tcG9uZW50IGV4dGVuZHMgVGFibGVCdWlsZGVyQXBpSW1wbFxyXG4gICAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcclxuICAgIHB1YmxpYyBkaXJ0eTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgcmVuZGVyaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNSZW5kZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGNvbnRlbnRJbml0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgY29udGVudENoZWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc2hvd2VkQ2VsbEJ5RGVmYXVsdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgc2Nyb2xsT2Zmc2V0OiBTY3JvbGxPZmZzZXRTdGF0dXMgPSB7IG9mZnNldDogZmFsc2UgfTtcclxuICAgIHB1YmxpYyByZWNhbGN1bGF0ZWQ6IFJlY2FsY3VsYXRlZFN0YXR1cyA9IHsgcmVjYWxjdWxhdGVIZWlnaHQ6IGZhbHNlIH07XHJcbiAgICBAVmlld0NoaWxkKCdoZWFkZXInLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHB1YmxpYyBoZWFkZXJSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xyXG4gICAgQFZpZXdDaGlsZCgnZm9vdGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgZm9vdGVyUmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcclxuICAgIHB1YmxpYyBzb3VyY2VJc051bGw6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNTY3JvbGxpbmc6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGZvcmNlZFJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG4gICAgcHJpdmF0ZSBjaGVja2VkVGFza0lkOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzZWxlY3Rpb246IFNlbGVjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUGFyc2VyOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHJlc2l6ZTogUmVzaXphYmxlU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc29ydGFibGU6IFNvcnRhYmxlU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY29udGV4dE1lbnU6IENvbnRleHRNZW51U2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgYXBwOiBBcHBsaWNhdGlvblJlZixcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmlsdGVyYWJsZTogRmlsdGVyYWJsZVNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRyYWdnYWJsZTogRHJhZ2dhYmxlU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdmlld0NoYW5nZXM6IE5neFRhYmxlVmlld0NoYW5nZXNTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBvdmVybG9hZFNjcm9sbDogT3ZlcmxvYWRTY3JvbGxTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VsZWN0aW9uRW50cmllcygpOiBLZXlNYXA8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbC5lbnRyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc291cmNlRXhpc3RzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgdmlld0lzRGlydHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudENoZWNrICYmICF0aGlzLmZvcmNlZFJlZnJlc2g7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrU291cmNlSXNOdWxsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhKCdsZW5ndGgnIGluICh0aGlzLnNvdXJjZSB8fCB7fSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNhbGN1bGF0ZUhlaWdodCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlZCA9IHsgcmVjYWxjdWxhdGVIZWlnaHQ6IHRydWUgfTtcclxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyA9IHt9KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgbm9uSWRlbnRpY2FsU3RydWN0dXJlOiBib29sZWFuID0gdGhpcy5zb3VyY2VFeGlzdHMgJiYgdGhpcy5nZXRDb3VudEtleXMoKSAhPT0gdGhpcy5yZW5kZXJlZENvdW50S2V5cztcclxuICAgICAgICB0aGlzLnNvdXJjZUlzTnVsbCA9IHRoaXMuY2hlY2tTb3VyY2VJc051bGwoKTtcclxuICAgICAgICB0aGlzLnNvcnRhYmxlLnNldERlZmluaXRpb24odGhpcy5zb3J0VHlwZXMpO1xyXG5cclxuICAgICAgICBpZiAobm9uSWRlbnRpY2FsU3RydWN0dXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRDb3VudEtleXMgPSB0aGlzLmdldENvdW50S2V5cygpO1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbU1vZGVsQ29sdW1uc0tleXMgPSB0aGlzLmdlbmVyYXRlQ3VzdG9tTW9kZWxDb2x1bW5zS2V5cygpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsQ29sdW1uS2V5cyA9IHRoaXMuZ2VuZXJhdGVNb2RlbENvbHVtbktleXMoKTtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgICAgICAgICBjb25zdCB1bkRpcnR5OiBib29sZWFuID0gIXRoaXMuZGlydHk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRmlsdGVyVmFsdWVzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodW5EaXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVjeWNsZVZpZXc6IGJvb2xlYW4gPSB1bkRpcnR5ICYmIHRoaXMuaXNSZW5kZXJlZCAmJiB0aGlzLmNvbnRlbnRJbml0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlY3ljbGVWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKFRhYmxlU2ltcGxlQ2hhbmdlcy5TT1VSQ0VfS0VZIGluIGNoYW5nZXMgJiYgdGhpcy5pc1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2UgPSBjaGFuZ2VzW1RhYmxlU2ltcGxlQ2hhbmdlcy5TT1VSQ0VfS0VZXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydEFuZEZpbHRlcigpLnRoZW4oKCkgPT4gdGhpcy5yZUNoZWNrRGVmaW5pdGlvbnMoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoVGFibGVTaW1wbGVDaGFuZ2VzLlNDSEVNQV9DT0xVTU5TIGluIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2NoZW1hQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzW1RhYmxlU2ltcGxlQ2hhbmdlcy5TQ0hFTUFfQ09MVU1OU107XHJcbiAgICAgICAgICAgIGlmICghc2NoZW1hQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgIGBZb3UgbmVlZCBzZXQgY29ycmVjdCA8bmd4LXRhYmxlLWJ1aWxkZXIgW3NjaGVtYS1jb2x1bW5zXT1cIltdIHx8IFsuLl1cIiAvPiBmb3Igb25lIHRpbWUgYmluZGluZ2BcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnRDaGVjayA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5wcmltYXJ5S2V5ID0gdGhpcy5wcmltYXJ5S2V5O1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5saXN0ZW5TaGlmdEtleSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2Nyb2xsT2Zmc2V0KG9mZnNldDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsT2Zmc2V0ID0geyBvZmZzZXQgfTtcclxuICAgICAgICB0aGlzLmlkbGVEZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcmtWaXNpYmxlQ29sdW1uKGNvbHVtbjogSFRNTERpdkVsZW1lbnQsIHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb2x1bW5bJ3Zpc2libGUnXSA9IHZpc2libGU7XHJcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcmtEaXJ0eUNoZWNrKCk7XHJcbiAgICAgICAgdGhpcy5tYXJrVGVtcGxhdGVDb250ZW50Q2hlY2soKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlRXhpc3RzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5UZW1wbGF0ZUNoYW5nZXMoKTtcclxuICAgICAgICB0aGlzLmxpc3RlblNlbGVjdGlvbkNoYW5nZXMoKTtcclxuICAgICAgICB0aGlzLnJlY2hlY2tUZW1wbGF0ZUNoYW5nZXMoKTtcclxuICAgICAgICB0aGlzLmxpc3RlblNjcm9sbEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlld0lzRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3Rm9yY2VSZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLnNjaGVtYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95JC5uZXh0KHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFya1RlbXBsYXRlQ29udGVudENoZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGVudEluaXQgPSAhIXRoaXMuc291cmNlIHx8ICEodGhpcy5jb2x1bW5UZW1wbGF0ZXMgJiYgdGhpcy5jb2x1bW5UZW1wbGF0ZXMubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFya0RpcnR5Q2hlY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IEtleSB0YWJsZSBnZW5lcmF0aW9uIGZvciBpbnRlcm5hbCB1c2VcclxuICAgICAqIEBzYW1wbGU6IGtleXMgLSBbJ2lkJywgJ3ZhbHVlJ10gLT4geyBpZDogdHJ1ZSwgdmFsdWU6IHRydWUgfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVDb2x1bW5zS2V5TWFwKGtleXM6IHN0cmluZ1tdKTogS2V5TWFwPGJvb2xlYW4+IHtcclxuICAgICAgICBjb25zdCBtYXA6IEtleU1hcDxib29sZWFuPiA9IHt9O1xyXG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IChtYXBba2V5XSA9IHRydWUpKTtcclxuICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Q2hlY2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnV0aWxzLm1hY3JvdGFzaygoKSA9PiB0aGlzLnJlbmRlclRhYmxlKCksIFRJTUVfSURMRSkudGhlbigoKSA9PiB0aGlzLmlkbGVEZXRlY3RDaGFuZ2VzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXJUYWJsZSh7IGFzeW5jIH06IHsgYXN5bmM6IGJvb2xlYW4gfSA9IHsgYXN5bmM6IHRydWUgfSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlbmRlcmluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmluZyA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgY29sdW1uTGlzdDogc3RyaW5nW10gPSB0aGlzLmdlbmVyYXRlRGlzcGxheWVkQ29sdW1ucygpO1xyXG4gICAgICAgIGNvbnN0IGRyYXdUYXNrOiBGbjxzdHJpbmdbXSwgUHJvbWlzZTx2b2lkPj4gPVxyXG4gICAgICAgICAgICB0aGlzLmFzeW5jQ29sdW1ucyAmJiBhc3luYyA/IHRoaXMuYXN5bmNEcmF3Q29sdW1ucy5iaW5kKHRoaXMpIDogdGhpcy5zeW5jRHJhd0NvbHVtbnMuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnNvcnRhYmxlLmVtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydEFuZEZpbHRlcigpLnRoZW4oKCkgPT4gZHJhd1Rhc2soY29sdW1uTGlzdCkudGhlbigoKSA9PiB0aGlzLmVtaXRSZW5kZXJlZCgpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZHJhd1Rhc2soY29sdW1uTGlzdCkudGhlbigoKSA9PiB0aGlzLmVtaXRSZW5kZXJlZCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZUNvbHVtblZpc2liaWxpdHkoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlY2hlY2tWaWV3cG9ydENoZWNrZWQoKTtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLnRvZ2dsZUNvbHVtblZpc2liaWxpdHkoa2V5KTtcclxuICAgICAgICB0aGlzLnV0aWxzXHJcbiAgICAgICAgICAgIC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY2hlbWEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjaGVja1ZpZXdwb3J0Q2hlY2tlZCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmFwcC50aWNrKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldFNjaGVtYSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRhYmxlVmlld3BvcnRDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2hlbWFDb2x1bW5zID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJUYWJsZSh7IGFzeW5jOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLmNoYW5nZVNjaGVtYShbXSk7XHJcblxyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVZpZXdwb3J0Q2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgfSwgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwuVElNRV9JRExFKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxpc3RlblNjcm9sbEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm92ZXJsb2FkU2Nyb2xsLnNjcm9sbFN0YXR1cy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChzY3JvbGxpbmc6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1Njcm9sbGluZyA9IHNjcm9sbGluZztcclxuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0ZpbHRlclZhbHVlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVGaWx0ZXJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGUgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGUgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLmNvbHVtbk9wdGlvbnMgJiYgdGhpcy5jb2x1bW5PcHRpb25zLmZpbHRlclR5cGUpIHx8XHJcbiAgICAgICAgICAgICAgICBUYWJsZUZpbHRlclR5cGUuU1RBUlRfV0lUSDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxDb2x1bW5LZXlzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmFibGUuZmlsdGVyVHlwZURlZmluaXRpb25ba2V5XSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGVEZWZpbml0aW9uW2tleV0gfHwgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlY2hlY2tUZW1wbGF0ZUNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcHAudGljaygpLCBUSU1FX1JFTE9BRCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuU2VsZWN0aW9uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ub25DaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAudGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2aWV3Rm9yY2VSZWZyZXNoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmNoZWNrZWRUYXNrSWQpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRUYXNrSWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmNlZFJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrVGVtcGxhdGVDb250ZW50Q2hlY2soKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0sIEZSQU1FX1RJTUUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuVGVtcGxhdGVDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbHVtblRlbXBsYXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbHVtblRlbXBsYXRlcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya1RlbXBsYXRlQ29udGVudENoZWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnVUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LmV2ZW50cy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0ZWN0Q2hhbmdlcygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IGxhenkgcmVuZGVyaW5nIG9mIGNvbHVtbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBhc3luY0RyYXdDb2x1bW5zKGNvbHVtbkxpc3Q6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXg6IG51bWJlciA9IDA7IGluZGV4IDwgY29sdW1uTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgPSBjb2x1bW5MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgY29uc3Qgc2NoZW1hOiBDb2x1bW5zU2NoZW1hID0gdGhpcy5tZXJnZUNvbHVtblNjaGVtYShrZXksIGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY2hlbWEuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnV0aWxzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRDb2x1bW5MaXN0ICYmIHRoaXMucHJvY2Vzc2VkQ29sdW1uTGlzdChzY2hlbWEsIGtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkQ29sdW1uTGlzdChzY2hlbWEsIGtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHN5bmMgcmVuZGVyaW5nIG9mIGNvbHVtbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBzeW5jRHJhd0NvbHVtbnMoY29sdW1uTGlzdDogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLnV0aWxzLm1pY3JvdGFzaygoKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4OiBudW1iZXIgPSAwOyBpbmRleCA8IGNvbHVtbkxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXk6IHN0cmluZyA9IGNvbHVtbkxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hOiBDb2x1bW5zU2NoZW1hID0gdGhpcy5tZXJnZUNvbHVtblNjaGVtYShrZXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkQ29sdW1uTGlzdChzY2hlbWEsIGNvbHVtbkxpc3RbaW5kZXhdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEN1c3RvbUNvbHVtblNjaGVtYUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IFBhcnRpYWw8Q29sdW1uc1NjaGVtYT4ge1xyXG4gICAgICAgIHJldHVybiAoKHRoaXMuc2NoZW1hQ29sdW1ucyAmJiB0aGlzLnNjaGVtYUNvbHVtbnNbaW5kZXhdKSB8fCAoe30gYXMgQW55KSkgYXMgUGFydGlhbDxDb2x1bW5zU2NoZW1hPjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiAtIGl0IGlzIG5lY2Vzc2FyeSB0byBjb21iaW5lIHRoZSB0ZW1wbGF0ZXMgZ2l2ZW4gZnJvbSB0aGUgc2VydmVyIGFuZCBkZWZhdWx0XHJcbiAgICAgKiBAcGFyYW0ga2V5IC0gY29sdW1uIHNjaGVtYSBmcm9tIHJlbmRlcmVkIHRlbXBsYXRlcyBtYXBcclxuICAgICAqIEBwYXJhbSBpbmRleCAtIGNvbHVtbiBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1lcmdlQ29sdW1uU2NoZW1hKGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogQ29sdW1uc1NjaGVtYSB7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ29sdW1uOiBQYXJ0aWFsPENvbHVtbnNTY2hlbWE+ID0gdGhpcy5nZXRDdXN0b21Db2x1bW5TY2hlbWFCeUluZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVkVGVtcGxhdGVzW2tleV0pIHtcclxuICAgICAgICAgICAgY29uc3QgY29sdW1uOiBOZ3hDb2x1bW5Db21wb25lbnQgPSBuZXcgTmd4Q29sdW1uQ29tcG9uZW50KCkud2l0aEtleShrZXkpO1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVDb2x1bW5NZXRhZGF0YShjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVmYXVsdENvbHVtbjogQ29sdW1uc1NjaGVtYSA9IHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKGN1c3RvbUNvbHVtbi5rZXkgPT09IGRlZmF1bHRDb2x1bW4ua2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XSA9IHsgLi4uZGVmYXVsdENvbHVtbiwgLi4uY3VzdG9tQ29sdW1uIH0gYXMgQ29sdW1uc1NjaGVtYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVkVGVtcGxhdGVzW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IGNvbHVtbiBtZXRhIGluZm9ybWF0aW9uIHByb2Nlc3NpbmdcclxuICAgICAqIEBwYXJhbSBzY2hlbWEgLSBjb2x1bW4gc2NoZW1hXHJcbiAgICAgKiBAcGFyYW0ga2V5IC0gY29sdW1uIG5hbWVcclxuICAgICAqIEBwYXJhbSBhc3luYyAtIHdoZXRoZXIgdG8gZHJhdyBhIGNvbHVtbiBhc3luY2hyb25vdXNseVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByb2Nlc3NlZENvbHVtbkxpc3Qoc2NoZW1hOiBDb2x1bW5zU2NoZW1hLCBrZXk6IHN0cmluZywgYXN5bmM6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLnNjaGVtYS5jb2x1bW5zLnB1c2godGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlZFRlbXBsYXRlc1trZXldKTtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogbm90aWZpY2F0aW9uIHRoYXQgdGhlIHRhYmxlIGhhcyBiZWVuIHJlbmRlcmVkXHJcbiAgICAgKiBAc2VlIFRhYmxlQnVpbGRlckNvbXBvbmVudCNpc1JlbmRlcmVkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZW1pdFJlbmRlcmVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNSZW5kZXJlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFmdGVyUmVuZGVyZWQuZW1pdCh0aGlzLmlzUmVuZGVyZWQpO1xyXG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVIZWlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogcGFyc2luZyB0ZW1wbGF0ZXMgYW5kIGlucHV0IHBhcmFtZXRlcnMgKGtleXMsIHNjaGVtYUNvbHVtbnMpIGZvciB0aGUgbnVtYmVyIG9mIGNvbHVtbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZURpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBnZW5lcmF0ZWRMaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIuaW5pdGlhbFNjaGVtYSh0aGlzLmNvbHVtbk9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHsgc2ltcGxlUmVuZGVyZWRLZXlzLCBhbGxSZW5kZXJlZEtleXMgfTogVGVtcGxhdGVLZXlzID0gdGhpcy5wYXJzZVRlbXBsYXRlS2V5cygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zY2hlbWFDb2x1bW5zICYmIHRoaXMuc2NoZW1hQ29sdW1ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVkTGlzdCA9IHRoaXMuc2NoZW1hQ29sdW1ucy5tYXAoKGNvbHVtbjogQ29sdW1uc1NjaGVtYSkgPT4gY29sdW1uLmtleSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlZExpc3QgPSB0aGlzLmN1c3RvbU1vZGVsQ29sdW1uc0tleXM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaW1wbGVSZW5kZXJlZEtleXMuc2l6ZSkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZWRMaXN0ID0gYWxsUmVuZGVyZWRLZXlzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlZExpc3QgPSB0aGlzLm1vZGVsQ29sdW1uS2V5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBnZW5lcmF0ZWRMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiB0aGlzIG1ldGhvZCByZXR1cm5zIHRoZSBrZXlzIGJ5IHdoaWNoIHRvIGRyYXcgdGFibGUgY29sdW1uc1xyXG4gICAgICogPGFsbG93ZWRLZXlNYXA+IC0gcG9zc2libGUga2V5cyBmcm9tIHRoZSBtb2RlbCwgdGhpcyBtdXN0IGJlIGNoZWNrZWQsXHJcbiAgICAgKiBiZWNhdXNlIHVzZXJzIGNhbiBkcmF3IHRoZSB3cm9uZyBrZXlzIGluIHRoZSB0ZW1wbGF0ZSAobmd4LWNvbHVtbiBrZXk9aW52YWxpZClcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZVRlbXBsYXRlS2V5cygpOiBUZW1wbGF0ZUtleXMge1xyXG4gICAgICAgIGNvbnN0IGFsbG93ZWRLZXlNYXA6IEtleU1hcDxib29sZWFuPiA9IHRoaXMua2V5cy5sZW5ndGhcclxuICAgICAgICAgICAgPyB0aGlzLmdlbmVyYXRlQ29sdW1uc0tleU1hcCh0aGlzLmN1c3RvbU1vZGVsQ29sdW1uc0tleXMpXHJcbiAgICAgICAgICAgIDogdGhpcy5nZW5lcmF0ZUNvbHVtbnNLZXlNYXAodGhpcy5tb2RlbENvbHVtbktleXMpO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLnBhcnNlKGFsbG93ZWRLZXlNYXAsIHRoaXMuY29sdW1uVGVtcGxhdGVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsUmVuZGVyZWRLZXlzOiBBcnJheS5mcm9tKHRoaXMudGVtcGxhdGVQYXJzZXIuZnVsbFRlbXBsYXRlS2V5cyksXHJcbiAgICAgICAgICAgIG92ZXJyaWRpbmdSZW5kZXJlZEtleXM6IHRoaXMudGVtcGxhdGVQYXJzZXIub3ZlcnJpZGVUZW1wbGF0ZUtleXMsXHJcbiAgICAgICAgICAgIHNpbXBsZVJlbmRlcmVkS2V5czogdGhpcy50ZW1wbGF0ZVBhcnNlci50ZW1wbGF0ZUtleXNcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==