/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output } from '@angular/core';
/**
 * @abstract
 */
var TemplateCellCommon = /** @class */ (function () {
    function TemplateCellCommon(template) {
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
    return TemplateCellCommon;
}());
export { TemplateCellCommon };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtY2VsbC5jb21tb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1jZWxsLmNvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7O0FBSXpFO0lBV0ksNEJBQTZCLFFBQThCO1FBQTlCLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBVnBELFNBQUksR0FBVyxJQUFJLENBQUM7UUFDWCxRQUFHLEdBQVksSUFBSSxDQUFDO1FBQ3BCLFNBQUksR0FBWSxJQUFJLENBQUM7UUFDckIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUN2QixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFDWixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBK0IsSUFBSSxDQUFDO1FBQ3ZELFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxhQUFRLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDWCxDQUFDOztzQkFUOUQsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUssU0FBQyxVQUFVOzZCQUNoQixLQUFLLFNBQUMsVUFBVTswQkFDaEIsTUFBTTsyQkFDTixNQUFNOztJQUVYLHlCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWnFCLGtCQUFrQjs7O0lBQ3BDLGtDQUEyQjs7SUFDM0IsaUNBQW9DOztJQUNwQyxrQ0FBcUM7O0lBQ3JDLG9DQUF1Qzs7SUFDdkMsbUNBQXFDOztJQUNyQyxvQ0FBc0M7O0lBQ3RDLHVDQUFtRDs7SUFDbkQsd0NBQXdFOztJQUN4RSxxQ0FBd0U7O0lBQ3hFLHNDQUF5RTs7SUFDbkQsc0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBbnksIEtleU1hcCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IFRhYmxlRXZlbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRlbXBsYXRlQ2VsbENvbW1vbiB7XHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nID0gbnVsbDtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyByb3c6IGJvb2xlYW4gPSBudWxsO1xyXG4gICAgQElucHV0KCkgcHVibGljIGJvbGQ6IGJvb2xlYW4gPSBudWxsO1xyXG4gICAgQElucHV0KCkgcHVibGljIG5vd3JhcDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IG51bWJlciA9IG51bGw7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBudW1iZXIgPSBudWxsO1xyXG4gICAgQElucHV0KCduZy1zdHlsZScpIHB1YmxpYyBjc3NTdHlsZXM6IEtleU1hcCA9IG51bGw7XHJcbiAgICBASW5wdXQoJ25nLWNsYXNzJykgcHVibGljIGNzc0NsYXNzZXM6IHN0cmluZyB8IHN0cmluZ1tdIHwgS2V5TWFwID0gbnVsbDtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DbGljazogRXZlbnRFbWl0dGVyPFRhYmxlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBkYmxDbGljazogRXZlbnRFbWl0dGVyPFRhYmxlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8dW5rbm93bj4pIHt9XHJcbn1cclxuIl19