/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class SelectionMap {
    constructor() {
        this.isAll = false;
        this.entries = {};
        this.map = new Map();
    }
    /**
     * @return {?}
     */
    get size() {
        return this.map.size;
    }
    /**
     * @return {?}
     */
    generateImmutableEntries() {
        this.entries = Array.from(this.map.entries()).reduce((/**
         * @param {?} main
         * @param {?} __1
         * @return {?}
         */
        (main, [key, value]) => (Object.assign({}, main, { [key]: value }))), {});
    }
    /**
     * @return {?}
     */
    hasValue() {
        return this.size > 0;
    }
    /**
     * @return {?}
     */
    get isIndeterminate() {
        return this.hasValue() && !this.isAll;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.map.get(key) || false;
    }
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    select(key, emit) {
        this.map.set(key, true);
        if (emit) {
            this.generateImmutableEntries();
        }
    }
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    toggle(key, emit) {
        if (this.has(key)) {
            this.delete(key, emit);
        }
        else {
            this.select(key, emit);
        }
    }
    /**
     * @param {?} key
     * @param {?} emit
     * @return {?}
     */
    delete(key, emit) {
        this.map.delete(key);
        if (emit) {
            this.generateImmutableEntries();
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    has(key) {
        return this.map.has(key);
    }
    /**
     * @return {?}
     */
    clear() {
        this.map.clear();
        this.entries = {};
        this.isAll = false;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sWUFBWTtJQUF6QjtRQUNXLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsWUFBTyxHQUFvQixFQUFFLENBQUM7UUFDcEIsUUFBRyxHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQXlEMUUsQ0FBQzs7OztJQXZERyxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFTSx3QkFBd0I7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNOzs7OztRQUNoRCxDQUFDLElBQXFCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFtQixFQUFFLEVBQUUsQ0FBQyxtQkFBTSxJQUFJLElBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUcsR0FDdEYsRUFBRSxDQUNMLENBQUM7SUFDTixDQUFDOzs7O0lBRU0sUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQVcsZUFBZTtRQUN0QixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFTSxHQUFHLENBQUMsR0FBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFFTSxNQUFNLENBQUMsR0FBVSxFQUFFLElBQWE7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhCLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7Ozs7SUFFTSxNQUFNLENBQUMsR0FBb0IsRUFBRSxJQUFhO1FBQzdDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMxQjtJQUNMLENBQUM7Ozs7OztJQUVNLE1BQU0sQ0FBQyxHQUFVLEVBQUUsSUFBYTtRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7Ozs7SUFFTSxHQUFHLENBQUMsR0FBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0NBQ0o7OztJQTNERyw2QkFBOEI7O0lBQzlCLCtCQUFxQzs7Ozs7SUFDckMsMkJBQXNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS2V5TWFwLCBSb3dJZCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uTWFwIHtcclxuICAgIHB1YmxpYyBpc0FsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGVudHJpZXM6IEtleU1hcDxib29sZWFuPiA9IHt9O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtYXA6IE1hcDxSb3dJZCwgYm9vbGVhbj4gPSBuZXcgTWFwPFJvd0lkLCBib29sZWFuPigpO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZW5lcmF0ZUltbXV0YWJsZUVudHJpZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbnRyaWVzID0gQXJyYXkuZnJvbSh0aGlzLm1hcC5lbnRyaWVzKCkpLnJlZHVjZShcclxuICAgICAgICAgICAgKG1haW46IEtleU1hcDxib29sZWFuPiwgW2tleSwgdmFsdWVdOiBbUm93SWQsIGJvb2xlYW5dKSA9PiAoeyAuLi5tYWluLCBba2V5XTogdmFsdWUgfSksXHJcbiAgICAgICAgICAgIHt9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzVmFsdWUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0luZGV0ZXJtaW5hdGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzVmFsdWUoKSAmJiAhdGhpcy5pc0FsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0KGtleTogUm93SWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0KGtleSkgfHwgZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdChrZXk6IFJvd0lkLCBlbWl0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXAuc2V0KGtleSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmIChlbWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVJbW11dGFibGVFbnRyaWVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGUoa2V5OiBzdHJpbmcgfCBudW1iZXIsIGVtaXQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZShrZXksIGVtaXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGtleSwgZW1pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGUoa2V5OiBSb3dJZCwgZW1pdDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIGlmIChlbWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVJbW11dGFibGVFbnRyaWVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXMoa2V5OiBSb3dJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXAuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmVudHJpZXMgPSB7fTtcclxuICAgICAgICB0aGlzLmlzQWxsID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19