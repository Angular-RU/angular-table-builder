/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} message
 * @return {?}
 */
export function sortWorker(message) {
    /** @enum {string} */
    var OrderType = {
        DESC: 'desc',
        SKIP: 'skip',
    };
    /**
     * @param {?} object
     * @param {?} path
     * @return {?}
     */
    function getValueByPath(object, path) {
        return path ? path.split('.').reduce((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        function (value, key) { return value && value[key]; }), object) : object;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function checkValueIsEmpty(value) {
        /** @type {?} */
        var val = typeof value === 'string' ? value.trim() : value;
        return [undefined, null, NaN, '', 'null', Infinity].includes(val);
    }
    var Sortable = /** @class */ (function () {
        function Sortable() {
        }
        /**
         * @param {?} data
         * @param {?} keys
         * @return {?}
         */
        Sortable.sortByKeys = /**
         * @param {?} data
         * @param {?} keys
         * @return {?}
         */
        function (data, keys) {
            /** @type {?} */
            var countKeys = Object.keys(keys).length;
            if (!countKeys) {
                return data.sort(Sortable.shallowSort);
            }
            /** @type {?} */
            var matches = Sortable.getMatchesKeys(keys);
            return data.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return Sortable.multiSort(a, b, matches); }));
        };
        /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?} matches
         * @return {?}
         */
        Sortable.multiSort = /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?} matches
         * @return {?}
         */
        function (a, b, matches) {
            /** @type {?} */
            var countKeys = Object.keys(matches).length;
            /** @type {?} */
            var sorted = 0;
            /** @type {?} */
            var ix = 0;
            while (sorted === 0 && ix < countKeys) {
                /** @type {?} */
                var key = Sortable.observeKey(matches, ix);
                if (key) {
                    /** @type {?} */
                    var depth = matches[key];
                    sorted = Sortable.deepSort(key, a, b, depth);
                    ix++;
                }
            }
            return sorted;
        };
        /**
         * @private
         * @param {?} keys
         * @return {?}
         */
        Sortable.getMatchesKeys = /**
         * @private
         * @param {?} keys
         * @return {?}
         */
        function (keys) {
            /** @type {?} */
            var matches = {};
            for (var key in keys) {
                if (keys.hasOwnProperty(key)) {
                    matches[key] =
                        keys[key] === OrderType.DESC || keys[key] === -1
                            ? -1
                            : keys[key] === OrderType.SKIP || keys[key] === 0
                                ? 0
                                : 1;
                }
            }
            return matches;
        };
        /**
         * @private
         * @param {?} key
         * @param {?} leftHand
         * @param {?} rightHand
         * @param {?} depth
         * @return {?}
         */
        Sortable.deepSort = /**
         * @private
         * @param {?} key
         * @param {?} leftHand
         * @param {?} rightHand
         * @param {?} depth
         * @return {?}
         */
        function (key, leftHand, rightHand, depth) {
            /** @type {?} */
            var a = getValueByPath(leftHand, key);
            /** @type {?} */
            var b = getValueByPath(rightHand, key);
            return this.shallowSort(a, b, depth);
        };
        /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?=} depth
         * @return {?}
         */
        Sortable.shallowSort = /**
         * @private
         * @param {?} a
         * @param {?} b
         * @param {?=} depth
         * @return {?}
         */
        function (a, b, depth) {
            /** @type {?} */
            var currentDepth = depth !== null ? depth : 1;
            b = checkValueIsEmpty(b) ? '' : b;
            if (a === b) {
                return 0;
            }
            return a > b ? currentDepth : -1 * currentDepth;
        };
        /**
         * @private
         * @param {?} keys
         * @param {?} count
         * @return {?}
         */
        Sortable.observeKey = /**
         * @private
         * @param {?} keys
         * @param {?} count
         * @return {?}
         */
        function (keys, count) {
            /** @type {?} */
            var key;
            /** @type {?} */
            var size = 0;
            for (key in keys) {
                if (keys.hasOwnProperty(key)) {
                    if (size === count) {
                        return key;
                    }
                    size++;
                }
            }
            return null;
        };
        return Sortable;
    }());
    return Sortable.sortByKeys(message.source, (/** @type {?} */ (message.definition)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC53b3JrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3NvcnRhYmxlL3NvcnQud29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUF3Qjs7O1FBRTNDLE1BQU8sTUFBTTtRQUNiLE1BQU8sTUFBTTs7Ozs7OztJQUdqQixTQUFTLGNBQWMsQ0FBQyxNQUFjLEVBQUUsSUFBWTtRQUNoRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNOzs7OztRQUFDLFVBQUMsS0FBYSxFQUFFLEdBQVcsSUFBSyxPQUFBLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQW5CLENBQW1CLEdBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUMvRyxDQUFDOzs7OztJQUVELFNBQVMsaUJBQWlCLENBQUMsS0FBVTs7WUFDM0IsR0FBRyxHQUFXLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQ3BFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7UUFBQTtRQStFQSxDQUFDOzs7Ozs7UUE5RWlCLG1CQUFVOzs7OztRQUF4QixVQUF5QixJQUFnQixFQUFFLElBQXVCOztnQkFDeEQsU0FBUyxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtZQUVsRCxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNaLE9BQU8sSUFBSSxDQUFD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Ozs7Ozs7UUFFYyxtQkFBVTs7Ozs7O1FBQXpCLFVBQTBCLElBQW9CLEVBQUUsS0FBYTs7Z0JBQ3JELEdBQVc7O2dCQUNYLElBQUksR0FBVyxDQUFDO1lBRXBCLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDZCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzFCLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTt3QkFDaEIsT0FBTyxHQUFHLENBQUM7cUJBQ2Q7b0JBRUQsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7YUFDSjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQS9FRCxJQStFQztJQUVELE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLG1CQUFBLE9BQU8sQ0FBQyxVQUFVLEVBQU8sQ0FBQyxDQUFDO0FBQzFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJsZVJvdyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IFNvcnRhYmxlTWVzc2FnZSB9IGZyb20gJy4vc29ydGFibGUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEFueSwgS2V5TWFwIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0V29ya2VyKG1lc3NhZ2U6IFNvcnRhYmxlTWVzc2FnZSk6IFRhYmxlUm93W10ge1xyXG4gICAgZW51bSBPcmRlclR5cGUge1xyXG4gICAgICAgIERFU0MgPSAnZGVzYycsXHJcbiAgICAgICAgU0tJUCA9ICdza2lwJ1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFZhbHVlQnlQYXRoKG9iamVjdDogS2V5TWFwLCBwYXRoOiBzdHJpbmcpOiBLZXlNYXAgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiBwYXRoID8gcGF0aC5zcGxpdCgnLicpLnJlZHVjZSgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHZhbHVlICYmIHZhbHVlW2tleV0sIG9iamVjdCkgOiBvYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tWYWx1ZUlzRW1wdHkodmFsdWU6IEFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHZhbDogc3RyaW5nID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlLnRyaW0oKSA6IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBbdW5kZWZpbmVkLCBudWxsLCBOYU4sICcnLCAnbnVsbCcsIEluZmluaXR5XS5pbmNsdWRlcyh2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFNvcnRhYmxlIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNvcnRCeUtleXMoZGF0YTogVGFibGVSb3dbXSwga2V5czogS2V5TWFwPE9yZGVyVHlwZT4pOiBBbnlbXSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdW50S2V5czogbnVtYmVyID0gT2JqZWN0LmtleXMoa2V5cykubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb3VudEtleXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnNvcnQoU29ydGFibGUuc2hhbGxvd1NvcnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzOiBLZXlNYXA8bnVtYmVyPiA9IFNvcnRhYmxlLmdldE1hdGNoZXNLZXlzKGtleXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5zb3J0KChhOiB1bmtub3duLCBiOiB1bmtub3duKSA9PiBTb3J0YWJsZS5tdWx0aVNvcnQoYSwgYiwgbWF0Y2hlcykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbXVsdGlTb3J0KGE6IHVua25vd24sIGI6IHVua25vd24sIG1hdGNoZXM6IEtleU1hcDxudW1iZXI+KTogQW55IHtcclxuICAgICAgICAgICAgY29uc3QgY291bnRLZXlzOiBudW1iZXIgPSBPYmplY3Qua2V5cyhtYXRjaGVzKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBzb3J0ZWQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCBpeDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChzb3J0ZWQgPT09IDAgJiYgaXggPCBjb3VudEtleXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gU29ydGFibGUub2JzZXJ2ZUtleShtYXRjaGVzLCBpeCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVwdGg6IG51bWJlciA9IG1hdGNoZXNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0ZWQgPSBTb3J0YWJsZS5kZWVwU29ydChrZXksIGEsIGIsIGRlcHRoKTtcclxuICAgICAgICAgICAgICAgICAgICBpeCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc29ydGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TWF0Y2hlc0tleXMoa2V5czogS2V5TWFwPE9yZGVyVHlwZSB8IG51bWJlcj4pOiBLZXlNYXA8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXM6IEtleU1hcDxudW1iZXI+ID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBrZXlzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlc1trZXldID1cclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5c1trZXldID09PSBPcmRlclR5cGUuREVTQyB8fCBrZXlzW2tleV0gPT09IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGtleXNba2V5XSA9PT0gT3JkZXJUeXBlLlNLSVAgfHwga2V5c1trZXldID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkZWVwU29ydChrZXk6IHN0cmluZywgbGVmdEhhbmQ6IEFueSwgcmlnaHRIYW5kOiBBbnksIGRlcHRoOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBjb25zdCBhOiBBbnkgPSBnZXRWYWx1ZUJ5UGF0aChsZWZ0SGFuZCwga2V5KTtcclxuICAgICAgICAgICAgY29uc3QgYjogQW55ID0gZ2V0VmFsdWVCeVBhdGgocmlnaHRIYW5kLCBrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFsbG93U29ydChhLCBiLCBkZXB0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzaGFsbG93U29ydChhOiBBbnksIGI6IEFueSwgZGVwdGg/OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGVwdGg6IG51bWJlciA9IGRlcHRoICE9PSBudWxsID8gZGVwdGggOiAxO1xyXG4gICAgICAgICAgICBiID0gY2hlY2tWYWx1ZUlzRW1wdHkoYikgPyAnJyA6IGI7XHJcblxyXG4gICAgICAgICAgICBpZiAoYSA9PT0gYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhID4gYiA/IGN1cnJlbnREZXB0aCA6IC0xICogY3VycmVudERlcHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgb2JzZXJ2ZUtleShrZXlzOiBLZXlNYXA8bnVtYmVyPiwgY291bnQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCBrZXk6IHN0cmluZztcclxuICAgICAgICAgICAgbGV0IHNpemU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBrZXlzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgPT09IGNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzaXplKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gU29ydGFibGUuc29ydEJ5S2V5cyhtZXNzYWdlLnNvdXJjZSwgbWVzc2FnZS5kZWZpbml0aW9uIGFzIEFueSk7XHJcbn1cclxuIl19