import { __spread, __assign, __extends, __values, __read, __awaiter, __generator } from 'tslib';
import { InjectionToken, Injectable, NgZone, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ApplicationRef, Input, ViewChild, EventEmitter, Output, Directive, TemplateRef, ContentChild, ContentChildren, ɵɵdefineInjectable, Inject, ElementRef, Pipe, HostBinding, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject, ReplaySubject, fromEvent } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} data
 * @param {?} row
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
function shallowUpdateRow(data, row, key, value) {
    var _a;
    /** @type {?} */
    var index = data.indexOf(row);
    return __spread(data.slice(0, index), [__assign({}, data[index], (_a = {}, _a[key] = value, _a))], data.slice(index + 1, data.length));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var ImplicitContext = {
    ROW: 'ROW',
    CELL: 'CELL',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NGX_TABLE_OPTIONS = new InjectionToken('NGX_TABLE_OPTIONS');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var PrimaryKey = {
    ID: 'id',
};
/** @enum {string} */
var TableSimpleChanges = {
    SOURCE_KEY: 'source',
    SCHEMA_COLUMNS: 'schemaColumns',
};
/** @enum {string} */
var KeyType = {
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ContextMenuState = /** @class */ (function () {
    function ContextMenuState(state) {
        if (state === void 0) { state = null; }
        this.opened = false;
        this.position = { left: null, top: null };
        this.key = null;
        this.item = null;
        this.value = null;
        if (state) {
            this.opened = state.opened;
            this.position = state.position;
            this.key = state.key;
            this.item = state.item;
            this.value = state.value;
        }
    }
    return ContextMenuState;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} obj
 * @param {?} path
 * @return {?}
 */
function getDeepValue(obj, path) {
    if (!(path && path.length)) {
        return obj;
    }
    /** @type {?} */
    var parts = path.split('.');
    /** @type {?} */
    var result = obj;
    /** @type {?} */
    var index = 0;
    for (; result && index < parts.length; ++index) {
        result = result[parts[index]];
    }
    return result;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ContextMenuService = /** @class */ (function () {
    function ContextMenuService() {
        this.state = {};
        this.events = new Subject();
    }
    /**
     * @param {?} event
     * @param {?=} key
     * @param {?=} row
     * @return {?}
     */
    ContextMenuService.prototype.openContextMenu = /**
     * @param {?} event
     * @param {?=} key
     * @param {?=} row
     * @return {?}
     */
    function (event, key, row) {
        if (key === void 0) { key = null; }
        if (row === void 0) { row = null; }
        this.state = new ContextMenuState({
            key: key,
            item: row,
            opened: true,
            value: getDeepValue(row, key) || null,
            position: { left: event.clientX, top: event.clientY }
        });
        this.events.next();
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    ContextMenuService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.state = new ContextMenuState();
        this.events.next();
    };
    ContextMenuService.decorators = [
        { type: Injectable }
    ];
    return ContextMenuService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function checkValueIsEmpty(value) {
    if (typeof value === 'number') {
        return isNaN(value) || value === Infinity;
    }
    else if (typeof value === 'string') {
        return value.trim().length === 0;
    }
    else {
        return !value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UtilsService = /** @class */ (function () {
    function UtilsService(zone) {
        this.zone = zone;
    }
    Object.defineProperty(UtilsService.prototype, "bodyRect", {
        get: /**
         * @return {?}
         */
        function () {
            return document.querySelector('body').getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    UtilsService.replaceUndefinedOrNull = /**
     * @private
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    function (_, value) {
        return checkValueIsEmpty(value) ? undefined : value;
    };
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    UtilsService.prototype.clone = /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return JSON.parse(JSON.stringify(obj || null)) || {};
    };
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    UtilsService.prototype.isObject = /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj === Object(obj);
    };
    /**
     * @template T
     * @param {?} target
     * @param {?} source
     * @return {?}
     */
    UtilsService.prototype.mergeDeep = /**
     * @template T
     * @param {?} target
     * @param {?} source
     * @return {?}
     */
    function (target, source) {
        var _this = this;
        /** @type {?} */
        var output = __assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                var _a, _b;
                if (_this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                    }
                    else {
                        output[key] = _this.mergeDeep(target[key], source[key]);
                    }
                }
                else {
                    Object.assign(output, (_b = {}, _b[key] = source[key], _b));
                }
            }));
        }
        return output;
    };
    /**
     * @param {?} row
     * @param {?=} parentKey
     * @param {?=} keys
     * @return {?}
     */
    UtilsService.prototype.flattenKeysByRow = /**
     * @param {?} row
     * @param {?=} parentKey
     * @param {?=} keys
     * @return {?}
     */
    function (row, parentKey, keys) {
        if (parentKey === void 0) { parentKey = null; }
        if (keys === void 0) { keys = []; }
        for (var key in row) {
            if (!row.hasOwnProperty(key)) {
                continue;
            }
            /** @type {?} */
            var element = row[key];
            /** @type {?} */
            var isObject = typeof element === 'object' && element !== null && !Array.isArray(element);
            if (isObject) {
                /** @type {?} */
                var implicitKey = parentKey ? parentKey + "." + key : key;
                this.flattenKeysByRow(row[key], implicitKey, keys);
            }
            else {
                keys.push(parentKey ? parentKey + "." + key : key);
            }
        }
        return keys;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    UtilsService.prototype.clean = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return JSON.parse(JSON.stringify(obj, UtilsService.replaceUndefinedOrNull.bind(this)));
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    UtilsService.prototype.requestAnimationFrame = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                window.requestAnimationFrame((/**
                 * @return {?}
                 */
                function () {
                    callback();
                    resolve();
                }));
            }));
        }));
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    UtilsService.prototype.microtask = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            callback();
            resolve();
        }));
    };
    /**
     * @param {?} callback
     * @param {?=} time
     * @return {?}
     */
    UtilsService.prototype.macrotask = /**
     * @param {?} callback
     * @param {?=} time
     * @return {?}
     */
    function (callback, time) {
        var _this = this;
        if (time === void 0) { time = 0; }
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    callback();
                    resolve();
                }), time);
            }));
        }));
    };
    UtilsService.SCROLLBAR_WIDTH = 10;
    UtilsService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    UtilsService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return UtilsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} cd
 * @return {?}
 */
function detectChanges(cd) {
    if (!((/** @type {?} */ (cd))).destroyed) {
        cd.detectChanges();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var  /**
 * @abstract
 * @template T
 */
ModalViewLayer = /** @class */ (function () {
    function ModalViewLayer(cd, app, utils, ngZone) {
        this.cd = cd;
        this.app = app;
        this.utils = utils;
        this.ngZone = ngZone;
        this.width = null;
        this.height = null;
        this.isViewed = false;
        this.subscription = null;
    }
    Object.defineProperty(ModalViewLayer.prototype, "left", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.state.position && this.state.position.left) || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalViewLayer.prototype, "top", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.state.position && this.state.position.top) || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalViewLayer.prototype, "overflowX", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var overflowX = this.width + this.left - this.utils.bodyRect.width;
            return overflowX > 0 ? overflowX + UtilsService.SCROLLBAR_WIDTH : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalViewLayer.prototype, "overflowY", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var overflowY = this.height + this.top - this.utils.bodyRect.height;
            return overflowY > 0 ? overflowY + UtilsService.SCROLLBAR_WIDTH : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ModalViewLayer.prototype.updateView = /**
     * @return {?}
     */
    function () {
        this.cd.detectChanges();
        this.app.tick();
    };
    /**
     * @return {?}
     */
    ModalViewLayer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeEventListener();
        this.subscription.unsubscribe();
    };
    /**
     * @protected
     * @return {?}
     */
    ModalViewLayer.prototype.update = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.isViewed = _this.state.opened;
                _this.updateView();
                if (_this.state.opened) {
                    _this.removeEventListener();
                    _this.preventClose();
                    _this.listenInsideClick();
                }
                window.setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.updateView(); }));
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    ModalViewLayer.prototype.listenInsideClick = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.clickListener = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                try {
                    /** @type {?} */
                    var origin_1 = _this.targetElement.nativeElement;
                    /** @type {?} */
                    var target = (/** @type {?} */ (event.target));
                    if (!origin_1.contains(target)) {
                        _this.removeListener(event);
                        _this.taskId = window.setTimeout((/**
                         * @return {?}
                         */
                        function () { return _this.removeListener(event); }), _this.closeTime);
                    }
                }
                catch (e) {
                    _this.removeEventListener();
                }
            });
            window.addEventListener('mousedown', _this.clickListener, true);
        }));
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ModalViewLayer.prototype.removeListener = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.removeEventListener();
        this.close(event);
        detectChanges(this.cd);
    };
    /**
     * @private
     * @return {?}
     */
    ModalViewLayer.prototype.removeEventListener = /**
     * @private
     * @return {?}
     */
    function () {
        window.removeEventListener('mousedown', this.clickListener, true);
    };
    /**
     * @return {?}
     */
    ModalViewLayer.prototype.preventClose = /**
     * @return {?}
     */
    function () {
        window.clearTimeout(this.taskId);
    };
    return ModalViewLayer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
var NgxContextMenuComponent = /** @class */ (function (_super) {
    __extends(NgxContextMenuComponent, _super);
    function NgxContextMenuComponent(contextMenu, cd, app, utils, ngZone) {
        var _this = _super.call(this, cd, app, utils, ngZone) || this;
        _this.contextMenu = contextMenu;
        _this.cd = cd;
        _this.app = app;
        _this.utils = utils;
        _this.ngZone = ngZone;
        _this.width = 300;
        _this.height = 300;
        _this.maxHeight = 400;
        _this.closeTime = 0;
        return _this;
    }
    Object.defineProperty(NgxContextMenuComponent.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this.contextMenu.state;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxContextMenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.contextMenu.events.subscribe((/**
         * @return {?}
         */
        function () { return _this.update(); }));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxContextMenuComponent.prototype.close = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.contextMenu.close();
        event.preventDefault();
    };
    NgxContextMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-context-menu',
                    template: "<div class=\"table-grid__context-menu\" *ngIf=\"state?.opened\">\r\n    <div\r\n        #targetElement\r\n        class=\"context-menu\"\r\n        (contextmenu)=\"close($event)\"\r\n        [ngStyle]=\"{\r\n            'width.px': width,\r\n            'min-height.px': height,\r\n            'max-height.px': maxHeight,\r\n            'top.px': state?.position?.top - overflowY,\r\n            'left.px': state?.position?.left - overflowX,\r\n            visibility: state?.position ? 'visible' : 'hidden'\r\n        }\"\r\n    >\r\n        <ng-content></ng-content>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["@-webkit-keyframes delayedShow{to{visibility:visible}}@keyframes delayedShow{to{visibility:visible}}.table-grid__context-menu .context-menu{display:flex;position:fixed;background:#fff;z-index:100000000;border:1px solid #dcdcdc;box-shadow:1px 1px 2px #9c9c9c;flex-direction:column}.table-grid__context-menu .context-menu__item{margin-top:0;height:48px;line-height:16px;font-size:14px;font-weight:500;display:flex;flex-flow:row;box-sizing:border-box;padding:0 16px 0 23px;align-items:center;justify-content:space-between}.table-grid__context-menu .context-menu__item .content{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:left}.table-grid__context-menu .context-menu__item .content.align-center{text-align:center}.table-grid__context-menu .context-menu__item:not(.context-menu__title):hover{cursor:pointer;background:rgba(0,0,0,.04)}.table-grid__context-menu .context-menu__item ngx-menu-content:not(.icon-place){overflow:hidden;min-width:35px;text-align:center}.table-grid__context-menu .context-menu__item ngx-menu-content:not(.icon-place):not(.content-phrase){margin:auto auto auto 10px}.table-grid__context-menu .context-menu__item--disable{opacity:.5;pointer-events:none}.table-grid__context-menu .context-menu__item:hover>.context-menu__sub-menu-place>.sub-menu__tree{visibility:visible;transition-delay:.3s;opacity:1}.table-grid__context-menu .context-menu .sub-menu__tree--content{max-height:350px;overflow:auto}.table-grid__context-menu .context-menu__sub-menu-place{margin-left:auto;line-height:15px}.table-grid__context-menu .context-menu__sub-menu-place .sub-menu__tree{opacity:0;visibility:hidden;position:fixed;background:#fff;z-index:100000;border:1px solid #dcdcdc;box-shadow:2px 1px 1px #9c9c9c;transition:visibility .1s linear,opacity .1s linear}.table-grid__context-menu .context-menu__sub-menu-place .sub-menu__arrow-icon{height:25px;width:25px;margin-right:15px}.table-grid__context-menu .context-menu .context-menu__sub-hidden{display:none}.table-grid__context-menu .context-menu__icon-place{width:25px;margin-right:5px}.table-grid__context-menu .context-menu__icon-place img{max-width:25px;max-height:25px}.table-grid__context-menu .context-menu__title{color:rgba(0,0,0,.54)}.table-grid__context-menu .context-menu__divider{display:block;margin:0;border-top:1px solid rgba(0,0,0,.12)}"]
                }] }
    ];
    /** @nocollapse */
    NgxContextMenuComponent.ctorParameters = function () { return [
        { type: ContextMenuService },
        { type: ChangeDetectorRef },
        { type: ApplicationRef },
        { type: UtilsService },
        { type: NgZone }
    ]; };
    NgxContextMenuComponent.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }],
        maxHeight: [{ type: Input, args: ['max-height',] }],
        targetElement: [{ type: ViewChild, args: ['targetElement', { static: false },] }]
    };
    return NgxContextMenuComponent;
}(ModalViewLayer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var TableFilterType = {
    START_WITH: 'START_WITH',
    END_WITH: 'END_WITH',
    CONTAINS: 'CONTAINS',
    DOES_NOT_CONTAIN: 'DOES_NOT_CONTAIN',
    EQUALS: 'EQUALS',
    DOES_NOT_EQUAL: 'DOES_NOT_EQUAL',
};
var FilterStateEvent = /** @class */ (function () {
    function FilterStateEvent() {
        this.key = null;
        this.opened = null;
        this.position = { left: null, top: null };
    }
    return FilterStateEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColumnOptions = /** @class */ (function () {
    function ColumnOptions() {
        this.nowrap = null;
        this.width = null;
        this.resizable = null;
        this.sortable = null;
        this.filterable = null;
        this.draggable = null;
        this.filterType = null;
    }
    ColumnOptions.propDecorators = {
        nowrap: [{ type: Input }],
        width: [{ type: Input }],
        resizable: [{ type: Input }],
        sortable: [{ type: Input }],
        filterable: [{ type: Input }],
        draggable: [{ type: Input }],
        filterType: [{ type: Input, args: ['filter-type',] }],
        cssClass: [{ type: Input, args: ['css-class',] }],
        cssStyle: [{ type: Input, args: ['css-style',] }]
    };
    return ColumnOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxOptionsComponent = /** @class */ (function (_super) {
    __extends(NgxOptionsComponent, _super);
    function NgxOptionsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxOptionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-options',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return NgxOptionsComponent;
}(ColumnOptions));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var TemplateCellCommon = /** @class */ (function () {
    function TemplateCellCommon(template) {
        this.template = template;
        this.type = null;
        this.row = null;
        this.bold = null;
        this.nowrap = true;
        this.width = null;
        this.height = null;
        this.cssStyles = null;
        this.cssClasses = null;
        this.onClick = new EventEmitter();
        this.dblClick = new EventEmitter();
    }
    TemplateCellCommon.propDecorators = {
        row: [{ type: Input }],
        bold: [{ type: Input }],
        nowrap: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        cssStyles: [{ type: Input, args: ['ng-style',] }],
        cssClasses: [{ type: Input, args: ['ng-class',] }],
        onClick: [{ type: Output }],
        dblClick: [{ type: Output }]
    };
    return TemplateCellCommon;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TemplateHeadThDirective = /** @class */ (function (_super) {
    __extends(TemplateHeadThDirective, _super);
    function TemplateHeadThDirective(template) {
        var _this = _super.call(this, template) || this;
        _this.template = template;
        _this.type = null;
        _this.nowrap = false;
        _this.bold = true;
        return _this;
    }
    TemplateHeadThDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngx-th]' },] }
    ];
    /** @nocollapse */
    TemplateHeadThDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    TemplateHeadThDirective.propDecorators = {
        type: [{ type: Input, args: ['ngx-th',] }]
    };
    return TemplateHeadThDirective;
}(TemplateCellCommon));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TemplateBodyTdDirective = /** @class */ (function (_super) {
    __extends(TemplateBodyTdDirective, _super);
    function TemplateBodyTdDirective(template) {
        var _this = _super.call(this, template) || this;
        _this.template = template;
        _this.type = null;
        return _this;
    }
    TemplateBodyTdDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngx-td]' },] }
    ];
    /** @nocollapse */
    TemplateBodyTdDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    TemplateBodyTdDirective.propDecorators = {
        type: [{ type: Input, args: ['ngx-td',] }]
    };
    return TemplateBodyTdDirective;
}(TemplateCellCommon));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxColumnComponent = /** @class */ (function (_super) {
    __extends(NgxColumnComponent, _super);
    function NgxColumnComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = null;
        _this.stickyLeft = false;
        _this.emptyHead = null;
        _this.headTitle = null;
        _this.customKey = false;
        _this.importantTemplate = false;
        _this.stickyRight = false;
        _this.verticalLine = false;
        return _this;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    NgxColumnComponent.prototype.withKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.key = key;
        return this;
    };
    NgxColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-column',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    NgxColumnComponent.propDecorators = {
        key: [{ type: Input }],
        stickyLeft: [{ type: Input, args: ['sticky',] }],
        emptyHead: [{ type: Input, args: ['empty-head',] }],
        headTitle: [{ type: Input, args: ['head-title',] }],
        customKey: [{ type: Input, args: ['custom-key',] }],
        importantTemplate: [{ type: Input, args: ['important-template',] }],
        stickyRight: [{ type: Input, args: ['sticky-end',] }],
        verticalLine: [{ type: Input, args: ['vertical-line',] }],
        th: [{ type: ContentChild, args: [TemplateHeadThDirective, { static: false },] }],
        td: [{ type: ContentChild, args: [TemplateBodyTdDirective, { static: false },] }]
    };
    return NgxColumnComponent;
}(ColumnOptions));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableBuilderOptionsImpl = /** @class */ (function () {
    function TableBuilderOptionsImpl() {
        this.wheelMaxDelta = 300;
        this.bufferAmount = 0;
    }
    TableBuilderOptionsImpl.MACRO_TIME = 1000;
    TableBuilderOptionsImpl.TIME_RELOAD = 400;
    TableBuilderOptionsImpl.COLUMN_RESIZE_MIN_WIDTH = 50;
    TableBuilderOptionsImpl.FRAME_TIME = 66;
    TableBuilderOptionsImpl.ROW_HEIGHT = 45;
    TableBuilderOptionsImpl.TIME_IDLE = 200;
    TableBuilderOptionsImpl.decorators = [
        { type: Injectable }
    ];
    return TableBuilderOptionsImpl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableContent = /** @class */ (function () {
    function TableContent() {
        this.height = TableBuilderOptionsImpl.ROW_HEIGHT;
        this.contentCell = null;
        this.alignCenter = null;
        this.cssClasses = null;
        this.bold = null;
    }
    TableContent.propDecorators = {
        height: [{ type: Input }],
        contentCell: [{ type: Input, args: ['content-cell',] }],
        alignCenter: [{ type: Input, args: ['align-center',] }],
        cssClasses: [{ type: Input, args: ['css-class',] }],
        bold: [{ type: Input }]
    };
    return TableContent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxHeaderComponent = /** @class */ (function (_super) {
    __extends(NgxHeaderComponent, _super);
    function NgxHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-header',
                    template: "<div\r\n    class=\"table-grid__table-content-place\"\r\n    [class.table-grid__table-content-place--content-cell]=\"contentCell !== null\"\r\n    [class.table-grid__table-content-place--align-center]=\"alignCenter !== null\"\r\n    [class.table-grid__table-content-place--bold]=\"bold !== null\"\r\n    [style.height.px]=\"height\"\r\n>\r\n    <div [ngClass]=\"cssClasses\" [class.content-box]=\"contentCell !== null\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return NgxHeaderComponent;
}(TableContent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFooterComponent = /** @class */ (function (_super) {
    __extends(NgxFooterComponent, _super);
    function NgxFooterComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-footer',
                    template: "<div\n    class=\"table-grid__table-content-place\"\n    [class.table-grid__table-content-place--content-cell]=\"contentCell !== null\"\n    [class.table-grid__table-content-place--align-center]=\"alignCenter !== null\"\n    [class.table-grid__table-content-place--bold]=\"bold !== null\"\n    [style.height.px]=\"height\"\n>\n    <div [class.content-box]=\"contentCell !== null\">\n        <ng-content></ng-content>\n    </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return NgxFooterComponent;
}(TableContent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WebWorkerThreadService = /** @class */ (function () {
    function WebWorkerThreadService() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    WebWorkerThreadService.createWorkerUrl = /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    function (resolve) {
        /** @type {?} */
        var resolveString = resolve.toString();
        /** @type {?} */
        var webWorkerTemplate = "\n            self.addEventListener('message', function(e) {\n                postMessage((" + resolveString + ")(e.data));\n            });\n        ";
        /** @type {?} */
        var blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    };
    /**
     * @template T, K
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    WebWorkerThreadService.prototype.run = /**
     * @template T, K
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    function (workerFunction, data) {
        /** @type {?} */
        var url = this.getOrCreateWorkerUrl(workerFunction);
        return this.runUrl(url, data);
    };
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    WebWorkerThreadService.prototype.runUrl = /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    function (url, data) {
        /** @type {?} */
        var worker = new Worker(url);
        /** @type {?} */
        var promise = this.createPromiseForWorker(worker, data);
        /** @type {?} */
        var promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    };
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerThreadService.prototype.terminate = /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        return this.removePromise(promise);
    };
    /**
     * @param {?} promise
     * @return {?}
     */
    WebWorkerThreadService.prototype.getWorker = /**
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        return this.promiseToWorkerMap.get(promise);
    };
    /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    WebWorkerThreadService.prototype.createPromiseForWorker = /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    function (worker, data) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            worker.addEventListener('message', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return resolve(event.data); }));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        }));
    };
    /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    WebWorkerThreadService.prototype.getOrCreateWorkerUrl = /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            /** @type {?} */
            var url = WebWorkerThreadService.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    };
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerThreadService.prototype.createPromiseCleaner = /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        var _this = this;
        return (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.removePromise(promise);
            return event;
        });
    };
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerThreadService.prototype.removePromise = /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        /** @type {?} */
        var worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    };
    WebWorkerThreadService.decorators = [
        { type: Injectable }
    ];
    return WebWorkerThreadService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} __0
 * @return {?}
 */
function filterAllWorker(_a) {
    var source = _a.source, global = _a.global, types = _a.types, columns = _a.columns;
    /** @enum {number} */
    var Terminate = {
        CONTINUE: -1,
        BREAK: 0,
        NEXT: 1,
    };
    Terminate[Terminate.CONTINUE] = 'CONTINUE';
    Terminate[Terminate.BREAK] = 'BREAK';
    Terminate[Terminate.NEXT] = 'NEXT';
    var value = global.value, type = global.type;
    /** @type {?} */
    var result = source;
    if (value) {
        result = source.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return type === types.DOES_NOT_CONTAIN ? !includes(JSON.stringify(item), value) : globalFilter(item);
        }));
    }
    if (!columns.isEmpty) {
        result = result.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return multipleFilter(item); }));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function globalFilter(item) {
        var e_1, _a;
        /** @type {?} */
        var satisfiesItem = false;
        /** @type {?} */
        var flattenedItem = flatten(item);
        try {
            for (var _b = __values(Object.keys(flattenedItem)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var keyModel = _c.value;
                /** @type {?} */
                var fieldValue = String(flattenedItem[keyModel]);
                var _d = __read(getSatisfies(fieldValue, value, type), 2), terminate = _d[0], satisfies = _d[1];
                satisfiesItem = satisfies;
                if (terminate === Terminate.CONTINUE) {
                    continue;
                }
                else if (terminate === Terminate.BREAK) {
                    break;
                }
                if (satisfiesItem) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return satisfiesItem;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function multipleFilter(item) {
        var e_2, _a;
        /** @type {?} */
        var matches = true;
        try {
            for (var _b = __values(Object.keys(columns.values)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fieldKey = _c.value;
                /** @type {?} */
                var fieldValue = String(getValueByPath(item, fieldKey) || '').trim();
                /** @type {?} */
                var findKeyValue = String(columns.values[fieldKey]);
                /** @type {?} */
                var fieldType = columns.types[fieldKey];
                var _d = __read(getSatisfies(fieldValue, findKeyValue, fieldType), 2), terminate = _d[0], satisfies = _d[1];
                matches = matches && satisfies;
                if (!matches || terminate === Terminate.BREAK) {
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return matches;
    }
    /**
     * @param {?} field
     * @param {?} substring
     * @param {?} fieldType
     * @return {?}
     */
    function getSatisfies(field, substring, fieldType) {
        /** @type {?} */
        var satisfies = false;
        /** @type {?} */
        var terminate = Terminate.NEXT;
        if (fieldType === types.START_WITH) {
            satisfies = field.toLocaleLowerCase().startsWith(substring.toLocaleLowerCase());
        }
        else if (fieldType === types.END_WITH) {
            /** @type {?} */
            var regexp = new RegExp(escaped(substring) + "$");
            satisfies = !!field.match(regexp);
        }
        else if (fieldType === types.CONTAINS) {
            satisfies = includes(field, substring);
        }
        else if (fieldType === types.EQUALS) {
            satisfies = field === substring;
        }
        else if (fieldType === types.DOES_NOT_EQUAL) {
            if (field !== substring) {
                satisfies = true;
                terminate = Terminate.CONTINUE;
            }
            else {
                satisfies = false;
                terminate = Terminate.BREAK;
            }
        }
        return [terminate, satisfies];
    }
    /**
     * @param {?} origin
     * @param {?} substring
     * @return {?}
     */
    function includes(origin, substring) {
        return origin.toLocaleLowerCase().includes(substring.toLocaleLowerCase());
    }
    /**
     * @param {?} escapedValue
     * @return {?}
     */
    function escaped(escapedValue) {
        return escapedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    /**
     * @template T
     * @param {?} object
     * @param {?=} excludeKeys
     * @return {?}
     */
    function flatten(object, excludeKeys) {
        if (excludeKeys === void 0) { excludeKeys = []; }
        /** @type {?} */
        var depthGraph = {};
        for (var key in object) {
            if (object.hasOwnProperty(key) && !excludeKeys.includes(key)) {
                mutate(object, depthGraph, key);
            }
        }
        return depthGraph;
    }
    /**
     * @param {?} object
     * @param {?} path
     * @return {?}
     */
    function getValueByPath(object, path) {
        return path ? path.split('.').reduce((/**
         * @param {?} str
         * @param {?} key
         * @return {?}
         */
        function (str, key) { return str && str[key]; }), object) : object;
    }
    /**
     * @template T
     * @param {?} object
     * @param {?} depthGraph
     * @param {?} key
     * @return {?}
     */
    function mutate(object, depthGraph, key) {
        /** @type {?} */
        var isObject = typeof object[key] === 'object' && object[key] !== null;
        if (isObject) {
            /** @type {?} */
            var flatObject = flatten(object[key]);
            for (var path in flatObject) {
                if (flatObject.hasOwnProperty(path)) {
                    depthGraph[key + "." + path] = flatObject[path];
                }
            }
        }
        else {
            depthGraph[key] = object[key];
        }
    }
    return result;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TIME_IDLE = TableBuilderOptionsImpl.TIME_IDLE;
var FilterableService = /** @class */ (function () {
    function FilterableService(thread, utils, ngZone, app) {
        this.thread = thread;
        this.utils = utils;
        this.ngZone = ngZone;
        this.app = app;
        this.filterValue = null;
        this.definition = {};
        this.state = new FilterStateEvent();
        this.types = TableFilterType;
        this.filterOpenEvents = new Subject();
        this.events = new ReplaySubject();
        this.filterTypeDefinition = {};
        this.filtering = false;
        this.previousFiltering = false;
    }
    Object.defineProperty(FilterableService.prototype, "globalFilterValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.filterValue ? String(this.filterValue).trim() : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FilterableService.prototype.changeFilteringStatus = /**
     * @return {?}
     */
    function () {
        this.filtering = this.filterValueExist;
        if (this.filtering !== this.previousFiltering) {
            this.events.next({ value: null, type: null });
        }
        this.previousFiltering = this.filtering;
    };
    Object.defineProperty(FilterableService.prototype, "filterValueExist", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var keyFilterValues = Object.values(this.definition).reduce((/**
             * @param {?} acc
             * @param {?} next
             * @return {?}
             */
            function (acc, next) { return acc + next; }), '');
            return (this.globalFilterValue && this.globalFilterValue.length > 0) || keyFilterValues.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    FilterableService.prototype.openFilter = /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    function (key, event) {
        this.state = { opened: true, key: key, position: { left: event.clientX, top: event.clientY } };
        this.filterOpenEvents.next();
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    FilterableService.prototype.closeFilter = /**
     * @return {?}
     */
    function () {
        this.state = new FilterStateEvent();
        this.filterOpenEvents.next();
    };
    /**
     * @param {?} source
     * @return {?}
     */
    FilterableService.prototype.filter = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        var _this = this;
        /** @type {?} */
        var type = this.filterType;
        /** @type {?} */
        var value = this.globalFilterValue ? String(this.globalFilterValue).trim() : null;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            /** @type {?} */
            var message = {
                source: source,
                types: TableFilterType,
                global: { value: value, type: type },
                columns: {
                    values: _this.definition,
                    types: _this.filterTypeDefinition,
                    isEmpty: _this.checkIsEmpty(_this.definition)
                }
            };
            _this.thread.run(filterAllWorker, message).then((/**
             * @param {?} sorted
             * @return {?}
             */
            function (sorted) {
                _this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    return window.setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        resolve({
                            source: sorted,
                            fireSelection: (/**
                             * @return {?}
                             */
                            function () {
                                window.setTimeout((/**
                                 * @return {?}
                                 */
                                function () {
                                    _this.events.next({ value: value, type: type });
                                    _this.app.tick();
                                }), TIME_IDLE);
                            })
                        });
                    }), TIME_IDLE);
                }));
            }));
        }));
    };
    /**
     * @private
     * @param {?} definition
     * @return {?}
     */
    FilterableService.prototype.checkIsEmpty = /**
     * @private
     * @param {?} definition
     * @return {?}
     */
    function (definition) {
        return Object.keys(this.utils.clean(definition)).length === 0;
    };
    FilterableService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilterableService.ctorParameters = function () { return [
        { type: WebWorkerThreadService },
        { type: UtilsService },
        { type: NgZone },
        { type: ApplicationRef }
    ]; };
    return FilterableService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFilterDirective = /** @class */ (function () {
    function NgxFilterDirective(template) {
        this.template = template;
        this.type = null;
    }
    NgxFilterDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngx-filter]' },] }
    ];
    /** @nocollapse */
    NgxFilterDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgxFilterDirective.propDecorators = {
        type: [{ type: Input, args: ['ngx-filter',] }]
    };
    return NgxFilterDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFilterComponent = /** @class */ (function (_super) {
    __extends(NgxFilterComponent, _super);
    function NgxFilterComponent(filterable, cd, app, utils, ngZone) {
        var _this = _super.call(this, cd, app, utils, ngZone) || this;
        _this.filterable = filterable;
        _this.cd = cd;
        _this.app = app;
        _this.utils = utils;
        _this.ngZone = ngZone;
        _this.width = 300;
        _this.height = null;
        _this.maxHeight = null;
        _this.closeTime = 150;
        _this.leftX = 10;
        _this.topY = 50;
        return _this;
    }
    Object.defineProperty(NgxFilterComponent.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this.filterable.state;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFilterComponent.prototype.close = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.filterable.closeFilter();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    NgxFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.filterable.filterOpenEvents.subscribe((/**
         * @return {?}
         */
        function () { return _this.update(); }));
    };
    NgxFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-filter',
                    template: "<div class=\"table-grid__filter-menu\" *ngIf=\"state.opened\">\n    <div\n        #targetElement\n        class=\"filter-menu\"\n        (contextmenu)=\"close($event)\"\n        [ngStyle]=\"{\n            'width.px': width,\n            'min-height.px': height,\n            'max-height.px': maxHeight,\n            'top.px': state?.position?.top + leftX - overflowY,\n            'left.px': state?.position?.left - topY - overflowX,\n            visibility: state?.position ? 'visible' : 'hidden'\n        }\"\n    >\n        <ng-template [ngIf]=\"isViewed\">\n            <ng-content></ng-content>\n        </ng-template>\n    </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".table-grid__filter-menu .filter-menu{display:flex;position:fixed;background:#fff;z-index:100000000;border:1px solid #dcdcdc;box-shadow:1px 1px 2px #9c9c9c;flex-direction:column}"]
                }] }
    ];
    /** @nocollapse */
    NgxFilterComponent.ctorParameters = function () { return [
        { type: FilterableService },
        { type: ChangeDetectorRef },
        { type: ApplicationRef },
        { type: UtilsService },
        { type: NgZone }
    ]; };
    NgxFilterComponent.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }],
        maxHeight: [{ type: Input, args: ['max-height',] }],
        filter: [{ type: ContentChild, args: [NgxFilterDirective, { static: false },] }],
        targetElement: [{ type: ViewChild, args: ['targetElement', { static: false },] }]
    };
    return NgxFilterComponent;
}(ModalViewLayer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} userAgent
 * @return {?}
 */
function isFirefox(userAgent) {
    if (userAgent === void 0) { userAgent = null; }
    return (userAgent || navigator.userAgent).toLowerCase().indexOf('firefox') > -1;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ROW_HEIGHT = TableBuilderOptionsImpl.ROW_HEIGHT, MACRO_TIME = TableBuilderOptionsImpl.MACRO_TIME, TIME_IDLE$1 = TableBuilderOptionsImpl.TIME_IDLE;
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
        return __awaiter(this, void 0, void 0, function () {
            var filter, _a, _b;
            return __generator(this, function (_c) {
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
                        this.toggleFreeze(TIME_IDLE$1);
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
        this.filterable.definition = __assign({}, this.filterable.definition);
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
        return this.excluding(this.getModelKeys());
    };
    /**
     * @protected
     * @return {?}
     */
    TableBuilderApiImpl.prototype.getModelKeys = /**
     * @protected
     * @return {?}
     */
    function () {
        return this.utils.flattenKeysByRow(this.firstItem);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_TIME_ANIMATION = 150;
/** @type {?} */
var NGX_ANIMATION = trigger('fadeAnimation', [
    // the "in" style determines the "resting" state of the element when it is visible.
    state('in', style({ opacity: 1 })),
    // fade in when created. this could also be written as transition('void => *')
    transition(':enter', [style({ opacity: 0 }), animate(DEFAULT_TIME_ANIMATION)]),
    // fade out when destroyed. this could also be written as transition('void => *')
    transition(':leave', animate(DEFAULT_TIME_ANIMATION, style({ opacity: 0 })))
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SchemaBuilder = /** @class */ (function () {
    function SchemaBuilder(columns) {
        if (columns === void 0) { columns = []; }
        this.columns = columns;
    }
    /**
     * @return {?}
     */
    SchemaBuilder.prototype.exportColumns = /**
     * @return {?}
     */
    function () {
        return this.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return ({
            key: column.key,
            width: column.width,
            isVisible: column.isVisible,
            isModel: column.isModel
        }); }));
    };
    return SchemaBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TemplateParserService = /** @class */ (function () {
    function TemplateParserService() {
        this.compiledTemplates = {};
        /**
         * \@description: the custom names of the column list to be displayed in the view.
         * \@example:
         *    <table-builder #table
         *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
         *        [exclude]="[ 'description' ]">
         *    </table-builder>
         *    ------------------------
         *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true }
         */
        this.allowedKeyMap = {};
        /**
         * \@description: the custom names of the column list to be displayed in the view.
         * \@example:
         *    <table-builder #table
         *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
         *        [exclude]="[ 'description' ]">
         *    </table-builder>
         *    ------------------------
         *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true, 'description': false }
         */
        this.keyMap = {};
    }
    /**
     * @private
     * @param {?} key
     * @param {?} cell
     * @param {?} options
     * @return {?}
     */
    TemplateParserService.templateContext = /**
     * @private
     * @param {?} key
     * @param {?} cell
     * @param {?} options
     * @return {?}
     */
    function (key, cell, options) {
        return {
            textBold: cell.bold,
            template: cell.template,
            class: cell.cssClasses,
            style: cell.cssStyles,
            width: cell.width,
            height: cell.height,
            onClick: cell.onClick,
            dblClick: cell.dblClick,
            useDeepPath: key.includes('.'),
            context: cell.row ? ImplicitContext.ROW : ImplicitContext.CELL,
            nowrap: TemplateParserService.getValidPredicate(options.nowrap, cell.nowrap)
        };
    };
    /**
     * @private
     * @param {?} attribute
     * @return {?}
     */
    TemplateParserService.getValidHtmlBooleanAttribute = /**
     * @private
     * @param {?} attribute
     * @return {?}
     */
    function (attribute) {
        return typeof attribute === 'string' ? true : attribute;
    };
    /**
     * @private
     * @template T
     * @param {?} leftPredicate
     * @param {?} rightPredicate
     * @return {?}
     */
    TemplateParserService.getValidPredicate = /**
     * @private
     * @template T
     * @param {?} leftPredicate
     * @param {?} rightPredicate
     * @return {?}
     */
    function (leftPredicate, rightPredicate) {
        return leftPredicate === null ? rightPredicate : leftPredicate;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    TemplateParserService.prototype.toggleColumnVisibility = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.schema.columns = this.schema.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            return key === column.key
                ? __assign({}, column, { isVisible: !column.isVisible }) : column;
        }));
    };
    /**
     * @param {?} columnOptions
     * @return {?}
     */
    TemplateParserService.prototype.initialSchema = /**
     * @param {?} columnOptions
     * @return {?}
     */
    function (columnOptions) {
        this.schema = this.schema || new SchemaBuilder();
        this.schema.columns = [];
        this.compiledTemplates = {};
        this.templateKeys = new Set();
        this.overrideTemplateKeys = new Set();
        this.fullTemplateKeys = new Set();
        this.columnOptions = columnOptions || new ColumnOptions();
    };
    /**
     * @param {?} templates
     * @return {?}
     */
    TemplateParserService.prototype.parse = /**
     * @param {?} templates
     * @return {?}
     */
    function (templates) {
        var _this = this;
        if (!templates) {
            return;
        }
        templates.forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            var key = column.key, customKey = column.customKey, importantTemplate = column.importantTemplate;
            /** @type {?} */
            var needTemplateCheck = _this.allowedKeyMap[key] || customKey !== false;
            if (needTemplateCheck) {
                if (importantTemplate !== false) {
                    _this.templateKeys.delete(key);
                    _this.compileColumnMetadata(column);
                    _this.overrideTemplateKeys.add(key);
                }
                else if (!_this.templateKeys.has(key) && !_this.overrideTemplateKeys.has(key)) {
                    _this.compileColumnMetadata(column);
                    _this.templateKeys.add(key);
                }
                _this.fullTemplateKeys.add(key);
            }
        }));
    };
    /**
     * @param {?} key
     * @param {?} partialSchema
     * @return {?}
     */
    TemplateParserService.prototype.mutateColumnSchema = /**
     * @param {?} key
     * @param {?} partialSchema
     * @return {?}
     */
    function (key, partialSchema) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(partialSchema)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                this.compiledTemplates[key][option] = partialSchema[option];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @param {?} column
     * @return {?}
     */
    TemplateParserService.prototype.compileColumnMetadata = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        var key = column.key, th = column.th, td = column.td, emptyHead = column.emptyHead, headTitle = column.headTitle;
        /** @type {?} */
        var thTemplate = th || new TemplateHeadThDirective(null);
        /** @type {?} */
        var tdTemplate = td || new TemplateBodyTdDirective(null);
        /** @type {?} */
        var isEmptyHead = TemplateParserService.getValidHtmlBooleanAttribute(emptyHead);
        /** @type {?} */
        var thOptions = TemplateParserService.templateContext(key, thTemplate, this.columnOptions);
        /** @type {?} */
        var stickyLeft = TemplateParserService.getValidHtmlBooleanAttribute(column.stickyLeft);
        /** @type {?} */
        var stickyRight = TemplateParserService.getValidHtmlBooleanAttribute(column.stickyRight);
        /** @type {?} */
        var canBeAddDraggable = !(stickyLeft || stickyRight);
        /** @type {?} */
        var isModel = this.keyMap[key];
        this.compiledTemplates[key] = {
            key: key,
            isModel: isModel,
            isVisible: true,
            th: __assign({}, thOptions, { headTitle: headTitle, emptyHead: isEmptyHead, template: isEmptyHead ? null : thOptions.template }),
            td: TemplateParserService.templateContext(key, tdTemplate, this.columnOptions),
            stickyLeft: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyLeft),
            stickyRight: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyRight),
            customColumn: TemplateParserService.getValidHtmlBooleanAttribute(column.customKey),
            width: TemplateParserService.getValidPredicate(column.width, this.columnOptions.width),
            cssClass: TemplateParserService.getValidPredicate(column.cssClass, this.columnOptions.cssClass) || [],
            cssStyle: TemplateParserService.getValidPredicate(column.cssStyle, this.columnOptions.cssStyle) || [],
            resizable: TemplateParserService.getValidPredicate(column.resizable, this.columnOptions.resizable),
            verticalLine: column.verticalLine,
            excluded: !this.allowedKeyMap[key],
            filterable: TemplateParserService.getValidPredicate(column.filterable, this.columnOptions.filterable),
            sortable: isModel
                ? TemplateParserService.getValidPredicate(column.sortable, this.columnOptions.sortable)
                : false,
            draggable: canBeAddDraggable
                ? TemplateParserService.getValidPredicate(column.draggable, this.columnOptions.draggable)
                : false
        };
    };
    TemplateParserService.decorators = [
        { type: Injectable }
    ];
    return TemplateParserService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var SortOrderType = {
    ASC: 'asc',
    DESC: 'desc',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} message
 * @return {?}
 */
function sortWorker(message) {
    /** @enum {string} */
    var OrderType = {
        DESC: 'desc',
        SKIP: 'skip',
    };
    /**
     * @param {?} object
     * @param {?} path
     * @return {?}
     */
    function getValueByPath(object, path) {
        return path ? path.split('.').reduce((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        function (value, key) { return value && value[key]; }), object) : object;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function checkValueIsEmpty(value) {
        /** @type {?} */
        var val = typeof value === 'string' ? value.trim() : value;
        return [undefined, null, NaN, '', 'null', Infinity].includes(val);
    }
    var Sortable = /** @class */ (function () {
        function Sortable() {
        }
        /**
         * @param {?} data
         * @param {?} keys
         * @return {?}
         */
        Sortable.sortByKeys = /**
         * @param {?} data
         * @param {?} keys
         * @return {?}
         */
        function (data, keys) {
            /** @type {?} */
            var countKeys = Object.keys(keys).length;
            if (!countKeys) {
                return data.sort(Sortable.shallowSort);
            }
            /** @type {?} */
            var matches = Sortable.getMatchesKeys(keys);
            return data.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return Sortable.multiSort(a, b, matches); }));
        };
        /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?} matches
         * @return {?}
         */
        Sortable.multiSort = /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?} matches
         * @return {?}
         */
        function (a, b, matches) {
            /** @type {?} */
            var countKeys = Object.keys(matches).length;
            /** @type {?} */
            var sorted = 0;
            /** @type {?} */
            var ix = 0;
            while (sorted === 0 && ix < countKeys) {
                /** @type {?} */
                var key = Sortable.observeKey(matches, ix);
                if (key) {
                    /** @type {?} */
                    var depth = matches[key];
                    sorted = Sortable.deepSort(key, a, b, depth);
                    ix++;
                }
            }
            return sorted;
        };
        /**
         * @private
         * @param {?} keys
         * @return {?}
         */
        Sortable.getMatchesKeys = /**
         * @private
         * @param {?} keys
         * @return {?}
         */
        function (keys) {
            /** @type {?} */
            var matches = {};
            for (var key in keys) {
                if (keys.hasOwnProperty(key)) {
                    matches[key] =
                        keys[key] === OrderType.DESC || keys[key] === -1
                            ? -1
                            : keys[key] === OrderType.SKIP || keys[key] === 0
                                ? 0
                                : 1;
                }
            }
            return matches;
        };
        /**
         * @private
         * @param {?} key
         * @param {?} leftHand
         * @param {?} rightHand
         * @param {?} depth
         * @return {?}
         */
        Sortable.deepSort = /**
         * @private
         * @param {?} key
         * @param {?} leftHand
         * @param {?} rightHand
         * @param {?} depth
         * @return {?}
         */
        function (key, leftHand, rightHand, depth) {
            /** @type {?} */
            var a = getValueByPath(leftHand, key);
            /** @type {?} */
            var b = getValueByPath(rightHand, key);
            return this.shallowSort(a, b, depth);
        };
        /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?=} depth
         * @return {?}
         */
        Sortable.shallowSort = /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?=} depth
         * @return {?}
         */
        function (a, b, depth) {
            /** @type {?} */
            var currentDepth = depth !== null ? depth : 1;
            b = checkValueIsEmpty(b) ? '' : b;
            if (a === b) {
                return 0;
            }
            return a > b ? currentDepth : -1 * currentDepth;
        };
        /**
         * @private
         * @param {?} keys
         * @param {?} count
         * @return {?}
         */
        Sortable.observeKey = /**
         * @private
         * @param {?} keys
         * @param {?} count
         * @return {?}
         */
        function (keys, count) {
            /** @type {?} */
            var key;
            /** @type {?} */
            var size = 0;
            for (key in keys) {
                if (keys.hasOwnProperty(key)) {
                    if (size === count) {
                        return key;
                    }
                    size++;
                }
            }
            return null;
        };
        return Sortable;
    }());
    return Sortable.sortByKeys(message.source, (/** @type {?} */ (message.definition)));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SortableService = /** @class */ (function () {
    function SortableService(thread, utils, zone) {
        this.thread = thread;
        this.utils = utils;
        this.zone = zone;
        this.definition = {};
    }
    Object.defineProperty(SortableService.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () {
            return Object.keys(this.definition).length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} data
     * @return {?}
     */
    SortableService.prototype.sort = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.thread
                .run(sortWorker, { definition: _this.definition, source: data })
                .then((/**
             * @param {?} sorted
             * @return {?}
             */
            function (sorted) {
                _this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    return window.setTimeout((/**
                     * @return {?}
                     */
                    function () { return resolve(sorted); }), TableBuilderOptionsImpl.TIME_IDLE);
                }));
            }));
        }));
    };
    /**
     * @param {?} definition
     * @return {?}
     */
    SortableService.prototype.setDefinition = /**
     * @param {?} definition
     * @return {?}
     */
    function (definition) {
        this.definition = this.empty ? ((/** @type {?} */ (definition))) || {} : this.definition;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    SortableService.prototype.updateSortKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.definition = this.updateImmutableDefinitions(key);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    SortableService.prototype.updateImmutableDefinitions = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var existKey = this.definition[key];
        if (existKey) {
            if (existKey === SortOrderType.ASC) {
                this.definition[key] = SortOrderType.DESC;
            }
            else {
                delete this.definition[key];
            }
        }
        else {
            this.definition[key] = SortOrderType.ASC;
        }
        return __assign({}, this.definition);
    };
    SortableService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SortableService.ctorParameters = function () { return [
        { type: WebWorkerThreadService },
        { type: UtilsService },
        { type: NgZone }
    ]; };
    return SortableService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SelectionMap = /** @class */ (function () {
    function SelectionMap() {
        this.isAll = false;
        this.entries = {};
        this.map = new Map();
    }
    Object.defineProperty(SelectionMap.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionMap.prototype.generateImmutableEntries = /**
     * @return {?}
     */
    function () {
        this.entries = Array.from(this.map.entries()).reduce((/**
         * @param {?} main
         * @param {?} __1
         * @return {?}
         */
        function (main, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], value = _c[1];
            return (__assign({}, main, (_b = {}, _b[key] = value, _b)));
        }), {});
    };
    /**
     * @return {?}
     */
    SelectionMap.prototype.hasValue = /**
     * @return {?}
     */
    function () {
        return this.size > 0;
    };
    Object.defineProperty(SelectionMap.prototype, "isIndeterminate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hasValue() && !this.isAll;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @return {?}
     */
    SelectionMap.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.map.get(key) || false;
    };
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    SelectionMap.prototype.select = /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    function (key, emit) {
        this.map.set(key, true);
        if (emit) {
            this.generateImmutableEntries();
        }
    };
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    SelectionMap.prototype.toggle = /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    function (key, emit) {
        if (this.has(key)) {
            this.delete(key, emit);
        }
        else {
            this.select(key, emit);
        }
    };
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    SelectionMap.prototype.delete = /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    function (key, emit) {
        this.map.delete(key);
        if (emit) {
            this.generateImmutableEntries();
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    SelectionMap.prototype.has = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.map.has(key);
    };
    /**
     * @return {?}
     */
    SelectionMap.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.map.clear();
        this.entries = {};
        this.isAll = false;
    };
    return SelectionMap;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SelectionRange = /** @class */ (function () {
    function SelectionRange() {
        this.start = null;
        this.end = null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    SelectionRange.prototype.put = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.start === null) {
            this.start = index;
        }
        else {
            this.end = index;
        }
    };
    /**
     * @return {?}
     */
    SelectionRange.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.start = null;
        this.end = null;
    };
    /**
     * @return {?}
     */
    SelectionRange.prototype.sortKeys = /**
     * @return {?}
     */
    function () {
        var _a = __read([this.start, this.end].sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a - b; })), 2), start = _a[0], end = _a[1];
        this.start = start;
        this.end = end;
        return this;
    };
    /**
     * @return {?}
     */
    SelectionRange.prototype.selectedRange = /**
     * @return {?}
     */
    function () {
        return this.start !== null && this.end !== null;
    };
    return SelectionRange;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SelectionService = /** @class */ (function () {
    function SelectionService(ngZone) {
        this.ngZone = ngZone;
        this.selectionModel = new SelectionMap();
        this.range = new SelectionRange();
        this.selectionStart = { status: false };
        this.primaryKey = PrimaryKey.ID;
        this.onChanges = new Subject();
        this.handler = {};
    }
    /**
     * @return {?}
     */
    SelectionService.prototype.listenShiftKey = /**
     * @return {?}
     */
    function () {
        this.listenShiftKeyByType(KeyType.KEYDOWN);
        this.listenShiftKeyByType(KeyType.KEYUP);
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.unListenShiftKey = /**
     * @return {?}
     */
    function () {
        this.removeListenerByType(KeyType.KEYDOWN);
        this.removeListenerByType(KeyType.KEYUP);
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unListenShiftKey();
    };
    /**
     * @param {?} rows
     * @return {?}
     */
    SelectionService.prototype.toggleAll = /**
     * @param {?} rows
     * @return {?}
     */
    function (rows) {
        var _this = this;
        clearInterval(this.selectionTaskIdle);
        /** @type {?} */
        var selectIsAll = rows.length === this.selectionModel.size;
        if (!selectIsAll) {
            rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return _this.selectionModel.select(_this.getIdByRow(row), false); }));
        }
        else {
            this.selectionModel.clear();
        }
        this.checkIsAllSelected(rows);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    SelectionService.prototype.toggle = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        clearInterval(this.selectionTaskIdle);
        this.selectionModel.toggle(this.getIdByRow(row), true);
        this.onChanges.next();
    };
    /**
     * @param {?} row
     * @param {?} event
     * @param {?} rows
     * @return {?}
     */
    SelectionService.prototype.selectRow = /**
     * @param {?} row
     * @param {?} event
     * @param {?} rows
     * @return {?}
     */
    function (row, event, rows) {
        var _this = this;
        var shiftKey = event.shiftKey, ctrlKey = event.ctrlKey;
        /** @type {?} */
        var index = rows.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item[_this.primaryKey] === row[_this.primaryKey]; }));
        if (shiftKey) {
            this.multipleSelectByShiftKeydown(index, rows);
        }
        else if (ctrlKey) {
            this.multipleSelectByCtrlKeydown(row, index);
        }
        else {
            this.singleSelect(row, index);
        }
        this.checkIsAllSelected(rows);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    SelectionService.prototype.getIdByRow = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        /** @type {?} */
        var id = row[this.primaryKey];
        if (checkValueIsEmpty(id)) {
            throw new Error("Can't select item, make sure you pass the correct primary key, or you forgot enable selection\n                <ngx-table-builder [enable-selection]=\"true\" primary-key=\"fieldId\" />\n                ");
        }
        return id;
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    SelectionService.prototype.shiftKeyDetectSelection = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var shiftKey = _a.shiftKey;
        this.selectionStart = { status: shiftKey };
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    SelectionService.prototype.listenShiftKeyByType = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.handler[type] = (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var shiftKey = _a.shiftKey;
                _this.selectionStart = { status: shiftKey };
            });
            window.addEventListener(type, _this.handler[type], true);
        }));
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    SelectionService.prototype.removeListenerByType = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        window.removeEventListener(type, this.handler[type], true);
    };
    /**
     * @private
     * @param {?} rows
     * @return {?}
     */
    SelectionService.prototype.checkIsAllSelected = /**
     * @private
     * @param {?} rows
     * @return {?}
     */
    function (rows) {
        this.selectionModel.isAll = rows.length === this.selectionModel.size;
        this.selectionModel.generateImmutableEntries();
        this.onChanges.next();
    };
    /**
     * @private
     * @param {?} index
     * @param {?} rows
     * @return {?}
     */
    SelectionService.prototype.multipleSelectByShiftKeydown = /**
     * @private
     * @param {?} index
     * @param {?} rows
     * @return {?}
     */
    function (index, rows) {
        this.selectionModel.clear();
        this.range.put(index);
        /** @type {?} */
        var selectedRange = this.range.selectedRange();
        if (selectedRange) {
            var _a = this.range.sortKeys(), start = _a.start, end = _a.end;
            for (var i = start; i <= end; ++i) {
                this.selectionModel.select(this.getIdByRow(rows[i]), false);
            }
        }
    };
    /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    SelectionService.prototype.multipleSelectByCtrlKeydown = /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    function (row, index) {
        this.range.clear();
        this.range.start = index;
        this.selectionModel.toggle(this.getIdByRow(row), true);
    };
    /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    SelectionService.prototype.singleSelect = /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    function (row, index) {
        this.selectionModel.clear();
        this.selectionModel.select(this.getIdByRow(row), true);
        this.range.clear();
        this.range.start = index;
    };
    SelectionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SelectionService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return SelectionService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var COLUMN_RESIZE_MIN_WIDTH = TableBuilderOptionsImpl.COLUMN_RESIZE_MIN_WIDTH;
var ResizableService = /** @class */ (function () {
    function ResizableService() {
    }
    /**
     * @private
     * @return {?}
     */
    ResizableService.clearSelection = /**
     * @private
     * @return {?}
     */
    function () {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        else if (document['selection']) {
            document['selection'].empty();
        }
    };
    /**
     * @param {?} event
     * @param {?} column
     * @param {?} mousemove
     * @param {?} mouseup
     * @return {?}
     */
    ResizableService.prototype.resize = /**
     * @param {?} event
     * @param {?} column
     * @param {?} mousemove
     * @param {?} mouseup
     * @return {?}
     */
    function (event, column, mousemove, mouseup) {
        var _this = this;
        this.destroyed$ = new ReplaySubject(1);
        this.startX = event.pageX;
        this.startWidth = column.offsetWidth;
        fromEvent(document, 'mousemove')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.computeEvent(e, mousemove); }));
        fromEvent(document, 'mouseup')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.unsubscribe(e, mouseup); }));
    };
    /**
     * @private
     * @param {?} event
     * @param {?} mousemove
     * @return {?}
     */
    ResizableService.prototype.computeEvent = /**
     * @private
     * @param {?} event
     * @param {?} mousemove
     * @return {?}
     */
    function (event, mousemove) {
        ResizableService.clearSelection();
        /** @type {?} */
        var width = this.startWidth + (event.pageX - this.startX);
        if (width >= COLUMN_RESIZE_MIN_WIDTH) {
            mousemove(width);
        }
    };
    /**
     * @private
     * @param {?} event
     * @param {?} mouseup
     * @return {?}
     */
    ResizableService.prototype.unsubscribe = /**
     * @private
     * @param {?} event
     * @param {?} mouseup
     * @return {?}
     */
    function (event, mouseup) {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        mouseup(event);
    };
    ResizableService.decorators = [
        { type: Injectable }
    ];
    return ResizableService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DraggableService = /** @class */ (function () {
    function DraggableService(parser) {
        this.parser = parser;
    }
    Object.defineProperty(DraggableService.prototype, "columns", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.parser.schema.columns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} previousKey
     * @param {?} currentKey
     * @return {?}
     */
    DraggableService.prototype.drop = /**
     * @param {?} previousKey
     * @param {?} currentKey
     * @return {?}
     */
    function (previousKey, currentKey) {
        /** @type {?} */
        var previousIndex = this.columns.findIndex((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.key === previousKey; }));
        /** @type {?} */
        var currentIndex = this.columns.findIndex((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.key === currentKey; }));
        if (this.canDropped(previousIndex, currentIndex)) {
            if (currentIndex === this.columns.length - 1) {
                this.columns[currentIndex].width = this.columns[previousIndex].width;
                this.columns[previousIndex].width = null;
            }
            moveItemInArray(this.columns, previousIndex, currentIndex);
        }
    };
    /**
     * @param {?} previousIndex
     * @param {?} currentIndex
     * @return {?}
     */
    DraggableService.prototype.canDropped = /**
     * @param {?} previousIndex
     * @param {?} currentIndex
     * @return {?}
     */
    function (previousIndex, currentIndex) {
        /** @type {?} */
        var previous = this.columns[previousIndex];
        /** @type {?} */
        var current = this.columns[currentIndex];
        /** @type {?} */
        var previousIsDraggable = previous.draggable;
        /** @type {?} */
        var currentIsDraggable = current.draggable;
        /** @type {?} */
        var isSticky = previous.stickyLeft || current.stickyLeft || previous.stickyRight || current.stickyRight;
        return previousIsDraggable && currentIsDraggable && !isSticky;
    };
    DraggableService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DraggableService.ctorParameters = function () { return [
        { type: TemplateParserService }
    ]; };
    return DraggableService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxTableViewChangesService = /** @class */ (function () {
    function NgxTableViewChangesService() {
        this.events = new Subject();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    NgxTableViewChangesService.prototype.update = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.events.next(state);
    };
    NgxTableViewChangesService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgxTableViewChangesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxTableViewChangesService_Factory() { return new NgxTableViewChangesService(); }, token: NgxTableViewChangesService, providedIn: "root" });
    return NgxTableViewChangesService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OverloadScrollService = /** @class */ (function () {
    function OverloadScrollService() {
        this.scrollStatus = new Subject();
    }
    OverloadScrollService.decorators = [
        { type: Injectable }
    ];
    return OverloadScrollService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TIME_IDLE$2 = TableBuilderOptionsImpl.TIME_IDLE, TIME_RELOAD = TableBuilderOptionsImpl.TIME_RELOAD, FRAME_TIME = TableBuilderOptionsImpl.FRAME_TIME;
var TableBuilderComponent = /** @class */ (function (_super) {
    __extends(TableBuilderComponent, _super);
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
        var _a = __read((/** @type {?} */ (transform
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
        function () { return _this.renderTable(); }), TIME_IDLE$2).then((/**
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
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, index;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (index) {
                            var key, schema;
                            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
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
            this.templateParser.compiledTemplates[key] = (/** @type {?} */ (__assign({}, defaultColumn, customColumn)));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TIME_IDLE$3 = TableBuilderOptionsImpl.TIME_IDLE;
var WheelThrottlingDirective = /** @class */ (function () {
    function WheelThrottlingDirective(options, ngZone, overload) {
        this.options = options;
        this.ngZone = ngZone;
        this.overload = overload;
        this.scrollOffset = new EventEmitter();
        this.scrollTopOffset = false;
        this.isScrolling = null;
        this.scrolling = false;
    }
    Object.defineProperty(WheelThrottlingDirective.prototype, "element", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.wheelThrottling;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WheelThrottlingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = fromEvent(this.element, 'wheel').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return _this.onElementScroll(event);
        }));
    };
    /**
     * @return {?}
     */
    WheelThrottlingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
        this.wheelThrottling = null;
        this.scrollOffset = null;
    };
    /**
     * Correct works only Chrome
     * @param $event
     */
    /**
     * Correct works only Chrome
     * @param {?} $event
     * @return {?}
     */
    WheelThrottlingDirective.prototype.onElementScroll = /**
     * Correct works only Chrome
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        this.scrollStart();
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.clearTimeout(_this.isScrolling);
            _this.isScrolling = window.setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var isOffset = _this.element.scrollTop > 0 && !_this.scrollTopOffset;
                if (isOffset) {
                    _this.scrollTopOffset = true;
                    _this.scrollOffset.emit(_this.scrollTopOffset);
                }
                else if (_this.element.scrollTop === 0 && _this.scrollTopOffset) {
                    _this.scrollTopOffset = false;
                    _this.scrollOffset.emit(_this.scrollTopOffset);
                }
                _this.scrollEnd();
            }), TIME_IDLE$3);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    WheelThrottlingDirective.prototype.scrollStart = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.scrolling) {
            this.scrolling = true;
            this.overload.scrollStatus.next(this.scrolling);
        }
    };
    /**
     * @private
     * @return {?}
     */
    WheelThrottlingDirective.prototype.scrollEnd = /**
     * @private
     * @return {?}
     */
    function () {
        this.scrolling = false;
        this.overload.scrollStatus.next(this.scrolling);
    };
    WheelThrottlingDirective.decorators = [
        { type: Directive, args: [{ selector: '[wheelThrottling]' },] }
    ];
    /** @nocollapse */
    WheelThrottlingDirective.ctorParameters = function () { return [
        { type: TableBuilderOptionsImpl, decorators: [{ type: Inject, args: [NGX_TABLE_OPTIONS,] }] },
        { type: NgZone },
        { type: OverloadScrollService }
    ]; };
    WheelThrottlingDirective.propDecorators = {
        wheelThrottling: [{ type: Input }],
        scrollOffset: [{ type: Output }]
    };
    return WheelThrottlingDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableLineRow = /** @class */ (function () {
    function TableLineRow(selection, utils) {
        this.selection = selection;
        this.utils = utils;
    }
    /**
     * @param {?} item
     * @param {?} key
     * @param {?} $event
     * @return {?}
     */
    TableLineRow.prototype.generateTableCellInfo = /**
     * @param {?} item
     * @param {?} key
     * @param {?} $event
     * @return {?}
     */
    function (item, key, $event) {
        var _this = this;
        return {
            row: item,
            event: $event,
            value: getDeepValue(item, key),
            preventDefault: (/**
             * @return {?}
             */
            function () {
                window.clearInterval(_this.selection.selectionTaskIdle);
            })
        };
    };
    TableLineRow.propDecorators = {
        isRendered: [{ type: Input, args: ['is-rendered',] }],
        columnIndex: [{ type: Input, args: ['column-index',] }],
        clientRowHeight: [{ type: Input, args: ['client-row-height',] }],
        columnSchema: [{ type: Input, args: ['column-schema',] }]
    };
    return TableLineRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableTheadComponent = /** @class */ (function (_super) {
    __extends(TableTheadComponent, _super);
    function TableTheadComponent(selection, utils, filterable) {
        var _this = _super.call(this, selection, utils) || this;
        _this.selection = selection;
        _this.utils = utils;
        _this.filterable = filterable;
        _this.resize = new EventEmitter();
        _this.sortByKey = new EventEmitter();
        _this.orderType = SortOrderType;
        return _this;
    }
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    TableTheadComponent.prototype.openFilter = /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    function (key, event) {
        this.filterable.openFilter(key, event);
    };
    TableTheadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'table-thead',
                    template: "<div\r\n    #parent\r\n    [style.top.px]=\"headerTop\"\r\n    class=\"table-grid__cell table-grid__header-cell\"\r\n    [class.table-grid__cell--custom-cell]=\"columnSchema?.customColumn\"\r\n    [class.table-grid__cell--is-model-cell]=\"columnSchema?.isModel\"\r\n    [class.table-grid__cell--text-bold]=\"columnSchema?.th?.textBold\"\r\n    [class.table-grid__cell--resizable]=\"columnSchema?.resizable\"\r\n    [style.min-height.px]=\"columnSchema?.th?.height || clientRowHeight\"\r\n    [style.max-height.px]=\"columnSchema?.th?.height || clientRowHeight\"\r\n    [ngClass]=\"columnSchema?.th?.class\"\r\n    [ngStyle]=\"columnSchema?.th?.style\"\r\n>\r\n    <div\r\n        #divElement\r\n        [parent]=\"parent\"\r\n        [text-center]=\"true\"\r\n        [overflowTooltip]=\"divElement\"\r\n        class=\"table-grid__cell--content table-grid__header-cell--content\"\r\n        [class.table-grid__cell--content-sortable]=\"columnSchema?.sortable\"\r\n        [class.table-grid__cell--nowrap]=\"columnSchema?.th?.nowrap\"\r\n        (click)=\"columnSchema?.sortable ? sortByKey.emit(columnSchema.key) : null\"\r\n    >\r\n        <ng-template\r\n            [ngIf]=\"columnSchema?.th?.template\"\r\n            [ngTemplateOutlet]=\"columnSchema?.th?.template\"\r\n            [ngIfElse]=\"defaultTh\"\r\n        ></ng-template>\r\n        <ng-template #defaultTh>\r\n            <ng-template [ngIf]=\"!columnSchema?.th?.emptyHead\">\r\n                {{ columnSchema?.th?.headTitle || (columnSchema.key | titlecase) }}\r\n            </ng-template>\r\n        </ng-template>\r\n    </div>\r\n\r\n    <div\r\n        *ngIf=\"columnSchema?.isModel && columnSchema?.sortable\"\r\n        class=\"table-grid__column--sortable\"\r\n        [class.table-grid__column--sortable-active]=\"sortableDefinition[columnSchema.key]\"\r\n        [class.table-grid__column--sortable-asc]=\"sortableDefinition[columnSchema.key] === orderType.ASC\"\r\n        [class.table-grid__column--sortable-desc]=\"sortableDefinition[columnSchema.key] === orderType.DESC\"\r\n        (click)=\"columnSchema?.sortable ? sortByKey.emit(columnSchema.key) : null\"\r\n    >\r\n        <img\r\n            class=\"table-grid-icon--sortable\"\r\n            src='data:image/svg+xml;utf8,<svg id=\"Layer_1\" style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 512 512\" width=\"512px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M128.4,189.3L233.4,89c5.8-6,13.7-9,22.4-9c8.7,0,16.5,3,22.4,9l105.4,100.3c12.5,11.9,12.5,31.3,0,43.2  c-12.5,11.9-32.7,11.9-45.2,0L288,184.4v217c0,16.9-14.3,30.6-32,30.6c-17.7,0-32-13.7-32-30.6v-217l-50.4,48.2  c-12.5,11.9-32.7,11.9-45.2,0C115.9,220.6,115.9,201.3,128.4,189.3z\"/></svg>'\r\n            alt=\"sort\"\r\n        />\r\n    </div>\r\n\r\n    <div\r\n        class=\"table-grid__column--filterable\"\r\n        [class.table-grid__column--filterable-active]=\"filterableDefinition[columnSchema.key]\"\r\n        *ngIf=\"columnSchema?.isModel && columnSchema?.filterable\"\r\n        (click)=\"columnSchema?.filterable ? openFilter(columnSchema.key, $event) : null\"\r\n    >\r\n        <svg\r\n            class=\"table-grid-icon--filterable\"\r\n            fill=\"none\"\r\n            height=\"24\"\r\n            stroke=\"#000\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"2\"\r\n            viewBox=\"0 0 24 24\"\r\n            width=\"24\"\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n        >\r\n            <polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"></polygon>\r\n        </svg>\r\n    </div>\r\n\r\n    <ng-template [ngIf]=\"columnSchema?.isModel && columnSchema?.draggable\">\r\n        <ng-content select=\"[slot=draggable]\"></ng-content>\r\n    </ng-template>\r\n\r\n    <div\r\n        class=\"table-grid__column--resize\"\r\n        *ngIf=\"columnSchema?.isModel && columnSchema?.resizable\"\r\n        (mousedown)=\"resize.emit({ event: $event, key: columnSchema.key })\"\r\n    >\r\n        <div class=\"table-grid__column--resize--line\"></div>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    TableTheadComponent.ctorParameters = function () { return [
        { type: SelectionService },
        { type: UtilsService },
        { type: FilterableService }
    ]; };
    TableTheadComponent.propDecorators = {
        headerTop: [{ type: Input, args: ['header-top',] }],
        sortableDefinition: [{ type: Input, args: ['sortable-definition',] }],
        filterableDefinition: [{ type: Input, args: ['filterable-definition',] }],
        resize: [{ type: Output }],
        sortByKey: [{ type: Output }]
    };
    return TableTheadComponent;
}(TableLineRow));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableTbodyComponent = /** @class */ (function (_super) {
    __extends(TableTbodyComponent, _super);
    function TableTbodyComponent(selection, cd, contextMenu, options, ngZone, utils, overload) {
        var _this = _super.call(this, selection, utils) || this;
        _this.selection = selection;
        _this.cd = cd;
        _this.contextMenu = contextMenu;
        _this.options = options;
        _this.ngZone = ngZone;
        _this.utils = utils;
        _this.overload = overload;
        _this.destroy$ = new Subject();
        return _this;
    }
    Object.defineProperty(TableTbodyComponent.prototype, "clientBufferAmount", {
        get: /**
         * @return {?}
         */
        function () {
            return Number(this.bufferAmount) || this.options.bufferAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableTbodyComponent.prototype, "canSelectTextInTable", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.selection.selectionStart.status;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    TableTbodyComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('recalculated' in changes && !changes['recalculated'].firstChange && this.scroll) {
            this.scroll.invalidateAllCachedMeasurements();
        }
    };
    /**
     * @return {?}
     */
    TableTbodyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.overload.scrollStatus
            .pipe(filter((/**
         * @param {?} scrolling
         * @return {?}
         */
        function (scrolling) { return !scrolling; })), takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.refresh(); }));
    };
    /**
     * @description: we hove some memory leak after destroy component
     * because VirtualScrollerComponent work with requestAnimationFrame
     * invalidate cache (VirtualScrollerComponent)
     */
    /**
     * \@description: we hove some memory leak after destroy component
     * because VirtualScrollerComponent work with requestAnimationFrame
     * invalidate cache (VirtualScrollerComponent)
     * @return {?}
     */
    TableTbodyComponent.prototype.ngOnDestroy = /**
     * \@description: we hove some memory leak after destroy component
     * because VirtualScrollerComponent work with requestAnimationFrame
     * invalidate cache (VirtualScrollerComponent)
     * @return {?}
     */
    function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        /** @type {?} */
        var scroll = (/** @type {?} */ (this.scroll));
        scroll.removeScrollEventHandlers();
        scroll.wrapGroupDimensions = null;
        scroll.parentScroll = null;
        scroll.viewPortItems = null;
        scroll.items = null;
        scroll['invalidateAllCachedMeasurements'] = (/**
         * @return {?}
         */
        function () { });
        scroll['calculateViewport'] = (/**
         * @return {?}
         */
        function () { return ({ startIndex: 0, scrollLength: 0 }); });
        scroll['previousViewPort'] = { startIndex: 0, scrollLength: 0 };
        scroll['invisiblePaddingElementRef'] = { nativeElement: null };
        scroll['getScrollStartPosition'] = (/**
         * @return {?}
         */
        function () { return 0; });
        scroll['calculateDimensions'] = (/**
         * @return {?}
         */
        function () { });
        scroll['refresh_internal'] = (/**
         * @return {?}
         */
        function () { });
        scroll['element'] = { nativeElement: null };
        scroll['contentElementRef'] = null;
        scroll['_items'] = null;
        scroll['zone'] = null;
        this.destroy$ = null;
        this.scroll = null;
    };
    /**
     * @param {?} event
     * @param {?} key
     * @param {?} row
     * @return {?}
     */
    TableTbodyComponent.prototype.openContextMenu = /**
     * @param {?} event
     * @param {?} key
     * @param {?} row
     * @return {?}
     */
    function (event, key, row) {
        if (this.contextMenuTemplate) {
            /** @type {?} */
            var selectOnlyUnSelectedRow = this.enableSelection && !this.checkSelectedItem(row);
            if (selectOnlyUnSelectedRow) {
                this.selection.selectRow(row, event, this.source);
            }
            this.contextMenu.openContextMenu(event, key, row);
        }
    };
    /**
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    TableTbodyComponent.prototype.handleDblClick = /**
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    function (row, key, event, emitter) {
        window.clearInterval(this.selection.selectionTaskIdle);
        this.handleEventEmitter(row, key, event, emitter);
    };
    /**
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    TableTbodyComponent.prototype.handleOnClick = /**
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    function (row, key, event, emitter) {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            if (_this.enableSelection) {
                _this.selection.selectionTaskIdle = window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.selection.selectRow(row, event, _this.source);
                    event.preventDefault();
                    detectChanges(_this.cd);
                }));
            }
        }));
        this.handleEventEmitter(row, key, event, emitter);
    };
    /**
     * @return {?}
     */
    TableTbodyComponent.prototype.vsChange = /**
     * @return {?}
     */
    function () {
        detectChanges(this.cd);
    };
    /**
     * @private
     * @return {?}
     */
    TableTbodyComponent.prototype.refresh = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.clearTimeout(_this.reloadTaskId);
            _this.reloadTaskId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.scroll) {
                    _this.scroll.invalidateAllCachedMeasurements();
                    detectChanges(_this.cd);
                }
            }), TableBuilderOptionsImpl.MACRO_TIME);
        }));
    };
    /**
     * @private
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    TableTbodyComponent.prototype.handleEventEmitter = /**
     * @private
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    function (row, key, event, emitter) {
        var _this = this;
        if (emitter) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    emitter.emit(_this.generateTableCellInfo(row, key, event));
                }));
            }));
        }
    };
    /**
     * @private
     * @param {?} row
     * @return {?}
     */
    TableTbodyComponent.prototype.checkSelectedItem = /**
     * @private
     * @param {?} row
     * @return {?}
     */
    function (row) {
        return this.selection.selectionModel.get(row[this.primaryKey]);
    };
    TableTbodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'table-tbody',
                    template: "<virtual-scroller\r\n    #scroll\r\n    [items]=\"source\"\r\n    [stripedTable]=\"true\"\r\n    [checkResizeInterval]=\"0\"\r\n    [parentScroll]=\"tableViewport\"\r\n    [enableUnequalChildrenSizes]=\"true\"\r\n    [bufferAmount]=\"clientBufferAmount\"\r\n    [resizeBypassRefreshThreshold]=\"0\"\r\n    [useMarginInsteadOfTranslate]=\"true\"\r\n    [executeRefreshOutsideAngularZone]=\"true\"\r\n    [modifyOverflowStyleOfParentScroll]=\"false\"\r\n    [style.height.px]=\"columnVirtualHeight\"\r\n    (vsChange)=\"vsChange()\"\r\n>\r\n    <div\r\n        #parent\r\n        class=\"table-grid__cell\"\r\n        *ngFor=\"let item of scroll.viewPortItems; let index = index\"\r\n        (selectstart)=\"(canSelectTextInTable)\"\r\n        (contextmenu)=\"openContextMenu($event, columnSchema.key, item)\"\r\n        (click)=\"handleOnClick(item, columnSchema.key, $event, columnSchema?.td?.onClick)\"\r\n        (dblclick)=\"handleDblClick(item, columnSchema.key, $event, columnSchema?.td?.dblClick)\"\r\n        [style.min-height.px]=\"columnSchema?.td?.height || clientRowHeight\"\r\n        [style.max-height.px]=\"columnSchema?.td?.height || clientRowHeight\"\r\n        [class.table-grid__cell--resizable]=\"columnSchema?.resizable\"\r\n        [class.table-grid__cell--custom-cell]=\"columnSchema?.customColumn\"\r\n        [class.table-grid__cell--strip]=\"striped ? index % 2 === 0 : null\"\r\n        [class.table-grid__cell--enable-selection]=\"enableSelection\"\r\n        [class.table-grid__cell--selected]=\"selectionEntries[item[primaryKey]]\"\r\n        [class.table-grid__cell--text-bold]=\"columnSchema?.td?.textBold\"\r\n        [ngClass]=\"columnSchema?.td?.class\"\r\n        [ngStyle]=\"columnSchema?.td?.style\"\r\n    >\r\n        <div\r\n            class=\"table-grid__cell--content\"\r\n            [class.table-grid__cell--nowrap]=\"!columnSchema?.customColumn && columnSchema?.td?.nowrap\"\r\n        >\r\n            <table-cell\r\n                [item]=\"item\"\r\n                [index]=\"index\"\r\n                [parent]=\"parent\"\r\n                [is-rendered]=\"isRendered\"\r\n                *ngIf=\"showedCellByDefault\"\r\n                [column-index]=\"columnIndex\"\r\n                [column-schema]=\"columnSchema\"\r\n                [is-filterable]=\"columnSchema?.filterable\"\r\n            ></table-cell>\r\n        </div>\r\n    </div>\r\n</virtual-scroller>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    TableTbodyComponent.ctorParameters = function () { return [
        { type: SelectionService },
        { type: ChangeDetectorRef },
        { type: ContextMenuService },
        { type: TableBuilderOptionsImpl, decorators: [{ type: Inject, args: [NGX_TABLE_OPTIONS,] }] },
        { type: NgZone },
        { type: UtilsService },
        { type: OverloadScrollService }
    ]; };
    TableTbodyComponent.propDecorators = {
        source: [{ type: Input }],
        striped: [{ type: Input }],
        isFirefox: [{ type: Input, args: ['is-firefox',] }],
        recalculated: [{ type: Input }],
        primaryKey: [{ type: Input, args: ['primary-key',] }],
        selectionEntries: [{ type: Input, args: ['selection-entries',] }],
        contextMenuTemplate: [{ type: Input, args: ['context-menu',] }],
        enableSelection: [{ type: Input, args: ['enable-selection',] }],
        tableViewport: [{ type: Input, args: ['table-viewport',] }],
        columnVirtualHeight: [{ type: Input, args: ['column-virtual-height',] }],
        showedCellByDefault: [{ type: Input, args: ['showed-cell-by-default',] }],
        bufferAmount: [{ type: Input, args: ['buffer-amount',] }],
        scroll: [{ type: ViewChild, args: ['scroll', { static: true },] }]
    };
    return TableTbodyComponent;
}(TableLineRow));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutoHeightDirective = /** @class */ (function () {
    function AutoHeightDirective(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.headerHeight = 0;
        this.footerHeight = 0;
        this.autoHeight = {};
        this.recalculatedHeight = new EventEmitter();
        this.useOnlyAutoViewPort = false;
    }
    Object.defineProperty(AutoHeightDirective.prototype, "height", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.autoHeight.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "canCalculated", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.autoHeight.inViewport && this.autoHeight.sourceLength > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "style", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var height;
            if (this.height) {
                height = this.height + "px";
            }
            else if (this.autoHeight.detect) {
                /** @type {?} */
                var paddingTop = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-top');
                /** @type {?} */
                var paddingBottom = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-bottom');
                if (this.useOnlyAutoViewPort && this.columnHeight > this.parentOffsetHeight) {
                    height = this.getHeightByViewPort({ paddingTop: paddingTop, paddingBottom: paddingBottom });
                }
                else if (this.parentOffsetHeight > this.columnHeight) {
                    height = this.getDefaultHeight();
                }
                else if (!this.isEmptyParentHeight) {
                    height = this.getHeightByParent({ paddingTop: paddingTop, paddingBottom: paddingBottom });
                }
                else {
                    height = this.getHeightByViewPort({ paddingTop: paddingTop, paddingBottom: paddingBottom });
                }
            }
            return height ? "display: block; height: " + height : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "isEmptyParentHeight", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.parentOffsetHeight < parseInt(AutoHeightDirective.HEAD_TOP);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "parentOffsetHeight", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.rootCurrentElement.clientHeight || AutoHeightDirective.DEFAULT_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "currentElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.element.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "childElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (((/** @type {?} */ (this.element.nativeElement))).firstChild))) || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "rootCurrentElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (this.currentElement.parentNode && this.currentElement.parentNode.parentElement) || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "columnHeight", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.autoHeight.columnHeight || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoHeightDirective.prototype, "autoViewHeight", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return document.body.clientHeight - this.currentElement.getBoundingClientRect().top;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} element
     * @param {?} strCssRule
     * @return {?}
     */
    AutoHeightDirective.getStyle = /**
     * @private
     * @param {?} element
     * @param {?} strCssRule
     * @return {?}
     */
    function (element, strCssRule) {
        /** @type {?} */
        var strValue = '';
        if (document.defaultView && document.defaultView.getComputedStyle) {
            try {
                strValue = document.defaultView.getComputedStyle(element, '').getPropertyValue(strCssRule);
            }
            catch (e) {
                strValue = '0px';
            }
        }
        else if (element.currentStyle) {
            strCssRule = strCssRule.replace(/\-(\w)/g, (/**
             * @param {?} strMatch
             * @param {?} p1
             * @return {?}
             */
            function (strMatch, p1) { return p1.toUpperCase(); }));
            strValue = element.currentStyle[strCssRule];
        }
        return strValue;
    };
    /**
     * @return {?}
     */
    AutoHeightDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.handler = (/**
             * @return {?}
             */
            function () { return _this.recalculateTableSize(); });
            window.addEventListener('resize', _this.handler, { passive: true });
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AutoHeightDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('autoHeight' in changes) {
            this.recalculateTableSize();
        }
    };
    /**
     * @return {?}
     */
    AutoHeightDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        window.removeEventListener('resize', this.handler);
    };
    /**
     * @return {?}
     */
    AutoHeightDirective.prototype.recalculateTableSize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            clearTimeout(_this.taskId);
            _this.taskId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.canCalculated && !_this.isDirtyCheck) {
                    _this.markForCheck();
                }
                if (_this.isDirtyCheck && _this.autoHeight.inViewport) {
                    _this.calculateHeight();
                    _this.recalculatedHeight.emit();
                }
            }), AutoHeightDirective.DELAY);
        }));
    };
    /**
     * @return {?}
     */
    AutoHeightDirective.prototype.calculateHeight = /**
     * @return {?}
     */
    function () {
        if (this.canCalculated) {
            this.setHeightByParent();
        }
    };
    /**
     * @return {?}
     */
    AutoHeightDirective.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        this.isDirtyCheck = true;
        if (this.parentOffsetHeight <= TableBuilderOptionsImpl.ROW_HEIGHT) {
            this.useOnlyAutoViewPort = true;
        }
    };
    /**
     * @private
     * @return {?}
     */
    AutoHeightDirective.prototype.getDefaultHeight = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollbarHeight = this.childElement.offsetHeight - this.childElement.clientHeight || 0;
        return "calc(" + (this.columnHeight + scrollbarHeight + this.headerHeight + this.footerHeight) + "px)";
    };
    /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    AutoHeightDirective.prototype.getHeightByParent = /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom;
        /** @type {?} */
        var viewportHeight = this.parentOffsetHeight - parseInt(AutoHeightDirective.HEAD_TOP);
        return "calc(" + viewportHeight + "px - " + paddingTop + " - " + paddingBottom + ")";
    };
    /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    AutoHeightDirective.prototype.getHeightByViewPort = /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom;
        /** @type {?} */
        var viewportHeight = this.autoViewHeight - parseInt(AutoHeightDirective.HEAD_TOP);
        return this.columnHeight > viewportHeight
            ? "calc(" + viewportHeight + "px - " + paddingTop + " - " + paddingBottom + ")"
            : this.getDefaultHeight();
    };
    /**
     * @private
     * @return {?}
     */
    AutoHeightDirective.prototype.setHeightByParent = /**
     * @private
     * @return {?}
     */
    function () {
        this.currentElement.setAttribute('style', this.style);
    };
    AutoHeightDirective.DEFAULT_VALUE = 0;
    AutoHeightDirective.HEAD_TOP = '10px';
    AutoHeightDirective.DELAY = 100;
    AutoHeightDirective.decorators = [
        { type: Directive, args: [{ selector: '[autoHeight]' },] }
    ];
    /** @nocollapse */
    AutoHeightDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    AutoHeightDirective.propDecorators = {
        headerHeight: [{ type: Input }],
        footerHeight: [{ type: Input }],
        autoHeight: [{ type: Input }],
        recalculatedHeight: [{ type: Output }]
    };
    return AutoHeightDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DeepPathPipe = /** @class */ (function () {
    function DeepPathPipe() {
    }
    /**
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    DeepPathPipe.prototype.transform = /**
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    function (item, path) {
        /** @type {?} */
        var result = getDeepValue(item, path);
        return checkValueIsEmpty(result) ? '-' : result;
    };
    DeepPathPipe.decorators = [
        { type: Pipe, args: [{ name: 'deepPath', pure: true },] }
    ];
    return DeepPathPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DefaultValuePipe = /** @class */ (function () {
    function DefaultValuePipe() {
    }
    /**
     * @param {?} item
     * @param {?} key
     * @return {?}
     */
    DefaultValuePipe.prototype.transform = /**
     * @param {?} item
     * @param {?} key
     * @return {?}
     */
    function (item, key) {
        /** @type {?} */
        var result = item[key];
        return checkValueIsEmpty(result) ? '-' : result;
    };
    DefaultValuePipe.decorators = [
        { type: Pipe, args: [{ name: 'defaultValue', pure: true },] }
    ];
    return DefaultValuePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableCellComponent = /** @class */ (function (_super) {
    __extends(TableCellComponent, _super);
    function TableCellComponent(cd, selection, utils, ngZone) {
        var _this = _super.call(this, selection, utils) || this;
        _this.cd = cd;
        _this.selection = selection;
        _this.utils = utils;
        _this.ngZone = ngZone;
        _this.contextType = ImplicitContext;
        _this.cd.reattach();
        return _this;
    }
    /**
     * @return {?}
     */
    TableCellComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isRendered) {
            this.loaded = true;
        }
        else {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.taskId = window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.loaded = true;
                    detectChanges(_this.cd);
                }), _this.index);
            }));
        }
    };
    /**
     * @return {?}
     */
    TableCellComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        window.clearTimeout(this.taskId);
    };
    TableCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'table-cell',
                    template: "<div #divElement class=\"table-grid__cell--inner-content\" [overflowTooltip]=\"divElement\" [parent]=\"parent\" [class.loaded]=\"loaded\">\r\n    <ng-template [ngIf]=\"columnSchema?.td?.template\" [ngIfElse]=\"defaultTd\">\r\n        <ng-template\r\n            [ngTemplateOutlet]=\"columnSchema?.td?.template\"\r\n            [ngTemplateOutletContext]=\"{\r\n                $implicit:\r\n                    columnSchema?.td?.context === contextType.CELL\r\n                        ? columnSchema?.td?.useDeepPath\r\n                            ? (item | deepPath: columnSchema.key)\r\n                            : (item | defaultValue: columnSchema.key)\r\n                        : item\r\n            }\"\r\n        ></ng-template>\r\n    </ng-template>\r\n    <ng-template #defaultTd>\r\n        <ng-template [ngIf]=\"isFilterable\" [ngIfElse]=\"simple\">\r\n            <ngx-filter-viewer\r\n                [index]=\"index\"\r\n                [key]=\"columnSchema.key\"\r\n                [text]=\"\r\n                    columnSchema?.td?.useDeepPath\r\n                        ? (item | deepPath: columnSchema.key)\r\n                        : (item | defaultValue: columnSchema.key)\r\n                \"\r\n            ></ngx-filter-viewer>\r\n        </ng-template>\r\n        <ng-template #simple>{{\r\n            columnSchema?.td?.useDeepPath\r\n                ? (item | deepPath: columnSchema.key)\r\n                : (item | defaultValue: columnSchema.key)\r\n        }}</ng-template>\r\n    </ng-template>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    TableCellComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: SelectionService },
        { type: UtilsService },
        { type: NgZone }
    ]; };
    TableCellComponent.propDecorators = {
        item: [{ type: Input }],
        index: [{ type: Input }],
        parent: [{ type: Input }],
        isFilterable: [{ type: Input, args: ['is-filterable',] }]
    };
    return TableCellComponent;
}(TableLineRow));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ObserverViewDirective = /** @class */ (function () {
    function ObserverViewDirective(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.observeVisible = new EventEmitter();
        this.observer = null;
        this.previousRation = 0.0;
    }
    /**
     * @return {?}
     */
    ObserverViewDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.observer = new IntersectionObserver((/**
         * @param {?} entries
         * @return {?}
         */
        function (entries) {
            entries.forEach((/**
             * @param {?} entry
             * @return {?}
             */
            function (entry) {
                _this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var isVisible = entry.intersectionRatio > _this.previousRation || entry.isIntersecting;
                    if (_this.isRendered) {
                        clearTimeout(_this.frameId);
                        _this.frameId = window.setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            _this.observeVisible.emit(isVisible);
                        }), ObserverViewDirective.MIN_TIME_IDLE);
                    }
                    else {
                        window.requestAnimationFrame((/**
                         * @return {?}
                         */
                        function () { return _this.observeVisible.emit(isVisible); }));
                    }
                }));
                _this.previousRation = entry.intersectionRatio;
            }));
        }), {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: [0]
        });
        this.observer.observe(this.element.nativeElement);
    };
    /**
     * @return {?}
     */
    ObserverViewDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.element = { nativeElement: null };
        clearTimeout(this.frameId);
        this.observer.disconnect();
    };
    ObserverViewDirective.MIN_TIME_IDLE = 120;
    ObserverViewDirective.decorators = [
        { type: Directive, args: [{ selector: '[observerView]' },] }
    ];
    /** @nocollapse */
    ObserverViewDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    ObserverViewDirective.propDecorators = {
        observeVisible: [{ type: Output }],
        isRendered: [{ type: Input, args: ['rendered',] }]
    };
    return ObserverViewDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxContextMenuItemComponent = /** @class */ (function () {
    function NgxContextMenuItemComponent(contextMenu, cd, utils, ngZone) {
        this.contextMenu = contextMenu;
        this.cd = cd;
        this.utils = utils;
        this.ngZone = ngZone;
        this.visible = true;
        this.contextTitle = null;
        this.disable = false;
        this.divider = false;
        this.disableSubMenu = false;
        this.subMenuWidth = 300;
        this.onClick = new EventEmitter();
        this.offsetX = null;
        this.offsetY = null;
    }
    Object.defineProperty(NgxContextMenuItemComponent.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this.contextMenu.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxContextMenuItemComponent.prototype, "clientRect", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.itemElement.getBoundingClientRect && this.itemElement.getBoundingClientRect()) || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxContextMenuItemComponent.prototype, "itemElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (this.itemRef && this.itemRef.nativeElement) || {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.contextMenu.events.subscribe((/**
         * @return {?}
         */
        function () { return detectChanges(_this.cd); }));
    };
    /**
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.itemRef = null;
        this.subscription.unsubscribe();
    };
    /**
     * @param {?} ref
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.calculateSubMenuPosition = /**
     * @param {?} ref
     * @return {?}
     */
    function (ref) {
        /** @type {?} */
        var contentExist = ref.innerHTML.trim().length !== 0;
        if (contentExist) {
            this.offsetX = this.clientRect.left + this.subMenuWidth - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetX = this.offsetX - this.overflowX();
            this.offsetY = this.clientRect.top - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetY = this.offsetY - this.overflowY(ref);
        }
    };
    /**
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.overflowX = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overflowX = this.subMenuWidth + this.offsetX - this.utils.bodyRect.width;
        return overflowX > 0 ? overflowX + UtilsService.SCROLLBAR_WIDTH : 0;
    };
    /**
     * @param {?} ref
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.overflowY = /**
     * @param {?} ref
     * @return {?}
     */
    function (ref) {
        /** @type {?} */
        var overflowY = ref.offsetHeight + this.offsetY - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + UtilsService.SCROLLBAR_WIDTH : 0;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.emitClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.disable) {
            this.deferCloseMenu();
            this.onClick.emit({
                preventDefault: (/**
                 * @return {?}
                 */
                function () {
                    window.clearTimeout(_this.taskId);
                })
            });
            event.stopPropagation();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.deferCloseMenu = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.taskId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.contextMenu.close();
            }));
        }));
    };
    NgxContextMenuItemComponent.MIN_PADDING = 25;
    NgxContextMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-context-menu-item',
                    template: "<ng-template [ngIf]=\"visible\">\n    <div\n        #item\n        class=\"context-menu__item\"\n        (mouseenter)=\"calculateSubMenuPosition(ref)\"\n        [class.context-menu__title]=\"contextTitle !== null\"\n        [class.context-menu__item--disable]=\"disable\"\n        (click)=\"emitClick($event)\"\n    >\n        <ng-content select=\"ngx-menu-content\"></ng-content>\n\n        <div\n            class=\"context-menu__sub-menu-place\"\n            [class.context-menu__sub-hidden]=\"ref.innerHTML.trim().length === 0 || disableSubMenu !== false\"\n        >\n            <img\n                class=\"sub-menu__arrow-icon\"\n                src='data:image/svg+xml;utf8,<svg height=\"48\" viewBox=\"0 0 48 48\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z\"/><path d=\"M0-.25h48v48h-48z\" fill=\"none\"/></svg>'\n                alt=\"arrow\"\n            />\n\n            <div\n                class=\"sub-menu__tree\"\n                [style.width.px]=\"subMenuWidth\"\n                [style.left.px]=\"offsetX\"\n                [style.top.px]=\"offsetY\"\n            >\n                <div class=\"sub-menu__tree--content\" #ref>\n                    <ng-content select=\"ngx-context-menu-item\"></ng-content>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <ng-template [ngIf]=\"divider !== false\">\n        <ngx-context-menu-divider></ngx-context-menu-divider>\n    </ng-template>\n</ng-template>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    NgxContextMenuItemComponent.ctorParameters = function () { return [
        { type: ContextMenuService },
        { type: ChangeDetectorRef },
        { type: UtilsService },
        { type: NgZone }
    ]; };
    NgxContextMenuItemComponent.propDecorators = {
        visible: [{ type: Input }],
        contextTitle: [{ type: Input }],
        disable: [{ type: Input }],
        divider: [{ type: Input }],
        disableSubMenu: [{ type: Input, args: ['disable-sub-menu',] }],
        subMenuWidth: [{ type: Input, args: ['sub-menu-width',] }],
        onClick: [{ type: Output }],
        itemRef: [{ type: ViewChild, args: ['item', { static: false },] }]
    };
    return NgxContextMenuItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxContextMenuDividerComponent = /** @class */ (function () {
    function NgxContextMenuDividerComponent() {
    }
    NgxContextMenuDividerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-context-menu-divider',
                    template: '<div class="context-menu__divider"></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return NgxContextMenuDividerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMenuContentComponent = /** @class */ (function () {
    function NgxMenuContentComponent() {
        this.icon = null;
        this.noMargin = null;
        this.alignCenter = null;
    }
    Object.defineProperty(NgxMenuContentComponent.prototype, "class", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var cssClasses = "" + (this.noMargin !== null ? 'content-phrase' : '');
            return this.icon !== null ? "icon-place " + cssClasses : cssClasses;
        },
        enumerable: true,
        configurable: true
    });
    NgxMenuContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-menu-content',
                    template: "<div [class.context-menu__content-place]=\"icon === null\" [class.context-menu__icon-place]=\"icon !== null\">\n    <div class=\"content\" [class.align-center]=\"alignCenter !== null\">\n        <ng-template [ngIf]=\"icon?.length > 0\" [ngIfElse]=\"content\">\n            <img [attr.src]=\"icon\" alt=\"img\" />\n        </ng-template>\n        <ng-template #content>\n            <ng-content></ng-content>\n        </ng-template>\n    </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    NgxMenuContentComponent.propDecorators = {
        icon: [{ type: Input }],
        noMargin: [{ type: Input, args: ['no-margin',] }],
        alignCenter: [{ type: Input, args: ['align-center',] }],
        class: [{ type: HostBinding, args: ['class',] }]
    };
    return NgxMenuContentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxEmptyComponent = /** @class */ (function () {
    function NgxEmptyComponent() {
    }
    NgxEmptyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-empty',
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return NgxEmptyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TIME_RELOAD$1 = TableBuilderOptionsImpl.TIME_RELOAD;
var NgxFilterViewerComponent = /** @class */ (function () {
    function NgxFilterViewerComponent(ngZone, cd, sanitizer, filterable) {
        this.ngZone = ngZone;
        this.cd = cd;
        this.sanitizer = sanitizer;
        this.filterable = filterable;
        this.text = null;
        this.key = null;
        this.index = 0;
        this.founded = false;
        this.cd.reattach();
    }
    /**
     * @private
     * @param {?} finder
     * @return {?}
     */
    NgxFilterViewerComponent.wrapSelectedHtml = /**
     * @private
     * @param {?} finder
     * @return {?}
     */
    function (finder) {
        return "<span style=\"background-color: #FFFF00; color: #000\">" + finder + "</span>";
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['text'] && changes['text'].firstChange) {
            this.defaultHtmlValue();
        }
    };
    /**
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.filterable.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.filterable.definition[_this.key] || _this.filterable.globalFilterValue) {
                _this.changeSelection(event);
            }
            else {
                _this.defaultHtmlValue();
            }
            detectChanges(_this.cd);
        }));
    };
    /**
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.changeSelection = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.clearInterval(_this.taskId);
            _this.taskId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                if (event.value || _this.filterable.definition[_this.key]) {
                    _this.selected(event);
                }
                else {
                    _this.defaultHtmlValue();
                }
                detectChanges(_this.cd);
            }), TIME_RELOAD$1 + _this.index);
        }));
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.selected = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = this.filterable.definition[this.key] || event.value;
        /** @type {?} */
        var type = this.filterable.definition[this.key]
            ? this.filterable.filterTypeDefinition[this.key]
            : event.type;
        if (type === TableFilterType.DOES_NOT_EQUAL || type === TableFilterType.DOES_NOT_CONTAIN) {
            return;
        }
        /** @type {?} */
        var regexp;
        /** @type {?} */
        var escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (type === TableFilterType.START_WITH) {
            regexp = new RegExp("^" + escapedValue, 'i');
        }
        else if (type === TableFilterType.END_WITH) {
            regexp = new RegExp(escapedValue + "$", 'i');
        }
        else if (type === TableFilterType.EQUALS) {
            regexp = new RegExp("^" + escapedValue + "$", 'i');
        }
        else {
            regexp = new RegExp("" + escapedValue, 'ig');
        }
        /** @type {?} */
        var trustedHtml = String(this.text).replace(regexp, (/**
         * @param {?} finder
         * @return {?}
         */
        function (finder) {
            return NgxFilterViewerComponent.wrapSelectedHtml(finder);
        }));
        this.html = this.sanitizer.bypassSecurityTrustHtml(trustedHtml);
        if (trustedHtml.includes('span')) {
            this.founded = true;
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.defaultHtmlValue = /**
     * @private
     * @return {?}
     */
    function () {
        this.html = this.text;
        this.founded = false;
    };
    NgxFilterViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-filter-viewer',
                    template: '<span [class.filter-founded]="founded" [innerHTML]="html"></span>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    NgxFilterViewerComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: FilterableService }
    ]; };
    NgxFilterViewerComponent.propDecorators = {
        text: [{ type: Input }],
        key: [{ type: Input }],
        index: [{ type: Input }]
    };
    return NgxFilterViewerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DragIconComponent = /** @class */ (function () {
    function DragIconComponent() {
    }
    DragIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'drag-icon',
                    template: "<img\n    class=\"table-grid-icon--draggable\"\n    src='data:image/svg+xml;utf8,<svg height=\"32px\" id=\"Layer_1\" style=\"enable-background:new 0 0 32 32;\" version=\"1.1\" viewBox=\"0 0 32 32\" width=\"32px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M31.338,14.538L27.38,10.58C26.994,10.193,26.531,10,26,10c-1.188,0-2,1.016-2,2c0,0.516,0.186,0.986,0.58,1.38L25.2,14H18  V6.8l0.62,0.62C19.014,7.814,19.484,8,20,8c0.984,0,2-0.813,2-2c0-0.531-0.193-0.994-0.58-1.38l-3.973-3.974  C17.08,0.279,16.729,0,16,0s-1.135,0.334-1.463,0.662L10.58,4.62C10.193,5.006,10,5.469,10,6c0,1.188,1.016,2,2,2  c0.516,0,0.986-0.186,1.38-0.58L14,6.8V14H6.8l0.62-0.62C7.814,12.986,8,12.516,8,12c0-0.984-0.813-2-2-2  c-0.531,0-0.994,0.193-1.38,0.58l-3.958,3.958C0.334,14.866,0,15.271,0,16s0.279,1.08,0.646,1.447L4.62,21.42  C5.006,21.807,5.469,22,6,22c1.188,0,2-1.016,2-2c0-0.516-0.186-0.986-0.58-1.38L6.8,18H14v7.2l-0.62-0.62  C12.986,24.186,12.516,24,12,24c-0.984,0-2,0.813-2,2c0,0.531,0.193,0.994,0.58,1.38l3.957,3.958C14.865,31.666,15.271,32,16,32  s1.08-0.279,1.447-0.646l3.973-3.974C21.807,26.994,22,26.531,22,26c0-1.188-1.016-2-2-2c-0.516,0-0.986,0.186-1.38,0.58L18,25.2V18  h7.2l-0.62,0.62C24.186,19.014,24,19.484,24,20c0,0.984,0.813,2,2,2c0.531,0,0.994-0.193,1.38-0.58l3.974-3.973  C31.721,17.08,32,16.729,32,16S31.666,14.866,31.338,14.538z\"/></svg>'\n    alt=\"sort\"\n/>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    return DragIconComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxSourceNullComponent = /** @class */ (function () {
    function NgxSourceNullComponent() {
    }
    NgxSourceNullComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-source-null',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    return NgxSourceNullComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OverflowTooltipDirective = /** @class */ (function () {
    function OverflowTooltipDirective(ngZone) {
        this.ngZone = ngZone;
        this.element = null;
        this.parent = null;
        this.textCenter = null;
        this.destroy$ = new Subject();
        /**
         * Minimal time before show tooltip
         */
        this.timeIdle = 500;
        this.overflowSelector = 'table-grid__cell-overflow-content';
        this.frameId = null;
    }
    Object.defineProperty(OverflowTooltipDirective.prototype, "overflowContentElem", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return document.querySelector("." + this.overflowSelector);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} element
     * @param {?} parent
     * @return {?}
     */
    OverflowTooltipDirective.checkOverflow = /**
     * @private
     * @param {?} element
     * @param {?} parent
     * @return {?}
     */
    function (element, parent) {
        return (element.offsetWidth > parent.offsetWidth ||
            element.offsetHeight > parent.offsetHeight ||
            element.scrollWidth > element.offsetWidth ||
            element.scrollHeight > element.offsetHeight);
    };
    /**
     * @return {?}
     */
    OverflowTooltipDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        fromEvent(this.element, 'mouseenter')
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.detectCheckOverflow(); }));
        fromEvent(this.element, 'mouseleave')
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        function () {
            clearInterval(_this.frameId);
        }));
    };
    /**
     * fix problem with memory leak
     */
    /**
     * fix problem with memory leak
     * @return {?}
     */
    OverflowTooltipDirective.prototype.ngOnDestroy = /**
     * fix problem with memory leak
     * @return {?}
     */
    function () {
        clearInterval(this.frameId);
        this.removeElement();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.ngZone = null;
        this.element = null;
        this.parent = null;
        this.destroy$ = null;
    };
    /**
     * @private
     * @return {?}
     */
    OverflowTooltipDirective.prototype.detectCheckOverflow = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        clearInterval(this.frameId);
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.frameId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var isOverflow = OverflowTooltipDirective.checkOverflow(_this.element, _this.parent);
                if (isOverflow) {
                    _this.showTooltip();
                }
            }), _this.timeIdle);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    OverflowTooltipDirective.prototype.showTooltip = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.overflowContentElem) {
            this.removeElement();
            return;
        }
        /** @type {?} */
        var elem = document.createElement('div');
        /** @type {?} */
        var rect = this.element.getBoundingClientRect();
        elem.classList.add(this.overflowSelector);
        if (this.textCenter) {
            elem.classList.add('text-center');
        }
        elem.style.cssText = "left: " + rect.left + "px; top: " + rect.top + "px";
        document.body.appendChild(elem);
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.overflowContentElem) {
                    _this.overflowContentElem.classList.add('visible');
                    _this.overflowContentElem.innerHTML = _this.element.innerHTML.trim().replace(/<!--.*?-->/g, '');
                    fromEvent(_this.overflowContentElem, 'mouseleave')
                        .pipe(takeUntil(_this.destroy$))
                        .subscribe((/**
                     * @return {?}
                     */
                    function () { return _this.removeElement(); }));
                }
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    OverflowTooltipDirective.prototype.removeElement = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.overflowContentElem) {
            this.overflowContentElem.parentNode.removeChild(this.overflowContentElem);
        }
    };
    OverflowTooltipDirective.decorators = [
        { type: Directive, args: [{ selector: '[overflowTooltip]' },] }
    ];
    /** @nocollapse */
    OverflowTooltipDirective.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    OverflowTooltipDirective.propDecorators = {
        element: [{ type: Input, args: ['overflowTooltip',] }],
        parent: [{ type: Input, args: ['parent',] }],
        textCenter: [{ type: Input, args: ['text-center',] }]
    };
    return OverflowTooltipDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableBuilderModule = /** @class */ (function () {
    function TableBuilderModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    TableBuilderModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: TableBuilderModule,
            providers: [
                {
                    provide: TableBuilderModule.ROOT_OPTIONS,
                    useValue: config
                },
                {
                    provide: NGX_TABLE_OPTIONS,
                    useFactory: TableBuilderModule.loggerConfigFactory,
                    deps: [TableBuilderModule.ROOT_OPTIONS]
                }
            ]
        };
    };
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    TableBuilderModule.loggerConfigFactory = /**
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return Object.assign(new TableBuilderOptionsImpl(), config);
    };
    TableBuilderModule.ROOT_OPTIONS = new InjectionToken('NGX_TABLE_OPTIONS');
    TableBuilderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, VirtualScrollerModule, DragDropModule],
                    declarations: [
                        TableBuilderComponent,
                        WheelThrottlingDirective,
                        AutoHeightDirective,
                        TableTheadComponent,
                        TableTbodyComponent,
                        NgxColumnComponent,
                        TemplateHeadThDirective,
                        TemplateBodyTdDirective,
                        DeepPathPipe,
                        DefaultValuePipe,
                        NgxOptionsComponent,
                        TableCellComponent,
                        ObserverViewDirective,
                        NgxContextMenuComponent,
                        NgxContextMenuItemComponent,
                        NgxContextMenuDividerComponent,
                        NgxMenuContentComponent,
                        NgxEmptyComponent,
                        NgxHeaderComponent,
                        NgxFooterComponent,
                        NgxFilterViewerComponent,
                        NgxFilterComponent,
                        NgxFilterDirective,
                        DragIconComponent,
                        NgxSourceNullComponent,
                        OverflowTooltipDirective
                    ],
                    providers: [UtilsService, WebWorkerThreadService],
                    exports: [
                        TableBuilderComponent,
                        TemplateHeadThDirective,
                        TemplateBodyTdDirective,
                        NgxColumnComponent,
                        NgxOptionsComponent,
                        NgxContextMenuComponent,
                        NgxContextMenuItemComponent,
                        NgxContextMenuDividerComponent,
                        NgxMenuContentComponent,
                        NgxEmptyComponent,
                        NgxHeaderComponent,
                        NgxFooterComponent,
                        NgxFilterViewerComponent,
                        NgxFilterComponent,
                        NgxFilterDirective,
                        NgxSourceNullComponent
                    ]
                },] }
    ];
    return TableBuilderModule;
}());

export { ImplicitContext, NgxColumnComponent, NgxTableViewChangesService, TableBuilderComponent, TableBuilderModule, TableFilterType, shallowUpdateRow, TableBuilderApiImpl as ɵa, NgxOptionsComponent as ɵb, NGX_TABLE_OPTIONS as ɵba, TableBuilderOptionsImpl as ɵbb, AutoHeightDirective as ɵbc, TableTheadComponent as ɵbd, TableLineRow as ɵbe, TableTbodyComponent as ɵbf, DeepPathPipe as ɵbg, DefaultValuePipe as ɵbh, TableCellComponent as ɵbi, ObserverViewDirective as ɵbj, NgxContextMenuItemComponent as ɵbk, NgxContextMenuDividerComponent as ɵbl, NgxMenuContentComponent as ɵbm, NgxEmptyComponent as ɵbn, NgxFilterViewerComponent as ɵbo, DragIconComponent as ɵbp, NgxSourceNullComponent as ɵbq, OverflowTooltipDirective as ɵbr, ColumnOptions as ɵc, TemplateHeadThDirective as ɵd, TemplateCellCommon as ɵe, TemplateBodyTdDirective as ɵf, NgxContextMenuComponent as ɵg, ModalViewLayer as ɵh, UtilsService as ɵi, checkValueIsEmpty as ɵj, ContextMenuService as ɵk, NgxHeaderComponent as ɵl, TableContent as ɵm, NgxFooterComponent as ɵn, NgxFilterComponent as ɵo, NgxFilterDirective as ɵp, FilterableService as ɵq, WebWorkerThreadService as ɵr, TemplateParserService as ɵs, SortableService as ɵt, SelectionService as ɵu, ResizableService as ɵv, DraggableService as ɵw, OverloadScrollService as ɵx, NGX_ANIMATION as ɵy, WheelThrottlingDirective as ɵz };
//# sourceMappingURL=table-builder.js.map
