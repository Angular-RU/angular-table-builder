/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
var NgxMenuContentComponent = /** @class */ (function () {
    function NgxMenuContentComponent() {
        this.icon = null;
        this.noMargin = null;
        this.alignCenter = null;
    }
    Object.defineProperty(NgxMenuContentComponent.prototype, "class", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var cssClasses = "" + (this.noMargin !== null ? 'content-phrase' : '');
            return this.icon !== null ? "icon-place " + cssClasses : cssClasses;
        },
        enumerable: true,
        configurable: true
    });
    NgxMenuContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-menu-content',
                    template: "<div [class.context-menu__content-place]=\"icon === null\" [class.context-menu__icon-place]=\"icon !== null\">\n    <div class=\"content\" [class.align-center]=\"alignCenter !== null\">\n        <ng-template [ngIf]=\"icon?.length > 0\" [ngIfElse]=\"content\">\n            <img [attr.src]=\"icon\" alt=\"img\" />\n        </ng-template>\n        <ng-template #content>\n            <ng-content></ng-content>\n        </ng-template>\n    </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    NgxMenuContentComponent.propDecorators = {
        icon: [{ type: Input }],
        noMargin: [{ type: Input, args: ['no-margin',] }],
        alignCenter: [{ type: Input, args: ['align-center',] }],
        class: [{ type: HostBinding, args: ['class',] }]
    };
    return NgxMenuContentComponent;
}());
export { NgxMenuContentComponent };
if (false) {
    /** @type {?} */
    NgxMenuContentComponent.prototype.icon;
    /** @type {?} */
    NgxMenuContentComponent.prototype.noMargin;
    /** @type {?} */
    NgxMenuContentComponent.prototype.alignCenter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1lbnUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvbmd4LWNvbnRleHQtbWVudS9uZ3gtY29udGV4dC1tZW51LWl0ZW0vbmd4LW1lbnUtY29udGVudC1wbGFjZS9uZ3gtbWVudS1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFHO0lBQUE7UUFPb0IsU0FBSSxHQUFXLElBQUksQ0FBQztRQUNULGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7SUFPOUQsQ0FBQztJQUxHLHNCQUNXLDBDQUFLOzs7O1FBRGhCOztnQkFFVSxVQUFVLEdBQVcsTUFBRyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRTtZQUM5RSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBYyxVQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUN4RSxDQUFDOzs7T0FBQTs7Z0JBZkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGlkQUFnRDtvQkFDaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7O3VCQUVJLEtBQUs7MkJBQ0wsS0FBSyxTQUFDLFdBQVc7OEJBQ2pCLEtBQUssU0FBQyxjQUFjO3dCQUVwQixXQUFXLFNBQUMsT0FBTzs7SUFLeEIsOEJBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQVZZLHVCQUF1Qjs7O0lBQ2hDLHVDQUFvQzs7SUFDcEMsMkNBQW9EOztJQUNwRCw4Q0FBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1lbnUtY29udGVudCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1tZW51LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWVudUNvbnRlbnRDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpY29uOiBzdHJpbmcgPSBudWxsO1xuICAgIEBJbnB1dCgnbm8tbWFyZ2luJykgcHVibGljIG5vTWFyZ2luOiBib29sZWFuID0gbnVsbDtcbiAgICBASW5wdXQoJ2FsaWduLWNlbnRlcicpIHB1YmxpYyBhbGlnbkNlbnRlcjogYm9vbGVhbiA9IG51bGw7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgICBwdWJsaWMgZ2V0IGNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGNzc0NsYXNzZXM6IHN0cmluZyA9IGAke3RoaXMubm9NYXJnaW4gIT09IG51bGwgPyAnY29udGVudC1waHJhc2UnIDogJyd9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbiAhPT0gbnVsbCA/IGBpY29uLXBsYWNlICR7Y3NzQ2xhc3Nlc31gIDogY3NzQ2xhc3NlcztcbiAgICB9XG59XG4iXX0=