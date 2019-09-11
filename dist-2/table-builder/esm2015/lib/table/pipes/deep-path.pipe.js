/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { checkValueIsEmpty } from '../operators/check-value-is-empty';
import { getDeepValue } from '../operators/deep-value';
export class DeepPathPipe {
    /**
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    transform(item, path) {
        /** @type {?} */
        const result = getDeepValue(item, path);
        return checkValueIsEmpty(result) ? '-' : result;
    }
}
DeepPathPipe.decorators = [
    { type: Pipe, args: [{ name: 'deepPath', pure: true },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC1wYXRoLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3BpcGVzL2RlZXAtcGF0aC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdkQsTUFBTSxPQUFPLFlBQVk7Ozs7OztJQUNkLFNBQVMsQ0FBQyxJQUFZLEVBQUUsSUFBWTs7Y0FDakMsTUFBTSxHQUFRLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQzVDLE9BQU8saUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3BELENBQUM7OztZQUxKLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQW55LCBLZXlNYXAgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBjaGVja1ZhbHVlSXNFbXB0eSB9IGZyb20gJy4uL29wZXJhdG9ycy9jaGVjay12YWx1ZS1pcy1lbXB0eSc7XHJcbmltcG9ydCB7IGdldERlZXBWYWx1ZSB9IGZyb20gJy4uL29wZXJhdG9ycy9kZWVwLXZhbHVlJztcclxuXHJcbkBQaXBlKHsgbmFtZTogJ2RlZXBQYXRoJywgcHVyZTogdHJ1ZSB9KVxyXG5leHBvcnQgY2xhc3MgRGVlcFBhdGhQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICBwdWJsaWMgdHJhbnNmb3JtKGl0ZW06IEtleU1hcCwgcGF0aDogc3RyaW5nKTogQW55IHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEFueSA9IGdldERlZXBWYWx1ZShpdGVtLCBwYXRoKTtcclxuICAgICAgICByZXR1cm4gY2hlY2tWYWx1ZUlzRW1wdHkocmVzdWx0KSA/ICctJyA6IHJlc3VsdDtcclxuICAgIH1cclxufVxyXG4iXX0=