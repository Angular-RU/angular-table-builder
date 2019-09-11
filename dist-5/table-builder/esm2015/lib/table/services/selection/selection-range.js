/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class SelectionRange {
    constructor() {
        this.start = null;
        this.end = null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    put(index) {
        if (this.start === null) {
            this.start = index;
        }
        else {
            this.end = index;
        }
    }
    /**
     * @return {?}
     */
    clear() {
        this.start = null;
        this.end = null;
    }
    /**
     * @return {?}
     */
    sortKeys() {
        const [start, end] = [this.start, this.end].sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a - b));
        this.start = start;
        this.end = end;
        return this;
    }
    /**
     * @return {?}
     */
    selectedRange() {
        return this.start !== null && this.end !== null;
    }
}
if (false) {
    /** @type {?} */
    SelectionRange.prototype.start;
    /** @type {?} */
    SelectionRange.prototype.end;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLXJhbmdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLXJhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sY0FBYztJQUEzQjtRQUNXLFVBQUssR0FBVyxJQUFJLENBQUM7UUFDckIsUUFBRyxHQUFXLElBQUksQ0FBQztJQTBCOUIsQ0FBQzs7Ozs7SUF4QlUsR0FBRyxDQUFDLEtBQWE7UUFDcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUN0QjthQUFNO1lBQ0gsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDcEI7SUFDTCxDQUFDOzs7O0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFTSxRQUFRO2NBQ0wsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJOzs7OztRQUFDLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQztRQUMzRixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVmLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFTSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUM7SUFDcEQsQ0FBQztDQUNKOzs7SUEzQkcsK0JBQTRCOztJQUM1Qiw2QkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2VsZWN0aW9uUmFuZ2Uge1xyXG4gICAgcHVibGljIHN0YXJ0OiBudW1iZXIgPSBudWxsO1xyXG4gICAgcHVibGljIGVuZDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgcHV0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zdGFydCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gaW5kZXg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZW5kID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29ydEtleXMoKTogU2VsZWN0aW9uUmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXTogbnVtYmVyW10gPSBbdGhpcy5zdGFydCwgdGhpcy5lbmRdLnNvcnQoKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBhIC0gYik7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xyXG4gICAgICAgIHRoaXMuZW5kID0gZW5kO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRSYW5nZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydCAhPT0gbnVsbCAmJiB0aGlzLmVuZCAhPT0gbnVsbDtcclxuICAgIH1cclxufVxyXG4iXX0=