/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @param {?} __0
 * @return {?}
 */
export function filterAllWorker(_a) {
    var source = _a.source, global = _a.global, types = _a.types, columns = _a.columns;
    /** @enum {number} */
    var Terminate = {
        CONTINUE: -1,
        BREAK: 0,
        NEXT: 1,
    };
    Terminate[Terminate.CONTINUE] = 'CONTINUE';
    Terminate[Terminate.BREAK] = 'BREAK';
    Terminate[Terminate.NEXT] = 'NEXT';
    var value = global.value, type = global.type;
    /** @type {?} */
    var result = source;
    if (value) {
        result = source.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return type === types.DOES_NOT_CONTAIN ? !includes(JSON.stringify(item), value) : globalFilter(item);
        }));
    }
    if (!columns.isEmpty) {
        result = result.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return multipleFilter(item); }));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function globalFilter(item) {
        var e_1, _a;
        /** @type {?} */
        var satisfiesItem = false;
        /** @type {?} */
        var flattenedItem = flatten(item);
        try {
            for (var _b = tslib_1.__values(Object.keys(flattenedItem)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var keyModel = _c.value;
                /** @type {?} */
                var fieldValue = String(flattenedItem[keyModel]);
                var _d = tslib_1.__read(getSatisfies(fieldValue, value, type), 2), terminate = _d[0], satisfies = _d[1];
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
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return satisfiesItem;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function multipleFilter(item) {
        var e_2, _a;
        /** @type {?} */
        var matches = true;
        try {
            for (var _b = tslib_1.__values(Object.keys(columns.values)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fieldKey = _c.value;
                /** @type {?} */
                var fieldValue = String(getValueByPath(item, fieldKey) || '').trim();
                /** @type {?} */
                var findKeyValue = String(columns.values[fieldKey]);
                /** @type {?} */
                var fieldType = columns.types[fieldKey];
                var _d = tslib_1.__read(getSatisfies(fieldValue, findKeyValue, fieldType), 2), terminate = _d[0], satisfies = _d[1];
                matches = matches && satisfies;
                if (!matches || terminate === Terminate.BREAK) {
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
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
        var satisfies = false;
        /** @type {?} */
        var terminate = Terminate.NEXT;
        if (fieldType === types.START_WITH) {
            satisfies = field.toLocaleLowerCase().startsWith(substring.toLocaleLowerCase());
        }
        else if (fieldType === types.END_WITH) {
            /** @type {?} */
            var regexp = new RegExp(escaped(substring) + "$");
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
    function flatten(object, excludeKeys) {
        if (excludeKeys === void 0) { excludeKeys = []; }
        /** @type {?} */
        var depthGraph = {};
        for (var key in object) {
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
        function (str, key) { return str && str[key]; }), object) : object;
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
        var isObject = typeof object[key] === 'object' && object[key] !== null;
        if (isObject) {
            /** @type {?} */
            var flatObject = flatten(object[key]);
            for (var path in flatObject) {
                if (flatObject.hasOwnProperty(path)) {
                    depthGraph[key + "." + path] = flatObject[path];
                }
            }
        }
        else {
            depthGraph[key] = object[key];
        }
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLndvcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXIud29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE1BQU0sVUFBVSxlQUFlLENBQUMsRUFBcUQ7UUFBbkQsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLGdCQUFLLEVBQUUsb0JBQU87OztRQUV4RCxZQUFhO1FBQ2IsUUFBUztRQUNULE9BQVE7Ozs7O0lBR0osSUFBQSxvQkFBSyxFQUFFLGtCQUFJOztRQUNmLE1BQU0sR0FBZSxNQUFNO0lBRS9CLElBQUksS0FBSyxFQUFFO1FBQ1AsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxJQUFjO1lBQ2xDLE9BQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pHLENBQUMsRUFBQyxDQUFDO0tBQ047SUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNsQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFDLElBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBcEIsQ0FBb0IsRUFBQyxDQUFDO0tBQ3BFOzs7OztJQUVELFNBQVMsWUFBWSxDQUFDLElBQWM7OztZQUM1QixhQUFhLEdBQVksS0FBSzs7WUFDNUIsYUFBYSxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUM7O1lBRTNDLEtBQXVCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO2dC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QkFDSixVQUFVLEdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQyxLQUFLLElBQU0sSUFBSSxJQUFJLFVBQVUsRUFBRTtnQkFDM0IsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNqQyxVQUFVLENBQUksR0FBRyxTQUFJLElBQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkQ7YUFDSjtTQUNKO2FBQU07WUFDSCxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWx0ZXJhYmxlTWVzc2FnZSwgRmlsdGVyR2xvYmFsT3B0cywgVGFibGVGaWx0ZXJUeXBlIH0gZnJvbSAnLi9maWx0ZXJhYmxlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRhYmxlUm93IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuaW1wb3J0IHsgS2V5TWFwIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJBbGxXb3JrZXIoeyBzb3VyY2UsIGdsb2JhbCwgdHlwZXMsIGNvbHVtbnMgfTogRmlsdGVyYWJsZU1lc3NhZ2UpOiBUYWJsZVJvd1tdIHtcclxuICAgIGVudW0gVGVybWluYXRlIHtcclxuICAgICAgICBDT05USU5VRSA9IC0xLFxyXG4gICAgICAgIEJSRUFLID0gMCxcclxuICAgICAgICBORVhUID0gMVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgdmFsdWUsIHR5cGUgfTogRmlsdGVyR2xvYmFsT3B0cyA9IGdsb2JhbDtcclxuICAgIGxldCByZXN1bHQ6IFRhYmxlUm93W10gPSBzb3VyY2U7XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gc291cmNlLmZpbHRlcigoaXRlbTogVGFibGVSb3cpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09IHR5cGVzLkRPRVNfTk9UX0NPTlRBSU4gPyAhaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoaXRlbSksIHZhbHVlKSA6IGdsb2JhbEZpbHRlcihpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNvbHVtbnMuaXNFbXB0eSkge1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoKGl0ZW06IFRhYmxlUm93KSA9PiBtdWx0aXBsZUZpbHRlcihpdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2xvYmFsRmlsdGVyKGl0ZW06IFRhYmxlUm93KTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHNhdGlzZmllc0l0ZW06IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBmbGF0dGVuZWRJdGVtOiBLZXlNYXAgPSBmbGF0dGVuKGl0ZW0pO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGtleU1vZGVsIG9mIE9iamVjdC5rZXlzKGZsYXR0ZW5lZEl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsdWU6IHN0cmluZyA9IFN0cmluZyhmbGF0dGVuZWRJdGVtW2tleU1vZGVsXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IFt0ZXJtaW5hdGUsIHNhdGlzZmllc106IFNhdGlzZmllcyA9IGdldFNhdGlzZmllcyhmaWVsZFZhbHVlLCB2YWx1ZSwgdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBzYXRpc2ZpZXNJdGVtID0gc2F0aXNmaWVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlcm1pbmF0ZSA9PT0gVGVybWluYXRlLkNPTlRJTlVFKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXJtaW5hdGUgPT09IFRlcm1pbmF0ZS5CUkVBSykge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzYXRpc2ZpZXNJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNhdGlzZmllc0l0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbXVsdGlwbGVGaWx0ZXIoaXRlbTogVGFibGVSb3cpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbWF0Y2hlczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZmllbGRLZXkgb2YgT2JqZWN0LmtleXMoY29sdW1ucy52YWx1ZXMpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsdWU6IHN0cmluZyA9IFN0cmluZyhnZXRWYWx1ZUJ5UGF0aChpdGVtLCBmaWVsZEtleSkgfHwgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgY29uc3QgZmluZEtleVZhbHVlOiBzdHJpbmcgPSBTdHJpbmcoY29sdW1ucy52YWx1ZXNbZmllbGRLZXldKTtcclxuICAgICAgICAgICAgY29uc3QgZmllbGRUeXBlOiBUYWJsZUZpbHRlclR5cGUgPSBjb2x1bW5zLnR5cGVzW2ZpZWxkS2V5XTtcclxuICAgICAgICAgICAgY29uc3QgW3Rlcm1pbmF0ZSwgc2F0aXNmaWVzXTogU2F0aXNmaWVzID0gZ2V0U2F0aXNmaWVzKGZpZWxkVmFsdWUsIGZpbmRLZXlWYWx1ZSwgZmllbGRUeXBlKTtcclxuICAgICAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMgJiYgc2F0aXNmaWVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFtYXRjaGVzIHx8IHRlcm1pbmF0ZSA9PT0gVGVybWluYXRlLkJSRUFLKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGNoZXM7XHJcbiAgICB9XHJcblxyXG4gICAgdHlwZSBTYXRpc2ZpZXMgPSBbVGVybWluYXRlLCBib29sZWFuXTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTYXRpc2ZpZXMoZmllbGQ6IHN0cmluZywgc3Vic3RyaW5nOiBzdHJpbmcsIGZpZWxkVHlwZTogVGFibGVGaWx0ZXJUeXBlKTogU2F0aXNmaWVzIHtcclxuICAgICAgICBsZXQgc2F0aXNmaWVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRlcm1pbmF0ZTogVGVybWluYXRlID0gVGVybWluYXRlLk5FWFQ7XHJcblxyXG4gICAgICAgIGlmIChmaWVsZFR5cGUgPT09IHR5cGVzLlNUQVJUX1dJVEgpIHtcclxuICAgICAgICAgICAgc2F0aXNmaWVzID0gZmllbGQudG9Mb2NhbGVMb3dlckNhc2UoKS5zdGFydHNXaXRoKHN1YnN0cmluZy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PT0gdHlwZXMuRU5EX1dJVEgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVnZXhwOiBSZWdFeHAgPSBuZXcgUmVnRXhwKGAke2VzY2FwZWQoc3Vic3RyaW5nKX0kYCk7XHJcbiAgICAgICAgICAgIHNhdGlzZmllcyA9ICEhZmllbGQubWF0Y2gocmVnZXhwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PT0gdHlwZXMuQ09OVEFJTlMpIHtcclxuICAgICAgICAgICAgc2F0aXNmaWVzID0gaW5jbHVkZXMoZmllbGQsIHN1YnN0cmluZyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUgPT09IHR5cGVzLkVRVUFMUykge1xyXG4gICAgICAgICAgICBzYXRpc2ZpZXMgPSBmaWVsZCA9PT0gc3Vic3RyaW5nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09PSB0eXBlcy5ET0VTX05PVF9FUVVBTCkge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQgIT09IHN1YnN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgc2F0aXNmaWVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRlcm1pbmF0ZSA9IFRlcm1pbmF0ZS5DT05USU5VRTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhdGlzZmllcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGVybWluYXRlID0gVGVybWluYXRlLkJSRUFLO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW3Rlcm1pbmF0ZSwgc2F0aXNmaWVzXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbmNsdWRlcyhvcmlnaW46IHN0cmluZywgc3Vic3RyaW5nOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gb3JpZ2luLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5jbHVkZXMoc3Vic3RyaW5nLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVzY2FwZWQoZXNjYXBlZFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBlc2NhcGVkVmFsdWUucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmbGF0dGVuPFQgPSBzdHJpbmc+KG9iamVjdDogS2V5TWFwLCBleGNsdWRlS2V5czogc3RyaW5nW10gPSBbXSk6IEtleU1hcDxUPiB7XHJcbiAgICAgICAgY29uc3QgZGVwdGhHcmFwaDogS2V5TWFwPFQ+ID0ge307XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkgJiYgIWV4Y2x1ZGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgICAgICAgICAgIG11dGF0ZTxUPihvYmplY3QsIGRlcHRoR3JhcGgsIGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZXB0aEdyYXBoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFZhbHVlQnlQYXRoKG9iamVjdDogS2V5TWFwLCBwYXRoOiBzdHJpbmcpOiBLZXlNYXAgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiBwYXRoID8gcGF0aC5zcGxpdCgnLicpLnJlZHVjZSgoc3RyOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiBzdHIgJiYgc3RyW2tleV0sIG9iamVjdCkgOiBvYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbXV0YXRlPFQ+KG9iamVjdDogS2V5TWFwLCBkZXB0aEdyYXBoOiBLZXlNYXA8VD4sIGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNPYmplY3Q6IGJvb2xlYW4gPSB0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnICYmIG9iamVjdFtrZXldICE9PSBudWxsO1xyXG4gICAgICAgIGlmIChpc09iamVjdCkge1xyXG4gICAgICAgICAgICBjb25zdCBmbGF0T2JqZWN0OiBLZXlNYXAgPSBmbGF0dGVuKG9iamVjdFtrZXldKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXRoIGluIGZsYXRPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmbGF0T2JqZWN0Lmhhc093blByb3BlcnR5KHBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVwdGhHcmFwaFtgJHtrZXl9LiR7cGF0aH1gXSA9IGZsYXRPYmplY3RbcGF0aF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkZXB0aEdyYXBoW2tleV0gPSBvYmplY3Rba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG4iXX0=