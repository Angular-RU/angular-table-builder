/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { checkValueIsEmpty } from '../operators/check-value-is-empty';
import { getDeepValue } from '../operators/deep-value';
var DeepPathPipe = /** @class */ (function () {
    function DeepPathPipe() {
    }
    /**
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    DeepPathPipe.prototype.transform = /**
     * @param {?} item
     * @param {?} path
     * @return {?}
     */
    function (item, path) {
        /** @type {?} */
        var result = getDeepValue(item, path);
        return checkValueIsEmpty(result) ? '-' : result;
    };
    DeepPathPipe.decorators = [
        { type: Pipe, args: [{ name: 'deepPath', pure: true },] }
    ];
    return DeepPathPipe;
}());
export { DeepPathPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC1wYXRoLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3BpcGVzL2RlZXAtcGF0aC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQ7SUFBQTtJQU1BLENBQUM7Ozs7OztJQUpVLGdDQUFTOzs7OztJQUFoQixVQUFpQixJQUFZLEVBQUUsSUFBWTs7WUFDakMsTUFBTSxHQUFRLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQzVDLE9BQU8saUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3BELENBQUM7O2dCQUxKLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTs7SUFNdEMsbUJBQUM7Q0FBQSxBQU5ELElBTUM7U0FMWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBbnksIEtleU1hcCB9IGZyb20gJy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IGNoZWNrVmFsdWVJc0VtcHR5IH0gZnJvbSAnLi4vb3BlcmF0b3JzL2NoZWNrLXZhbHVlLWlzLWVtcHR5JztcclxuaW1wb3J0IHsgZ2V0RGVlcFZhbHVlIH0gZnJvbSAnLi4vb3BlcmF0b3JzL2RlZXAtdmFsdWUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnZGVlcFBhdGgnLCBwdXJlOiB0cnVlIH0pXHJcbmV4cG9ydCBjbGFzcyBEZWVwUGF0aFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHB1YmxpYyB0cmFuc2Zvcm0oaXRlbTogS2V5TWFwLCBwYXRoOiBzdHJpbmcpOiBBbnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogQW55ID0gZ2V0RGVlcFZhbHVlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgIHJldHVybiBjaGVja1ZhbHVlSXNFbXB0eShyZXN1bHQpID8gJy0nIDogcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==