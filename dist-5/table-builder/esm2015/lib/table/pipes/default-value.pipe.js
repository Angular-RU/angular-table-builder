/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { checkValueIsEmpty } from '../operators/check-value-is-empty';
export class DefaultValuePipe {
    /**
     * @param {?} item
     * @param {?} key
     * @return {?}
     */
    transform(item, key) {
        /** @type {?} */
        const result = item[key];
        return checkValueIsEmpty(result) ? '-' : result;
    }
}
DefaultValuePipe.decorators = [
    { type: Pipe, args: [{ name: 'defaultValue', pure: true },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC12YWx1ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9waXBlcy9kZWZhdWx0LXZhbHVlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBR3RFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7OztJQUNsQixTQUFTLENBQUMsSUFBWSxFQUFFLEdBQVc7O2NBQ2hDLE1BQU0sR0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzdCLE9BQU8saUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3BELENBQUM7OztZQUxKLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQW55LCBLZXlNYXAgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBjaGVja1ZhbHVlSXNFbXB0eSB9IGZyb20gJy4uL29wZXJhdG9ycy9jaGVjay12YWx1ZS1pcy1lbXB0eSc7XHJcblxyXG5AUGlwZSh7IG5hbWU6ICdkZWZhdWx0VmFsdWUnLCBwdXJlOiB0cnVlIH0pXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0VmFsdWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICBwdWJsaWMgdHJhbnNmb3JtKGl0ZW06IEtleU1hcCwga2V5OiBzdHJpbmcpOiBBbnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogQW55ID0gaXRlbVtrZXldO1xyXG4gICAgICAgIHJldHVybiBjaGVja1ZhbHVlSXNFbXB0eShyZXN1bHQpID8gJy0nIDogcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==