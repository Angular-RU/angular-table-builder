/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, NgZone } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class OverflowTooltipDirective {
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
        elem.classList.add(this.overflowSelector);
        if (this.textCenter) {
            elem.classList.add('text-center');
        }
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
if (false) {
    /** @type {?} */
    OverflowTooltipDirective.prototype.element;
    /** @type {?} */
    OverflowTooltipDirective.prototype.parent;
    /** @type {?} */
    OverflowTooltipDirective.prototype.textCenter;
    /**
     * @type {?}
     * @private
     */
    OverflowTooltipDirective.prototype.destroy$;
    /**
     * Minimal time before show tooltip
     * @type {?}
     * @private
     */
    OverflowTooltipDirective.prototype.timeIdle;
    /**
     * @type {?}
     * @private
     */
    OverflowTooltipDirective.prototype.overflowSelector;
    /**
     * @type {?}
     * @private
     */
    OverflowTooltipDirective.prototype.frameId;
    /**
     * @type {?}
     * @private
     */
    OverflowTooltipDirective.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3ctdG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvb3ZlcmZsb3ctdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFhakMsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFaRCxZQUFPLEdBQW1CLElBQUksQ0FBQztRQUN4QyxXQUFNLEdBQW1CLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQ2hELGFBQVEsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQzs7OztRQUszQyxhQUFRLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFXLG1DQUFtQyxDQUFDO1FBQ3hFLFlBQU8sR0FBVyxJQUFJLENBQUM7SUFFTSxDQUFDOzs7OztJQUV0QyxJQUFZLG1CQUFtQjtRQUMzQixPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7Ozs7SUFFTyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQXVCLEVBQUUsTUFBc0I7UUFDeEUsT0FBTyxDQUNILE9BQU8sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVc7WUFDeEMsT0FBTyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWTtZQUMxQyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8s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QUFTLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUU5RixTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQzt5QkFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQzlCLFNBQVM7OztvQkFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQztpQkFDOUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyxhQUFhO1FBQ2pCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzdFO0lBQ0wsQ0FBQzs7O1lBckdKLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTs7OztZQUpGLE1BQU07OztzQkFNM0MsS0FBSyxTQUFDLGlCQUFpQjtxQkFDdkIsS0FBSyxTQUFDLFFBQVE7eUJBQ2QsS0FBSyxTQUFDLGFBQWE7Ozs7SUFGcEIsMkNBQWdFOztJQUNoRSwwQ0FBc0Q7O0lBQ3RELDhDQUF3RDs7Ozs7SUFDeEQsNENBQTREOzs7Ozs7SUFLNUQsNENBQXdDOzs7OztJQUN4QyxvREFBZ0Y7Ozs7O0lBQ2hGLDJDQUErQjs7Ozs7SUFFbkIsMENBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbb3ZlcmZsb3dUb29sdGlwXScgfSlcbmV4cG9ydCBjbGFzcyBPdmVyZmxvd1Rvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgnb3ZlcmZsb3dUb29sdGlwJykgcHVibGljIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50ID0gbnVsbDtcbiAgICBASW5wdXQoJ3BhcmVudCcpIHB1YmxpYyBwYXJlbnQ6IEhUTUxEaXZFbGVtZW50ID0gbnVsbDtcbiAgICBASW5wdXQoJ3RleHQtY2VudGVyJykgcHVibGljIHRleHRDZW50ZXI6IGJvb2xlYW4gPSBudWxsO1xuICAgIHByaXZhdGUgZGVzdHJveSQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgLyoqXG4gICAgICogTWluaW1hbCB0aW1lIGJlZm9yZSBzaG93IHRvb2x0aXBcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHRpbWVJZGxlOiBudW1iZXIgPSA1MDA7XG4gICAgcHJpdmF0ZSByZWFkb25seSBvdmVyZmxvd1NlbGVjdG9yOiBzdHJpbmcgPSAndGFibGUtZ3JpZF9fY2VsbC1vdmVyZmxvdy1jb250ZW50JztcbiAgICBwcml2YXRlIGZyYW1lSWQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxuXG4gICAgcHJpdmF0ZSBnZXQgb3ZlcmZsb3dDb250ZW50RWxlbSgpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLm92ZXJmbG93U2VsZWN0b3J9YCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tPdmVyZmxvdyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCwgcGFyZW50OiBIVE1MRGl2RWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgZWxlbWVudC5vZmZzZXRXaWR0aCA+IHBhcmVudC5vZmZzZXRXaWR0aCB8fFxuICAgICAgICAgICAgZWxlbWVudC5vZmZzZXRIZWlnaHQgPiBwYXJlbnQub2Zmc2V0SGVpZ2h0IHx8XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbFdpZHRoID4gZWxlbWVudC5vZmZzZXRXaWR0aCB8fFxuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBlbGVtZW50Lm9mZnNldEhlaWdodFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIGZyb21FdmVudCh0aGlzLmVsZW1lbnQsICdtb3VzZWVudGVyJylcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRlY3RDaGVja092ZXJmbG93KCkpO1xuICAgICAgICBmcm9tRXZlbnQodGhpcy5lbGVtZW50LCAnbW91c2VsZWF2ZScpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZnJhbWVJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmaXggcHJvYmxlbSB3aXRoIG1lbW9yeSBsZWFrXG4gICAgICovXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZnJhbWVJZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRWxlbWVudCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQodHJ1ZSk7XG4gICAgICAgIHRoaXMuZGVzdHJveSQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5uZ1pvbmUgPSBudWxsO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuZGVzdHJveSQgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGV0ZWN0Q2hlY2tPdmVyZmxvdygpOiB2b2lkIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmZyYW1lSWQpO1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lSWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNPdmVyZmxvdzogYm9vbGVhbiA9IE92ZXJmbG93VG9vbHRpcERpcmVjdGl2ZS5jaGVja092ZXJmbG93KHRoaXMuZWxlbWVudCwgdGhpcy5wYXJlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChpc092ZXJmbG93KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLnRpbWVJZGxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93VG9vbHRpcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmZsb3dDb250ZW50RWxlbSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFbGVtZW50KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbGVtOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCByZWN0OiBDbGllbnRSZWN0IHwgRE9NUmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMub3ZlcmZsb3dTZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dENlbnRlcikge1xuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd0ZXh0LWNlbnRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbS5zdHlsZS5jc3NUZXh0ID0gYGxlZnQ6ICR7cmVjdC5sZWZ0fXB4OyB0b3A6ICR7cmVjdC50b3B9cHhgO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVyZmxvd0NvbnRlbnRFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmZsb3dDb250ZW50RWxlbS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmZsb3dDb250ZW50RWxlbS5pbm5lckhUTUwgPSB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MLnRyaW0oKS5yZXBsYWNlKC88IS0tLio/LS0+L2csICcnKTtcblxuICAgICAgICAgICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5vdmVyZmxvd0NvbnRlbnRFbGVtLCAnbW91c2VsZWF2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVtb3ZlRWxlbWVudCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVFbGVtZW50KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVyZmxvd0NvbnRlbnRFbGVtKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJmbG93Q29udGVudEVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm92ZXJmbG93Q29udGVudEVsZW0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19