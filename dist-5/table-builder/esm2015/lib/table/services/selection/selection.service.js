/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectionMap } from './selection';
import { SelectionRange } from './selection-range';
import { KeyType, PrimaryKey } from '../../interfaces/table-builder.internal';
import { checkValueIsEmpty } from '../../operators/check-value-is-empty';
export class SelectionService {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.selectionModel = new SelectionMap();
        this.range = new SelectionRange();
        this.selectionStart = { status: false };
        this.primaryKey = PrimaryKey.ID;
        this.onChanges = new Subject();
        this.handler = {};
    }
    /**
     * @return {?}
     */
    listenShiftKey() {
        this.listenShiftKeyByType(KeyType.KEYDOWN);
        this.listenShiftKeyByType(KeyType.KEYUP);
    }
    /**
     * @return {?}
     */
    unListenShiftKey() {
        this.removeListenerByType(KeyType.KEYDOWN);
        this.removeListenerByType(KeyType.KEYUP);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unListenShiftKey();
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    toggleAll(rows) {
        clearInterval(this.selectionTaskIdle);
        /** @type {?} */
        const selectIsAll = rows.length === this.selectionModel.size;
        if (!selectIsAll) {
            rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            (row) => this.selectionModel.select(this.getIdByRow(row), false)));
        }
        else {
            this.selectionModel.clear();
        }
        this.checkIsAllSelected(rows);
    }
    /**
     * @param {?} row
     * @return {?}
     */
    toggle(row) {
        clearInterval(this.selectionTaskIdle);
        this.selectionModel.toggle(this.getIdByRow(row), true);
        this.onChanges.next();
    }
    /**
     * @param {?} row
     * @param {?} event
     * @param {?} rows
     * @return {?}
     */
    selectRow(row, event, rows) {
        const { shiftKey, ctrlKey } = event;
        /** @type {?} */
        const index = rows.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item[this.primaryKey] === row[this.primaryKey]));
        if (shiftKey) {
            this.multipleSelectByShiftKeydown(index, rows);
        }
        else if (ctrlKey) {
            this.multipleSelectByCtrlKeydown(row, index);
        }
        else {
            this.singleSelect(row, index);
        }
        this.checkIsAllSelected(rows);
    }
    /**
     * @param {?} row
     * @return {?}
     */
    getIdByRow(row) {
        /** @type {?} */
        const id = row[this.primaryKey];
        if (checkValueIsEmpty(id)) {
            throw new Error(`Can't select item, make sure you pass the correct primary key, or you forgot enable selection
                <ngx-table-builder [enable-selection]="true" primary-key="fieldId" />
                `);
        }
        return id;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    shiftKeyDetectSelection({ shiftKey }) {
        this.selectionStart = { status: shiftKey };
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    listenShiftKeyByType(type) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.handler[type] = (/**
             * @param {?} __0
             * @return {?}
             */
            ({ shiftKey }) => {
                this.selectionStart = { status: shiftKey };
            });
            window.addEventListener(type, this.handler[type], true);
        }));
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    removeListenerByType(type) {
        window.removeEventListener(type, this.handler[type], true);
    }
    /**
     * @private
     * @param {?} rows
     * @return {?}
     */
    checkIsAllSelected(rows) {
        this.selectionModel.isAll = rows.length === this.selectionModel.size;
        this.selectionModel.generateImmutableEntries();
        this.onChanges.next();
    }
    /**
     * @private
     * @param {?} index
     * @param {?} rows
     * @return {?}
     */
    multipleSelectByShiftKeydown(index, rows) {
        this.selectionModel.clear();
        this.range.put(index);
        /** @type {?} */
        const selectedRange = this.range.selectedRange();
        if (selectedRange) {
            const { start, end } = this.range.sortKeys();
            for (let i = start; i <= end; ++i) {
                this.selectionModel.select(this.getIdByRow(rows[i]), false);
            }
        }
    }
    /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    multipleSelectByCtrlKeydown(row, index) {
        this.range.clear();
        this.range.start = index;
        this.selectionModel.toggle(this.getIdByRow(row), true);
    }
    /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    singleSelect(row, index) {
        this.selectionModel.clear();
        this.selectionModel.select(this.getIdByRow(row), true);
        this.range.clear();
        this.range.start = index;
    }
}
SelectionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SelectionService.ctorParameters = () => [
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    SelectionService.prototype.selectionModel;
    /** @type {?} */
    SelectionService.prototype.range;
    /** @type {?} */
    SelectionService.prototype.selectionStart;
    /** @type {?} */
    SelectionService.prototype.primaryKey;
    /** @type {?} */
    SelectionService.prototype.selectionTaskIdle;
    /** @type {?} */
    SelectionService.prototype.onChanges;
    /**
     * @type {?}
     * @private
     */
    SelectionService.prototype.handler;
    /**
     * @type {?}
     * @private
     */
    SelectionService.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3NlbGVjdGlvbi9zZWxlY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQWMsT0FBTyxFQUFFLFVBQVUsRUFBMEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUd6RSxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBU3pCLFlBQTZCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUnBDLG1CQUFjLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEQsVUFBSyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQzdDLG1CQUFjLEdBQW9CLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3BELGVBQVUsR0FBVyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBRW5DLGNBQVMsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNyQyxZQUFPLEdBQWUsRUFBRSxDQUFDO0lBRUksQ0FBQzs7OztJQUV4QyxjQUFjO1FBQ2pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRU0sZ0JB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O1NBQ0o7SUFDTCxDQUFDOzs7Ozs7O0lBRU8sMkJBQTJCLENBQUMsR0FBYSxFQUFFLEtBQWE7UUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7O0lBRU8sWUFBWSxDQUFDLEdBQWEsRUFBRSxLQUFhO1FBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDOzs7WUF6SEosVUFBVTs7OztZQVRVLE1BQU07Ozs7SUFXdkIsMENBQXlEOztJQUN6RCxpQ0FBb0Q7O0lBQ3BELDBDQUEyRDs7SUFDM0Qsc0NBQTBDOztJQUMxQyw2Q0FBaUM7O0lBQ2pDLHFDQUFzRDs7Ozs7SUFDdEQsbUNBQTBDOzs7OztJQUU5QixrQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBTZWxlY3Rpb25NYXAgfSBmcm9tICcuL3NlbGVjdGlvbic7XHJcbmltcG9ydCB7IFNlbGVjdGlvblJhbmdlIH0gZnJvbSAnLi9zZWxlY3Rpb24tcmFuZ2UnO1xyXG5pbXBvcnQgeyBUYWJsZVJvdyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IEZuLCBLZXlNYXAsIEtleVR5cGUsIFByaW1hcnlLZXksIFJvd0lkLCBTZWxlY3Rpb25TdGF0dXMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBjaGVja1ZhbHVlSXNFbXB0eSB9IGZyb20gJy4uLy4uL29wZXJhdG9ycy9jaGVjay12YWx1ZS1pcy1lbXB0eSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIHB1YmxpYyBzZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTWFwID0gbmV3IFNlbGVjdGlvbk1hcCgpO1xyXG4gICAgcHVibGljIHJhbmdlOiBTZWxlY3Rpb25SYW5nZSA9IG5ldyBTZWxlY3Rpb25SYW5nZSgpO1xyXG4gICAgcHVibGljIHNlbGVjdGlvblN0YXJ0OiBTZWxlY3Rpb25TdGF0dXMgPSB7IHN0YXR1czogZmFsc2UgfTtcclxuICAgIHB1YmxpYyBwcmltYXJ5S2V5OiBzdHJpbmcgPSBQcmltYXJ5S2V5LklEO1xyXG4gICAgcHVibGljIHNlbGVjdGlvblRhc2tJZGxlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgb25DaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaGFuZGxlcjogS2V5TWFwPEZuPiA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gICAgcHVibGljIGxpc3RlblNoaWZ0S2V5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVuU2hpZnRLZXlCeVR5cGUoS2V5VHlwZS5LRVlET1dOKTtcclxuICAgICAgICB0aGlzLmxpc3RlblNoaWZ0S2V5QnlUeXBlKEtleVR5cGUuS0VZVVApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bkxpc3RlblNoaWZ0S2V5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJCeVR5cGUoS2V5VHlwZS5LRVlET1dOKTtcclxuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyQnlUeXBlKEtleVR5cGUuS0VZVVApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVuTGlzdGVuU2hpZnRLZXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlQWxsKHJvd3M6IFRhYmxlUm93W10pOiB2b2lkIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc2VsZWN0aW9uVGFza0lkbGUpO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RJc0FsbDogYm9vbGVhbiA9IHJvd3MubGVuZ3RoID09PSB0aGlzLnNlbGVjdGlvbk1vZGVsLnNpemU7XHJcbiAgICAgICAgaWYgKCFzZWxlY3RJc0FsbCkge1xyXG4gICAgICAgICAgICByb3dzLmZvckVhY2goKHJvdzogVGFibGVSb3cpID0+IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KHRoaXMuZ2V0SWRCeVJvdyhyb3cpLCBmYWxzZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tJc0FsbFNlbGVjdGVkKHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGUocm93OiBUYWJsZVJvdyk6IHZvaWQge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zZWxlY3Rpb25UYXNrSWRsZSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUodGhpcy5nZXRJZEJ5Um93KHJvdyksIHRydWUpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0Um93KHJvdzogVGFibGVSb3csIGV2ZW50OiBNb3VzZUV2ZW50LCByb3dzOiBUYWJsZVJvd1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeyBzaGlmdEtleSwgY3RybEtleSB9OiBNb3VzZUV2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHJvd3MuZmluZEluZGV4KChpdGVtOiBUYWJsZVJvdykgPT4gaXRlbVt0aGlzLnByaW1hcnlLZXldID09PSByb3dbdGhpcy5wcmltYXJ5S2V5XSk7XHJcblxyXG4gICAgICAgIGlmIChzaGlmdEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlU2VsZWN0QnlTaGlmdEtleWRvd24oaW5kZXgsIHJvd3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3RybEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlU2VsZWN0QnlDdHJsS2V5ZG93bihyb3csIGluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZVNlbGVjdChyb3csIGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tJc0FsbFNlbGVjdGVkKHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJZEJ5Um93KHJvdzogVGFibGVSb3cpOiBSb3dJZCB7XHJcbiAgICAgICAgY29uc3QgaWQ6IFJvd0lkID0gcm93W3RoaXMucHJpbWFyeUtleV07XHJcblxyXG4gICAgICAgIGlmIChjaGVja1ZhbHVlSXNFbXB0eShpZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYENhbid0IHNlbGVjdCBpdGVtLCBtYWtlIHN1cmUgeW91IHBhc3MgdGhlIGNvcnJlY3QgcHJpbWFyeSBrZXksIG9yIHlvdSBmb3Jnb3QgZW5hYmxlIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgPG5neC10YWJsZS1idWlsZGVyIFtlbmFibGUtc2VsZWN0aW9uXT1cInRydWVcIiBwcmltYXJ5LWtleT1cImZpZWxkSWRcIiAvPlxyXG4gICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaGlmdEtleURldGVjdFNlbGVjdGlvbih7IHNoaWZ0S2V5IH06IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0geyBzdGF0dXM6IHNoaWZ0S2V5IH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsaXN0ZW5TaGlmdEtleUJ5VHlwZSh0eXBlOiBLZXlUeXBlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJbdHlwZV0gPSAoeyBzaGlmdEtleSB9OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0geyBzdGF0dXM6IHNoaWZ0S2V5IH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIHRoaXMuaGFuZGxlclt0eXBlXSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVMaXN0ZW5lckJ5VHlwZSh0eXBlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLmhhbmRsZXJbdHlwZV0sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc0FsbFNlbGVjdGVkKHJvd3M6IFRhYmxlUm93W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmlzQWxsID0gcm93cy5sZW5ndGggPT09IHRoaXMuc2VsZWN0aW9uTW9kZWwuc2l6ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmdlbmVyYXRlSW1tdXRhYmxlRW50cmllcygpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG11bHRpcGxlU2VsZWN0QnlTaGlmdEtleWRvd24oaW5kZXg6IG51bWJlciwgcm93czogVGFibGVSb3dbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJhbmdlLnB1dChpbmRleCk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRSYW5nZTogYm9vbGVhbiA9IHRoaXMucmFuZ2Uuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRSYW5nZSkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfTogU2VsZWN0aW9uUmFuZ2UgPSB0aGlzLnJhbmdlLnNvcnRLZXlzKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHN0YXJ0OyBpIDw9IGVuZDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCh0aGlzLmdldElkQnlSb3cocm93c1tpXSksIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG11bHRpcGxlU2VsZWN0QnlDdHJsS2V5ZG93bihyb3c6IFRhYmxlUm93LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yYW5nZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmFuZ2Uuc3RhcnQgPSBpbmRleDtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnRvZ2dsZSh0aGlzLmdldElkQnlSb3cocm93KSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaW5nbGVTZWxlY3Qocm93OiBUYWJsZVJvdywgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCh0aGlzLmdldElkQnlSb3cocm93KSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yYW5nZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmFuZ2Uuc3RhcnQgPSBpbmRleDtcclxuICAgIH1cclxufVxyXG4iXX0=