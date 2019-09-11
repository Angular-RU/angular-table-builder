/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { UtilsService } from '../../services/utils/utils.service';
import { detectChanges } from '../../operators/detect-changes';
/**
 * @record
 */
export function PositionState() { }
if (false) {
    /** @type {?} */
    PositionState.prototype.key;
    /** @type {?} */
    PositionState.prototype.opened;
    /** @type {?} */
    PositionState.prototype.position;
}
/**
 * @abstract
 * @template T
 */
var /**
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
 * @abstract
 * @template T
 */
export { ModalViewLayer };
if (false) {
    /** @type {?} */
    ModalViewLayer.prototype.width;
    /** @type {?} */
    ModalViewLayer.prototype.height;
    /** @type {?} */
    ModalViewLayer.prototype.isViewed;
    /** @type {?} */
    ModalViewLayer.prototype.closeTime;
    /**
     * @type {?}
     * @protected
     */
    ModalViewLayer.prototype.subscription;
    /**
     * @type {?}
     * @protected
     */
    ModalViewLayer.prototype.targetElement;
    /**
     * @type {?}
     * @protected
     */
    ModalViewLayer.prototype.taskId;
    /**
     * @type {?}
     * @private
     */
    ModalViewLayer.prototype.clickListener;
    /**
     * @type {?}
     * @protected
     */
    ModalViewLayer.prototype.cd;
    /**
     * @type {?}
     * @protected
     */
    ModalViewLayer.prototype.app;
    /**
     * @type {?}
     * @protected
     */
    ModalViewLayer.prototype.utils;
    /**
     * @type {?}
     * @protected
     */
    ModalViewLayer.prototype.ngZone;
    /**
     * @abstract
     * @return {?}
     */
    ModalViewLayer.prototype.state = function () { };
    /**
     * @abstract
     * @param {?} event
     * @return {?}
     */
    ModalViewLayer.prototype.close = function (event) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdmlldy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29tcG9uZW50cy9jb21tb24vbW9kYWwtdmlldy1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRWxFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQUUvRCxtQ0FJQzs7O0lBSEcsNEJBQVk7O0lBQ1osK0JBQWdCOztJQUNoQixpQ0FBd0I7Ozs7OztBQUc1Qjs7Ozs7SUFVSSx3QkFDdUIsRUFBcUIsRUFDckIsR0FBbUIsRUFDbkIsS0FBbUIsRUFDbkIsTUFBYztRQUhkLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBQ25CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWI5QixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFDdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUV2QixpQkFBWSxHQUFpQixJQUFJLENBQUM7SUFVekMsQ0FBQztJQUVKLHNCQUFXLGdDQUFJOzs7O1FBQWY7WUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0JBQUc7Ozs7UUFBZDtZQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7SUFF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SUFBdEIsVUFBdUIsS0FBaUI7UUFDcEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQixhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU8sNENBQW1COzs7O0lBQTNCO1FBQ0ksTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7SUFFTSxxQ0FBWTs7O0lBQW5CO1FBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWxHRCxJQWtHQzs7Ozs7Ozs7SUFqR0csK0JBQTRCOztJQUM1QixnQ0FBNkI7O0lBQzdCLGtDQUFpQzs7SUFDakMsbUNBQWtDOzs7OztJQUNsQyxzQ0FBNEM7Ozs7O0lBQzVDLHVDQUE2RDs7Ozs7SUFDN0QsZ0NBQXlCOzs7OztJQUN6Qix1Q0FBMEI7Ozs7O0lBR3RCLDRCQUF3Qzs7Ozs7SUFDeEMsNkJBQXNDOzs7OztJQUN0QywrQkFBc0M7Ozs7O0lBQ3RDLGdDQUFpQzs7Ozs7SUFxQnJDLGlEQUF3Qzs7Ozs7O0lBRXhDLHNEQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgRWxlbWVudFJlZiwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm4sIE1vdXNlUG9zaXRpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBkZXRlY3RDaGFuZ2VzIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3JzL2RldGVjdC1jaGFuZ2VzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9zaXRpb25TdGF0ZSB7XHJcbiAgICBrZXk6IHN0cmluZztcclxuICAgIG9wZW5lZDogYm9vbGVhbjtcclxuICAgIHBvc2l0aW9uOiBNb3VzZVBvc2l0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kYWxWaWV3TGF5ZXI8VCBleHRlbmRzIFBvc2l0aW9uU3RhdGU+IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyID0gbnVsbDtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgaXNWaWV3ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbG9zZVRpbWU6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdGFyZ2V0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XHJcbiAgICBwcm90ZWN0ZWQgdGFza0lkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNsaWNrTGlzdGVuZXI6IEZuO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBhcHA6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSB1dGlsczogVXRpbHNTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbGVmdCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5zdGF0ZS5wb3NpdGlvbiAmJiB0aGlzLnN0YXRlLnBvc2l0aW9uLmxlZnQpIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0b3AoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuc3RhdGUucG9zaXRpb24gJiYgdGhpcy5zdGF0ZS5wb3NpdGlvbi50b3ApIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvdmVyZmxvd1goKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBvdmVyZmxvd1g6IG51bWJlciA9IHRoaXMud2lkdGggKyB0aGlzLmxlZnQgLSB0aGlzLnV0aWxzLmJvZHlSZWN0LndpZHRoO1xyXG4gICAgICAgIHJldHVybiBvdmVyZmxvd1ggPiAwID8gb3ZlcmZsb3dYICsgVXRpbHNTZXJ2aWNlLlNDUk9MTEJBUl9XSURUSCA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvdmVyZmxvd1koKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBvdmVyZmxvd1k6IG51bWJlciA9IHRoaXMuaGVpZ2h0ICsgdGhpcy50b3AgLSB0aGlzLnV0aWxzLmJvZHlSZWN0LmhlaWdodDtcclxuICAgICAgICByZXR1cm4gb3ZlcmZsb3dZID4gMCA/IG92ZXJmbG93WSArIFV0aWxzU2VydmljZS5TQ1JPTExCQVJfV0lEVEggOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgc3RhdGUoKTogUGFydGlhbDxUPjtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xvc2UoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVWaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIHRoaXMuYXBwLnRpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1ZpZXdlZCA9IHRoaXMuc3RhdGUub3BlbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUub3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3Rlbkluc2lkZUNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVWaWV3KCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxpc3Rlbkluc2lkZUNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0xpc3RlbmVyID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbjogTm9kZSA9IHRoaXMudGFyZ2V0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldDogTm9kZSA9IGV2ZW50LnRhcmdldCBhcyBOb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3JpZ2luLmNvbnRhaW5zKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFza0lkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCksIHRoaXMuY2xvc2VUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5jbGlja0xpc3RlbmVyLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUxpc3RlbmVyKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZShldmVudCk7XHJcbiAgICAgICAgZGV0ZWN0Q2hhbmdlcyh0aGlzLmNkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUV2ZW50TGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuY2xpY2tMaXN0ZW5lciwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXZlbnRDbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGFza0lkKTtcclxuICAgIH1cclxufVxyXG4iXX0=