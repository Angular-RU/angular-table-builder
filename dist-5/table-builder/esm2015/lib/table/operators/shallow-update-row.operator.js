/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} data
 * @param {?} row
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
export function shallowUpdateRow(data, row, key, value) {
    /** @type {?} */
    const index = data.indexOf(row);
    return [...data.slice(0, index), Object.assign({}, data[index], { [key]: value }), ...data.slice(index + 1, data.length)];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhbGxvdy11cGRhdGUtcm93Lm9wZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9vcGVyYXRvcnMvc2hhbGxvdy11cGRhdGUtcm93Lm9wZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQWdCLEVBQUUsR0FBYSxFQUFFLEdBQVcsRUFBRSxLQUFVOztVQUMvRSxLQUFLLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLG9CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssS0FBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5RyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFibGVSb3cgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBBbnkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dVcGRhdGVSb3coZGF0YTogVGFibGVSb3dbXSwgcm93OiBUYWJsZVJvdywga2V5OiBzdHJpbmcsIHZhbHVlOiBBbnkpOiBUYWJsZVJvd1tdIHtcclxuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSBkYXRhLmluZGV4T2Yocm93KTtcclxuICAgIHJldHVybiBbLi4uZGF0YS5zbGljZSgwLCBpbmRleCksIHsgLi4uZGF0YVtpbmRleF0sIFtrZXldOiB2YWx1ZSB9LCAuLi5kYXRhLnNsaWNlKGluZGV4ICsgMSwgZGF0YS5sZW5ndGgpXTtcclxufVxyXG4iXX0=