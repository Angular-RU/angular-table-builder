/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { checkValueIsEmpty } from '../../operators/check-value-is-empty';
var UtilsService = /** @class */ (function () {
    function UtilsService(zone) {
        this.zone = zone;
    }
    Object.defineProperty(UtilsService.prototype, "bodyRect", {
        get: /**
         * @return {?}
         */
        function () {
            return document.querySelector('body').getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    UtilsService.replaceUndefinedOrNull = /**
     * @private
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    function (_, value) {
        return checkValueIsEmpty(value) ? undefined : value;
    };
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    UtilsService.prototype.clone = /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return JSON.parse(JSON.stringify(obj || null)) || {};
    };
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    UtilsService.prototype.isObject = /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj === Object(obj);
    };
    /**
     * @template T
     * @param {?} target
     * @param {?} source
     * @return {?}
     */
    UtilsService.prototype.mergeDeep = /**
     * @template T
     * @param {?} target
     * @param {?} source
     * @return {?}
     */
    function (target, source) {
        var _this = this;
        /** @type {?} */
        var output = tslib_1.__assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                var _a, _b;
                if (_this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                    }
                    else {
                        output[key] = _this.mergeDeep(target[key], source[key]);
                    }
                }
                else {
                    Object.assign(output, (_b = {}, _b[key] = source[key], _b));
                }
            }));
        }
        return output;
    };
    /**
     * @param {?} row
     * @param {?=} parentKey
     * @param {?=} keys
     * @return {?}
     */
    UtilsService.prototype.flattenKeysByRow = /**
     * @param {?} row
     * @param {?=} parentKey
     * @param {?=} keys
     * @return {?}
     */
    function (row, parentKey, keys) {
        if (parentKey === void 0) { parentKey = null; }
        if (keys === void 0) { keys = []; }
        for (var key in row) {
            if (!row.hasOwnProperty(key)) {
                continue;
            }
            /** @type {?} */
            var element = row[key];
            /** @type {?} */
            var isObject = typeof element === 'object' && element !== null && !Array.isArray(element);
            if (isObject) {
                /** @type {?} */
                var implicitKey = parentKey ? parentKey + "." + key : key;
                this.flattenKeysByRow(row[key], implicitKey, keys);
            }
            else {
                keys.push(parentKey ? parentKey + "." + key : key);
            }
        }
        return keys;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    UtilsService.prototype.clean = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return JSON.parse(JSON.stringify(obj, UtilsService.replaceUndefinedOrNull.bind(this)));
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    UtilsService.prototype.requestAnimationFrame = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                window.requestAnimationFrame((/**
                 * @return {?}
                 */
                function () {
                    callback();
                    resolve();
                }));
            }));
        }));
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    UtilsService.prototype.microtask = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            callback();
            resolve();
        }));
    };
    /**
     * @param {?} callback
     * @param {?=} time
     * @return {?}
     */
    UtilsService.prototype.macrotask = /**
     * @param {?} callback
     * @param {?=} time
     * @return {?}
     */
    function (callback, time) {
        var _this = this;
        if (time === void 0) { time = 0; }
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    callback();
                    resolve();
                }), time);
            }));
        }));
    };
    UtilsService.SCROLLBAR_WIDTH = 10;
    UtilsService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    UtilsService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return UtilsService;
}());
export { UtilsService };
if (false) {
    /** @type {?} */
    UtilsService.SCROLLBAR_WIDTH;
    /**
     * @type {?}
     * @private
     */
    UtilsService.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXpFO0lBSUksc0JBQTZCLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUcsQ0FBQztJQUU3QyxzQkFBVyxrQ0FBUTs7OztRQUFuQjtZQUNJLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2xFLENBQUM7OztPQUFBOzs7Ozs7O0lBRWMsbUNBQXNCOzs7Ozs7SUFBckMsVUFBc0MsQ0FBUyxFQUFFLEtBQWM7UUFDM0QsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDeEQsQ0FBQzs7Ozs7O0lBRU0sNEJBQUs7Ozs7O0lBQVosVUFBc0IsR0FBTTtRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekQsQ0FBQzs7Ozs7O0lBRU0sK0JBQVE7Ozs7O0lBQWYsVUFBNEIsR0FBTTtRQUM5QixPQUFPLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7OztJQUVNLGdDQUFTOzs7Ozs7SUFBaEIsVUFBb0IsTUFBUyxFQUFFLE1BQVM7UUFBeEMsaUJBaUJDOztZQWhCUyxNQUFNLHdCQUFXLE1BQU0sQ0FBRTtRQUMvQixJ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Q0FBQztZQUNYLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTSxnQ0FBUzs7Ozs7SUFBaEIsVUFBaUIsUUFBWSxFQUFFLElBQWdCO1FBQS9DLGlCQVNDO1FBVDhCLHFCQUFBLEVBQUEsUUFBZ0I7UUFDM0MsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxVQUFDLE9BQVc7WUFDM0IsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7OztZQUFDO2dCQUN4QixNQUFNLENBQUMsVUFBVTs7O2dCQUFDO29CQUNkLFFBQVEsRUFBRSxDQUFDO29CQUNYLE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztZQUNiLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBMUZzQiw0QkFBZSxHQUFXLEVBQUUsQ0FBQzs7Z0JBRnZELFVBQVU7Ozs7Z0JBUFUsTUFBTTs7SUFvRzNCLG1CQUFDO0NBQUEsQUE3RkQsSUE2RkM7U0E1RlksWUFBWTs7O0lBQ3JCLDZCQUFvRDs7Ozs7SUFFeEMsNEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUYWJsZVJvdyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IEFueSwgRm4sIEtleU1hcCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IFV0aWxzSW50ZXJmYWNlIH0gZnJvbSAnLi91dGlscy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBjaGVja1ZhbHVlSXNFbXB0eSB9IGZyb20gJy4uLy4uL29wZXJhdG9ycy9jaGVjay12YWx1ZS1pcy1lbXB0eSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVdGlsc1NlcnZpY2UgaW1wbGVtZW50cyBVdGlsc0ludGVyZmFjZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNDUk9MTEJBUl9XSURUSDogbnVtYmVyID0gMTA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSB6b25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gICAgcHVibGljIGdldCBib2R5UmVjdCgpOiBDbGllbnRSZWN0IHwgRE9NUmVjdCB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZXBsYWNlVW5kZWZpbmVkT3JOdWxsKF86IHN0cmluZywgdmFsdWU6IHVua25vd24pOiB1bmtub3duIHtcclxuICAgICAgICByZXR1cm4gY2hlY2tWYWx1ZUlzRW1wdHkodmFsdWUpID8gdW5kZWZpbmVkIDogdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb25lPFQgPSBBbnk+KG9iajogVCk6IFQge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaiB8fCBudWxsKSkgfHwge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzT2JqZWN0PFQgPSBvYmplY3Q+KG9iajogVCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtZXJnZURlZXA8VD4odGFyZ2V0OiBULCBzb3VyY2U6IFQpOiBUIHtcclxuICAgICAgICBjb25zdCBvdXRwdXQ6IFQgPSB7IC4uLnRhcmdldCB9O1xyXG4gICAgICAgIGlmICh0aGlzLmlzT2JqZWN0KHRhcmdldCkgJiYgdGhpcy5pc09iamVjdChzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT2JqZWN0KHNvdXJjZVtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCB7IFtrZXldOiBzb3VyY2Vba2V5XSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHRoaXMubWVyZ2VEZWVwKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgeyBba2V5XTogc291cmNlW2tleV0gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmxhdHRlbktleXNCeVJvdyhyb3c6IFRhYmxlUm93LCBwYXJlbnRLZXk6IHN0cmluZyA9IG51bGwsIGtleXM6IHN0cmluZ1tdID0gW10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcm93KSB7XHJcbiAgICAgICAgICAgIGlmICghcm93Lmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50OiBBbnkgPSByb3dba2V5XTtcclxuICAgICAgICAgICAgY29uc3QgaXNPYmplY3Q6IGJvb2xlYW4gPSB0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcgJiYgZWxlbWVudCAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc09iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1wbGljaXRLZXk6IHN0cmluZyA9IHBhcmVudEtleSA/IGAke3BhcmVudEtleX0uJHtrZXl9YCA6IGtleTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxhdHRlbktleXNCeVJvdyhyb3dba2V5XSwgaW1wbGljaXRLZXksIGtleXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKHBhcmVudEtleSA/IGAke3BhcmVudEtleX0uJHtrZXl9YCA6IGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhbihvYmo6IEtleU1hcCk6IEtleU1hcCB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqLCBVdGlsc1NlcnZpY2UucmVwbGFjZVVuZGVmaW5lZE9yTnVsbC5iaW5kKHRoaXMpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjazogRm4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IEZuKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWljcm90YXNrKGNhbGxiYWNrOiBGbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogRm4pOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYWNyb3Rhc2soY2FsbGJhY2s6IEZuLCB0aW1lOiBudW1iZXIgPSAwKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBGbik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==