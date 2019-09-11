/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ContentChild, ContentChildren, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryKey } from './interfaces/table-builder.internal';
import { NgxContextMenuComponent } from './components/ngx-context-menu/ngx-context-menu.component';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { NgxHeaderComponent } from './components/ngx-header/ngx-header.component';
import { NgxFooterComponent } from './components/ngx-footer/ngx-footer.component';
import { NgxFilterComponent } from './components/ngx-filter/ngx-filter.component';
import { TableBuilderOptionsImpl } from './config/table-builder-options';
import { isFirefox } from './operators/is-firefox';
const { ROW_HEIGHT, MACRO_TIME, TIME_IDLE } = TableBuilderOptionsImpl;
/**
 * @abstract
 */
export class TableBuilderApiImpl {
    constructor() {
        this.source = null;
        this.keys = [];
        this.striped = true;
        this.lazy = true;
        this.name = null;
        this.sortTypes = null;
        this.excludeKeys = [];
        this.autoWidth = false;
        this.autoHeightDetect = true;
        this.nativeScrollbar = false;
        this.primaryKey = PrimaryKey.ID;
        this.columnWidth = null;
        this.rowHeight = null;
        this.asyncColumns = true;
        this.verticalBorder = true;
        this.enableSelection = false;
        this.enableFiltering = false;
        this.bufferAmount = null;
        this.schemaColumns = [];
        this.afterRendered = new EventEmitter();
        this.schemaChanges = new EventEmitter();
        this.columnOptions = null;
        this.columnTemplates = null;
        this.contextMenuTemplate = null;
        this.headerTemplate = null;
        this.footerTemplate = null;
        this.filterTemplate = null;
        this.tableViewportChecked = true;
        this.isFrozenView = false;
        this.isFirefoxMode = isFirefox();
        /**
         * \@description: the custom names of the column list to be displayed in the view.
         * \@example:
         *    <table-builder #table
         *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
         *        [exclude]="[ 'description' ]">
         *      <ngx-column *ngFor="let key of table.modelColumnKeys"></ngx-column>
         *    </table-builder>
         *    ------------------------
         *    modelColumnKeys === [ 'id', 'hello', 'value' ]
         */
        this.modelColumnKeys = [];
        /**
         * \@description: the custom names of the column list to be displayed in the view.
         * \@example:
         *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] />
         *    customModelColumnsKeys === [ 'id', 'description', 'name', 'description' ]
         *    ------------------------
         *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] [exclude]=[ 'id', 'description' ] />
         *    customModelColumnsKeys === [ 'name' ]
         */
        this.customModelColumnsKeys = [];
        this.isDragging = {};
        this.accessDragging = false;
        this.filterIdTask = null;
    }
    /**
     * \@description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned unique displayed columns [ 'id', 'value', 'position' ]
     * @return {?}
     */
    get displayedColumns() {
        return Object.keys(this.templateParser.compiledTemplates) || [];
    }
    /**
     * @return {?}
     */
    get visibleColumns() {
        return this.columnSchema
            .filter((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.isVisible))
            .map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.key));
    }
    /**
     * \@description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned ordered displayed columns [ 'id', 'value', 'id', 'position', 'value' ]
     * @return {?}
     */
    get positionColumns() {
        return this.columnSchema.map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.key));
    }
    /**
     * @return {?}
     */
    get columnSchema() {
        return (this.templateParser.schema && this.templateParser.schema.columns) || [];
    }
    /**
     * @return {?}
     */
    get selectedItems() {
        return this.source.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.selectionModel.entries[item[this.primaryKey]]));
    }
    /**
     * @return {?}
     */
    get firstItem() {
        return (this.source && this.source[0]) || {};
    }
    /**
     * @return {?}
     */
    get lastItem() {
        return (this.source && this.source[this.source.length - 1]) || {};
    }
    /**
     * @return {?}
     */
    get selectionModel() {
        return this.selection.selectionModel;
    }
    /**
     * @return {?}
     */
    get clientRowHeight() {
        return parseInt((/** @type {?} */ (this.rowHeight))) || ROW_HEIGHT;
    }
    /**
     * @return {?}
     */
    get clientColWidth() {
        return this.autoWidth ? null : parseInt((/** @type {?} */ (this.columnWidth))) || null;
    }
    /**
     * @return {?}
     */
    get columnVirtualHeight() {
        return this.source.length * this.clientRowHeight;
    }
    /**
     * @return {?}
     */
    get columnHeight() {
        return this.size * this.clientRowHeight + this.clientRowHeight;
    }
    /**
     * @return {?}
     */
    get size() {
        return (this.source && this.source.length) || 0;
    }
    /**
     * @return {?}
     */
    recheckViewportChecked() {
        this.tableViewportChecked = !this.tableViewportChecked;
        this.idleDetectChanges();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    enableDragging(key) {
        if (this.templateParser.compiledTemplates[key].draggable) {
            this.accessDragging = true;
            this.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    disableDragging() {
        if (this.accessDragging) {
            this.accessDragging = false;
            this.detectChanges();
        }
    }
    /**
     * @param {?} __0
     * @param {?} column
     * @return {?}
     */
    resizeColumn({ event, key }, column) {
        this.recheckViewportChecked();
        this.disableDragging();
        this.resize.resize((/** @type {?} */ (event)), column, (/**
         * @param {?} width
         * @return {?}
         */
        (width) => this.calculateWidth(key, width)), (/**
         * @return {?}
         */
        () => this.afterCalculateWidth()));
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    filter() {
        if (!this.enableFiltering) {
            throw new Error('You forgot to enable filtering: \n <ngx-table-builder [enable-filtering]="true" />');
        }
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.clearInterval(this.filterIdTask);
            this.filterIdTask = window.setTimeout((/**
             * @return {?}
             */
            () => {
                this.filterable.changeFilteringStatus();
                this.sortAndFilter().then((/**
                 * @return {?}
                 */
                () => this.reCheckDefinitions()));
            }), MACRO_TIME);
        }));
    }
    /**
     * @return {?}
     */
    sortAndFilter() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.toggleFreeze();
            if (this.filterable.filterValueExist && this.enableFiltering) {
                /** @type {?} */
                const filter = yield this.filterable.filter(this.originalSource);
                this.source = yield this.sortable.sort(filter.source);
                filter.fireSelection();
            }
            else if (!this.sortable.empty && this.source) {
                this.source = yield this.sortable.sort(this.originalSource);
            }
            if (this.sortable.empty && !this.filterable.filterValueExist) {
                this.source = this.originalSource;
            }
            this.toggleFreeze(TIME_IDLE);
        });
    }
    /**
     * @param {?} key
     * @return {?}
     */
    sortByKey(key) {
        this.sortable.updateSortKey(key);
        this.sortAndFilter().then((/**
         * @return {?}
         */
        () => this.reCheckDefinitions()));
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    drop({ previousIndex, currentIndex }) {
        /** @type {?} */
        const previousKey = this.visibleColumns[previousIndex];
        /** @type {?} */
        const currentKey = this.visibleColumns[currentIndex];
        this.draggable.drop(previousKey, currentKey);
        this.changeSchema();
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    checkVisible(visible) {
        this.inViewport = visible;
        this.detectChanges();
    }
    /**
     * @return {?}
     */
    detectChanges() {
        if (!((/** @type {?} */ (this.cd))).destroyed) {
            this.cd.detectChanges();
        }
    }
    /**
     * @param {?=} time
     * @param {?=} callback
     * @return {?}
     */
    toggleFreeze(time = null, callback = null) {
        this.isFrozenView = !this.isFrozenView;
        if (time) {
            window.setTimeout((/**
             * @return {?}
             */
            () => {
                this.detectChanges();
                callback && callback();
            }), time);
        }
        else {
            this.detectChanges();
        }
    }
    /**
     * @param {?=} defaultColumns
     * @return {?}
     */
    changeSchema(defaultColumns = null) {
        /** @type {?} */
        const renderedColumns = this.templateParser.schema.exportColumns();
        /** @type {?} */
        const columns = defaultColumns || renderedColumns;
        this.viewChanges.update({ name: this.name, columns });
        this.schemaChanges.emit(columns);
        this.idleDetectChanges();
    }
    /**
     * @protected
     * @return {?}
     */
    reCheckDefinitions() {
        this.filterable.definition = Object.assign({}, this.filterable.definition);
        this.filterable.changeFilteringStatus();
        this.detectChanges();
    }
    /**
     * \@description: returns the number of keys in the model
     * \@example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     * @protected
     * @return {?}
     */
    getCountKeys() {
        return Object.keys(this.firstItem).length;
    }
    /**
     * @see TableBuilderApiImpl#customModelColumnsKeys for further information
     * @protected
     * @return {?}
     */
    generateCustomModelColumnsKeys() {
        return this.excluding(this.keys);
    }
    /**
     * @see TableBuilderApiImpl#modelColumnKeys for further information
     * @protected
     * @return {?}
     */
    generateModelColumnKeys() {
        return this.excluding(this.getModelKeys());
    }
    /**
     * @protected
     * @return {?}
     */
    getModelKeys() {
        return this.utils.flattenKeysByRow(this.firstItem);
    }
    /**
     * @protected
     * @return {?}
     */
    idleDetectChanges() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => window.requestAnimationFrame((/**
         * @return {?}
         */
        () => this.detectChanges()))));
    }
    /**
     * @private
     * @param {?} key
     * @param {?} width
     * @return {?}
     */
    calculateWidth(key, width) {
        this.isDragging[key] = true;
        this.onMouseResizeColumn(key, width);
    }
    /**
     * @private
     * @return {?}
     */
    afterCalculateWidth() {
        this.isDragging = {};
        this.recheckViewportChecked();
        this.changeSchema();
    }
    /**
     * @private
     * @param {?} key
     * @param {?} width
     * @return {?}
     */
    onMouseResizeColumn(key, width) {
        this.templateParser.mutateColumnSchema(key, { width });
        this.idleDetectChanges();
    }
    /**
     * @private
     * @param {?} keys
     * @return {?}
     */
    excluding(keys) {
        return this.excludeKeys.length
            ? keys.filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                return !this.excludeKeys.some((/**
                 * @param {?} excludeKey
                 * @return {?}
                 */
                (excludeKey) => {
                    return excludeKey instanceof RegExp ? !!key.match(excludeKey) : key === excludeKey;
                }));
            }))
            : keys;
    }
}
TableBuilderApiImpl.propDecorators = {
    height: [{ type: Input }],
    width: [{ type: Input }],
    source: [{ type: Input }],
    keys: [{ type: Input }],
    striped: [{ type: Input }],
    lazy: [{ type: Input }],
    name: [{ type: Input }],
    sortTypes: [{ type: Input, args: ['sort-types',] }],
    excludeKeys: [{ type: Input, args: ['exclude-keys',] }],
    autoWidth: [{ type: Input, args: ['auto-width',] }],
    autoHeightDetect: [{ type: Input, args: ['auto-height',] }],
    nativeScrollbar: [{ type: Input, args: ['native-scrollbar',] }],
    primaryKey: [{ type: Input, args: ['primary-key',] }],
    columnWidth: [{ type: Input, args: ['column-width',] }],
    rowHeight: [{ type: Input, args: ['row-height',] }],
    asyncColumns: [{ type: Input, args: ['async-columns',] }],
    verticalBorder: [{ type: Input, args: ['vertical-border',] }],
    enableSelection: [{ type: Input, args: ['enable-selection',] }],
    enableFiltering: [{ type: Input, args: ['enable-filtering',] }],
    bufferAmount: [{ type: Input, args: ['buffer-amount',] }],
    schemaColumns: [{ type: Input, args: ['schema-columns',] }],
    afterRendered: [{ type: Output }],
    schemaChanges: [{ type: Output }],
    columnOptions: [{ type: ContentChild, args: [NgxOptionsComponent, { static: false },] }],
    columnTemplates: [{ type: ContentChildren, args: [NgxColumnComponent,] }],
    contextMenuTemplate: [{ type: ContentChild, args: [NgxContextMenuComponent, { static: false },] }],
    headerTemplate: [{ type: ContentChild, args: [NgxHeaderComponent, { static: false },] }],
    footerTemplate: [{ type: ContentChild, args: [NgxFooterComponent, { static: false },] }],
    filterTemplate: [{ type: ContentChild, args: [NgxFilterComponent, { static: false },] }]
};
if (false) {
    /** @type {?} */
    TableBuilderApiImpl.prototype.height;
    /** @type {?} */
    TableBuilderApiImpl.prototype.width;
    /** @type {?} */
    TableBuilderApiImpl.prototype.source;
    /** @type {?} */
    TableBuilderApiImpl.prototype.keys;
    /** @type {?} */
    TableBuilderApiImpl.prototype.striped;
    /** @type {?} */
    TableBuilderApiImpl.prototype.lazy;
    /** @type {?} */
    TableBuilderApiImpl.prototype.name;
    /** @type {?} */
    TableBuilderApiImpl.prototype.sortTypes;
    /** @type {?} */
    TableBuilderApiImpl.prototype.excludeKeys;
    /** @type {?} */
    TableBuilderApiImpl.prototype.autoWidth;
    /** @type {?} */
    TableBuilderApiImpl.prototype.autoHeightDetect;
    /** @type {?} */
    TableBuilderApiImpl.prototype.nativeScrollbar;
    /** @type {?} */
    TableBuilderApiImpl.prototype.primaryKey;
    /** @type {?} */
    TableBuilderApiImpl.prototype.columnWidth;
    /** @type {?} */
    TableBuilderApiImpl.prototype.rowHeight;
    /** @type {?} */
    TableBuilderApiImpl.prototype.asyncColumns;
    /** @type {?} */
    TableBuilderApiImpl.prototype.verticalBorder;
    /** @type {?} */
    TableBuilderApiImpl.prototype.enableSelection;
    /** @type {?} */
    TableBuilderApiImpl.prototype.enableFiltering;
    /** @type {?} */
    TableBuilderApiImpl.prototype.bufferAmount;
    /** @type {?} */
    TableBuilderApiImpl.prototype.schemaColumns;
    /** @type {?} */
    TableBuilderApiImpl.prototype.afterRendered;
    /** @type {?} */
    TableBuilderApiImpl.prototype.schemaChanges;
    /** @type {?} */
    TableBuilderApiImpl.prototype.columnOptions;
    /** @type {?} */
    TableBuilderApiImpl.prototype.columnTemplates;
    /** @type {?} */
    TableBuilderApiImpl.prototype.contextMenuTemplate;
    /** @type {?} */
    TableBuilderApiImpl.prototype.headerTemplate;
    /** @type {?} */
    TableBuilderApiImpl.prototype.footerTemplate;
    /** @type {?} */
    TableBuilderApiImpl.prototype.filterTemplate;
    /** @type {?} */
    TableBuilderApiImpl.prototype.inViewport;
    /** @type {?} */
    TableBuilderApiImpl.prototype.tableViewportChecked;
    /** @type {?} */
    TableBuilderApiImpl.prototype.isFrozenView;
    /** @type {?} */
    TableBuilderApiImpl.prototype.isFirefoxMode;
    /**
     * \@description: the custom names of the column list to be displayed in the view.
     * \@example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *      <ngx-column *ngFor="let key of table.modelColumnKeys"></ngx-column>
     *    </table-builder>
     *    ------------------------
     *    modelColumnKeys === [ 'id', 'hello', 'value' ]
     * @type {?}
     */
    TableBuilderApiImpl.prototype.modelColumnKeys;
    /**
     * \@description: the custom names of the column list to be displayed in the view.
     * \@example:
     *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] />
     *    customModelColumnsKeys === [ 'id', 'description', 'name', 'description' ]
     *    ------------------------
     *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] [exclude]=[ 'id', 'description' ] />
     *    customModelColumnsKeys === [ 'name' ]
     * @type {?}
     */
    TableBuilderApiImpl.prototype.customModelColumnsKeys;
    /** @type {?} */
    TableBuilderApiImpl.prototype.isDragging;
    /** @type {?} */
    TableBuilderApiImpl.prototype.templateParser;
    /** @type {?} */
    TableBuilderApiImpl.prototype.selection;
    /** @type {?} */
    TableBuilderApiImpl.prototype.utils;
    /** @type {?} */
    TableBuilderApiImpl.prototype.cd;
    /** @type {?} */
    TableBuilderApiImpl.prototype.resize;
    /** @type {?} */
    TableBuilderApiImpl.prototype.sortable;
    /** @type {?} */
    TableBuilderApiImpl.prototype.contextMenu;
    /** @type {?} */
    TableBuilderApiImpl.prototype.filterable;
    /** @type {?} */
    TableBuilderApiImpl.prototype.ngZone;
    /** @type {?} */
    TableBuilderApiImpl.prototype.accessDragging;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderApiImpl.prototype.app;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderApiImpl.prototype.viewChanges;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderApiImpl.prototype.draggable;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderApiImpl.prototype.originalSource;
    /**
     * @type {?}
     * @protected
     */
    TableBuilderApiImpl.prototype.renderedCountKeys;
    /**
     * @type {?}
     * @private
     */
    TableBuilderApiImpl.prototype.filterIdTask;
    /**
     * @abstract
     * @return {?}
     */
    TableBuilderApiImpl.prototype.markDirtyCheck = function () { };
    /**
     * @abstract
     * @return {?}
     */
    TableBuilderApiImpl.prototype.markForCheck = function () { };
    /**
     * @abstract
     * @return {?}
     */
    TableBuilderApiImpl.prototype.markTemplateContentCheck = function () { };
    /**
     * @abstract
     * @param {?} changes
     * @return {?}
     */
    TableBuilderApiImpl.prototype.ngOnChanges = function (changes) { };
    /**
     * @abstract
     * @return {?}
     */
    TableBuilderApiImpl.prototype.ngOnInit = function () { };
    /**
     * @abstract
     * @return {?}
     */
    TableBuilderApiImpl.prototype.ngAfterContentInit = function () { };
    /**
     * @abstract
     * @return {?}
     */
    TableBuilderApiImpl.prototype.ngAfterViewInit = function () { };
    /**
     * @abstract
     * @return {?}
     */
    TableBuilderApiImpl.prototype.ngAfterViewChecked = function () { };
    /**
     * @abstract
     * @return {?}
     */
    TableBuilderApiImpl.prototype.ngOnDestroy = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5hcGkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLWJ1aWxkZXIuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQU1ILFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxFQUNaLEtBQUssRUFLTCxNQUFNLEVBR1QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFjLFVBQVUsRUFBNkIsTUFBTSxxQ0FBcUMsQ0FBQztBQUV4RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUVuRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUtsRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUt6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7TUFFN0MsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUFtQyx1QkFBdUI7Ozs7QUFFckcsTUFBTSxPQUFnQixtQkFBbUI7SUFBekM7UUFJb0IsV0FBTSxHQUFlLElBQUksQ0FBQztRQUMxQixTQUFJLEdBQWEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ1IsY0FBUyxHQUFXLElBQUksQ0FBQztRQUN2QixnQkFB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OztJQUMzRCw0Q0FBd0U7O0lBQ3hFLDRDQUEyRTs7SUFDM0UsNENBQXVGOztJQUV2Riw0Q0FDaUQ7O0lBRWpELDhDQUNnRTs7SUFFaEUsa0RBQzJEOztJQUUzRCw2Q0FDaUQ7O0lBRWpELDZDQUNpRDs7SUFFakQsNkNBQ2lEOztJQUVqRCx5Q0FBMkI7O0lBQzNCLG1EQUE0Qzs7SUFDNUMsMkNBQXFDOztJQUNyQyw0Q0FBNEM7Ozs7Ozs7Ozs7Ozs7SUFhNUMsOENBQXNDOzs7Ozs7Ozs7OztJQVd0QyxxREFBNkM7O0lBRTdDLHlDQUF3Qzs7SUFDeEMsNkNBQStEOztJQUMvRCx3Q0FBcUQ7O0lBQ3JELG9DQUE2Qzs7SUFDN0MsaUNBQStDOztJQUMvQyxxQ0FBa0Q7O0lBQ2xELHVDQUFtRDs7SUFDbkQsMENBQXlEOztJQUN6RCx5Q0FBdUQ7O0lBQ3ZELHFDQUF3Qzs7SUFDeEMsNkNBQXVDOzs7OztJQUN2QyxrQ0FBZ0Q7Ozs7O0lBQ2hELDBDQUFvRTs7Ozs7SUFDcEUsd0NBQXdEOzs7OztJQUN4RCw2Q0FBcUM7Ozs7O0lBQ3JDLGdEQUFvQzs7Ozs7SUFDcEMsMkNBQW9DOzs7OztJQWdFcEMsK0RBQXVDOzs7OztJQUV2Qyw2REFBcUM7Ozs7O0lBRXJDLHlFQUFpRDs7Ozs7O0lBRWpELG1FQUEwRDs7Ozs7SUFFMUQseURBQWlDOzs7OztJQUVqQyxtRUFBMkM7Ozs7O0lBRTNDLGdFQUF3Qzs7Ozs7SUFFeEMsbUVBQTJDOzs7OztJQUUzQyw0REFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtEcmFnU29ydEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcclxuICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICBBcHBsaWNhdGlvblJlZixcclxuICAgIENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgQ29udGVudENoaWxkcmVuLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBOZ1pvbmUsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVmlld1JlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTmd4VGFibGVWaWV3Q2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuLi90YWJsZS9zZXJ2aWNlcy90YWJsZS12aWV3LWNoYW5nZXMvbmd4LXRhYmxlLXZpZXctY2hhbmdlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm4sIEtleU1hcCwgUHJpbWFyeUtleSwgUXVlcnlMaXN0UmVmLCBSZXNpemVFdmVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgQ29sdW1uc1NjaGVtYSwgU2ltcGxlU2NoZW1hQ29sdW1ucywgVGFibGVSb3cgfSBmcm9tICcuL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IE5neENvbnRleHRNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1jb250ZXh0LW1lbnUvbmd4LWNvbnRleHQtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZVBhcnNlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RlbXBsYXRlLXBhcnNlci90ZW1wbGF0ZS1wYXJzZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neE9wdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LW9wdGlvbnMvbmd4LW9wdGlvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4Q29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1jb2x1bW4vbmd4LWNvbHVtbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtaGVhZGVyL25neC1oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4Rm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1mb290ZXIvbmd4LWZvb3Rlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LWZpbHRlci9uZ3gtZmlsdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbHRlcldvcmtlckV2ZW50IH0gZnJvbSAnLi9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZHJhZ2dhYmxlL2RyYWdnYWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsdGVyYWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbHRlcmFibGUvZmlsdGVyYWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBSZXNpemFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9yZXNpemVyL3Jlc2l6YWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29ydGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zb3J0YWJsZS9zb3J0YWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uTWFwIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uJztcclxuaW1wb3J0IHsgaXNGaXJlZm94IH0gZnJvbSAnLi9vcGVyYXRvcnMvaXMtZmlyZWZveCc7XHJcblxyXG5jb25zdCB7IFJPV19IRUlHSFQsIE1BQ1JPX1RJTUUsIFRJTUVfSURMRSB9OiB0eXBlb2YgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgPSBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbDtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUYWJsZUJ1aWxkZXJBcGlJbXBsXHJcbiAgICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xyXG4gICAgQElucHV0KCkgcHVibGljIGhlaWdodDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgcHVibGljIHdpZHRoOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBUYWJsZVJvd1tdID0gbnVsbDtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBrZXlzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgQElucHV0KCkgcHVibGljIHN0cmlwZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgcHVibGljIGxhenk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgcHVibGljIG5hbWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoJ3NvcnQtdHlwZXMnKSBwdWJsaWMgc29ydFR5cGVzOiBLZXlNYXAgPSBudWxsO1xyXG4gICAgQElucHV0KCdleGNsdWRlLWtleXMnKSBwdWJsaWMgZXhjbHVkZUtleXM6IEFycmF5PHN0cmluZyB8IFJlZ0V4cD4gPSBbXTtcclxuICAgIEBJbnB1dCgnYXV0by13aWR0aCcpIHB1YmxpYyBhdXRvV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgnYXV0by1oZWlnaHQnKSBwdWJsaWMgYXV0b0hlaWdodERldGVjdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoJ25hdGl2ZS1zY3JvbGxiYXInKSBwdWJsaWMgbmF0aXZlU2Nyb2xsYmFyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ3ByaW1hcnkta2V5JykgcHVibGljIHByaW1hcnlLZXk6IHN0cmluZyA9IFByaW1hcnlLZXkuSUQ7XHJcbiAgICBASW5wdXQoJ2NvbHVtbi13aWR0aCcpIHB1YmxpYyBjb2x1bW5XaWR0aDogc3RyaW5nIHwgbnVtYmVyID0gbnVsbDtcclxuICAgIEBJbnB1dCgncm93LWhlaWdodCcpIHB1YmxpYyByb3dIZWlnaHQ6IHN0cmluZyB8IG51bWJlciA9IG51bGw7XHJcbiAgICBASW5wdXQoJ2FzeW5jLWNvbHVtbnMnKSBwdWJsaWMgYXN5bmNDb2x1bW5zOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgndmVydGljYWwtYm9yZGVyJykgcHVibGljIHZlcnRpY2FsQm9yZGVyOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgnZW5hYmxlLXNlbGVjdGlvbicpIHB1YmxpYyBlbmFibGVTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgnZW5hYmxlLWZpbHRlcmluZycpIHB1YmxpYyBlbmFibGVGaWx0ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgnYnVmZmVyLWFtb3VudCcpIHB1YmxpYyBidWZmZXJBbW91bnQ6IG51bWJlciA9IG51bGw7XHJcbiAgICBASW5wdXQoJ3NjaGVtYS1jb2x1bW5zJykgcHVibGljIHNjaGVtYUNvbHVtbnM6IFNpbXBsZVNjaGVtYUNvbHVtbnMgPSBbXTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgYWZ0ZXJSZW5kZXJlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBzY2hlbWFDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8U2ltcGxlU2NoZW1hQ29sdW1ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hPcHRpb25zQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHB1YmxpYyBjb2x1bW5PcHRpb25zOiBOZ3hPcHRpb25zQ29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKE5neENvbHVtbkNvbXBvbmVudClcclxuICAgIHB1YmxpYyBjb2x1bW5UZW1wbGF0ZXM6IFF1ZXJ5TGlzdFJlZjxOZ3hDb2x1bW5Db21wb25lbnQ+ID0gbnVsbDtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKE5neENvbnRleHRNZW51Q29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHB1YmxpYyBjb250ZXh0TWVudVRlbXBsYXRlOiBOZ3hDb250ZXh0TWVudUNvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hIZWFkZXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGhlYWRlclRlbXBsYXRlOiBOZ3hIZWFkZXJDb21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoTmd4Rm9vdGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHB1YmxpYyBmb290ZXJUZW1wbGF0ZTogTmd4Rm9vdGVyQ29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKE5neEZpbHRlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgZmlsdGVyVGVtcGxhdGU6IE5neEZpbHRlckNvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGluVmlld3BvcnQ6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgdGFibGVWaWV3cG9ydENoZWNrZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzRnJvemVuVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzRmlyZWZveE1vZGU6IGJvb2xlYW4gPSBpc0ZpcmVmb3goKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogdGhlIGN1c3RvbSBuYW1lcyBvZiB0aGUgY29sdW1uIGxpc3QgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB2aWV3LlxyXG4gICAgICogQGV4YW1wbGU6XHJcbiAgICAgKiAgICA8dGFibGUtYnVpbGRlciAjdGFibGVcclxuICAgICAqICAgICAgICBbc291cmNlXT1cIlt7IGlkOiAxLCBuYW1lOiAnaGVsbG8nLCB2YWx1ZTogJ3dvcmxkJywgZGVzY3JpcHRpb246ICd0ZXh0JyB9LCAuLi5dXCJcclxuICAgICAqICAgICAgICBbZXhjbHVkZV09XCJbICdkZXNjcmlwdGlvbicgXVwiPlxyXG4gICAgICogICAgICA8bmd4LWNvbHVtbiAqbmdGb3I9XCJsZXQga2V5IG9mIHRhYmxlLm1vZGVsQ29sdW1uS2V5c1wiPjwvbmd4LWNvbHVtbj5cclxuICAgICAqICAgIDwvdGFibGUtYnVpbGRlcj5cclxuICAgICAqICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICogICAgbW9kZWxDb2x1bW5LZXlzID09PSBbICdpZCcsICdoZWxsbycsICd2YWx1ZScgXVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW9kZWxDb2x1bW5LZXlzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiB0aGUgY3VzdG9tIG5hbWVzIG9mIHRoZSBjb2x1bW4gbGlzdCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXcuXHJcbiAgICAgKiBAZXhhbXBsZTpcclxuICAgICAqICAgIDx0YWJsZS1idWlsZGVyIFtrZXlzXT1bICdpZCcsICdkZXNjcmlwdGlvbicsICduYW1lJywgJ2Rlc2NyaXB0aW9uJyBdIC8+XHJcbiAgICAgKiAgICBjdXN0b21Nb2RlbENvbHVtbnNLZXlzID09PSBbICdpZCcsICdkZXNjcmlwdGlvbicsICduYW1lJywgJ2Rlc2NyaXB0aW9uJyBdXHJcbiAgICAgKiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAqICAgIDx0YWJsZS1idWlsZGVyIFtrZXlzXT1bICdpZCcsICdkZXNjcmlwdGlvbicsICduYW1lJywgJ2Rlc2NyaXB0aW9uJyBdIFtleGNsdWRlXT1bICdpZCcsICdkZXNjcmlwdGlvbicgXSAvPlxyXG4gICAgICogICAgY3VzdG9tTW9kZWxDb2x1bW5zS2V5cyA9PT0gWyAnbmFtZScgXVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3VzdG9tTW9kZWxDb2x1bW5zS2V5czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgaXNEcmFnZ2luZzogS2V5TWFwPGJvb2xlYW4+ID0ge307XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyU2VydmljZTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSBzZWxlY3Rpb246IFNlbGVjdGlvblNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgdXRpbHM6IFV0aWxzU2VydmljZTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWY7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgcmVzaXplOiBSZXNpemFibGVTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IHNvcnRhYmxlOiBTb3J0YWJsZVNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgY29udGV4dE1lbnU6IENvbnRleHRNZW51U2VydmljZTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSBmaWx0ZXJhYmxlOiBGaWx0ZXJhYmxlU2VydmljZTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZTtcclxuICAgIHB1YmxpYyBhY2Nlc3NEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IGFwcDogQXBwbGljYXRpb25SZWY7XHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgdmlld0NoYW5nZXM6IE5neFRhYmxlVmlld0NoYW5nZXNTZXJ2aWNlO1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IGRyYWdnYWJsZTogRHJhZ2dhYmxlU2VydmljZTtcclxuICAgIHByb3RlY3RlZCBvcmlnaW5hbFNvdXJjZTogVGFibGVSb3dbXTtcclxuICAgIHByb3RlY3RlZCByZW5kZXJlZENvdW50S2V5czogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBmaWx0ZXJJZFRhc2s6IG51bWJlciA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gLSA8dGFibGUtYnVpbGRlciBba2V5c109WyAnaWQnLCAndmFsdWUnLCAnaWQnLCAncG9zaXRpb24nLCAndmFsdWUnIF0gLz5cclxuICAgICAqIHJldHVybmVkIHVuaXF1ZSBkaXNwbGF5ZWQgY29sdW1ucyBbICdpZCcsICd2YWx1ZScsICdwb3NpdGlvbicgXVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVkVGVtcGxhdGVzKSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGVDb2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW5TY2hlbWFcclxuICAgICAgICAgICAgLmZpbHRlcigoY29sdW1uOiBDb2x1bW5zU2NoZW1hKSA9PiBjb2x1bW4uaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAubWFwKChjb2x1bW46IENvbHVtbnNTY2hlbWEpID0+IGNvbHVtbi5rZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIC0gPHRhYmxlLWJ1aWxkZXIgW2tleXNdPVsgJ2lkJywgJ3ZhbHVlJywgJ2lkJywgJ3Bvc2l0aW9uJywgJ3ZhbHVlJyBdIC8+XHJcbiAgICAgKiByZXR1cm5lZCBvcmRlcmVkIGRpc3BsYXllZCBjb2x1bW5zIFsgJ2lkJywgJ3ZhbHVlJywgJ2lkJywgJ3Bvc2l0aW9uJywgJ3ZhbHVlJyBdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcG9zaXRpb25Db2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW5TY2hlbWEubWFwKChjb2x1bW46IENvbHVtbnNTY2hlbWEpID0+IGNvbHVtbi5rZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29sdW1uU2NoZW1hKCk6IENvbHVtbnNTY2hlbWFbXSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnRlbXBsYXRlUGFyc2VyLnNjaGVtYSAmJiB0aGlzLnRlbXBsYXRlUGFyc2VyLnNjaGVtYS5jb2x1bW5zKSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGVkSXRlbXMoKTogVGFibGVSb3dbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLmZpbHRlcigoaXRlbTogVGFibGVSb3dbXSkgPT4gdGhpcy5zZWxlY3Rpb25Nb2RlbC5lbnRyaWVzW2l0ZW1bdGhpcy5wcmltYXJ5S2V5XV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZmlyc3RJdGVtKCk6IFRhYmxlUm93IHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlWzBdKSB8fCB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhc3RJdGVtKCk6IFRhYmxlUm93IHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlW3RoaXMuc291cmNlLmxlbmd0aCAtIDFdKSB8fCB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGlvbk1vZGVsKCk6IFNlbGVjdGlvbk1hcCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvbk1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xpZW50Um93SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMucm93SGVpZ2h0IGFzIHN0cmluZykgfHwgUk9XX0hFSUdIVDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWVudENvbFdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b1dpZHRoID8gbnVsbCA6IHBhcnNlSW50KHRoaXMuY29sdW1uV2lkdGggYXMgc3RyaW5nKSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29sdW1uVmlydHVhbEhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5sZW5ndGggKiB0aGlzLmNsaWVudFJvd0hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtbkhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpemUgKiB0aGlzLmNsaWVudFJvd0hlaWdodCArIHRoaXMuY2xpZW50Um93SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UubGVuZ3RoKSB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBtYXJrRGlydHlDaGVjaygpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBtYXJrRm9yQ2hlY2soKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbWFya1RlbXBsYXRlQ29udGVudENoZWNrKCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZ09uSW5pdCgpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyByZWNoZWNrVmlld3BvcnRDaGVja2VkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFibGVWaWV3cG9ydENoZWNrZWQgPSAhdGhpcy50YWJsZVZpZXdwb3J0Q2hlY2tlZDtcclxuICAgICAgICB0aGlzLmlkbGVEZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuYWJsZURyYWdnaW5nKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XS5kcmFnZ2FibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2Nlc3NEcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZURyYWdnaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmFjY2Vzc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjZXNzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNpemVDb2x1bW4oeyBldmVudCwga2V5IH06IFJlc2l6ZUV2ZW50LCBjb2x1bW46IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNoZWNrVmlld3BvcnRDaGVja2VkKCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlRHJhZ2dpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNpemUucmVzaXplKFxyXG4gICAgICAgICAgICBldmVudCBhcyBNb3VzZUV2ZW50LFxyXG4gICAgICAgICAgICBjb2x1bW4sXHJcbiAgICAgICAgICAgICh3aWR0aDogbnVtYmVyKSA9PiB0aGlzLmNhbGN1bGF0ZVdpZHRoKGtleSwgd2lkdGgpLFxyXG4gICAgICAgICAgICAoKSA9PiB0aGlzLmFmdGVyQ2FsY3VsYXRlV2lkdGgoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbHRlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlRmlsdGVyaW5nKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGZvcmdvdCB0byBlbmFibGUgZmlsdGVyaW5nOiBcXG4gPG5neC10YWJsZS1idWlsZGVyIFtlbmFibGUtZmlsdGVyaW5nXT1cInRydWVcIiAvPicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmZpbHRlcklkVGFzayk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySWRUYXNrID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmNoYW5nZUZpbHRlcmluZ1N0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QW5kRmlsdGVyKCkudGhlbigoKSA9PiB0aGlzLnJlQ2hlY2tEZWZpbml0aW9ucygpKTtcclxuICAgICAgICAgICAgfSwgTUFDUk9fVElNRSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNvcnRBbmRGaWx0ZXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVGcmVlemUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyYWJsZS5maWx0ZXJWYWx1ZUV4aXN0ICYmIHRoaXMuZW5hYmxlRmlsdGVyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjogRmlsdGVyV29ya2VyRXZlbnQgPSBhd2FpdCB0aGlzLmZpbHRlcmFibGUuZmlsdGVyKHRoaXMub3JpZ2luYWxTb3VyY2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IGF3YWl0IHRoaXMuc29ydGFibGUuc29ydChmaWx0ZXIuc291cmNlKTtcclxuICAgICAgICAgICAgZmlsdGVyLmZpcmVTZWxlY3Rpb24oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnNvcnRhYmxlLmVtcHR5ICYmIHRoaXMuc291cmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gYXdhaXQgdGhpcy5zb3J0YWJsZS5zb3J0KHRoaXMub3JpZ2luYWxTb3VyY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc29ydGFibGUuZW1wdHkgJiYgIXRoaXMuZmlsdGVyYWJsZS5maWx0ZXJWYWx1ZUV4aXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gdGhpcy5vcmlnaW5hbFNvdXJjZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9nZ2xlRnJlZXplKFRJTUVfSURMRSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNvcnRCeUtleShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ydGFibGUudXBkYXRlU29ydEtleShrZXkpO1xyXG4gICAgICAgIHRoaXMuc29ydEFuZEZpbHRlcigpLnRoZW4oKCkgPT4gdGhpcy5yZUNoZWNrRGVmaW5pdGlvbnMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyb3AoeyBwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXggfTogQ2RrRHJhZ1NvcnRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzS2V5OiBzdHJpbmcgPSB0aGlzLnZpc2libGVDb2x1bW5zW3ByZXZpb3VzSW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRLZXk6IHN0cmluZyA9IHRoaXMudmlzaWJsZUNvbHVtbnNbY3VycmVudEluZGV4XTtcclxuICAgICAgICB0aGlzLmRyYWdnYWJsZS5kcm9wKHByZXZpb3VzS2V5LCBjdXJyZW50S2V5KTtcclxuICAgICAgICB0aGlzLmNoYW5nZVNjaGVtYSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1Zpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5WaWV3cG9ydCA9IHZpc2libGU7XHJcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGVjdENoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCEodGhpcy5jZCBhcyBWaWV3UmVmKS5kZXN0cm95ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVGcmVlemUodGltZTogbnVtYmVyID0gbnVsbCwgY2FsbGJhY2s6IEZuID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNGcm96ZW5WaWV3ID0gIXRoaXMuaXNGcm96ZW5WaWV3O1xyXG4gICAgICAgIGlmICh0aW1lKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VTY2hlbWEoZGVmYXVsdENvbHVtbnM6IFNpbXBsZVNjaGVtYUNvbHVtbnMgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcmVuZGVyZWRDb2x1bW5zOiBTaW1wbGVTY2hlbWFDb2x1bW5zID0gdGhpcy50ZW1wbGF0ZVBhcnNlci5zY2hlbWEuZXhwb3J0Q29sdW1ucygpO1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbnM6IFNpbXBsZVNjaGVtYUNvbHVtbnMgPSBkZWZhdWx0Q29sdW1ucyB8fCByZW5kZXJlZENvbHVtbnM7XHJcbiAgICAgICAgdGhpcy52aWV3Q2hhbmdlcy51cGRhdGUoeyBuYW1lOiB0aGlzLm5hbWUsIGNvbHVtbnMgfSk7XHJcbiAgICAgICAgdGhpcy5zY2hlbWFDaGFuZ2VzLmVtaXQoY29sdW1ucyk7XHJcbiAgICAgICAgdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZUNoZWNrRGVmaW5pdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmRlZmluaXRpb24gPSB7IC4uLnRoaXMuZmlsdGVyYWJsZS5kZWZpbml0aW9uIH07XHJcbiAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmNoYW5nZUZpbHRlcmluZ1N0YXR1cygpO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiByZXR1cm5zIHRoZSBudW1iZXIgb2Yga2V5cyBpbiB0aGUgbW9kZWxcclxuICAgICAqIEBleGFtcGxlOiA8dGFibGUtYnVpbGRlciBbc291cmNlXT1beyBpZDogMSwgbmFtZTogJ2hlbGxvJyB9LCAuLi5dIC8+IGEgdmFsdWUgb2YgMiB3aWxsIGJlIHJldHVybmVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRDb3VudEtleXMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5maXJzdEl0ZW0pLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzZWUgVGFibGVCdWlsZGVyQXBpSW1wbCNjdXN0b21Nb2RlbENvbHVtbnNLZXlzIGZvciBmdXJ0aGVyIGluZm9ybWF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZUN1c3RvbU1vZGVsQ29sdW1uc0tleXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGluZyh0aGlzLmtleXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHNlZSBUYWJsZUJ1aWxkZXJBcGlJbXBsI21vZGVsQ29sdW1uS2V5cyBmb3IgZnVydGhlciBpbmZvcm1hdGlvblxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVNb2RlbENvbHVtbktleXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGluZyh0aGlzLmdldE1vZGVsS2V5cygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TW9kZWxLZXlzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51dGlscy5mbGF0dGVuS2V5c0J5Um93KHRoaXMuZmlyc3RJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaWRsZURldGVjdENoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmRldGVjdENoYW5nZXMoKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlV2lkdGgoa2V5OiBzdHJpbmcsIHdpZHRoOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmdba2V5XSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vbk1vdXNlUmVzaXplQ29sdW1uKGtleSwgd2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWZ0ZXJDYWxjdWxhdGVXaWR0aCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB7fTtcclxuICAgICAgICB0aGlzLnJlY2hlY2tWaWV3cG9ydENoZWNrZWQoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVNjaGVtYSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Nb3VzZVJlc2l6ZUNvbHVtbihrZXk6IHN0cmluZywgd2lkdGg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIubXV0YXRlQ29sdW1uU2NoZW1hKGtleSwgeyB3aWR0aCB9KTtcclxuICAgICAgICB0aGlzLmlkbGVEZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleGNsdWRpbmcoa2V5czogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZUtleXMubGVuZ3RoXHJcbiAgICAgICAgICAgID8ga2V5cy5maWx0ZXIoKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5leGNsdWRlS2V5cy5zb21lKChleGNsdWRlS2V5OiBzdHJpbmcgfCBSZWdFeHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleGNsdWRlS2V5IGluc3RhbmNlb2YgUmVnRXhwID8gISFrZXkubWF0Y2goZXhjbHVkZUtleSkgOiBrZXkgPT09IGV4Y2x1ZGVLZXk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDoga2V5cztcclxuICAgIH1cclxufVxyXG4iXX0=