/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContextMenuState } from './context-menu.interface';
import { getDeepValue } from '../../operators/deep-value';
export class ContextMenuService {
    constructor() {
        this.state = {};
        this.events = new Subject();
    }
    /**
     * @param {?} event
     * @param {?=} key
     * @param {?=} row
     * @return {?}
     */
    openContextMenu(event, key = null, row = null) {
        this.state = new ContextMenuState({
            key,
            item: row,
            opened: true,
            value: getDeepValue(row, key) || null,
            position: { left: event.clientX, top: event.clientY }
        });
        this.events.next();
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    close() {
        this.state = new ContextMenuState();
        this.events.next();
    }
}
ContextMenuService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ContextMenuService.prototype.state;
    /** @type {?} */
    ContextMenuService.prototype.events;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUcxRCxNQUFNLE9BQU8sa0JBQWtCO0lBRC9CO1FBRVcsVUFBSyxHQUE4QixFQUFFLENBQUM7UUFDN0IsV0FBTSxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBb0IxRCxDQUFDOzs7Ozs7O0lBbEJVLGVBQWUsQ0FBQyxLQUFpQixFQUFFLE1BQWMsSUFBSSxFQUFFLE1BQWdCLElBQUk7UUFDOUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGdCQUFnQixDQUFDO1lBQzlCLEdBQUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNULE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSTtZQUNyQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtTQUN4RCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7OztZQXRCSixVQUFVOzs7O0lBRVAsbUNBQTZDOztJQUM3QyxvQ0FBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IENvbnRleHRNZW51U3RhdGUgfSBmcm9tICcuL2NvbnRleHQtbWVudS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUYWJsZVJvdyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IGdldERlZXBWYWx1ZSB9IGZyb20gJy4uLy4uL29wZXJhdG9ycy9kZWVwLXZhbHVlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51U2VydmljZSB7XHJcbiAgICBwdWJsaWMgc3RhdGU6IFBhcnRpYWw8Q29udGV4dE1lbnVTdGF0ZT4gPSB7fTtcclxuICAgIHB1YmxpYyByZWFkb25seSBldmVudHM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIHB1YmxpYyBvcGVuQ29udGV4dE1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQsIGtleTogc3RyaW5nID0gbnVsbCwgcm93OiBUYWJsZVJvdyA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IENvbnRleHRNZW51U3RhdGUoe1xyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIGl0ZW06IHJvdyxcclxuICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICB2YWx1ZTogZ2V0RGVlcFZhbHVlKHJvdywga2V5KSB8fCBudWxsLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogeyBsZWZ0OiBldmVudC5jbGllbnRYLCB0b3A6IGV2ZW50LmNsaWVudFkgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBDb250ZXh0TWVudVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==