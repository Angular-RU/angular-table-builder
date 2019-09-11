/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} __0
 * @return {?}
 */
export function filterAllWorker({ source, global, types, columns }) {
    /** @enum {number} */
    const Terminate = {
        CONTINUE: -1,
        BREAK: 0,
        NEXT: 1,
    };
    Terminate[Terminate.CONTINUE] = 'CONTINUE';
    Terminate[Terminate.BREAK] = 'BREAK';
    Terminate[Terminate.NEXT] = 'NEXT';
    const { value, type } = global;
    /** @type {?} */
    let result = source;
    if (value) {
        result = source.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            return type === types.DOES_NOT_CONTAIN ? !includes(JSON.stringify(item), value) : globalFilter(item);
        }));
    }
    if (!columns.isEmpty) {
        result = result.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => multipleFilter(item)));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function globalFilter(item) {
        /** @type {?} */
        let satisfiesItem = false;
        /** @type {?} */
        const flattenedItem = flatten(item);
        for (const keyModel of Object.keys(flattenedItem)) {
            /** @type {?} */
            const fieldValue = String(flattenedItem[keyModel]);
            const [terminate, satisfies] = getSatisfies(fieldValue, value, type);
            satisfiesItem = satisfies;
            if (terminate === Terminate.CONTINUE) {
                continue;
            }
            else if (terminate === Terminate.BREAK) {
                break;
            }
            if (satisfiesItem) {
                break;
            }
        }
        return satisfiesItem;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function multipleFilter(item) {
        /** @type {?} */
        let matches = true;
        for (const fieldKey of Object.keys(columns.values)) {
            /** @type {?} */
            const fieldValue = String(getValueByPath(item, fieldKey) || '').trim();
            /** @type {?} */
            const findKeyValue = String(columns.values[fieldKey]);
            /** @type {?} */
            const fieldType = columns.types[fieldKey];
            const [terminate, satisfies] = getSatisfies(fieldValue, findKeyValue, fieldType);
            matches = matches && satisfies;
            if (!matches || terminate === Terminate.BREAK) {
                break;
            }
        }
        return matches;
    }
    /**
     * @param {?} field
     * @param {?} substring
     * @param {?} fieldType
     * @return {?}
     */
    function getSatisfies(field, substring, fieldType) {
        /** @type {?} */
        let satisfies = false;
        /** @type {?} */
        let terminate = Terminate.NEXT;
        if (fieldType === types.START_WITH) {
            satisfies = field.toLocaleLowerCase().startsWith(substring.toLocaleLowerCase());
        }
        else if (fieldType === types.END_WITH) {
            /** @type {?} */
            const regexp = new RegExp(`${escaped(substring)}$`);
            satisfies = !!field.match(regexp);
        }
        else if (fieldType === types.CONTAINS) {
            satisfies = includes(field, substring);
        }
        else if (fieldType === types.EQUALS) {
            satisfies = field === substring;
        }
        else if (fieldType === types.DOES_NOT_EQUAL) {
            if (field !== substring) {
                satisfies = true;
                terminate = Terminate.CONTINUE;
            }
            else {
                satisfies = false;
                terminate = Terminate.BREAK;
            }
        }
        return [terminate, satisfies];
    }
    /**
     * @param {?} origin
     * @param {?} substring
     * @return {?}
     */
    function includes(origin, substring) {
        return origin.toLocaleLowerCase().includes(substring.toLocaleLowerCase());
    }
    /**
     * @param {?} escapedValue
     * @return {?}
     */
    function escaped(escapedValue) {
        return escapedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    /**
     * @template T
     * @param {?} object
     * @param {?=} excludeKeys
     * @return {?}
     */
    function flatten(object, excludeKeys = []) {
        /** @type {?} */
        const depthGraph = {};
        for (const key in object) {
            if (object.hasOwnProperty(key) && !excludeKeys.includes(key)) {
                mutate(object, depthGraph, key);
            }
        }
        return depthGraph;
    }
    /**
     * @param {?} object
     * @param {?} path
     * @return {?}
     */
    function getValueByPath(object, path) {
        return path ? path.split('.').reduce((/**
         * @param {?} str
         * @param {?} key
         * @return {?}
         */
        (str, key) => str && str[key]), object) : object;
    }
    /**
     * @template T
     * @param {?} object
     * @param {?} depthGraph
     * @param {?} key
     * @return {?}
     */
    function mutate(object, depthGraph, key) {
        /** @type {?} */
        const isObject = typeof object[key] === 'object' && object[key] !== null;
        if (isObject) {
            /** @type {?} */
            const flatObject = flatten(object[key]);
            for (const path in flatObject) {
                if (flatObject.hasOwnProperty(path)) {
                    depthGraph[`${key}.${path}`] = flatObject[path];
                }
            }
        }
        else {
            depthGraph[key] = object[key];
        }
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLndvcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXIud29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsTUFBTSxVQUFVLGVBQWUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBcUI7OztRQUU3RSxZQUFhO1FBQ2IsUUFBUztRQUNULE9BQVE7Ozs7O1VBR04sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQXFCLE1BQU07O1FBQzVDLE1BQU0sR0FBZSxNQUFNO0lBRS9CLElBQUksS0FBSyxFQUFFO1FBQ1AsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxJQUFjLEVBQUUsRUFBRTtZQUN0QyxPQUFPLElBQUksS0FBSyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RyxDQUFDLEVBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDbEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxJQUFjLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO0tBQ3BFOzs7OztJQUVELFNBQVMsWUFBWSxDQUFDLElBQWM7O1lBQzVCLGFBQWEsR0FBWSxLQUFLOztjQUM1QixhQUFhLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUUzQyxLQUFLLE1BQU0sUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7O2tCQUN6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RyxDQUFDLENBQUM7WUFDL0MsS0FBSyxNQUFNLElBQUksSUFBSSxVQUFVLEVBQUU7Z0JBQzNCLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDakMsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNuRDthQUNKO1NBQ0o7YUFBTTtZQUNILFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbHRlcmFibGVNZXNzYWdlLCBGaWx0ZXJHbG9iYWxPcHRzLCBUYWJsZUZpbHRlclR5cGUgfSBmcm9tICcuL2ZpbHRlcmFibGUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBLZXlNYXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckFsbFdvcmtlcih7IHNvdXJjZSwgZ2xvYmFsLCB0eXBlcywgY29sdW1ucyB9OiBGaWx0ZXJhYmxlTWVzc2FnZSk6IFRhYmxlUm93W10ge1xyXG4gICAgZW51bSBUZXJtaW5hdGUge1xyXG4gICAgICAgIENPTlRJTlVFID0gLTEsXHJcbiAgICAgICAgQlJFQUsgPSAwLFxyXG4gICAgICAgIE5FWFQgPSAxXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyB2YWx1ZSwgdHlwZSB9OiBGaWx0ZXJHbG9iYWxPcHRzID0gZ2xvYmFsO1xyXG4gICAgbGV0IHJlc3VsdDogVGFibGVSb3dbXSA9IHNvdXJjZTtcclxuXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICByZXN1bHQgPSBzb3VyY2UuZmlsdGVyKChpdGVtOiBUYWJsZVJvdykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gdHlwZXMuRE9FU19OT1RfQ09OVEFJTiA/ICFpbmNsdWRlcyhKU09OLnN0cmluZ2lmeShpdGVtKSwgdmFsdWUpIDogZ2xvYmFsRmlsdGVyKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29sdW1ucy5pc0VtcHR5KSB7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmZpbHRlcigoaXRlbTogVGFibGVSb3cpID0+IG11bHRpcGxlRmlsdGVyKGl0ZW0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnbG9iYWxGaWx0ZXIoaXRlbTogVGFibGVSb3cpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgc2F0aXNmaWVzSXRlbTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGZsYXR0ZW5lZEl0ZW06IEtleU1hcCA9IGZsYXR0ZW4oaXRlbSk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5TW9kZWwgb2YgT2JqZWN0LmtleXMoZmxhdHRlbmVkSXRlbSkpIHtcclxuICAgICAgICAgICAgY29uc3QgZmllbGRWYWx1ZTogc3RyaW5nID0gU3RyaW5nKGZsYXR0ZW5lZEl0ZW1ba2V5TW9kZWxdKTtcclxuICAgICAgICAgICAgY29uc3QgW3Rlcm1pbmF0ZSwgc2F0aXNmaWVzXTogU2F0aXNmaWVzID0gZ2V0U2F0aXNmaWVzKGZpZWxkVmFsdWUsIHZhbHVlLCB0eXBlKTtcclxuXHJcbiAgICAgICAgICAgIHNhdGlzZmllc0l0ZW0gPSBzYXRpc2ZpZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVybWluYXRlID09PSBUZXJtaW5hdGUuQ09OVElOVUUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlcm1pbmF0ZSA9PT0gVGVybWluYXRlLkJSRUFLKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNhdGlzZmllc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2F0aXNmaWVzSXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtdWx0aXBsZUZpbHRlcihpdGVtOiBUYWJsZVJvdyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBtYXRjaGVzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBmaWVsZEtleSBvZiBPYmplY3Qua2V5cyhjb2x1bW5zLnZhbHVlcykpIHtcclxuICAgICAgICAgICAgY29uc3QgZmllbGRWYWx1ZTogc3RyaW5nID0gU3RyaW5nKGdldFZhbHVlQnlQYXRoKGl0ZW0sIGZpZWxkS2V5KSB8fCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICBjb25zdCBmaW5kS2V5VmFsdWU6IHN0cmluZyA9IFN0cmluZyhjb2x1bW5zLnZhbHVlc1tmaWVsZEtleV0pO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZFR5cGU6IFRhYmxlRmlsdGVyVHlwZSA9IGNvbHVtbnMudHlwZXNbZmllbGRLZXldO1xyXG4gICAgICAgICAgICBjb25zdCBbdGVybWluYXRlLCBzYXRpc2ZpZXNdOiBTYXRpc2ZpZXMgPSBnZXRTYXRpc2ZpZXMoZmllbGRWYWx1ZSwgZmluZEtleVZhbHVlLCBmaWVsZFR5cGUpO1xyXG4gICAgICAgICAgICBtYXRjaGVzID0gbWF0Y2hlcyAmJiBzYXRpc2ZpZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZXMgfHwgdGVybWluYXRlID09PSBUZXJtaW5hdGUuQlJFQUspIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcclxuICAgIH1cclxuXHJcbiAgICB0eXBlIFNhdGlzZmllcyA9IFtUZXJtaW5hdGUsIGJvb2xlYW5dO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNhdGlzZmllcyhmaWVsZDogc3RyaW5nLCBzdWJzdHJpbmc6IHN0cmluZywgZmllbGRUeXBlOiBUYWJsZUZpbHRlclR5cGUpOiBTYXRpc2ZpZXMge1xyXG4gICAgICAgIGxldCBzYXRpc2ZpZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdGVybWluYXRlOiBUZXJtaW5hdGUgPSBUZXJtaW5hdGUuTkVYVDtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVHlwZSA9PT0gdHlwZXMuU1RBUlRfV0lUSCkge1xyXG4gICAgICAgICAgICBzYXRpc2ZpZXMgPSBmaWVsZC50b0xvY2FsZUxvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoc3Vic3RyaW5nLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09PSB0eXBlcy5FTkRfV0lUSCkge1xyXG4gICAgICAgICAgICBjb25zdCByZWdleHA6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoYCR7ZXNjYXBlZChzdWJzdHJpbmcpfSRgKTtcclxuICAgICAgICAgICAgc2F0aXNmaWVzID0gISFmaWVsZC5tYXRjaChyZWdleHApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09PSB0eXBlcy5DT05UQUlOUykge1xyXG4gICAgICAgICAgICBzYXRpc2ZpZXMgPSBpbmNsdWRlcyhmaWVsZCwgc3Vic3RyaW5nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PT0gdHlwZXMuRVFVQUxTKSB7XHJcbiAgICAgICAgICAgIHNhdGlzZmllcyA9IGZpZWxkID09PSBzdWJzdHJpbmc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUgPT09IHR5cGVzLkRPRVNfTk9UX0VRVUFMKSB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZCAhPT0gc3Vic3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBzYXRpc2ZpZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGVybWluYXRlID0gVGVybWluYXRlLkNPTlRJTlVFO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2F0aXNmaWVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0ZXJtaW5hdGUgPSBUZXJtaW5hdGUuQlJFQUs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbdGVybWluYXRlLCBzYXRpc2ZpZXNdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY2x1ZGVzKG9yaWdpbjogc3RyaW5nLCBzdWJzdHJpbmc6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBvcmlnaW4udG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyhzdWJzdHJpbmcudG9Mb2NhbGVMb3dlckNhc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXNjYXBlZChlc2NhcGVkVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGVzY2FwZWRWYWx1ZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZsYXR0ZW48VCA9IHN0cmluZz4ob2JqZWN0OiBLZXlNYXAsIGV4Y2x1ZGVLZXlzOiBzdHJpbmdbXSA9IFtdKTogS2V5TWFwPFQ+IHtcclxuICAgICAgICBjb25zdCBkZXB0aEdyYXBoOiBLZXlNYXA8VD4gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhZXhjbHVkZUtleXMuaW5jbHVkZXMoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgbXV0YXRlPFQ+KG9iamVjdCwgZGVwdGhHcmFwaCwga2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlcHRoR3JhcGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VmFsdWVCeVBhdGgob2JqZWN0OiBLZXlNYXAsIHBhdGg6IHN0cmluZyk6IEtleU1hcCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoLnNwbGl0KCcuJykucmVkdWNlKChzdHI6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHN0ciAmJiBzdHJba2V5XSwgb2JqZWN0KSA6IG9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtdXRhdGU8VD4ob2JqZWN0OiBLZXlNYXAsIGRlcHRoR3JhcGg6IEtleU1hcDxUPiwga2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc09iamVjdDogYm9vbGVhbiA9IHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gJ29iamVjdCcgJiYgb2JqZWN0W2tleV0gIT09IG51bGw7XHJcbiAgICAgICAgaWYgKGlzT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsYXRPYmplY3Q6IEtleU1hcCA9IGZsYXR0ZW4ob2JqZWN0W2tleV0pO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhdGggaW4gZmxhdE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZsYXRPYmplY3QuaGFzT3duUHJvcGVydHkocGF0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXB0aEdyYXBoW2Ake2tleX0uJHtwYXRofWBdID0gZmxhdE9iamVjdFtwYXRoXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlcHRoR3JhcGhba2V5XSA9IG9iamVjdFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbiJdfQ==