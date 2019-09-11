/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Inject, Input, NgZone, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { OverloadScrollService } from '../services/overload-scroll/overload-scroll.service';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
const { TIME_IDLE } = TableBuilderOptionsImpl;
export class WheelThrottlingDirective {
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
            }), TIME_IDLE);
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
if (false) {
    /** @type {?} */
    WheelThrottlingDirective.prototype.wheelThrottling;
    /** @type {?} */
    WheelThrottlingDirective.prototype.scrollOffset;
    /** @type {?} */
    WheelThrottlingDirective.prototype.scrollTopOffset;
    /** @type {?} */
    WheelThrottlingDirective.prototype.isScrolling;
    /**
     * @type {?}
     * @private
     */
    WheelThrottlingDirective.prototype.scrolling;
    /**
     * @type {?}
     * @private
     */
    WheelThrottlingDirective.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    WheelThrottlingDirective.prototype.options;
    /**
     * @type {?}
     * @private
     */
    WheelThrottlingDirective.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    WheelThrottlingDirective.prototype.overload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9kaXJlY3RpdmVzL3doZWVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUUvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztNQUU3RCxFQUFFLFNBQVMsRUFBRSxHQUFtQyx1QkFBdUI7QUFHN0UsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBUWpDLFlBQ2dELE9BQWdDLEVBQzNELE1BQWMsRUFDZCxRQUErQjtRQUZKLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQzNELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQVRuQyxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25FLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzFCLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFPaEMsQ0FBQzs7Ozs7SUFFSixJQUFZLE9BQU87UUFDZixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQzs7OztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQWlCLEVBQVEsRUFBRSxDQUN2RixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUM5QixDQUFDO0lBQ04sQ0FBQzs7OztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQU1NLGVBQWUsQ0FBQyxNQUFrQjtRQUNyQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTtZQUMvQixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7WUFBQyxHQUFHLEVBQUU7O3NCQUNoQyxRQUFRLEdBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7Z0JBRTdFLElBQUksUUFBUSxFQUFFO29CQUNWLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ2hEO3FCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQzdELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO29CQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ2hEO2dCQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixDQUFDLEdBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLFdBQVc7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxTQUFTO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7WUFsRUosU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFOzs7O1lBTG5DLHVCQUF1Qix1QkFldkIsTUFBTSxTQUFDLGlCQUFpQjtZQW5CZ0IsTUFBTTtZQUc5QyxxQkFBcUI7Ozs4QkFRekIsS0FBSzsyQkFDTCxNQUFNOzs7O0lBRFAsbURBQWdEOztJQUNoRCxnREFBMEU7O0lBQzFFLG1EQUF3Qzs7SUFDeEMsK0NBQWtDOzs7OztJQUNsQyw2Q0FBbUM7Ozs7O0lBQ25DLGdEQUFtQzs7Ozs7SUFHL0IsMkNBQTRFOzs7OztJQUM1RSwwQ0FBK0I7Ozs7O0lBQy9CLDRDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE92ZXJsb2FkU2Nyb2xsU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL292ZXJsb2FkLXNjcm9sbC9vdmVybG9hZC1zY3JvbGwuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsIH0gZnJvbSAnLi4vY29uZmlnL3RhYmxlLWJ1aWxkZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE5HWF9UQUJMRV9PUFRJT05TIH0gZnJvbSAnLi4vY29uZmlnL3RhYmxlLWJ1aWxkZXIudG9rZW5zJztcclxuXHJcbmNvbnN0IHsgVElNRV9JRExFIH06IHR5cGVvZiBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCA9IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3doZWVsVGhyb3R0bGluZ10nIH0pXHJcbmV4cG9ydCBjbGFzcyBXaGVlbFRocm90dGxpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgd2hlZWxUaHJvdHRsaW5nOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2Nyb2xsT2Zmc2V0OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9wT2Zmc2V0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNTY3JvbGxpbmc6IG51bWJlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIHNjcm9sbGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBASW5qZWN0KE5HWF9UQUJMRV9PUFRJT05TKSBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM6IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBvdmVybG9hZDogT3ZlcmxvYWRTY3JvbGxTZXJ2aWNlXHJcbiAgICApIHt9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2hlZWxUaHJvdHRsaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh0aGlzLmVsZW1lbnQsICd3aGVlbCcpLnN1YnNjcmliZSgoZXZlbnQ6IFdoZWVsRXZlbnQpOiB2b2lkID0+XHJcbiAgICAgICAgICAgIHRoaXMub25FbGVtZW50U2Nyb2xsKGV2ZW50KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGhpcy53aGVlbFRocm90dGxpbmcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsT2Zmc2V0ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcnJlY3Qgd29ya3Mgb25seSBDaHJvbWVcclxuICAgICAqIEBwYXJhbSAkZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRWxlbWVudFNjcm9sbCgkZXZlbnQ6IFdoZWVsRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFN0YXJ0KCk7XHJcblxyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmlzU2Nyb2xsaW5nKTtcclxuICAgICAgICAgICAgdGhpcy5pc1Njcm9sbGluZyA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzT2Zmc2V0OiBib29sZWFuID0gdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA+IDAgJiYgIXRoaXMuc2Nyb2xsVG9wT2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc09mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wT2Zmc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE9mZnNldC5lbWl0KHRoaXMuc2Nyb2xsVG9wT2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9PT0gMCAmJiB0aGlzLnNjcm9sbFRvcE9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wT2Zmc2V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxPZmZzZXQuZW1pdCh0aGlzLnNjcm9sbFRvcE9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxFbmQoKTtcclxuICAgICAgICAgICAgfSwgVElNRV9JRExFKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNjcm9sbFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsb2FkLnNjcm9sbFN0YXR1cy5uZXh0KHRoaXMuc2Nyb2xsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzY3JvbGxFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm92ZXJsb2FkLnNjcm9sbFN0YXR1cy5uZXh0KHRoaXMuc2Nyb2xsaW5nKTtcclxuICAgIH1cclxufVxyXG4iXX0=