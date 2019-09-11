/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, TemplateRef } from '@angular/core';
import { TemplateCellCommon } from './template-cell.common';
var TemplateBodyTdDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TemplateBodyTdDirective, _super);
    function TemplateBodyTdDirective(template) {
        var _this = _super.call(this, template) || this;
        _this.template = template;
        _this.type = null;
        return _this;
    }
    TemplateBodyTdDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngx-td]' },] }
    ];
    /** @nocollapse */
    TemplateBodyTdDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    TemplateBodyTdDirective.propDecorators = {
        type: [{ type: Input, args: ['ngx-td',] }]
    };
    return TemplateBodyTdDirective;
}(TemplateCellCommon));
export { TemplateBodyTdDirective };
if (false) {
    /** @type {?} */
    TemplateBodyTdDirective.prototype.type;
    /** @type {?} */
    TemplateBodyTdDirective.prototype.template;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtYm9keS10ZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1ib2R5LXRkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RDtJQUM2QyxtREFBa0I7SUFFM0QsaUNBQW1CLFFBQThCO1FBQWpELFlBQ0ksa0JBQU0sUUFBUSxDQUFDLFNBQ2xCO1FBRmtCLGNBQVEsR0FBUixRQUFRLENBQXNCO1FBRHpCLFVBQUksR0FBVyxJQUFJLENBQUM7O0lBRzVDLENBQUM7O2dCQUxKLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRTs7OztnQkFIbkIsV0FBVzs7O3VCQUtqQyxLQUFLLFNBQUMsUUFBUTs7SUFJbkIsOEJBQUM7Q0FBQSxBQU5ELENBQzZDLGtCQUFrQixHQUs5RDtTQUxZLHVCQUF1Qjs7O0lBQ2hDLHVDQUE0Qzs7SUFDaEMsMkNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGVtcGxhdGVDZWxsQ29tbW9uIH0gZnJvbSAnLi90ZW1wbGF0ZS1jZWxsLmNvbW1vbic7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ3gtdGRdJyB9KVxyXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVCb2R5VGREaXJlY3RpdmUgZXh0ZW5kcyBUZW1wbGF0ZUNlbGxDb21tb24ge1xyXG4gICAgQElucHV0KCduZ3gtdGQnKSBwdWJsaWMgdHlwZTogc3RyaW5nID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8dW5rbm93bj4pIHtcclxuICAgICAgICBzdXBlcih0ZW1wbGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19