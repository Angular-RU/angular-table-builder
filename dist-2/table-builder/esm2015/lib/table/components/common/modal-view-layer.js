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
export class ModalViewLayer {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdmlldy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29tcG9uZW50cy9jb21tb24vbW9kYWwtdmlldy1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRWxFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQUUvRCxtQ0FJQzs7O0lBSEcsNEJBQVk7O0lBQ1osK0JBQWdCOztJQUNoQixpQ0FBd0I7Ozs7OztBQUc1QixNQUFNLE9BQWdCLGNBQWM7Ozs7Ozs7O0lBVWhDLFlBQ3VCLEVBQXFCLEVBQ3JCLEdBQW1CLEVBQ25CLEtBQW1CLEVBQ25CLE1BQWM7UUFIZCxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFiOUIsVUFBSyxHQUFXLElBQUksQ0FBQztRQUNyQixXQUFNLEdBQVcsSUFBSSxDQUFDO1FBQ3RCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFdkIsaUJBQVksR0FBaUIsSUFBSSxDQUFDO0lBVXpDLENBQUM7Ozs7SUFFSixJQUFXLElBQUk7UUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Ozs7SUFFRCxJQUFXLEdBQUc7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxJQUFXLFNBQVM7O2NBQ1YsU0FBUyxHQUFXLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLO1FBQzVFLE9BQU8sU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7O0lBRUQsSUFBVyxTQUFTOztjQUNWLFNBQVMsR0FBVyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTtRQUM3RSxPQUFPLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQU1NLFVBQVU7UUFDYixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRVMsTUFBTTtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDL0IsTUFBTSxDQUFDLFVBQVU7OztZQUFDLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUVsQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNuQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztpQkFDNUI7Z0JBRUQsTUFBTSxDQUFDLFVBQVU7OztnQkFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQztZQUMvQyxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsYUFBYTs7OztZQUFHLENBQUMsS0FBaUIsRUFBUSxFQUFFO2dCQUM3QyxJQUFJOzswQkFDTSxNQUFNLEdBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhOzswQkFDL0MsTUFBTSxHQUFTLG1CQUFBLEtBQUssQ0FBQyxNQUFNLEVBQVE7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3JGO2lCQUNKO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUM5QjtZQUNMLENBQUMsQ0FBQSxDQUFDO1lBRUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sY0FBYyxDQUFDLEtBQWlCO1FBQ3BDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVPLG1CQUFtQjtRQUN2QixNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7OztJQUVNLFlBQVk7UUFDZixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7OztJQWpHRywrQkFBNEI7O0lBQzVCLGdDQUE2Qjs7SUFDN0Isa0NBQWlDOztJQUNqQyxtQ0FBa0M7Ozs7O0lBQ2xDLHNDQUE0Qzs7Ozs7SUFDNUMsdUNBQTZEOzs7OztJQUM3RCxnQ0FBeUI7Ozs7O0lBQ3pCLHVDQUEwQjs7Ozs7SUFHdEIsNEJBQXdDOzs7OztJQUN4Qyw2QkFBc0M7Ozs7O0lBQ3RDLCtCQUFzQzs7Ozs7SUFDdEMsZ0NBQWlDOzs7OztJQXFCckMsaURBQXdDOzs7Ozs7SUFFeEMsc0RBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwbGljYXRpb25SZWYsIENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBOZ1pvbmUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGbiwgTW91c2VQb3NpdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IGRldGVjdENoYW5nZXMgfSBmcm9tICcuLi8uLi9vcGVyYXRvcnMvZGV0ZWN0LWNoYW5nZXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvblN0YXRlIHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgb3BlbmVkOiBib29sZWFuO1xyXG4gICAgcG9zaXRpb246IE1vdXNlUG9zaXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNb2RhbFZpZXdMYXllcjxUIGV4dGVuZHMgUG9zaXRpb25TdGF0ZT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXIgPSBudWxsO1xyXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyID0gbnVsbDtcclxuICAgIHB1YmxpYyBpc1ZpZXdlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsb3NlVGltZTogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCB0YXJnZXRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcclxuICAgIHByb3RlY3RlZCB0YXNrSWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY2xpY2tMaXN0ZW5lcjogRm47XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGFwcDogQXBwbGljYXRpb25SZWYsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lXHJcbiAgICApIHt9XHJcblxyXG4gICAgcHVibGljIGdldCBsZWZ0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0YXRlLnBvc2l0aW9uICYmIHRoaXMuc3RhdGUucG9zaXRpb24ubGVmdCkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5zdGF0ZS5wb3NpdGlvbiAmJiB0aGlzLnN0YXRlLnBvc2l0aW9uLnRvcCkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG92ZXJmbG93WCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IG92ZXJmbG93WDogbnVtYmVyID0gdGhpcy53aWR0aCArIHRoaXMubGVmdCAtIHRoaXMudXRpbHMuYm9keVJlY3Qud2lkdGg7XHJcbiAgICAgICAgcmV0dXJuIG92ZXJmbG93WCA+IDAgPyBvdmVyZmxvd1ggKyBVdGlsc1NlcnZpY2UuU0NST0xMQkFSX1dJRFRIIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG92ZXJmbG93WSgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IG92ZXJmbG93WTogbnVtYmVyID0gdGhpcy5oZWlnaHQgKyB0aGlzLnRvcCAtIHRoaXMudXRpbHMuYm9keVJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiBvdmVyZmxvd1kgPiAwID8gb3ZlcmZsb3dZICsgVXRpbHNTZXJ2aWNlLlNDUk9MTEJBUl9XSURUSCA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBzdGF0ZSgpOiBQYXJ0aWFsPFQ+O1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbG9zZShldmVudDogTW91c2VFdmVudCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5hcHAudGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlld2VkID0gdGhpcy5zdGF0ZS5vcGVuZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5vcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuSW5zaWRlQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVZpZXcoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuSW5zaWRlQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrTGlzdGVuZXIgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luOiBOb2RlID0gdGhpcy50YXJnZXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0OiBOb2RlID0gZXZlbnQudGFyZ2V0IGFzIE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcmlnaW4uY29udGFpbnModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrSWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50KSwgdGhpcy5jbG9zZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmNsaWNrTGlzdGVuZXIsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcclxuICAgICAgICBkZXRlY3RDaGFuZ2VzKHRoaXMuY2QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5jbGlja0xpc3RlbmVyLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJldmVudENsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50YXNrSWQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==