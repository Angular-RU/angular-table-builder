/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
var SelectionRange = /** @class */ (function () {
    function SelectionRange() {
        this.start = null;
        this.end = null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    SelectionRange.prototype.put = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.start === null) {
            this.start = index;
        }
        else {
            this.end = index;
        }
    };
    /**
     * @return {?}
     */
    SelectionRange.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.start = null;
        this.end = null;
    };
    /**
     * @return {?}
     */
    SelectionRange.prototype.sortKeys = /**
     * @return {?}
     */
    function () {
        var _a = tslib_1.__read([this.start, this.end].sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a - b; })), 2), start = _a[0], end = _a[1];
        this.start = start;
        this.end = end;
        return this;
    };
    /**
     * @return {?}
     */
    SelectionRange.prototype.selectedRange = /**
     * @return {?}
     */
    function () {
        return this.start !== null && this.end !== null;
    };
    return SelectionRange;
}());
export { SelectionRange };
if (false) {
    /** @type {?} */
    SelectionRange.prototype.start;
    /** @type {?} */
    SelectionRange.prototype.end;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLXJhbmdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLXJhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7SUFBQTtRQUNXLFVBQUssR0FBVyxJQUFJLENBQUM7UUFDckIsUUFBRyxHQUFXLElBQUksQ0FBQztJQTBCOUIsQ0FBQzs7Ozs7SUF4QlUsNEJBQUc7Ozs7SUFBVixVQUFXLEtBQWE7UUFDcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUN0QjthQUFNO1lBQ0gsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDcEI7SUFDTCxDQUFDOzs7O0lBRU0sOEJBQUs7OztJQUFaO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVNLGlDQUFROzs7SUFBZjtRQUNVLElBQUE7Ozs7OytDQUFxRixFQUFwRixhQUFLLEVBQUUsV0FBNkU7UUFDM0YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFZixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7O0lBRU0sc0NBQWE7OztJQUFwQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQzs7OztJQTNCRywrQkFBNEI7O0lBQzVCLDZCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTZWxlY3Rpb25SYW5nZSB7XHJcbiAgICBwdWJsaWMgc3RhcnQ6IG51bWJlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgZW5kOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBwdXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBpbmRleDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lbmQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb3J0S2V5cygpOiBTZWxlY3Rpb25SYW5nZSB7XHJcbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdOiBudW1iZXJbXSA9IFt0aGlzLnN0YXJ0LCB0aGlzLmVuZF0uc29ydCgoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgLSBiKTtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5lbmQgPSBlbmQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFJhbmdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0ICE9PSBudWxsICYmIHRoaXMuZW5kICE9PSBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==