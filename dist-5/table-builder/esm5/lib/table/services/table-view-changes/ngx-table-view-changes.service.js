/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
var NgxTableViewChangesService = /** @class */ (function () {
    function NgxTableViewChangesService() {
        this.events = new Subject();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    NgxTableViewChangesService.prototype.update = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.events.next(state);
    };
    NgxTableViewChangesService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgxTableViewChangesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgxTableViewChangesService_Factory() { return new NgxTableViewChangesService(); }, token: NgxTableViewChangesService, providedIn: "root" });
    return NgxTableViewChangesService;
}());
export { NgxTableViewChangesService };
if (false) {
    /** @type {?} */
    NgxTableViewChangesService.prototype.events;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRhYmxlLXZpZXctY2hhbmdlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy90YWJsZS12aWV3LWNoYW5nZXMvbmd4LXRhYmxlLXZpZXctY2hhbmdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSS9CO0lBQUE7UUFFVyxXQUFNLEdBQStCLElBQUksT0FBTyxFQUFxQixDQUFDO0tBSWhGOzs7OztJQUhVLDJDQUFNOzs7O0lBQWIsVUFBYyxLQUF3QjtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDOztnQkFMSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7cUNBTGxDO0NBV0MsQUFORCxJQU1DO1NBTFksMEJBQTBCOzs7SUFDbkMsNENBQTZFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBUYWJsZVVwZGF0ZVNjaGVtYSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgTmd4VGFibGVWaWV3Q2hhbmdlc1NlcnZpY2Uge1xyXG4gICAgcHVibGljIGV2ZW50czogU3ViamVjdDxUYWJsZVVwZGF0ZVNjaGVtYT4gPSBuZXcgU3ViamVjdDxUYWJsZVVwZGF0ZVNjaGVtYT4oKTtcclxuICAgIHB1YmxpYyB1cGRhdGUoc3RhdGU6IFRhYmxlVXBkYXRlU2NoZW1hKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChzdGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19