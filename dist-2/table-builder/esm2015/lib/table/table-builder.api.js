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
        return this.excluding(this.utils.flattenKeysByRow(this.firstItem));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5hcGkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLWJ1aWxkZXIuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQU1ILFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxFQUNaLEtBQUssRUFLTCxNQUFNLEVBR1QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFjLFVBQVUsRUFBNkIsTUFBTSxxQ0FBcUMsQ0FBQztBQUV4RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUVuRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUtsRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUt6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7TUFFN0MsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUFtQyx1QkFBdUI7Ozs7QUFFckcsTUFBTSxPQUFnQixtQkFBbUI7SUFBekM7UUFJb0IsV0FBTSxHQUFlLElBQUksQ0FBQztRQUMxQixTQUFJLEdBQWEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ1IsY0FBUyxHQUFXLElBQUksQ0FBQztRQUN2QixnQkFB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akQsOENBQ2dFOztJQUVoRSxrREFDMkQ7O0lBRTNELDZDQUNpRDs7SUFFakQsNkNBQ2lEOztJQUVqRCw2Q0FDaUQ7O0lBRWpELHlDQUEyQjs7SUFDM0IsbURBQTRDOztJQUM1QywyQ0FBcUM7O0lBQ3JDLDRDQUE0Qzs7Ozs7Ozs7Ozs7OztJQWE1Qyw4Q0FBc0M7Ozs7Ozs7Ozs7O0lBV3RDLHFEQUE2Qzs7SUFFN0MseUNBQXdDOztJQUN4Qyw2Q0FBK0Q7O0lBQy9ELHdDQUFxRDs7SUFDckQsb0NBQTZDOztJQUM3QyxpQ0FBK0M7O0lBQy9DLHFDQUFrRDs7SUFDbEQsdUNBQW1EOztJQUNuRCwwQ0FBeUQ7O0lBQ3pELHlDQUF1RDs7SUFDdkQscUNBQXdDOztJQUN4Qyw2Q0FBdUM7Ozs7O0lBQ3ZDLGtDQUFnRDs7Ozs7SUFDaEQsMENBQW9FOzs7OztJQUNwRSx3Q0FBd0Q7Ozs7O0lBQ3hELDZDQUFxQzs7Ozs7SUFDckMsZ0RBQW9DOzs7OztJQUNwQywyQ0FBb0M7Ozs7O0lBZ0VwQywrREFBdUM7Ozs7O0lBRXZDLDZEQUFxQzs7Ozs7SUFFckMseUVBQWlEOzs7Ozs7SUFFakQsbUVBQTBEOzs7OztJQUUxRCx5REFBaUM7Ozs7O0lBRWpDLG1FQUEyQzs7Ozs7SUFFM0MsZ0VBQXdDOzs7OztJQUV4QyxtRUFBMkM7Ozs7O0lBRTNDLDREQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0RyYWdTb3J0RXZlbnQgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBBZnRlclZpZXdDaGVja2VkLFxyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb250ZW50Q2hpbGQsXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbnB1dCxcclxuICAgIE5nWm9uZSxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIFNpbXBsZUNoYW5nZXMsXHJcbiAgICBWaWV3UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOZ3hUYWJsZVZpZXdDaGFuZ2VzU2VydmljZSB9IGZyb20gJy4uL3RhYmxlL3NlcnZpY2VzL3RhYmxlLXZpZXctY2hhbmdlcy9uZ3gtdGFibGUtdmlldy1jaGFuZ2VzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGbiwgS2V5TWFwLCBQcmltYXJ5S2V5LCBRdWVyeUxpc3RSZWYsIFJlc2l6ZUV2ZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBDb2x1bW5zU2NoZW1hLCBTaW1wbGVTY2hlbWFDb2x1bW5zLCBUYWJsZVJvdyB9IGZyb20gJy4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuaW1wb3J0IHsgTmd4Q29udGV4dE1lbnVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LWNvbnRleHQtbWVudS9uZ3gtY29udGV4dC1tZW51LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlUGFyc2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGVtcGxhdGUtcGFyc2VyL3RlbXBsYXRlLXBhcnNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4T3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtb3B0aW9ucy9uZ3gtb3B0aW9ucy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LWNvbHVtbi9uZ3gtY29sdW1uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRNZW51U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1oZWFkZXIvbmd4LWhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LWZvb3Rlci9uZ3gtZm9vdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtZmlsdGVyL25neC1maWx0ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsdGVyV29ya2VyRXZlbnQgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbHRlcmFibGUvZmlsdGVyYWJsZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEcmFnZ2FibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kcmFnZ2FibGUvZHJhZ2dhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJhYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCB9IGZyb20gJy4vY29uZmlnL3RhYmxlLWJ1aWxkZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IFJlc2l6YWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3Jlc2l6ZXIvcmVzaXphYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0YWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3NvcnRhYmxlL3NvcnRhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25NYXAgfSBmcm9tICcuL3NlcnZpY2VzL3NlbGVjdGlvbi9zZWxlY3Rpb24nO1xyXG5pbXBvcnQgeyBpc0ZpcmVmb3ggfSBmcm9tICcuL29wZXJhdG9ycy9pcy1maXJlZm94JztcclxuXHJcbmNvbnN0IHsgUk9XX0hFSUdIVCwgTUFDUk9fVElNRSwgVElNRV9JRExFIH06IHR5cGVvZiBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCA9IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRhYmxlQnVpbGRlckFwaUltcGxcclxuICAgIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IFRhYmxlUm93W10gPSBudWxsO1xyXG4gICAgQElucHV0KCkgcHVibGljIGtleXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc3RyaXBlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbGF6eTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbmFtZTogc3RyaW5nID0gbnVsbDtcclxuICAgIEBJbnB1dCgnc29ydC10eXBlcycpIHB1YmxpYyBzb3J0VHlwZXM6IEtleU1hcCA9IG51bGw7XHJcbiAgICBASW5wdXQoJ2V4Y2x1ZGUta2V5cycpIHB1YmxpYyBleGNsdWRlS2V5czogQXJyYXk8c3RyaW5nIHwgUmVnRXhwPiA9IFtdO1xyXG4gICAgQElucHV0KCdhdXRvLXdpZHRoJykgcHVibGljIGF1dG9XaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCdhdXRvLWhlaWdodCcpIHB1YmxpYyBhdXRvSGVpZ2h0RGV0ZWN0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgnbmF0aXZlLXNjcm9sbGJhcicpIHB1YmxpYyBuYXRpdmVTY3JvbGxiYXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgncHJpbWFyeS1rZXknKSBwdWJsaWMgcHJpbWFyeUtleTogc3RyaW5nID0gUHJpbWFyeUtleS5JRDtcclxuICAgIEBJbnB1dCgnY29sdW1uLXdpZHRoJykgcHVibGljIGNvbHVtbldpZHRoOiBzdHJpbmcgfCBudW1iZXIgPSBudWxsO1xyXG4gICAgQElucHV0KCdyb3ctaGVpZ2h0JykgcHVibGljIHJvd0hlaWdodDogc3RyaW5nIHwgbnVtYmVyID0gbnVsbDtcclxuICAgIEBJbnB1dCgnYXN5bmMtY29sdW1ucycpIHB1YmxpYyBhc3luY0NvbHVtbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCd2ZXJ0aWNhbC1ib3JkZXInKSBwdWJsaWMgdmVydGljYWxCb3JkZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCdlbmFibGUtc2VsZWN0aW9uJykgcHVibGljIGVuYWJsZVNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCdlbmFibGUtZmlsdGVyaW5nJykgcHVibGljIGVuYWJsZUZpbHRlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCdidWZmZXItYW1vdW50JykgcHVibGljIGJ1ZmZlckFtb3VudDogbnVtYmVyID0gbnVsbDtcclxuICAgIEBJbnB1dCgnc2NoZW1hLWNvbHVtbnMnKSBwdWJsaWMgc2NoZW1hQ29sdW1uczogU2ltcGxlU2NoZW1hQ29sdW1ucyA9IFtdO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBhZnRlclJlbmRlcmVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIHNjaGVtYUNoYW5nZXM6IEV2ZW50RW1pdHRlcjxTaW1wbGVTY2hlbWFDb2x1bW5zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKE5neE9wdGlvbnNDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGNvbHVtbk9wdGlvbnM6IE5neE9wdGlvbnNDb21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oTmd4Q29sdW1uQ29tcG9uZW50KVxyXG4gICAgcHVibGljIGNvbHVtblRlbXBsYXRlczogUXVlcnlMaXN0UmVmPE5neENvbHVtbkNvbXBvbmVudD4gPSBudWxsO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoTmd4Q29udGV4dE1lbnVDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGNvbnRleHRNZW51VGVtcGxhdGU6IE5neENvbnRleHRNZW51Q29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKE5neEhlYWRlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgaGVhZGVyVGVtcGxhdGU6IE5neEhlYWRlckNvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hGb290ZXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGZvb3RlclRlbXBsYXRlOiBOZ3hGb290ZXJDb21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoTmd4RmlsdGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHB1YmxpYyBmaWx0ZXJUZW1wbGF0ZTogTmd4RmlsdGVyQ29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgaW5WaWV3cG9ydDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyB0YWJsZVZpZXdwb3J0Q2hlY2tlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgaXNGcm96ZW5WaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNGaXJlZm94TW9kZTogYm9vbGVhbiA9IGlzRmlyZWZveCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiB0aGUgY3VzdG9tIG5hbWVzIG9mIHRoZSBjb2x1bW4gbGlzdCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXcuXHJcbiAgICAgKiBAZXhhbXBsZTpcclxuICAgICAqICAgIDx0YWJsZS1idWlsZGVyICN0YWJsZVxyXG4gICAgICogICAgICAgIFtzb3VyY2VdPVwiW3sgaWQ6IDEsIG5hbWU6ICdoZWxsbycsIHZhbHVlOiAnd29ybGQnLCBkZXNjcmlwdGlvbjogJ3RleHQnIH0sIC4uLl1cIlxyXG4gICAgICogICAgICAgIFtleGNsdWRlXT1cIlsgJ2Rlc2NyaXB0aW9uJyBdXCI+XHJcbiAgICAgKiAgICAgIDxuZ3gtY29sdW1uICpuZ0Zvcj1cImxldCBrZXkgb2YgdGFibGUubW9kZWxDb2x1bW5LZXlzXCI+PC9uZ3gtY29sdW1uPlxyXG4gICAgICogICAgPC90YWJsZS1idWlsZGVyPlxyXG4gICAgICogICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgKiAgICBtb2RlbENvbHVtbktleXMgPT09IFsgJ2lkJywgJ2hlbGxvJywgJ3ZhbHVlJyBdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb2RlbENvbHVtbktleXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHRoZSBjdXN0b20gbmFtZXMgb2YgdGhlIGNvbHVtbiBsaXN0IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdmlldy5cclxuICAgICAqIEBleGFtcGxlOlxyXG4gICAgICogICAgPHRhYmxlLWJ1aWxkZXIgW2tleXNdPVsgJ2lkJywgJ2Rlc2NyaXB0aW9uJywgJ25hbWUnLCAnZGVzY3JpcHRpb24nIF0gLz5cclxuICAgICAqICAgIGN1c3RvbU1vZGVsQ29sdW1uc0tleXMgPT09IFsgJ2lkJywgJ2Rlc2NyaXB0aW9uJywgJ25hbWUnLCAnZGVzY3JpcHRpb24nIF1cclxuICAgICAqICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICogICAgPHRhYmxlLWJ1aWxkZXIgW2tleXNdPVsgJ2lkJywgJ2Rlc2NyaXB0aW9uJywgJ25hbWUnLCAnZGVzY3JpcHRpb24nIF0gW2V4Y2x1ZGVdPVsgJ2lkJywgJ2Rlc2NyaXB0aW9uJyBdIC8+XHJcbiAgICAgKiAgICBjdXN0b21Nb2RlbENvbHVtbnNLZXlzID09PSBbICduYW1lJyBdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjdXN0b21Nb2RlbENvbHVtbnNLZXlzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBpc0RyYWdnaW5nOiBLZXlNYXA8Ym9vbGVhbj4gPSB7fTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSB0ZW1wbGF0ZVBhcnNlcjogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IHNlbGVjdGlvbjogU2VsZWN0aW9uU2VydmljZTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSB1dGlsczogVXRpbHNTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZjtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSByZXNpemU6IFJlc2l6YWJsZVNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgc29ydGFibGU6IFNvcnRhYmxlU2VydmljZTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSBjb250ZXh0TWVudTogQ29udGV4dE1lbnVTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IGZpbHRlcmFibGU6IEZpbHRlcmFibGVTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IG5nWm9uZTogTmdab25lO1xyXG4gICAgcHVibGljIGFjY2Vzc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgYXBwOiBBcHBsaWNhdGlvblJlZjtcclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSB2aWV3Q2hhbmdlczogTmd4VGFibGVWaWV3Q2hhbmdlc1NlcnZpY2U7XHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgZHJhZ2dhYmxlOiBEcmFnZ2FibGVTZXJ2aWNlO1xyXG4gICAgcHJvdGVjdGVkIG9yaWdpbmFsU291cmNlOiBUYWJsZVJvd1tdO1xyXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVkQ291bnRLZXlzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGZpbHRlcklkVGFzazogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiAtIDx0YWJsZS1idWlsZGVyIFtrZXlzXT1bICdpZCcsICd2YWx1ZScsICdpZCcsICdwb3NpdGlvbicsICd2YWx1ZScgXSAvPlxyXG4gICAgICogcmV0dXJuZWQgdW5pcXVlIGRpc3BsYXllZCBjb2x1bW5zIFsgJ2lkJywgJ3ZhbHVlJywgJ3Bvc2l0aW9uJyBdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXMpIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZUNvbHVtbnMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtblNjaGVtYVxyXG4gICAgICAgICAgICAuZmlsdGVyKChjb2x1bW46IENvbHVtbnNTY2hlbWEpID0+IGNvbHVtbi5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgIC5tYXAoKGNvbHVtbjogQ29sdW1uc1NjaGVtYSkgPT4gY29sdW1uLmtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gLSA8dGFibGUtYnVpbGRlciBba2V5c109WyAnaWQnLCAndmFsdWUnLCAnaWQnLCAncG9zaXRpb24nLCAndmFsdWUnIF0gLz5cclxuICAgICAqIHJldHVybmVkIG9yZGVyZWQgZGlzcGxheWVkIGNvbHVtbnMgWyAnaWQnLCAndmFsdWUnLCAnaWQnLCAncG9zaXRpb24nLCAndmFsdWUnIF1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwb3NpdGlvbkNvbHVtbnMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtblNjaGVtYS5tYXAoKGNvbHVtbjogQ29sdW1uc1NjaGVtYSkgPT4gY29sdW1uLmtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb2x1bW5TY2hlbWEoKTogQ29sdW1uc1NjaGVtYVtdIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMudGVtcGxhdGVQYXJzZXIuc2NoZW1hICYmIHRoaXMudGVtcGxhdGVQYXJzZXIuc2NoZW1hLmNvbHVtbnMpIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWRJdGVtcygpOiBUYWJsZVJvd1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2UuZmlsdGVyKChpdGVtOiBUYWJsZVJvd1tdKSA9PiB0aGlzLnNlbGVjdGlvbk1vZGVsLmVudHJpZXNbaXRlbVt0aGlzLnByaW1hcnlLZXldXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmaXJzdEl0ZW0oKTogVGFibGVSb3cge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2VbMF0pIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogVGFibGVSb3cge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2VbdGhpcy5zb3VyY2UubGVuZ3RoIC0gMV0pIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VsZWN0aW9uTW9kZWwoKTogU2VsZWN0aW9uTWFwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGllbnRSb3dIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5yb3dIZWlnaHQgYXMgc3RyaW5nKSB8fCBST1dfSEVJR0hUO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xpZW50Q29sV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRvV2lkdGggPyBudWxsIDogcGFyc2VJbnQodGhpcy5jb2x1bW5XaWR0aCBhcyBzdHJpbmcpIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb2x1bW5WaXJ0dWFsSGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLmxlbmd0aCAqIHRoaXMuY2xpZW50Um93SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29sdW1uSGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZSAqIHRoaXMuY2xpZW50Um93SGVpZ2h0ICsgdGhpcy5jbGllbnRSb3dIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5sZW5ndGgpIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG1hcmtEaXJ0eUNoZWNrKCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG1hcmtGb3JDaGVjaygpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBtYXJrVGVtcGxhdGVDb250ZW50Q2hlY2soKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG5nT25Jbml0KCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZ0FmdGVyVmlld0luaXQoKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIHJlY2hlY2tWaWV3cG9ydENoZWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YWJsZVZpZXdwb3J0Q2hlY2tlZCA9ICF0aGlzLnRhYmxlVmlld3BvcnRDaGVja2VkO1xyXG4gICAgICAgIHRoaXMuaWRsZURldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5hYmxlRHJhZ2dpbmcoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlZFRlbXBsYXRlc1trZXldLmRyYWdnYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY2Vzc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlRHJhZ2dpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWNjZXNzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2Nlc3NEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2l6ZUNvbHVtbih7IGV2ZW50LCBrZXkgfTogUmVzaXplRXZlbnQsIGNvbHVtbjogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlY2hlY2tWaWV3cG9ydENoZWNrZWQoKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVEcmFnZ2luZygpO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2l6ZS5yZXNpemUoXHJcbiAgICAgICAgICAgIGV2ZW50IGFzIE1vdXNlRXZlbnQsXHJcbiAgICAgICAgICAgIGNvbHVtbixcclxuICAgICAgICAgICAgKHdpZHRoOiBudW1iZXIpID0+IHRoaXMuY2FsY3VsYXRlV2lkdGgoa2V5LCB3aWR0aCksXHJcbiAgICAgICAgICAgICgpID0+IHRoaXMuYWZ0ZXJDYWxjdWxhdGVXaWR0aCgpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmlsdGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5lbmFibGVGaWx0ZXJpbmcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgZm9yZ290IHRvIGVuYWJsZSBmaWx0ZXJpbmc6IFxcbiA8bmd4LXRhYmxlLWJ1aWxkZXIgW2VuYWJsZS1maWx0ZXJpbmddPVwidHJ1ZVwiIC8+Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuZmlsdGVySWRUYXNrKTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJZFRhc2sgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmFibGUuY2hhbmdlRmlsdGVyaW5nU3RhdHVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBbmRGaWx0ZXIoKS50aGVuKCgpID0+IHRoaXMucmVDaGVja0RlZmluaXRpb25zKCkpO1xyXG4gICAgICAgICAgICB9LCBNQUNST19USU1FKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc29ydEFuZEZpbHRlcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUZyZWV6ZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJhYmxlLmZpbHRlclZhbHVlRXhpc3QgJiYgdGhpcy5lbmFibGVGaWx0ZXJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyOiBGaWx0ZXJXb3JrZXJFdmVudCA9IGF3YWl0IHRoaXMuZmlsdGVyYWJsZS5maWx0ZXIodGhpcy5vcmlnaW5hbFNvdXJjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gYXdhaXQgdGhpcy5zb3J0YWJsZS5zb3J0KGZpbHRlci5zb3VyY2UpO1xyXG4gICAgICAgICAgICBmaWx0ZXIuZmlyZVNlbGVjdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc29ydGFibGUuZW1wdHkgJiYgdGhpcy5zb3VyY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBhd2FpdCB0aGlzLnNvcnRhYmxlLnNvcnQodGhpcy5vcmlnaW5hbFNvdXJjZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zb3J0YWJsZS5lbXB0eSAmJiAhdGhpcy5maWx0ZXJhYmxlLmZpbHRlclZhbHVlRXhpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLm9yaWdpbmFsU291cmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b2dnbGVGcmVlemUoVElNRV9JRExFKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29ydEJ5S2V5KGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb3J0YWJsZS51cGRhdGVTb3J0S2V5KGtleSk7XHJcbiAgICAgICAgdGhpcy5zb3J0QW5kRmlsdGVyKCkudGhlbigoKSA9PiB0aGlzLnJlQ2hlY2tEZWZpbml0aW9ucygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJvcCh7IHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleCB9OiBDZGtEcmFnU29ydEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNLZXk6IHN0cmluZyA9IHRoaXMudmlzaWJsZUNvbHVtbnNbcHJldmlvdXNJbmRleF07XHJcbiAgICAgICAgY29uc3QgY3VycmVudEtleTogc3RyaW5nID0gdGhpcy52aXNpYmxlQ29sdW1uc1tjdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlLmRyb3AocHJldmlvdXNLZXksIGN1cnJlbnRLZXkpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlU2NoZW1hKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrVmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pblZpZXdwb3J0ID0gdmlzaWJsZTtcclxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoISh0aGlzLmNkIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZUZyZWV6ZSh0aW1lOiBudW1iZXIgPSBudWxsLCBjYWxsYmFjazogRm4gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0Zyb3plblZpZXcgPSAhdGhpcy5pc0Zyb3plblZpZXc7XHJcbiAgICAgICAgaWYgKHRpbWUpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVNjaGVtYShkZWZhdWx0Q29sdW1uczogU2ltcGxlU2NoZW1hQ29sdW1ucyA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByZW5kZXJlZENvbHVtbnM6IFNpbXBsZVNjaGVtYUNvbHVtbnMgPSB0aGlzLnRlbXBsYXRlUGFyc2VyLnNjaGVtYS5leHBvcnRDb2x1bW5zKCk7XHJcbiAgICAgICAgY29uc3QgY29sdW1uczogU2ltcGxlU2NoZW1hQ29sdW1ucyA9IGRlZmF1bHRDb2x1bW5zIHx8IHJlbmRlcmVkQ29sdW1ucztcclxuICAgICAgICB0aGlzLnZpZXdDaGFuZ2VzLnVwZGF0ZSh7IG5hbWU6IHRoaXMubmFtZSwgY29sdW1ucyB9KTtcclxuICAgICAgICB0aGlzLnNjaGVtYUNoYW5nZXMuZW1pdChjb2x1bW5zKTtcclxuICAgICAgICB0aGlzLmlkbGVEZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlQ2hlY2tEZWZpbml0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZpbHRlcmFibGUuZGVmaW5pdGlvbiA9IHsgLi4udGhpcy5maWx0ZXJhYmxlLmRlZmluaXRpb24gfTtcclxuICAgICAgICB0aGlzLmZpbHRlcmFibGUuY2hhbmdlRmlsdGVyaW5nU3RhdHVzKCk7XHJcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHJldHVybnMgdGhlIG51bWJlciBvZiBrZXlzIGluIHRoZSBtb2RlbFxyXG4gICAgICogQGV4YW1wbGU6IDx0YWJsZS1idWlsZGVyIFtzb3VyY2VdPVt7IGlkOiAxLCBuYW1lOiAnaGVsbG8nIH0sIC4uLl0gLz4gYSB2YWx1ZSBvZiAyIHdpbGwgYmUgcmV0dXJuZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldENvdW50S2V5cygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmZpcnN0SXRlbSkubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHNlZSBUYWJsZUJ1aWxkZXJBcGlJbXBsI2N1c3RvbU1vZGVsQ29sdW1uc0tleXMgZm9yIGZ1cnRoZXIgaW5mb3JtYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdlbmVyYXRlQ3VzdG9tTW9kZWxDb2x1bW5zS2V5cygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkaW5nKHRoaXMua2V5cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc2VlIFRhYmxlQnVpbGRlckFwaUltcGwjbW9kZWxDb2x1bW5LZXlzIGZvciBmdXJ0aGVyIGluZm9ybWF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZU1vZGVsQ29sdW1uS2V5cygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkaW5nKHRoaXMudXRpbHMuZmxhdHRlbktleXNCeVJvdyh0aGlzLmZpcnN0SXRlbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpZGxlRGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuZGV0ZWN0Q2hhbmdlcygpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aChrZXk6IHN0cmluZywgd2lkdGg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZ1trZXldID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uTW91c2VSZXNpemVDb2x1bW4oa2V5LCB3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZnRlckNhbGN1bGF0ZVdpZHRoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHt9O1xyXG4gICAgICAgIHRoaXMucmVjaGVja1ZpZXdwb3J0Q2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlU2NoZW1hKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlUmVzaXplQ29sdW1uKGtleTogc3RyaW5nLCB3aWR0aDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5tdXRhdGVDb2x1bW5TY2hlbWEoa2V5LCB7IHdpZHRoIH0pO1xyXG4gICAgICAgIHRoaXMuaWRsZURldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4Y2x1ZGluZyhrZXlzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRlS2V5cy5sZW5ndGhcclxuICAgICAgICAgICAgPyBrZXlzLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmV4Y2x1ZGVLZXlzLnNvbWUoKGV4Y2x1ZGVLZXk6IHN0cmluZyB8IFJlZ0V4cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4Y2x1ZGVLZXkgaW5zdGFuY2VvZiBSZWdFeHAgPyAhIWtleS5tYXRjaChleGNsdWRlS2V5KSA6IGtleSA9PT0gZXhjbHVkZUtleTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOiBrZXlzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==