/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { checkValueIsEmpty } from '../../operators/check-value-is-empty';
export class UtilsService {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
    }
    /**
     * @return {?}
     */
    get bodyRect() {
        return document.querySelector('body').getBoundingClientRect();
    }
    /**
     * @private
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    static replaceUndefinedOrNull(_, value) {
        return checkValueIsEmpty(value) ? undefined : value;
    }
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    clone(obj) {
        return JSON.parse(JSON.stringify(obj || null)) || {};
    }
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    isObject(obj) {
        return obj === Object(obj);
    }
    /**
     * @template T
     * @param {?} target
     * @param {?} source
     * @return {?}
     */
    mergeDeep(target, source) {
        /** @type {?} */
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    }
                    else {
                        output[key] = this.mergeDeep(target[key], source[key]);
                    }
                }
                else {
                    Object.assign(output, { [key]: source[key] });
                }
            }));
        }
        return output;
    }
    /**
     * @param {?} row
     * @param {?=} parentKey
     * @param {?=} keys
     * @return {?}
     */
    flattenKeysByRow(row, parentKey = null, keys = []) {
        for (const key in row) {
            if (!row.hasOwnProperty(key)) {
                continue;
            }
            /** @type {?} */
            const element = row[key];
            /** @type {?} */
            const isObject = typeof element === 'object' && element !== null && !Array.isArray(element);
            if (isObject) {
                /** @type {?} */
                const implicitKey = parentKey ? `${parentKey}.${key}` : key;
                this.flattenKeysByRow(row[key], implicitKey, keys);
            }
            else {
                keys.push(parentKey ? `${parentKey}.${key}` : key);
            }
        }
        return keys;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    clean(obj) {
        return JSON.parse(JSON.stringify(obj, UtilsService.replaceUndefinedOrNull.bind(this)));
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    requestAnimationFrame(callback) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                window.requestAnimationFrame((/**
                 * @return {?}
                 */
                () => {
                    callback();
                    resolve();
                }));
            }));
        }));
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    microtask(callback) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            callback();
            resolve();
        }));
    }
    /**
     * @param {?} callback
     * @param {?=} time
     * @return {?}
     */
    macrotask(callback, time = 0) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    callback();
                    resolve();
                }), time);
            }));
        }));
    }
}
UtilsService.SCROLLBAR_WIDTH = 10;
UtilsService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
UtilsService.ctorParameters = () => [
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    UtilsService.SCROLLBAR_WIDTH;
    /**
     * @type {?}
     * @private
     */
    UtilsService.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFHekUsTUFBTSxPQUFPLFlBQVk7Ozs7SUFHckIsWUFBNkIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDOzs7O0lBRTdDLElBQVcsUUFBUTtRQUNmLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2xFLENBQUM7Ozs7Ozs7SUFFTyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBUyxFQUFFLEtBQWM7UUFDM0QsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDeEQsQ0FBQzs7Ozs7O0lBRU0sS0FBSyxDQUFVLEdBQU07UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQUVNLFFBQVEsQ0FBYSxHQUFNO1FBQzlCLE9BQU8sR0FBRyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7O0lBRU0sU0FBUyxDQUFJLE1BQVMsRUFBRSxNQUFTOztjQUM5QixNQUFNLHFCQUFXLE1BQU0sQ0FBRTtRQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFD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QyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU0sU0FBUyxDQUFDLFFBQVksRUFBRSxPQUFlLENBQUM7UUFDM0MsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxDQUFDLE9BQVcsRUFBUSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUNuQixRQUFRLEVBQUUsQ0FBQztvQkFDWCxPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7WUFDYixDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7QUExRnNCLDRCQUFlLEdBQVcsRUFBRSxDQUFDOztZQUZ2RCxVQUFVOzs7O1lBUFUsTUFBTTs7OztJQVN2Qiw2QkFBb0Q7Ozs7O0lBRXhDLDRCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBBbnksIEZuLCBLZXlNYXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBVdGlsc0ludGVyZmFjZSB9IGZyb20gJy4vdXRpbHMuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgY2hlY2tWYWx1ZUlzRW1wdHkgfSBmcm9tICcuLi8uLi9vcGVyYXRvcnMvY2hlY2stdmFsdWUtaXMtZW1wdHknO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXRpbHNTZXJ2aWNlIGltcGxlbWVudHMgVXRpbHNJbnRlcmZhY2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTQ1JPTExCQVJfV0lEVEg6IG51bWJlciA9IDEwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgem9uZTogTmdab25lKSB7fVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYm9keVJlY3QoKTogQ2xpZW50UmVjdCB8IERPTVJlY3Qge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVwbGFjZVVuZGVmaW5lZE9yTnVsbChfOiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKTogdW5rbm93biB7XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrVmFsdWVJc0VtcHR5KHZhbHVlKSA/IHVuZGVmaW5lZCA6IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9uZTxUID0gQW55PihvYmo6IFQpOiBUIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmogfHwgbnVsbCkpIHx8IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc09iamVjdDxUID0gb2JqZWN0PihvYmo6IFQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWVyZ2VEZWVwPFQ+KHRhcmdldDogVCwgc291cmNlOiBUKTogVCB7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0OiBUID0geyAuLi50YXJnZXQgfTtcclxuICAgICAgICBpZiAodGhpcy5pc09iamVjdCh0YXJnZXQpICYmIHRoaXMuaXNPYmplY3Qoc291cmNlKSkge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09iamVjdChzb3VyY2Vba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgeyBba2V5XTogc291cmNlW2tleV0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB0aGlzLm1lcmdlRGVlcCh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIHsgW2tleV06IHNvdXJjZVtrZXldIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZsYXR0ZW5LZXlzQnlSb3cocm93OiBUYWJsZVJvdywgcGFyZW50S2V5OiBzdHJpbmcgPSBudWxsLCBrZXlzOiBzdHJpbmdbXSA9IFtdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJvdykge1xyXG4gICAgICAgICAgICBpZiAoIXJvdy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudDogQW55ID0gcm93W2tleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGlzT2JqZWN0OiBib29sZWFuID0gdHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnICYmIGVsZW1lbnQgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGltcGxpY2l0S2V5OiBzdHJpbmcgPSBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9LiR7a2V5fWAgOiBrZXk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsYXR0ZW5LZXlzQnlSb3cocm93W2tleV0sIGltcGxpY2l0S2V5LCBrZXlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGtleXMucHVzaChwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9LiR7a2V5fWAgOiBrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ga2V5cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYW4ob2JqOiBLZXlNYXApOiBLZXlNYXAge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaiwgVXRpbHNTZXJ2aWNlLnJlcGxhY2VVbmRlZmluZWRPck51bGwuYmluZCh0aGlzKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2s6IEZuKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBGbik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1pY3JvdGFzayhjYWxsYmFjazogRm4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IEZuKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFjcm90YXNrKGNhbGxiYWNrOiBGbiwgdGltZTogbnVtYmVyID0gMCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogRm4pOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=