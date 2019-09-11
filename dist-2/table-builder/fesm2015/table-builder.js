import { InjectionToken, Injectable, NgZone, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ApplicationRef, Input, ViewChild, EventEmitter, Output, Directive, TemplateRef, ContentChild, ContentChildren, ɵɵdefineInjectable, Inject, ElementRef, Pipe, HostBinding, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';
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
    /** @type {?} */
    const index = data.indexOf(row);
    return [...data.slice(0, index), Object.assign({}, data[index], { [key]: value }), ...data.slice(index + 1, data.length)];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ImplicitContext = {
    ROW: 'ROW',
    CELL: 'CELL',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGX_TABLE_OPTIONS = new InjectionToken('NGX_TABLE_OPTIONS');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const PrimaryKey = {
    ID: 'id',
};
/** @enum {string} */
const TableSimpleChanges = {
    SOURCE_KEY: 'source',
    SCHEMA_COLUMNS: 'schemaColumns',
};
/** @enum {string} */
const KeyType = {
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextMenuState {
    /**
     * @param {?=} state
     */
    constructor(state = null) {
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
}

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
    const parts = path.split('.');
    /** @type {?} */
    let result = obj;
    /** @type {?} */
    let index = 0;
    for (; result && index < parts.length; ++index) {
        result = result[parts[index]];
    }
    return result;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContextMenuService {
    constructor() {
        this.state = {};
        this.events = new Subject();
    }
    /**
     * @param {?} event
     * @param {?=} key
     * @param {?=} row
     * @return {?}
     */
    openContextMenu(event, key = null, row = null) {
        this.state = new ContextMenuState({
            key,
            item: row,
            opened: true,
            value: getDeepValue(row, key) || null,
            position: { left: event.clientX, top: event.clientY }
        });
        this.events.next();
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    close() {
        this.state = new ContextMenuState();
        this.events.next();
    }
}
ContextMenuService.decorators = [
    { type: Injectable }
];

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
class UtilsService {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
    }
    /**
     * @return {?}
     */
    get bodyRect() {
        return document.querySelector('body').getBoundingClientRect();
    }
    /**
     * @private
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    static replaceUndefinedOrNull(_, value) {
        return checkValueIsEmpty(value) ? undefined : value;
    }
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    clone(obj) {
        return JSON.parse(JSON.stringify(obj || null)) || {};
    }
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    isObject(obj) {
        return obj === Object(obj);
    }
    /**
     * @template T
     * @param {?} target
     * @param {?} source
     * @return {?}
     */
    mergeDeep(target, source) {
        /** @type {?} */
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    }
                    else {
                        output[key] = this.mergeDeep(target[key], source[key]);
                    }
                }
                else {
                    Object.assign(output, { [key]: source[key] });
                }
            }));
        }
        return output;
    }
    /**
     * @param {?} row
     * @param {?=} parentKey
     * @param {?=} keys
     * @return {?}
     */
    flattenKeysByRow(row, parentKey = null, keys = []) {
        for (const key in row) {
            if (!row.hasOwnProperty(key)) {
                continue;
            }
            /** @type {?} */
            const element = row[key];
            /** @type {?} */
            const isObject = typeof element === 'object' && element !== null && !Array.isArray(element);
            if (isObject) {
                /** @type {?} */
                const implicitKey = parentKey ? `${parentKey}.${key}` : key;
                this.flattenKeysByRow(row[key], implicitKey, keys);
            }
            else {
                keys.push(parentKey ? `${parentKey}.${key}` : key);
            }
        }
        return keys;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    clean(obj) {
        return JSON.parse(JSON.stringify(obj, UtilsService.replaceUndefinedOrNull.bind(this)));
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    requestAnimationFrame(callback) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                window.requestAnimationFrame((/**
                 * @return {?}
                 */
                () => {
                    callback();
                    resolve();
                }));
            }));
        }));
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    microtask(callback) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            callback();
            resolve();
        }));
    }
    /**
     * @param {?} callback
     * @param {?=} time
     * @return {?}
     */
    macrotask(callback, time = 0) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    callback();
                    resolve();
                }), time);
            }));
        }));
    }
}
UtilsService.SCROLLBAR_WIDTH = 10;
UtilsService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
UtilsService.ctorParameters = () => [
    { type: NgZone }
];

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
class ModalViewLayer {
    /**
     * @protected
     * @param {?} cd
     * @param {?} app
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(cd, app, utils, ngZone) {
        this.cd = cd;
        this.app = app;
        this.utils = utils;
        this.ngZone = ngZone;
        this.width = null;
        this.height = null;
        this.isViewed = false;
        this.subscription = null;
    }
    /**
     * @return {?}
     */
    get left() {
        return (this.state.position && this.state.position.left) || 0;
    }
    /**
     * @return {?}
     */
    get top() {
        return (this.state.position && this.state.position.top) || 0;
    }
    /**
     * @return {?}
     */
    get overflowX() {
        /** @type {?} */
        const overflowX = this.width + this.left - this.utils.bodyRect.width;
        return overflowX > 0 ? overflowX + UtilsService.SCROLLBAR_WIDTH : 0;
    }
    /**
     * @return {?}
     */
    get overflowY() {
        /** @type {?} */
        const overflowY = this.height + this.top - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + UtilsService.SCROLLBAR_WIDTH : 0;
    }
    /**
     * @return {?}
     */
    updateView() {
        this.cd.detectChanges();
        this.app.tick();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeEventListener();
        this.subscription.unsubscribe();
    }
    /**
     * @protected
     * @return {?}
     */
    update() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.setTimeout((/**
             * @return {?}
             */
            () => {
                this.isViewed = this.state.opened;
                this.updateView();
                if (this.state.opened) {
                    this.removeEventListener();
                    this.preventClose();
                    this.listenInsideClick();
                }
                window.setTimeout((/**
                 * @return {?}
                 */
                () => this.updateView()));
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    listenInsideClick() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.clickListener = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                try {
                    /** @type {?} */
                    const origin = this.targetElement.nativeElement;
                    /** @type {?} */
                    const target = (/** @type {?} */ (event.target));
                    if (!origin.contains(target)) {
                        this.removeListener(event);
                        this.taskId = window.setTimeout((/**
                         * @return {?}
                         */
                        () => this.removeListener(event)), this.closeTime);
                    }
                }
                catch (e) {
                    this.removeEventListener();
                }
            });
            window.addEventListener('mousedown', this.clickListener, true);
        }));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    removeListener(event) {
        this.removeEventListener();
        this.close(event);
        detectChanges(this.cd);
    }
    /**
     * @private
     * @return {?}
     */
    removeEventListener() {
        window.removeEventListener('mousedown', this.clickListener, true);
    }
    /**
     * @return {?}
     */
    preventClose() {
        window.clearTimeout(this.taskId);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
class NgxContextMenuComponent extends ModalViewLayer {
    /**
     * @param {?} contextMenu
     * @param {?} cd
     * @param {?} app
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(contextMenu, cd, app, utils, ngZone) {
        super(cd, app, utils, ngZone);
        this.contextMenu = contextMenu;
        this.cd = cd;
        this.app = app;
        this.utils = utils;
        this.ngZone = ngZone;
        this.width = 300;
        this.height = 300;
        this.maxHeight = 400;
        this.closeTime = 0;
    }
    /**
     * @return {?}
     */
    get state() {
        return this.contextMenu.state;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.contextMenu.events.subscribe((/**
         * @return {?}
         */
        () => this.update()));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    close(event) {
        this.contextMenu.close();
        event.preventDefault();
    }
}
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
NgxContextMenuComponent.ctorParameters = () => [
    { type: ContextMenuService },
    { type: ChangeDetectorRef },
    { type: ApplicationRef },
    { type: UtilsService },
    { type: NgZone }
];
NgxContextMenuComponent.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }],
    maxHeight: [{ type: Input, args: ['max-height',] }],
    targetElement: [{ type: ViewChild, args: ['targetElement', { static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const TableFilterType = {
    START_WITH: 'START_WITH',
    END_WITH: 'END_WITH',
    CONTAINS: 'CONTAINS',
    DOES_NOT_CONTAIN: 'DOES_NOT_CONTAIN',
    EQUALS: 'EQUALS',
    DOES_NOT_EQUAL: 'DOES_NOT_EQUAL',
};
class FilterStateEvent {
    constructor() {
        this.key = null;
        this.opened = null;
        this.position = { left: null, top: null };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ColumnOptions {
    constructor() {
        this.nowrap = null;
        this.width = null;
        this.resizable = null;
        this.sortable = null;
        this.filterable = null;
        this.draggable = null;
        this.filterType = null;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxOptionsComponent extends ColumnOptions {
}
NgxOptionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-options',
                template: "",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class TemplateCellCommon {
    /**
     * @protected
     * @param {?} template
     */
    constructor(template) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TemplateHeadThDirective extends TemplateCellCommon {
    /**
     * @param {?} template
     */
    constructor(template) {
        super(template);
        this.template = template;
        this.type = null;
        this.nowrap = false;
        this.bold = true;
    }
}
TemplateHeadThDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngx-th]' },] }
];
/** @nocollapse */
TemplateHeadThDirective.ctorParameters = () => [
    { type: TemplateRef }
];
TemplateHeadThDirective.propDecorators = {
    type: [{ type: Input, args: ['ngx-th',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TemplateBodyTdDirective extends TemplateCellCommon {
    /**
     * @param {?} template
     */
    constructor(template) {
        super(template);
        this.template = template;
        this.type = null;
    }
}
TemplateBodyTdDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngx-td]' },] }
];
/** @nocollapse */
TemplateBodyTdDirective.ctorParameters = () => [
    { type: TemplateRef }
];
TemplateBodyTdDirective.propDecorators = {
    type: [{ type: Input, args: ['ngx-td',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxColumnComponent extends ColumnOptions {
    constructor() {
        super(...arguments);
        this.key = null;
        this.stickyLeft = false;
        this.emptyHead = null;
        this.headTitle = null;
        this.customKey = false;
        this.importantTemplate = false;
        this.stickyRight = false;
        this.verticalLine = false;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    withKey(key) {
        this.key = key;
        return this;
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableBuilderOptionsImpl {
    constructor() {
        this.wheelMaxDelta = 300;
        this.bufferAmount = 0;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableContent {
    constructor() {
        this.height = TableBuilderOptionsImpl.ROW_HEIGHT;
        this.contentCell = null;
        this.alignCenter = null;
        this.cssClasses = null;
        this.bold = null;
    }
}
TableContent.propDecorators = {
    height: [{ type: Input }],
    contentCell: [{ type: Input, args: ['content-cell',] }],
    alignCenter: [{ type: Input, args: ['align-center',] }],
    cssClasses: [{ type: Input, args: ['css-class',] }],
    bold: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxHeaderComponent extends TableContent {
}
NgxHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-header',
                template: "<div\r\n    class=\"table-grid__table-content-place\"\r\n    [class.table-grid__table-content-place--content-cell]=\"contentCell !== null\"\r\n    [class.table-grid__table-content-place--align-center]=\"alignCenter !== null\"\r\n    [class.table-grid__table-content-place--bold]=\"bold !== null\"\r\n    [style.height.px]=\"height\"\r\n>\r\n    <div [ngClass]=\"cssClasses\" [class.content-box]=\"contentCell !== null\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxFooterComponent extends TableContent {
}
NgxFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-footer',
                template: "<div\n    class=\"table-grid__table-content-place\"\n    [class.table-grid__table-content-place--content-cell]=\"contentCell !== null\"\n    [class.table-grid__table-content-place--align-center]=\"alignCenter !== null\"\n    [class.table-grid__table-content-place--bold]=\"bold !== null\"\n    [style.height.px]=\"height\"\n>\n    <div [class.content-box]=\"contentCell !== null\">\n        <ng-content></ng-content>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebWorkerThreadService {
    constructor() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    static createWorkerUrl(resolve) {
        /** @type {?} */
        const resolveString = resolve.toString();
        /** @type {?} */
        const webWorkerTemplate = `
            self.addEventListener('message', function(e) {
                postMessage((${resolveString})(e.data));
            });
        `;
        /** @type {?} */
        const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    }
    /**
     * @template T, K
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    run(workerFunction, data) {
        /** @type {?} */
        const url = this.getOrCreateWorkerUrl(workerFunction);
        return this.runUrl(url, data);
    }
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    runUrl(url, data) {
        /** @type {?} */
        const worker = new Worker(url);
        /** @type {?} */
        const promise = this.createPromiseForWorker(worker, data);
        /** @type {?} */
        const promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    }
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    terminate(promise) {
        return this.removePromise(promise);
    }
    /**
     * @param {?} promise
     * @return {?}
     */
    getWorker(promise) {
        return this.promiseToWorkerMap.get(promise);
    }
    /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    createPromiseForWorker(worker, data) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            worker.addEventListener('message', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => resolve(event.data)));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        }));
    }
    /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    getOrCreateWorkerUrl(fn) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            /** @type {?} */
            const url = WebWorkerThreadService.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    }
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    createPromiseCleaner(promise) {
        return (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.removePromise(promise);
            return event;
        });
    }
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    removePromise(promise) {
        /** @type {?} */
        const worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    }
}
WebWorkerThreadService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} __0
 * @return {?}
 */
function filterAllWorker({ source, global, types, columns }) {
    /** @enum {number} */
    const Terminate = {
        CONTINUE: -1,
        BREAK: 0,
        NEXT: 1,
    };
    Terminate[Terminate.CONTINUE] = 'CONTINUE';
    Terminate[Terminate.BREAK] = 'BREAK';
    Terminate[Terminate.NEXT] = 'NEXT';
    const { value, type } = global;
    /** @type {?} */
    let result = source;
    if (value) {
        result = source.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            return type === types.DOES_NOT_CONTAIN ? !includes(JSON.stringify(item), value) : globalFilter(item);
        }));
    }
    if (!columns.isEmpty) {
        result = result.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => multipleFilter(item)));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function globalFilter(item) {
        /** @type {?} */
        let satisfiesItem = false;
        /** @type {?} */
        const flattenedItem = flatten(item);
        for (const keyModel of Object.keys(flattenedItem)) {
            /** @type {?} */
            const fieldValue = String(flattenedItem[keyModel]);
            const [terminate, satisfies] = getSatisfies(fieldValue, value, type);
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
        return satisfiesItem;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function multipleFilter(item) {
        /** @type {?} */
        let matches = true;
        for (const fieldKey of Object.keys(columns.values)) {
            /** @type {?} */
            const fieldValue = String(getValueByPath(item, fieldKey) || '').trim();
            /** @type {?} */
            const findKeyValue = String(columns.values[fieldKey]);
            /** @type {?} */
            const fieldType = columns.types[fieldKey];
            const [terminate, satisfies] = getSatisfies(fieldValue, findKeyValue, fieldType);
            matches = matches && satisfies;
            if (!matches || terminate === Terminate.BREAK) {
                break;
            }
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
        let satisfies = false;
        /** @type {?} */
        let terminate = Terminate.NEXT;
        if (fieldType === types.START_WITH) {
            satisfies = field.toLocaleLowerCase().startsWith(substring.toLocaleLowerCase());
        }
        else if (fieldType === types.END_WITH) {
            /** @type {?} */
            const regexp = new RegExp(`${escaped(substring)}$`);
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
    function flatten(object, excludeKeys = []) {
        /** @type {?} */
        const depthGraph = {};
        for (const key in object) {
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
        (str, key) => str && str[key]), object) : object;
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
        const isObject = typeof object[key] === 'object' && object[key] !== null;
        if (isObject) {
            /** @type {?} */
            const flatObject = flatten(object[key]);
            for (const path in flatObject) {
                if (flatObject.hasOwnProperty(path)) {
                    depthGraph[`${key}.${path}`] = flatObject[path];
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
const { TIME_IDLE } = TableBuilderOptionsImpl;
class FilterableService {
    /**
     * @param {?} thread
     * @param {?} utils
     * @param {?} ngZone
     * @param {?} app
     */
    constructor(thread, utils, ngZone, app) {
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
    /**
     * @return {?}
     */
    get globalFilterValue() {
        return this.filterValue ? String(this.filterValue).trim() : null;
    }
    /**
     * @return {?}
     */
    changeFilteringStatus() {
        this.filtering = this.filterValueExist;
        if (this.filtering !== this.previousFiltering) {
            this.events.next({ value: null, type: null });
        }
        this.previousFiltering = this.filtering;
    }
    /**
     * @return {?}
     */
    get filterValueExist() {
        /** @type {?} */
        const keyFilterValues = Object.values(this.definition).reduce((/**
         * @param {?} acc
         * @param {?} next
         * @return {?}
         */
        (acc, next) => acc + next), '');
        return (this.globalFilterValue && this.globalFilterValue.length > 0) || keyFilterValues.length > 0;
    }
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    openFilter(key, event) {
        this.state = { opened: true, key, position: { left: event.clientX, top: event.clientY } };
        this.filterOpenEvents.next();
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    closeFilter() {
        this.state = new FilterStateEvent();
        this.filterOpenEvents.next();
    }
    /**
     * @param {?} source
     * @return {?}
     */
    filter(source) {
        /** @type {?} */
        const type = this.filterType;
        /** @type {?} */
        const value = this.globalFilterValue ? String(this.globalFilterValue).trim() : null;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            /** @type {?} */
            const message = {
                source,
                types: TableFilterType,
                global: { value, type },
                columns: {
                    values: this.definition,
                    types: this.filterTypeDefinition,
                    isEmpty: this.checkIsEmpty(this.definition)
                }
            };
            this.thread.run(filterAllWorker, message).then((/**
             * @param {?} sorted
             * @return {?}
             */
            (sorted) => {
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    resolve({
                        source: sorted,
                        fireSelection: (/**
                         * @return {?}
                         */
                        () => {
                            window.setTimeout((/**
                             * @return {?}
                             */
                            () => {
                                this.events.next({ value, type });
                                this.app.tick();
                            }), TIME_IDLE);
                        })
                    });
                }), TIME_IDLE)));
            }));
        }));
    }
    /**
     * @private
     * @param {?} definition
     * @return {?}
     */
    checkIsEmpty(definition) {
        return Object.keys(this.utils.clean(definition)).length === 0;
    }
}
FilterableService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilterableService.ctorParameters = () => [
    { type: WebWorkerThreadService },
    { type: UtilsService },
    { type: NgZone },
    { type: ApplicationRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxFilterDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
        this.type = null;
    }
}
NgxFilterDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngx-filter]' },] }
];
/** @nocollapse */
NgxFilterDirective.ctorParameters = () => [
    { type: TemplateRef }
];
NgxFilterDirective.propDecorators = {
    type: [{ type: Input, args: ['ngx-filter',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxFilterComponent extends ModalViewLayer {
    /**
     * @param {?} filterable
     * @param {?} cd
     * @param {?} app
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(filterable, cd, app, utils, ngZone) {
        super(cd, app, utils, ngZone);
        this.filterable = filterable;
        this.cd = cd;
        this.app = app;
        this.utils = utils;
        this.ngZone = ngZone;
        this.width = 300;
        this.height = null;
        this.maxHeight = null;
        this.closeTime = 150;
        this.leftX = 10;
        this.topY = 50;
    }
    /**
     * @return {?}
     */
    get state() {
        return this.filterable.state;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    close(event) {
        this.filterable.closeFilter();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.filterable.filterOpenEvents.subscribe((/**
         * @return {?}
         */
        () => this.update()));
    }
}
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
NgxFilterComponent.ctorParameters = () => [
    { type: FilterableService },
    { type: ChangeDetectorRef },
    { type: ApplicationRef },
    { type: UtilsService },
    { type: NgZone }
];
NgxFilterComponent.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }],
    maxHeight: [{ type: Input, args: ['max-height',] }],
    filter: [{ type: ContentChild, args: [NgxFilterDirective, { static: false },] }],
    targetElement: [{ type: ViewChild, args: ['targetElement', { static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} userAgent
 * @return {?}
 */
function isFirefox(userAgent = null) {
    return (userAgent || navigator.userAgent).toLowerCase().indexOf('firefox') > -1;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const { ROW_HEIGHT, MACRO_TIME, TIME_IDLE: TIME_IDLE$1 } = TableBuilderOptionsImpl;
/**
 * @abstract
 */
class TableBuilderApiImpl {
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
        return __awaiter(this, void 0, void 0, function* () {
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
            this.toggleFreeze(TIME_IDLE$1);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_TIME_ANIMATION = 150;
/** @type {?} */
const NGX_ANIMATION = trigger('fadeAnimation', [
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
class SchemaBuilder {
    /**
     * @param {?=} columns
     */
    constructor(columns = []) {
        this.columns = columns;
    }
    /**
     * @return {?}
     */
    exportColumns() {
        return this.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => ({
            key: column.key,
            width: column.width,
            isVisible: column.isVisible,
            isModel: column.isModel
        })));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TemplateParserService {
    constructor() {
        this.compiledTemplates = {};
    }
    /**
     * @private
     * @param {?} key
     * @param {?} cell
     * @param {?} options
     * @return {?}
     */
    static templateContext(key, cell, options) {
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
    }
    /**
     * @private
     * @param {?} attribute
     * @return {?}
     */
    static getValidHtmlBooleanAttribute(attribute) {
        return typeof attribute === 'string' ? true : attribute;
    }
    /**
     * @private
     * @template T
     * @param {?} leftPredicate
     * @param {?} rightPredicate
     * @return {?}
     */
    static getValidPredicate(leftPredicate, rightPredicate) {
        return leftPredicate === null ? rightPredicate : leftPredicate;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    toggleColumnVisibility(key) {
        this.schema.columns = this.schema.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => key === column.key
            ? Object.assign({}, column, { isVisible: !column.isVisible }) : column));
    }
    /**
     * @param {?} columnOptions
     * @return {?}
     */
    initialSchema(columnOptions) {
        this.schema = this.schema || new SchemaBuilder();
        this.schema.columns = [];
        this.compiledTemplates = {};
        this.templateKeys = new Set();
        this.overrideTemplateKeys = new Set();
        this.fullTemplateKeys = new Set();
        this.columnOptions = columnOptions || new ColumnOptions();
    }
    /**
     * @param {?} allowedKeyMap
     * @param {?} templates
     * @return {?}
     */
    parse(allowedKeyMap, templates) {
        if (!templates) {
            return;
        }
        templates.forEach((/**
         * @param {?} column
         * @return {?}
         */
        (column) => {
            const { key, customKey, importantTemplate } = column;
            /** @type {?} */
            const needTemplateCheck = allowedKeyMap[key] || customKey !== false;
            if (needTemplateCheck) {
                if (importantTemplate !== false) {
                    this.templateKeys.delete(key);
                    this.compileColumnMetadata(column);
                    this.overrideTemplateKeys.add(key);
                }
                else if (!this.templateKeys.has(key) && !this.overrideTemplateKeys.has(key)) {
                    this.compileColumnMetadata(column);
                    this.templateKeys.add(key);
                }
                this.fullTemplateKeys.add(key);
            }
        }));
    }
    /**
     * @param {?} key
     * @param {?} partialSchema
     * @return {?}
     */
    mutateColumnSchema(key, partialSchema) {
        for (const option of Object.keys(partialSchema)) {
            this.compiledTemplates[key][option] = partialSchema[option];
        }
    }
    /**
     * @param {?} column
     * @return {?}
     */
    compileColumnMetadata(column) {
        const { key, th, td, emptyHead, headTitle, customKey } = column;
        /** @type {?} */
        const thTemplate = th || new TemplateHeadThDirective(null);
        /** @type {?} */
        const tdTemplate = td || new TemplateBodyTdDirective(null);
        /** @type {?} */
        const isEmptyHead = TemplateParserService.getValidHtmlBooleanAttribute(emptyHead);
        /** @type {?} */
        const thOptions = TemplateParserService.templateContext(key, thTemplate, this.columnOptions);
        this.compiledTemplates[key] = {
            key,
            th: Object.assign({}, thOptions, { headTitle, emptyHead: isEmptyHead, template: isEmptyHead ? null : thOptions.template }),
            td: TemplateParserService.templateContext(key, tdTemplate, this.columnOptions),
            stickyLeft: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyLeft),
            stickyRight: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyRight),
            customColumn: TemplateParserService.getValidHtmlBooleanAttribute(column.customKey),
            width: TemplateParserService.getValidPredicate(column.width, this.columnOptions.width),
            cssClass: TemplateParserService.getValidPredicate(column.cssClass, this.columnOptions.cssClass) || [],
            cssStyle: TemplateParserService.getValidPredicate(column.cssStyle, this.columnOptions.cssStyle) || [],
            resizable: TemplateParserService.getValidPredicate(column.resizable, this.columnOptions.resizable),
            sortable: TemplateParserService.getValidPredicate(column.sortable, this.columnOptions.sortable),
            filterable: TemplateParserService.getValidPredicate(column.filterable, this.columnOptions.filterable),
            draggable: TemplateParserService.getValidPredicate(column.draggable, this.columnOptions.draggable),
            verticalLine: column.verticalLine,
            isModel: customKey === false,
            isVisible: true
        };
    }
}
TemplateParserService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const SortOrderType = {
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
    const OrderType = {
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
        (value, key) => value && value[key]), object) : object;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function checkValueIsEmpty(value) {
        /** @type {?} */
        const val = typeof value === 'string' ? value.trim() : value;
        return [undefined, null, NaN, '', 'null', Infinity].includes(val);
    }
    class Sortable {
        /**
         * @param {?} data
         * @param {?} keys
         * @return {?}
         */
        static sortByKeys(data, keys) {
            /** @type {?} */
            const countKeys = Object.keys(keys).length;
            if (!countKeys) {
                return data.sort(Sortable.shallowSort);
            }
            /** @type {?} */
            const matches = Sortable.getMatchesKeys(keys);
            return data.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => Sortable.multiSort(a, b, matches)));
        }
        /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?} matches
         * @return {?}
         */
        static multiSort(a, b, matches) {
            /** @type {?} */
            const countKeys = Object.keys(matches).length;
            /** @type {?} */
            let sorted = 0;
            /** @type {?} */
            let ix = 0;
            while (sorted === 0 && ix < countKeys) {
                /** @type {?} */
                const key = Sortable.observeKey(matches, ix);
                if (key) {
                    /** @type {?} */
                    const depth = matches[key];
                    sorted = Sortable.deepSort(key, a, b, depth);
                    ix++;
                }
            }
            return sorted;
        }
        /**
         * @private
         * @param {?} keys
         * @return {?}
         */
        static getMatchesKeys(keys) {
            /** @type {?} */
            const matches = {};
            for (const key in keys) {
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
        }
        /**
         * @private
         * @param {?} key
         * @param {?} leftHand
         * @param {?} rightHand
         * @param {?} depth
         * @return {?}
         */
        static deepSort(key, leftHand, rightHand, depth) {
            /** @type {?} */
            const a = getValueByPath(leftHand, key);
            /** @type {?} */
            const b = getValueByPath(rightHand, key);
            return this.shallowSort(a, b, depth);
        }
        /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?=} depth
         * @return {?}
         */
        static shallowSort(a, b, depth) {
            /** @type {?} */
            const currentDepth = depth !== null ? depth : 1;
            b = checkValueIsEmpty(b) ? '' : b;
            if (a === b) {
                return 0;
            }
            return a > b ? currentDepth : -1 * currentDepth;
        }
        /**
         * @private
         * @param {?} keys
         * @param {?} count
         * @return {?}
         */
        static observeKey(keys, count) {
            /** @type {?} */
            let key;
            /** @type {?} */
            let size = 0;
            for (key in keys) {
                if (keys.hasOwnProperty(key)) {
                    if (size === count) {
                        return key;
                    }
                    size++;
                }
            }
            return null;
        }
    }
    return Sortable.sortByKeys(message.source, (/** @type {?} */ (message.definition)));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SortableService {
    /**
     * @param {?} thread
     * @param {?} utils
     * @param {?} zone
     */
    constructor(thread, utils, zone) {
        this.thread = thread;
        this.utils = utils;
        this.zone = zone;
        this.definition = {};
    }
    /**
     * @return {?}
     */
    get empty() {
        return Object.keys(this.definition).length === 0;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    sort(data) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.thread
                .run(sortWorker, { definition: this.definition, source: data })
                .then((/**
             * @param {?} sorted
             * @return {?}
             */
            (sorted) => {
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => window.setTimeout((/**
                 * @return {?}
                 */
                () => resolve(sorted)), TableBuilderOptionsImpl.TIME_IDLE)));
            }));
        }));
    }
    /**
     * @param {?} definition
     * @return {?}
     */
    setDefinition(definition) {
        this.definition = this.empty ? ((/** @type {?} */ (definition))) || {} : this.definition;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    updateSortKey(key) {
        this.definition = this.updateImmutableDefinitions(key);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    updateImmutableDefinitions(key) {
        /** @type {?} */
        const existKey = this.definition[key];
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
        return Object.assign({}, this.definition);
    }
}
SortableService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SortableService.ctorParameters = () => [
    { type: WebWorkerThreadService },
    { type: UtilsService },
    { type: NgZone }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectionMap {
    constructor() {
        this.isAll = false;
        this.entries = {};
        this.map = new Map();
    }
    /**
     * @return {?}
     */
    get size() {
        return this.map.size;
    }
    /**
     * @return {?}
     */
    generateImmutableEntries() {
        this.entries = Array.from(this.map.entries()).reduce((/**
         * @param {?} main
         * @param {?} __1
         * @return {?}
         */
        (main, [key, value]) => (Object.assign({}, main, { [key]: value }))), {});
    }
    /**
     * @return {?}
     */
    hasValue() {
        return this.size > 0;
    }
    /**
     * @return {?}
     */
    get isIndeterminate() {
        return this.hasValue() && !this.isAll;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.map.get(key) || false;
    }
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    select(key, emit) {
        this.map.set(key, true);
        if (emit) {
            this.generateImmutableEntries();
        }
    }
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    toggle(key, emit) {
        if (this.has(key)) {
            this.delete(key, emit);
        }
        else {
            this.select(key, emit);
        }
    }
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    delete(key, emit) {
        this.map.delete(key);
        if (emit) {
            this.generateImmutableEntries();
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    has(key) {
        return this.map.has(key);
    }
    /**
     * @return {?}
     */
    clear() {
        this.map.clear();
        this.entries = {};
        this.isAll = false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectionRange {
    constructor() {
        this.start = null;
        this.end = null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    put(index) {
        if (this.start === null) {
            this.start = index;
        }
        else {
            this.end = index;
        }
    }
    /**
     * @return {?}
     */
    clear() {
        this.start = null;
        this.end = null;
    }
    /**
     * @return {?}
     */
    sortKeys() {
        const [start, end] = [this.start, this.end].sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a - b));
        this.start = start;
        this.end = end;
        return this;
    }
    /**
     * @return {?}
     */
    selectedRange() {
        return this.start !== null && this.end !== null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectionService {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
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
    listenShiftKey() {
        this.listenShiftKeyByType(KeyType.KEYDOWN);
        this.listenShiftKeyByType(KeyType.KEYUP);
    }
    /**
     * @return {?}
     */
    unListenShiftKey() {
        this.removeListenerByType(KeyType.KEYDOWN);
        this.removeListenerByType(KeyType.KEYUP);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unListenShiftKey();
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    toggleAll(rows) {
        clearInterval(this.selectionTaskIdle);
        /** @type {?} */
        const selectIsAll = rows.length === this.selectionModel.size;
        if (!selectIsAll) {
            rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            (row) => this.selectionModel.select(this.getIdByRow(row), false)));
        }
        else {
            this.selectionModel.clear();
        }
        this.checkIsAllSelected(rows);
    }
    /**
     * @param {?} row
     * @return {?}
     */
    toggle(row) {
        clearInterval(this.selectionTaskIdle);
        this.selectionModel.toggle(this.getIdByRow(row), true);
        this.onChanges.next();
    }
    /**
     * @param {?} row
     * @param {?} event
     * @param {?} rows
     * @return {?}
     */
    selectRow(row, event, rows) {
        const { shiftKey, ctrlKey } = event;
        /** @type {?} */
        const index = rows.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item[this.primaryKey] === row[this.primaryKey]));
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
    }
    /**
     * @param {?} row
     * @return {?}
     */
    getIdByRow(row) {
        /** @type {?} */
        const id = row[this.primaryKey];
        if (checkValueIsEmpty(id)) {
            throw new Error(`Can't select item, make sure you pass the correct primary key, or you forgot enable selection
                <ngx-table-builder [enable-selection]="true" primary-key="fieldId" />
                `);
        }
        return id;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    shiftKeyDetectSelection({ shiftKey }) {
        this.selectionStart = { status: shiftKey };
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    listenShiftKeyByType(type) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.handler[type] = (/**
             * @param {?} __0
             * @return {?}
             */
            ({ shiftKey }) => {
                this.selectionStart = { status: shiftKey };
            });
            window.addEventListener(type, this.handler[type], true);
        }));
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    removeListenerByType(type) {
        window.removeEventListener(type, this.handler[type], true);
    }
    /**
     * @private
     * @param {?} rows
     * @return {?}
     */
    checkIsAllSelected(rows) {
        this.selectionModel.isAll = rows.length === this.selectionModel.size;
        this.selectionModel.generateImmutableEntries();
        this.onChanges.next();
    }
    /**
     * @private
     * @param {?} index
     * @param {?} rows
     * @return {?}
     */
    multipleSelectByShiftKeydown(index, rows) {
        this.selectionModel.clear();
        this.range.put(index);
        /** @type {?} */
        const selectedRange = this.range.selectedRange();
        if (selectedRange) {
            const { start, end } = this.range.sortKeys();
            for (let i = start; i <= end; ++i) {
                this.selectionModel.select(this.getIdByRow(rows[i]), false);
            }
        }
    }
    /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    multipleSelectByCtrlKeydown(row, index) {
        this.range.clear();
        this.range.start = index;
        this.selectionModel.toggle(this.getIdByRow(row), true);
    }
    /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    singleSelect(row, index) {
        this.selectionModel.clear();
        this.selectionModel.select(this.getIdByRow(row), true);
        this.range.clear();
        this.range.start = index;
    }
}
SelectionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SelectionService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const { COLUMN_RESIZE_MIN_WIDTH } = TableBuilderOptionsImpl;
class ResizableService {
    /**
     * @private
     * @return {?}
     */
    static clearSelection() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        else if (document['selection']) {
            document['selection'].empty();
        }
    }
    /**
     * @param {?} event
     * @param {?} column
     * @param {?} mousemove
     * @param {?} mouseup
     * @return {?}
     */
    resize(event, column, mousemove, mouseup) {
        this.destroyed$ = new ReplaySubject(1);
        this.startX = event.pageX;
        this.startWidth = column.offsetWidth;
        fromEvent(document, 'mousemove')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => this.computeEvent(e, mousemove)));
        fromEvent(document, 'mouseup')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => this.unsubscribe(e, mouseup)));
    }
    /**
     * @private
     * @param {?} event
     * @param {?} mousemove
     * @return {?}
     */
    computeEvent(event, mousemove) {
        ResizableService.clearSelection();
        /** @type {?} */
        const width = this.startWidth + (event.pageX - this.startX);
        if (width >= COLUMN_RESIZE_MIN_WIDTH) {
            mousemove(width);
        }
    }
    /**
     * @private
     * @param {?} event
     * @param {?} mouseup
     * @return {?}
     */
    unsubscribe(event, mouseup) {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        mouseup(event);
    }
}
ResizableService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DraggableService {
    /**
     * @param {?} parser
     */
    constructor(parser) {
        this.parser = parser;
    }
    /**
     * @private
     * @return {?}
     */
    get columns() {
        return this.parser.schema.columns;
    }
    /**
     * @param {?} previousKey
     * @param {?} currentKey
     * @return {?}
     */
    drop(previousKey, currentKey) {
        /** @type {?} */
        const previousIndex = this.columns.findIndex((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.key === previousKey));
        /** @type {?} */
        const currentIndex = this.columns.findIndex((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.key === currentKey));
        if (this.canDropped(previousIndex, currentIndex)) {
            if (currentIndex === this.columns.length - 1) {
                this.columns[currentIndex].width = this.columns[previousIndex].width;
                this.columns[previousIndex].width = null;
            }
            moveItemInArray(this.columns, previousIndex, currentIndex);
        }
    }
    /**
     * @param {?} previousIndex
     * @param {?} currentIndex
     * @return {?}
     */
    canDropped(previousIndex, currentIndex) {
        /** @type {?} */
        const previous = this.columns[previousIndex];
        /** @type {?} */
        const current = this.columns[currentIndex];
        /** @type {?} */
        const previousIsDraggable = previous.draggable;
        /** @type {?} */
        const currentIsDraggable = current.draggable;
        /** @type {?} */
        const isSticky = previous.stickyLeft || current.stickyLeft || previous.stickyRight || current.stickyRight;
        return previousIsDraggable && currentIsDraggable && !isSticky;
    }
}
DraggableService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DraggableService.ctorParameters = () => [
    { type: TemplateParserService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxTableViewChangesService {
    constructor() {
        this.events = new Subject();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    update(state) {
        this.events.next(state);
    }
}
NgxTableViewChangesService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgxTableViewChangesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxTableViewChangesService_Factory() { return new NgxTableViewChangesService(); }, token: NgxTableViewChangesService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OverloadScrollService {
    constructor() {
        this.scrollStatus = new Subject();
    }
}
OverloadScrollService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const { TIME_IDLE: TIME_IDLE$2, TIME_RELOAD, FRAME_TIME } = TableBuilderOptionsImpl;
class TableBuilderComponent extends TableBuilderApiImpl {
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
        () => this.renderTable()), TIME_IDLE$2).then((/**
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const { TIME_IDLE: TIME_IDLE$3 } = TableBuilderOptionsImpl;
class WheelThrottlingDirective {
    /**
     * @param {?} options
     * @param {?} ngZone
     * @param {?} overload
     */
    constructor(options, ngZone, overload) {
        this.options = options;
        this.ngZone = ngZone;
        this.overload = overload;
        this.scrollOffset = new EventEmitter();
        this.scrollTopOffset = false;
        this.isScrolling = null;
        this.scrolling = false;
    }
    /**
     * @private
     * @return {?}
     */
    get element() {
        return this.wheelThrottling;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = fromEvent(this.element, 'wheel').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onElementScroll(event)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.wheelThrottling = null;
        this.scrollOffset = null;
    }
    /**
     * Correct works only Chrome
     * @param {?} $event
     * @return {?}
     */
    onElementScroll($event) {
        this.scrollStart();
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.clearTimeout(this.isScrolling);
            this.isScrolling = window.setTimeout((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const isOffset = this.element.scrollTop > 0 && !this.scrollTopOffset;
                if (isOffset) {
                    this.scrollTopOffset = true;
                    this.scrollOffset.emit(this.scrollTopOffset);
                }
                else if (this.element.scrollTop === 0 && this.scrollTopOffset) {
                    this.scrollTopOffset = false;
                    this.scrollOffset.emit(this.scrollTopOffset);
                }
                this.scrollEnd();
            }), TIME_IDLE$3);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    scrollStart() {
        if (!this.scrolling) {
            this.scrolling = true;
            this.overload.scrollStatus.next(this.scrolling);
        }
    }
    /**
     * @private
     * @return {?}
     */
    scrollEnd() {
        this.scrolling = false;
        this.overload.scrollStatus.next(this.scrolling);
    }
}
WheelThrottlingDirective.decorators = [
    { type: Directive, args: [{ selector: '[wheelThrottling]' },] }
];
/** @nocollapse */
WheelThrottlingDirective.ctorParameters = () => [
    { type: TableBuilderOptionsImpl, decorators: [{ type: Inject, args: [NGX_TABLE_OPTIONS,] }] },
    { type: NgZone },
    { type: OverloadScrollService }
];
WheelThrottlingDirective.propDecorators = {
    wheelThrottling: [{ type: Input }],
    scrollOffset: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableLineRow {
    /**
     * @param {?} selection
     * @param {?} utils
     */
    constructor(selection, utils) {
        this.selection = selection;
        this.utils = utils;
    }
    /**
     * @param {?} item
     * @param {?} key
     * @param {?} $event
     * @return {?}
     */
    generateTableCellInfo(item, key, $event) {
        return {
            row: item,
            event: $event,
            value: getDeepValue(item, key),
            preventDefault: (/**
             * @return {?}
             */
            () => {
                window.clearInterval(this.selection.selectionTaskIdle);
            })
        };
    }
}
TableLineRow.propDecorators = {
    isRendered: [{ type: Input, args: ['is-rendered',] }],
    columnIndex: [{ type: Input, args: ['column-index',] }],
    clientRowHeight: [{ type: Input, args: ['client-row-height',] }],
    columnSchema: [{ type: Input, args: ['column-schema',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableTheadComponent extends TableLineRow {
    /**
     * @param {?} selection
     * @param {?} utils
     * @param {?} filterable
     */
    constructor(selection, utils, filterable) {
        super(selection, utils);
        this.selection = selection;
        this.utils = utils;
        this.filterable = filterable;
        this.resize = new EventEmitter();
        this.sortByKey = new EventEmitter();
        this.orderType = SortOrderType;
    }
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    openFilter(key, event) {
        this.filterable.openFilter(key, event);
    }
}
TableTheadComponent.decorators = [
    { type: Component, args: [{
                selector: 'table-thead',
                template: "<div\r\n    #parent\r\n    [style.top.px]=\"headerTop\"\r\n    class=\"table-grid__cell table-grid__header-cell\"\r\n    [class.table-grid__cell--custom-cell]=\"columnSchema?.customColumn\"\r\n    [class.table-grid__cell--text-bold]=\"columnSchema?.th?.textBold\"\r\n    [class.table-grid__cell--resizable]=\"columnSchema?.resizable\"\r\n    [style.min-height.px]=\"columnSchema?.th?.height || clientRowHeight\"\r\n    [style.max-height.px]=\"columnSchema?.th?.height || clientRowHeight\"\r\n    [ngClass]=\"columnSchema?.th?.class\"\r\n    [ngStyle]=\"columnSchema?.th?.style\"\r\n>\r\n    <div\r\n        #divElement\r\n        [parent]=\"parent\"\r\n        [text-center]=\"true\"\r\n        [overflowTooltip]=\"divElement\"\r\n        class=\"table-grid__cell--content table-grid__header-cell--content\"\r\n        [class.table-grid__cell--content-sortable]=\"columnSchema?.sortable\"\r\n        [class.table-grid__cell--nowrap]=\"columnSchema?.th?.nowrap\"\r\n        (click)=\"columnSchema?.sortable ? sortByKey.emit(columnSchema.key) : null\"\r\n    >\r\n        <ng-template\r\n            [ngIf]=\"columnSchema?.th?.template\"\r\n            [ngTemplateOutlet]=\"columnSchema?.th?.template\"\r\n            [ngIfElse]=\"defaultTh\"\r\n        ></ng-template>\r\n        <ng-template #defaultTh>\r\n            <ng-template [ngIf]=\"!columnSchema?.th?.emptyHead\">\r\n                {{ columnSchema?.th?.headTitle || (columnSchema.key | titlecase) }}\r\n            </ng-template>\r\n        </ng-template>\r\n    </div>\r\n\r\n    <div\r\n        *ngIf=\"!columnSchema?.customColumn && columnSchema?.sortable\"\r\n        class=\"table-grid__column--sortable\"\r\n        [class.table-grid__column--sortable-active]=\"sortableDefinition[columnSchema.key]\"\r\n        [class.table-grid__column--sortable-asc]=\"sortableDefinition[columnSchema.key] === orderType.ASC\"\r\n        [class.table-grid__column--sortable-desc]=\"sortableDefinition[columnSchema.key] === orderType.DESC\"\r\n        (click)=\"columnSchema?.sortable ? sortByKey.emit(columnSchema.key) : null\"\r\n    >\r\n        <img\r\n            class=\"table-grid-icon--sortable\"\r\n            src='data:image/svg+xml;utf8,<svg id=\"Layer_1\" style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 512 512\" width=\"512px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M128.4,189.3L233.4,89c5.8-6,13.7-9,22.4-9c8.7,0,16.5,3,22.4,9l105.4,100.3c12.5,11.9,12.5,31.3,0,43.2  c-12.5,11.9-32.7,11.9-45.2,0L288,184.4v217c0,16.9-14.3,30.6-32,30.6c-17.7,0-32-13.7-32-30.6v-217l-50.4,48.2  c-12.5,11.9-32.7,11.9-45.2,0C115.9,220.6,115.9,201.3,128.4,189.3z\"/></svg>'\r\n            alt=\"sort\"\r\n        />\r\n    </div>\r\n\r\n    <div\r\n        class=\"table-grid__column--filterable\"\r\n        [class.table-grid__column--filterable-active]=\"filterableDefinition[columnSchema.key]\"\r\n        *ngIf=\"!columnSchema?.customColumn && columnSchema?.filterable\"\r\n        (click)=\"columnSchema?.filterable ? openFilter(columnSchema.key, $event) : null\"\r\n    >\r\n        <svg\r\n            class=\"table-grid-icon--filterable\"\r\n            fill=\"none\"\r\n            height=\"24\"\r\n            stroke=\"#000\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"2\"\r\n            viewBox=\"0 0 24 24\"\r\n            width=\"24\"\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n        >\r\n            <polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"></polygon>\r\n        </svg>\r\n    </div>\r\n\r\n    <ng-template [ngIf]=\"!columnSchema.customColumn\">\r\n        <ng-content select=\"[slot=draggable]\"></ng-content>\r\n    </ng-template>\r\n\r\n    <div\r\n        *ngIf=\"columnSchema?.resizable\"\r\n        class=\"table-grid__column--resize\"\r\n        (mousedown)=\"resize.emit({ event: $event, key: columnSchema.key })\"\r\n    >\r\n        <div class=\"table-grid__column--resize--line\"></div>\r\n    </div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
TableTheadComponent.ctorParameters = () => [
    { type: SelectionService },
    { type: UtilsService },
    { type: FilterableService }
];
TableTheadComponent.propDecorators = {
    headerTop: [{ type: Input, args: ['header-top',] }],
    sortableDefinition: [{ type: Input, args: ['sortable-definition',] }],
    filterableDefinition: [{ type: Input, args: ['filterable-definition',] }],
    resize: [{ type: Output }],
    sortByKey: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableTbodyComponent extends TableLineRow {
    /**
     * @param {?} selection
     * @param {?} cd
     * @param {?} contextMenu
     * @param {?} options
     * @param {?} ngZone
     * @param {?} utils
     * @param {?} overload
     */
    constructor(selection, cd, contextMenu, options, ngZone, utils, overload) {
        super(selection, utils);
        this.selection = selection;
        this.cd = cd;
        this.contextMenu = contextMenu;
        this.options = options;
        this.ngZone = ngZone;
        this.utils = utils;
        this.overload = overload;
        this.destroy$ = new Subject();
    }
    /**
     * @return {?}
     */
    get clientBufferAmount() {
        return Number(this.bufferAmount) || this.options.bufferAmount;
    }
    /**
     * @return {?}
     */
    get canSelectTextInTable() {
        return !this.selection.selectionStart.status;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('recalculated' in changes && !changes['recalculated'].firstChange && this.scroll) {
            this.scroll.invalidateAllCachedMeasurements();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.overload.scrollStatus
            .pipe(filter((/**
         * @param {?} scrolling
         * @return {?}
         */
        (scrolling) => !scrolling)), takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.refresh()));
    }
    /**
     * \@description: we hove some memory leak after destroy component
     * because VirtualScrollerComponent work with requestAnimationFrame
     * invalidate cache (VirtualScrollerComponent)
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        /** @type {?} */
        const scroll = (/** @type {?} */ (this.scroll));
        scroll.removeScrollEventHandlers();
        scroll.wrapGroupDimensions = null;
        scroll.parentScroll = null;
        scroll.viewPortItems = null;
        scroll.items = null;
        scroll['invalidateAllCachedMeasurements'] = (/**
         * @return {?}
         */
        () => { });
        scroll['calculateViewport'] = (/**
         * @return {?}
         */
        () => ({ startIndex: 0, scrollLength: 0 }));
        scroll['previousViewPort'] = { startIndex: 0, scrollLength: 0 };
        scroll['invisiblePaddingElementRef'] = { nativeElement: null };
        scroll['getScrollStartPosition'] = (/**
         * @return {?}
         */
        () => 0);
        scroll['calculateDimensions'] = (/**
         * @return {?}
         */
        () => { });
        scroll['refresh_internal'] = (/**
         * @return {?}
         */
        () => { });
        scroll['element'] = { nativeElement: null };
        scroll['contentElementRef'] = null;
        scroll['_items'] = null;
        scroll['zone'] = null;
        this.destroy$ = null;
        this.scroll = null;
    }
    /**
     * @param {?} event
     * @param {?} key
     * @param {?} row
     * @return {?}
     */
    openContextMenu(event, key, row) {
        if (this.contextMenuTemplate) {
            /** @type {?} */
            const selectOnlyUnSelectedRow = this.enableSelection && !this.checkSelectedItem(row);
            if (selectOnlyUnSelectedRow) {
                this.selection.selectRow(row, event, this.source);
            }
            this.contextMenu.openContextMenu(event, key, row);
        }
    }
    /**
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    handleDblClick(row, key, event, emitter) {
        window.clearInterval(this.selection.selectionTaskIdle);
        this.handleEventEmitter(row, key, event, emitter);
    }
    /**
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    handleOnClick(row, key, event, emitter) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            if (this.enableSelection) {
                this.selection.selectionTaskIdle = window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.selection.selectRow(row, event, this.source);
                    event.preventDefault();
                    detectChanges(this.cd);
                }));
            }
        }));
        this.handleEventEmitter(row, key, event, emitter);
    }
    /**
     * @return {?}
     */
    vsChange() {
        detectChanges(this.cd);
    }
    /**
     * @private
     * @return {?}
     */
    refresh() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.clearTimeout(this.reloadTaskId);
            this.reloadTaskId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.scroll) {
                    this.scroll.invalidateAllCachedMeasurements();
                    detectChanges(this.cd);
                }
            }), TableBuilderOptionsImpl.MACRO_TIME);
        }));
    }
    /**
     * @private
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    handleEventEmitter(row, key, event, emitter) {
        if (emitter) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    emitter.emit(this.generateTableCellInfo(row, key, event));
                }));
            }));
        }
    }
    /**
     * @private
     * @param {?} row
     * @return {?}
     */
    checkSelectedItem(row) {
        return this.selection.selectionModel.get(row[this.primaryKey]);
    }
}
TableTbodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'table-tbody',
                template: "<virtual-scroller\r\n    #scroll\r\n    [items]=\"source\"\r\n    [stripedTable]=\"true\"\r\n    [checkResizeInterval]=\"0\"\r\n    [parentScroll]=\"tableViewport\"\r\n    [enableUnequalChildrenSizes]=\"true\"\r\n    [bufferAmount]=\"clientBufferAmount\"\r\n    [resizeBypassRefreshThreshold]=\"0\"\r\n    [useMarginInsteadOfTranslate]=\"true\"\r\n    [executeRefreshOutsideAngularZone]=\"true\"\r\n    [modifyOverflowStyleOfParentScroll]=\"false\"\r\n    [style.height.px]=\"columnVirtualHeight\"\r\n    (vsChange)=\"vsChange()\"\r\n>\r\n    <div\r\n        #parent\r\n        class=\"table-grid__cell\"\r\n        *ngFor=\"let item of scroll.viewPortItems; let index = index\"\r\n        (selectstart)=\"(canSelectTextInTable)\"\r\n        (contextmenu)=\"openContextMenu($event, columnSchema.key, item)\"\r\n        (click)=\"handleOnClick(item, columnSchema.key, $event, columnSchema?.td?.onClick)\"\r\n        (dblclick)=\"handleDblClick(item, columnSchema.key, $event, columnSchema?.td?.dblClick)\"\r\n        [style.min-height.px]=\"columnSchema?.td?.height || clientRowHeight\"\r\n        [style.max-height.px]=\"columnSchema?.td?.height || clientRowHeight\"\r\n        [class.table-grid__cell--resizable]=\"columnSchema?.resizable\"\r\n        [class.table-grid__cell--custom-cell]=\"columnSchema?.customColumn\"\r\n        [class.table-grid__cell--strip]=\"striped ? index % 2 === 0 : null\"\r\n        [class.table-grid__cell--enable-selection]=\"enableSelection\"\r\n        [class.table-grid__cell--selected]=\"selectionEntries[item[primaryKey]]\"\r\n        [class.table-grid__cell--text-bold]=\"columnSchema?.td?.textBold\"\r\n        [ngClass]=\"columnSchema?.td?.class\"\r\n        [ngStyle]=\"columnSchema?.td?.style\"\r\n    >\r\n        <div\r\n            class=\"table-grid__cell--content\"\r\n            [class.table-grid__cell--nowrap]=\"!columnSchema?.customColumn && columnSchema?.td?.nowrap\"\r\n        >\r\n            <table-cell\r\n                [item]=\"item\"\r\n                [index]=\"index\"\r\n                [parent]=\"parent\"\r\n                [is-rendered]=\"isRendered\"\r\n                *ngIf=\"showedCellByDefault\"\r\n                [column-index]=\"columnIndex\"\r\n                [column-schema]=\"columnSchema\"\r\n                [is-filterable]=\"columnSchema?.filterable\"\r\n            ></table-cell>\r\n        </div>\r\n    </div>\r\n</virtual-scroller>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
TableTbodyComponent.ctorParameters = () => [
    { type: SelectionService },
    { type: ChangeDetectorRef },
    { type: ContextMenuService },
    { type: TableBuilderOptionsImpl, decorators: [{ type: Inject, args: [NGX_TABLE_OPTIONS,] }] },
    { type: NgZone },
    { type: UtilsService },
    { type: OverloadScrollService }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutoHeightDirective {
    /**
     * @param {?} element
     * @param {?} ngZone
     */
    constructor(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.headerHeight = 0;
        this.footerHeight = 0;
        this.autoHeight = {};
        this.recalculatedHeight = new EventEmitter();
        this.useOnlyAutoViewPort = false;
    }
    /**
     * @private
     * @return {?}
     */
    get height() {
        return this.autoHeight.height;
    }
    /**
     * @private
     * @return {?}
     */
    get canCalculated() {
        return this.autoHeight.inViewport && this.autoHeight.sourceLength > 0;
    }
    /**
     * @private
     * @return {?}
     */
    get style() {
        /** @type {?} */
        let height;
        if (this.height) {
            height = `${this.height}px`;
        }
        else if (this.autoHeight.detect) {
            /** @type {?} */
            const paddingTop = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-top');
            /** @type {?} */
            const paddingBottom = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-bottom');
            if (this.useOnlyAutoViewPort && this.columnHeight > this.parentOffsetHeight) {
                height = this.getHeightByViewPort({ paddingTop, paddingBottom });
            }
            else if (this.parentOffsetHeight > this.columnHeight) {
                height = this.getDefaultHeight();
            }
            else if (!this.isEmptyParentHeight) {
                height = this.getHeightByParent({ paddingTop, paddingBottom });
            }
            else {
                height = this.getHeightByViewPort({ paddingTop, paddingBottom });
            }
        }
        return height ? `display: block; height: ${height}` : '';
    }
    /**
     * @private
     * @return {?}
     */
    get isEmptyParentHeight() {
        return this.parentOffsetHeight < parseInt(AutoHeightDirective.HEAD_TOP);
    }
    /**
     * @private
     * @return {?}
     */
    get parentOffsetHeight() {
        return this.rootCurrentElement.clientHeight || AutoHeightDirective.DEFAULT_VALUE;
    }
    /**
     * @private
     * @return {?}
     */
    get currentElement() {
        return this.element.nativeElement;
    }
    /**
     * @private
     * @return {?}
     */
    get childElement() {
        return ((/** @type {?} */ (((/** @type {?} */ (this.element.nativeElement))).firstChild))) || {};
    }
    /**
     * @private
     * @return {?}
     */
    get rootCurrentElement() {
        return (this.currentElement.parentNode && this.currentElement.parentNode.parentElement) || {};
    }
    /**
     * @private
     * @return {?}
     */
    get columnHeight() {
        return this.autoHeight.columnHeight || 0;
    }
    /**
     * @private
     * @return {?}
     */
    get autoViewHeight() {
        return document.body.clientHeight - this.currentElement.getBoundingClientRect().top;
    }
    /**
     * @private
     * @param {?} element
     * @param {?} strCssRule
     * @return {?}
     */
    static getStyle(element, strCssRule) {
        /** @type {?} */
        let strValue = '';
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
            (strMatch, p1) => p1.toUpperCase()));
            strValue = element.currentStyle[strCssRule];
        }
        return strValue;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.handler = (/**
             * @return {?}
             */
            () => this.recalculateTableSize());
            window.addEventListener('resize', this.handler, { passive: true });
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('autoHeight' in changes) {
            this.recalculateTableSize();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        window.removeEventListener('resize', this.handler);
    }
    /**
     * @return {?}
     */
    recalculateTableSize() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            clearTimeout(this.taskId);
            this.taskId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.canCalculated && !this.isDirtyCheck) {
                    this.markForCheck();
                }
                if (this.isDirtyCheck && this.autoHeight.inViewport) {
                    this.calculateHeight();
                    this.recalculatedHeight.emit();
                }
            }), AutoHeightDirective.DELAY);
        }));
    }
    /**
     * @return {?}
     */
    calculateHeight() {
        if (this.canCalculated) {
            this.setHeightByParent();
        }
    }
    /**
     * @return {?}
     */
    markForCheck() {
        this.isDirtyCheck = true;
        if (this.parentOffsetHeight <= TableBuilderOptionsImpl.ROW_HEIGHT) {
            this.useOnlyAutoViewPort = true;
        }
    }
    /**
     * @private
     * @return {?}
     */
    getDefaultHeight() {
        /** @type {?} */
        const scrollbarHeight = this.childElement.offsetHeight - this.childElement.clientHeight || 0;
        return `calc(${this.columnHeight + scrollbarHeight + this.headerHeight + this.footerHeight}px)`;
    }
    /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    getHeightByParent({ paddingTop, paddingBottom }) {
        /** @type {?} */
        const viewportHeight = this.parentOffsetHeight - parseInt(AutoHeightDirective.HEAD_TOP);
        return `calc(${viewportHeight}px - ${paddingTop} - ${paddingBottom})`;
    }
    /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    getHeightByViewPort({ paddingTop, paddingBottom }) {
        /** @type {?} */
        const viewportHeight = this.autoViewHeight - parseInt(AutoHeightDirective.HEAD_TOP);
        return this.columnHeight > viewportHeight
            ? `calc(${viewportHeight}px - ${paddingTop} - ${paddingBottom})`
            : this.getDefaultHeight();
    }
    /**
     * @private
     * @return {?}
     */
    setHeightByParent() {
        this.currentElement.setAttribute('style', this.style);
    }
}
AutoHeightDirective.DEFAULT_VALUE = 0;
AutoHeightDirective.HEAD_TOP = '10px';
AutoHeightDirective.DELAY = 100;
AutoHeightDirective.decorators = [
    { type: Directive, args: [{ selector: '[autoHeight]' },] }
];
/** @nocollapse */
AutoHeightDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
AutoHeightDirective.propDecorators = {
    headerHeight: [{ type: Input }],
    footerHeight: [{ type: Input }],
    autoHeight: [{ type: Input }],
    recalculatedHeight: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DeepPathPipe {
    /**
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    transform(item, path) {
        /** @type {?} */
        const result = getDeepValue(item, path);
        return checkValueIsEmpty(result) ? '-' : result;
    }
}
DeepPathPipe.decorators = [
    { type: Pipe, args: [{ name: 'deepPath', pure: true },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DefaultValuePipe {
    /**
     * @param {?} item
     * @param {?} key
     * @return {?}
     */
    transform(item, key) {
        /** @type {?} */
        const result = item[key];
        return checkValueIsEmpty(result) ? '-' : result;
    }
}
DefaultValuePipe.decorators = [
    { type: Pipe, args: [{ name: 'defaultValue', pure: true },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableCellComponent extends TableLineRow {
    /**
     * @param {?} cd
     * @param {?} selection
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(cd, selection, utils, ngZone) {
        super(selection, utils);
        this.cd = cd;
        this.selection = selection;
        this.utils = utils;
        this.ngZone = ngZone;
        this.contextType = ImplicitContext;
        this.cd.reattach();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.isRendered) {
            this.loaded = true;
        }
        else {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.taskId = window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.loaded = true;
                    detectChanges(this.cd);
                }), this.index);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        window.clearTimeout(this.taskId);
    }
}
TableCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'table-cell',
                template: "<div #divElement class=\"table-grid__cell--inner-content\" [overflowTooltip]=\"divElement\" [parent]=\"parent\" [class.loaded]=\"loaded\">\r\n    <ng-template [ngIf]=\"columnSchema?.td?.template\" [ngIfElse]=\"defaultTd\">\r\n        <ng-template\r\n            [ngTemplateOutlet]=\"columnSchema?.td?.template\"\r\n            [ngTemplateOutletContext]=\"{\r\n                $implicit:\r\n                    columnSchema?.td?.context === contextType.CELL\r\n                        ? columnSchema?.td?.useDeepPath\r\n                            ? (item | deepPath: columnSchema.key)\r\n                            : (item | defaultValue: columnSchema.key)\r\n                        : item\r\n            }\"\r\n        ></ng-template>\r\n    </ng-template>\r\n    <ng-template #defaultTd>\r\n        <ng-template [ngIf]=\"isFilterable\" [ngIfElse]=\"simple\">\r\n            <ngx-filter-viewer\r\n                [index]=\"index\"\r\n                [key]=\"columnSchema.key\"\r\n                [text]=\"\r\n                    columnSchema?.td?.useDeepPath\r\n                        ? (item | deepPath: columnSchema.key)\r\n                        : (item | defaultValue: columnSchema.key)\r\n                \"\r\n            ></ngx-filter-viewer>\r\n        </ng-template>\r\n        <ng-template #simple>{{\r\n            columnSchema?.td?.useDeepPath\r\n                ? (item | deepPath: columnSchema.key)\r\n                : (item | defaultValue: columnSchema.key)\r\n        }}</ng-template>\r\n    </ng-template>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
TableCellComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: SelectionService },
    { type: UtilsService },
    { type: NgZone }
];
TableCellComponent.propDecorators = {
    item: [{ type: Input }],
    index: [{ type: Input }],
    parent: [{ type: Input }],
    isFilterable: [{ type: Input, args: ['is-filterable',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ObserverViewDirective {
    /**
     * @param {?} element
     * @param {?} ngZone
     */
    constructor(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.observeVisible = new EventEmitter();
        this.observer = null;
        this.previousRation = 0.0;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.observer = new IntersectionObserver((/**
         * @param {?} entries
         * @return {?}
         */
        (entries) => {
            entries.forEach((/**
             * @param {?} entry
             * @return {?}
             */
            (entry) => {
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const isVisible = entry.intersectionRatio > this.previousRation || entry.isIntersecting;
                    if (this.isRendered) {
                        clearTimeout(this.frameId);
                        this.frameId = window.setTimeout((/**
                         * @return {?}
                         */
                        () => {
                            this.observeVisible.emit(isVisible);
                        }), ObserverViewDirective.MIN_TIME_IDLE);
                    }
                    else {
                        window.requestAnimationFrame((/**
                         * @return {?}
                         */
                        () => this.observeVisible.emit(isVisible)));
                    }
                }));
                this.previousRation = entry.intersectionRatio;
            }));
        }), {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: [0]
        });
        this.observer.observe(this.element.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.element = { nativeElement: null };
        clearTimeout(this.frameId);
        this.observer.disconnect();
    }
}
ObserverViewDirective.MIN_TIME_IDLE = 120;
ObserverViewDirective.decorators = [
    { type: Directive, args: [{ selector: '[observerView]' },] }
];
/** @nocollapse */
ObserverViewDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
ObserverViewDirective.propDecorators = {
    observeVisible: [{ type: Output }],
    isRendered: [{ type: Input, args: ['rendered',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxContextMenuItemComponent {
    /**
     * @param {?} contextMenu
     * @param {?} cd
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(contextMenu, cd, utils, ngZone) {
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
    /**
     * @return {?}
     */
    get state() {
        return this.contextMenu.state;
    }
    /**
     * @return {?}
     */
    get clientRect() {
        return (this.itemElement.getBoundingClientRect && this.itemElement.getBoundingClientRect()) || {};
    }
    /**
     * @private
     * @return {?}
     */
    get itemElement() {
        return (this.itemRef && this.itemRef.nativeElement) || {};
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.contextMenu.events.subscribe((/**
         * @return {?}
         */
        () => detectChanges(this.cd)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.itemRef = null;
        this.subscription.unsubscribe();
    }
    /**
     * @param {?} ref
     * @return {?}
     */
    calculateSubMenuPosition(ref) {
        /** @type {?} */
        const contentExist = ref.innerHTML.trim().length !== 0;
        if (contentExist) {
            this.offsetX = this.clientRect.left + this.subMenuWidth - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetX = this.offsetX - this.overflowX();
            this.offsetY = this.clientRect.top - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetY = this.offsetY - this.overflowY(ref);
        }
    }
    /**
     * @return {?}
     */
    overflowX() {
        /** @type {?} */
        const overflowX = this.subMenuWidth + this.offsetX - this.utils.bodyRect.width;
        return overflowX > 0 ? overflowX + UtilsService.SCROLLBAR_WIDTH : 0;
    }
    /**
     * @param {?} ref
     * @return {?}
     */
    overflowY(ref) {
        /** @type {?} */
        const overflowY = ref.offsetHeight + this.offsetY - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + UtilsService.SCROLLBAR_WIDTH : 0;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    emitClick(event) {
        if (!this.disable) {
            this.deferCloseMenu();
            this.onClick.emit({
                preventDefault: (/**
                 * @return {?}
                 */
                () => {
                    window.clearTimeout(this.taskId);
                })
            });
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    deferCloseMenu() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.taskId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                this.contextMenu.close();
            }));
        }));
    }
}
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
NgxContextMenuItemComponent.ctorParameters = () => [
    { type: ContextMenuService },
    { type: ChangeDetectorRef },
    { type: UtilsService },
    { type: NgZone }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxContextMenuDividerComponent {
}
NgxContextMenuDividerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-context-menu-divider',
                template: '<div class="context-menu__divider"></div>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMenuContentComponent {
    constructor() {
        this.icon = null;
        this.noMargin = null;
        this.alignCenter = null;
    }
    /**
     * @return {?}
     */
    get class() {
        /** @type {?} */
        const cssClasses = `${this.noMargin !== null ? 'content-phrase' : ''}`;
        return this.icon !== null ? `icon-place ${cssClasses}` : cssClasses;
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxEmptyComponent {
}
NgxEmptyComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-empty',
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const { TIME_RELOAD: TIME_RELOAD$1 } = TableBuilderOptionsImpl;
class NgxFilterViewerComponent {
    /**
     * @param {?} ngZone
     * @param {?} cd
     * @param {?} sanitizer
     * @param {?} filterable
     */
    constructor(ngZone, cd, sanitizer, filterable) {
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
    static wrapSelectedHtml(finder) {
        return `<span style="background-color: #FFFF00; color: #000">${finder}</span>`;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['text'] && changes['text'].firstChange) {
            this.defaultHtmlValue();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.filterable.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.filterable.definition[this.key] || this.filterable.globalFilterValue) {
                this.changeSelection(event);
            }
            else {
                this.defaultHtmlValue();
            }
            detectChanges(this.cd);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    changeSelection(event) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.clearInterval(this.taskId);
            this.taskId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                if (event.value || this.filterable.definition[this.key]) {
                    this.selected(event);
                }
                else {
                    this.defaultHtmlValue();
                }
                detectChanges(this.cd);
            }), TIME_RELOAD$1 + this.index);
        }));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    selected(event) {
        /** @type {?} */
        const value = this.filterable.definition[this.key] || event.value;
        /** @type {?} */
        const type = this.filterable.definition[this.key]
            ? this.filterable.filterTypeDefinition[this.key]
            : event.type;
        if (type === TableFilterType.DOES_NOT_EQUAL || type === TableFilterType.DOES_NOT_CONTAIN) {
            return;
        }
        /** @type {?} */
        let regexp;
        /** @type {?} */
        const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (type === TableFilterType.START_WITH) {
            regexp = new RegExp(`^${escapedValue}`, 'i');
        }
        else if (type === TableFilterType.END_WITH) {
            regexp = new RegExp(`${escapedValue}$`, 'i');
        }
        else if (type === TableFilterType.EQUALS) {
            regexp = new RegExp(`^${escapedValue}$`, 'i');
        }
        else {
            regexp = new RegExp(`${escapedValue}`, 'ig');
        }
        /** @type {?} */
        const trustedHtml = String(this.text).replace(regexp, (/**
         * @param {?} finder
         * @return {?}
         */
        (finder) => NgxFilterViewerComponent.wrapSelectedHtml(finder)));
        this.html = this.sanitizer.bypassSecurityTrustHtml(trustedHtml);
        if (trustedHtml.includes('span')) {
            this.founded = true;
        }
    }
    /**
     * @private
     * @return {?}
     */
    defaultHtmlValue() {
        this.html = this.text;
        this.founded = false;
    }
}
NgxFilterViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-filter-viewer',
                template: '<span [class.filter-founded]="founded" [innerHTML]="html"></span>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
NgxFilterViewerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: FilterableService }
];
NgxFilterViewerComponent.propDecorators = {
    text: [{ type: Input }],
    key: [{ type: Input }],
    index: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragIconComponent {
}
DragIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'drag-icon',
                template: "<img\n    class=\"table-grid-icon--draggable\"\n    src='data:image/svg+xml;utf8,<svg height=\"32px\" id=\"Layer_1\" style=\"enable-background:new 0 0 32 32;\" version=\"1.1\" viewBox=\"0 0 32 32\" width=\"32px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M31.338,14.538L27.38,10.58C26.994,10.193,26.531,10,26,10c-1.188,0-2,1.016-2,2c0,0.516,0.186,0.986,0.58,1.38L25.2,14H18  V6.8l0.62,0.62C19.014,7.814,19.484,8,20,8c0.984,0,2-0.813,2-2c0-0.531-0.193-0.994-0.58-1.38l-3.973-3.974  C17.08,0.279,16.729,0,16,0s-1.135,0.334-1.463,0.662L10.58,4.62C10.193,5.006,10,5.469,10,6c0,1.188,1.016,2,2,2  c0.516,0,0.986-0.186,1.38-0.58L14,6.8V14H6.8l0.62-0.62C7.814,12.986,8,12.516,8,12c0-0.984-0.813-2-2-2  c-0.531,0-0.994,0.193-1.38,0.58l-3.958,3.958C0.334,14.866,0,15.271,0,16s0.279,1.08,0.646,1.447L4.62,21.42  C5.006,21.807,5.469,22,6,22c1.188,0,2-1.016,2-2c0-0.516-0.186-0.986-0.58-1.38L6.8,18H14v7.2l-0.62-0.62  C12.986,24.186,12.516,24,12,24c-0.984,0-2,0.813-2,2c0,0.531,0.193,0.994,0.58,1.38l3.957,3.958C14.865,31.666,15.271,32,16,32  s1.08-0.279,1.447-0.646l3.973-3.974C21.807,26.994,22,26.531,22,26c0-1.188-1.016-2-2-2c-0.516,0-0.986,0.186-1.38,0.58L18,25.2V18  h7.2l-0.62,0.62C24.186,19.014,24,19.484,24,20c0,0.984,0.813,2,2,2c0.531,0,0.994-0.193,1.38-0.58l3.974-3.973  C31.721,17.08,32,16.729,32,16S31.666,14.866,31.338,14.538z\"/></svg>'\n    alt=\"sort\"\n/>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxSourceNullComponent {
}
NgxSourceNullComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-source-null',
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OverflowTooltipDirective {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
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
    /**
     * @private
     * @return {?}
     */
    get overflowContentElem() {
        return document.querySelector(`.${this.overflowSelector}`);
    }
    /**
     * @private
     * @param {?} element
     * @param {?} parent
     * @return {?}
     */
    static checkOverflow(element, parent) {
        return (element.offsetWidth > parent.offsetWidth ||
            element.offsetHeight > parent.offsetHeight ||
            element.scrollWidth > element.offsetWidth ||
            element.scrollHeight > element.offsetHeight);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        fromEvent(this.element, 'mouseenter')
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.detectCheckOverflow()));
        fromEvent(this.element, 'mouseleave')
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        () => {
            clearInterval(this.frameId);
        }));
    }
    /**
     * fix problem with memory leak
     * @return {?}
     */
    ngOnDestroy() {
        clearInterval(this.frameId);
        this.removeElement();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.ngZone = null;
        this.element = null;
        this.parent = null;
        this.destroy$ = null;
    }
    /**
     * @private
     * @return {?}
     */
    detectCheckOverflow() {
        clearInterval(this.frameId);
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.frameId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const isOverflow = OverflowTooltipDirective.checkOverflow(this.element, this.parent);
                if (isOverflow) {
                    this.showTooltip();
                }
            }), this.timeIdle);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    showTooltip() {
        if (this.overflowContentElem) {
            this.removeElement();
            return;
        }
        /** @type {?} */
        const elem = document.createElement('div');
        /** @type {?} */
        const rect = this.element.getBoundingClientRect();
        elem.classList.add(this.overflowSelector, this.textCenter ? 'text-center' : '');
        elem.style.cssText = `left: ${rect.left}px; top: ${rect.top}px`;
        document.body.appendChild(elem);
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.overflowContentElem) {
                    this.overflowContentElem.classList.add('visible');
                    this.overflowContentElem.innerHTML = this.element.innerHTML.trim().replace(/<!--.*?-->/g, '');
                    fromEvent(this.overflowContentElem, 'mouseleave')
                        .pipe(takeUntil(this.destroy$))
                        .subscribe((/**
                     * @return {?}
                     */
                    () => this.removeElement()));
                }
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    removeElement() {
        if (this.overflowContentElem) {
            this.overflowContentElem.parentNode.removeChild(this.overflowContentElem);
        }
    }
}
OverflowTooltipDirective.decorators = [
    { type: Directive, args: [{ selector: '[overflowTooltip]' },] }
];
/** @nocollapse */
OverflowTooltipDirective.ctorParameters = () => [
    { type: NgZone }
];
OverflowTooltipDirective.propDecorators = {
    element: [{ type: Input, args: ['overflowTooltip',] }],
    parent: [{ type: Input, args: ['parent',] }],
    textCenter: [{ type: Input, args: ['text-center',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableBuilderModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
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
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    static loggerConfigFactory(config) {
        return Object.assign(new TableBuilderOptionsImpl(), config);
    }
}
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

export { ImplicitContext, NgxColumnComponent, NgxTableViewChangesService, TableBuilderComponent, TableBuilderModule, TableFilterType, shallowUpdateRow, TableBuilderApiImpl as ɵa, NgxOptionsComponent as ɵb, NGX_TABLE_OPTIONS as ɵba, TableBuilderOptionsImpl as ɵbb, AutoHeightDirective as ɵbc, TableTheadComponent as ɵbd, TableLineRow as ɵbe, TableTbodyComponent as ɵbf, DeepPathPipe as ɵbg, DefaultValuePipe as ɵbh, TableCellComponent as ɵbi, ObserverViewDirective as ɵbj, NgxContextMenuItemComponent as ɵbk, NgxContextMenuDividerComponent as ɵbl, NgxMenuContentComponent as ɵbm, NgxEmptyComponent as ɵbn, NgxFilterViewerComponent as ɵbo, DragIconComponent as ɵbp, NgxSourceNullComponent as ɵbq, OverflowTooltipDirective as ɵbr, ColumnOptions as ɵc, TemplateHeadThDirective as ɵd, TemplateCellCommon as ɵe, TemplateBodyTdDirective as ɵf, NgxContextMenuComponent as ɵg, ModalViewLayer as ɵh, UtilsService as ɵi, checkValueIsEmpty as ɵj, ContextMenuService as ɵk, NgxHeaderComponent as ɵl, TableContent as ɵm, NgxFooterComponent as ɵn, NgxFilterComponent as ɵo, NgxFilterDirective as ɵp, FilterableService as ɵq, WebWorkerThreadService as ɵr, TemplateParserService as ɵs, SortableService as ɵt, SelectionService as ɵu, ResizableService as ɵv, DraggableService as ɵw, OverloadScrollService as ɵx, NGX_ANIMATION as ɵy, WheelThrottlingDirective as ɵz };
//# sourceMappingURL=table-builder.js.map
