/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output } from '@angular/core';
/**
 * @abstract
 */
export class TemplateCellCommon {
    /**
     * @protected
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
        this.type = null;
        this.row = null;
        this.bold = null;
        this.nowrap = true;
        this.width = null;
        this.height = null;
        this.cssStyles = null;
        this.cssClasses = null;
        this.onClick = new EventEmitter();
        this.dblClick = new EventEmitter();
    }
}
TemplateCellCommon.propDecorators = {
    row: [{ type: Input }],
    bold: [{ type: Input }],
    nowrap: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    cssStyles: [{ type: Input, args: ['ng-style',] }],
    cssClasses: [{ type: Input, args: ['ng-class',] }],
    onClick: [{ type: Output }],
    dblClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TemplateCellCommon.prototype.type;
    /** @type {?} */
    TemplateCellCommon.prototype.row;
    /** @type {?} */
    TemplateCellCommon.prototype.bold;
    /** @type {?} */
    TemplateCellCommon.prototype.nowrap;
    /** @type {?} */
    TemplateCellCommon.prototype.width;
    /** @type {?} */
    TemplateCellCommon.prototype.height;
    /** @type {?} */
    TemplateCellCommon.prototype.cssStyles;
    /** @type {?} */
    TemplateCellCommon.prototype.cssClasses;
    /** @type {?} */
    TemplateCellCommon.prototype.onClick;
    /** @type {?} */
    TemplateCellCommon.prototype.dblClick;
    /** @type {?} */
    TemplateCellCommon.prototype.template;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtY2VsbC5jb21tb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1jZWxsLmNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7O0FBSXpFLE1BQU0sT0FBZ0Isa0JBQWtCOzs7OztJQVdwQyxZQUE2QixRQUE4QjtRQUE5QixhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQVZwRCxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ1gsUUFBRyxHQUFZLElBQUksQ0FBQztRQUNwQixTQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsVUFBSyxHQUFXLElBQUksQ0FBQztRQUNyQixXQUFNLEdBQVcsSUFBSSxDQUFDO1FBQ1osY0FBUyxHQUFXLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQStCLElBQUksQ0FBQztRQUN2RCxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsYUFBUSxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ1gsQ0FBQzs7O2tCQVQ5RCxLQUFLO21CQUNMLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7d0JBQ0wsS0FBSyxTQUFDLFVBQVU7eUJBQ2hCLEtBQUssU0FBQyxVQUFVO3NCQUNoQixNQUFNO3VCQUNOLE1BQU07Ozs7SUFUUCxrQ0FBMkI7O0lBQzNCLGlDQUFvQzs7SUFDcEMsa0NBQXFDOztJQUNyQyxvQ0FBdUM7O0lBQ3ZDLG1DQUFxQzs7SUFDckMsb0NBQXNDOztJQUN0Qyx1Q0FBbUQ7O0lBQ25ELHdDQUF3RTs7SUFDeEUscUNBQXdFOztJQUN4RSxzQ0FBeUU7O0lBQ25ELHNDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQW55LCBLZXlNYXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBUYWJsZUV2ZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUZW1wbGF0ZUNlbGxDb21tb24ge1xyXG4gICAgcHVibGljIHR5cGU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcm93OiBib29sZWFuID0gbnVsbDtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBib2xkOiBib29sZWFuID0gbnVsbDtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBub3dyYXA6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgcHVibGljIHdpZHRoOiBudW1iZXIgPSBudWxsO1xyXG4gICAgQElucHV0KCkgcHVibGljIGhlaWdodDogbnVtYmVyID0gbnVsbDtcclxuICAgIEBJbnB1dCgnbmctc3R5bGUnKSBwdWJsaWMgY3NzU3R5bGVzOiBLZXlNYXAgPSBudWxsO1xyXG4gICAgQElucHV0KCduZy1jbGFzcycpIHB1YmxpYyBjc3NDbGFzc2VzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IEtleU1hcCA9IG51bGw7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxUYWJsZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgZGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxUYWJsZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPHVua25vd24+KSB7fVxyXG59XHJcbiJdfQ==