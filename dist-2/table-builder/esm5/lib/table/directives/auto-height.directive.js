/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
/**
 * @record
 */
function BoxView() { }
if (false) {
    /** @type {?} */
    BoxView.prototype.paddingTop;
    /** @type {?} */
    BoxView.prototype.paddingBottom;
}
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
export { AutoHeightDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoHeightDirective.DEFAULT_VALUE;
    /**
     * @type {?}
     * @private
     */
    AutoHeightDirective.HEAD_TOP;
    /**
     * @type {?}
     * @private
     */
    AutoHeightDirective.DELAY;
    /** @type {?} */
    AutoHeightDirective.prototype.headerHeight;
    /** @type {?} */
    AutoHeightDirective.prototype.footerHeight;
    /** @type {?} */
    AutoHeightDirective.prototype.autoHeight;
    /** @type {?} */
    AutoHeightDirective.prototype.recalculatedHeight;
    /**
     * @type {?}
     * @private
     */
    AutoHeightDirective.prototype.useOnlyAutoViewPort;
    /**
     * @type {?}
     * @private
     */
    AutoHeightDirective.prototype.isDirtyCheck;
    /**
     * @type {?}
     * @private
     */
    AutoHeightDirective.prototype.taskId;
    /**
     * @type {?}
     * @private
     */
    AutoHeightDirective.prototype.handler;
    /**
     * @type {?}
     * @private
     */
    AutoHeightDirective.prototype.element;
    /** @type {?} */
    AutoHeightDirective.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1oZWlnaHQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9kaXJlY3RpdmVzL2F1dG8taGVpZ2h0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7O0FBRTFFLHNCQUdDOzs7SUFGRyw2QkFBbUI7O0lBQ25CLGdDQUFzQjs7QUFHMUI7SUFnQkksNkJBQTZCLE9BQW1CLEVBQWtCLE1BQWM7UUFBbkQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFrQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVmhFLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGVBQVUsR0FBa0MsRUFBRSxDQUFDO1FBQzlDLHVCQUFrQixHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJFLHdCQUFtQixHQUFZLEtBQUssQ0FBQztJQUtzQyxDQUFDO0lBRXBGLHNCQUFZLHVDQUFNOzs7OztRQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSw4Q0FBYTs7Ozs7UUFBekI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUMxRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLHNDQUFLOzs7OztRQUFqQjs7Z0JBQ1EsTUFBYztZQUVsQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsTUFB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SUFFNUMsMkNBQXlDOztJQUN6QywyQ0FBeUM7O0lBQ3pDLHlDQUErRDs7SUFDL0QsaURBQTZFOzs7OztJQUU3RSxrREFBNkM7Ozs7O0lBQzdDLDJDQUE4Qjs7Ozs7SUFDOUIscUNBQXVCOzs7OztJQUN2QixzQ0FBb0I7Ozs7O0lBRVIsc0NBQW9DOztJQUFFLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBOZ1pvbmUsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFueSwgRHluYW1pY0hlaWdodE9wdGlvbnMsIEZuIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuLi9jb25maWcvdGFibGUtYnVpbGRlci1vcHRpb25zJztcclxuXHJcbmludGVyZmFjZSBCb3hWaWV3IHtcclxuICAgIHBhZGRpbmdUb3A6IHN0cmluZztcclxuICAgIHBhZGRpbmdCb3R0b206IHN0cmluZztcclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2F1dG9IZWlnaHRdJyB9KVxyXG5leHBvcnQgY2xhc3MgQXV0b0hlaWdodERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9WQUxVRTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhFQURfVE9QOiBzdHJpbmcgPSAnMTBweCc7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUxBWTogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBoZWFkZXJIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZm9vdGVySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgQElucHV0KCkgcHVibGljIGF1dG9IZWlnaHQ6IFBhcnRpYWw8RHluYW1pY0hlaWdodE9wdGlvbnM+ID0ge307XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlY2FsY3VsYXRlZEhlaWdodDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIHByaXZhdGUgdXNlT25seUF1dG9WaWV3UG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0RpcnR5Q2hlY2s6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHRhc2tJZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVyOiBGbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSkge31cclxuXHJcbiAgICBwcml2YXRlIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRvSGVpZ2h0LmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBjYW5DYWxjdWxhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9IZWlnaHQuaW5WaWV3cG9ydCAmJiB0aGlzLmF1dG9IZWlnaHQuc291cmNlTGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBzdHlsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBoZWlnaHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IGAke3RoaXMuaGVpZ2h0fXB4YDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b0hlaWdodC5kZXRlY3QpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFkZGluZ1RvcDogc3RyaW5nID0gQXV0b0hlaWdodERpcmVjdGl2ZS5nZXRTdHlsZSh0aGlzLnJvb3RDdXJyZW50RWxlbWVudCwgJ3BhZGRpbmctdG9wJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZGRpbmdCb3R0b206IHN0cmluZyA9IEF1dG9IZWlnaHREaXJlY3RpdmUuZ2V0U3R5bGUodGhpcy5yb290Q3VycmVudEVsZW1lbnQsICdwYWRkaW5nLWJvdHRvbScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlT25seUF1dG9WaWV3UG9ydCAmJiB0aGlzLmNvbHVtbkhlaWdodCA+IHRoaXMucGFyZW50T2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmdldEhlaWdodEJ5Vmlld1BvcnQoeyBwYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50T2Zmc2V0SGVpZ2h0ID4gdGhpcy5jb2x1bW5IZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuZ2V0RGVmYXVsdEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHlQYXJlbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0QnlQYXJlbnQoeyBwYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHRCeVZpZXdQb3J0KHsgcGFkZGluZ1RvcCwgcGFkZGluZ0JvdHRvbSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhlaWdodCA/IGBkaXNwbGF5OiBibG9jazsgaGVpZ2h0OiAke2hlaWdodH1gIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgaXNFbXB0eVBhcmVudEhlaWdodCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRPZmZzZXRIZWlnaHQgPCBwYXJzZUludChBdXRvSGVpZ2h0RGlyZWN0aXZlLkhFQURfVE9QKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBwYXJlbnRPZmZzZXRIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb290Q3VycmVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IEF1dG9IZWlnaHREaXJlY3RpdmUuREVGQVVMVF9WQUxVRTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBjdXJyZW50RWxlbWVudCgpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGNoaWxkRWxlbWVudCgpOiBQYXJ0aWFsPEhUTUxEaXZFbGVtZW50PiB7XHJcbiAgICAgICAgcmV0dXJuICgodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQpLmZpcnN0Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQpIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHJvb3RDdXJyZW50RWxlbWVudCgpOiBQYXJ0aWFsPEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRFbGVtZW50LnBhcmVudE5vZGUgJiYgdGhpcy5jdXJyZW50RWxlbWVudC5wYXJlbnROb2RlLnBhcmVudEVsZW1lbnQpIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGNvbHVtbkhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9IZWlnaHQuY29sdW1uSGVpZ2h0IHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgYXV0b1ZpZXdIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQgLSB0aGlzLmN1cnJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRTdHlsZShlbGVtZW50OiBFbGVtZW50IHwgQW55LCBzdHJDc3NSdWxlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHJWYWx1ZTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5kZWZhdWx0VmlldyAmJiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzdHJWYWx1ZSA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgJycpLmdldFByb3BlcnR5VmFsdWUoc3RyQ3NzUnVsZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHN0clZhbHVlID0gJzBweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuY3VycmVudFN0eWxlKSB7XHJcbiAgICAgICAgICAgIHN0ckNzc1J1bGUgPSBzdHJDc3NSdWxlLnJlcGxhY2UoL1xcLShcXHcpL2csIChzdHJNYXRjaDogc3RyaW5nLCBwMTogc3RyaW5nKTogc3RyaW5nID0+IHAxLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICBzdHJWYWx1ZSA9IGVsZW1lbnQuY3VycmVudFN0eWxlW3N0ckNzc1J1bGVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0clZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlciA9ICgpOiB2b2lkID0+IHRoaXMucmVjYWxjdWxhdGVUYWJsZVNpemUoKTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCdhdXRvSGVpZ2h0JyBpbiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjYWxjdWxhdGVUYWJsZVNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNhbGN1bGF0ZVRhYmxlU2l6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRhc2tJZCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0lkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuQ2FsY3VsYXRlZCAmJiAhdGhpcy5pc0RpcnR5Q2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRGlydHlDaGVjayAmJiB0aGlzLmF1dG9IZWlnaHQuaW5WaWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZWRIZWlnaHQuZW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBBdXRvSGVpZ2h0RGlyZWN0aXZlLkRFTEFZKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlSGVpZ2h0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbkNhbGN1bGF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRIZWlnaHRCeVBhcmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNEaXJ0eUNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnRPZmZzZXRIZWlnaHQgPD0gVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwuUk9XX0hFSUdIVCkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZU9ubHlBdXRvVmlld1BvcnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRIZWlnaHQoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBzY3JvbGxiYXJIZWlnaHQ6IG51bWJlciA9IHRoaXMuY2hpbGRFbGVtZW50Lm9mZnNldEhlaWdodCAtIHRoaXMuY2hpbGRFbGVtZW50LmNsaWVudEhlaWdodCB8fCAwO1xyXG4gICAgICAgIHJldHVybiBgY2FsYygke3RoaXMuY29sdW1uSGVpZ2h0ICsgc2Nyb2xsYmFySGVpZ2h0ICsgdGhpcy5oZWFkZXJIZWlnaHQgKyB0aGlzLmZvb3RlckhlaWdodH1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SGVpZ2h0QnlQYXJlbnQoeyBwYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tIH06IEJveFZpZXcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0OiBudW1iZXIgPSB0aGlzLnBhcmVudE9mZnNldEhlaWdodCAtIHBhcnNlSW50KEF1dG9IZWlnaHREaXJlY3RpdmUuSEVBRF9UT1ApO1xyXG4gICAgICAgIHJldHVybiBgY2FsYygke3ZpZXdwb3J0SGVpZ2h0fXB4IC0gJHtwYWRkaW5nVG9wfSAtICR7cGFkZGluZ0JvdHRvbX0pYDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEhlaWdodEJ5Vmlld1BvcnQoeyBwYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tIH06IEJveFZpZXcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0OiBudW1iZXIgPSB0aGlzLmF1dG9WaWV3SGVpZ2h0IC0gcGFyc2VJbnQoQXV0b0hlaWdodERpcmVjdGl2ZS5IRUFEX1RPUCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1uSGVpZ2h0ID4gdmlld3BvcnRIZWlnaHRcclxuICAgICAgICAgICAgPyBgY2FsYygke3ZpZXdwb3J0SGVpZ2h0fXB4IC0gJHtwYWRkaW5nVG9wfSAtICR7cGFkZGluZ0JvdHRvbX0pYFxyXG4gICAgICAgICAgICA6IHRoaXMuZ2V0RGVmYXVsdEhlaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0SGVpZ2h0QnlQYXJlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdGhpcy5zdHlsZSk7XHJcbiAgICB9XHJcbn1cclxuIl19