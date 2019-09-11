/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
export class ObserverViewDirective {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    ObserverViewDirective.MIN_TIME_IDLE;
    /** @type {?} */
    ObserverViewDirective.prototype.observeVisible;
    /** @type {?} */
    ObserverViewDirective.prototype.isRendered;
    /**
     * @type {?}
     * @private
     */
    ObserverViewDirective.prototype.observer;
    /**
     * @type {?}
     * @private
     */
    ObserverViewDirective.prototype.previousRation;
    /**
     * @type {?}
     * @private
     */
    ObserverViewDirective.prototype.frameId;
    /**
     * @type {?}
     * @private
     */
    ObserverViewDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    ObserverViewDirective.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZXItdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvb2JzZXJ2ZXItdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckgsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFROUIsWUFBb0IsT0FBbUIsRUFBbUIsTUFBYztRQUFwRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQW1CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFOdkQsbUJBQWMsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwRSxhQUFRLEdBQXlCLElBQUksQ0FBQztRQUN0QyxtQkFBYyxHQUFXLEdBQUcsQ0FBQztJQUdzQyxDQUFDOzs7O0lBRXJFLGVBQWU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG9CQUFvQjs7OztRQUNwQyxDQUFDLE9BQW9DLEVBQVEsRUFBRTtZQUMzQyxPQUFPLENBQUMsT0FBTzs7OztZQUFDLENBQUMsS0FBZ0MsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQjs7O2dCQUFDLEdBQUcsRUFBRTs7MEJBQ3pCLFNBQVMsR0FDWCxLQUFLLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsY0FBYztvQkFFekUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7d0JBQUMsR0FBRyxFQUFFOzRCQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQyxHQUFFLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDO3FCQUMzQzt5QkFBTTt3QkFDSCxNQUFNLENBQUMscUJBQXFCOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQztxQkFDM0U7Z0JBQ0wsQ0FBQyxFQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7WUFDbEQsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEdBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxpQkFBaUI7WUFDN0IsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pCLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7OztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDOztBQTVDdUIsbUNBQWEsR0FBVyxHQUFHLENBQUM7O1lBRnZELFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTs7OztZQUZOLFVBQVU7WUFBdUIsTUFBTTs7OzZCQUtyRSxNQUFNO3lCQUNOLEtBQUssU0FBQyxVQUFVOzs7Ozs7O0lBRmpCLG9DQUFvRDs7SUFDcEQsK0NBQTRFOztJQUM1RSwyQ0FBOEM7Ozs7O0lBQzlDLHlDQUE4Qzs7Ozs7SUFDOUMsK0NBQXFDOzs7OztJQUNyQyx3Q0FBd0I7Ozs7O0lBRVosd0NBQTJCOzs7OztJQUFFLHVDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW29ic2VydmVyVmlld10nIH0pXHJcbmV4cG9ydCBjbGFzcyBPYnNlcnZlclZpZXdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUlOX1RJTUVfSURMRTogbnVtYmVyID0gMTIwO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvYnNlcnZlVmlzaWJsZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQElucHV0KCdyZW5kZXJlZCcpIHB1YmxpYyBpc1JlbmRlcmVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcmV2aW91c1JhdGlvbjogbnVtYmVyID0gMC4wO1xyXG4gICAgcHJpdmF0ZSBmcmFtZUlkOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lKSB7fVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcclxuICAgICAgICAgICAgKGVudHJpZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNWaXNpYmxlOiBib29sZWFuID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LmludGVyc2VjdGlvblJhdGlvID4gdGhpcy5wcmV2aW91c1JhdGlvbiB8fCBlbnRyeS5pc0ludGVyc2VjdGluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUmVuZGVyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZyYW1lSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZUlkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZVZpc2libGUuZW1pdChpc1Zpc2libGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgT2JzZXJ2ZXJWaWV3RGlyZWN0aXZlLk1JTl9USU1FX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLm9ic2VydmVWaXNpYmxlLmVtaXQoaXNWaXNpYmxlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1JhdGlvbiA9IGVudHJ5LmludGVyc2VjdGlvblJhdGlvO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvb3Q6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByb290TWFyZ2luOiAnMHB4IDBweCAwcHggMHB4JyxcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogWzBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB7IG5hdGl2ZUVsZW1lbnQ6IG51bGwgfTtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mcmFtZUlkKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxufVxyXG4iXX0=