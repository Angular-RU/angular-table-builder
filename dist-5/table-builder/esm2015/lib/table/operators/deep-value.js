/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} obj
 * @param {?} path
 * @return {?}
 */
export function getDeepValue(obj, path) {
    if (!(path && path.length)) {
        return obj;
    }
    /** @type {?} */
    const parts = path.split('.');
    /** @type {?} */
    let result = obj;
    /** @type {?} */
    let index = 0;
    for (; result && index < parts.length; ++index) {
        result = result[parts[index]];
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvb3BlcmF0b3JzL2RlZXAtdmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsTUFBTSxVQUFVLFlBQVksQ0FBQyxHQUFRLEVBQUUsSUFBWTtJQUMvQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sR0FBRyxDQUFDO0tBQ2Q7O1VBRUssS0FBSyxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztRQUNuQyxNQUFNLEdBQVEsR0FBRzs7UUFDakIsS0FBSyxHQUFXLENBQUM7SUFFckIsT0FBTyxNQUFNLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUU7UUFDNUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNqQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbnkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZXBWYWx1ZShvYmo6IEFueSwgcGF0aDogc3RyaW5nKTogQW55IHtcclxuICAgIGlmICghKHBhdGggJiYgcGF0aC5sZW5ndGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICBsZXQgcmVzdWx0OiBBbnkgPSBvYmo7XHJcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgZm9yICg7IHJlc3VsdCAmJiBpbmRleCA8IHBhcnRzLmxlbmd0aDsgKytpbmRleCkge1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFtwYXJ0c1tpbmRleF1dO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuIl19