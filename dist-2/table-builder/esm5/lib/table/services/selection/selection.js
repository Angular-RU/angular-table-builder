/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
var SelectionMap = /** @class */ (function () {
    function SelectionMap() {
        this.isAll = false;
        this.entries = {};
        this.map = new Map();
    }
    Object.defineProperty(SelectionMap.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionMap.prototype.generateImmutableEntries = /**
     * @return {?}
     */
    function () {
        this.entries = Array.from(this.map.entries()).reduce((/**
         * @param {?} main
         * @param {?} __1
         * @return {?}
         */
        function (main, _a) {
            var _b;
            var _c = tslib_1.__read(_a, 2), key = _c[0], value = _c[1];
            return (tslib_1.__assign({}, main, (_b = {}, _b[key] = value, _b)));
        }), {});
    };
    /**
     * @return {?}
     */
    SelectionMap.prototype.hasValue = /**
     * @return {?}
     */
    function () {
        return this.size > 0;
    };
    Object.defineProperty(SelectionMap.prototype, "isIndeterminate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hasValue() && !this.isAll;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @return {?}
     */
    SelectionMap.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.map.get(key) || false;
    };
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    SelectionMap.prototype.select = /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    function (key, emit) {
        this.map.set(key, true);
        if (emit) {
            this.generateImmutableEntries();
        }
    };
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    SelectionMap.prototype.toggle = /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    function (key, emit) {
        if (this.has(key)) {
            this.delete(key, emit);
        }
        else {
            this.select(key, emit);
        }
    };
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    SelectionMap.prototype.delete = /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    function (key, emit) {
        this.map.delete(key);
        if (emit) {
            this.generateImmutableEntries();
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    SelectionMap.prototype.has = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.map.has(key);
    };
    /**
     * @return {?}
     */
    SelectionMap.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.map.clear();
        this.entries = {};
        this.isAll = false;
    };
    return SelectionMap;
}());
export { SelectionMap };
if (false) {
    /** @type {?} */
    SelectionMap.prototype.isAll;
    /** @type {?} */
    SelectionMap.prototype.entries;
    /**
     * @type {?}
     * @private
     */
    SelectionMap.prototype.map;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7SUFBQTtRQUNXLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsWUFBTyxHQUFvQixFQUFFLENBQUM7UUFDcEIsUUFBRyxHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQXlEMUUsQ0FBQztJQXZERyxzQkFBVyw4QkFBSTs7OztRQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDOzs7T0FBQTs7OztJQUVNLCtDQUF3Qjs7O0lBQS9CO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNOzs7OztRQUNoRCxVQUFDLElBQXFCLEVBQUUsRUFBOEI7O2dCQUE5QiwwQkFBOEIsRUFBN0IsV0FBRyxFQUFFLGFBQUs7WUFBd0IsT0FBQSxzQkFBTSxJQUFJLGVBQUcsR0FBRyxJQUFHLEtBQUssT0FBRztRQUEzQixDQUEyQixHQUN0RixFQUFFLENBQ0wsQ0FBQztJQUNOLENBQUM7Ozs7SUFFTSwrQkFBUTs7O0lBQWY7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxzQkFBVyx5Q0FBZTs7OztRQUExQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTs7Ozs7SUFFTSwwQkFBRzs7OztJQUFWLFVBQVcsR0FBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFFTSw2QkFBTTs7Ozs7SUFBYixVQUFjLEdBQVUsRUFBRSxJQUFhO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV4QixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7Ozs7O0lBRU0sNkJBQU07Ozs7O0lBQWIsVUFBYyxHQUFvQixFQUFFLElBQWE7UUFDN0MsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQzs7Ozs7O0lBRU0sNkJBQU07Ozs7O0lBQWIsVUFBYyxHQUFVLEVBQUUsSUFBYTtRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7Ozs7SUFFTSwwQkFBRzs7OztJQUFWLFVBQVcsR0FBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTSw0QkFBSzs7O0lBQVo7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUE1REQsSUE0REM7Ozs7SUEzREcsNkJBQThCOztJQUM5QiwrQkFBcUM7Ozs7O0lBQ3JDLDJCQUFzRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEtleU1hcCwgUm93SWQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbk1hcCB7XHJcbiAgICBwdWJsaWMgaXNBbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBlbnRyaWVzOiBLZXlNYXA8Ym9vbGVhbj4gPSB7fTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWFwOiBNYXA8Um93SWQsIGJvb2xlYW4+ID0gbmV3IE1hcDxSb3dJZCwgYm9vbGVhbj4oKTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVJbW11dGFibGVFbnRyaWVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZW50cmllcyA9IEFycmF5LmZyb20odGhpcy5tYXAuZW50cmllcygpKS5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChtYWluOiBLZXlNYXA8Ym9vbGVhbj4sIFtrZXksIHZhbHVlXTogW1Jvd0lkLCBib29sZWFuXSkgPT4gKHsgLi4ubWFpbiwgW2tleV06IHZhbHVlIH0pLFxyXG4gICAgICAgICAgICB7fVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhc1ZhbHVlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpemUgPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNJbmRldGVybWluYXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhc1ZhbHVlKCkgJiYgIXRoaXMuaXNBbGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldChrZXk6IFJvd0lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldChrZXkpIHx8IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3Qoa2V5OiBSb3dJZCwgZW1pdDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwLnNldChrZXksIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAoZW1pdCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlSW1tdXRhYmxlRW50cmllcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlKGtleTogc3RyaW5nIHwgbnVtYmVyLCBlbWl0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGUoa2V5LCBlbWl0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdChrZXksIGVtaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlKGtleTogUm93SWQsIGVtaXQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICBpZiAoZW1pdCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlSW1tdXRhYmxlRW50cmllcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzKGtleTogUm93SWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5lbnRyaWVzID0ge307XHJcbiAgICAgICAgdGhpcy5pc0FsbCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==