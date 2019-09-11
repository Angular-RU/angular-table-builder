/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Inject, Input, NgZone, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { OverloadScrollService } from '../services/overload-scroll/overload-scroll.service';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
var TIME_IDLE = TableBuilderOptionsImpl.TIME_IDLE;
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
            }), TIME_IDLE);
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
export { WheelThrottlingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9kaXJlY3RpdmVzL3doZWVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUUvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRCxJQUFBLDZDQUFTO0FBRWpCO0lBU0ksa0NBQ2dELE9BQWdDLEVBQzNELE1BQWMsRUFDZCxRQUErQjtRQUZKLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQzNELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQVRuQyxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25FLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzFCLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFPaEMsQ0FBQztJQUVKLHNCQUFZLDZDQUFPOzs7OztRQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTs7OztJQUVNLDJDQUFROzs7SUFBZjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFpQjtZQUM3RSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQTNCLENBQTJCLEVBQzlCLENBQUM7SUFDTixDQUFDOzs7O0lBRU0sOENBQVc7OztJQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0ksa0RBQWU7Ozs7O0lBQXRCLFVBQXVCLE1BQWtCO1FBQXpDLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7OztRQUFDO1lBQzFCLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVU7OztZQUFDOztvQkFDM0IsUUFBUSxHQUFZLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxlQUFlO2dCQUU3RSxJQUFJLFFBQVEsRUFBRTtvQkFDVixLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztvQkFDNUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUNoRDtxQkFBTSxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLENBQUMsSUFBSSxLQUFJLENBQUMsZUFBZSxFQUFFO29CQUM3RCxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztvQkFDN0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUNoRDtnQkFFRCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsQ0FBQyxHQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyw4Q0FBVzs7OztJQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDOzs7OztJQUVPLDRDQUFTOzs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFDOztnQkFsRUosU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFOzs7O2dCQUxuQyx1QkFBdUIsdUJBZXZCLE1BQU0sU0FBQyxpQkFBaUI7Z0JBbkJnQixNQUFNO2dCQUc5QyxxQkFBcUI7OztrQ0FRekIsS0FBSzsrQkFDTCxNQUFNOztJQWdFWCwrQkFBQztDQUFBLEFBbkVELElBbUVDO1NBbEVZLHdCQUF3Qjs7O0lBQ2pDLG1EQUFnRDs7SUFDaEQsZ0RBQTBFOztJQUMxRSxtREFBd0M7O0lBQ3hDLCtDQUFrQzs7Ozs7SUFDbEMsNkNBQW1DOzs7OztJQUNuQyxnREFBbUM7Ozs7O0lBRy9CLDJDQUE0RTs7Ozs7SUFDNUUsMENBQStCOzs7OztJQUMvQiw0Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBPdmVybG9hZFNjcm9sbFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9vdmVybG9hZC1zY3JvbGwvb3ZlcmxvYWQtc2Nyb2xsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCB9IGZyb20gJy4uL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBOR1hfVEFCTEVfT1BUSU9OUyB9IGZyb20gJy4uL2NvbmZpZy90YWJsZS1idWlsZGVyLnRva2Vucyc7XHJcblxyXG5jb25zdCB7IFRJTUVfSURMRSB9OiB0eXBlb2YgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgPSBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbDtcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t3aGVlbFRocm90dGxpbmddJyB9KVxyXG5leHBvcnQgY2xhc3MgV2hlZWxUaHJvdHRsaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgQElucHV0KCkgcHVibGljIHdoZWVsVGhyb3R0bGluZzogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIHNjcm9sbE9mZnNldDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgcHVibGljIHNjcm9sbFRvcE9mZnNldDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzU2Nyb2xsaW5nOiBudW1iZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdChOR1hfVEFCTEVfT1BUSU9OUykgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zOiBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgb3ZlcmxvYWQ6IE92ZXJsb2FkU2Nyb2xsU2VydmljZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndoZWVsVGhyb3R0bGluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQodGhpcy5lbGVtZW50LCAnd2hlZWwnKS5zdWJzY3JpYmUoKGV2ZW50OiBXaGVlbEV2ZW50KTogdm9pZCA9PlxyXG4gICAgICAgICAgICB0aGlzLm9uRWxlbWVudFNjcm9sbChldmVudClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMud2hlZWxUaHJvdHRsaW5nID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNjcm9sbE9mZnNldCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3JyZWN0IHdvcmtzIG9ubHkgQ2hyb21lXHJcbiAgICAgKiBAcGFyYW0gJGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkVsZW1lbnRTY3JvbGwoJGV2ZW50OiBXaGVlbEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxTdGFydCgpO1xyXG5cclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5pc1Njcm9sbGluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTY3JvbGxpbmcgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc09mZnNldDogYm9vbGVhbiA9IHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPiAwICYmICF0aGlzLnNjcm9sbFRvcE9mZnNldDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcE9mZnNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxPZmZzZXQuZW1pdCh0aGlzLnNjcm9sbFRvcE9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPT09IDAgJiYgdGhpcy5zY3JvbGxUb3BPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcE9mZnNldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsT2Zmc2V0LmVtaXQodGhpcy5zY3JvbGxUb3BPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRW5kKCk7XHJcbiAgICAgICAgICAgIH0sIFRJTUVfSURMRSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzY3JvbGxTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vdmVybG9hZC5zY3JvbGxTdGF0dXMubmV4dCh0aGlzLnNjcm9sbGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2Nyb2xsRW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vdmVybG9hZC5zY3JvbGxTdGF0dXMubmV4dCh0aGlzLnNjcm9sbGluZyk7XHJcbiAgICB9XHJcbn1cclxuIl19