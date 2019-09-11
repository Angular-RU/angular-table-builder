/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
const { COLUMN_RESIZE_MIN_WIDTH } = TableBuilderOptionsImpl;
export class ResizableService {
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
if (false) {
    /** @type {?} */
    ResizableService.prototype.startX;
    /** @type {?} */
    ResizableService.prototype.startWidth;
    /**
     * @type {?}
     * @private
     */
    ResizableService.prototype.destroyed$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3Jlc2l6ZXIvcmVzaXphYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO01BRXZFLEVBQUUsdUJBQXVCLEVBQUUsR0FBbUMsdUJBQXVCO0FBRzNGLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBS2pCLE1BQU0sQ0FBQyxjQUFjO1FBQ3pCLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUNyQixNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM5QixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDOzs7Ozs7OztJQUVNLE1BQU0sQ0FBQyxLQUFpQixFQUFFLE1BQW1CLEVBQUUsU0FBYSxFQUFFLE9BQVc7UUFDNUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRXJDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO2FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUMsQ0FBQztRQUVuRSxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzthQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7OztJQUVPLFlBQVksQ0FBQyxLQUFpQixFQUFFLFNBQWE7UUFDakQsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUM7O2NBQzVCLEtBQUssR0FBVyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ25FLElBQUksS0FBSyxJQUFJLHVCQUF1QixFQUFFO1lBQ2xDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUM7Ozs7Ozs7SUFFTyxXQUFXLENBQUMsS0FBaUIsRUFBRSxPQUFXO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7OztZQXhDSixVQUFVOzs7O0lBRVAsa0NBQXNCOztJQUN0QixzQ0FBMEI7Ozs7O0lBQzFCLHNDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEZuIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuLi8uLi9jb25maWcvdGFibGUtYnVpbGRlci1vcHRpb25zJztcclxuXHJcbmNvbnN0IHsgQ09MVU1OX1JFU0laRV9NSU5fV0lEVEggfTogdHlwZW9mIFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsID0gVGFibGVCdWlsZGVyT3B0aW9uc0ltcGw7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBzdGFydFg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGFydFdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGRlc3Ryb3llZCQ6IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj47XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRbJ3NlbGVjdGlvbiddKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50WydzZWxlY3Rpb24nXS5lbXB0eSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50LCBjb2x1bW46IEhUTUxFbGVtZW50LCBtb3VzZW1vdmU6IEZuLCBtb3VzZXVwOiBGbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveWVkJCA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRYID0gZXZlbnQucGFnZVg7XHJcbiAgICAgICAgdGhpcy5zdGFydFdpZHRoID0gY29sdW1uLm9mZnNldFdpZHRoO1xyXG5cclxuICAgICAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5jb21wdXRlRXZlbnQoZSwgbW91c2Vtb3ZlKSk7XHJcblxyXG4gICAgICAgIGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy51bnN1YnNjcmliZShlLCBtb3VzZXVwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21wdXRlRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQsIG1vdXNlbW92ZTogRm4pOiB2b2lkIHtcclxuICAgICAgICBSZXNpemFibGVTZXJ2aWNlLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IHRoaXMuc3RhcnRXaWR0aCArIChldmVudC5wYWdlWCAtIHRoaXMuc3RhcnRYKTtcclxuICAgICAgICBpZiAod2lkdGggPj0gQ09MVU1OX1JFU0laRV9NSU5fV0lEVEgpIHtcclxuICAgICAgICAgICAgbW91c2Vtb3ZlKHdpZHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZShldmVudDogTW91c2VFdmVudCwgbW91c2V1cDogRm4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCh0cnVlKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKTtcclxuICAgICAgICBtb3VzZXVwKGV2ZW50KTtcclxuICAgIH1cclxufVxyXG4iXX0=