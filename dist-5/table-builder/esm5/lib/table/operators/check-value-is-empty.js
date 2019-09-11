/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
export function checkValueIsEmpty(value) {
    if (typeof value === 'number') {
        return isNaN(value) || value === Infinity;
    }
    else if (typeof value === 'string') {
        return value.trim().length === 0;
    }
    else {
        return !value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stdmFsdWUtaXMtZW1wdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL29wZXJhdG9ycy9jaGVjay12YWx1ZS1pcy1lbXB0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUFVO0lBQ3hDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxRQUFRLENBQUM7S0FDN0M7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNsQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQ2pCO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueSB9IGZyb20gJy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tWYWx1ZUlzRW1wdHkodmFsdWU6IEFueSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50cmltKCkubGVuZ3RoID09PSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gIXZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==