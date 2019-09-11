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
        var _this = this;
        if (changes === void 0) { changes = {}; }
        /** @type {?} */
        var nonIdenticalStructure = this.sourceExists && this.getCountKeys() !== this.renderedCountKeys;
        this.sourceIsNull = this.checkSourceIsNull();
        this.sortable.setDefinition(this.sortTypes);
        if (nonIdenticalStructure) {
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
        }
        else if (TableSimpleChanges.SOURCE_KEY in changes && this.isRendered) {
            this.originalSource = changes[TableSimpleChanges.SOURCE_KEY].currentValue;
            this.sortAndFilter().then((/**
             * @return {?}
             */
            function () { return _this.reCheckDefinitions(); }));
        }
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
        this.templateParser.schema.columns.push(this.templateParser.compiledTemplates[key]);
        if (async) {
            this.idleDetectChanges();
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
        /** @type {?} */
        var allowedKeyMap = this.keys.length
            ? this.generateColumnsKeyMap(this.customModelColumnsKeys)
            : this.generateColumnsKeyMap(this.modelColumnKeys);
        this.templateParser.parse(allowedKeyMap, this.columnTemplates);
        return {
            allRenderedKeys: Array.from(this.templateParser.fullTemplateKeys),
            overridingRenderedKeys: this.templateParser.overrideTemplateKeys,
            simpleRenderedKeys: this.templateParser.templateKeys
        };
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3RhYmxlLWJ1aWxkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUlILGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQU1OLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQU1ILGtCQUFrQixFQUVyQixNQUFNLHFDQUFxQyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxN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LGFBQWEsQ0FBQzs7aUJBQzlCOzs7O2dCQTlCUSxnQkFBZ0I7Z0JBRmhCLHFCQUFxQjtnQkE1QjFCLGlCQUFpQjtnQkFHakIsTUFBTTtnQkE0QkQsWUFBWTtnQkFDWixnQkFBZ0I7Z0JBSGhCLGVBQWU7Z0JBS2Ysa0JBQWtCO2dCQXBDdkIsY0FBYztnQkFxQ1QsaUJBQWlCO2dCQUVqQixnQkFBZ0I7Z0JBQ2hCLDBCQUEwQjtnQkFDMUIscUJBQXFCOzs7NEJBZ0N6QixTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs0QkFFckMsU0FBUyxTQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0lBaVkxQyw0QkFBQztDQUFBLEFBL1pELENBa0IyQyxtQkFBbUIsR0E2WTdEO1NBN1lZLHFCQUFxQjs7O0lBRTlCLHNDQUE2Qjs7SUFDN0IsMENBQWtDOztJQUNsQywyQ0FBbUM7O0lBQ25DLDRDQUFvQzs7SUFDcEMsNkNBQXFDOztJQUNyQyxvREFBMkM7O0lBQzNDLDZDQUE0RDs7SUFDNUQsNkNBQXVFOztJQUN2RSwwQ0FDNkM7O0lBQzdDLDBDQUM2Qzs7SUFDN0MsNkNBQTZCOztJQUM3Qiw0Q0FBNEI7Ozs7O0lBQzVCLDhDQUF1Qzs7Ozs7SUFDdkMseUNBQXFFOzs7OztJQUNyRSw4Q0FBcUM7O0lBR2pDLDBDQUEyQzs7SUFDM0MsK0NBQXFEOztJQUNyRCxtQ0FBcUM7O0lBQ3JDLHVDQUE4Qjs7SUFDOUIsc0NBQW1DOztJQUNuQyx1Q0FBd0M7O0lBQ3hDLHlDQUF5Qzs7SUFDekMsNENBQStDOzs7OztJQUMvQyxvQ0FBc0M7O0lBQ3RDLDJDQUE2Qzs7Ozs7SUFDN0MsMENBQThDOzs7OztJQUM5Qyw0Q0FBMEQ7Ozs7O0lBQzFELCtDQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcclxuICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICBBcHBsaWNhdGlvblJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgTmdab25lLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlLFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFueSxcclxuICAgIEZuLFxyXG4gICAgS2V5TWFwLFxyXG4gICAgUmVjYWxjdWxhdGVkU3RhdHVzLFxyXG4gICAgU2Nyb2xsT2Zmc2V0U3RhdHVzLFxyXG4gICAgVGFibGVTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVGVtcGxhdGVLZXlzXHJcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJBcGlJbXBsIH0gZnJvbSAnLi90YWJsZS1idWlsZGVyLmFwaSc7XHJcbmltcG9ydCB7IE5HWF9BTklNQVRJT04gfSBmcm9tICcuL2FuaW1hdGlvbnMvZmFkZS5hbmltYXRpb24nO1xyXG5pbXBvcnQgeyBDb2x1bW5zU2NoZW1hIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBOZ3hDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LWNvbHVtbi9uZ3gtY29sdW1uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlUGFyc2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGVtcGxhdGUtcGFyc2VyL3RlbXBsYXRlLXBhcnNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29ydGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zb3J0YWJsZS9zb3J0YWJsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzaXphYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcmVzaXplci9yZXNpemFibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsIH0gZnJvbSAnLi9jb25maWcvdGFibGUtYnVpbGRlci1vcHRpb25zJztcclxuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJhYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYWJsZUZpbHRlclR5cGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbHRlcmFibGUvZmlsdGVyYWJsZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEcmFnZ2FibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kcmFnZ2FibGUvZHJhZ2dhYmxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hUYWJsZVZpZXdDaGFuZ2VzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGFibGUtdmlldy1jaGFuZ2VzL25neC10YWJsZS12aWV3LWNoYW5nZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IE92ZXJsb2FkU2Nyb2xsU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvb3ZlcmxvYWQtc2Nyb2xsL292ZXJsb2FkLXNjcm9sbC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IHsgVElNRV9JRExFLCBUSU1FX1JFTE9BRCwgRlJBTUVfVElNRSB9OiB0eXBlb2YgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgPSBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtdGFibGUtYnVpbGRlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtYnVpbGRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi90YWJsZS1idWlsZGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFRlbXBsYXRlUGFyc2VyU2VydmljZSxcclxuICAgICAgICBTb3J0YWJsZVNlcnZpY2UsXHJcbiAgICAgICAgU2VsZWN0aW9uU2VydmljZSxcclxuICAgICAgICBSZXNpemFibGVTZXJ2aWNlLFxyXG4gICAgICAgIENvbnRleHRNZW51U2VydmljZSxcclxuICAgICAgICBGaWx0ZXJhYmxlU2VydmljZSxcclxuICAgICAgICBEcmFnZ2FibGVTZXJ2aWNlLFxyXG4gICAgICAgIE92ZXJsb2FkU2Nyb2xsU2VydmljZVxyXG4gICAgXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBhbmltYXRpb25zOiBbTkdYX0FOSU1BVElPTl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlQnVpbGRlckNvbXBvbmVudCBleHRlbmRzIFRhYmxlQnVpbGRlckFwaUltcGxcclxuICAgIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XHJcbiAgICBwdWJsaWMgZGlydHk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHJlbmRlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzUmVuZGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBjb250ZW50SW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGNvbnRlbnRDaGVjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHNob3dlZENlbGxCeURlZmF1bHQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHNjcm9sbE9mZnNldDogU2Nyb2xsT2Zmc2V0U3RhdHVzID0geyBvZmZzZXQ6IGZhbHNlIH07XHJcbiAgICBwdWJsaWMgcmVjYWxjdWxhdGVkOiBSZWNhbGN1bGF0ZWRTdGF0dXMgPSB7IHJlY2FsY3VsYXRlSGVpZ2h0OiBmYWxzZSB9O1xyXG4gICAgQFZpZXdDaGlsZCgnaGVhZGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgaGVhZGVyUmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Zvb3RlcicsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGZvb3RlclJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XHJcbiAgICBwdWJsaWMgc291cmNlSXNOdWxsOiBib29sZWFuO1xyXG4gICAgcHVibGljIGlzU2Nyb2xsaW5nOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBmb3JjZWRSZWZyZXNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuICAgIHByaXZhdGUgY2hlY2tlZFRhc2tJZDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVBhcnNlcjogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB1dGlsczogVXRpbHNTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSByZXNpemU6IFJlc2l6YWJsZVNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHNvcnRhYmxlOiBTb3J0YWJsZVNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNvbnRleHRNZW51OiBDb250ZXh0TWVudVNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGFwcDogQXBwbGljYXRpb25SZWYsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGZpbHRlcmFibGU6IEZpbHRlcmFibGVTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBkcmFnZ2FibGU6IERyYWdnYWJsZVNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHZpZXdDaGFuZ2VzOiBOZ3hUYWJsZVZpZXdDaGFuZ2VzU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3ZlcmxvYWRTY3JvbGw6IE92ZXJsb2FkU2Nyb2xsU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGlvbkVudHJpZXMoKTogS2V5TWFwPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uTW9kZWwuZW50cmllcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNvdXJjZUV4aXN0cygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHZpZXdJc0RpcnR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRDaGVjayAmJiAhdGhpcy5mb3JjZWRSZWZyZXNoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1NvdXJjZUlzTnVsbCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISgnbGVuZ3RoJyBpbiAodGhpcy5zb3VyY2UgfHwge30pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjYWxjdWxhdGVIZWlnaHQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZWQgPSB7IHJlY2FsY3VsYXRlSGVpZ2h0OiB0cnVlIH07XHJcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgPSB7fSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG5vbklkZW50aWNhbFN0cnVjdHVyZTogYm9vbGVhbiA9IHRoaXMuc291cmNlRXhpc3RzICYmIHRoaXMuZ2V0Q291bnRLZXlzKCkgIT09IHRoaXMucmVuZGVyZWRDb3VudEtleXM7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VJc051bGwgPSB0aGlzLmNoZWNrU291cmNlSXNOdWxsKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0YWJsZS5zZXREZWZpbml0aW9uKHRoaXMuc29ydFR5cGVzKTtcclxuXHJcbiAgICAgICAgaWYgKG5vbklkZW50aWNhbFN0cnVjdHVyZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkQ291bnRLZXlzID0gdGhpcy5nZXRDb3VudEtleXMoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21Nb2RlbENvbHVtbnNLZXlzID0gdGhpcy5nZW5lcmF0ZUN1c3RvbU1vZGVsQ29sdW1uc0tleXMoKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbENvbHVtbktleXMgPSB0aGlzLmdlbmVyYXRlTW9kZWxDb2x1bW5LZXlzKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2UgPSB0aGlzLnNvdXJjZTtcclxuICAgICAgICAgICAgY29uc3QgdW5EaXJ0eTogYm9vbGVhbiA9ICF0aGlzLmRpcnR5O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jaGVja0ZpbHRlclZhbHVlcygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHVuRGlydHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3ljbGVWaWV3OiBib29sZWFuID0gdW5EaXJ0eSAmJiB0aGlzLmlzUmVuZGVyZWQgJiYgdGhpcy5jb250ZW50SW5pdDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWN5Y2xlVmlldykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWJsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChUYWJsZVNpbXBsZUNoYW5nZXMuU09VUkNFX0tFWSBpbiBjaGFuZ2VzICYmIHRoaXMuaXNSZW5kZXJlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsU291cmNlID0gY2hhbmdlc1tUYWJsZVNpbXBsZUNoYW5nZXMuU09VUkNFX0tFWV0uY3VycmVudFZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRBbmRGaWx0ZXIoKS50aGVuKCgpID0+IHRoaXMucmVDaGVja0RlZmluaXRpb25zKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFRhYmxlU2ltcGxlQ2hhbmdlcy5TQ0hFTUFfQ09MVU1OUyBpbiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYUNoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1tUYWJsZVNpbXBsZUNoYW5nZXMuU0NIRU1BX0NPTFVNTlNdO1xyXG4gICAgICAgICAgICBpZiAoIXNjaGVtYUNoYW5nZS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBgWW91IG5lZWQgc2V0IGNvcnJlY3QgPG5neC10YWJsZS1idWlsZGVyIFtzY2hlbWEtY29sdW1uc109XCJbXSB8fCBbLi5dXCIgLz4gZm9yIG9uZSB0aW1lIGJpbmRpbmdgXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Q2hlY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbmFibGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucHJpbWFyeUtleSA9IHRoaXMucHJpbWFyeUtleTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ubGlzdGVuU2hpZnRLZXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNjcm9sbE9mZnNldChvZmZzZXQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbE9mZnNldCA9IHsgb2Zmc2V0IH07XHJcbiAgICAgICAgdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXJrVmlzaWJsZUNvbHVtbihjb2x1bW46IEhUTUxEaXZFbGVtZW50LCB2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29sdW1uWyd2aXNpYmxlJ10gPSB2aXNpYmxlO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXJrRGlydHlDaGVjaygpO1xyXG4gICAgICAgIHRoaXMubWFya1RlbXBsYXRlQ29udGVudENoZWNrKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZUV4aXN0cykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVuVGVtcGxhdGVDaGFuZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5TZWxlY3Rpb25DaGFuZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5yZWNoZWNrVGVtcGxhdGVDaGFuZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5TY3JvbGxFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXdJc0RpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0ZvcmNlUmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5zY2hlbWEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSQubmV4dCh0cnVlKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcmtUZW1wbGF0ZUNvbnRlbnRDaGVjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnRJbml0ID0gISF0aGlzLnNvdXJjZSB8fCAhKHRoaXMuY29sdW1uVGVtcGxhdGVzICYmIHRoaXMuY29sdW1uVGVtcGxhdGVzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcmtEaXJ0eUNoZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICogQGRlc2NyaXB0aW9uOiBLZXkgdGFibGUgZ2VuZXJhdGlvbiBmb3IgaW50ZXJuYWwgdXNlXHJcbiAgICAgKiBAc2FtcGxlOiBrZXlzIC0gWydpZCcsICd2YWx1ZSddIC0+IHsgaWQ6IHRydWUsIHZhbHVlOiB0cnVlIH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdlbmVyYXRlQ29sdW1uc0tleU1hcChrZXlzOiBzdHJpbmdbXSk6IEtleU1hcDxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgbWFwOiBLZXlNYXA8Ym9vbGVhbj4gPSB7fTtcclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiAobWFwW2tleV0gPSB0cnVlKSk7XHJcbiAgICAgICAgcmV0dXJuIG1hcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGVudENoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51dGlscy5tYWNyb3Rhc2soKCkgPT4gdGhpcy5yZW5kZXJUYWJsZSgpLCBUSU1FX0lETEUpLnRoZW4oKCkgPT4gdGhpcy5pZGxlRGV0ZWN0Q2hhbmdlcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyVGFibGUoeyBhc3luYyB9OiB7IGFzeW5jOiBib29sZWFuIH0gPSB7IGFzeW5jOiB0cnVlIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZW5kZXJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkxpc3Q6IHN0cmluZ1tdID0gdGhpcy5nZW5lcmF0ZURpc3BsYXllZENvbHVtbnMoKTtcclxuICAgICAgICBjb25zdCBkcmF3VGFzazogRm48c3RyaW5nW10sIFByb21pc2U8dm9pZD4+ID1cclxuICAgICAgICAgICAgdGhpcy5hc3luY0NvbHVtbnMgJiYgYXN5bmMgPyB0aGlzLmFzeW5jRHJhd0NvbHVtbnMuYmluZCh0aGlzKSA6IHRoaXMuc3luY0RyYXdDb2x1bW5zLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5zb3J0YWJsZS5lbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRBbmRGaWx0ZXIoKS50aGVuKCgpID0+IGRyYXdUYXNrKGNvbHVtbkxpc3QpLnRoZW4oKCkgPT4gdGhpcy5lbWl0UmVuZGVyZWQoKSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRyYXdUYXNrKGNvbHVtbkxpc3QpLnRoZW4oKCkgPT4gdGhpcy5lbWl0UmVuZGVyZWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVDb2x1bW5WaXNpYmlsaXR5KGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNoZWNrVmlld3BvcnRDaGVja2VkKCk7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci50b2dnbGVDb2x1bW5WaXNpYmlsaXR5KGtleSk7XHJcbiAgICAgICAgdGhpcy51dGlsc1xyXG4gICAgICAgICAgICAucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NoZW1hKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2hlY2tWaWV3cG9ydENoZWNrZWQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5hcHAudGljaygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRTY2hlbWEoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YWJsZVZpZXdwb3J0Q2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZW1hQ29sdW1ucyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyVGFibGUoeyBhc3luYzogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTY2hlbWEoW10pO1xyXG5cclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFibGVWaWV3cG9ydENoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH0sIFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsLlRJTUVfSURMRSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsaXN0ZW5TY3JvbGxFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vdmVybG9hZFNjcm9sbC5zY3JvbGxTdGF0dXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoc2Nyb2xsaW5nOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTY3JvbGxpbmcgPSBzY3JvbGxpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tGaWx0ZXJWYWx1ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlRmlsdGVyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyYWJsZS5maWx0ZXJUeXBlID1cclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyYWJsZS5maWx0ZXJUeXBlIHx8XHJcbiAgICAgICAgICAgICAgICAodGhpcy5jb2x1bW5PcHRpb25zICYmIHRoaXMuY29sdW1uT3B0aW9ucy5maWx0ZXJUeXBlKSB8fFxyXG4gICAgICAgICAgICAgICAgVGFibGVGaWx0ZXJUeXBlLlNUQVJUX1dJVEg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vZGVsQ29sdW1uS2V5cy5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGVEZWZpbml0aW9uW2tleV0gPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyYWJsZS5maWx0ZXJUeXBlRGVmaW5pdGlvbltrZXldIHx8IHRoaXMuZmlsdGVyYWJsZS5maWx0ZXJUeXBlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWNoZWNrVGVtcGxhdGVDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuYXBwLnRpY2soKSwgVElNRV9SRUxPQUQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxpc3RlblNlbGVjdGlvbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLm9uQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwLnRpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlld0ZvcmNlUmVmcmVzaCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5jaGVja2VkVGFza0lkKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkVGFza0lkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JjZWRSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya1RlbXBsYXRlQ29udGVudENoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9LCBGUkFNRV9USU1FKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxpc3RlblRlbXBsYXRlQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb2x1bW5UZW1wbGF0ZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2x1bW5UZW1wbGF0ZXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtUZW1wbGF0ZUNvbnRlbnRDaGVjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRNZW51VGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5ldmVudHMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGVjdENoYW5nZXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiBsYXp5IHJlbmRlcmluZyBvZiBjb2x1bW5zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYXN5bmNEcmF3Q29sdW1ucyhjb2x1bW5MaXN0OiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4OiBudW1iZXIgPSAwOyBpbmRleCA8IGNvbHVtbkxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gY29sdW1uTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYTogQ29sdW1uc1NjaGVtYSA9IHRoaXMubWVyZ2VDb2x1bW5TY2hlbWEoa2V5LCBpbmRleCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2NoZW1hLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy51dGlscy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkQ29sdW1uTGlzdCAmJiB0aGlzLnByb2Nlc3NlZENvbHVtbkxpc3Qoc2NoZW1hLCBrZXksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NlZENvbHVtbkxpc3Qoc2NoZW1hLCBrZXksIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiBzeW5jIHJlbmRlcmluZyBvZiBjb2x1bW5zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgc3luY0RyYXdDb2x1bW5zKGNvbHVtbkxpc3Q6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy51dGlscy5taWNyb3Rhc2soKCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleDogbnVtYmVyID0gMDsgaW5kZXggPCBjb2x1bW5MaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgPSBjb2x1bW5MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYTogQ29sdW1uc1NjaGVtYSA9IHRoaXMubWVyZ2VDb2x1bW5TY2hlbWEoa2V5LCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NlZENvbHVtbkxpc3Qoc2NoZW1hLCBjb2x1bW5MaXN0W2luZGV4XSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDdXN0b21Db2x1bW5TY2hlbWFCeUluZGV4KGluZGV4OiBudW1iZXIpOiBQYXJ0aWFsPENvbHVtbnNTY2hlbWE+IHtcclxuICAgICAgICByZXR1cm4gKCh0aGlzLnNjaGVtYUNvbHVtbnMgJiYgdGhpcy5zY2hlbWFDb2x1bW5zW2luZGV4XSkgfHwgKHt9IGFzIEFueSkpIGFzIFBhcnRpYWw8Q29sdW1uc1NjaGVtYT47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gLSBpdCBpcyBuZWNlc3NhcnkgdG8gY29tYmluZSB0aGUgdGVtcGxhdGVzIGdpdmVuIGZyb20gdGhlIHNlcnZlciBhbmQgZGVmYXVsdFxyXG4gICAgICogQHBhcmFtIGtleSAtIGNvbHVtbiBzY2hlbWEgZnJvbSByZW5kZXJlZCB0ZW1wbGF0ZXMgbWFwXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBjb2x1bW4gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtZXJnZUNvbHVtblNjaGVtYShrZXk6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IENvbHVtbnNTY2hlbWEge1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbUNvbHVtbjogUGFydGlhbDxDb2x1bW5zU2NoZW1hPiA9IHRoaXMuZ2V0Q3VzdG9tQ29sdW1uU2NoZW1hQnlJbmRleChpbmRleCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlZFRlbXBsYXRlc1trZXldKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbjogTmd4Q29sdW1uQ29tcG9uZW50ID0gbmV3IE5neENvbHVtbkNvbXBvbmVudCgpLndpdGhLZXkoa2V5KTtcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlQ29sdW1uTWV0YWRhdGEoY29sdW1uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRDb2x1bW46IENvbHVtbnNTY2hlbWEgPSB0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVkVGVtcGxhdGVzW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjdXN0b21Db2x1bW4ua2V5ID09PSBkZWZhdWx0Q29sdW1uLmtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLmNvbXBpbGVkVGVtcGxhdGVzW2tleV0gPSB7IC4uLmRlZmF1bHRDb2x1bW4sIC4uLmN1c3RvbUNvbHVtbiB9IGFzIENvbHVtbnNTY2hlbWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZVBhcnNlci5jb21waWxlZFRlbXBsYXRlc1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiBjb2x1bW4gbWV0YSBpbmZvcm1hdGlvbiBwcm9jZXNzaW5nXHJcbiAgICAgKiBAcGFyYW0gc2NoZW1hIC0gY29sdW1uIHNjaGVtYVxyXG4gICAgICogQHBhcmFtIGtleSAtIGNvbHVtbiBuYW1lXHJcbiAgICAgKiBAcGFyYW0gYXN5bmMgLSB3aGV0aGVyIHRvIGRyYXcgYSBjb2x1bW4gYXN5bmNocm9ub3VzbHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwcm9jZXNzZWRDb2x1bW5MaXN0KHNjaGVtYTogQ29sdW1uc1NjaGVtYSwga2V5OiBzdHJpbmcsIGFzeW5jOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5zY2hlbWEuY29sdW1ucy5wdXNoKHRoaXMudGVtcGxhdGVQYXJzZXIuY29tcGlsZWRUZW1wbGF0ZXNba2V5XSk7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWRsZURldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IG5vdGlmaWNhdGlvbiB0aGF0IHRoZSB0YWJsZSBoYXMgYmVlbiByZW5kZXJlZFxyXG4gICAgICogQHNlZSBUYWJsZUJ1aWxkZXJDb21wb25lbnQjaXNSZW5kZXJlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVtaXRSZW5kZXJlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzUmVuZGVyZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZnRlclJlbmRlcmVkLmVtaXQodGhpcy5pc1JlbmRlcmVkKTtcclxuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlSGVpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHBhcnNpbmcgdGVtcGxhdGVzIGFuZCBpbnB1dCBwYXJhbWV0ZXJzIChrZXlzLCBzY2hlbWFDb2x1bW5zKSBmb3IgdGhlIG51bWJlciBvZiBjb2x1bW5zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVEaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgZ2VuZXJhdGVkTGlzdDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUGFyc2VyLmluaXRpYWxTY2hlbWEodGhpcy5jb2x1bW5PcHRpb25zKTtcclxuICAgICAgICBjb25zdCB7IHNpbXBsZVJlbmRlcmVkS2V5cywgYWxsUmVuZGVyZWRLZXlzIH06IFRlbXBsYXRlS2V5cyA9IHRoaXMucGFyc2VUZW1wbGF0ZUtleXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2NoZW1hQ29sdW1ucyAmJiB0aGlzLnNjaGVtYUNvbHVtbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlZExpc3QgPSB0aGlzLnNjaGVtYUNvbHVtbnMubWFwKChjb2x1bW46IENvbHVtbnNTY2hlbWEpID0+IGNvbHVtbi5rZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5rZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZWRMaXN0ID0gdGhpcy5jdXN0b21Nb2RlbENvbHVtbnNLZXlzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2ltcGxlUmVuZGVyZWRLZXlzLnNpemUpIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVkTGlzdCA9IGFsbFJlbmRlcmVkS2V5cztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZWRMaXN0ID0gdGhpcy5tb2RlbENvbHVtbktleXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ2VuZXJhdGVkTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogdGhpcyBtZXRob2QgcmV0dXJucyB0aGUga2V5cyBieSB3aGljaCB0byBkcmF3IHRhYmxlIGNvbHVtbnNcclxuICAgICAqIDxhbGxvd2VkS2V5TWFwPiAtIHBvc3NpYmxlIGtleXMgZnJvbSB0aGUgbW9kZWwsIHRoaXMgbXVzdCBiZSBjaGVja2VkLFxyXG4gICAgICogYmVjYXVzZSB1c2VycyBjYW4gZHJhdyB0aGUgd3Jvbmcga2V5cyBpbiB0aGUgdGVtcGxhdGUgKG5neC1jb2x1bW4ga2V5PWludmFsaWQpXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2VUZW1wbGF0ZUtleXMoKTogVGVtcGxhdGVLZXlzIHtcclxuICAgICAgICBjb25zdCBhbGxvd2VkS2V5TWFwOiBLZXlNYXA8Ym9vbGVhbj4gPSB0aGlzLmtleXMubGVuZ3RoXHJcbiAgICAgICAgICAgID8gdGhpcy5nZW5lcmF0ZUNvbHVtbnNLZXlNYXAodGhpcy5jdXN0b21Nb2RlbENvbHVtbnNLZXlzKVxyXG4gICAgICAgICAgICA6IHRoaXMuZ2VuZXJhdGVDb2x1bW5zS2V5TWFwKHRoaXMubW9kZWxDb2x1bW5LZXlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVBhcnNlci5wYXJzZShhbGxvd2VkS2V5TWFwLCB0aGlzLmNvbHVtblRlbXBsYXRlcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbFJlbmRlcmVkS2V5czogQXJyYXkuZnJvbSh0aGlzLnRlbXBsYXRlUGFyc2VyLmZ1bGxUZW1wbGF0ZUtleXMpLFxyXG4gICAgICAgICAgICBvdmVycmlkaW5nUmVuZGVyZWRLZXlzOiB0aGlzLnRlbXBsYXRlUGFyc2VyLm92ZXJyaWRlVGVtcGxhdGVLZXlzLFxyXG4gICAgICAgICAgICBzaW1wbGVSZW5kZXJlZEtleXM6IHRoaXMudGVtcGxhdGVQYXJzZXIudGVtcGxhdGVLZXlzXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=