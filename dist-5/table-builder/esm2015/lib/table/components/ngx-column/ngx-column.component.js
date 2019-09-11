/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { ColumnOptions } from '../common/column-options';
export class NgxColumnComponent extends ColumnOptions {
    constructor() {
        super(...arguments);
        this.key = null;
        this.stickyLeft = false;
        this.emptyHead = null;
        this.headTitle = null;
        this.customKey = false;
        this.importantTemplate = false;
        this.stickyRight = false;
        this.verticalLine = false;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    withKey(key) {
        this.key = key;
        return this;
    }
}
NgxColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-column',
                template: "",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
NgxColumnComponent.propDecorators = {
    key: [{ type: Input }],
    stickyLeft: [{ type: Input, args: ['sticky',] }],
    emptyHead: [{ type: Input, args: ['empty-head',] }],
    headTitle: [{ type: Input, args: ['head-title',] }],
    customKey: [{ type: Input, args: ['custom-key',] }],
    importantTemplate: [{ type: Input, args: ['important-template',] }],
    stickyRight: [{ type: Input, args: ['sticky-end',] }],
    verticalLine: [{ type: Input, args: ['vertical-line',] }],
    th: [{ type: ContentChild, args: [TemplateHeadThDirective, { static: false },] }],
    td: [{ type: ContentChild, args: [TemplateBodyTdDirective, { static: false },] }]
};
if (false) {
    /** @type {?} */
    NgxColumnComponent.prototype.key;
    /** @type {?} */
    NgxColumnComponent.prototype.stickyLeft;
    /** @type {?} */
    NgxColumnComponent.prototype.emptyHead;
    /** @type {?} */
    NgxColumnComponent.prototype.headTitle;
    /** @type {?} */
    NgxColumnComponent.prototype.customKey;
    /** @type {?} */
    NgxColumnComponent.prototype.importantTemplate;
    /** @type {?} */
    NgxColumnComponent.prototype.stickyRight;
    /** @type {?} */
    NgxColumnComponent.prototype.verticalLine;
    /** @type {?} */
    NgxColumnComponent.prototype.th;
    /** @type {?} */
    NgxColumnComponent.prototype.td;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvbmd4LWNvbHVtbi9uZ3gtY29sdW1uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVF6RCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsYUFBYTtJQU5yRDs7UUFPb0IsUUFBRyxHQUFXLElBQUksQ0FBQztRQUNYLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDeEIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDbkIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQzNDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFZLEdBQVksS0FBSyxDQUFDO0lBUWpFLENBQUM7Ozs7O0lBSlUsT0FBTyxDQUFDLEdBQVc7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7WUFyQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixZQUEwQztnQkFDMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3hDOzs7a0JBRUksS0FBSzt5QkFDTCxLQUFLLFNBQUMsUUFBUTt3QkFDZCxLQUFLLFNBQUMsWUFBWTt3QkFDbEIsS0FBSyxTQUFDLFlBQVk7d0JBQ2xCLEtBQUssU0FBQyxZQUFZO2dDQUNsQixLQUFLLFNBQUMsb0JBQW9COzBCQUMxQixLQUFLLFNBQUMsWUFBWTsyQkFDbEIsS0FBSyxTQUFDLGVBQWU7aUJBQ3JCLFlBQVksU0FBQyx1QkFBdUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7aUJBQ3ZELFlBQVksU0FBQyx1QkFBdUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7SUFUeEQsaUNBQW1DOztJQUNuQyx3Q0FBb0Q7O0lBQ3BELHVDQUFzRDs7SUFDdEQsdUNBQXFEOztJQUNyRCx1Q0FBdUQ7O0lBQ3ZELCtDQUF1RTs7SUFDdkUseUNBQXlEOztJQUN6RCwwQ0FBNkQ7O0lBQzdELGdDQUE2Rjs7SUFDN0YsZ0NBQTZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGVtcGxhdGVIZWFkVGhEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jvd3MvdGVtcGxhdGUtaGVhZC10aC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUJvZHlUZERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1ib2R5LXRkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbHVtbk9wdGlvbnMgfSBmcm9tICcuLi9jb21tb24vY29sdW1uLW9wdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1jb2x1bW4nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1jb2x1bW4uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hDb2x1bW5Db21wb25lbnQgZXh0ZW5kcyBDb2x1bW5PcHRpb25zIHtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBrZXk6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoJ3N0aWNreScpIHB1YmxpYyBzdGlja3lMZWZ0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2VtcHR5LWhlYWQnKSBwdWJsaWMgZW1wdHlIZWFkOiBib29sZWFuID0gbnVsbDtcclxuICAgIEBJbnB1dCgnaGVhZC10aXRsZScpIHB1YmxpYyBoZWFkVGl0bGU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoJ2N1c3RvbS1rZXknKSBwdWJsaWMgY3VzdG9tS2V5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2ltcG9ydGFudC10ZW1wbGF0ZScpIHB1YmxpYyBpbXBvcnRhbnRUZW1wbGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCdzdGlja3ktZW5kJykgcHVibGljIHN0aWNreVJpZ2h0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ3ZlcnRpY2FsLWxpbmUnKSBwdWJsaWMgdmVydGljYWxMaW5lOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlSGVhZFRoRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIHRoOiBUZW1wbGF0ZUhlYWRUaERpcmVjdGl2ZTtcclxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVCb2R5VGREaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgdGQ6IFRlbXBsYXRlQm9keVRkRGlyZWN0aXZlO1xyXG5cclxuICAgIHB1YmxpYyB3aXRoS2V5KGtleTogc3RyaW5nKTogTmd4Q29sdW1uQ29tcG9uZW50IHtcclxuICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4iXX0=