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
var TIME_IDLE = TableBuilderOptionsImpl.TIME_IDLE, TIME_RELOAD = TableBuilderOptionsImpl.TIME_RELOAD, FRAME_TIME = TableBuilderOptionsImpl.FRAME_TIME;
var TableBuilderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TableBuilderComponent, _super);
    function TableBuilderComponent(selection, templateParser, cd, ngZone, utils, resize, sortable, contextMenu, app, filterable, draggable, viewChanges, overloadScroll) {
        var _this = _super.call(this) || this;
        _this.selection = selection;
        _this.templateParser = templateParser;
        _this.cd = cd;
        _this.ngZone = ngZone;
        _this.utils = utils;
        _this.resize = resize;
        _this.sortable = sortable;
        _this.contextMenu = contextMenu;
        _this.app = app;
        _this.filterable = filterable;
        _this.draggable = draggable;
        _this.viewChanges = viewChanges;
        _this.overloadScroll = overloadScroll;
        _this.dirty = true;
        _this.rendering = false;
        _this.isRendered = false;
        _this.contentInit = false;
        _this.contentCheck = false;
        _this.showedCellByDefault = true;
        _this.scrollOffset = { offset: false };
        _this.recalculated = { recalculateHeight: false };
        _this.forcedRefresh = false;
        _this.destroy$ = new Subject();
        _this.checkedTaskId = null;
        return _this;
    }
    Object.defineProperty(TableBuilderComponent.prototype, "selectionEntries", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selection.selectionModel.entries;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderComponent.prototype, "sourceExists", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.source && this.source.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBuilderComponent.prototype, "viewIsDirty", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.contentCheck && !this.forcedRefresh;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?=} changes
     * @return {?}
     */
    TableBuilderComponent.checkCorrectInitialSchema = /**
     * @private
     * @param {?=} changes
     * @return {?}
     */
    function (changes) {
        if (changes === void 0) { changes = {}; }
        if (TableSimpleChanges.SCHEMA_COLUMNS in changes) {
            /** @type {?} */
            var schemaChange = changes[TableSimpleChanges.SCHEMA_COLUMNS];
            if (!schemaChange.currentValue) {
                throw new Error("You need set correct <ngx-table-builder [schema-columns]=\"[] || [..]\" /> for one time binding");
            }
        }
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.checkSourceIsNull = /**
     * @return {?}
     */
    function () {
        return !('length' in (this.source || {}));
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.recalculateHeight = /**
     * @return {?}
     */
    function () {
        this.recalculated = { recalculateHeight: true };
        this.detectChanges();
    };
    /**
     * @param {?=} changes
     * @return {?}
     */
    TableBuilderComponent.prototype.ngOnChanges = /**
     * @param {?=} changes
     * @return {?}
     */
    function (changes) {
        if (changes === void 0) { changes = {}; }
        TableBuilderComponent.checkCorrectInitialSchema(changes);
        /** @type {?} */
        var nonIdenticalStructure = this.sourceExists && this.getCountKeys() !== this.renderedCountKeys;
        this.sourceIsNull = this.checkSourceIsNull();
        this.sortable.setDefinition(this.sortTypes);
        if (nonIdenticalStructure) {
            this.preRenderTable();
        }
        else if (TableSimpleChanges.SOURCE_KEY in changes && this.isRendered) {
            this.preSortAndFilterTable(changes);
        }
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        this.contentCheck = true;
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.enableSelection) {
            this.selection.primaryKey = this.primaryKey;
            this.selection.listenShiftKey();
        }
    };
    /**
     * @param {?} offset
     * @return {?}
     */
    TableBuilderComponent.prototype.updateScrollOffset = /**
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        this.scrollOffset = { offset: offset };
        this.idleDetectChanges();
    };
    /**
     * @param {?} column
     * @param {?} visible
     * @return {?}
     */
    TableBuilderComponent.prototype.markVisibleColumn = /**
     * @param {?} column
     * @param {?} visible
     * @return {?}
     */
    function (column, visible) {
        column['visible'] = visible;
        this.detectChanges();
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.markDirtyCheck();
        this.markTemplateContentCheck();
        if (this.sourceExists) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.listenTemplateChanges();
        this.listenSelectionChanges();
        this.recheckTemplateChanges();
        this.listenScrollEvents();
    };
    /**
     * @param {?} event
     * @param {?} root
     * @return {?}
     */
    TableBuilderComponent.prototype.cdkDragMoved = /**
     * @param {?} event
     * @param {?} root
     * @return {?}
     */
    function (event, root) {
        /** @type {?} */
        var preview = event.source._dragRef['_preview'];
        /** @type {?} */
        var transform = event.source._dragRef['_preview'].style.transform || '';
        var _a = tslib_1.__read((/** @type {?} */ (transform
            .replace(/translate3d|\(|\)|px/g, '')
            .split(',')
            .map((/**
         * @param {?} val
         * @return {?}
         */
        function (val) { return parseFloat(val); })))), 3), x = _a[0], z = _a[2];
        preview.style.transform = "translate3d(" + x + "px, " + root.getBoundingClientRect().top + "px, " + z + "px)";
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.viewIsDirty) {
            this.viewForceRefresh();
        }
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.templateParser.schema = null;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.markTemplateContentCheck = /**
     * @return {?}
     */
    function () {
        this.contentInit = !!this.source || !(this.columnTemplates && this.columnTemplates.length);
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.markDirtyCheck = /**
     * @return {?}
     */
    function () {
        this.dirty = false;
    };
    /**
     * @internal
     * @description: Key table generation for internal use
     * @sample: keys - ['id', 'value'] -> { id: true, value: true }
     */
    /**
     * \@internal
     * \@description: Key table generation for internal use
     * \@sample: keys - ['id', 'value'] -> { id: true, value: true }
     * @param {?} keys
     * @return {?}
     */
    TableBuilderComponent.prototype.generateColumnsKeyMap = /**
     * \@internal
     * \@description: Key table generation for internal use
     * \@sample: keys - ['id', 'value'] -> { id: true, value: true }
     * @param {?} keys
     * @return {?}
     */
    function (keys) {
        /** @type {?} */
        var map = {};
        keys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return (map[key] = true); }));
        return map;
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.contentCheck = false;
        this.utils.macrotask((/**
         * @return {?}
         */
        function () { return _this.renderTable(); }), TIME_IDLE).then((/**
         * @return {?}
         */
        function () { return _this.idleDetectChanges(); }));
    };
    /**
     * @param {?=} __0
     * @return {?}
     */
    TableBuilderComponent.prototype.renderTable = /**
     * @param {?=} __0
     * @return {?}
     */
    function (_a) {
        var _this = this;
        var async = (_a === void 0 ? { async: true } : _a).async;
        if (this.rendering) {
            return;
        }
        this.rendering = true;
        /** @type {?} */
        var columnList = this.generateDisplayedColumns();
        /** @type {?} */
        var drawTask = this.asyncColumns && async ? this.asyncDrawColumns.bind(this) : this.syncDrawColumns.bind(this);
        if (!this.sortable.empty) {
            this.sortAndFilter().then((/**
             * @return {?}
             */
            function () { return drawTask(columnList).then((/**
             * @return {?}
             */
            function () { return _this.emitRendered(); })); }));
        }
        else {
            drawTask(columnList).then((/**
             * @return {?}
             */
            function () { return _this.emitRendered(); }));
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    TableBuilderComponent.prototype.toggleColumnVisibility = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        this.recheckViewportChecked();
        this.templateParser.toggleColumnVisibility(key);
        this.utils
            .requestAnimationFrame((/**
         * @return {?}
         */
        function () {
            _this.changeSchema();
            _this.recheckViewportChecked();
        }))
            .then((/**
         * @return {?}
         */
        function () { return _this.app.tick(); }));
    };
    /**
     * @return {?}
     */
    TableBuilderComponent.prototype.resetSchema = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.tableViewportChecked = false;
        this.schemaColumns = null;
        this.detectChanges();
        this.renderTable({ async: false });
        this.changeSchema([]);
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.tableViewportChecked = true;
                _this.detectChanges();
            }), TableBuilderOptionsImpl.TIME_IDLE);
        }));
    };
    /**
     * @private
     * @param {?=} changes
     * @return {?}
     */
    TableBuilderComponent.prototype.preSortAndFilterTable = /**
     * @private
     * @param {?=} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes === void 0) { changes = {}; }
        this.originalSource = changes[TableSimpleChanges.SOURCE_KEY].currentValue;
        this.sortAndFilter().then((/**
         * @return {?}
         */
        function () { return _this.reCheckDefinitions(); }));
    };
    /**
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.preRenderTable = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderedCountKeys = this.getCountKeys();
        this.customModelColumnsKeys = this.generateCustomModelColumnsKeys();
        this.modelColumnKeys = this.generateModelColumnKeys();
        this.originalSource = this.source;
        /** @type {?} */
        var unDirty = !this.dirty;
        this.checkFilterValues();
        if (unDirty) {
            this.markForCheck();
        }
        /** @type {?} */
        var recycleView = unDirty && this.isRendered && this.contentInit;
        if (recycleView) {
            this.renderTable();
        }
    };
    /**
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.listenScrollEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.overloadScroll.scrollStatus.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} scrolling
         * @return {?}
         */
        function (scrolling) {
            _this.isScrolling = scrolling;
            _this.detectChanges();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.checkFilterValues = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.enableFiltering) {
            this.filterable.filterType =
                this.filterable.filterType ||
                    (this.columnOptions && this.columnOptions.filterType) ||
                    TableFilterType.START_WITH;
            this.modelColumnKeys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                _this.filterable.filterTypeDefinition[key] =
                    _this.filterable.filterTypeDefinition[key] || _this.filterable.filterType;
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.recheckTemplateChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return window.setTimeout((/**
         * @return {?}
         */
        function () { return _this.app.tick(); }), TIME_RELOAD); }));
    };
    /**
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.listenSelectionChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.enableSelection) {
            this.selection.onChanges.pipe(takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.detectChanges();
                _this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    return window.requestAnimationFrame((/**
                     * @return {?}
                     */
                    function () {
                        _this.detectChanges();
                        _this.app.tick();
                    }));
                }));
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.viewForceRefresh = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.clearTimeout(_this.checkedTaskId);
            _this.checkedTaskId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.forcedRefresh = true;
                _this.markTemplateContentCheck();
                _this.render();
            }), FRAME_TIME);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.listenTemplateChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.columnTemplates) {
            this.columnTemplates.changes.pipe(takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.markForCheck();
                _this.markTemplateContentCheck();
            }));
        }
        if (this.contextMenuTemplate) {
            this.contextMenu.events.pipe(takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () { return _this.detectChanges(); }));
        }
    };
    /**
     * @description: lazy rendering of columns
     */
    /**
     * \@description: lazy rendering of columns
     * @private
     * @param {?} columnList
     * @return {?}
     */
    TableBuilderComponent.prototype.asyncDrawColumns = /**
     * \@description: lazy rendering of columns
     * @private
     * @param {?} columnList
     * @return {?}
     */
    function (columnList) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, index;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (index) {
                            var key, schema;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        key = columnList[index];
                                        schema = this_1.mergeColumnSchema(key, index);
                                        if (!schema.isVisible) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.utils.requestAnimationFrame((/**
                                             * @return {?}
                                             */
                                            function () {
                                                _this.processedColumnList && _this.processedColumnList(schema, key, true);
                                            }))];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        this_1.processedColumnList(schema, key, true);
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < columnList.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(index)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description: sync rendering of columns
     */
    /**
     * \@description: sync rendering of columns
     * @private
     * @param {?} columnList
     * @return {?}
     */
    TableBuilderComponent.prototype.syncDrawColumns = /**
     * \@description: sync rendering of columns
     * @private
     * @param {?} columnList
     * @return {?}
     */
    function (columnList) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.utils.microtask((/**
                         * @return {?}
                         */
                        function () {
                            for (var index = 0; index < columnList.length; index++) {
                                /** @type {?} */
                                var key = columnList[index];
                                /** @type {?} */
                                var schema = _this.mergeColumnSchema(key, index);
                                _this.processedColumnList(schema, columnList[index], false);
                            }
                        }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    TableBuilderComponent.prototype.getCustomColumnSchemaByIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return (/** @type {?} */ (((this.schemaColumns && this.schemaColumns[index]) || ((/** @type {?} */ ({}))))));
    };
    /**
     * @description - it is necessary to combine the templates given from the server and default
     * @param key - column schema from rendered templates map
     * @param index - column position
     */
    /**
     * \@description - it is necessary to combine the templates given from the server and default
     * @private
     * @param {?} key - column schema from rendered templates map
     * @param {?} index - column position
     * @return {?}
     */
    TableBuilderComponent.prototype.mergeColumnSchema = /**
     * \@description - it is necessary to combine the templates given from the server and default
     * @private
     * @param {?} key - column schema from rendered templates map
     * @param {?} index - column position
     * @return {?}
     */
    function (key, index) {
        /** @type {?} */
        var customColumn = this.getCustomColumnSchemaByIndex(index);
        if (!this.templateParser.compiledTemplates[key]) {
            /** @type {?} */
            var column = new NgxColumnComponent().withKey(key);
            this.templateParser.compileColumnMetadata(column);
        }
        /** @type {?} */
        var defaultColumn = this.templateParser.compiledTemplates[key];
        if (customColumn.key === defaultColumn.key) {
            this.templateParser.compiledTemplates[key] = (/** @type {?} */ (tslib_1.__assign({}, defaultColumn, customColumn)));
        }
        return this.templateParser.compiledTemplates[key];
    };
    /**
     * @description: column meta information processing
     * @param schema - column schema
     * @param key - column name
     * @param async - whether to draw a column asynchronously
     */
    /**
     * \@description: column meta information processing
     * @private
     * @param {?} schema - column schema
     * @param {?} key - column name
     * @param {?} async - whether to draw a column asynchronously
     * @return {?}
     */
    TableBuilderComponent.prototype.processedColumnList = /**
     * \@description: column meta information processing
     * @private
     * @param {?} schema - column schema
     * @param {?} key - column name
     * @param {?} async - whether to draw a column asynchronously
     * @return {?}
     */
    function (schema, key, async) {
        if (this.templateParser.schema) {
            this.templateParser.schema.columns.push(this.templateParser.compiledTemplates[key]);
            if (async) {
                this.idleDetectChanges();
            }
        }
    };
    /**
     * @description: notification that the table has been rendered
     * @see TableBuilderComponent#isRendered
     */
    /**
     * \@description: notification that the table has been rendered
     * @see TableBuilderComponent#isRendered
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.emitRendered = /**
     * \@description: notification that the table has been rendered
     * @see TableBuilderComponent#isRendered
     * @private
     * @return {?}
     */
    function () {
        this.isRendered = true;
        this.rendering = false;
        this.afterRendered.emit(this.isRendered);
        this.recalculateHeight();
    };
    /**
     * @description: parsing templates and input parameters (keys, schemaColumns) for the number of columns
     */
    /**
     * \@description: parsing templates and input parameters (keys, schemaColumns) for the number of columns
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.generateDisplayedColumns = /**
     * \@description: parsing templates and input parameters (keys, schemaColumns) for the number of columns
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var generatedList = [];
        this.templateParser.initialSchema(this.columnOptions);
        var _a = this.parseTemplateKeys(), simpleRenderedKeys = _a.simpleRenderedKeys, allRenderedKeys = _a.allRenderedKeys;
        if (this.schemaColumns && this.schemaColumns.length) {
            generatedList = this.schemaColumns.map((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.key; }));
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
    };
    /**
     * @description: this method returns the keys by which to draw table columns
     * <allowedKeyMap> - possible keys from the model, this must be checked,
     * because users can draw the wrong keys in the template (ngx-column key=invalid)
     */
    /**
     * \@description: this method returns the keys by which to draw table columns
     * <allowedKeyMap> - possible keys from the model, this must be checked,
     * because users can draw the wrong keys in the template (ngx-column key=invalid)
     * @private
     * @return {?}
     */
    TableBuilderComponent.prototype.parseTemplateKeys = /**
     * \@description: this method returns the keys by which to draw table columns
     * <allowedKeyMap> - possible keys from the model, this must be checked,
     * because users can draw the wrong keys in the template (ngx-column key=invalid)
     * @private
     * @return {?}
     */
    function () {
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
    };
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
    TableBuilderComponent.ctorParameters = function () { return [
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
    ]; };
    TableBuilderComponent.propDecorators = {
        headerRef: [{ type: ViewChild, args: ['header', { static: false },] }],
        footerRef: [{ type: ViewChild, args: ['footer', { static: false },] }]
    };
    return TableBuilderComponent;
}(TableBuilderApiImpl));
export { TableBuilderComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLWJ1aWxkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUlILGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQU1OLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQU1ILGtCQUFrQixFQUVyQixNQUFNLHFDQUFxQyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxN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QjtnQkFGaEIscUJBQXFCO2dCQTVCMUIsaUJBQWlCO2dCQUdqQixNQUFNO2dCQTRCRCxZQUFZO2dCQUNaLGdCQUFnQjtnQkFIaEIsZUFBZTtnQkFLZixrQkFBa0I7Z0JBcEN2QixjQUFjO2dCQXFDVCxpQkFBaUI7Z0JBRWpCLGdCQUFnQjtnQkFDaEIsMEJBQTBCO2dCQUMxQixxQkFBcUI7Ozs0QkFpQ3pCLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzRCQUVyQyxTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUE0WjFDLDRCQUFDO0NBQUEsQUExYkQsQ0FrQjJDLG1CQUFtQixHQXdhN0Q7U0F4YVkscUJBQXFCOzs7SUFFOUIsc0NBQTZCOztJQUM3QiwwQ0FBa0M7O0lBQ2xDLDJDQUFtQzs7SUFDbkMsNENBQW9DOztJQUNwQyw2Q0FBcUM7O0lBQ3JDLG9EQUEyQzs7SUFDM0MsNkNBQTREOztJQUM1RCw2Q0FBdUU7O0lBQ3ZFLDBDQUM2Qzs7SUFDN0MsMENBQzZDOztJQUM3Qyw2Q0FBNkI7O0lBQzdCLDRDQUE0Qjs7Ozs7SUFDNUIsOENBQXVDOzs7OztJQUN2Qyx5Q0FBcUU7Ozs7O0lBQ3JFLDhDQUFxQzs7SUFHakMsMENBQTJDOztJQUMzQywrQ0FBcUQ7O0lBQ3JELG1DQUFxQzs7SUFDckMsdUNBQThCOztJQUM5QixzQ0FBbUM7O0lBQ25DLHVDQUF3Qzs7SUFDeEMseUNBQXlDOztJQUN6Qyw0Q0FBK0M7Ozs7O0lBQy9DLG9DQUFzQzs7SUFDdEMsMkNBQTZDOzs7OztJQUM3QywwQ0FBOEM7Ozs7O0lBQzlDLDRDQUEwRDs7Ozs7SUFDMUQsK0NBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBBZnRlclZpZXdDaGVja2VkLFxyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBOZ1pvbmUsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBTaW1wbGVDaGFuZ2UsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgQW55LFxyXG4gICAgRm4sXHJcbiAgICBLZXlNYXAsXHJcbiAgICBSZWNhbGN1bGF0ZWRTdGF0dXMsXHJcbiAgICBTY3JvbGxPZmZzZXRTdGF0dXMsXHJcbiAgICBUYWJsZVNpbXBsZUNoYW5nZXMsXHJcbiAgICBUZW1wbGF0ZUtleXNcclxufSBmcm9tICcuL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IFRhYmxlQnVpbGRlckFwaUltcGwgfSBmcm9tICcuL3RhYmxlLWJ1aWxkZXIuYXBpJztcclxuaW1wb3J0IHsgTkdYX0FOSU1BVElPTiB9IGZyb20gJy4vYW5pbWF0aW9ucy9mYWRlLmFuaW1hdGlvbic7XHJcbmltcG9ydCB7IENvbHVtbnNTY2hlbWEgfSBmcm9tICcuL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IE5neENvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtY29sdW1uL25neC1jb2x1bW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGVtcGxhdGVQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90ZW1wbGF0ZS1wYXJzZXIvdGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0YWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3NvcnRhYmxlL3NvcnRhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNpemFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9yZXNpemVyL3Jlc2l6YWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuc2VydmljZSc7XHJcbmltcG9ydCB7IEZpbHRlcmFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhYmxlRmlsdGVyVHlwZSB9IGZyb20gJy4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERyYWdnYWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RyYWdnYWJsZS9kcmFnZ2FibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFRhYmxlVmlld0NoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90YWJsZS12aWV3LWNoYW5nZXMvbmd4LXRhYmxlLXZpZXctY2hhbmdlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3ZlcmxvYWRTY3JvbGxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9vdmVybG9hZC1zY3JvbGwvb3ZlcmxvYWQtc2Nyb2xsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDZGtEcmFnU3RhcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuXHJcbmNvbnN0IHsgVElNRV9JRExFLCBUSU1FX1JFTE9BRCwgRlJBTUVfVElNRSB9OiB0eXBlb2YgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgPSBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtdGFibGUtYnVpbGRlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtYnVpbGRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi90YWJsZS1idWlsZGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFRlbXBsYXRlUGFyc2VyU2VydmljZSxcclxuICAgICAgICBTb3J0YWJsZVNlcnZpY2UsXHJcbiAgICAgICAgU2VsZWN0aW9uU2VydmljZSxcclxuICAgICAgICBSZXNpemFibGVTZXJ2aWNlLFxyXG4gICAgICAgIENvbnRleHRNZW51U2VydmljZSxcclxuICAgICAgICBGaWx0ZXJhYmxlU2VydmljZSxcclxuICAgICAgICBEcmFnZ2FibGVTZXJ2aWNlLFxyXG4gICAgICAgIE92ZXJsb2FkU2Nyb2xsU2VydmljZVxyXG4gICAgXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBhbmltYXRpb25zOiBbTkdYX0FOSU1BVElPTl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlQnVpbGRlckNvbXBvbmVudCBleHRlbmRzIFRhYmxlQnVpbGRlckFwaUltcGxcclxuICAgIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XHJcbiAgICBwdWJsaWMgZGlydHk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHJlbmRlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzUmVuZGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBjb250ZW50SW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGNvbnRlbnRDaGVjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHNob3dlZENlbGxCeURlZmF1bHQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHNjcm9sbE9mZnNldDogU2Nyb2xsT2Zmc2V0U3RhdHVzID0geyBvZmZzZXQ6IGZhbHNlIH07XHJcbiAgICBwdWJsaWMgcmVjYWxjdWxhdGVkOiBSZWNhbGN1bGF0ZWRTdGF0dXMgPSB7IHJlY2FsY3VsYXRlSGVpZ2h0OiBmYWxzZSB9O1xyXG4gICAgQFZpZXdDaGlsZCgnaGVhZGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgaGVhZGVyUmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Zvb3RlcicsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGZvb3RlclJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XHJcbiAgICBwdWJsaWMgc291cmNlSXNOdWxsOiBib29sZWFuO1xyXG4gICAgcHVibGljIGlzU2Nyb2xsaW5nOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBmb3JjZWRSZWZyZXNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuICAgIHByaXZhdGUgY2hlY2tlZFRhc2tJZDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhcnNlcjogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB1dGlsczogVXRpbHNTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSByZXNpemU6IFJlc2l6YWJsZVNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHNvcnRhYmxlOiBTb3J0YWJsZVNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbnRleHRNZW51OiBDb250ZXh0TWVudVNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGFwcDogQXBwbGljYXRpb25SZWYsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZpbHRlcmFibGU6IEZpbHRlcmFibGVTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBkcmFnZ2FibGU6IERyYWdnYWJsZVNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHZpZXdDaGFuZ2VzOiBOZ3hUYWJsZVZpZXdDaGFuZ2VzU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3ZlcmxvYWRTY3JvbGw6IE92ZXJsb2FkU2Nyb2xsU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGlvbkVudHJpZXMoKTogS2V5TWFwPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwuZW50cmllcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNvdXJjZUV4aXN0cygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHZpZXdJc0RpcnR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRDaGVjayAmJiAhdGhpcy5mb3JjZWRSZWZyZXNoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNoZWNrQ29ycmVjdEluaXRpYWxTY2hlbWEoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyA9IHt9KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFRhYmxlU2ltcGxlQ2hhbmdlcy5TQ0hFTUFfQ09MVU1OUyBpbiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYUNoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1tUYWJsZVNpbXBsZUNoYW5nZXMuU0NIRU1BX0NPTFVNTlNdO1xyXG4gICAgICAgICAgICBpZiAoIXNjaGVtYUNoYW5nZS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBgWW91IG5lZWQgc2V0IGNvcnJlY3QgPG5neC10YWJsZS1idWlsZGVyIFtzY2hlbWEtY29sdW1uc109XCJbXSB8fCBbLi5dXCIgLz4gZm9yIG9uZSB0aW1lIGJpbmRpbmdgXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1NvdXJjZUlzTnVsbCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISgnbGVuZ3RoJyBpbiAodGhpcy5zb3VyY2UgfHwge30pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjYWxjdWxhdGVIZWlnaHQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZWQgPSB7IHJlY2FsY3VsYXRlSGVpZ2h0OiB0cnVlIH07XHJcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgPSB7fSk6IHZvaWQge1xyXG4gICAgICAgIFRhYmxlQnVpbGRlckNvbXBvbmVudC5jaGVja0NvcnJlY3RJbml0aWFsU2NoZW1hKGNoYW5nZXMpO1xyXG5cclxuICAgICAgICBjb25zdCBub25JZGVudGljYWxTdHJ1Y3R1cmU6IGJvb2xlYW4gPSB0aGlzLnNvdXJjZUV4aXN0cyAmJiB0aGlzLmdldENvdW50S2V5cygpICE9PSB0aGlzLnJlbmRlcmVkQ291bnRLZXlzO1xyXG4gICAgICAgIHRoaXMuc291cmNlSXNOdWxsID0gdGhpcy5jaGVja1NvdXJjZUlzTnVsbCgpO1xyXG4gICAgICAgIHRoaXMuc29ydGFibGUuc2V0RGVmaW5pdGlvbih0aGlzLnNvcnRUeXBlcyk7XHJcblxyXG4gICAgICAgIGlmIChub25JZGVudGljYWxTdHJ1Y3R1cmUpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVSZW5kZXJUYWJsZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoVGFibGVTaW1wbGVDaGFuZ2VzLlNPVVJDRV9LRVkgaW4gY2hhbmdlcyAmJiB0aGlzLmlzUmVuZGVyZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVTb3J0QW5kRmlsdGVyVGFibGUoY2hhbmdlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Q2hlY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucHJpbWFyeUtleSA9IHRoaXMucHJpbWFyeUtleTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ubGlzdGVuU2hpZnRLZXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNjcm9sbE9mZnNldChvZmZzZXQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbE9mZnNldCA9IHsgb2Zmc2V0IH07XHJcbiAgICAgICAgdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXJrVmlzaWJsZUNvbHVtbihjb2x1bW46IEhUTUxEaXZFbGVtZW50LCB2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29sdW1uWyd2aXNpYmxlJ10gPSB2aXNpYmxlO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXJrRGlydHlDaGVjaygpO1xyXG4gICAgICAgIHRoaXMubWFya1RlbXBsYXRlQ29udGVudENoZWNrKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZUV4aXN0cykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVuVGVtcGxhdGVDaGFuZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5TZWxlY3Rpb25DaGFuZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5yZWNoZWNrVGVtcGxhdGVDaGFuZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5TY3JvbGxFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2RrRHJhZ01vdmVkKGV2ZW50OiBDZGtEcmFnU3RhcnQsIHJvb3Q6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcHJldmlldzogSFRNTEVsZW1lbnQgPSBldmVudC5zb3VyY2UuX2RyYWdSZWZbJ19wcmV2aWV3J107XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtOiBzdHJpbmcgPSBldmVudC5zb3VyY2UuX2RyYWdSZWZbJ19wcmV2aWV3J10uc3R5bGUudHJhbnNmb3JtIHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IFt4LCAsIHpdOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gPSB0cmFuc2Zvcm1cclxuICAgICAgICAgICAgLnJlcGxhY2UoL3RyYW5zbGF0ZTNkfFxcKHxcXCl8cHgvZywgJycpXHJcbiAgICAgICAgICAgIC5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgIC5tYXAoKHZhbDogc3RyaW5nKSA9PiBwYXJzZUZsb2F0KHZhbCkpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuXHJcbiAgICAgICAgcHJldmlldy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt4fXB4LCAke3Jvb3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wfXB4LCAke3p9cHgpYDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXdJc0RpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0ZvcmNlUmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5zY2hlbWEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSQubmV4dCh0cnVlKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcmtUZW1wbGF0ZUNvbnRlbnRDaGVjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnRJbml0ID0gISF0aGlzLnNvdXJjZSB8fCAhKHRoaXMuY29sdW1uVGVtcGxhdGVzICYmIHRoaXMuY29sdW1uVGVtcGxhdGVzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcmtEaXJ0eUNoZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICogQGRlc2NyaXB0aW9uOiBLZXkgdGFibGUgZ2VuZXJhdGlvbiBmb3IgaW50ZXJuYWwgdXNlXHJcbiAgICAgKiBAc2FtcGxlOiBrZXlzIC0gWydpZCcsICd2YWx1ZSddIC0+IHsgaWQ6IHRydWUsIHZhbHVlOiB0cnVlIH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdlbmVyYXRlQ29sdW1uc0tleU1hcChrZXlzOiBzdHJpbmdbXSk6IEtleU1hcDxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgbWFwOiBLZXlNYXA8Ym9vbGVhbj4gPSB7fTtcclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiAobWFwW2tleV0gPSB0cnVlKSk7XHJcbiAgICAgICAgcmV0dXJuIG1hcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGVudENoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51dGlscy5tYWNyb3Rhc2soKCkgPT4gdGhpcy5yZW5kZXJUYWJsZSgpLCBUSU1FX0lETEUpLnRoZW4oKCkgPT4gdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyVGFibGUoeyBhc3luYyB9OiB7IGFzeW5jOiBib29sZWFuIH0gPSB7IGFzeW5jOiB0cnVlIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZW5kZXJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkxpc3Q6IHN0cmluZ1tdID0gdGhpcy5nZW5lcmF0ZURpc3BsYXllZENvbHVtbnMoKTtcclxuICAgICAgICBjb25zdCBkcmF3VGFzazogRm48c3RyaW5nW10sIFByb21pc2U8dm9pZD4+ID1cclxuICAgICAgICAgICAgdGhpcy5hc3luY0NvbHVtbnMgJiYgYXN5bmMgPyB0aGlzLmFzeW5jRHJhd0NvbHVtbnMuYmluZCh0aGlzKSA6IHRoaXMuc3luY0RyYXdDb2x1bW5zLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5zb3J0YWJsZS5lbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRBbmRGaWx0ZXIoKS50aGVuKCgpID0+IGRyYXdUYXNrKGNvbHVtbkxpc3QpLnRoZW4oKCkgPT4gdGhpcy5lbWl0UmVuZGVyZWQoKSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdUYXNrKGNvbHVtbkxpc3QpLnRoZW4oKCkgPT4gdGhpcy5lbWl0UmVuZGVyZWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVDb2x1bW5WaXNpYmlsaXR5KGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNoZWNrVmlld3BvcnRDaGVja2VkKCk7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci50b2dnbGVDb2x1bW5WaXNpYmlsaXR5KGtleSk7XHJcbiAgICAgICAgdGhpcy51dGlsc1xyXG4gICAgICAgICAgICAucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NoZW1hKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2hlY2tWaWV3cG9ydENoZWNrZWQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5hcHAudGljaygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRTY2hlbWEoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YWJsZVZpZXdwb3J0Q2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZW1hQ29sdW1ucyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyVGFibGUoeyBhc3luYzogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTY2hlbWEoW10pO1xyXG5cclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFibGVWaWV3cG9ydENoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH0sIFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsLlRJTUVfSURMRSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVTb3J0QW5kRmlsdGVyVGFibGUoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyA9IHt9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZSA9IGNoYW5nZXNbVGFibGVTaW1wbGVDaGFuZ2VzLlNPVVJDRV9LRVldLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICB0aGlzLnNvcnRBbmRGaWx0ZXIoKS50aGVuKCgpID0+IHRoaXMucmVDaGVja0RlZmluaXRpb25zKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlUmVuZGVyVGFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlZENvdW50S2V5cyA9IHRoaXMuZ2V0Q291bnRLZXlzKCk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21Nb2RlbENvbHVtbnNLZXlzID0gdGhpcy5nZW5lcmF0ZUN1c3RvbU1vZGVsQ29sdW1uc0tleXMoKTtcclxuICAgICAgICB0aGlzLm1vZGVsQ29sdW1uS2V5cyA9IHRoaXMuZ2VuZXJhdGVNb2RlbENvbHVtbktleXMoKTtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsU291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICAgICAgY29uc3QgdW5EaXJ0eTogYm9vbGVhbiA9ICF0aGlzLmRpcnR5O1xyXG5cclxuICAgICAgICB0aGlzLmNoZWNrRmlsdGVyVmFsdWVzKCk7XHJcblxyXG4gICAgICAgIGlmICh1bkRpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZWN5Y2xlVmlldzogYm9vbGVhbiA9IHVuRGlydHkgJiYgdGhpcy5pc1JlbmRlcmVkICYmIHRoaXMuY29udGVudEluaXQ7XHJcblxyXG4gICAgICAgIGlmIChyZWN5Y2xlVmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuU2Nyb2xsRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3ZlcmxvYWRTY3JvbGwuc2Nyb2xsU3RhdHVzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKHNjcm9sbGluZzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzU2Nyb2xsaW5nID0gc2Nyb2xsaW5nO1xyXG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrRmlsdGVyVmFsdWVzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZUZpbHRlcmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcmFibGUuZmlsdGVyVHlwZSA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmFibGUuZmlsdGVyVHlwZSB8fFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuY29sdW1uT3B0aW9ucyAmJiB0aGlzLmNvbHVtbk9wdGlvbnMuZmlsdGVyVHlwZSkgfHxcclxuICAgICAgICAgICAgICAgIFRhYmxlRmlsdGVyVHlwZS5TVEFSVF9XSVRIO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2RlbENvbHVtbktleXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyYWJsZS5maWx0ZXJUeXBlRGVmaW5pdGlvbltrZXldID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmFibGUuZmlsdGVyVHlwZURlZmluaXRpb25ba2V5XSB8fCB0aGlzLmZpbHRlcmFibGUuZmlsdGVyVHlwZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjaGVja1RlbXBsYXRlQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLmFwcC50aWNrKCksIFRJTUVfUkVMT0FEKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsaXN0ZW5TZWxlY3Rpb25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5vbkNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcC50aWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZpZXdGb3JjZVJlZnJlc2goKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuY2hlY2tlZFRhc2tJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZFRhc2tJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VkUmVmcmVzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtUZW1wbGF0ZUNvbnRlbnRDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgfSwgRlJBTUVfVElNRSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsaXN0ZW5UZW1wbGF0ZUNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uVGVtcGxhdGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sdW1uVGVtcGxhdGVzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrVGVtcGxhdGVDb250ZW50Q2hlY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudVRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuZXZlbnRzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRlY3RDaGFuZ2VzKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogbGF6eSByZW5kZXJpbmcgb2YgY29sdW1uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFzeW5jRHJhd0NvbHVtbnMoY29sdW1uTGlzdDogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleDogbnVtYmVyID0gMDsgaW5kZXggPCBjb2x1bW5MaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXk6IHN0cmluZyA9IGNvbHVtbkxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCBzY2hlbWE6IENvbHVtbnNTY2hlbWEgPSB0aGlzLm1lcmdlQ29sdW1uU2NoZW1hKGtleSwgaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNjaGVtYS5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudXRpbHMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NlZENvbHVtbkxpc3QgJiYgdGhpcy5wcm9jZXNzZWRDb2x1bW5MaXN0KHNjaGVtYSwga2V5LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRDb2x1bW5MaXN0KHNjaGVtYSwga2V5LCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogc3luYyByZW5kZXJpbmcgb2YgY29sdW1uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHN5bmNEcmF3Q29sdW1ucyhjb2x1bW5MaXN0OiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMudXRpbHMubWljcm90YXNrKCgpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXg6IG51bWJlciA9IDA7IGluZGV4IDwgY29sdW1uTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gY29sdW1uTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWE6IENvbHVtbnNTY2hlbWEgPSB0aGlzLm1lcmdlQ29sdW1uU2NoZW1hKGtleSwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRDb2x1bW5MaXN0KHNjaGVtYSwgY29sdW1uTGlzdFtpbmRleF0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q3VzdG9tQ29sdW1uU2NoZW1hQnlJbmRleChpbmRleDogbnVtYmVyKTogUGFydGlhbDxDb2x1bW5zU2NoZW1hPiB7XHJcbiAgICAgICAgcmV0dXJuICgodGhpcy5zY2hlbWFDb2x1bW5zICYmIHRoaXMuc2NoZW1hQ29sdW1uc1tpbmRleF0pIHx8ICh7fSBhcyBBbnkpKSBhcyBQYXJ0aWFsPENvbHVtbnNTY2hlbWE+O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIC0gaXQgaXMgbmVjZXNzYXJ5IHRvIGNvbWJpbmUgdGhlIHRlbXBsYXRlcyBnaXZlbiBmcm9tIHRoZSBzZXJ2ZXIgYW5kIGRlZmF1bHRcclxuICAgICAqIEBwYXJhbSBrZXkgLSBjb2x1bW4gc2NoZW1hIGZyb20gcmVuZGVyZWQgdGVtcGxhdGVzIG1hcFxyXG4gICAgICogQHBhcmFtIGluZGV4IC0gY29sdW1uIHBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWVyZ2VDb2x1bW5TY2hlbWEoa2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBDb2x1bW5zU2NoZW1hIHtcclxuICAgICAgICBjb25zdCBjdXN0b21Db2x1bW46IFBhcnRpYWw8Q29sdW1uc1NjaGVtYT4gPSB0aGlzLmdldEN1c3RvbUNvbHVtblNjaGVtYUJ5SW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb2x1bW46IE5neENvbHVtbkNvbXBvbmVudCA9IG5ldyBOZ3hDb2x1bW5Db21wb25lbnQoKS53aXRoS2V5KGtleSk7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZUNvbHVtbk1ldGFkYXRhKGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWZhdWx0Q29sdW1uOiBDb2x1bW5zU2NoZW1hID0gdGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlZFRlbXBsYXRlc1trZXldO1xyXG5cclxuICAgICAgICBpZiAoY3VzdG9tQ29sdW1uLmtleSA9PT0gZGVmYXVsdENvbHVtbi5rZXkpIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlZFRlbXBsYXRlc1trZXldID0geyAuLi5kZWZhdWx0Q29sdW1uLCAuLi5jdXN0b21Db2x1bW4gfSBhcyBDb2x1bW5zU2NoZW1hO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogY29sdW1uIG1ldGEgaW5mb3JtYXRpb24gcHJvY2Vzc2luZ1xyXG4gICAgICogQHBhcmFtIHNjaGVtYSAtIGNvbHVtbiBzY2hlbWFcclxuICAgICAqIEBwYXJhbSBrZXkgLSBjb2x1bW4gbmFtZVxyXG4gICAgICogQHBhcmFtIGFzeW5jIC0gd2hldGhlciB0byBkcmF3IGEgY29sdW1uIGFzeW5jaHJvbm91c2x5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJvY2Vzc2VkQ29sdW1uTGlzdChzY2hlbWE6IENvbHVtbnNTY2hlbWEsIGtleTogc3RyaW5nLCBhc3luYzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlUGFyc2VyLnNjaGVtYSkge1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLnNjaGVtYS5jb2x1bW5zLnB1c2godGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlZFRlbXBsYXRlc1trZXldKTtcclxuICAgICAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGVEZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IG5vdGlmaWNhdGlvbiB0aGF0IHRoZSB0YWJsZSBoYXMgYmVlbiByZW5kZXJlZFxyXG4gICAgICogQHNlZSBUYWJsZUJ1aWxkZXJDb21wb25lbnQjaXNSZW5kZXJlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVtaXRSZW5kZXJlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzUmVuZGVyZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZnRlclJlbmRlcmVkLmVtaXQodGhpcy5pc1JlbmRlcmVkKTtcclxuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlSGVpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHBhcnNpbmcgdGVtcGxhdGVzIGFuZCBpbnB1dCBwYXJhbWV0ZXJzIChrZXlzLCBzY2hlbWFDb2x1bW5zKSBmb3IgdGhlIG51bWJlciBvZiBjb2x1bW5zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVEaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgZ2VuZXJhdGVkTGlzdDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLmluaXRpYWxTY2hlbWEodGhpcy5jb2x1bW5PcHRpb25zKTtcclxuICAgICAgICBjb25zdCB7IHNpbXBsZVJlbmRlcmVkS2V5cywgYWxsUmVuZGVyZWRLZXlzIH06IFRlbXBsYXRlS2V5cyA9IHRoaXMucGFyc2VUZW1wbGF0ZUtleXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2NoZW1hQ29sdW1ucyAmJiB0aGlzLnNjaGVtYUNvbHVtbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlZExpc3QgPSB0aGlzLnNjaGVtYUNvbHVtbnMubWFwKChjb2x1bW46IENvbHVtbnNTY2hlbWEpID0+IGNvbHVtbi5rZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5rZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZWRMaXN0ID0gdGhpcy5jdXN0b21Nb2RlbENvbHVtbnNLZXlzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2ltcGxlUmVuZGVyZWRLZXlzLnNpemUpIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVkTGlzdCA9IGFsbFJlbmRlcmVkS2V5cztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZWRMaXN0ID0gdGhpcy5tb2RlbENvbHVtbktleXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogdGhpcyBtZXRob2QgcmV0dXJucyB0aGUga2V5cyBieSB3aGljaCB0byBkcmF3IHRhYmxlIGNvbHVtbnNcclxuICAgICAqIDxhbGxvd2VkS2V5TWFwPiAtIHBvc3NpYmxlIGtleXMgZnJvbSB0aGUgbW9kZWwsIHRoaXMgbXVzdCBiZSBjaGVja2VkLFxyXG4gICAgICogYmVjYXVzZSB1c2VycyBjYW4gZHJhdyB0aGUgd3Jvbmcga2V5cyBpbiB0aGUgdGVtcGxhdGUgKG5neC1jb2x1bW4ga2V5PWludmFsaWQpXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2VUZW1wbGF0ZUtleXMoKTogVGVtcGxhdGVLZXlzIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLmtleU1hcCA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zS2V5TWFwKHRoaXMua2V5cy5sZW5ndGggPyB0aGlzLmtleXMgOiB0aGlzLmdldE1vZGVsS2V5cygpKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5hbGxvd2VkS2V5TWFwID0gdGhpcy5rZXlzLmxlbmd0aFxyXG4gICAgICAgICAgICA/IHRoaXMuZ2VuZXJhdGVDb2x1bW5zS2V5TWFwKHRoaXMuY3VzdG9tTW9kZWxDb2x1bW5zS2V5cylcclxuICAgICAgICAgICAgOiB0aGlzLmdlbmVyYXRlQ29sdW1uc0tleU1hcCh0aGlzLm1vZGVsQ29sdW1uS2V5cyk7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGVQYXJzZXIucGFyc2UodGhpcy5jb2x1bW5UZW1wbGF0ZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxSZW5kZXJlZEtleXM6IEFycmF5LmZyb20odGhpcy50ZW1wbGF0ZVBhcnNlci5mdWxsVGVtcGxhdGVLZXlzKSxcclxuICAgICAgICAgICAgb3ZlcnJpZGluZ1JlbmRlcmVkS2V5czogdGhpcy50ZW1wbGF0ZVBhcnNlci5vdmVycmlkZVRlbXBsYXRlS2V5cyxcclxuICAgICAgICAgICAgc2ltcGxlUmVuZGVyZWRLZXlzOiB0aGlzLnRlbXBsYXRlUGFyc2VyLnRlbXBsYXRlS2V5c1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl19