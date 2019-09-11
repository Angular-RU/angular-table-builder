/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class NgxTableViewChangesService {
    constructor() {
        this.events = new Subject();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    update(state) {
        this.events.next(state);
    }
}
NgxTableViewChangesService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgxTableViewChangesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgxTableViewChangesService_Factory() { return new NgxTableViewChangesService(); }, token: NgxTableViewChangesService, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgxTableViewChangesService.prototype.events;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRhYmxlLXZpZXctY2hhbmdlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy90YWJsZS12aWV3LWNoYW5nZXMvbmd4LXRhYmxlLXZpZXctY2hhbmdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSy9CLE1BQU0sT0FBTywwQkFBMEI7SUFEdkM7UUFFVyxXQUFNLEdBQStCLElBQUksT0FBTyxFQUFxQixDQUFDO0tBSWhGOzs7OztJQUhVLE1BQU0sQ0FBQyxLQUF3QjtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7WUFMSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7OztJQUU5Qiw0Q0FBNkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFRhYmxlVXBkYXRlU2NoZW1hIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hUYWJsZVZpZXdDaGFuZ2VzU2VydmljZSB7XHJcbiAgICBwdWJsaWMgZXZlbnRzOiBTdWJqZWN0PFRhYmxlVXBkYXRlU2NoZW1hPiA9IG5ldyBTdWJqZWN0PFRhYmxlVXBkYXRlU2NoZW1hPigpO1xyXG4gICAgcHVibGljIHVwZGF0ZShzdGF0ZTogVGFibGVVcGRhdGVTY2hlbWEpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHN0YXRlKTtcclxuICAgIH1cclxufVxyXG4iXX0=