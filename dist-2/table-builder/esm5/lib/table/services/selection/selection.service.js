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
var SelectionService = /** @class */ (function () {
    function SelectionService(ngZone) {
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
    SelectionService.prototype.listenShiftKey = /**
     * @return {?}
     */
    function () {
        this.listenShiftKeyByType(KeyType.KEYDOWN);
        this.listenShiftKeyByType(KeyType.KEYUP);
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.unListenShiftKey = /**
     * @return {?}
     */
    function () {
        this.removeListenerByType(KeyType.KEYDOWN);
        this.removeListenerByType(KeyType.KEYUP);
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unListenShiftKey();
    };
    /**
     * @param {?} rows
     * @return {?}
     */
    SelectionService.prototype.toggleAll = /**
     * @param {?} rows
     * @return {?}
     */
    function (rows) {
        var _this = this;
        clearInterval(this.selectionTaskIdle);
        /** @type {?} */
        var selectIsAll = rows.length === this.selectionModel.size;
        if (!selectIsAll) {
            rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return _this.selectionModel.select(_this.getIdByRow(row), false); }));
        }
        else {
            this.selectionModel.clear();
        }
        this.checkIsAllSelected(rows);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    SelectionService.prototype.toggle = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        clearInterval(this.selectionTaskIdle);
        this.selectionModel.toggle(this.getIdByRow(row), true);
        this.onChanges.next();
    };
    /**
     * @param {?} row
     * @param {?} event
     * @param {?} rows
     * @return {?}
     */
    SelectionService.prototype.selectRow = /**
     * @param {?} row
     * @param {?} event
     * @param {?} rows
     * @return {?}
     */
    function (row, event, rows) {
        var _this = this;
        var shiftKey = event.shiftKey, ctrlKey = event.ctrlKey;
        /** @type {?} */
        var index = rows.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item[_this.primaryKey] === row[_this.primaryKey]; }));
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
    };
    /**
     * @param {?} row
     * @return {?}
     */
    SelectionService.prototype.getIdByRow = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        /** @type {?} */
        var id = row[this.primaryKey];
        if (checkValueIsEmpty(id)) {
            throw new Error("Can't select item, make sure you pass the correct primary key, or you forgot enable selection\n                <ngx-table-builder [enable-selection]=\"true\" primary-key=\"fieldId\" />\n                ");
        }
        return id;
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    SelectionService.prototype.shiftKeyDetectSelection = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var shiftKey = _a.shiftKey;
        this.selectionStart = { status: shiftKey };
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    SelectionService.prototype.listenShiftKeyByType = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.handler[type] = (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var shiftKey = _a.shiftKey;
                _this.selectionStart = { status: shiftKey };
            });
            window.addEventListener(type, _this.handler[type], true);
        }));
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    SelectionService.prototype.removeListenerByType = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        window.removeEventListener(type, this.handler[type], true);
    };
    /**
     * @private
     * @param {?} rows
     * @return {?}
     */
    SelectionService.prototype.checkIsAllSelected = /**
     * @private
     * @param {?} rows
     * @return {?}
     */
    function (rows) {
        this.selectionModel.isAll = rows.length === this.selectionModel.size;
        this.selectionModel.generateImmutableEntries();
        this.onChanges.next();
    };
    /**
     * @private
     * @param {?} index
     * @param {?} rows
     * @return {?}
     */
    SelectionService.prototype.multipleSelectByShiftKeydown = /**
     * @private
     * @param {?} index
     * @param {?} rows
     * @return {?}
     */
    function (index, rows) {
        this.selectionModel.clear();
        this.range.put(index);
        /** @type {?} */
        var selectedRange = this.range.selectedRange();
        if (selectedRange) {
            var _a = this.range.sortKeys(), start = _a.start, end = _a.end;
            for (var i = start; i <= end; ++i) {
                this.selectionModel.select(this.getIdByRow(rows[i]), false);
            }
        }
    };
    /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    SelectionService.prototype.multipleSelectByCtrlKeydown = /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    function (row, index) {
        this.range.clear();
        this.range.start = index;
        this.selectionModel.toggle(this.getIdByRow(row), true);
    };
    /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    SelectionService.prototype.singleSelect = /**
     * @private
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    function (row, index) {
        this.selectionModel.clear();
        this.selectionModel.select(this.getIdByRow(row), true);
        this.range.clear();
        this.range.start = index;
    };
    SelectionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SelectionService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return SelectionService;
}());
export { SelectionService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3NlbGVjdGlvbi9zZWxlY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQWMsT0FBTyxFQUFFLFVBQVUsRUFBMEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RTtJQVVJLDBCQUE2QixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVJwQyxtQkFBYyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xELFVBQUssR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUM3QyxtQkFBYyxHQUFvQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNwRCxlQUFVLEdBQVcsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUVuQyxjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFDckMsWUFBTyxHQUFlLEVBQUUsQ0FBQztJQUVJLENBQUM7Ozs7SUFFeEMseUNBQWM7OztJQUFyQjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRU0sMkNBQWdCOzs7SUFBdkI7UUFDSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVNLHNDQUFXOzs7SUFBbEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVNLG9DQUFTOzs7O0lBQWhCLFVBQWlCLElBQWdCO1FBQWpDLGlCQVdDO1FBVkcsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztZQUVoQyxXQUFXLEdBQVksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUk7UUFDckUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQyxHQUFhLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUF2RCxDQUF1RCxFQUFDLENBQUM7U0FDNUY7YUFBTTtZQUNILElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFTSxpQ0FBTTs7OztJQUFiLFVBQWMsR0FBYTtRQUN2QixhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7Ozs7SUFFTSxvQ0FBUzs7Ozs7O0lBQWhCLFVBQWlCLEdBQWEsRUFBRSxLQUFpQixFQUFFLElBQWdCO1FBQW5FLGlCQWFDO1FBWlcsSUFBQSx5QkFBUSxFQUFFLHVCQUFPOztZQUNuQixLQUFLLEdBQVcsSUFBSSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLElBQWMsSUFBSyxPQUFBLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBOUMsQ0FBOEMsRUFBQztRQUV4RyxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEQ7YUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsMkJBQTJCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqQztRQUVELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVNLHFDQUFVOzs7O0lBQWpCLFVBQWtCLEdBQWE7O1lBQ3JCLEVBQUUsR0FBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUV0QyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQ1gsNE1BRUMsQ0FDSixDQUFDO1NBQ0w7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Ozs7O0lBRU0sa0RBQXVCOzs7O0lBQTlCLFVBQStCLEVBQTJCO1lBQXpCLHNCQUFRO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBRU8sK0NBQW9COzs7OztJQUE1QixVQUE2QixJQUFhO1FBQTFDLGlCQU9DO1FBTkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7OztRQUFDO1lBQzFCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDOzs7O1lBQUcsVUFBQyxFQUEyQjtvQkFBekIsc0JBQVE7Z0JBQzVCLEtBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7WUFDL0MsQ0FBQyxDQUFBLENBQUM7WUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTywrQ0FBb0I7Ozs7O0lBQTVCLFVBQTZCLElBQVk7UUFDckMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7OztJQUVPLDZDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsSUFBZ0I7UUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztRQUNyRSxJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7Ozs7O0lBRU8sdURBQTRCOzs7Ozs7SUFBcEMsVUFBcUMsS0FBYSxFQUFFLElBQWdCO1FBQ2hFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQ2hCLGFBQWEsR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtRQUV6RCxJQUFJLGFBQWEsRUFBRTtZQUNULElBQUEsMEJBQXNELEVBQXBELGdCQUFLLEVBQUUsWUFBNkM7WUFDNUQsS0FBSyxJQUFJLENBQUMsR0FBVyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUMvRDtTQUNKO0lBQ0wsQ0FBQzs7Ozs7OztJQUVPLHNEQUEyQjs7Ozs7O0lBQW5DLFVBQW9DLEdBQWEsRUFBRSxLQUFhO1FBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7OztJQUVPLHVDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsR0FBYSxFQUFFLEtBQWE7UUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7O2dCQXpISixVQUFVOzs7O2dCQVRVLE1BQU07O0lBbUkzQix1QkFBQztDQUFBLEFBMUhELElBMEhDO1NBekhZLGdCQUFnQjs7O0lBQ3pCLDBDQUF5RDs7SUFDekQsaUNBQW9EOztJQUNwRCwwQ0FBMkQ7O0lBQzNELHNDQUEwQzs7SUFDMUMsNkNBQWlDOztJQUNqQyxxQ0FBc0Q7Ozs7O0lBQ3RELG1DQUEwQzs7Ozs7SUFFOUIsa0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU2VsZWN0aW9uTWFwIH0gZnJvbSAnLi9zZWxlY3Rpb24nO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25SYW5nZSB9IGZyb20gJy4vc2VsZWN0aW9uLXJhbmdlJztcclxuaW1wb3J0IHsgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBGbiwgS2V5TWFwLCBLZXlUeXBlLCBQcmltYXJ5S2V5LCBSb3dJZCwgU2VsZWN0aW9uU3RhdHVzIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgY2hlY2tWYWx1ZUlzRW1wdHkgfSBmcm9tICcuLi8uLi9vcGVyYXRvcnMvY2hlY2stdmFsdWUtaXMtZW1wdHknO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgICBwdWJsaWMgc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1hcCA9IG5ldyBTZWxlY3Rpb25NYXAoKTtcclxuICAgIHB1YmxpYyByYW5nZTogU2VsZWN0aW9uUmFuZ2UgPSBuZXcgU2VsZWN0aW9uUmFuZ2UoKTtcclxuICAgIHB1YmxpYyBzZWxlY3Rpb25TdGFydDogU2VsZWN0aW9uU3RhdHVzID0geyBzdGF0dXM6IGZhbHNlIH07XHJcbiAgICBwdWJsaWMgcHJpbWFyeUtleTogc3RyaW5nID0gUHJpbWFyeUtleS5JRDtcclxuICAgIHB1YmxpYyBzZWxlY3Rpb25UYXNrSWRsZTogbnVtYmVyO1xyXG4gICAgcHVibGljIG9uQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGhhbmRsZXI6IEtleU1hcDxGbj4gPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lKSB7fVxyXG5cclxuICAgIHB1YmxpYyBsaXN0ZW5TaGlmdEtleSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlblNoaWZ0S2V5QnlUeXBlKEtleVR5cGUuS0VZRE9XTik7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5TaGlmdEtleUJ5VHlwZShLZXlUeXBlLktFWVVQKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5MaXN0ZW5TaGlmdEtleSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyQnlUeXBlKEtleVR5cGUuS0VZRE9XTik7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lckJ5VHlwZShLZXlUeXBlLktFWVVQKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51bkxpc3RlblNoaWZ0S2V5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZUFsbChyb3dzOiBUYWJsZVJvd1tdKTogdm9pZCB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnNlbGVjdGlvblRhc2tJZGxlKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0SXNBbGw6IGJvb2xlYW4gPSByb3dzLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3Rpb25Nb2RlbC5zaXplO1xyXG4gICAgICAgIGlmICghc2VsZWN0SXNBbGwpIHtcclxuICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3c6IFRhYmxlUm93KSA9PiB0aGlzLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCh0aGlzLmdldElkQnlSb3cocm93KSwgZmFsc2UpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoZWNrSXNBbGxTZWxlY3RlZChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlKHJvdzogVGFibGVSb3cpOiB2b2lkIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc2VsZWN0aW9uVGFza0lkbGUpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwudG9nZ2xlKHRoaXMuZ2V0SWRCeVJvdyhyb3cpLCB0cnVlKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlcy5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdFJvdyhyb3c6IFRhYmxlUm93LCBldmVudDogTW91c2VFdmVudCwgcm93czogVGFibGVSb3dbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHsgc2hpZnRLZXksIGN0cmxLZXkgfTogTW91c2VFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSByb3dzLmZpbmRJbmRleCgoaXRlbTogVGFibGVSb3cpID0+IGl0ZW1bdGhpcy5wcmltYXJ5S2V5XSA9PT0gcm93W3RoaXMucHJpbWFyeUtleV0pO1xyXG5cclxuICAgICAgICBpZiAoc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdEJ5U2hpZnRLZXlkb3duKGluZGV4LCByb3dzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdEJ5Q3RybEtleWRvd24ocm93LCBpbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaW5nbGVTZWxlY3Qocm93LCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoZWNrSXNBbGxTZWxlY3RlZChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SWRCeVJvdyhyb3c6IFRhYmxlUm93KTogUm93SWQge1xyXG4gICAgICAgIGNvbnN0IGlkOiBSb3dJZCA9IHJvd1t0aGlzLnByaW1hcnlLZXldO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tWYWx1ZUlzRW1wdHkoaWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgIGBDYW4ndCBzZWxlY3QgaXRlbSwgbWFrZSBzdXJlIHlvdSBwYXNzIHRoZSBjb3JyZWN0IHByaW1hcnkga2V5LCBvciB5b3UgZm9yZ290IGVuYWJsZSBzZWxlY3Rpb25cclxuICAgICAgICAgICAgICAgIDxuZ3gtdGFibGUtYnVpbGRlciBbZW5hYmxlLXNlbGVjdGlvbl09XCJ0cnVlXCIgcHJpbWFyeS1rZXk9XCJmaWVsZElkXCIgLz5cclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hpZnRLZXlEZXRlY3RTZWxlY3Rpb24oeyBzaGlmdEtleSB9OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHsgc3RhdHVzOiBzaGlmdEtleSB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuU2hpZnRLZXlCeVR5cGUodHlwZTogS2V5VHlwZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyW3R5cGVdID0gKHsgc2hpZnRLZXkgfTogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHsgc3RhdHVzOiBzaGlmdEtleSB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLmhhbmRsZXJbdHlwZV0sIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXJCeVR5cGUodHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5oYW5kbGVyW3R5cGVdLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrSXNBbGxTZWxlY3RlZChyb3dzOiBUYWJsZVJvd1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5pc0FsbCA9IHJvd3MubGVuZ3RoID09PSB0aGlzLnNlbGVjdGlvbk1vZGVsLnNpemU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5nZW5lcmF0ZUltbXV0YWJsZUVudHJpZXMoKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlcy5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtdWx0aXBsZVNlbGVjdEJ5U2hpZnRLZXlkb3duKGluZGV4OiBudW1iZXIsIHJvd3M6IFRhYmxlUm93W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5yYW5nZS5wdXQoaW5kZXgpO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUmFuZ2U6IGJvb2xlYW4gPSB0aGlzLnJhbmdlLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkUmFuZ2UpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH06IFNlbGVjdGlvblJhbmdlID0gdGhpcy5yYW5nZS5zb3J0S2V5cygpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBzdGFydDsgaSA8PSBlbmQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcy5nZXRJZEJ5Um93KHJvd3NbaV0pLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtdWx0aXBsZVNlbGVjdEJ5Q3RybEtleWRvd24ocm93OiBUYWJsZVJvdywgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmFuZ2UuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJhbmdlLnN0YXJ0ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC50b2dnbGUodGhpcy5nZXRJZEJ5Um93KHJvdyksIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2luZ2xlU2VsZWN0KHJvdzogVGFibGVSb3csIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcy5nZXRJZEJ5Um93KHJvdyksIHRydWUpO1xyXG4gICAgICAgIHRoaXMucmFuZ2UuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJhbmdlLnN0YXJ0ID0gaW5kZXg7XHJcbiAgICB9XHJcbn1cclxuIl19