/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableContent } from '../common/table-content';
var NgxHeaderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NgxHeaderComponent, _super);
    function NgxHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-header',
                    template: "<div\r\n    class=\"table-grid__table-content-place\"\r\n    [class.table-grid__table-content-place--content-cell]=\"contentCell !== null\"\r\n    [class.table-grid__table-content-place--align-center]=\"alignCenter !== null\"\r\n    [class.table-grid__table-content-place--bold]=\"bold !== null\"\r\n    [style.height.px]=\"height\"\r\n>\r\n    <div [ngClass]=\"cssClasses\" [class.content-box]=\"contentCell !== null\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return NgxHeaderComponent;
}(TableContent));
export { NgxHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvbmd4LWhlYWRlci9uZ3gtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZEO0lBTXdDLDhDQUFZO0lBTnBEOztJQU1zRCxDQUFDOztnQkFOdEQsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixpZkFBMEM7b0JBQzFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7O0lBQ3FELHlCQUFDO0NBQUEsQUFOdkQsQ0FNd0MsWUFBWSxHQUFHO1NBQTFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJsZUNvbnRlbnQgfSBmcm9tICcuLi9jb21tb24vdGFibGUtY29udGVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWhlYWRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTmd4SGVhZGVyQ29tcG9uZW50IGV4dGVuZHMgVGFibGVDb250ZW50IHt9XG4iXX0=