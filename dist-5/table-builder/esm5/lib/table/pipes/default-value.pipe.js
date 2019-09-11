/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { checkValueIsEmpty } from '../operators/check-value-is-empty';
var DefaultValuePipe = /** @class */ (function () {
    function DefaultValuePipe() {
    }
    /**
     * @param {?} item
     * @param {?} key
     * @return {?}
     */
    DefaultValuePipe.prototype.transform = /**
     * @param {?} item
     * @param {?} key
     * @return {?}
     */
    function (item, key) {
        /** @type {?} */
        var result = item[key];
        return checkValueIsEmpty(result) ? '-' : result;
    };
    DefaultValuePipe.decorators = [
        { type: Pipe, args: [{ name: 'defaultValue', pure: true },] }
    ];
    return DefaultValuePipe;
}());
export { DefaultValuePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC12YWx1ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9waXBlcy9kZWZhdWx0LXZhbHVlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXRFO0lBQUE7SUFNQSxDQUFDOzs7Ozs7SUFKVSxvQ0FBUzs7Ozs7SUFBaEIsVUFBaUIsSUFBWSxFQUFFLEdBQVc7O1lBQ2hDLE1BQU0sR0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzdCLE9BQU8saUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3BELENBQUM7O2dCQUxKLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTs7SUFNMUMsdUJBQUM7Q0FBQSxBQU5ELElBTUM7U0FMWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFueSwgS2V5TWFwIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgY2hlY2tWYWx1ZUlzRW1wdHkgfSBmcm9tICcuLi9vcGVyYXRvcnMvY2hlY2stdmFsdWUtaXMtZW1wdHknO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnZGVmYXVsdFZhbHVlJywgcHVyZTogdHJ1ZSB9KVxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdFZhbHVlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgcHVibGljIHRyYW5zZm9ybShpdGVtOiBLZXlNYXAsIGtleTogc3RyaW5nKTogQW55IHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEFueSA9IGl0ZW1ba2V5XTtcclxuICAgICAgICByZXR1cm4gY2hlY2tWYWx1ZUlzRW1wdHkocmVzdWx0KSA/ICctJyA6IHJlc3VsdDtcclxuICAgIH1cclxufVxyXG4iXX0=