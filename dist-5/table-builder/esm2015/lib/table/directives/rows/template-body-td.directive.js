/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, TemplateRef } from '@angular/core';
import { TemplateCellCommon } from './template-cell.common';
export class TemplateBodyTdDirective extends TemplateCellCommon {
    /**
     * @param {?} template
     */
    constructor(template) {
        super(template);
        this.template = template;
        this.type = null;
    }
}
TemplateBodyTdDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngx-td]' },] }
];
/** @nocollapse */
TemplateBodyTdDirective.ctorParameters = () => [
    { type: TemplateRef }
];
TemplateBodyTdDirective.propDecorators = {
    type: [{ type: Input, args: ['ngx-td',] }]
};
if (false) {
    /** @type {?} */
    TemplateBodyTdDirective.prototype.type;
    /** @type {?} */
    TemplateBodyTdDirective.prototype.template;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtYm9keS10ZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1ib2R5LXRkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzVELE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxrQkFBa0I7Ozs7SUFFM0QsWUFBbUIsUUFBOEI7UUFDN0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFEekIsU0FBSSxHQUFXLElBQUksQ0FBQztJQUc1QyxDQUFDOzs7WUFMSixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUU7Ozs7WUFIbkIsV0FBVzs7O21CQUtqQyxLQUFLLFNBQUMsUUFBUTs7OztJQUFmLHVDQUE0Qzs7SUFDaEMsMkNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGVtcGxhdGVDZWxsQ29tbW9uIH0gZnJvbSAnLi90ZW1wbGF0ZS1jZWxsLmNvbW1vbic7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ3gtdGRdJyB9KVxyXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVCb2R5VGREaXJlY3RpdmUgZXh0ZW5kcyBUZW1wbGF0ZUNlbGxDb21tb24ge1xyXG4gICAgQElucHV0KCduZ3gtdGQnKSBwdWJsaWMgdHlwZTogc3RyaW5nID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8dW5rbm93bj4pIHtcclxuICAgICAgICBzdXBlcih0ZW1wbGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19