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
var ROW_HEIGHT = TableBuilderOptionsImpl.ROW_HEIGHT, MACRO_TIME = TableBuilderOptionsImpl.MACRO_TIME, TIME_IDLE = TableBuilderOptionsImpl.TIME_IDLE;
/**
 * @abstract
 */
var TableBuilderApiImpl = /** @class */ (function () {
    function TableBuilderApiImpl() {
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
    Object.defineProperty(TableBuilderApiImpl.prototype, "displayedColumns", {
        /**
         * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
         * returned unique displayed columns [ 'id', 'value', 'position' ]
         */
        get: /**
         * \@description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
         * returned unique displayed columns [ 'id', 'value', 'position' ]
         * @return {?}
         */
        function () {
            return Object.keys(this.templateParser.compiledTemplates) || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "visibleColumns", {
        get: /**
         * @return {?}
         */
        function () {
            return this.columnSchema
                .filter((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.isVisible; }))
                .map((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.key; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "positionColumns", {
        /**
         * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
         * returned ordered displayed columns [ 'id', 'value', 'id', 'position', 'value' ]
         */
        get: /**
         * \@description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
         * returned ordered displayed columns [ 'id', 'value', 'id', 'position', 'value' ]
         * @return {?}
         */
        function () {
            return this.columnSchema.map((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.key; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "columnSchema", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.templateParser.schema && this.templateParser.schema.columns) || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "selectedItems", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.source.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.selectionModel.entries[item[_this.primaryKey]]; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "firstItem", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.source && this.source[0]) || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "lastItem", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.source && this.source[this.source.length - 1]) || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "selectionModel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selection.selectionModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "clientRowHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return parseInt((/** @type {?} */ (this.rowHeight))) || ROW_HEIGHT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "clientColWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.autoWidth ? null : parseInt((/** @type {?} */ (this.columnWidth))) || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "columnVirtualHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.source.length * this.clientRowHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "columnHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.size * this.clientRowHeight + this.clientRowHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderApiImpl.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.source && this.source.length) || 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TableBuilderApiImpl.prototype.recheckViewportChecked = /**
     * @return {?}
     */
    function () {
        this.tableViewportChecked = !this.tableViewportChecked;
        this.idleDetectChanges();
    };
    /**
     * @param {?} key
     * @return {?}
     */
    TableBuilderApiImpl.prototype.enableDragging = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.templateParser.compiledTemplates[key].draggable) {
            this.accessDragging = true;
            this.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    TableBuilderApiImpl.prototype.disableDragging = /**
     * @return {?}
     */
    function () {
        if (this.accessDragging) {
            this.accessDragging = false;
            this.detectChanges();
        }
    };
    /**
     * @param {?} __0
     * @param {?} column
     * @return {?}
     */
    TableBuilderApiImpl.prototype.resizeColumn = /**
     * @param {?} __0
     * @param {?} column
     * @return {?}
     */
    function (_a, column) {
        var _this = this;
        var event = _a.event, key = _a.key;
        this.recheckViewportChecked();
        this.disableDragging();
        this.resize.resize((/** @type {?} */ (event)), column, (/**
         * @param {?} width
         * @return {?}
         */
        function (width) { return _this.calculateWidth(key, width); }), (/**
         * @return {?}
         */
        function () { return _this.afterCalculateWidth(); }));
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    TableBuilderApiImpl.prototype.filter = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.enableFiltering) {
            throw new Error('You forgot to enable filtering: \n <ngx-table-builder [enable-filtering]="true" />');
        }
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.clearInterval(_this.filterIdTask);
            _this.filterIdTask = window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.filterable.changeFilteringStatus();
                _this.sortAndFilter().then((/**
                 * @return {?}
                 */
                function () { return _this.reCheckDefinitions(); }));
            }), MACRO_TIME);
        }));
    };
    /**
     * @return {?}
     */
    TableBuilderApiImpl.prototype.sortAndFilter = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filter, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.toggleFreeze();
                        if (!(this.filterable.filterValueExist && this.enableFiltering)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.filterable.filter(this.originalSource)];
                    case 1:
                        filter = _c.sent();
                        _a = this;
                        return [4 /*yield*/, this.sortable.sort(filter.source)];
                    case 2:
                        _a.source = _c.sent();
                        filter.fireSelection();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(!this.sortable.empty && this.source)) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, this.sortable.sort(this.originalSource)];
                    case 4:
                        _b.source = _c.sent();
                        _c.label = 5;
                    case 5:
                        if (this.sortable.empty && !this.filterable.filterValueExist) {
                            this.source = this.originalSource;
                        }
                        this.toggleFreeze(TIME_IDLE);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} key
     * @return {?}
     */
    TableBuilderApiImpl.prototype.sortByKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        this.sortable.updateSortKey(key);
        this.sortAndFilter().then((/**
         * @return {?}
         */
        function () { return _this.reCheckDefinitions(); }));
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    TableBuilderApiImpl.prototype.drop = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var previousIndex = _a.previousIndex, currentIndex = _a.currentIndex;
        /** @type {?} */
        var previousKey = this.visibleColumns[previousIndex];
        /** @type {?} */
        var currentKey = this.visibleColumns[currentIndex];
        this.draggable.drop(previousKey, currentKey);
        this.changeSchema();
    };
    /**
     * @param {?} visible
     * @return {?}
     */
    TableBuilderApiImpl.prototype.checkVisible = /**
     * @param {?} visible
     * @return {?}
     */
    function (visible) {
        this.inViewport = visible;
        this.detectChanges();
    };
    /**
     * @return {?}
     */
    TableBuilderApiImpl.prototype.detectChanges = /**
     * @return {?}
     */
    function () {
        if (!((/** @type {?} */ (this.cd))).destroyed) {
            this.cd.detectChanges();
        }
    };
    /**
     * @param {?=} time
     * @param {?=} callback
     * @return {?}
     */
    TableBuilderApiImpl.prototype.toggleFreeze = /**
     * @param {?=} time
     * @param {?=} callback
     * @return {?}
     */
    function (time, callback) {
        var _this = this;
        if (time === void 0) { time = null; }
        if (callback === void 0) { callback = null; }
        this.isFrozenView = !this.isFrozenView;
        if (time) {
            window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.detectChanges();
                callback && callback();
            }), time);
        }
        else {
            this.detectChanges();
        }
    };
    /**
     * @param {?=} defaultColumns
     * @return {?}
     */
    TableBuilderApiImpl.prototype.changeSchema = /**
     * @param {?=} defaultColumns
     * @return {?}
     */
    function (defaultColumns) {
        if (defaultColumns === void 0) { defaultColumns = null; }
        /** @type {?} */
        var renderedColumns = this.templateParser.schema.exportColumns();
        /** @type {?} */
        var columns = defaultColumns || renderedColumns;
        this.viewChanges.update({ name: this.name, columns: columns });
        this.schemaChanges.emit(columns);
        this.idleDetectChanges();
    };
    /**
     * @protected
     * @return {?}
     */
    TableBuilderApiImpl.prototype.reCheckDefinitions = /**
     * @protected
     * @return {?}
     */
    function () {
        this.filterable.definition = tslib_1.__assign({}, this.filterable.definition);
        this.filterable.changeFilteringStatus();
        this.detectChanges();
    };
    /**
     * @description: returns the number of keys in the model
     * @example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     */
    /**
     * \@description: returns the number of keys in the model
     * \@example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     * @protected
     * @return {?}
     */
    TableBuilderApiImpl.prototype.getCountKeys = /**
     * \@description: returns the number of keys in the model
     * \@example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     * @protected
     * @return {?}
     */
    function () {
        return Object.keys(this.firstItem).length;
    };
    /**
     * @see TableBuilderApiImpl#customModelColumnsKeys for further information
     */
    /**
     * @see TableBuilderApiImpl#customModelColumnsKeys for further information
     * @protected
     * @return {?}
     */
    TableBuilderApiImpl.prototype.generateCustomModelColumnsKeys = /**
     * @see TableBuilderApiImpl#customModelColumnsKeys for further information
     * @protected
     * @return {?}
     */
    function () {
        return this.excluding(this.keys);
    };
    /**
     * @see TableBuilderApiImpl#modelColumnKeys for further information
     */
    /**
     * @see TableBuilderApiImpl#modelColumnKeys for further information
     * @protected
     * @return {?}
     */
    TableBuilderApiImpl.prototype.generateModelColumnKeys = /**
     * @see TableBuilderApiImpl#modelColumnKeys for further information
     * @protected
     * @return {?}
     */
    function () {
        return this.excluding(this.utils.flattenKeysByRow(this.firstItem));
    };
    /**
     * @protected
     * @return {?}
     */
    TableBuilderApiImpl.prototype.idleDetectChanges = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return window.requestAnimationFrame((/**
         * @return {?}
         */
        function () { return _this.detectChanges(); })); }));
    };
    /**
     * @private
     * @param {?} key
     * @param {?} width
     * @return {?}
     */
    TableBuilderApiImpl.prototype.calculateWidth = /**
     * @private
     * @param {?} key
     * @param {?} width
     * @return {?}
     */
    function (key, width) {
        this.isDragging[key] = true;
        this.onMouseResizeColumn(key, width);
    };
    /**
     * @private
     * @return {?}
     */
    TableBuilderApiImpl.prototype.afterCalculateWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this.isDragging = {};
        this.recheckViewportChecked();
        this.changeSchema();
    };
    /**
     * @private
     * @param {?} key
     * @param {?} width
     * @return {?}
     */
    TableBuilderApiImpl.prototype.onMouseResizeColumn = /**
     * @private
     * @param {?} key
     * @param {?} width
     * @return {?}
     */
    function (key, width) {
        this.templateParser.mutateColumnSchema(key, { width: width });
        this.idleDetectChanges();
    };
    /**
     * @private
     * @param {?} keys
     * @return {?}
     */
    TableBuilderApiImpl.prototype.excluding = /**
     * @private
     * @param {?} keys
     * @return {?}
     */
    function (keys) {
        var _this = this;
        return this.excludeKeys.length
            ? keys.filter((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return !_this.excludeKeys.some((/**
                 * @param {?} excludeKey
                 * @return {?}
                 */
                function (excludeKey) {
                    return excludeKey instanceof RegExp ? !!key.match(excludeKey) : key === excludeKey;
                }));
            }))
            : keys;
    };
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
    return TableBuilderApiImpl;
}());
export { TableBuilderApiImpl };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5hcGkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLWJ1aWxkZXIuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQU1ILFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxFQUNaLEtBQUssRUFLTCxNQUFNLEVBR1QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFjLFVBQVUsRUFBNkIsTUFBTSxxQ0FBcUMsQ0FBQztBQUV4RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUVuRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUtsRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUt6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFM0MsSUFBQSwrQ0FBVSxFQUFFLCtDQUFVLEVBQUUsNkNBQVM7Ozs7QUFFekM7SUFBQTtRQUlvQixXQUFNLEdBQWUsSUFBSSxDQUFDO1FBQzFCLFNBQUksR0FBYSxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixTQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3JCLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDUixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQTJCLEVBQUUsQ0FBQztRQUMzQyxjQUFTLEdBQVks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QTZDOztJQUU3Qyx5Q0FBd0M7O0lBQ3hDLDZDQUErRDs7SUFDL0Qsd0NBQXFEOztJQUNyRCxvQ0FBNkM7O0lBQzdDLGlDQUErQzs7SUFDL0MscUNBQWtEOztJQUNsRCx1Q0FBbUQ7O0lBQ25ELDBDQUF5RDs7SUFDekQseUNBQXVEOztJQUN2RCxxQ0FBd0M7O0lBQ3hDLDZDQUF1Qzs7Ozs7SUFDdkMsa0NBQWdEOzs7OztJQUNoRCwwQ0FBb0U7Ozs7O0lBQ3BFLHdDQUF3RDs7Ozs7SUFDeEQsNkNBQXFDOzs7OztJQUNyQyxnREFBb0M7Ozs7O0lBQ3BDLDJDQUFvQzs7Ozs7SUFnRXBDLCtEQUF1Qzs7Ozs7SUFFdkMsNkRBQXFDOzs7OztJQUVyQyx5RUFBaUQ7Ozs7OztJQUVqRCxtRUFBMEQ7Ozs7O0lBRTFELHlEQUFpQzs7Ozs7SUFFakMsbUVBQTJDOzs7OztJQUUzQyxnRUFBd0M7Ozs7O0lBRXhDLG1FQUEyQzs7Ozs7SUFFM0MsNERBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrRHJhZ1NvcnRFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xyXG5pbXBvcnQge1xyXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgIEFmdGVyVmlld0NoZWNrZWQsXHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQXBwbGljYXRpb25SZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbnRlbnRDaGlsZCxcclxuICAgIENvbnRlbnRDaGlsZHJlbixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgTmdab25lLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIFZpZXdSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5neFRhYmxlVmlld0NoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi4vdGFibGUvc2VydmljZXMvdGFibGUtdmlldy1jaGFuZ2VzL25neC10YWJsZS12aWV3LWNoYW5nZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IEZuLCBLZXlNYXAsIFByaW1hcnlLZXksIFF1ZXJ5TGlzdFJlZiwgUmVzaXplRXZlbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IENvbHVtbnNTY2hlbWEsIFNpbXBsZVNjaGVtYUNvbHVtbnMsIFRhYmxlUm93IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBOZ3hDb250ZXh0TWVudUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtY29udGV4dC1tZW51L25neC1jb250ZXh0LW1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGVtcGxhdGVQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90ZW1wbGF0ZS1wYXJzZXIvdGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hPcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1vcHRpb25zL25neC1vcHRpb25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neENvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtY29sdW1uL25neC1jb2x1bW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LWhlYWRlci9uZ3gtaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtZm9vdGVyL25neC1mb290ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1maWx0ZXIvbmd4LWZpbHRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGaWx0ZXJXb3JrZXJFdmVudCB9IGZyb20gJy4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERyYWdnYWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RyYWdnYWJsZS9kcmFnZ2FibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEZpbHRlcmFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3NlbGVjdGlvbi9zZWxlY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsIH0gZnJvbSAnLi9jb25maWcvdGFibGUtYnVpbGRlci1vcHRpb25zJztcclxuaW1wb3J0IHsgUmVzaXphYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcmVzaXplci9yZXNpemFibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRhYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc29ydGFibGUvc29ydGFibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlbGVjdGlvbk1hcCB9IGZyb20gJy4vc2VydmljZXMvc2VsZWN0aW9uL3NlbGVjdGlvbic7XHJcbmltcG9ydCB7IGlzRmlyZWZveCB9IGZyb20gJy4vb3BlcmF0b3JzL2lzLWZpcmVmb3gnO1xyXG5cclxuY29uc3QgeyBST1dfSEVJR0hULCBNQUNST19USU1FLCBUSU1FX0lETEUgfTogdHlwZW9mIFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsID0gVGFibGVCdWlsZGVyT3B0aW9uc0ltcGw7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGFibGVCdWlsZGVyQXBpSW1wbFxyXG4gICAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgcHVibGljIHNvdXJjZTogVGFibGVSb3dbXSA9IG51bGw7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMga2V5czogc3RyaW5nW10gPSBbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzdHJpcGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBsYXp5OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgQElucHV0KCdzb3J0LXR5cGVzJykgcHVibGljIHNvcnRUeXBlczogS2V5TWFwID0gbnVsbDtcclxuICAgIEBJbnB1dCgnZXhjbHVkZS1rZXlzJykgcHVibGljIGV4Y2x1ZGVLZXlzOiBBcnJheTxzdHJpbmcgfCBSZWdFeHA+ID0gW107XHJcbiAgICBASW5wdXQoJ2F1dG8td2lkdGgnKSBwdWJsaWMgYXV0b1dpZHRoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2F1dG8taGVpZ2h0JykgcHVibGljIGF1dG9IZWlnaHREZXRlY3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCduYXRpdmUtc2Nyb2xsYmFyJykgcHVibGljIG5hdGl2ZVNjcm9sbGJhcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCdwcmltYXJ5LWtleScpIHB1YmxpYyBwcmltYXJ5S2V5OiBzdHJpbmcgPSBQcmltYXJ5S2V5LklEO1xyXG4gICAgQElucHV0KCdjb2x1bW4td2lkdGgnKSBwdWJsaWMgY29sdW1uV2lkdGg6IHN0cmluZyB8IG51bWJlciA9IG51bGw7XHJcbiAgICBASW5wdXQoJ3Jvdy1oZWlnaHQnKSBwdWJsaWMgcm93SGVpZ2h0OiBzdHJpbmcgfCBudW1iZXIgPSBudWxsO1xyXG4gICAgQElucHV0KCdhc3luYy1jb2x1bW5zJykgcHVibGljIGFzeW5jQ29sdW1uczogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoJ3ZlcnRpY2FsLWJvcmRlcicpIHB1YmxpYyB2ZXJ0aWNhbEJvcmRlcjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoJ2VuYWJsZS1zZWxlY3Rpb24nKSBwdWJsaWMgZW5hYmxlU2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2VuYWJsZS1maWx0ZXJpbmcnKSBwdWJsaWMgZW5hYmxlRmlsdGVyaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2J1ZmZlci1hbW91bnQnKSBwdWJsaWMgYnVmZmVyQW1vdW50OiBudW1iZXIgPSBudWxsO1xyXG4gICAgQElucHV0KCdzY2hlbWEtY29sdW1ucycpIHB1YmxpYyBzY2hlbWFDb2x1bW5zOiBTaW1wbGVTY2hlbWFDb2x1bW5zID0gW107XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIGFmdGVyUmVuZGVyZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2NoZW1hQ2hhbmdlczogRXZlbnRFbWl0dGVyPFNpbXBsZVNjaGVtYUNvbHVtbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoTmd4T3B0aW9uc0NvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgY29sdW1uT3B0aW9uczogTmd4T3B0aW9uc0NvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihOZ3hDb2x1bW5Db21wb25lbnQpXHJcbiAgICBwdWJsaWMgY29sdW1uVGVtcGxhdGVzOiBRdWVyeUxpc3RSZWY8Tmd4Q29sdW1uQ29tcG9uZW50PiA9IG51bGw7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hDb250ZXh0TWVudUNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgY29udGV4dE1lbnVUZW1wbGF0ZTogTmd4Q29udGV4dE1lbnVDb21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoTmd4SGVhZGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHB1YmxpYyBoZWFkZXJUZW1wbGF0ZTogTmd4SGVhZGVyQ29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKE5neEZvb3RlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgZm9vdGVyVGVtcGxhdGU6IE5neEZvb3RlckNvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hGaWx0ZXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGZpbHRlclRlbXBsYXRlOiBOZ3hGaWx0ZXJDb21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBpblZpZXdwb3J0OiBib29sZWFuO1xyXG4gICAgcHVibGljIHRhYmxlVmlld3BvcnRDaGVja2VkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc0Zyb3plblZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc0ZpcmVmb3hNb2RlOiBib29sZWFuID0gaXNGaXJlZm94KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHRoZSBjdXN0b20gbmFtZXMgb2YgdGhlIGNvbHVtbiBsaXN0IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdmlldy5cclxuICAgICAqIEBleGFtcGxlOlxyXG4gICAgICogICAgPHRhYmxlLWJ1aWxkZXIgI3RhYmxlXHJcbiAgICAgKiAgICAgICAgW3NvdXJjZV09XCJbeyBpZDogMSwgbmFtZTogJ2hlbGxvJywgdmFsdWU6ICd3b3JsZCcsIGRlc2NyaXB0aW9uOiAndGV4dCcgfSwgLi4uXVwiXHJcbiAgICAgKiAgICAgICAgW2V4Y2x1ZGVdPVwiWyAnZGVzY3JpcHRpb24nIF1cIj5cclxuICAgICAqICAgICAgPG5neC1jb2x1bW4gKm5nRm9yPVwibGV0IGtleSBvZiB0YWJsZS5tb2RlbENvbHVtbktleXNcIj48L25neC1jb2x1bW4+XHJcbiAgICAgKiAgICA8L3RhYmxlLWJ1aWxkZXI+XHJcbiAgICAgKiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAqICAgIG1vZGVsQ29sdW1uS2V5cyA9PT0gWyAnaWQnLCAnaGVsbG8nLCAndmFsdWUnIF1cclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vZGVsQ29sdW1uS2V5czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogdGhlIGN1c3RvbSBuYW1lcyBvZiB0aGUgY29sdW1uIGxpc3QgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB2aWV3LlxyXG4gICAgICogQGV4YW1wbGU6XHJcbiAgICAgKiAgICA8dGFibGUtYnVpbGRlciBba2V5c109WyAnaWQnLCAnZGVzY3JpcHRpb24nLCAnbmFtZScsICdkZXNjcmlwdGlvbicgXSAvPlxyXG4gICAgICogICAgY3VzdG9tTW9kZWxDb2x1bW5zS2V5cyA9PT0gWyAnaWQnLCAnZGVzY3JpcHRpb24nLCAnbmFtZScsICdkZXNjcmlwdGlvbicgXVxyXG4gICAgICogICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgKiAgICA8dGFibGUtYnVpbGRlciBba2V5c109WyAnaWQnLCAnZGVzY3JpcHRpb24nLCAnbmFtZScsICdkZXNjcmlwdGlvbicgXSBbZXhjbHVkZV09WyAnaWQnLCAnZGVzY3JpcHRpb24nIF0gLz5cclxuICAgICAqICAgIGN1c3RvbU1vZGVsQ29sdW1uc0tleXMgPT09IFsgJ25hbWUnIF1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGN1c3RvbU1vZGVsQ29sdW1uc0tleXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgcHVibGljIGlzRHJhZ2dpbmc6IEtleU1hcDxib29sZWFuPiA9IHt9O1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IHRlbXBsYXRlUGFyc2VyOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXJ2aWNlO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IHJlc2l6ZTogUmVzaXphYmxlU2VydmljZTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSBzb3J0YWJsZTogU29ydGFibGVTZXJ2aWNlO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IGNvbnRleHRNZW51OiBDb250ZXh0TWVudVNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgZmlsdGVyYWJsZTogRmlsdGVyYWJsZVNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmU7XHJcbiAgICBwdWJsaWMgYWNjZXNzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSBhcHA6IEFwcGxpY2F0aW9uUmVmO1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IHZpZXdDaGFuZ2VzOiBOZ3hUYWJsZVZpZXdDaGFuZ2VzU2VydmljZTtcclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSBkcmFnZ2FibGU6IERyYWdnYWJsZVNlcnZpY2U7XHJcbiAgICBwcm90ZWN0ZWQgb3JpZ2luYWxTb3VyY2U6IFRhYmxlUm93W107XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZWRDb3VudEtleXM6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZmlsdGVySWRUYXNrOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIC0gPHRhYmxlLWJ1aWxkZXIgW2tleXNdPVsgJ2lkJywgJ3ZhbHVlJywgJ2lkJywgJ3Bvc2l0aW9uJywgJ3ZhbHVlJyBdIC8+XHJcbiAgICAgKiByZXR1cm5lZCB1bmlxdWUgZGlzcGxheWVkIGNvbHVtbnMgWyAnaWQnLCAndmFsdWUnLCAncG9zaXRpb24nIF1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlZFRlbXBsYXRlcykgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlQ29sdW1ucygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1uU2NoZW1hXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGNvbHVtbjogQ29sdW1uc1NjaGVtYSkgPT4gY29sdW1uLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgLm1hcCgoY29sdW1uOiBDb2x1bW5zU2NoZW1hKSA9PiBjb2x1bW4ua2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiAtIDx0YWJsZS1idWlsZGVyIFtrZXlzXT1bICdpZCcsICd2YWx1ZScsICdpZCcsICdwb3NpdGlvbicsICd2YWx1ZScgXSAvPlxyXG4gICAgICogcmV0dXJuZWQgb3JkZXJlZCBkaXNwbGF5ZWQgY29sdW1ucyBbICdpZCcsICd2YWx1ZScsICdpZCcsICdwb3NpdGlvbicsICd2YWx1ZScgXVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBvc2l0aW9uQ29sdW1ucygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1uU2NoZW1hLm1hcCgoY29sdW1uOiBDb2x1bW5zU2NoZW1hKSA9PiBjb2x1bW4ua2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtblNjaGVtYSgpOiBDb2x1bW5zU2NoZW1hW10ge1xyXG4gICAgICAgIHJldHVybiAodGhpcy50ZW1wbGF0ZVBhcnNlci5zY2hlbWEgJiYgdGhpcy50ZW1wbGF0ZVBhcnNlci5zY2hlbWEuY29sdW1ucykgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWxlY3RlZEl0ZW1zKCk6IFRhYmxlUm93W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5maWx0ZXIoKGl0ZW06IFRhYmxlUm93W10pID0+IHRoaXMuc2VsZWN0aW9uTW9kZWwuZW50cmllc1tpdGVtW3RoaXMucHJpbWFyeUtleV1dKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGZpcnN0SXRlbSgpOiBUYWJsZVJvdyB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZVswXSkgfHwge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBsYXN0SXRlbSgpOiBUYWJsZVJvdyB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZVt0aGlzLnNvdXJjZS5sZW5ndGggLSAxXSkgfHwge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZWxlY3Rpb25Nb2RlbCgpOiBTZWxlY3Rpb25NYXAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNsaWVudFJvd0hlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLnJvd0hlaWdodCBhcyBzdHJpbmcpIHx8IFJPV19IRUlHSFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjbGllbnRDb2xXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9XaWR0aCA/IG51bGwgOiBwYXJzZUludCh0aGlzLmNvbHVtbldpZHRoIGFzIHN0cmluZykgfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtblZpcnR1YWxIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2UubGVuZ3RoICogdGhpcy5jbGllbnRSb3dIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb2x1bW5IZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaXplICogdGhpcy5jbGllbnRSb3dIZWlnaHQgKyB0aGlzLmNsaWVudFJvd0hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLmxlbmd0aCkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbWFya0RpcnR5Q2hlY2soKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbWFya0ZvckNoZWNrKCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG1hcmtUZW1wbGF0ZUNvbnRlbnRDaGVjaygpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbmdPbkluaXQoKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgcmVjaGVja1ZpZXdwb3J0Q2hlY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRhYmxlVmlld3BvcnRDaGVja2VkID0gIXRoaXMudGFibGVWaWV3cG9ydENoZWNrZWQ7XHJcbiAgICAgICAgdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmFibGVEcmFnZ2luZyhrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVkVGVtcGxhdGVzW2tleV0uZHJhZ2dhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjZXNzRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVEcmFnZ2luZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5hY2Nlc3NEcmFnZ2luZykge1xyXG4gICAgICAgICAgICB0aGlzLmFjY2Vzc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzaXplQ29sdW1uKHsgZXZlbnQsIGtleSB9OiBSZXNpemVFdmVudCwgY29sdW1uOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjaGVja1ZpZXdwb3J0Q2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZURyYWdnaW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzaXplLnJlc2l6ZShcclxuICAgICAgICAgICAgZXZlbnQgYXMgTW91c2VFdmVudCxcclxuICAgICAgICAgICAgY29sdW1uLFxyXG4gICAgICAgICAgICAod2lkdGg6IG51bWJlcikgPT4gdGhpcy5jYWxjdWxhdGVXaWR0aChrZXksIHdpZHRoKSxcclxuICAgICAgICAgICAgKCkgPT4gdGhpcy5hZnRlckNhbGN1bGF0ZVdpZHRoKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZUZpbHRlcmluZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBmb3Jnb3QgdG8gZW5hYmxlIGZpbHRlcmluZzogXFxuIDxuZ3gtdGFibGUtYnVpbGRlciBbZW5hYmxlLWZpbHRlcmluZ109XCJ0cnVlXCIgLz4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5maWx0ZXJJZFRhc2spO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklkVGFzayA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyYWJsZS5jaGFuZ2VGaWx0ZXJpbmdTdGF0dXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydEFuZEZpbHRlcigpLnRoZW4oKCkgPT4gdGhpcy5yZUNoZWNrRGVmaW5pdGlvbnMoKSk7XHJcbiAgICAgICAgICAgIH0sIE1BQ1JPX1RJTUUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzb3J0QW5kRmlsdGVyKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRnJlZXplKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcmFibGUuZmlsdGVyVmFsdWVFeGlzdCAmJiB0aGlzLmVuYWJsZUZpbHRlcmluZykge1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXI6IEZpbHRlcldvcmtlckV2ZW50ID0gYXdhaXQgdGhpcy5maWx0ZXJhYmxlLmZpbHRlcih0aGlzLm9yaWdpbmFsU291cmNlKTtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBhd2FpdCB0aGlzLnNvcnRhYmxlLnNvcnQoZmlsdGVyLnNvdXJjZSk7XHJcbiAgICAgICAgICAgIGZpbHRlci5maXJlU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zb3J0YWJsZS5lbXB0eSAmJiB0aGlzLnNvdXJjZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IGF3YWl0IHRoaXMuc29ydGFibGUuc29ydCh0aGlzLm9yaWdpbmFsU291cmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNvcnRhYmxlLmVtcHR5ICYmICF0aGlzLmZpbHRlcmFibGUuZmlsdGVyVmFsdWVFeGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IHRoaXMub3JpZ2luYWxTb3VyY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRvZ2dsZUZyZWV6ZShUSU1FX0lETEUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb3J0QnlLZXkoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvcnRhYmxlLnVwZGF0ZVNvcnRLZXkoa2V5KTtcclxuICAgICAgICB0aGlzLnNvcnRBbmRGaWx0ZXIoKS50aGVuKCgpID0+IHRoaXMucmVDaGVja0RlZmluaXRpb25zKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcm9wKHsgcHJldmlvdXNJbmRleCwgY3VycmVudEluZGV4IH06IENka0RyYWdTb3J0RXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwcmV2aW91c0tleTogc3RyaW5nID0gdGhpcy52aXNpYmxlQ29sdW1uc1twcmV2aW91c0luZGV4XTtcclxuICAgICAgICBjb25zdCBjdXJyZW50S2V5OiBzdHJpbmcgPSB0aGlzLnZpc2libGVDb2x1bW5zW2N1cnJlbnRJbmRleF07XHJcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUuZHJvcChwcmV2aW91c0tleSwgY3VycmVudEtleSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTY2hlbWEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluVmlld3BvcnQgPSB2aXNpYmxlO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRlY3RDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlRnJlZXplKHRpbWU6IG51bWJlciA9IG51bGwsIGNhbGxiYWNrOiBGbiA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzRnJvemVuVmlldyA9ICF0aGlzLmlzRnJvemVuVmlldztcclxuICAgICAgICBpZiAodGltZSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlU2NoZW1hKGRlZmF1bHRDb2x1bW5zOiBTaW1wbGVTY2hlbWFDb2x1bW5zID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVkQ29sdW1uczogU2ltcGxlU2NoZW1hQ29sdW1ucyA9IHRoaXMudGVtcGxhdGVQYXJzZXIuc2NoZW1hLmV4cG9ydENvbHVtbnMoKTtcclxuICAgICAgICBjb25zdCBjb2x1bW5zOiBTaW1wbGVTY2hlbWFDb2x1bW5zID0gZGVmYXVsdENvbHVtbnMgfHwgcmVuZGVyZWRDb2x1bW5zO1xyXG4gICAgICAgIHRoaXMudmlld0NoYW5nZXMudXBkYXRlKHsgbmFtZTogdGhpcy5uYW1lLCBjb2x1bW5zIH0pO1xyXG4gICAgICAgIHRoaXMuc2NoZW1hQ2hhbmdlcy5lbWl0KGNvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMuaWRsZURldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVDaGVja0RlZmluaXRpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyYWJsZS5kZWZpbml0aW9uID0geyAuLi50aGlzLmZpbHRlcmFibGUuZGVmaW5pdGlvbiB9O1xyXG4gICAgICAgIHRoaXMuZmlsdGVyYWJsZS5jaGFuZ2VGaWx0ZXJpbmdTdGF0dXMoKTtcclxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogcmV0dXJucyB0aGUgbnVtYmVyIG9mIGtleXMgaW4gdGhlIG1vZGVsXHJcbiAgICAgKiBAZXhhbXBsZTogPHRhYmxlLWJ1aWxkZXIgW3NvdXJjZV09W3sgaWQ6IDEsIG5hbWU6ICdoZWxsbycgfSwgLi4uXSAvPiBhIHZhbHVlIG9mIDIgd2lsbCBiZSByZXR1cm5lZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q291bnRLZXlzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZmlyc3RJdGVtKS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc2VlIFRhYmxlQnVpbGRlckFwaUltcGwjY3VzdG9tTW9kZWxDb2x1bW5zS2V5cyBmb3IgZnVydGhlciBpbmZvcm1hdGlvblxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVDdXN0b21Nb2RlbENvbHVtbnNLZXlzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRpbmcodGhpcy5rZXlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzZWUgVGFibGVCdWlsZGVyQXBpSW1wbCNtb2RlbENvbHVtbktleXMgZm9yIGZ1cnRoZXIgaW5mb3JtYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdlbmVyYXRlTW9kZWxDb2x1bW5LZXlzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRpbmcodGhpcy51dGlscy5mbGF0dGVuS2V5c0J5Um93KHRoaXMuZmlyc3RJdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGlkbGVEZXRlY3RDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5kZXRlY3RDaGFuZ2VzKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVdpZHRoKGtleTogc3RyaW5nLCB3aWR0aDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nW2tleV0gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25Nb3VzZVJlc2l6ZUNvbHVtbihrZXksIHdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFmdGVyQ2FsY3VsYXRlV2lkdGgoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0ge307XHJcbiAgICAgICAgdGhpcy5yZWNoZWNrVmlld3BvcnRDaGVja2VkKCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTY2hlbWEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VSZXNpemVDb2x1bW4oa2V5OiBzdHJpbmcsIHdpZHRoOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLm11dGF0ZUNvbHVtblNjaGVtYShrZXksIHsgd2lkdGggfSk7XHJcbiAgICAgICAgdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhjbHVkaW5nKGtleXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVLZXlzLmxlbmd0aFxyXG4gICAgICAgICAgICA/IGtleXMuZmlsdGVyKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuZXhjbHVkZUtleXMuc29tZSgoZXhjbHVkZUtleTogc3RyaW5nIHwgUmVnRXhwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhjbHVkZUtleSBpbnN0YW5jZW9mIFJlZ0V4cCA/ICEha2V5Lm1hdGNoKGV4Y2x1ZGVLZXkpIDoga2V5ID09PSBleGNsdWRlS2V5O1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA6IGtleXM7XHJcbiAgICB9XHJcbn1cclxuIl19