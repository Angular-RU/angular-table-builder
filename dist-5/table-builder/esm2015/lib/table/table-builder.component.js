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
     * @private
     * @param {?=} changes
     * @return {?}
     */
    static checkCorrectInitialSchema(changes = {}) {
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
        TableBuilderComponent.checkCorrectInitialSchema(changes);
        /** @type {?} */
        const nonIdenticalStructure = this.sourceExists && this.getCountKeys() !== this.renderedCountKeys;
        this.sourceIsNull = this.checkSourceIsNull();
        this.sortable.setDefinition(this.sortTypes);
        if (nonIdenticalStructure) {
            this.preRenderTable();
        }
        else if (TableSimpleChanges.SOURCE_KEY in changes && this.isRendered) {
            this.preSortAndFilterTable(changes);
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
     * @param {?} event
     * @param {?} root
     * @return {?}
     */
    cdkDragMoved(event, root) {
        /** @type {?} */
        const preview = event.source._dragRef['_preview'];
        /** @type {?} */
        const transform = event.source._dragRef['_preview'].style.transform || '';
        const [x, , z] = (/** @type {?} */ (transform
            .replace(/translate3d|\(|\)|px/g, '')
            .split(',')
            .map((/**
         * @param {?} val
         * @return {?}
         */
        (val) => parseFloat(val)))));
        preview.style.transform = `translate3d(${x}px, ${root.getBoundingClientRect().top}px, ${z}px)`;
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
     * @param {?=} changes
     * @return {?}
     */
    preSortAndFilterTable(changes = {}) {
        this.originalSource = changes[TableSimpleChanges.SOURCE_KEY].currentValue;
        this.sortAndFilter().then((/**
         * @return {?}
         */
        () => this.reCheckDefinitions()));
    }
    /**
     * @private
     * @return {?}
     */
    preRenderTable() {
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
        if (this.templateParser.schema) {
            this.templateParser.schema.columns.push(this.templateParser.compiledTemplates[key]);
            if (async) {
                this.idleDetectChanges();
            }
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
TableBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-table-builder',
                template: "<div\r\n    #root\r\n    observerView\r\n    [style.width]=\"width\"\r\n    class=\"table-grid__root\"\r\n    [style.height.px]=\"height\"\r\n    [class.table-grid__root--is-rendered]=\"isRendered\"\r\n    [class.table-grid__root--is-scrolling]=\"isScrolling\"\r\n    [class.table-grid__root-auto-height]=\"autoHeightDetect\"\r\n    [class.table-grid__no-display]=\"!(columnSchema.length > 0)\"\r\n    [class.table-grid__root--content-is-init]=\"contentInit && inViewport\"\r\n    [class.table-grid__root--is-scroll-overload]=\"tableViewport.scrollWidth > tableViewport.clientWidth\"\r\n    [class.table-grid__root--empty-list]=\"!source?.length && !filterable.filtering && !isFrozenView\"\r\n    [class.table-grid__root--visible]=\"contentInit && root.offsetHeight > clientRowHeight && columnHeight\"\r\n    (contextmenu)=\"contextMenuTemplate ? contextMenu.openContextMenu($event) : null\"\r\n    (recalculatedHeight)=\"recalculateHeight()\"\r\n    (observeVisible)=\"checkVisible($event)\"\r\n    [autoHeight]=\"{\r\n        detect: autoHeightDetect,\r\n        height: height,\r\n        inViewport: inViewport,\r\n        columnHeight: columnHeight,\r\n        statusRendered: isRendered,\r\n        sourceLength: source?.length || 0\r\n    }\"\r\n    [headerHeight]=\"headerRef?.nativeElement.clientHeight\"\r\n    [footerHeight]=\"footerRef?.nativeElement.clientHeight\"\r\n>\r\n    <div\r\n        cdkDropList\r\n        #tableViewport\r\n        class=\"table-grid\"\r\n        [wheelThrottling]=\"tableViewport\"\r\n        [cdkDropListDisabled]=\"!accessDragging\"\r\n        (scrollOffset)=\"updateScrollOffset($event)\"\r\n        [class.table-grid__scroll-offset]=\"scrollOffset.offset\"\r\n        [class.table-grid__native-scrollbar]=\"nativeScrollbar\"\r\n        cdkDropListOrientation=\"horizontal\"\r\n        (cdkDropListDropped)=\"drop($event)\"\r\n    >\r\n        <div class=\"table-grid__header-sticky\" *ngIf=\"headerTemplate\" #header>\r\n            <ng-content select=\"ngx-header\"></ng-content>\r\n        </div>\r\n\r\n        <div\r\n            #area\r\n            class=\"table-grid__column-area-content\"\r\n            [style.width.px]=\"\r\n                tableViewportChecked && tableViewport.scrollWidth > tableViewport.clientWidth\r\n                    ? tableViewport.scrollWidth\r\n                    : null\r\n            \"\r\n        >\r\n            <ng-container *ngFor=\"let columnSchema of columnSchema; let index = index\">\r\n                <div\r\n                    #column\r\n                    cdkDrag\r\n                    observerView\r\n                    cdkDragHandle\r\n                    [rendered]=\"isRendered\"\r\n                    [cdkDragBoundary]=\"area\"\r\n                    class=\"table-grid__column\"\r\n                    *ngIf=\"columnSchema.isVisible\"\r\n                    [style.height.px]=\"columnHeight\"\r\n                    [ngStyle]=\"columnSchema?.cssStyle\"\r\n                    [ngClass]=\"columnSchema?.cssClass\"\r\n                    [attr.column-id]=\"columnSchema.key\"\r\n                    [cdkDragDisabled]=\"!accessDragging\"\r\n                    (cdkDragMoved)=\"cdkDragMoved($event, root)\"\r\n                    [style.max-width.px]=\"columnSchema?.width || clientColWidth\"\r\n                    [style.width.px]=\"columnSchema?.width || clientColWidth\"\r\n                    [style.min-width.px]=\"columnSchema?.width || clientColWidth\"\r\n                    [class.table-grid__column--with-footer-content]=\"footerTemplate\"\r\n                    [class.table-grid__column--vertical-line]=\"verticalBorder || columnSchema?.verticalLine\"\r\n                    [class.table-grid__column--custom-column]=\"columnSchema?.customColumn\"\r\n                    [class.table-grid__column--selected-all]=\"selection.selectionModel.isAll\"\r\n                    [class.table-grid__column--sticky-left]=\"columnSchema?.stickyLeft\"\r\n                    [class.table-grid__column--sticky-right]=\"columnSchema?.stickyRight\"\r\n                    [class.table-grid__column--is-visible]=\"column['visible']\"\r\n                    [class.table-grid__column--is-invisible]=\"!column['visible']\"\r\n                    [class.table-grid__column--is-dragging]=\"isDragging[columnSchema.key]\"\r\n                    [class.table-grid__column--default-width]=\"!autoWidth\"\r\n                    [class.table-grid__column--filter-enable]=\"filterTemplate\"\r\n                    (observeVisible)=\"markVisibleColumn(column, $event)\"\r\n                >\r\n                    <div\r\n                        [@fadeAnimation]\r\n                        class=\"table-grid__column-area\"\r\n                        *ngIf=\"asyncColumns === false || column['visible']\"\r\n                    >\r\n                        <table-thead\r\n                            [column-schema]=\"columnSchema\"\r\n                            (mouseleave)=\"disableDragging()\"\r\n                            [header-top]=\"headerRef?.nativeElement.offsetHeight || 0\"\r\n                            [sortable-definition]=\"sortable.definition\"\r\n                            [filterable-definition]=\"filterable.definition\"\r\n                            [client-row-height]=\"clientRowHeight\"\r\n                            (resize)=\"resizeColumn($event, column)\"\r\n                            (sortByKey)=\"sortByKey($event)\"\r\n                        >\r\n                            <div\r\n                                slot=\"draggable\"\r\n                                *ngIf=\"columnSchema?.draggable\"\r\n                                class=\"table-grid__column--draggable\"\r\n                                (mouseenter)=\"enableDragging(columnSchema.key)\"\r\n                            >\r\n                                <drag-icon></drag-icon>\r\n                            </div>\r\n                        </table-thead>\r\n\r\n                        <table-tbody\r\n                            [source]=\"source\"\r\n                            [striped]=\"striped\"\r\n                            [column-index]=\"index\"\r\n                            [is-rendered]=\"isRendered\"\r\n                            [primary-key]=\"primaryKey\"\r\n                            [is-firefox]=\"isFirefoxMode\"\r\n                            [recalculated]=\"recalculated\"\r\n                            [buffer-amount]=\"bufferAmount\"\r\n                            [column-schema]=\"columnSchema\"\r\n                            [table-viewport]=\"tableViewport\"\r\n                            [context-menu]=\"contextMenuTemplate\"\r\n                            [enable-selection]=\"enableSelection\"\r\n                            [client-row-height]=\"clientRowHeight\"\r\n                            [selection-entries]=\"selectionEntries\"\r\n                            [showed-cell-by-default]=\"showedCellByDefault\"\r\n                            [column-virtual-height]=\"columnVirtualHeight\"\r\n                        >\r\n                        </table-tbody>\r\n                    </div>\r\n                </div>\r\n            </ng-container>\r\n        </div>\r\n\r\n        <div class=\"table-grid__footer-sticky\" *ngIf=\"footerTemplate && isRendered\" #footer [@fadeAnimation]>\r\n            <ng-content select=\"ngx-footer\"></ng-content>\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"isFrozenView\" class=\"freeze\"></div>\r\n</div>\r\n\r\n<ng-template [ngIf]=\"contextMenuTemplate && contextMenu.state.opened\">\r\n    <ng-content select=\"ngx-context-menu\"></ng-content>\r\n</ng-template>\r\n\r\n<div *ngIf=\"(source && source.length) === 0 && !filterable.filtering\">\r\n    <ng-content select=\"ngx-empty\"></ng-content>\r\n</div>\r\n\r\n<div *ngIf=\"sourceIsNull\">\r\n    <ng-content select=\"ngx-source-null\"></ng-content>\r\n</div>\r\n\r\n<ng-template [ngIf]=\"filterTemplate\">\r\n    <ng-content select=\"ngx-filter\"></ng-content>\r\n</ng-template>\r\n",
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
                styles: ["@-webkit-keyframes slide{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}.table-grid:not(.table-grid__native-scrollbar){color:transparent;transition:color .3s;background:#fff}.table-grid:not(.table-grid__native-scrollbar)::-webkit-scrollbar,.table-grid:not(.table-grid__native-scrollbar)::-webkit-scrollbar-thumb{width:10px;border-radius:10px;background-clip:padding-box;border:2px solid transparent;height:12px}.table-grid:not(.table-grid__native-scrollbar)::-webkit-scrollbar-thumb{box-shadow:inset 0 0 0 10px;background:0 0}.table-grid:not(.table-grid__native-scrollbar):hover{color:rgba(0,0,0,.2)}.table-grid__column{width:100%;box-sizing:border-box;z-index:1;touch-action:initial!important;-webkit-user-drag:initial!important;-webkit-tap-highlight-color:initial!important;-webkit-user-select:initial!important;-moz-user-select:initial!important;-ms-user-select:initial!important;user-select:initial!important}.table-grid__column--sticky-left,.table-grid__column--sticky-right{position:-webkit-sticky;position:sticky;background:#fff;will-change:auto;z-index:100}.table-grid__column--sticky-left{left:0}.table-grid__column--sticky-right{right:0}.table-grid__column--selected-all{background:#fff3ad}.table-grid__column--default-width{min-width:200px}.table-grid__column--resize{height:100%;width:10px;position:absolute;background:0 0;cursor:ew-resize;right:0;top:0;display:flex;align-items:center;justify-content:center}.table-grid__column--resize--line{height:70%;width:2px;vertical-align:middle;background:#e0e0e0;display:flex}.table-grid__column:last-child .table-grid__column--resize{display:none}.table-grid__column--vertical-line{border-right:1px solid #e0e0e0}.table-grid__column--vertical-line:last-child{border-left:1px solid #e0e0e0;border-right:none}.table-grid__column--vertical-line:nth-last-child(2){border-right:none}.table-grid__column--draggable,.table-grid__column--filterable,.table-grid__column--sortable{width:24px;height:20px;opacity:.2;font-size:12px;transition:.2s ease-in-out;-webkit-transform:rotate(180deg);transform:rotate(180deg);cursor:pointer}.table-grid__column--draggable-active,.table-grid__column--filterable-active,.table-grid__column--sortable-active{opacity:1}.table-grid__column--filter-enable .table-grid__column--filterable{display:table-cell}.table-grid__column--filterable{display:none}.table-grid__column--draggable{opacity:0}.table-grid__column--draggable-active{opacity:.8}.table-grid__column--filterable,.table-grid__column--sortable-desc{-webkit-transform:rotate(0);transform:rotate(0)}.table-grid__cell--content-sortable{cursor:pointer}.table-grid__cell--content-sortable:hover+.table-grid__column--sortable:not(.table-grid__column--sortable-active),.table-grid__column--sortable:not(.table-grid__column--sortable-active):hover{transition:opacity .2s ease-in-out;opacity:.5}.table-grid .table-grid__column:last-child{width:100%!important;max-width:initial!important}.table-grid__column:not(table-grid__column--vertical-line).table-grid__column--is-dragging{border-right:1px solid #e0e0e0}.table-grid__column--vertical-line .table-grid__column--resize--line{display:none}.cdk-drag-preview .scrollable-content{margin-top:0!important}[draggable=true]{user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}.table-grid__root{opacity:.0012;overflow:hidden;position:relative;border:1px solid transparent;transition:opacity .2s ease-in-out;-webkit-transform:translate(0);transform:translate(0)}.table-grid__root.table-grid__root--visible{box-shadow:0 0 10px -2px #e0e0e0;border:1px solid #e0e0e0}.table-grid__root.table-grid__root--content-is-init{opacity:.4}.table-grid__root.table-grid__root--is-rendered{opacity:1}.table-grid__root-auto-height{height:0}.table-grid__root--is-scrolling table-cell,.table-grid__root--is-scrolling table-tbody,.table-grid__root:not(.table-grid__root--is-rendered) table-cell,.table-grid__root:not(.table-grid__root--is-rendered) table-tbody{pointer-events:none}.table-grid__root:not(.table-grid__root--is-rendered){cursor:wait}.table-grid__root--empty-list{-webkit-transform:translate(9999px)!important;transform:translate(9999px)!important;border:none!important;opacity:0!important;height:0!important}.scrollable-content{height:unset!important;will-change:auto;-webkit-backface-visibility:hidden;backface-visibility:hidden}.table-grid__cell--content,.table-grid__column--draggable,.table-grid__column--filterable,.table-grid__column--sortable,.vertical-align{vertical-align:middle;margin:auto 0;box-sizing:border-box}table-tbody{display:block}.freeze{top:0;left:0;z-index:1000;position:absolute;width:100%;height:100%}.freeze:after{content:\"\";top:0;-webkit-transform:translateX(100%);transform:translateX(100%);width:100%;height:100%;position:absolute;z-index:1;-webkit-animation:1.4s infinite slide;animation:1.4s infinite slide;background:linear-gradient(to right,rgba(255,255,255,0) 0,rgba(255,255,255,.7) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%)}@keyframes slide{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}.filter-founded{border-bottom:1px dotted #000}table-cell{margin:0 auto;width:100%}.table-grid__header-cell{top:0;z-index:100;position:-webkit-sticky;position:sticky;background:#fff;box-sizing:border-box;text-overflow:ellipsis;border-bottom:1px solid #e0e0e0;transition:box-shadow .3s ease-in-out}.table-grid__header-cell--content{overflow:hidden}.table-grid__header-cell:hover .table-grid__column--draggable{opacity:.2}table-tbody .table-grid__cell:last-child{border-bottom:none}.table-grid__cell{color:#000;width:100%;box-sizing:border-box;text-align:center;word-break:break-word;border-bottom:1px solid #e0e0e0;min-height:45px;max-height:45px;display:flex;overflow:hidden;justify-content:center;padding:5px 20px}.table-grid__cell--custom-cell:not(.table-grid__cell--model-cell){padding:0}.table-grid__cell--content{overflow:hidden}.table-grid__cell--content:not(.table-grid__cell--content-sortable){width:100%}.table-grid__cell--content .table-grid__cell--inner-content{overflow:hidden}.table-grid__cell--text-bold{font-weight:700}.table-grid__cell--nowrap,.table-grid__cell--nowrap .table-grid__cell--inner-content{white-space:nowrap;text-overflow:ellipsis}.table-grid__cell--enable-selection{cursor:pointer}.table-grid__cell--strip{background:#f7f7fc}.table-grid__cell--selected{background:#fff3ad}.table-grid__cell--settings{margin-left:10px;display:flex;justify-content:center;align-items:center}.table-grid__cell-overflow-content{position:fixed;background:#fff;padding:10px;border-radius:4px;box-shadow:0 0 10px 2px #e0e0e0;opacity:0;z-index:1;visibility:hidden;white-space:pre-wrap;word-break:break-word;line-height:20px;transition:visibility .1s linear,opacity .1s linear;-webkit-transform:translate(-9999px);transform:translate(-9999px);max-height:300px;max-width:300px;overflow:auto;overflow-x:hidden;margin-top:-10px;margin-left:-50px;font-weight:400;font-size:15px}.table-grid__cell-overflow-content.text-center{text-align:center}.table-grid__cell-overflow-content.visible{visibility:visible;transition:visibility .1s linear,opacity .1s linear;opacity:1;-webkit-transform:translate(0);transform:translate(0)}.cdk-drag-preview .table-grid__header-cell{top:0!important}.table-grid-icon--draggable,.table-grid-icon--sortable{width:24px;height:20px}.table-grid-icon--draggable{cursor:move}.table-grid-icon--filterable{width:20px;height:20px;line-height:20px}.cdk-drag-preview{background:#fff;box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.table-grid__root--is-rendered .table-grid{overflow:auto;overflow-y:auto}.table-grid{position:relative;overflow:hidden;background:#fff;will-change:auto;scroll-behavior:smooth;overflow-x:visible;height:100%}.table-grid__column-area-content{display:flex}.table-grid__footer-sticky,.table-grid__header-sticky{background:#fff;position:-webkit-sticky;position:sticky;z-index:1000;width:100%}.table-grid__header-sticky{top:0;left:0}.table-grid__footer-sticky{bottom:0;left:0}.table-grid__footer-sticky .table-grid__table-content-place{border-top:1px solid #e0e0e0;border-bottom:none}.table-grid__column--with-footer-content table-tbody .table-grid__cell:last-child{border-bottom:none}.table-grid__table-content-place{color:#000;border-bottom:1px solid #e0e0e0}.table-grid__table-content-place--content-cell{box-sizing:border-box;display:flex;overflow:hidden;padding:5px 20px}.table-grid__table-content-place--content-cell .content-box{display:flex;vertical-align:middle;box-sizing:border-box;margin:auto 0}.table-grid__table-content-place--align-center{justify-content:center;text-align:center}.table-grid__table-content-place--align-center .content-box{text-align:center}.table-grid__table-content-place--bold{font-weight:700}.table-grid__cell--inner-content{opacity:0;visibility:hidden;will-change:opacity;transition:visibility .5s ease-in-out,opacity .5s ease-in-out}.table-grid__scroll-offset .table-grid__header-cell{transition:box-shadow .3s ease-in-out;box-shadow:0 3px 2px -2px #e0e0e0}.loaded,.table-grid__scroll-offset .table-grid__cell--inner-content{visibility:visible;opacity:1}.table-grid__scroll-offset .table-grid__cell--inner-content{transition-duration:0s}.table-grid__no-display{opacity:.012!important}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLWJ1aWxkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUlILGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQU1OLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQU1ILGtCQUFrQixFQUVyQixNQUFNLHFDQUFxQyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxN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LDhDQUF1Qzs7Ozs7SUFDdkMseUNBQXFFOzs7OztJQUNyRSw4Q0FBcUM7O0lBR2pDLDBDQUEyQzs7SUFDM0MsK0NBQXFEOztJQUNyRCxtQ0FBcUM7O0lBQ3JDLHVDQUE4Qjs7SUFDOUIsc0NBQW1DOztJQUNuQyx1Q0FBd0M7O0lBQ3hDLHlDQUF5Qzs7SUFDekMsNENBQStDOzs7OztJQUMvQyxvQ0FBc0M7O0lBQ3RDLDJDQUE2Qzs7Ozs7SUFDN0MsMENBQThDOzs7OztJQUM5Qyw0Q0FBMEQ7Ozs7O0lBQzFELCtDQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcclxuICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICBBcHBsaWNhdGlvblJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgTmdab25lLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlLFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFueSxcclxuICAgIEZuLFxyXG4gICAgS2V5TWFwLFxyXG4gICAgUmVjYWxjdWxhdGVkU3RhdHVzLFxyXG4gICAgU2Nyb2xsT2Zmc2V0U3RhdHVzLFxyXG4gICAgVGFibGVTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVGVtcGxhdGVLZXlzXHJcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJBcGlJbXBsIH0gZnJvbSAnLi90YWJsZS1idWlsZGVyLmFwaSc7XHJcbmltcG9ydCB7IE5HWF9BTklNQVRJT04gfSBmcm9tICcuL2FuaW1hdGlvbnMvZmFkZS5hbmltYXRpb24nO1xyXG5pbXBvcnQgeyBDb2x1bW5zU2NoZW1hIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBOZ3hDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LWNvbHVtbi9uZ3gtY29sdW1uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlUGFyc2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGVtcGxhdGUtcGFyc2VyL3RlbXBsYXRlLXBhcnNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29ydGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zb3J0YWJsZS9zb3J0YWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzaXphYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcmVzaXplci9yZXNpemFibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsIH0gZnJvbSAnLi9jb25maWcvdGFibGUtYnVpbGRlci1vcHRpb25zJztcclxuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJhYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYWJsZUZpbHRlclR5cGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbHRlcmFibGUvZmlsdGVyYWJsZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEcmFnZ2FibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kcmFnZ2FibGUvZHJhZ2dhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hUYWJsZVZpZXdDaGFuZ2VzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGFibGUtdmlldy1jaGFuZ2VzL25neC10YWJsZS12aWV3LWNoYW5nZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IE92ZXJsb2FkU2Nyb2xsU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvb3ZlcmxvYWQtc2Nyb2xsL292ZXJsb2FkLXNjcm9sbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2RrRHJhZ1N0YXJ0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcblxyXG5jb25zdCB7IFRJTUVfSURMRSwgVElNRV9SRUxPQUQsIEZSQU1FX1RJTUUgfTogdHlwZW9mIFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsID0gVGFibGVCdWlsZGVyT3B0aW9uc0ltcGw7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LXRhYmxlLWJ1aWxkZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFibGUtYnVpbGRlci5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBUZW1wbGF0ZVBhcnNlclNlcnZpY2UsXHJcbiAgICAgICAgU29ydGFibGVTZXJ2aWNlLFxyXG4gICAgICAgIFNlbGVjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgUmVzaXphYmxlU2VydmljZSxcclxuICAgICAgICBDb250ZXh0TWVudVNlcnZpY2UsXHJcbiAgICAgICAgRmlsdGVyYWJsZVNlcnZpY2UsXHJcbiAgICAgICAgRHJhZ2dhYmxlU2VydmljZSxcclxuICAgICAgICBPdmVybG9hZFNjcm9sbFNlcnZpY2VcclxuICAgIF0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gICAgYW5pbWF0aW9uczogW05HWF9BTklNQVRJT05dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUJ1aWxkZXJDb21wb25lbnQgZXh0ZW5kcyBUYWJsZUJ1aWxkZXJBcGlJbXBsXHJcbiAgICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xyXG4gICAgcHVibGljIGRpcnR5OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyByZW5kZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc1JlbmRlcmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgY29udGVudEluaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBjb250ZW50Q2hlY2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzaG93ZWRDZWxsQnlEZWZhdWx0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzY3JvbGxPZmZzZXQ6IFNjcm9sbE9mZnNldFN0YXR1cyA9IHsgb2Zmc2V0OiBmYWxzZSB9O1xyXG4gICAgcHVibGljIHJlY2FsY3VsYXRlZDogUmVjYWxjdWxhdGVkU3RhdHVzID0geyByZWNhbGN1bGF0ZUhlaWdodDogZmFsc2UgfTtcclxuICAgIEBWaWV3Q2hpbGQoJ2hlYWRlcicsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGhlYWRlclJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XHJcbiAgICBAVmlld0NoaWxkKCdmb290ZXInLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHB1YmxpYyBmb290ZXJSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xyXG4gICAgcHVibGljIHNvdXJjZUlzTnVsbDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpc1Njcm9sbGluZzogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgZm9yY2VkUmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95JDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcbiAgICBwcml2YXRlIGNoZWNrZWRUYXNrSWQ6IG51bWJlciA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHNlbGVjdGlvbjogU2VsZWN0aW9uU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdXRpbHM6IFV0aWxzU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcmVzaXplOiBSZXNpemFibGVTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzb3J0YWJsZTogU29ydGFibGVTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjb250ZXh0TWVudTogQ29udGV4dE1lbnVTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBhcHA6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBmaWx0ZXJhYmxlOiBGaWx0ZXJhYmxlU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZHJhZ2dhYmxlOiBEcmFnZ2FibGVTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSB2aWV3Q2hhbmdlczogTmd4VGFibGVWaWV3Q2hhbmdlc1NlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG92ZXJsb2FkU2Nyb2xsOiBPdmVybG9hZFNjcm9sbFNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWxlY3Rpb25FbnRyaWVzKCk6IEtleU1hcDxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvbk1vZGVsLmVudHJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzb3VyY2VFeGlzdHMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCB2aWV3SXNEaXJ0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50Q2hlY2sgJiYgIXRoaXMuZm9yY2VkUmVmcmVzaDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjaGVja0NvcnJlY3RJbml0aWFsU2NoZW1hKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgPSB7fSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChUYWJsZVNpbXBsZUNoYW5nZXMuU0NIRU1BX0NPTFVNTlMgaW4gY2hhbmdlcykge1xyXG4gICAgICAgICAgICBjb25zdCBzY2hlbWFDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXNbVGFibGVTaW1wbGVDaGFuZ2VzLlNDSEVNQV9DT0xVTU5TXTtcclxuICAgICAgICAgICAgaWYgKCFzY2hlbWFDaGFuZ2UuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgYFlvdSBuZWVkIHNldCBjb3JyZWN0IDxuZ3gtdGFibGUtYnVpbGRlciBbc2NoZW1hLWNvbHVtbnNdPVwiW10gfHwgWy4uXVwiIC8+IGZvciBvbmUgdGltZSBiaW5kaW5nYFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tTb3VyY2VJc051bGwoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEoJ2xlbmd0aCcgaW4gKHRoaXMuc291cmNlIHx8IHt9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlY2FsY3VsYXRlSGVpZ2h0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVkID0geyByZWNhbGN1bGF0ZUhlaWdodDogdHJ1ZSB9O1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzID0ge30pOiB2b2lkIHtcclxuICAgICAgICBUYWJsZUJ1aWxkZXJDb21wb25lbnQuY2hlY2tDb3JyZWN0SW5pdGlhbFNjaGVtYShjaGFuZ2VzKTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9uSWRlbnRpY2FsU3RydWN0dXJlOiBib29sZWFuID0gdGhpcy5zb3VyY2VFeGlzdHMgJiYgdGhpcy5nZXRDb3VudEtleXMoKSAhPT0gdGhpcy5yZW5kZXJlZENvdW50S2V5cztcclxuICAgICAgICB0aGlzLnNvdXJjZUlzTnVsbCA9IHRoaXMuY2hlY2tTb3VyY2VJc051bGwoKTtcclxuICAgICAgICB0aGlzLnNvcnRhYmxlLnNldERlZmluaXRpb24odGhpcy5zb3J0VHlwZXMpO1xyXG5cclxuICAgICAgICBpZiAobm9uSWRlbnRpY2FsU3RydWN0dXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlUmVuZGVyVGFibGUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFRhYmxlU2ltcGxlQ2hhbmdlcy5TT1VSQ0VfS0VZIGluIGNoYW5nZXMgJiYgdGhpcy5pc1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlU29ydEFuZEZpbHRlclRhYmxlKGNoYW5nZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGVudENoZWNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnByaW1hcnlLZXkgPSB0aGlzLnByaW1hcnlLZXk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLmxpc3RlblNoaWZ0S2V5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTY3JvbGxPZmZzZXQob2Zmc2V0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxPZmZzZXQgPSB7IG9mZnNldCB9O1xyXG4gICAgICAgIHRoaXMuaWRsZURldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFya1Zpc2libGVDb2x1bW4oY29sdW1uOiBIVE1MRGl2RWxlbWVudCwgdmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGNvbHVtblsndmlzaWJsZSddID0gdmlzaWJsZTtcclxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFya0RpcnR5Q2hlY2soKTtcclxuICAgICAgICB0aGlzLm1hcmtUZW1wbGF0ZUNvbnRlbnRDaGVjaygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zb3VyY2VFeGlzdHMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlblRlbXBsYXRlQ2hhbmdlcygpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuU2VsZWN0aW9uQ2hhbmdlcygpO1xyXG4gICAgICAgIHRoaXMucmVjaGVja1RlbXBsYXRlQ2hhbmdlcygpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuU2Nyb2xsRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNka0RyYWdNb3ZlZChldmVudDogQ2RrRHJhZ1N0YXJ0LCByb290OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHByZXZpZXc6IEhUTUxFbGVtZW50ID0gZXZlbnQuc291cmNlLl9kcmFnUmVmWydfcHJldmlldyddO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybTogc3RyaW5nID0gZXZlbnQuc291cmNlLl9kcmFnUmVmWydfcHJldmlldyddLnN0eWxlLnRyYW5zZm9ybSB8fCAnJztcclxuICAgICAgICBjb25zdCBbeCwgLCB6XTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdID0gdHJhbnNmb3JtXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC90cmFuc2xhdGUzZHxcXCh8XFwpfHB4L2csICcnKVxyXG4gICAgICAgICAgICAuc3BsaXQoJywnKVxyXG4gICAgICAgICAgICAubWFwKCh2YWw6IHN0cmluZykgPT4gcGFyc2VGbG9hdCh2YWwpKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcblxyXG4gICAgICAgIHByZXZpZXcuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7eH1weCwgJHtyb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcH1weCwgJHt6fXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy52aWV3SXNEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdGb3JjZVJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIuc2NoZW1hID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95JC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXJrVGVtcGxhdGVDb250ZW50Q2hlY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50SW5pdCA9ICEhdGhpcy5zb3VyY2UgfHwgISh0aGlzLmNvbHVtblRlbXBsYXRlcyAmJiB0aGlzLmNvbHVtblRlbXBsYXRlcy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXJrRGlydHlDaGVjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqIEBkZXNjcmlwdGlvbjogS2V5IHRhYmxlIGdlbmVyYXRpb24gZm9yIGludGVybmFsIHVzZVxyXG4gICAgICogQHNhbXBsZToga2V5cyAtIFsnaWQnLCAndmFsdWUnXSAtPiB7IGlkOiB0cnVlLCB2YWx1ZTogdHJ1ZSB9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5lcmF0ZUNvbHVtbnNLZXlNYXAoa2V5czogc3RyaW5nW10pOiBLZXlNYXA8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IG1hcDogS2V5TWFwPGJvb2xlYW4+ID0ge307XHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4gKG1hcFtrZXldID0gdHJ1ZSkpO1xyXG4gICAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnRDaGVjayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXRpbHMubWFjcm90YXNrKCgpID0+IHRoaXMucmVuZGVyVGFibGUoKSwgVElNRV9JRExFKS50aGVuKCgpID0+IHRoaXMuaWRsZURldGVjdENoYW5nZXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlclRhYmxlKHsgYXN5bmMgfTogeyBhc3luYzogYm9vbGVhbiB9ID0geyBhc3luYzogdHJ1ZSB9KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBjb2x1bW5MaXN0OiBzdHJpbmdbXSA9IHRoaXMuZ2VuZXJhdGVEaXNwbGF5ZWRDb2x1bW5zKCk7XHJcbiAgICAgICAgY29uc3QgZHJhd1Rhc2s6IEZuPHN0cmluZ1tdLCBQcm9taXNlPHZvaWQ+PiA9XHJcbiAgICAgICAgICAgIHRoaXMuYXN5bmNDb2x1bW5zICYmIGFzeW5jID8gdGhpcy5hc3luY0RyYXdDb2x1bW5zLmJpbmQodGhpcykgOiB0aGlzLnN5bmNEcmF3Q29sdW1ucy5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc29ydGFibGUuZW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0QW5kRmlsdGVyKCkudGhlbigoKSA9PiBkcmF3VGFzayhjb2x1bW5MaXN0KS50aGVuKCgpID0+IHRoaXMuZW1pdFJlbmRlcmVkKCkpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkcmF3VGFzayhjb2x1bW5MaXN0KS50aGVuKCgpID0+IHRoaXMuZW1pdFJlbmRlcmVkKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlQ29sdW1uVmlzaWJpbGl0eShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjaGVja1ZpZXdwb3J0Q2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIudG9nZ2xlQ29sdW1uVmlzaWJpbGl0eShrZXkpO1xyXG4gICAgICAgIHRoaXMudXRpbHNcclxuICAgICAgICAgICAgLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjaGVtYSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNoZWNrVmlld3BvcnRDaGVja2VkKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYXBwLnRpY2soKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0U2NoZW1hKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFibGVWaWV3cG9ydENoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVtYUNvbHVtbnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclRhYmxlKHsgYXN5bmM6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlU2NoZW1hKFtdKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlVmlld3BvcnRDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICB9LCBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbC5USU1FX0lETEUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlU29ydEFuZEZpbHRlclRhYmxlKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgPSB7fSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2UgPSBjaGFuZ2VzW1RhYmxlU2ltcGxlQ2hhbmdlcy5TT1VSQ0VfS0VZXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgdGhpcy5zb3J0QW5kRmlsdGVyKCkudGhlbigoKSA9PiB0aGlzLnJlQ2hlY2tEZWZpbml0aW9ucygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByZVJlbmRlclRhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZWRDb3VudEtleXMgPSB0aGlzLmdldENvdW50S2V5cygpO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tTW9kZWxDb2x1bW5zS2V5cyA9IHRoaXMuZ2VuZXJhdGVDdXN0b21Nb2RlbENvbHVtbnNLZXlzKCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbENvbHVtbktleXMgPSB0aGlzLmdlbmVyYXRlTW9kZWxDb2x1bW5LZXlzKCk7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgICAgIGNvbnN0IHVuRGlydHk6IGJvb2xlYW4gPSAhdGhpcy5kaXJ0eTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja0ZpbHRlclZhbHVlcygpO1xyXG5cclxuICAgICAgICBpZiAodW5EaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVjeWNsZVZpZXc6IGJvb2xlYW4gPSB1bkRpcnR5ICYmIHRoaXMuaXNSZW5kZXJlZCAmJiB0aGlzLmNvbnRlbnRJbml0O1xyXG5cclxuICAgICAgICBpZiAocmVjeWNsZVZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxpc3RlblNjcm9sbEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm92ZXJsb2FkU2Nyb2xsLnNjcm9sbFN0YXR1cy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChzY3JvbGxpbmc6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1Njcm9sbGluZyA9IHNjcm9sbGluZztcclxuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0ZpbHRlclZhbHVlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVGaWx0ZXJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGUgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGUgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLmNvbHVtbk9wdGlvbnMgJiYgdGhpcy5jb2x1bW5PcHRpb25zLmZpbHRlclR5cGUpIHx8XHJcbiAgICAgICAgICAgICAgICBUYWJsZUZpbHRlclR5cGUuU1RBUlRfV0lUSDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxDb2x1bW5LZXlzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmFibGUuZmlsdGVyVHlwZURlZmluaXRpb25ba2V5XSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGVEZWZpbml0aW9uW2tleV0gfHwgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlY2hlY2tUZW1wbGF0ZUNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcHAudGljaygpLCBUSU1FX1JFTE9BRCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuU2VsZWN0aW9uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ub25DaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAudGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2aWV3Rm9yY2VSZWZyZXNoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmNoZWNrZWRUYXNrSWQpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRUYXNrSWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmNlZFJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrVGVtcGxhdGVDb250ZW50Q2hlY2soKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0sIEZSQU1FX1RJTUUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuVGVtcGxhdGVDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbHVtblRlbXBsYXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbHVtblRlbXBsYXRlcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya1RlbXBsYXRlQ29udGVudENoZWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnVUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LmV2ZW50cy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0ZWN0Q2hhbmdlcygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IGxhenkgcmVuZGVyaW5nIG9mIGNvbHVtbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBhc3luY0RyYXdDb2x1bW5zKGNvbHVtbkxpc3Q6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXg6IG51bWJlciA9IDA7IGluZGV4IDwgY29sdW1uTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgPSBjb2x1bW5MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgY29uc3Qgc2NoZW1hOiBDb2x1bW5zU2NoZW1hID0gdGhpcy5tZXJnZUNvbHVtblNjaGVtYShrZXksIGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY2hlbWEuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnV0aWxzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRDb2x1bW5MaXN0ICYmIHRoaXMucHJvY2Vzc2VkQ29sdW1uTGlzdChzY2hlbWEsIGtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkQ29sdW1uTGlzdChzY2hlbWEsIGtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHN5bmMgcmVuZGVyaW5nIG9mIGNvbHVtbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBzeW5jRHJhd0NvbHVtbnMoY29sdW1uTGlzdDogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLnV0aWxzLm1pY3JvdGFzaygoKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4OiBudW1iZXIgPSAwOyBpbmRleCA8IGNvbHVtbkxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXk6IHN0cmluZyA9IGNvbHVtbkxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hOiBDb2x1bW5zU2NoZW1hID0gdGhpcy5tZXJnZUNvbHVtblNjaGVtYShrZXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkQ29sdW1uTGlzdChzY2hlbWEsIGNvbHVtbkxpc3RbaW5kZXhdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEN1c3RvbUNvbHVtblNjaGVtYUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IFBhcnRpYWw8Q29sdW1uc1NjaGVtYT4ge1xyXG4gICAgICAgIHJldHVybiAoKHRoaXMuc2NoZW1hQ29sdW1ucyAmJiB0aGlzLnNjaGVtYUNvbHVtbnNbaW5kZXhdKSB8fCAoe30gYXMgQW55KSkgYXMgUGFydGlhbDxDb2x1bW5zU2NoZW1hPjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiAtIGl0IGlzIG5lY2Vzc2FyeSB0byBjb21iaW5lIHRoZSB0ZW1wbGF0ZXMgZ2l2ZW4gZnJvbSB0aGUgc2VydmVyIGFuZCBkZWZhdWx0XHJcbiAgICAgKiBAcGFyYW0ga2V5IC0gY29sdW1uIHNjaGVtYSBmcm9tIHJlbmRlcmVkIHRlbXBsYXRlcyBtYXBcclxuICAgICAqIEBwYXJhbSBpbmRleCAtIGNvbHVtbiBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1lcmdlQ29sdW1uU2NoZW1hKGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogQ29sdW1uc1NjaGVtYSB7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ29sdW1uOiBQYXJ0aWFsPENvbHVtbnNTY2hlbWE+ID0gdGhpcy5nZXRDdXN0b21Db2x1bW5TY2hlbWFCeUluZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVkVGVtcGxhdGVzW2tleV0pIHtcclxuICAgICAgICAgICAgY29uc3QgY29sdW1uOiBOZ3hDb2x1bW5Db21wb25lbnQgPSBuZXcgTmd4Q29sdW1uQ29tcG9uZW50KCkud2l0aEtleShrZXkpO1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVDb2x1bW5NZXRhZGF0YShjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVmYXVsdENvbHVtbjogQ29sdW1uc1NjaGVtYSA9IHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKGN1c3RvbUNvbHVtbi5rZXkgPT09IGRlZmF1bHRDb2x1bW4ua2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XSA9IHsgLi4uZGVmYXVsdENvbHVtbiwgLi4uY3VzdG9tQ29sdW1uIH0gYXMgQ29sdW1uc1NjaGVtYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVkVGVtcGxhdGVzW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IGNvbHVtbiBtZXRhIGluZm9ybWF0aW9uIHByb2Nlc3NpbmdcclxuICAgICAqIEBwYXJhbSBzY2hlbWEgLSBjb2x1bW4gc2NoZW1hXHJcbiAgICAgKiBAcGFyYW0ga2V5IC0gY29sdW1uIG5hbWVcclxuICAgICAqIEBwYXJhbSBhc3luYyAtIHdoZXRoZXIgdG8gZHJhdyBhIGNvbHVtbiBhc3luY2hyb25vdXNseVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByb2Nlc3NlZENvbHVtbkxpc3Qoc2NoZW1hOiBDb2x1bW5zU2NoZW1hLCBrZXk6IHN0cmluZywgYXN5bmM6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZVBhcnNlci5zY2hlbWEpIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5zY2hlbWEuY29sdW1ucy5wdXNoKHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XSk7XHJcbiAgICAgICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiBub3RpZmljYXRpb24gdGhhdCB0aGUgdGFibGUgaGFzIGJlZW4gcmVuZGVyZWRcclxuICAgICAqIEBzZWUgVGFibGVCdWlsZGVyQ29tcG9uZW50I2lzUmVuZGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbWl0UmVuZGVyZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc1JlbmRlcmVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlbmRlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWZ0ZXJSZW5kZXJlZC5lbWl0KHRoaXMuaXNSZW5kZXJlZCk7XHJcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUhlaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiBwYXJzaW5nIHRlbXBsYXRlcyBhbmQgaW5wdXQgcGFyYW1ldGVycyAoa2V5cywgc2NoZW1hQ29sdW1ucykgZm9yIHRoZSBudW1iZXIgb2YgY29sdW1uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlRGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgbGV0IGdlbmVyYXRlZExpc3Q6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5pbml0aWFsU2NoZW1hKHRoaXMuY29sdW1uT3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgeyBzaW1wbGVSZW5kZXJlZEtleXMsIGFsbFJlbmRlcmVkS2V5cyB9OiBUZW1wbGF0ZUtleXMgPSB0aGlzLnBhcnNlVGVtcGxhdGVLZXlzKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNjaGVtYUNvbHVtbnMgJiYgdGhpcy5zY2hlbWFDb2x1bW5zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZWRMaXN0ID0gdGhpcy5zY2hlbWFDb2x1bW5zLm1hcCgoY29sdW1uOiBDb2x1bW5zU2NoZW1hKSA9PiBjb2x1bW4ua2V5KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMua2V5cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVkTGlzdCA9IHRoaXMuY3VzdG9tTW9kZWxDb2x1bW5zS2V5cztcclxuICAgICAgICB9IGVsc2UgaWYgKHNpbXBsZVJlbmRlcmVkS2V5cy5zaXplKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlZExpc3QgPSBhbGxSZW5kZXJlZEtleXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVkTGlzdCA9IHRoaXMubW9kZWxDb2x1bW5LZXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlZExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGtleXMgYnkgd2hpY2ggdG8gZHJhdyB0YWJsZSBjb2x1bW5zXHJcbiAgICAgKiA8YWxsb3dlZEtleU1hcD4gLSBwb3NzaWJsZSBrZXlzIGZyb20gdGhlIG1vZGVsLCB0aGlzIG11c3QgYmUgY2hlY2tlZCxcclxuICAgICAqIGJlY2F1c2UgdXNlcnMgY2FuIGRyYXcgdGhlIHdyb25nIGtleXMgaW4gdGhlIHRlbXBsYXRlIChuZ3gtY29sdW1uIGtleT1pbnZhbGlkKVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlVGVtcGxhdGVLZXlzKCk6IFRlbXBsYXRlS2V5cyB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5rZXlNYXAgPSB0aGlzLmdlbmVyYXRlQ29sdW1uc0tleU1hcCh0aGlzLmtleXMubGVuZ3RoID8gdGhpcy5rZXlzIDogdGhpcy5nZXRNb2RlbEtleXMoKSk7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIuYWxsb3dlZEtleU1hcCA9IHRoaXMua2V5cy5sZW5ndGhcclxuICAgICAgICAgICAgPyB0aGlzLmdlbmVyYXRlQ29sdW1uc0tleU1hcCh0aGlzLmN1c3RvbU1vZGVsQ29sdW1uc0tleXMpXHJcbiAgICAgICAgICAgIDogdGhpcy5nZW5lcmF0ZUNvbHVtbnNLZXlNYXAodGhpcy5tb2RlbENvbHVtbktleXMpO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLnBhcnNlKHRoaXMuY29sdW1uVGVtcGxhdGVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsUmVuZGVyZWRLZXlzOiBBcnJheS5mcm9tKHRoaXMudGVtcGxhdGVQYXJzZXIuZnVsbFRlbXBsYXRlS2V5cyksXHJcbiAgICAgICAgICAgIG92ZXJyaWRpbmdSZW5kZXJlZEtleXM6IHRoaXMudGVtcGxhdGVQYXJzZXIub3ZlcnJpZGVUZW1wbGF0ZUtleXMsXHJcbiAgICAgICAgICAgIHNpbXBsZVJlbmRlcmVkS2V5czogdGhpcy50ZW1wbGF0ZVBhcnNlci50ZW1wbGF0ZUtleXNcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==