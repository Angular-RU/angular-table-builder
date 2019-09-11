/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { ColumnOptions } from '../common/column-options';
var NgxColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NgxColumnComponent, _super);
    function NgxColumnComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = null;
        _this.stickyLeft = false;
        _this.emptyHead = null;
        _this.headTitle = null;
        _this.customKey = false;
        _this.importantTemplate = false;
        _this.stickyRight = false;
        _this.verticalLine = false;
        return _this;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    NgxColumnComponent.prototype.withKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.key = key;
        return this;
    };
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
    return NgxColumnComponent;
}(ColumnOptions));
export { NgxColumnComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvbmd4LWNvbHVtbi9uZ3gtY29sdW1uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFekQ7SUFNd0MsOENBQWE7SUFOckQ7UUFBQSxxRUFzQkM7UUFmbUIsU0FBRyxHQUFXLElBQUksQ0FBQztRQUNYLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUN6QixlQUFTLEdBQVksS0FBSyxDQUFDO1FBQ25CLHVCQUFpQixHQUFZLEtBQUssQ0FBQztRQUMzQyxpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUMxQixrQkFBWSxHQUFZLEtBQUssQ0FBQzs7SUFRakUsQ0FBQzs7Ozs7SUFKVSxvQ0FBTzs7OztJQUFkLFVBQWUsR0FBVztRQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O2dCQXJCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFlBQTBDO29CQUMxQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzs7c0JBRUksS0FBSzs2QkFDTCxLQUFLLFNBQUMsUUFBUTs0QkFDZCxLQUFLLFNBQUMsWUFBWTs0QkFDbEIsS0FBSyxTQUFDLFlBQVk7NEJBQ2xCLEtBQUssU0FBQyxZQUFZO29DQUNsQixLQUFLLFNBQUMsb0JBQW9COzhCQUMxQixLQUFLLFNBQUMsWUFBWTsrQkFDbEIsS0FBSyxTQUFDLGVBQWU7cUJBQ3JCLFlBQVksU0FBQyx1QkFBdUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7cUJBQ3ZELFlBQVksU0FBQyx1QkFBdUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0lBTTVELHlCQUFDO0NBQUEsQUF0QkQsQ0FNd0MsYUFBYSxHQWdCcEQ7U0FoQlksa0JBQWtCOzs7SUFDM0IsaUNBQW1DOztJQUNuQyx3Q0FBb0Q7O0lBQ3BELHVDQUFzRDs7SUFDdEQsdUNBQXFEOztJQUNyRCx1Q0FBdUQ7O0lBQ3ZELCtDQUF1RTs7SUFDdkUseUNBQXlEOztJQUN6RCwwQ0FBNkQ7O0lBQzdELGdDQUE2Rjs7SUFDN0YsZ0NBQTZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGVtcGxhdGVIZWFkVGhEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jvd3MvdGVtcGxhdGUtaGVhZC10aC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUJvZHlUZERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1ib2R5LXRkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbHVtbk9wdGlvbnMgfSBmcm9tICcuLi9jb21tb24vY29sdW1uLW9wdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1jb2x1bW4nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1jb2x1bW4uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hDb2x1bW5Db21wb25lbnQgZXh0ZW5kcyBDb2x1bW5PcHRpb25zIHtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBrZXk6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoJ3N0aWNreScpIHB1YmxpYyBzdGlja3lMZWZ0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2VtcHR5LWhlYWQnKSBwdWJsaWMgZW1wdHlIZWFkOiBib29sZWFuID0gbnVsbDtcclxuICAgIEBJbnB1dCgnaGVhZC10aXRsZScpIHB1YmxpYyBoZWFkVGl0bGU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoJ2N1c3RvbS1rZXknKSBwdWJsaWMgY3VzdG9tS2V5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2ltcG9ydGFudC10ZW1wbGF0ZScpIHB1YmxpYyBpbXBvcnRhbnRUZW1wbGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCdzdGlja3ktZW5kJykgcHVibGljIHN0aWNreVJpZ2h0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ3ZlcnRpY2FsLWxpbmUnKSBwdWJsaWMgdmVydGljYWxMaW5lOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlSGVhZFRoRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIHRoOiBUZW1wbGF0ZUhlYWRUaERpcmVjdGl2ZTtcclxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVCb2R5VGREaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgdGQ6IFRlbXBsYXRlQm9keVRkRGlyZWN0aXZlO1xyXG5cclxuICAgIHB1YmxpYyB3aXRoS2V5KGtleTogc3RyaW5nKTogTmd4Q29sdW1uQ29tcG9uZW50IHtcclxuICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4iXX0=