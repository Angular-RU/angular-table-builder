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
export class AutoHeightDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1oZWlnaHQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9kaXJlY3RpdmVzL2F1dG8taGVpZ2h0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7O0FBRTFFLHNCQUdDOzs7SUFGRyw2QkFBbUI7O0lBQ25CLGdDQUFzQjs7QUFJMUIsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFlNUIsWUFBNkIsT0FBbUIsRUFBa0IsTUFBYztRQUFuRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQWtCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFWaEUsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZUFBVSxHQUFrQyxFQUFFLENBQUM7UUFDOUMsdUJBQWtCLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFckUsd0JBQW1CLEdBQVksS0FBSyxDQUFDO0lBS3NDLENBQUM7Ozs7O0lBRXBGLElBQVksTUFBTTtRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCxJQUFZLGFBQWE7UUFDckIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Ozs7SUFFRCxJQUFZLEtBQUs7O1lBQ1QsTUFBYztRQUVsQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLENB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SUFFTyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQVc7O2NBQ3hELGNBQWMsR0FBVyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7UUFDM0YsT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWM7WUFDckMsQ0FBQyxDQUFDLFFBQVEsY0FBYyxRQUFRLFVBQVUsTUFBTSxhQUFhLEdBQUc7WUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRU8saUJBQWlCO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7QUE3SnVCLGlDQUFhLEdBQVcsQ0FBQyxDQUFDO0FBQzFCLDRCQUFRLEdBQVcsTUFBTSxDQUFDO0FBQzFCLHlCQUFLLEdBQVcsR0FBRyxDQUFDOztZQUovQyxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFOzs7O1lBbEJuQyxVQUFVO1lBR1YsTUFBTTs7OzJCQXFCTCxLQUFLOzJCQUNMLEtBQUs7eUJBQ0wsS0FBSztpQ0FDTCxNQUFNOzs7Ozs7O0lBUFAsa0NBQWtEOzs7OztJQUNsRCw2QkFBa0Q7Ozs7O0lBQ2xELDBCQUE0Qzs7SUFFNUMsMkNBQXlDOztJQUN6QywyQ0FBeUM7O0lBQ3pDLHlDQUErRDs7SUFDL0QsaURBQTZFOzs7OztJQUU3RSxrREFBNkM7Ozs7O0lBQzdDLDJDQUE4Qjs7Ozs7SUFDOUIscUNBQXVCOzs7OztJQUN2QixzQ0FBb0I7Ozs7O0lBRVIsc0NBQW9DOztJQUFFLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBOZ1pvbmUsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFueSwgRHluYW1pY0hlaWdodE9wdGlvbnMsIEZuIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuLi9jb25maWcvdGFibGUtYnVpbGRlci1vcHRpb25zJztcclxuXHJcbmludGVyZmFjZSBCb3hWaWV3IHtcclxuICAgIHBhZGRpbmdUb3A6IHN0cmluZztcclxuICAgIHBhZGRpbmdCb3R0b206IHN0cmluZztcclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2F1dG9IZWlnaHRdJyB9KVxyXG5leHBvcnQgY2xhc3MgQXV0b0hlaWdodERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9WQUxVRTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhFQURfVE9QOiBzdHJpbmcgPSAnMTBweCc7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUxBWTogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBoZWFkZXJIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZm9vdGVySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgQElucHV0KCkgcHVibGljIGF1dG9IZWlnaHQ6IFBhcnRpYWw8RHluYW1pY0hlaWdodE9wdGlvbnM+ID0ge307XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlY2FsY3VsYXRlZEhlaWdodDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIHByaXZhdGUgdXNlT25seUF1dG9WaWV3UG9ydDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0RpcnR5Q2hlY2s6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHRhc2tJZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVyOiBGbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSkge31cclxuXHJcbiAgICBwcml2YXRlIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRvSGVpZ2h0LmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBjYW5DYWxjdWxhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9IZWlnaHQuaW5WaWV3cG9ydCAmJiB0aGlzLmF1dG9IZWlnaHQuc291cmNlTGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBzdHlsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBoZWlnaHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IGAke3RoaXMuaGVpZ2h0fXB4YDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b0hlaWdodC5kZXRlY3QpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFkZGluZ1RvcDogc3RyaW5nID0gQXV0b0hlaWdodERpcmVjdGl2ZS5nZXRTdHlsZSh0aGlzLnJvb3RDdXJyZW50RWxlbWVudCwgJ3BhZGRpbmctdG9wJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZGRpbmdCb3R0b206IHN0cmluZyA9IEF1dG9IZWlnaHREaXJlY3RpdmUuZ2V0U3R5bGUodGhpcy5yb290Q3VycmVudEVsZW1lbnQsICdwYWRkaW5nLWJvdHRvbScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlT25seUF1dG9WaWV3UG9ydCAmJiB0aGlzLmNvbHVtbkhlaWdodCA+IHRoaXMucGFyZW50T2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmdldEhlaWdodEJ5Vmlld1BvcnQoeyBwYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50T2Zmc2V0SGVpZ2h0ID4gdGhpcy5jb2x1bW5IZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuZ2V0RGVmYXVsdEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHlQYXJlbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0QnlQYXJlbnQoeyBwYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHRCeVZpZXdQb3J0KHsgcGFkZGluZ1RvcCwgcGFkZGluZ0JvdHRvbSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhlaWdodCA/IGBkaXNwbGF5OiBibG9jazsgaGVpZ2h0OiAke2hlaWdodH1gIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgaXNFbXB0eVBhcmVudEhlaWdodCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRPZmZzZXRIZWlnaHQgPCBwYXJzZUludChBdXRvSGVpZ2h0RGlyZWN0aXZlLkhFQURfVE9QKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBwYXJlbnRPZmZzZXRIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb290Q3VycmVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IEF1dG9IZWlnaHREaXJlY3RpdmUuREVGQVVMVF9WQUxVRTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBjdXJyZW50RWxlbWVudCgpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGNoaWxkRWxlbWVudCgpOiBQYXJ0aWFsPEhUTUxEaXZFbGVtZW50PiB7XHJcbiAgICAgICAgcmV0dXJuICgodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQpLmZpcnN0Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQpIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHJvb3RDdXJyZW50RWxlbWVudCgpOiBQYXJ0aWFsPEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRFbGVtZW50LnBhcmVudE5vZGUgJiYgdGhpcy5jdXJyZW50RWxlbWVudC5wYXJlbnROb2RlLnBhcmVudEVsZW1lbnQpIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGNvbHVtbkhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9IZWlnaHQuY29sdW1uSGVpZ2h0IHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgYXV0b1ZpZXdIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQgLSB0aGlzLmN1cnJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRTdHlsZShlbGVtZW50OiBFbGVtZW50IHwgQW55LCBzdHJDc3NSdWxlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHJWYWx1ZTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5kZWZhdWx0VmlldyAmJiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzdHJWYWx1ZSA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgJycpLmdldFByb3BlcnR5VmFsdWUoc3RyQ3NzUnVsZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHN0clZhbHVlID0gJzBweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuY3VycmVudFN0eWxlKSB7XHJcbiAgICAgICAgICAgIHN0ckNzc1J1bGUgPSBzdHJDc3NSdWxlLnJlcGxhY2UoL1xcLShcXHcpL2csIChzdHJNYXRjaDogc3RyaW5nLCBwMTogc3RyaW5nKTogc3RyaW5nID0+IHAxLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICBzdHJWYWx1ZSA9IGVsZW1lbnQuY3VycmVudFN0eWxlW3N0ckNzc1J1bGVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0clZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlciA9ICgpOiB2b2lkID0+IHRoaXMucmVjYWxjdWxhdGVUYWJsZVNpemUoKTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCdhdXRvSGVpZ2h0JyBpbiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjYWxjdWxhdGVUYWJsZVNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNhbGN1bGF0ZVRhYmxlU2l6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRhc2tJZCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0lkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuQ2FsY3VsYXRlZCAmJiAhdGhpcy5pc0RpcnR5Q2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRGlydHlDaGVjayAmJiB0aGlzLmF1dG9IZWlnaHQuaW5WaWV3cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZWRIZWlnaHQuZW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBBdXRvSGVpZ2h0RGlyZWN0aXZlLkRFTEFZKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlSGVpZ2h0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbkNhbGN1bGF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRIZWlnaHRCeVBhcmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNEaXJ0eUNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnRPZmZzZXRIZWlnaHQgPD0gVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwuUk9XX0hFSUdIVCkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZU9ubHlBdXRvVmlld1BvcnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRIZWlnaHQoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBzY3JvbGxiYXJIZWlnaHQ6IG51bWJlciA9IHRoaXMuY2hpbGRFbGVtZW50Lm9mZnNldEhlaWdodCAtIHRoaXMuY2hpbGRFbGVtZW50LmNsaWVudEhlaWdodCB8fCAwO1xyXG4gICAgICAgIHJldHVybiBgY2FsYygke3RoaXMuY29sdW1uSGVpZ2h0ICsgc2Nyb2xsYmFySGVpZ2h0ICsgdGhpcy5oZWFkZXJIZWlnaHQgKyB0aGlzLmZvb3RlckhlaWdodH1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SGVpZ2h0QnlQYXJlbnQoeyBwYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tIH06IEJveFZpZXcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0OiBudW1iZXIgPSB0aGlzLnBhcmVudE9mZnNldEhlaWdodCAtIHBhcnNlSW50KEF1dG9IZWlnaHREaXJlY3RpdmUuSEVBRF9UT1ApO1xyXG4gICAgICAgIHJldHVybiBgY2FsYygke3ZpZXdwb3J0SGVpZ2h0fXB4IC0gJHtwYWRkaW5nVG9wfSAtICR7cGFkZGluZ0JvdHRvbX0pYDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEhlaWdodEJ5Vmlld1BvcnQoeyBwYWRkaW5nVG9wLCBwYWRkaW5nQm90dG9tIH06IEJveFZpZXcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0OiBudW1iZXIgPSB0aGlzLmF1dG9WaWV3SGVpZ2h0IC0gcGFyc2VJbnQoQXV0b0hlaWdodERpcmVjdGl2ZS5IRUFEX1RPUCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1uSGVpZ2h0ID4gdmlld3BvcnRIZWlnaHRcclxuICAgICAgICAgICAgPyBgY2FsYygke3ZpZXdwb3J0SGVpZ2h0fXB4IC0gJHtwYWRkaW5nVG9wfSAtICR7cGFkZGluZ0JvdHRvbX0pYFxyXG4gICAgICAgICAgICA6IHRoaXMuZ2V0RGVmYXVsdEhlaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0SGVpZ2h0QnlQYXJlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdGhpcy5zdHlsZSk7XHJcbiAgICB9XHJcbn1cclxuIl19