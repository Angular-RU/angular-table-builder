/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
var COLUMN_RESIZE_MIN_WIDTH = TableBuilderOptionsImpl.COLUMN_RESIZE_MIN_WIDTH;
var ResizableService = /** @class */ (function () {
    function ResizableService() {
    }
    /**
     * @private
     * @return {?}
     */
    ResizableService.clearSelection = /**
     * @private
     * @return {?}
     */
    function () {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        else if (document['selection']) {
            document['selection'].empty();
        }
    };
    /**
     * @param {?} event
     * @param {?} column
     * @param {?} mousemove
     * @param {?} mouseup
     * @return {?}
     */
    ResizableService.prototype.resize = /**
     * @param {?} event
     * @param {?} column
     * @param {?} mousemove
     * @param {?} mouseup
     * @return {?}
     */
    function (event, column, mousemove, mouseup) {
        var _this = this;
        this.destroyed$ = new ReplaySubject(1);
        this.startX = event.pageX;
        this.startWidth = column.offsetWidth;
        fromEvent(document, 'mousemove')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.computeEvent(e, mousemove); }));
        fromEvent(document, 'mouseup')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.unsubscribe(e, mouseup); }));
    };
    /**
     * @private
     * @param {?} event
     * @param {?} mousemove
     * @return {?}
     */
    ResizableService.prototype.computeEvent = /**
     * @private
     * @param {?} event
     * @param {?} mousemove
     * @return {?}
     */
    function (event, mousemove) {
        ResizableService.clearSelection();
        /** @type {?} */
        var width = this.startWidth + (event.pageX - this.startX);
        if (width >= COLUMN_RESIZE_MIN_WIDTH) {
            mousemove(width);
        }
    };
    /**
     * @private
     * @param {?} event
     * @param {?} mouseup
     * @return {?}
     */
    ResizableService.prototype.unsubscribe = /**
     * @private
     * @param {?} event
     * @param {?} mouseup
     * @return {?}
     */
    function (event, mouseup) {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        mouseup(event);
    };
    ResizableService.decorators = [
        { type: Injectable }
    ];
    return ResizableService;
}());
export { ResizableService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3Jlc2l6ZXIvcmVzaXphYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXJFLElBQUEseUVBQXVCO0FBRS9CO0lBQUE7SUF5Q0EsQ0FBQzs7Ozs7SUFuQ2tCLCtCQUFjOzs7O0lBQTdCO1FBQ0ksSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQzthQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7Ozs7Ozs7O0lBRU0saUNBQU07Ozs7Ozs7SUFBYixVQUFjLEtBQWlCLEVBQUUsTUFBbUIsRUFBRSxTQUFhLEVBQUUsT0FBVztRQUFoRixpQkFZQztRQVhHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUVyQyxTQUFTLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQzthQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQyxTQUFTOzs7O1FBQUMsVUFBQyxDQUFhLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBL0IsQ0FBK0IsRUFBQyxDQUFDO1FBRW5FLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO2FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVM7Ozs7UUFBQyxVQUFDLENBQWEsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUE1QixDQUE0QixFQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7OztJQUVPLHVDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsS0FBaUIsRUFBRSxTQUFhO1FBQ2pELGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDOztZQUM1QixLQUFLLEdBQVcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNuRSxJQUFJLEtBQUssSUFBSSx1QkFBdUIsRUFBRTtZQUNsQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDOzs7Ozs7O0lBRU8sc0NBQVc7Ozs7OztJQUFuQixVQUFvQixLQUFpQixFQUFFLE9BQVc7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQzs7Z0JBeENKLFVBQVU7O0lBeUNYLHVCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7U0F4Q1ksZ0JBQWdCOzs7SUFDekIsa0NBQXNCOztJQUN0QixzQ0FBMEI7Ozs7O0lBQzFCLHNDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEZuIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuLi8uLi9jb25maWcvdGFibGUtYnVpbGRlci1vcHRpb25zJztcclxuXHJcbmNvbnN0IHsgQ09MVU1OX1JFU0laRV9NSU5fV0lEVEggfTogdHlwZW9mIFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsID0gVGFibGVCdWlsZGVyT3B0aW9uc0ltcGw7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBzdGFydFg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGFydFdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGRlc3Ryb3llZCQ6IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj47XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRbJ3NlbGVjdGlvbiddKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50WydzZWxlY3Rpb24nXS5lbXB0eSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50LCBjb2x1bW46IEhUTUxFbGVtZW50LCBtb3VzZW1vdmU6IEZuLCBtb3VzZXVwOiBGbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveWVkJCA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRYID0gZXZlbnQucGFnZVg7XHJcbiAgICAgICAgdGhpcy5zdGFydFdpZHRoID0gY29sdW1uLm9mZnNldFdpZHRoO1xyXG5cclxuICAgICAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5jb21wdXRlRXZlbnQoZSwgbW91c2Vtb3ZlKSk7XHJcblxyXG4gICAgICAgIGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy51bnN1YnNjcmliZShlLCBtb3VzZXVwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21wdXRlRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQsIG1vdXNlbW92ZTogRm4pOiB2b2lkIHtcclxuICAgICAgICBSZXNpemFibGVTZXJ2aWNlLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IHRoaXMuc3RhcnRXaWR0aCArIChldmVudC5wYWdlWCAtIHRoaXMuc3RhcnRYKTtcclxuICAgICAgICBpZiAod2lkdGggPj0gQ09MVU1OX1JFU0laRV9NSU5fV0lEVEgpIHtcclxuICAgICAgICAgICAgbW91c2Vtb3ZlKHdpZHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZShldmVudDogTW91c2VFdmVudCwgbW91c2V1cDogRm4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCh0cnVlKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKTtcclxuICAgICAgICBtb3VzZXVwKGV2ZW50KTtcclxuICAgIH1cclxufVxyXG4iXX0=